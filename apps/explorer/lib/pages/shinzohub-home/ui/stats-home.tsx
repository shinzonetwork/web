import { AnimatedNumber } from "@/shared/ui/animated-number";
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { StatsBlock } from "@/pages/home/stats";
import { useHomeBlocks } from "../api/use-home-blocks";
import { ArrowLeftRightIcon } from "lucide-react";
import { useHomeTransactions } from "../api/use-home-transactions";

export const HomeStats = () => {
    const {blocks, isLoading: blocksLoading} = useHomeBlocks({ count: 5 });
    const {data: transactions, isLoading: transactionsLoading} = useHomeTransactions();

    return (
      <section className='grid grid-cols-1 min-[360px]:grid-cols-2 lg:flex -mt-px'>
        <StatsBlock title='Total Blocks' icon={<ShinzoFilledIcon />} isLoading={blocksLoading}>
          <AnimatedNumber value={Number(blocks?.[0]?.number)} />
        </StatsBlock>
        <StatsBlock title='Total txns' icon={<ArrowLeftRightIcon />} isLoading={transactionsLoading}>
          <AnimatedNumber value={Number(transactions?.total)} />
        </StatsBlock>
      </section>
    );
  };
