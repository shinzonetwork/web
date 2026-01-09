import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export interface BlockHeroProps {
    eyebrow?: string;
    title?: ReactNode;
    content?: ReactNode;
    buttons?: ReactNode;
    spacing?: string;
}

export default function BlockHero({ eyebrow, title, content, buttons, spacing = 'py-15 md:py-20' }: BlockHeroProps) {

    return (
        <BlockSpacing spacing={spacing}>
            <BlockContainer>
                <div className="md:grid grid-cols-12">
                    <div className="col-span-10 space-y-12">
                        <div className="richtext">
                            {eyebrow && <p className="mb-4 font-mono font-medium">{eyebrow}</p>}
                            <h1>{title}</h1>
                            <div className='lg:max-w-8/12'>
                                {content}
                            </div>
                        </div>

                        {buttons && <div className="flex flex-col md:flex-row gap-2">
                            {buttons}
                        </div>}
                    </div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
