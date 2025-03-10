import type { ApiInitArgs, OnApiUpdate } from '../../types';
import type { Methods, MethodArgs, MethodResponse } from '../../methods/types';

import { DEBUG } from '../../../config';
// Relative import is needed for `NormalModuleReplacementPlugin`
// eslint-disable-next-line import/no-useless-path-segments
import { POPUP_PORT } from '../extension/config';
import { Connector, createExtensionConnector } from '../../../util/PostMessageConnector';

let connector: Connector;

export function initApi(onUpdate: OnApiUpdate, initArgs: ApiInitArgs | (() => ApiInitArgs)) {
  if (!connector) {
    const getInitArgs = typeof initArgs === 'function' ? initArgs : () => initArgs;
    connector = createExtensionConnector(POPUP_PORT, onUpdate, getInitArgs);
  }
}

export function callApi<T extends keyof Methods>(methodName: T, ...args: MethodArgs<T>) {
  if (!connector) {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.warn('API is not initialized');
    }

    return undefined;
  }

  const promise = connector.request({
    name: methodName,
    args,
  });

  return promise as MethodResponse<T>;
}
