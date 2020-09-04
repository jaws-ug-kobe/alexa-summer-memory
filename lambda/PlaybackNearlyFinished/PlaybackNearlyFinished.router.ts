import { Router } from "@talkyjs/core";


export const PlaybackNearlyFinishedRouter: Router = {
    requestType: "AudioPlayer.PlaybackNearlyFinished",
    
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("Hello! It's a nice development. How are you?").reprompt("How are you?")
            .getResponse()
        
        
    }
}

export default PlaybackNearlyFinishedRouter