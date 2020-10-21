import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoFireworksIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoFireworksIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'fireworks')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`花火大会の思い出`)
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

export default GoFireworksIntentRouter