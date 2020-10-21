import { HandlerInput } from "ask-sdk-core";
import { S3PersistenceAdapter } from "ask-sdk-s3-persistence-adapter";
import { DynamoDB } from 'aws-sdk'
import { handler } from "..";

const db = new DynamoDB.DocumentClient()

const url = 'https://s3.amazonaws.com/alexa.summer.camp.memory.sound'

export const playbackAudio = {
    camping: [
        `${url}/camping.sound.001.mp3`
    ],
    hotsummer: [
        `${url}/cicada_KACA0111__42.mp3`
    ],
    fireworks: [
        `${url}/fireworks_KACA0111__01.mp3`,
        `${url}/fireworks_KACA0111__03.mp3`,
    ],
    insects: [
        `${url}/insects_KACA0111__37.mp3`,
        `${url}/insects_KACA0111__43.mp3`,
    ],
    sea: [
        `${url}/sea_KACA0113__01.mp3`
    ],
    thunderbolt: [
        `${url}/thunderstorm_KACA0111__31.mp3`
    ]
}

const TableName = 'AlexaSummerMemories-playbackInfo'

/**
 * Playback status
 */
export interface PlaybackStatus {
    user_id: string;
    track: string;
    category: string;
    index: number;
    offsetInMilliseconds: number;
    playbackIndexChanged: boolean;
    token: string;
    nextStreamEnqueued: boolean;
    inPlaybackSession: boolean;
    hasPreviousPlaybackSession: boolean;
    loop: boolean;
    shuffle: boolean;
}

/**
 * Retrieve audio status for specific user
 * @param handlerInput 
 */
export async function getPlaybackInfo(handlerInput: HandlerInput): Promise<PlaybackStatus> {
    try {
        const item = await db.get({
            TableName,
            Key: {
                user_id: handlerInput.requestEnvelope.context.System.user.userId
            }
        }).promise()
        console.log('getPlaybackInfo:', item.Item)
        if (!item.Item) {
            item.Item = await init(handlerInput)
        }
        // @ts-ignore
        return item.Item
    } catch (e) {
        console.log('getPlaybackInfo:', e)
        const item = await init(handlerInput)
        return item
    }
    // const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    // return attributes.playbackInfo;
}

/**
 * initialize audio status
 * @param handlerInput 
 */
export async function init(handlerInput: HandlerInput) {
    const Item = {
        user_id: handlerInput.requestEnvelope.context.System.user.userId,
        track: '',
        category: '',
        index: 0,
        offsetInMilliseconds: 0,
        playbackIndexChanged: true,
        token: '',
        nextStreamEnqueued: false,
        inPlaybackSession: false,
        hasPreviousPlaybackSession: false,
        loop: false,
        shuffle: false
    }

    try {
        await db.put({
            TableName,
            Item
        }).promise()

        console.log('Init:', Item)
        return Item
    } catch (e) {
        console.log('Init:', e)
        return null
    }
}

export async function updatePlaybackInfo(status: PlaybackStatus): Promise<void> {
    await db.put({
        TableName,
        Item: status
    }).promise()
    console.log('updatePlaybackInfo:', status)
}

/**
 * set track
 * @param handlerInput
 * @param key 
 */
export async function setPlaybackInfo(handlerInput: HandlerInput, key: string): Promise<PlaybackStatus> {
    const playbackInfo = await getPlaybackInfo(handlerInput)
    // @ts-ignore
    const sounds = playbackAudio[key]
    playbackInfo.nextStreamEnqueued = false
    playbackInfo.index = 0
    playbackInfo.track = sounds[playbackInfo.index]
    playbackInfo.category = key
    playbackInfo.token = token(playbackInfo)
    return playbackInfo
}

/**
 * Audio token
 * @param playbackInfo 
 */
export function token (playbackInfo: PlaybackStatus): string {
    return `${playbackInfo.track}&${playbackInfo.category}`
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
