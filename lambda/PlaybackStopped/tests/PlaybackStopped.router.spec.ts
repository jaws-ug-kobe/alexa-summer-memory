import { HandlerInputCreator } from '@ask-utils/test';
import { RequestHandlerFactory } from '@talkyjs/core';
import { RequestHandler } from 'ask-sdk-core';
import { PlaybackStoppedRouter } from '../PlaybackStopped.router'

describe('PlaybackStoppedRouter', () => {
  let handler: RequestHandler;
  beforeEach(() => {
    handler = RequestHandlerFactory.create(PlaybackStoppedRouter);
  });
  describe('canHandle', () => {
    it('should return false when given a not LaunchRequest', async () => {
      const handlerInput = new HandlerInputCreator().createLaunchRequest();
      await expect(handler.canHandle(handlerInput)).resolves.toEqual(false);
    });
    
    it('should return false when given a not IntentRequest', async () => {
      const handlerInput = new HandlerInputCreator().createIntentRequest({
        name: "PlaybackStopped",
        confirmationStatus: 'NONE'
      });
      await expect(handler.canHandle(handlerInput)).resolves.toMatchSnapshot();
    });
    
  });
  describe('handle', () => {
    it('should match snapshot', async () => {
      const handlerInput = new HandlerInputCreator().createLaunchRequest();
      await expect(handler.handle(handlerInput)).resolves.toMatchSnapshot();
    });
  });
});
