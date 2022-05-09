// @flow
import logger from "./logger";
import { KEEP_SENDING } from "./actionTypes";

export async function takePhoto(imageCapture: Object): Promise<void> {
    if (imageCapture === null || imageCapture === undefined) {
        return;
    }
    let imageBlob;

    try {
        imageBlob = await imageCapture.takePhoto();
    } catch (err) {
        logger.warn(err);

        return;
    }

    return imageBlob;
}

export function sendKeepAliveMessage(conference, patientId) {
    try {
        conference.sendEndpointMessage(patientId, {
            type: KEEP_SENDING,
        });
    } catch (err) {
        logger.warn(
            "Failed to send patient the first keep-sending message.",
            err
        );
    }
}
