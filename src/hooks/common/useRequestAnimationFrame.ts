import { useEffect } from 'react';

type Callback = () => void;

export default function useRequestAnimationFrame(cb: Callback) {
  useEffect(() => {
    let animationFrameId: number;

    const onARF = () => {
      cb();
      animationFrameId = requestAnimationFrame(onARF);
    };

    animationFrameId = requestAnimationFrame(onARF);

    return () => cancelAnimationFrame(animationFrameId);
  });
}
