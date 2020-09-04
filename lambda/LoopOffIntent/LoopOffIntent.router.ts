import { Router } from "@talkyjs/core";


export const LoopOffIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.LoopOffIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default LoopOffIntentRouter