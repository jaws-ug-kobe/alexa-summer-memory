import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackNearlyFinishedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        
        return handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackNearlyFinished"
        
    },
    async handle(handlerInput) {
        const playbackConfig = await PB.getPlaybackConfig(handlerInput)
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        if (playbackInfo.nextStreamEnqueued) {
            console.log("PlaybackNearlyFinished:", playbackInfo);
            return handlerInput.responseBuilder
                .getResponse()
        }

        const enqueueIndex = (playbackInfo.index + 1) % playbackInfo.playOrder.length;

        if (enqueueIndex === 0 && !playbackConfig.loop) {
          console.log("PlaybackNearlyFinished:", playbackInfo);
          return handlerInput.responseBuilder
              .getResponse()
        }

        playbackInfo.nextStreamEnqueued = true;

        const enqueueToken = playbackInfo.playOrder[enqueueIndex];
        const playBehavior = 'ENQUEUE';
        const sound = playbackInfo.playOrder[enqueueIndex];
        // @ts-ignore
        const expectedPreviousToken = handlerInput.requestEnvelope.request.token;
        const offsetInMilliseconds = 0;

        console.log("PlaybackNearlyFinished:", playbackInfo);
        console.log('enqueueToken:', enqueueToken)
        console.log('behavior:', 'ENQUEUE')
        console.log('sound:', sound)
        console.log('expectedPreviousToken:', expectedPreviousToken)
        console.log('offsetMilliseconds:', 0)
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo})
        return handlerInput.responseBuilder.addAudioPlayerPlayDirective(
            playBehavior,
            sound,
            enqueueToken,
            offsetInMilliseconds,
            expectedPreviousToken,
        ).getResponse()
    }
}

export default PlaybackNearlyFinishedHandler