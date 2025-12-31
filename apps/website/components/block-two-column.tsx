import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface BlockTwoColumnProps {
    column1: {
        title?: string;
        content?: ReactNode;
        image?: StaticImageData;
    };
    column2: {
        title?: string;
        content?: ReactNode;
        image?: StaticImageData;
    };
}

export default function BlockTwoColumn({ column1, column2 }: BlockTwoColumnProps) {

    return (
        <BlockSpacing>
            <BlockContainer>
                <div className="grid grid-cols-12 space-y-10">
                    <div className="col-span-full md:col-span-6 richtext md:pr-6">
                        {column1.image && <Image src={column1.image} alt="" />}
                        {column1.title && <h2 className="text-h3">{column1.title}</h2>}
                        {column1.content && <div className="richtext">{column1.content}</div>}
                    </div>

                    <div className="col-span-full md:col-span-6 richtext md:pr-6">
                        {column2.image && <Image src={column2.image} alt="" />}
                        {column2.title && <h2 className="text-h3">{column2.title}</h2>}
                        {column2.content && <div className="richtext">{column2.content}</div>}
                    </div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
