import { Router } from "@talkyjs/core";
import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const NextIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.NextIntent",
    handler: async (handlerInput) => {
        // ひとまず、次へは全部 花火大会
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'fireworks')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`夏の思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'NextIntent',
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

export default NextIntentRouter