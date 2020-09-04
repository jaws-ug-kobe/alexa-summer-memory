import { Router } from "@talkyjs/core";


export const PlaybackFinishedRouter: Router = {
    requestType: "AudioPlayer.PlaybackFinished",
    
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default PlaybackFinishedRouter