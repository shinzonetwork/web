import logoCarousel from '@/public/logo-carousel.png';
import Image from 'next/image';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

export default function BlockLogoCarousel() {

    return (
        <BlockSpacing spacing="py-0">
            <BlockContainer>
                <Image src={logoCarousel} alt="" className='w-full h-auto' />
            </BlockContainer>
        </BlockSpacing>
    );
}
