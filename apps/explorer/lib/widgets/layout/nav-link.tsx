import { ReactNode } from 'react';
import Link from 'next/link';
import { Typography } from '@/shared/ui/typography';

export interface NavLinkProps {
  link: string;
  children: ReactNode;
}

export const NavLink = ({ link, children }: NavLinkProps) => {
  return (
    <Link href={link} className="text-text-secondary transition-colors hover:text-text-primary">
      <Typography variant='md' weight='medium'>
        {children}
      </Typography>
    </Link>
  );
};
