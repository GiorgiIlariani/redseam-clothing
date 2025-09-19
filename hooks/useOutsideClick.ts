import { useEffect, RefObject } from 'react';

/**
 * Custom hook to handle clicks outside of a referenced element
 * @param ref - React ref object pointing to the element
 * @param callback - Function to call when clicking outside
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
