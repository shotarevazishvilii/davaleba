'use client';

import ErrorCard from '@/components/ErrorCard';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="pt-24">
      <ErrorCard onReset={reset} errorMessage={error.message} />
    </main>
  );
}
