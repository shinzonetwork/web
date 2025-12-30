import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/utils';

interface AnimatedNumberProps {
  value: number | undefined;
}

export const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const [prevValue, setPrevValue] = useState<number | undefined>(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== prevValue) {
      setIsAnimating(true);

      const timeout = setTimeout(() => {
        setPrevValue(value);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  return (
    <span className='relative inline-block h-full overflow-hidden perspective-dramatic'>
      {isAnimating && prevValue !== undefined && (
        <span className='absolute block inset-0 animate-slide-up opacity-0 origin-bottom'>
          {prevValue}
        </span>
      )}
      <span className={cn('block origin-top', isAnimating && 'animate-slide-in')}>
        {value ?? prevValue}
      </span>
    </span>
  );
};
