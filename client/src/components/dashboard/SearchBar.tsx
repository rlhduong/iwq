'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input) {
        router.push(`/guides?search=${input}`);
      } else {
        router.push('/guides');
      }
    }
  };

  return (
    <div className="w-1/3 max-w-[500px] relative flex items-center mb-10">
      <Search className="absolute w-5 h-5 ml-3" />
      <Input
        className="dashboard__search-input pl-10"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
