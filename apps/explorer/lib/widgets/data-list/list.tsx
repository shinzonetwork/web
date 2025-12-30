import type { ReactNode } from 'react';
import { Container } from '@/widgets/layout';

export interface DataListProps {
  children: ReactNode;
}

export const DataList = ({ children }: DataListProps) => {
  return (
    <Container borderX borderB className='flex'>
      <div className='grow grid grid-cols-[12px_auto_1fr] overflow-x-auto'>
        {children}
      </div>
      {/* empty space */}
      <div className='shrink hidden lg:block lg:w-1/3 2xl:w-1/2' />
    </Container>
  )
};
