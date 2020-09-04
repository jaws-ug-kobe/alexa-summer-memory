import { Router } from "@talkyjs/core";

export const FirstLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    situation: {
        invocationCount: {
            eq: 0 
        }
    },
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("今年の夏はどこも行きづらくって大変でしたね。このスキルで少しでもキャンプ気分を味わってもらえたらうれしいです。どこに行きましょうか？").reprompt("どこに行きましょうか？")
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
            .speak("おかえりなさい。キャンプ、好きなんですね。今日はどこに行きましょうか？").reprompt("今日はどこに行きましょうか？")
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
            .speak("おかえりなさい。今日はどこに行きましょうか？").reprompt("今日はどこに行きましょうか？")
            .getResponse()
    }
}

export const DefaultLaunchRequestRouter: Router = {
    requestType: "LaunchRequest",
    handler: async (handlerInput) => {
        return handlerInput.responseBuilder
            .speak("今年の夏はどこも行きづらくって大変でしたね。このスキルで少しでもキャンプ気分を味わってもらえたらうれしいです。どこに行きましょうか？").reprompt("どこに行きましょうか？")
            .getResponse()
    }
}

export default DefaultLaunchRequestRouter 