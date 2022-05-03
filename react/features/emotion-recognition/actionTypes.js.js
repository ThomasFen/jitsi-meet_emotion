// @flow

/**
 * Redux action type dispatched in order to add a emotion expression.
 *
 * {
 *      type: ADD_EMOTION_EXPRESSION,
 *      emotionExpression: string,
 *      duration: number
 * }
 */
 export const ADD_EMOTION = 'ADD_EMOTION';

 /**
  * Redux action type dispatched in order to set the time interval in which
  * the message to socket.io server will be sent.
  *
  * {
  *      type: SET_DETECTION_TIME_INTERVAL,
  *      time: number
  * }
  */
 export const SET_DETECTION_TIME_INTERVAL = 'SET_DETECTION_TIME_INTERVAL';
 
 /**
  * Redux action type dispatched in order to set recognition active in the state.
  *
  * {
  *      type: START_EMOTION_RECOGNITION
  * }
  */
 export const START_EMOTION_RECOGNITION = 'START_EMOTION_RECOGNITION';
 
 /**
  * Redux action type dispatched in order to set recognition inactive in the state.
  *
  * {
  *      type: STOP_EMOTION_RECOGNITION
  * }
  */
 export const STOP_EMOTION_RECOGNITION = 'STOP_EMOTION_RECOGNITION';
 

 