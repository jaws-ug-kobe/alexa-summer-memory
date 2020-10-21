import { Router } from "@talkyjs/core";
import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'


export const GoHotSummerIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoHotSummerIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'hotsummer')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`暑かった夏の思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoFireworksIntent',
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

export default GoHotSummerIntentRouter