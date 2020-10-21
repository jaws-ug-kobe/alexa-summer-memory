import { RequestHandler } from 'ask-sdk-core';
import * as PB from '../helper/playbackInfo'

export const PlaybackStoppedHandler:  RequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "AudioPlayer.PlaybackStopped"
    },
    async handle(handlerInput) {
        // await PB.updatePlaybackInfoByEvent(handlerInput)
        // @ts-ignore
        const playbackInfo: PlaybackStatus = {}
        // @ts-ignore
        playbackInfo.token = handlerInput.requestEnvelope.request.token
        const trackAndKey = playbackInfo.token.split('&')
        const track = trackAndKey[0]
        const key = trackAndKey[1]

        playbackInfo.user_id = handlerInput.requestEnvelope.context.System.user.userId
        // @ts-ignore
        playbackInfo.index = PB.playbackAudio[key].findIndex(audio => audio == track)
        // @ts-ignore
        playbackInfo.offsetInMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds

        handlerInput.context.playbackInfo = playbackInfo
        return handlerInput.responseBuilder.getResponse()
    }
}

export default PlaybackStoppedHandler