import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';

export interface BlockContentProps {
    sectionTitle?: string;
    title?: string;
    content?: ReactNode;
}

export default function BlockContent({ sectionTitle, title, content }: BlockContentProps) {

    return (
        <BlockSpacing>
            <BlockContainer>
                {sectionTitle && <SectionTitle text={sectionTitle} />}

                {title && <div className="richtext w-full md:w-9/12 mb-8">
                    <h3>{title}</h3>
                </div>}

                {content && <div className="richtext w-full md:w-8/12">
                    {content}
                </div>}
            </BlockContainer>
        </BlockSpacing>
    );
}
