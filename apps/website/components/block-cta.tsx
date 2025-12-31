import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export interface BlockCtaProps {
    eyebrow?: string;
    title?: string;
    content?: ReactNode;
    buttons?: ReactNode;
}

export default function BlockCta({ eyebrow, title, content, buttons }: BlockCtaProps) {

    return (
        <BlockSpacing spacing="py-15 md:pt-30">
            <BlockContainer>
                <div className="md:grid grid-cols-12">
                    <div className="col-span-6 col-start-3 mb-12">

                        {eyebrow && <p className="mb-4">{eyebrow}</p>}

                        {title && <h2 className="text-h2 my-4">{title}</h2>}

                        {content && <div className="richtext my-4">{content}</div>}

                        {buttons && <div className="flex flex-wrap gap-2 mt-12">
                            {buttons}
                        </div>}
                    </div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
