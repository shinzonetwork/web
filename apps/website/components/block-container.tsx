import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface BlockContainerProps {
    children: ReactNode;
    className?: string;
}

export default function BlockContainer({ children, className }: BlockContainerProps) {
    return <div className={cn('content-wrapper', className)}>{children}</div>;
}
