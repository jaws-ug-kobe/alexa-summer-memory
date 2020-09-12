import { HandlerInput } from "ask-sdk-core";
import { S3 } from 'aws-sdk'
import { handler } from "..";

const s3 = new S3()

export async function getPlaybackInfo(handlerInput: HandlerInput) {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    return attributes.playbackInfo;
}

export async function getPlaybackConfig(handlerInput: HandlerInput) {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    return attributes.playbackConfig;
}

export async function init(handlerInput: HandlerInput) {
    const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
    console.log('persistent:', JSON.stringify(persistentAttributes))

    const response = await s3.listObjects({
        Bucket: 'alexa.summer.camp.memory.sound'
    }).promise()

    const contents = response.Contents.filter(c => c.Key.endsWith('.mp3'))
        .map(c => `https://s3.amazonaws.com/alexa.summer.camp.memory.sound/${c.Key}`)
    
    // Check if user is invoking the skill the first time and initialize preset values
    if (Object.keys(persistentAttributes).length === 0 ||
        !persistentAttributes.hasOwnProperty('playbackInfo')) {
        console.log('Init')
        handlerInput.attributesManager.setPersistentAttributes({
            playbackConfig: {
              loop: false,
              shuffle: false,
            },
            playbackInfo: {
              playOrder: contents,
              index: 0,
              offsetInMilliseconds: 0,
              playbackIndexChanged: true,
              token: '',
              nextStreamEnqueued: false,
              inPlaybackSession: false,
              hasPreviousPlaybackSession: false,
            },
        });
    }
}

export function getToken(handlerInput: HandlerInput) {
    // @ts-ignore
    return handlerInput.requestEnvelope.request.token;
}
  
export async function getIndex(handlerInput: HandlerInput) {
    // @ts-ignore
    const tokenValue = handlerInput.requestEnvelope.request.token;
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    console.log('GetIndex:', attributes)
    return attributes.playbackInfo.playOrder.indexOf(tokenValue);
}
  
export function getOffsetInMilliseconds(handlerInput: HandlerInput) {
    // @ts-ignore
    return handlerInput.requestEnvelope.request.offsetInMilliseconds;
}
