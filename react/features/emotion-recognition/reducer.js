// @flow

import { ReducerRegistry } from "../base/redux";

import {
    ADD_EMOTION,
    SET_DETECTION_TIME_INTERVAL,
    START_EMOTION_RECOGNITION,
    STOP_EMOTION_RECOGNITION,
} from "./actionTypes";

const defaultState = {
    emotions: {},
    detectionTimeInterval: 1000,
    recognitionActive: false,
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
                    recognitionActive: false,
                };
            }
        }

        return state;
    }
);
