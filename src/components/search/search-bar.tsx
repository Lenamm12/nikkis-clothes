'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <Input
        type="search"
        placeholder="Search for outfits, dresses, accessories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-background"
        aria-label="Search clothing items"
      />
      <Button type="submit" variant="default" size="icon" aria-label="Submit search">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
