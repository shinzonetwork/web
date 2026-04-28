import { AnimatedNumber } from "@/shared/ui/animated-number";
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { StatsBlock } from "@/pages/home/stats";
import { useHomeBlocks } from "../hook/use-home-blocks";

export const HomeStats = () => {
    const {blocks, isLoading: blocksLoading} = useHomeBlocks({ count: 5 });
  
    return (
      <section className='flex -mt-px'>
        <StatsBlock title='Total Blocks' icon={<ShinzoFilledIcon />} isLoading={blocksLoading}>
          <AnimatedNumber value={Number(blocks?.[0]?.number)} />
        </StatsBlock>
        {/* <StatsBlock title='Total txns' icon={<ArrowLeftRightIcon />} isLoading={metricsLoading}>
          <AnimatedNumber value={metricsData?.metrics.transactions_processed} />
        </StatsBlock> */}
      </section>
    );
  };