// @flow

import { ReducerRegistry } from "../base/redux";

import {
    ADD_EMOTION,
    DELETE_EMOTION,
    SET_DETECTION_TIME_INTERVAL,
    START_EMOTION_RECOGNITION,
    STOP_EMOTION_RECOGNITION,
    KEEP_SENDING,
} from "./actionTypes";

const defaultState = {
    emotions: {},
    detectionTimeInterval: 1000,
    recognitionActive: false,
    lastRequestTimestamp: 0,
};

ReducerRegistry.register(
    "features/emotion-recognition",
    (state = defaultState, action) => {
        switch (action.type) {
            case ADD_EMOTION: {
                return {
                    ...state,
                    emotions: {
                        ...state.emotions,
                        [action.patientId]: action.emotion,
                    },
                };
            }

            case DELETE_EMOTION: {
                const newEmotions = { ...state.emotions };
                delete newEmotions[action.patientId];
                return {
                    ...state,
                    emotions: newEmotions,
                };
            }

            case KEEP_SENDING: {
                return {
                    ...state,
                    lastRequestTimestamp: action.timestamp,
                };
            }

            case SET_DETECTION_TIME_INTERVAL: {
                return {
                    ...state,
                    detectionTimeInterval: action.time,
                };
            }
            case START_EMOTION_RECOGNITION: {
                return {
                    ...state,
                    recognitionActive: true,
                };
            }

            case STOP_EMOTION_RECOGNITION: {
                return {
                    ...state,
                    emotions:{},
                    recognitionActive: false,
                };
            }
        }

        return state;
    }
);
