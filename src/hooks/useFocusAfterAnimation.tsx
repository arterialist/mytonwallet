import { RefObject } from 'react';

import { IS_TOUCH_ENV } from '../util/windowEnvironment';
import { fastRaf } from '../util/schedulers';
import { useEffect } from '../lib/teact/teact';

const DEFAULT_DURATION = 400;

export default function useFocusAfterAnimation({
  ref,
  isActive = true,
  animationDuration = DEFAULT_DURATION,
}: {
  ref: RefObject<HTMLInputElement>;
  isActive?: boolean;
  animationDuration?: number;
}) {
  useEffect(() => {
    if (IS_TOUCH_ENV || !isActive) {
      return;
    }

    setTimeout(() => {
      fastRaf(() => {
        if (ref.current) {
          ref.current.focus();
        }
      });
    }, animationDuration);
  }, [ref, animationDuration, isActive]);
}
