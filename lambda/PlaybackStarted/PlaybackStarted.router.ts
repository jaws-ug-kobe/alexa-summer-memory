import { Router } from "@talkyjs/core";


const uri = 'https://s3.amazonaws.com/alexa.summer.camp.memory.sound/camping.sound.001.mp3'

export const PlaybackStartedRouter: Router = {
    requestType: "AudioPlayer.PlaybackStarted",
    
    handler: async (handlerInput) => {
        /**
         * 状態遷移
         */
        return handlerInput.responseBuilder
            .getResponse()
    }
}

export default PlaybackStartedRouter