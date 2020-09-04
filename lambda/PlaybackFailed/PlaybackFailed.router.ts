import { Router } from "@talkyjs/core";


export const PlaybackFailedRouter: Router = {
    requestType: "AudioPlayer.PlaybackFailed",
    
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default PlaybackFailedRouter