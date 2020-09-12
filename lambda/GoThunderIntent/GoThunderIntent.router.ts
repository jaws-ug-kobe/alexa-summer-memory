import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const GoThunderIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "GoThunderIntent",
    handler: async (handlerInput) => {
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        
        playbackInfo.nextStreamEnqueued = false
        playbackInfo.index = 7
        const sound = playbackInfo.playOrder[playbackInfo.index]
        playbackInfo.token = sound
        console.log('Play:', JSON.stringify(playbackInfo))
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo})

        return handlerInput.responseBuilder
            .speak(`雷の強かった日の思い出`)
            .withShouldEndSession(true)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'GoThunderIntent',
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

export default GoThunderIntentRouter