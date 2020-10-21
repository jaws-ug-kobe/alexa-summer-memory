import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoCampingIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoCampingIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.setPlaybackInfo(handlerInput, 'camping')
        handlerInput.context.playbackInfo = playbackInfo

        return handlerInput.responseBuilder
            .speak(`キャンプの思い出`)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoCampingIntent',
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

export default GoCampingIntentRouter