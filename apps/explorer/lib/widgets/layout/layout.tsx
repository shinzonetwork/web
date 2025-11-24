import type { ReactNode } from 'react';
import { Typography } from '@/shared/ui/typography';
import { Container } from '@/widgets/layout';
import { Header, HeaderProps } from './header';
import { Footer } from './footer';

export interface PageLayoutProps extends Partial<HeaderProps> {
  title: string;
  info?: ReactNode;
  children: ReactNode;
  hideTitle?: boolean;
}

export const PageLayout = ({ title, info, hideSearch, hideTitle, children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen">
      <Header hideSearch={hideSearch} />

      {!hideTitle && (
        <Container borderB borderX className='h-36 flex justify-between items-end py-4 px-8'>
          <Typography variant='h2' font='mono'>
            {'/ '}
            {title}
          </Typography>

          {info}
        </Container>
      )}

      {children}

      <Container>
        <Footer />
      </Container>
    </main>
  );
};
