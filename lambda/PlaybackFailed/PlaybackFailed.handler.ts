import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackFailedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackFailed"
    },
    async handle(handlerInput) {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        playbackInfo.inPlaybackSession = false;
        playbackInfo.hasPreviousPlaybackSession = false;
        playbackInfo.nextStreamEnqueued = false; 
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo}) 
        return handlerInput.responseBuilder
            .getResponse()
    }
}

export default PlaybackFailedHandler