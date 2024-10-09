import { cache } from 'react';

export const getData = cache(async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
});
