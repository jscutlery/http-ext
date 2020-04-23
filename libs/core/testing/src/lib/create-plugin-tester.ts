import {
  createResponse,
  ConvoyrRequest,
  ConvoyrResponse,
  PluginHandler,
  ResponseArgs,
} from '@convoyr/core';
import { Observable, of } from 'rxjs';

export function createPluginTester(
  {
    handler,
    response = { status: 200, statusText: 'Ok' },
  }: {
    handler: PluginHandler;
    response?: ResponseArgs<unknown>;
  } = {
    handler: undefined,
  }
) {
  const next = jest.fn().mockReturnValue(of(createResponse(response)));

  return {
    next,
    handle({ request }: { request: ConvoyrRequest }) {
      return handler.handle({ request, next }) as Observable<ConvoyrResponse>;
    },
  };
}
