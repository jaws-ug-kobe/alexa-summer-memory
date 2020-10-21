import {
  SkillFactory,
  TalkyJSSkillConfig,
} from '@talkyjs/core'

import {
  FirstLaunchRequestRouter,
  SecondLaunchRequestRouter,
  ThirdMoreLaunchRequestRouter,
  DefaultLaunchRequestRouter
} from './LaunchRequest/LaunchRequest.router'
import ResumeIntentRouter from './ResumeIntent/ResumeIntent.router'
import PauseIntentRouter from './PauseIntent/PauseIntent.router'
import GoCampingIntentRouter from './GoCampingIntent/GoCampingIntent.router'
import GoSeaIntentRouter from './GoSeaIntent/GoSeaIntent.router'
import GoFireworksIntentRouter from './GoFireworksIntent/GoFireworksIntent.router'
import GoThunderIntentRouter from './GoThunderIntent/GoThunderIntent.router'
import GoInsectsIntentRouter from './GoInsectsIntent/GoInsectsIntent.router'

import NextIntentRouter from './NextIntent/NextIntent.router'
import * as PB from './helper/playbackInfo' 
import { HandlerInput, LambdaHandler, SkillBuilders } from 'ask-sdk-core'

import PlaybackStartedHandler from './PlaybackStarted/PlaybackStarted.handler'
import PlaybackStoppedHandler from './PlaybackStopped/PlaybackStopped.handler'
import PlaybackFinishedHandler from './PlaybackFinished/PlaybackFinished.handler'
import PlaybackNearlyFinishedHandler from './PlaybackNearlyFinished/PlaybackNearlyFinished.handler'
import PlaybackFailedHandler from './PlaybackFailed/PlaybackFailed.handler'

const config: TalkyJSSkillConfig = {
    stage: 'production',                  // [Optional] Skill Stage
    logLevel: 'error',                    // [Optional] Log level
    database: {                           // [Optional] Database configuration
        type: 's3',                       // [Optional] Database type (none / s3 / dynamodb)
        tableName: 'alexa-summer-camp-memory', // [Optional] Database table name
    },
    skillId: 'amzn1.ask.skill.1d1e688d-cd02-4380-a7a1-94d1279d5af3' // [Optional] Skill ID,
}

/**
 * Load current playback status
 */
const LoadPersistentAttributesRequestInterceptor = {
  async process(handlerInput: HandlerInput) {
    console.log('Input:', JSON.stringify(handlerInput))
    const playbackInfo = await PB.getPlaybackInfo(handlerInput)
    handlerInput.context.playbackInfo = playbackInfo
  }
};

/**
 * Update latest playback status
 */
const SavePersistentAttributesResponseInterceptor = {
  async process(handlerInput: HandlerInput) {
    await PB.updatePlaybackInfo(handlerInput.context.playbackInfo)
    console.log('Save:', JSON.stringify(handlerInput))
    // await handlerInput.attributesManager.savePersistentAttributes();
  }
};

// @ts-ignore
export const handler: LambdaHandler = async (event, context) => {
  // console.log(JSON.stringify(event))
  console.log(event.request)

  try {
    const skillBuilder = 
      (event.request.type.startsWith('AudioPlayer.'))
      ? SkillBuilders.custom()
        .addRequestHandlers(
          PlaybackStartedHandler,
          PlaybackStoppedHandler,
          PlaybackFailedHandler,
          PlaybackFinishedHandler,
          PlaybackNearlyFinishedHandler
        )
        // .withPersistenceAdapter(s3)
        .withSkillId('amzn1.ask.skill.1d1e688d-cd02-4380-a7a1-94d1279d5af3')
      : SkillFactory.launch(config)
          .addRequestRouters([
              DefaultLaunchRequestRouter,
              FirstLaunchRequestRouter,
              SecondLaunchRequestRouter,
              ThirdMoreLaunchRequestRouter,
              ResumeIntentRouter,
              PauseIntentRouter,
              GoCampingIntentRouter,
              GoSeaIntentRouter,
              GoThunderIntentRouter,
              GoFireworksIntentRouter,
              GoInsectsIntentRouter,
              NextIntentRouter,
          ])
          .getSkill()

        const result = await skillBuilder
          .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
          .addResponseInterceptors(SavePersistentAttributesResponseInterceptor)
          .create()
          .invoke(event, context)
        console.log(JSON.stringify(result.response))
        console.log(JSON.stringify(result.sessionAttributes))
        return result
    } catch (e) {
      console.log('Exception:', e)
    }
}