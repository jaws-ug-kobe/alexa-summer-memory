import { Router } from "@talkyjs/core";
import apl from '../apl/document'
import ds from '../apl/datasources/default'
import * as PB from '../helper/playbackInfo'

export const NextIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.NextIntent",
    handler: async (handlerInput) => {
        // const playbackConfig = await PB.getPlaybackConfig(handlerInput)
        const playbackInfo = await PB.getPlaybackInfo(handlerInput)
        const idx = playbackInfo.index
        console.log('idx:', idx)
        console.log('playOrder.length:', playbackInfo.playOrder.length)
        const nextIndex = (idx === playbackInfo.playOrder.length - 1) ? 0 : idx + 1
        console.log('NextIndex:', nextIndex)

        // if (nextIndex === 0 && !playbackConfig.loop) {
        //   return handlerInput.responseBuilder
        //     .speak('今日のキャンプはこれでおしまい。また行きましょ?')
        //     .addAudioPlayerStopDirective()
        //     .getResponse();
        // }
    
        playbackInfo.index = nextIndex;
        playbackInfo.offsetInMilliseconds = 0;
        playbackInfo.playbackIndexChanged = true;
        handlerInput.attributesManager.setPersistentAttributes({playbackInfo}) 
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
                playbackInfo.playOrder[nextIndex],
                playbackInfo.playOrder[nextIndex],
                playbackInfo.offsetInMilliseconds,
                null
            )
            .getResponse()
        
        
    }
}

export default NextIntentRouter