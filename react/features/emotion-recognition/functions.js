// @flow
import logger from "./logger";


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
