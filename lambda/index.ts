import { SkillFactory, TalkyJSSkillConfig } from '@talkyjs/core'
import {
  FirstLaunchRequestRouter,
  SecondLaunchRequestRouter,
  ThirdMoreLaunchRequestRouter,
  DefaultLaunchRequestRouter
} from './LaunchRequest/LaunchRequest.router'
import ResumeIntentHandler from './ResumeIntent/ResumeIntent.router'
import PauseIntentHandler from './PauseIntent/PauseIntent.router'
import PlaybackStarted from './PlaybackStarted/PlaybackStarted.router'
import PlaybackFinished from './PlaybackFinished/PlaybackFinished.router'
import GoCampingIntentRouter from './GoCampingIntent/GoCampingIntent.router' 
import { HandlerInput } from 'ask-sdk-core'

const config: TalkyJSSkillConfig = {
    stage: 'production',                  // [Optional] Skill Stage
    logLevel: 'error',                    // [Optional] Log level
    database: {                           // [Optional] Database configuration
        type: 's3',                       // [Optional] Database type (none / s3 / dynamodb)
        tableName: 'alexa-summer-camp-memory', // [Optional] Database table name
    },
    skillId: 'amzn1.ask.skill.1d1e688d-cd02-4380-a7a1-94d1279d5af3' // [Optional] Skill ID
}

const LoadPersistentAttributesRequestInterceptor = {
    async process(handlerInput: HandlerInput) {
      const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
  
      // Check if user is invoking the skill the first time and initialize preset values
      if (Object.keys(persistentAttributes).length === 0) {
        handlerInput.attributesManager.setPersistentAttributes({
          playbackSetting: {
            loop: false,
            shuffle: false,
          },
          playbackInfo: {
            playOrder: ['sample'],
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
    },
  };

const SavePersistentAttributesResponseInterceptor = {
    async process(handlerInput: HandlerInput) {
      await handlerInput.attributesManager.savePersistentAttributes();
    },
  };

export const handler = SkillFactory.launch(config)
    .addRequestRouters([
        DefaultLaunchRequestRouter,
        FirstLaunchRequestRouter,
        SecondLaunchRequestRouter,
        ThirdMoreLaunchRequestRouter,
        ResumeIntentHandler,
        PauseIntentHandler,
        PlaybackStarted,
        PlaybackFinished,
        GoCampingIntentRouter
    ])
    .getSkill()
    .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
    .addResponseInterceptors(SavePersistentAttributesResponseInterceptor)
    .lambda()