import type { ReactNode } from 'react';
import { Container } from '@/widgets/layout';

export interface DataListProps {
  children: ReactNode;
}

export const DataList = ({ children }: DataListProps) => {
  return (
    <Container borderX borderB className='flex'>
      <div className='grid min-w-0 w-full grow grid-cols-[12px_max-content_minmax(max-content,1fr)] overflow-x-auto'>
        {children}
      </div>
    </Container>
  )
};
