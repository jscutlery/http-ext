import { RequestCondition, ConvoyrRequest } from '@convoyr/core';

import { CacheHandler, HandlerOptions } from './cache-handler';
import { MemoryStorage } from './storages/memory-storage';

export interface CachePluginOptions extends HandlerOptions {
  shouldHandleRequest: RequestCondition;
}

export const isGetMethodAndJsonResponseType = ({
  request,
}: {
  request: ConvoyrRequest;
}) => {
  return request.method === 'GET' && request.responseType === 'json';
};

export function createCachePlugin({
  addCacheMetadata = false,
  storage = new MemoryStorage({ maxSize: 100 }),
  shouldHandleRequest = isGetMethodAndJsonResponseType,
}: Partial<CachePluginOptions> = {}) {
  return {
    shouldHandleRequest,
    handler: new CacheHandler({ addCacheMetadata, storage }),
  };
}
