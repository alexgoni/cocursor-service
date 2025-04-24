import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => setMatches(matchMedia.matches);
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export const MOBILE_WIDTH = '(max-width: 767px)';
export const TABLET_WIDTH = '(min-width: 768px) and (max-width: 1279px)';
export const PC_WIDTH = '(min-width: 1280px)';
export const TABLET_AND_PC_WIDTH = '(min-width: 768px)';
