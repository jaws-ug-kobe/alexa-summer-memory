import { Router } from "@talkyjs/core";


export const ShuffleOffIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.ShuffleOffIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default ShuffleOffIntentRouter