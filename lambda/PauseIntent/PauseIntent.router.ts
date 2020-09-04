import { Router } from "@talkyjs/core";


export const PauseIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.PauseIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("またキャンプ行きましょう！")
            .addAudioPlayerStopDirective()
            .getResponse()
        
        
    }
}

export default PauseIntentRouter