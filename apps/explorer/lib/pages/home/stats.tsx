import { ReactNode } from 'react';
import { ArrowLeftRightIcon } from 'lucide-react';
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { Typography } from '@/shared/ui/typography';
import { Skeleton } from '@shinzo/ui/skeleton';
import { AnimatedNumber } from '@/shared/ui/animated-number';
import { useBlocksAndTransactionsCount } from './use-blocks-and-transactions-count';

export interface StatsBlockProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
}

export const StatsBlock = ({ children, icon, title, isLoading }: StatsBlockProps) => {
  return (
    <div className='flex min-w-0 items-center gap-2 border-t border-border px-4 py-6 first:border-t-0 min-[360px]:border-t-0 min-[360px]:border-l min-[360px]:first:border-l-0 sm:gap-3 sm:px-7 sm:py-8 lg:min-w-50'>
      <i className='flex items-center size-4 [&>svg]:size-full text-accent'>
        {icon}
      </i>

      <div className='flex flex-col'>
        <Typography variant='md'>
          {title}
        </Typography>

        {isLoading ? (
          <div className='h-7 w-20 sm:w-28'>
            <Skeleton />
          </div>
        ) : (
          <Typography variant='lg' weight='regular' color='secondary'>
            {children}
          </Typography>
        )}
      </div>
    </div>
  );
};

export const HomeStats = () => {
  const {data: metricsData, isLoading: metricsLoading} = useBlocksAndTransactionsCount();

  return (
    <section className='grid grid-cols-1 min-[360px]:grid-cols-2 lg:flex -mt-px'>
      <StatsBlock title='Total Blocks' icon={<ShinzoFilledIcon />} isLoading={metricsLoading}>
        <AnimatedNumber value={metricsData?.metrics.blocks_processed} />
      </StatsBlock>
      <StatsBlock title='Total txns' icon={<ArrowLeftRightIcon />} isLoading={metricsLoading}>
        <AnimatedNumber value={metricsData?.metrics.transactions_processed} />
      </StatsBlock>
    </section>
  );
};
