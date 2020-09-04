import { Router } from "@talkyjs/core";


export const CheckAudioPlayerRouter: Router = {
    requestType: "LaunchRequest",
    situation: {
        custom(input) {
            const audioPlayerInterface = ((((input.requestEnvelope.context || {}).System || {}).device || {}).supportedInterfaces || {}).AudioPlayer;
            return audioPlayerInterface === undefined
        }
    },
    
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak("このデバイスで AudioPlayer が有効になっていません。?")
            .getResponse()
        
        
    }
}

export default CheckAudioPlayerRouter