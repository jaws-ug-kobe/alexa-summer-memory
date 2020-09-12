import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackStoppedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackStopped"
    },
    async handle(handlerInput) {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        playbackInfo.token = PB.getToken(handlerInput);
        playbackInfo.index = await PB.getIndex(handlerInput);
        playbackInfo.offsetInMilliseconds = PB.getOffsetInMilliseconds(handlerInput);        
        console.log("PlaybackStopped:", playbackInfo);
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo})
        return handlerInput.responseBuilder
            .getResponse()
    }
}

export default PlaybackStoppedHandler