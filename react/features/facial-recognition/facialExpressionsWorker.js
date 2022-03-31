import './faceApiPatch';

import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import * as faceapi from '@vladmandic/face-api';

import { DETECTION_TYPES, DETECT_FACE, FACE_BOX_MESSAGE, FACIAL_EXPRESSION_MESSAGE, INIT_WORKER } from './constants';

/**
 * Detection types to be applied.
 */
let faceDetectionTypes = [];

/**
 * Indicates whether an init error occured.
 */
let initError = false;

/**
 * A flag that indicates whether the models are loaded or not.
 */
let modelsLoaded = false;

/**
 * A flag that indicates whether the tensorflow backend is set or not.
 */
let backendSet = false;

/**
 * Flag for indicating whether an init operation (setting tf backend, loading models) is in progress.
 */
let initInProgress = false;

/**
 * Flag for indicating whether a face detection flow is in progress or not.
 */
let detectionInProgress = false;

/**
 * Contains the last valid face bounding box (passes threshold validation) which was sent to the main process.
 */
let lastValidFaceBox;

const detectFaceBox = async ({ imageTensor, threshold }) => {
    const detections = await faceapi.detectAllFaces(imageTensor, new faceapi.TinyFaceDetectorOptions());

    if (!detections.length) {
        return;
    }

    const faceBox = {
        // normalize to percentage based
        left: Math.round(Math.min(...detections.map(d => d.relativeBox.left)) * 100),
        right: Math.round(Math.max(...detections.map(d => d.relativeBox.right)) * 100),
        top: Math.round(Math.min(...detections.map(d => d.relativeBox.top)) * 100),
        bottom: Math.round(Math.max(...detections.map(d => d.relativeBox.bottom)) * 100)
    };

    if (lastValidFaceBox && Math.abs(lastValidFaceBox.left - faceBox.left) < threshold) {
        return;
    }

    lastValidFaceBox = faceBox;

    self.postMessage({
        type: FACE_BOX_MESSAGE,
        value: faceBox
    });
};

const detectFaceExpressions = async ({ imageTensor }) => {
    const detections = await faceapi.detectSingleFace(
        imageTensor,
        new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    const facialExpression = detections?.expressions.asSortedArray()[0].expression;

    if (facialExpression) {
        self.postMessage({
            type: FACIAL_EXPRESSION_MESSAGE,
            value: facialExpression
        });
    }
};

const detect = async ({ image, threshold }) => {
    detectionInProgress = true;
    faceapi.tf.engine().startScope();

    const imageTensor = faceapi.tf.browser.fromPixels(image);

    if (faceDetectionTypes.includes(DETECTION_TYPES.FACE_BOX)) {
        await detectFaceBox({
            imageTensor,
            threshold
        });
    }

    if (faceDetectionTypes.includes(DETECTION_TYPES.FACE_EXPRESSIONS)) {
        await detectFaceExpressions({ imageTensor });
    }

    faceapi.tf.engine().endScope();
    detectionInProgress = false;
};

const init = async ({ baseUrl, detectionTypes }) => {
    initInProgress = true;

    faceDetectionTypes = detectionTypes;

    if (!backendSet) {
        try {
            if (self.useWasm) {
                setWasmPaths(baseUrl);
                await faceapi.tf.setBackend('wasm');
            } else {
                await faceapi.tf.setBackend('webgl');
            }
            backendSet = true;
        } catch (err) {
            initError = true;

            return;
        }
    }

    // load face detection model
    if (!modelsLoaded) {
        try {
            await faceapi.loadTinyFaceDetectorModel(baseUrl);

            if (detectionTypes.includes(DETECTION_TYPES.FACE_EXPRESSIONS)) {
                await faceapi.loadFaceExpressionModel(baseUrl);
            }

            modelsLoaded = true;
        } catch (err) {
            initError = true;

            return;
        }
    }

    initInProgress = false;
};

onmessage = function(message) {
    switch (message.data.type) {
    case DETECT_FACE: {
        if (initInProgress || initError || detectionInProgress) {
            return;
        }

        detect(message.data);

        break;
    }

    case INIT_WORKER: {
        init(message.data);
        break;
    }
    }
};
