import ShinzoLogo from '@/components/svg/shinzo-logo.svg';
import { cn } from '@/lib/utils';
import { Fragment, ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export interface BlockManifestoProps {
    eyebrow: string;
    header: ReactNode;
    intro: ReactNode;
    sections: {
        sectionTitle?: ReactNode;
        sectionContent?: ReactNode;
    }[];
    footer: ReactNode;
    buttons: ReactNode;
}

export default function BlockManifesto({ eyebrow, header, intro, sections, footer, buttons }: BlockManifestoProps) {

    return (
        <BlockSpacing>
            <BlockContainer className="">
                <div className="md:grid grid-cols-12 mb-12 md:mb-24">
                    <div className="col-span-10 space-y-12">
                        <div className="richtext">
                            {eyebrow && <p className="mb-4 font-mono font-medium">{eyebrow}</p>}
                            <h1>{header}</h1>
                            {intro}
                        </div>
                    </div>
                </div>
                <div className="relative grid lg:grid-cols-10 lg:col-start-2 gap-y-10 mb-24">
                    {sections.map((section, index) => (
                        <Fragment key={index}>
                            {section.sectionTitle && <div className="richtext col-span-full md:col-span-4"><h2>{section.sectionTitle}</h2></div>}
                            {section.sectionContent && <div className={cn('richtext col-span-full md:col-span-6 md:col-start-6 border-b border-szo-border last:border-b-0 pb-10 last:pb-0')}>
                                {section.sectionContent}
                            </div>}
                        </Fragment>
                    ))}
                </div>

                {footer && <div className="richtext mb-24 text-center">
                    <ShinzoLogo className="max-w-[300px] md:max-w-[400px] mx-auto" />
                    {footer}

                    {buttons && <div className="flex flex-wrap gap-2 my-24 not-prose justify-center">
                        {buttons}
                    </div>}
                </div>}
            </BlockContainer>
        </BlockSpacing >
    );
}
