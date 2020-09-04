import { Router } from "@talkyjs/core";


export const ResumeIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.ResumeIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default ResumeIntentRouter