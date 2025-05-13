'use client'; // This page uses URL search params, better as client component for easy access

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ClothingItem } from '@/types';
import { searchClothingItems } from '@/lib/mock-data';
import ClothingItemCard from '@/components/clothing/clothing-item-card';
import SearchBar from '@/components/search/search-bar';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category') || '';
  
  const [results, setResults] = useState<ClothingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState(query || categoryQuery);
  const [filterGame, setFilterGame] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");

  useEffect(() => {
    let items = searchClothingItems(query || categoryQuery);

    if (categoryQuery) {
       items = items.filter(item => item.category.toLowerCase() === categoryQuery.toLowerCase());
    }

    if (filterGame !== "all") {
      items = items.filter(item => item.game === filterGame);
    }
    if (filterRarity !== "all") {
      items = items.filter(item => item.rarity === filterRarity);
    }
    
    setResults(items);
    setSearchTerm(query || categoryQuery);
  }, [query, categoryQuery, filterGame, filterRarity]);

  const games = ["all", "Shining Nikki", "Love Nikki"]; // Example games
  const rarities = ["all", "SSR", "SR", "R"]; // Example rarities


  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg shadow">
        <h1 className="text-3xl font-semibold text-foreground mb-4">Search Closet</h1>
        <SearchBar />
      </div>
      
      <div className="flex justify-between items-center">
        {searchTerm && (
          <h2 className="text-2xl font-medium text-muted-foreground">
            Results for: <span className="text-foreground">&quot;{searchTerm}&quot;</span> ({results.length})
          </h2>
        )}
        {!searchTerm && (
            <h2 className="text-2xl font-medium text-muted-foreground">
                All Items ({results.length})
            </h2>
        )}

        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter by Game</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Game</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filterGame} onValueChange={setFilterGame}>
                    {games.map(game => (
                        <DropdownMenuRadioItem key={game} value={game}>{game === "all" ? "All Games" : game}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter by Rarity</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Rarity</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filterRarity} onValueChange={setFilterRarity}>
                    {rarities.map(rarity => (
                        <DropdownMenuRadioItem key={rarity} value={rarity}>{rarity === "all" ? "All Rarities" : rarity}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(item => (
            <ClothingItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No items found matching your criteria.</p>
          <p className="text-muted-foreground">Try a different search term or adjust your filters.</p>
        </div>
      )}
    </div>
  );
}
