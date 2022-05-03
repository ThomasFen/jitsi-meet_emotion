// @flow

import {
    CONFERENCE_JOINED,
    CONFERENCE_WILL_LEAVE,
    getCurrentConference,
} from "../base/conference";
import { MiddlewareRegistry } from "../base/redux";
import { TRACK_UPDATED, TRACK_ADDED, TRACK_REMOVED } from "../base/tracks";
import { VIRTUAL_BACKGROUND_TRACK_CHANGED } from "../virtual-background/actionTypes";

import {
    changeTrack,
    resetTrack,
    stopEmotionRecognition,
    startEmotionRecognition,
} from "./actions";

MiddlewareRegistry.register(({ dispatch, getState }) => (next) => (action) => {
    const { enableEmotionRecognition, emotionUrl } = getState()["features/base/config"];

    if (!enableEmotionRecognition || !emotionUrl) {
        return next(action);
    }
    if (action.type === CONFERENCE_JOINED) {
        dispatch(startEmotionRecognition());

        return next(action);
    }
    if (!getCurrentConference(getState())) {
        return next(action);
    }

    switch (action.type) {
        case CONFERENCE_WILL_LEAVE: {
            dispatch(stopEmotionRecognition());

            return next(action);
        }
        case TRACK_UPDATED: {
            const { videoType, type } = action.track.jitsiTrack;

            if (videoType === "camera") {
                const { muted, videoStarted } = action.track;

                if (videoStarted === true) {
                    dispatch(startEmotionRecognition());
                }
                if (muted !== undefined) {
                    if (muted) {
                        dispatch(stopEmotionRecognition());
                    } else {
                        dispatch(startEmotionRecognition());
                        type === "presenter" && changeTrack(action.track);
                    }
                }
            }

            return next(action);
        }
        case TRACK_ADDED: {
            const { mediaType, videoType } = action.track;

            if (mediaType === "presenter" && videoType === "camera") {
                dispatch(startEmotionRecognition());
                changeTrack(action.track);
            }

            return next(action);
        }
        case TRACK_REMOVED: {
            const { videoType } = action.track.jitsiTrack;

            if (["camera", "desktop"].includes(videoType)) {
                dispatch(stopEmotionRecognition());
            }

            return next(action);
        }
        case VIRTUAL_BACKGROUND_TRACK_CHANGED: {
            dispatch(resetTrack());

            return next(action);
        }
    }

    return next(action);
});
