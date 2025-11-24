import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/utils';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  borderX?: boolean;
  borderB?: boolean;
}

/**
 * A container component that limits children width, centers its content and optionally adds borders.
 */
export const Container = ({ borderX, borderB, children, className, wrapperClassName }: ContainerProps) => {
  return (
    <div className={cn(
      'w-full h-max',
      borderB && 'border-b border-border',
      wrapperClassName,
    )}>
      <section className={cn(
        'container mx-auto',
        borderX && 'border-l border-r border-border',
        borderB && '[&>*]:translate-y-[1px]',
        className,
      )}>
        {children}
      </section>
    </div>
  )
};
