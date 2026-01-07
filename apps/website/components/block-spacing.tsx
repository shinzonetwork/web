import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface BlockSpacingProps {
    children: ReactNode;
    spacing?: string | null | boolean;
    className?: string;
}

export default function BlockSpacing(props: BlockSpacingProps) {
    const {
        children,
        className,
        spacing = 'py-10 md:py-15',
    } = props;

    return (
        <div className={cn(spacing, className)}>
            {children}
        </div>
    );
}
