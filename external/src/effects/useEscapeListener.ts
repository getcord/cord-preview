import { useEffect } from 'react';

import { Keys } from '@cord-sdk/react/common/const/Keys.ts';
import { useUpdatingRef } from 'external/src/effects/useUpdatingRef.ts';

export function useEscapeListener(
  onEscape: ((event?: Event) => void) | null | undefined,
  disabled?: boolean,
) {
  // Use ref so we can pass inline function without re-adding the listeners every time
  const onEscapeRef = useUpdatingRef(onEscape);

  disabled = disabled || !onEscape;

  useEffect(() => {
    if (disabled) {
      return;
    }
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === Keys.ESCAPE) {
        event.stopPropagation();
        event.preventDefault();
        onEscapeRef.current?.();
      }
    };
    window.focus();
    document.addEventListener('keydown', onKeydown, { capture: true });
    return () =>
      document.removeEventListener('keydown', onKeydown, { capture: true });
  }, [disabled, onEscapeRef]);
}
