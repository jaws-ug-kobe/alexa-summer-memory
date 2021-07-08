import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const InsectsIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "InsectsIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        
        playbackInfo.nextStreamEnqueued = false
        playbackInfo.index = 1
        const sound = playbackInfo.playOrder[playbackInfo.index]
        playbackInfo.token = sound
        console.log('Play:', JSON.stringify(playbackInfo))
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo})

        return handlerInput.responseBuilder
            .speak(`虫取りの思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'InsectsIntent',
                document: apl,
                datasources: ds

            })
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                sound,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds,
                null
            )
            .getResponse()
    }
}

export default InsectsIntentRouter