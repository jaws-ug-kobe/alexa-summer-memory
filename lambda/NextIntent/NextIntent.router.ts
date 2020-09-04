import { Router } from "@talkyjs/core";


export const NextIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.NextIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default NextIntentRouter