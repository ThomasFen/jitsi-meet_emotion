// @flow
import { getLocalVideoTrack } from "../base/tracks";
import { getRemoteParticipants } from "../base/participants";
import { getLocalParticipant } from "../base/participants";

import "image-capture";

import {
    ADD_EMOTION,
    SET_DETECTION_TIME_INTERVAL,
    START_EMOTION_RECOGNITION,
    STOP_EMOTION_RECOGNITION,
} from "./actionTypes";

import { takePhoto } from "./functions";
import logger from "./logger";

import { io } from "socket.io-client";

/**
 * Object containing  a image capture of the local track.
 */
let imageCapture;

/**
 * Variable that keeps the interval for sending expressions to socket.io.
 */
let socketSendInterval;

let patientsSocket;

let physicistsSocket; // the "physicists" namespace

/**
 * Starts the recognition and detection of emotions.
 *
 * @param  {Object} stream - Video stream.
 * @returns {Function}
 */
export function startEmotionRecognition() {
    return async function (dispatch: Function, getState: Function) {
        const state = getState();
        const { recognitionActive } = state["features/emotion-recognition"];
        if (recognitionActive) {
            return;
        }
        const localVideoTrack = getLocalVideoTrack(
            state["features/base/tracks"]
        );

        if (localVideoTrack === undefined) {
            return;
        }
        const stream = localVideoTrack.jitsiTrack.getOriginalStream();

        if (stream === null) {
            return;
        }
        dispatch({ type: START_EMOTION_RECOGNITION });
        logger.log("Start emotion recognition");
        const firstVideoTrack = stream.getVideoTracks()[0];

        // $FlowFixMe
        imageCapture = new ImageCapture(firstVideoTrack);

        // Emotion Websocket handling.
        const { emotionUrl } = state["features/base/config"]; 
        const jwt = state["features/base/jwt"];
        const { detectionTimeInterval } = state["features/emotion-recognition"];
        const { conference } = state["features/base/conference"];
        const localParticipant = getLocalParticipant(state);

        if (jwt?.isPhysician) {
            physicistsSocket = io(`${emotionUrl}/physicists`);
            physicistsSocket.emit("subscribe", room);
        }

        if (jwt?.isPhysician === false) {
            patientsSocket = io(`${emotionUrl}/patients`);
            socketSendInterval = setInterval(async () => {
                const photo = await takePhoto(imageCapture);
                patientsSocket.volatile.emit("image", {
                    userId: localParticipant.jwtId,
                    room: conference.sessionId,
                    image: photo,
                });
            }, detectionTimeInterval);
        }

        physicistsSocket.on("emotion", function (msg) {
            const emotion = JSON.parse(msg);
            dispatch({
                type: ADD_EMOTION,
                emotion: emotion.emotions.dominant,
                patientId: emotion.userId,
            });
        });
    };
}

/**
 * Stops the recognition and detection of emotions.
 *
 * @returns {void}
 */
export function stopEmotionRecognition() {
    return function (dispatch: Function, getState: Function) {
        const state = getState();
        const { recognitionActive } = state["features/emotion-recognition"];

        if (!recognitionActive) {
            imageCapture = null;

            return;
        }
        imageCapture = null;

        if (patientsSocket.connected) {
            patientsSocket.disconnect();
        }
        if (physicistsSocket.connected) {
            physicistsSocket.off("emotion");
            physicistsSocket.disconnect();
        }

        if (socketSendInterval) {
            clearInterval(socketSendInterval);
            socketSendInterval = null;
        }

        dispatch({ type: STOP_EMOTION_RECOGNITION });
        logger.log("Stop emotion recognition");
    };
}

/**
 * Resets the track in the image capture.
 *
 * @returns {void}
 */
export function resetTrack() {
    return function (dispatch: Function, getState: Function) {
        const state = getState();
        const { jitsiTrack: localVideoTrack } = getLocalVideoTrack(
            state["features/base/tracks"]
        );
        const stream = localVideoTrack.getOriginalStream();
        const firstVideoTrack = stream.getVideoTracks()[0];

        // $FlowFixMe
        imageCapture = new ImageCapture(firstVideoTrack);
    };
}

/**
 * Changes the track from the image capture with a given one.
 *
 * @param  {Object} track - The track that will be in the new image capture.
 * @returns {void}
 */
export function changeTrack(track: Object) {
    const { jitsiTrack } = track;
    const stream = jitsiTrack.getOriginalStream();
    const firstVideoTrack = stream.getVideoTracks()[0];

    // $FlowFixMe
    imageCapture = new ImageCapture(firstVideoTrack);
}

/**
 * Sets the time interval for sending to socket.io.
 *
 * @param  {number} time - The time interval.
 * @returns {Object}
 */
function setDetectionTimeInterval(time: number) {
    return {
        type: SET_DETECTION_TIME_INTERVAL,
        time,
    };
}
