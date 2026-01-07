import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import { Fragment, ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';

export interface BlockSectionedContentProps {
    indented?: boolean;
    sections: {
        sectionTitle?: string;
        sectionImage?: StaticImageData;
        sectionContent?: ReactNode;
    }[];
}

export default function BlockSectionedContent({ sections, indented = false }: BlockSectionedContentProps) {

    return (
        <BlockSpacing>
            <BlockContainer className="relative grid grid-cols-12">
                <div className={cn('col-span-full grid grid-cols-subgrid mt-10 md:mt-0',
                    {
                        'md:col-start-2': indented,
                    }
                )}>
                    {sections.map((section, index) => (
                        <Fragment key={index}>
                            {section.sectionTitle && <SectionTitle text={section.sectionTitle} className="col-span-full" />}
                            {section.sectionImage && <div className="col-span-full"><Image src={section.sectionImage} alt='' className="max-w-[400px] w-full mb-10" /></div>}
                            {section.sectionContent && <div className={cn('richtext richtext-arrowlist col-span-full lg:col-span-8 richtext mb-18 last:mb-0',
                                {
                                    'lg:col-start-2': indented,
                                }
                            )}>
                                {section.sectionContent}
                            </div>}
                        </Fragment>
                    ))}
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
