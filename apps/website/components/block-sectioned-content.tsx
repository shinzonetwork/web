import { Fragment, ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';

export interface BlockSectionedContentProps {
    sections: {
        sectionTitle?: string;
        sectionContent?: ReactNode;
    }[];
}

export default function BlockSectionedContent({ sections }: BlockSectionedContentProps) {

    return (
        <BlockSpacing>
            <BlockContainer className="relative grid grid-cols-12 ">
                <div className="col-span-full md:col-start-2 row-start-2 grid grid-cols-subgrid mt-10 md:mt-0">
                    {sections.map((section, index) => (
                        <Fragment key={index}>
                            {section.sectionTitle && <SectionTitle text={section.sectionTitle} className="col-span-full" />}
                            {section.sectionContent && <div className="richtext col-span-full lg:col-span-10 lg:col-start-2 richtext mb-15">
                                {section.sectionContent}
                            </div>}
                        </Fragment>
                    ))}
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
