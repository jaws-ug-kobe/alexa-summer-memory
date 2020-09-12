import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoSeaIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoSeaIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        
        playbackInfo.nextStreamEnqueued = false
        playbackInfo.index = 6
        const sound = playbackInfo.playOrder[playbackInfo.index]
        playbackInfo.token = sound
        console.log('Play:', JSON.stringify(playbackInfo))
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo})

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
                sound,
                playbackInfo.token,
                playbackInfo.offsetInMilliseconds,
                null
            )
            .getResponse()
    }
}

export default GoSeaIntentRouter