import { Router } from "@talkyjs/core";
import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoInsectsIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoInsectsIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'insects')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`虫取りした思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoInsectsIntent',
                document: apl,
                datasources: ds

            })
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                playbackInfo.track,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds,
                null
            )
            .getResponse()
    }
}

export default GoInsectsIntentRouter