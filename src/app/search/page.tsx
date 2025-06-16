'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import type { ClothingItem } from '@/types';
import { searchClothingItems, gameOptions,  priceCategoryOptions, itemCategoryOptions } from '@/lib/data';
import ClothingItemCard, { type CardViewMode } from '@/components/clothing/clothing-item-card';
import SearchBar from '@/components/search/search-bar';
import { Filter, View } from 'lucide-react'; // Added View icon
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category') || '';
  
  const [results, setResults] = useState<ClothingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState(query || categoryQuery);

  const [filterGame, setFilterGame] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterItemCategory, setFilterItemCategory] = useState("all"); 
  const [cardViewMode, setCardViewMode] = useState<CardViewMode>('realLife');

  useEffect(() => {
    let items = searchClothingItems(query); // Search query applies first

    if (categoryQuery && !query) { // If category comes from URL and no specific search query
        items = items.filter(item => item.category.toLowerCase() === categoryQuery.toLowerCase());
    }
    
    if (filterGame !== "all") {
      items = items.filter(item => item.game === filterGame);
    }
    if (filterPrice !== "all") {
      items = items.filter(item => item.priceCategory === filterPrice);
    }
    if (filterItemCategory !== "all") {
      items = items.filter(item => item.category === filterItemCategory);
    }
    
    setResults(items);
    setSearchTerm(query || categoryQuery); // Display the most relevant term
  }, [query, categoryQuery, filterGame, filterRarity, filterPrice, filterItemCategory]);

  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg shadow">
        <SearchBar />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {searchTerm ? (
          <h2 className="text-2xl font-medium text-muted-foreground">
            Results for: <span className="text-foreground">&quot;{searchTerm}&quot;</span> ({results.length})
          </h2>
        ) : (
            <h2 className="text-2xl font-medium text-muted-foreground">
                All Items ({results.length})
            </h2>
        )}

        <div className="flex flex-wrap gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Game</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Game</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filterGame} onValueChange={setFilterGame}>
                    {gameOptions.map(game => (
                        <DropdownMenuRadioItem key={game} value={game}>{game === "all" ? "All Games" : game}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Price</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filterPrice} onValueChange={setFilterPrice}>
                    {priceCategoryOptions.map(price => (
                        <DropdownMenuRadioItem key={price} value={price}>{price === "all" ? "All Prices" : price}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Category</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filterItemCategory} onValueChange={setFilterItemCategory}>
                    {itemCategoryOptions.map(cat => (
                        <DropdownMenuRadioItem key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2 my-4">
        <span className="text-sm text-muted-foreground mr-2">Card View:</span>
        <ToggleGroup 
          type="single" 
          value={cardViewMode} 
          onValueChange={(value) => { if (value) setCardViewMode(value as CardViewMode); }}
          aria-label="Card view mode"
        >
          <ToggleGroupItem value="realLife" aria-label="Real life view">Outfit</ToggleGroupItem>
          <ToggleGroupItem value="ingame" aria-label="In-game view">In-Game</ToggleGroupItem>
          <ToggleGroupItem value="combined" aria-label="Combined view">Compare</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {results.length > 0 ? (
        <div className={`grid gap-6 ${cardViewMode === 'combined' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {results.map(item => (
            <ClothingItemCard key={item.id} item={item} viewMode={cardViewMode} />
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

