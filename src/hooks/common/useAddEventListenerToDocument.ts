import { useEffect } from 'react';

export function useAddEventListenerToDocument<K extends keyof DocumentEventMap>(
  type: K,
  callback: () => void
) {
  useEffect(() => {
    document.addEventListener(type, callback);

    return () => {
      document.removeEventListener(type, callback);
    };
  }, [callback, type]);
}
