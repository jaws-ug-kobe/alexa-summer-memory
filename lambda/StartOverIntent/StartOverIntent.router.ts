import { Router } from "@talkyjs/core";


export const StartOverIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.StartOverIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default StartOverIntentRouter