import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoSeaIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoSeaIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'sea')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`海の思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoSeaIntent',
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

export default GoSeaIntentRouter