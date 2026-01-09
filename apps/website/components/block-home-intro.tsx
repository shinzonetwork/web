import { ReactNode } from 'react';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';

export interface BlockHomeIntroProps {
    title?: string;
    titleHighlights?: string[];
    subtitle?: string;
    image?: ReactNode;
    content?: ReactNode;
    cta?: ReactNode;
}
export default function BlockHomeIntro({ title, titleHighlights, subtitle, image, content, cta }: BlockHomeIntroProps) {

    return (
        <BlockSpacing>
            <BlockContainer>

                <SectionTitle text="The Unfinished Promise" />
                <div className="grid grid-cols-12 ">

                    {title && <div className="richtext col-span-11 lg:col-span-7 ">
                        <h2 className='mb-10'>{title}</h2>
                    </div>}

                    {titleHighlights && (
                        <div className="col-span-11 lg:col-span-full flex flex-wrap gap-x-4 lg:gap-x-3 gap-y-6 text-szo-primary font-mono font-medium text-px-12 lg:text-px-19">
                            {titleHighlights.map((highlight, index) => (
                                <div key={index} className='bg-szo-light-gray px-4 py-1'>{highlight}</div>
                            ))}
                        </div>
                    )}

                    {image && <div className="col-span-12 flex items-center">
                        <div className="spacer grow h-px bg-szo-border mr-4" />
                        {image}
                    </div>}

                    <div className="col-span-11 lg:col-span-10 richtext lg:grid grid-cols-subgrid">
                        {subtitle && <h3 className='col-span-9'>{subtitle}</h3>}
                        {content && <div className='col-span-5'>
                            {content}
                        </div>}

                        {cta && <div className='col-span-4 col-start-7'>{cta}</div>}
                    </div>
                </div>

            </BlockContainer>
        </BlockSpacing>
    );
}
