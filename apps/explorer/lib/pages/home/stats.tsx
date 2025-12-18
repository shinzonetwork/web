import { ReactNode } from 'react';
import { ArrowLeftRightIcon } from 'lucide-react';
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { Typography } from '@/shared/ui/typography';
import { Skeleton } from '@/shared/ui/skeleton';

export interface StatsBlockProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
}

export const StatsBlock = ({ children, icon, title, isLoading }: StatsBlockProps) => {
  return (
    <div className='min-w-50 px-7 py-8 flex gap-3 items-center border-l border-border first:border-none'>
      <i className='flex items-center size-4 [&>svg]:size-full text-accent'>
        {icon}
      </i>

      <div className='flex flex-col'>
        <Typography variant='md'>
          {title}
        </Typography>

        {isLoading ? (
          <div className='h-7 w-28'>
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

export interface HomeStatsProps {
  totalTransactions: number;
  totalBlocks: number;
  transactionsLoading?: boolean;
  blocksLoading?: boolean;
}

export const HomeStats = ({
  totalBlocks,
  totalTransactions,
  blocksLoading,
  transactionsLoading,
}: HomeStatsProps) => {
  return (
    <section className='flex -mt-px'>
      <StatsBlock title='Total Blocks' icon={<ShinzoFilledIcon />} isLoading={blocksLoading}>
        {totalBlocks}
      </StatsBlock>
      <StatsBlock title='Total txns' icon={<ArrowLeftRightIcon />} isLoading={transactionsLoading}>
        {totalTransactions}
      </StatsBlock>
    </section>
  );
};
