import type { ReactNode } from 'react';
import { Header, HeaderProps } from './header';
import { Container } from './container';
import { Typography } from '@/shared/ui/typography';

export interface PageLayoutProps extends Partial<HeaderProps> {
  title: string;
  info?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({ title, info, hideSearch, children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen">
      <Header hideSearch={hideSearch} />

      <Container borderB borderX className='h-36 flex justify-between items-end py-4 px-8'>
        <Typography variant='h2'>
          {'/ '}
          {title}
        </Typography>

        {info}
      </Container>

      {children}
    </main>
  );
};
