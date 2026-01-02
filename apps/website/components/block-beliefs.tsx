import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export interface BlockBeliefsProps {
    title?: string;
    beliefs: {
        eyebrow?: string;
        title: ReactNode;
        content: ReactNode;
    }[];
}

export default function BlockBeliefs({ title, beliefs }: BlockBeliefsProps) {

    return (
        <BlockSpacing>
            <BlockContainer className="relative grid grid-cols-12 gap-y-10">

                {title && <h2 className="col-span-full text-h2 my-4 text-center">{title}</h2>}
                <div className="col-span-full lg:col-span-10 lg:col-start-2 gap-y-10">
                    {beliefs.map((belief, index) => (
                        <div key={index} className="flex flex-col gap-2 border-b border-szo-border last:border-b-0 py-6 last:pb-0">
                            {belief.eyebrow && <p className="col-span-full text-jp-serif text-szo-primary text-px-18 font-medium">{belief.eyebrow}</p>}
                            {belief.title && <h3 className="text-h3">{belief.title}</h3>}
                            {belief.content && <div className={cn('richtext border-b border-szo-border last:border-b-0')}>
                                {belief.content}
                            </div>}
                        </div>
                    ))}
                </div>
            </BlockContainer>
        </BlockSpacing >
    );
}
