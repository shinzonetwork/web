import { Typography } from '@/shared/ui/typography';
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import ShinzoOutlineIcon from '@/shared/ui/icons/shinzo-outline.svg';

export const Footer = () => {
  return (
    <footer className='flex justify-between w-full items-center py-8'>
      <div className='flex flex-col gap-1'>
        <Typography variant='sm'>Shinzō</Typography>
        <Typography variant='xs' weight='regular' color='secondary'>
          The Trustless Data Read Layer for Blockchains
        </Typography>
      </div>

      <div className='flex flex-col items-end gap-3'>
        <div className='flex gap-2 text-text-primary'>
          <ShinzoOutlineIcon />
          <ShinzoFilledIcon />
        </div>

        <a href='https://shinzo.network' target='_blank' rel='noopener noreferrer'>
          <Typography variant='sm' className='underline'>
            shinzo.network
          </Typography>
        </a>
      </div>
    </footer>
  );
};
