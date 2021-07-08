import { Router } from "@talkyjs/core";


export const PauseIntentRouter: Router = {
    requestType: "IntentRequest",
    intentName: "AMAZON.PauseIntent",
    handler: async (handlerInput) => {
        
        
        return handlerInput.responseBuilder
            .speak(`
            <speak>
                また、キャンプ 行きましょ?
                <break time="2s" />
                <amazon:effect name="whispered">
                    今度は、二人でね？
                </amazon:effect>
            </speak>`)
            .addAudioPlayerStopDirective()
            .withShouldEndSession(true)
            .getResponse()
        
        
    }
}

export default PauseIntentRouter