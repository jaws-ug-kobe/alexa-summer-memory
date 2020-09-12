import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackStartedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted'
    },
    async handle(handlerInput) {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        playbackInfo.token = PB.getToken(handlerInput);
        playbackInfo.index = await PB.getIndex(handlerInput);
        playbackInfo.inPlaybackSession = true;
        playbackInfo.hasPreviousPlaybackSession = true;
        console.log("PlaybackStarted:", playbackInfo);
        handlerInput.attributesManager.setPersistentAttributes({
            playbackInfo
        })

        return handlerInput.responseBuilder
            .getResponse()
    }
}

export default PlaybackStartedHandler 