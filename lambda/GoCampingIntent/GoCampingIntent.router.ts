import { Router } from "@talkyjs/core";

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
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                'https://s3.amazonaws.com/alexa.summer.camp.memory.sound/camping.sound.001.mp3',
                null,
                0,
                null
            )
            .getResponse()
    }
}

export default GoCampingIntentRouter