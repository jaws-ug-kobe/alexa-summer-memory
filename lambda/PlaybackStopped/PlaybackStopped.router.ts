import { Router } from "@talkyjs/core";


export const PlaybackStoppedRouter: Router = {
    requestType: "AudioPlayer.PlaybackStopped",
    
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default PlaybackStoppedRouter