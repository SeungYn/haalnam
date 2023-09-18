'use client';
import { ComponentProps, Suspense, useEffect, useState } from 'react';

export default function SSRSuspense(props: ComponentProps<typeof Suspense>) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount ? <Suspense {...props} /> : <>{props.fallback}</>;
}
