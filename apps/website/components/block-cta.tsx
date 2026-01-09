import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import { cn } from '@/lib/utils';

export interface BlockCtaProps {
    eyebrow?: string;
    title?: string;
    content?: ReactNode;
    buttons?: ReactNode;
    footerText?: ReactNode;
    indented?: boolean;
}

export default function BlockCta({ eyebrow, title, content, buttons, footerText, indented = true }: BlockCtaProps) {

    return (
        <BlockSpacing spacing="py-15 md:py-20">
            <BlockContainer>
                <div className="md:grid grid-cols-12 mb-12">
                    <div className={cn('col-span-6 ', {
                        'col-start-3': indented,
                    })}>
                        {eyebrow && <p className="mb-4">{eyebrow}</p>}
                        {title && <h2 className="text-h2 my-4">{title}</h2>}
                        {content && <div className="richtext my-4">{content}</div>}
                    </div>
                    <div className={cn('col-span-9  ', {
                        'col-start-3': indented,
                    })}>
                        {buttons && <div className="flex flex-col md:flex-row gap-2 mt-12">{buttons}</div>}
                        {footerText && <div className="richtext mt-12">{footerText}</div>}
                    </div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
