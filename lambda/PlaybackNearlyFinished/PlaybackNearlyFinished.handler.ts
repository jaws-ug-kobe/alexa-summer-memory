import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackNearlyFinishedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        
        return handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackNearlyFinished"
        
    },
    async handle(handlerInput) {
        // @ts-ignore
        const playbackInfo: PB.PlaybackStatus = {}

        // @ts-ignore
        const expectedPreviousToken = handlerInput.requestEnvelope.request.token
        const trackAndKey = expectedPreviousToken.split('&')
        const track = trackAndKey[0]
        const key = trackAndKey[1]
        // @ts-ignore
        const audios = PB.playbackAudio[key]
        // @ts-ignore
        let index = audios.findIndex(a => a === track)

        if (audios.length < index) {
            const nextTrack = audios[index++]
            const nextToken = `${nextTrack}&${key}`

            playbackInfo.user_id = handlerInput.requestEnvelope.context.System.user.userId
            // @ts-ignore
            playbackInfo.nextStreamEnqueued = true
            const playBehavior = 'ENQUEUE'
            // @ts-ignore
            playbackInfo.offsetInMilliseconds = 0
            handlerInput.context.playbackInfo = playbackInfo

            return handlerInput.responseBuilder.addAudioPlayerPlayDirective(
                playBehavior,
                nextTrack,
                nextToken,
                playbackInfo.offsetInMilliseconds,
                expectedPreviousToken,
            ).getResponse()
        } else {
            return handlerInput.responseBuilder.getResponse()
        }
    }
}

export default PlaybackNearlyFinishedHandler