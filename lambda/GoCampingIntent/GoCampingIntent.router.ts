import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'

export const GoCampingIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoCampingIntent",
    handler: async (handlerInput) => {
        /**
         * { place } へ行ったよ
         */
        return handlerInput.responseBuilder
            .speak(`キャンプの思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoCampingIntent',
                document: apl,
                datasources: ds

            })
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                'https://s3.amazonaws.com/alexa.summer.camp.memory.sound/camping.sound.001.mp3',
                'campsound',
                0,
                null
            )
            .getResponse()
    }
}

export default GoCampingIntentRouter