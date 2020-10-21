import { Router } from "@talkyjs/core";

import apl from '../apl/document'
import ds from '../apl/datasources/default'

export const FirstLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    situation: {
        invocationCount: {
            eq: 0 
        }
    },
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("今年の夏はどこも行きづらくって大変でしたね? このスキルで少しでも夏の気分を味わってもらえたらうれしいです。どこに行きましょうか？")
            .reprompt("どこに行きましょうか？")
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'LaunchRequest',
                document: apl,
                datasources: ds
            })
            .getResponse()
    }
}

export const SecondLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    situation: {
        invocationCount: {
            eq: 1
        }
    },
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("おかえりなさい。今日はどこに行きましょうか？")
            .reprompt("今日はどこに行きましょうか？")
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'LaunchRequest',
                document: apl
            })
            .getResponse()
    }
}

export const ThirdMoreLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    situation: {
        invocationCount: {
            gte: 2
        }
    },
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("おかえりなさい。今日はどこに行きましょうか？")
            .reprompt("今日はどこに行きましょうか？")
            .getResponse()
    }
}

export const DefaultLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("今年の夏はどこも行きづらくって大変でしたね? このスキルで少しでも夏の気分を味わってもらえたらうれしいです。どこに行きましょうか？")
            .reprompt("どこに行きましょうか？")
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'LaunchRequest',
                document: apl,
                datasources: ds
            })
            .getResponse()
    }
}

export default DefaultLaunchRequestRouter 