'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const OpportunitySearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="relative shadow-inner">      <Input
        className="flex-1 pr-10 border-none py-4"
        type="text"
        placeholder="Find in opportunities"
        defaultValue={searchParams?.get('q') ?? ''}
        onChange={(e) => {
          router.push(pathname + '?' + createQueryString('q', e.target.value));
        }}
      />
      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
      </span>
    </div>
  );
};
