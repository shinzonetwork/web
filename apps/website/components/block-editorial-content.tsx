import { cn } from '@/lib/utils';
import { Fragment, ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export interface BlockEditorialContentProps {
    sections: {
        sectionTitle?: ReactNode;
        sectionContent?: ReactNode;
    }[];
}

export default function BlockEditorialContent({ sections }: BlockEditorialContentProps) {

    return (
        <BlockSpacing>
            <BlockContainer className="relative grid grid-cols-12 gap-y-10">
                {sections.map((section, index) => (
                    <Fragment key={index}>
                        {section.sectionTitle && <div className="richtext col-span-full md:col-span-4">{section.sectionTitle}</div>}
                        {section.sectionContent && <div className={cn('richtext col-span-full md:col-span-6 md:col-start-6 border-b border-szo-border last:border-b-0 pb-10 last:pb-0')}>
                            {section.sectionContent}
                        </div>}
                    </Fragment>
                ))}
            </BlockContainer>
        </BlockSpacing >
    );
}
