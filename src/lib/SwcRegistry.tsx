'use client';
import { SWRConfig } from 'swr'
import { fetcher } from '@/api/fetcher';

const SwcRegistry = ({ children }: React.PropsWithChildren) => {
  return <SWRConfig
    value={{
      fetcher: fetcher
    }}>
    {children}
  </SWRConfig>
}
export default SwcRegistry;