import { Router } from "@talkyjs/core";


export const LoopOnIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.LoopOnIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default LoopOnIntentRouter