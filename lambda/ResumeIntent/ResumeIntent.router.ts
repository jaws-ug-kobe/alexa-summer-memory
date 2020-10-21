import { Router } from "@talkyjs/core";
import * as PB from '../helper/playbackInfo'
import apl from '../apl/document'
import ds from '../apl/datasources/default'


export const ResumeIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.ResumeIntent",
    handler: async (handlerInput) => {
        const playbackInfo = handlerInput.context.playbackInfo

        return handlerInput.responseBuilder
            .speak(`夏の思い出`)
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

export default ResumeIntentRouter