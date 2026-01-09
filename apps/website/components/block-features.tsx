import Image, { StaticImageData } from 'next/image';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import { Button } from './ui/button';
import SectionTitle from './section-title';

export interface BlockFeaturesProps {
    features: {
        title: string;
        image?: StaticImageData;
    }[];
}

export default function BlockFeatures({ features }: BlockFeaturesProps) {

    if (!features) return null;

    return (
        <BlockSpacing>
            <BlockContainer>

                <SectionTitle text="What you can ship" className="col-span-full" />

                <div className="grid grid-cols-12 md:justify-items-end -mx-3">
                    {features.map((feature, index) => (
                        <div key={index} className="col-span-full md:col-span-3 font-mono border-r border-szo-border-light px-3 last:border-0 flex flex-col h-full">
                            {feature.image && <Image src={feature.image} alt={''} className='max-w-[200px] md:max-w-full' />}
                            <p className="mt-auto pt-10">{feature.title}</p>
                        </div>
                    ))}
                </div>

                <div className='mt-10 '>
                    <Button variant="outline">See Example Schemas & Lenses</Button>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
