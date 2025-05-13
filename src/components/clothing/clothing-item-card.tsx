'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ClothingItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, ArrowUpRight } from 'lucide-react'; // Changed ShoppingBag to ArrowUpRight
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';

export type CardViewMode = 'realLife' | 'ingame' | 'combined';

interface ClothingItemCardProps {
  item: ClothingItem;
  viewMode?: CardViewMode;
}

export default function ClothingItemCard({ item, viewMode = 'realLife' }: ClothingItemCardProps) {
  const { toast } = useToast();
  const { user, addLikedItem, removeLikedItem, isItemLiked } = useAuth();
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setLiked(isItemLiked(item.id));
    }
  }, [user, item.id, isItemLiked]);

  const handleLikeToggle = () => {
    if (!mounted || !user) {
      toast({
        title: "Login Required",
        description: "Please login to like items.",
        variant: "destructive",
      });
      return;
    }
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (newLikedState) {
      addLikedItem(item.id);
      toast({
        title: "Added to Favorites!",
        description: `${item.name} has been added to your liked items.`,
      });
    } else {
      removeLikedItem(item.id);
      toast({
        title: "Removed from Favorites",
        description: `${item.name} has been removed from your liked items.`,
      });
    }
  };

  const renderImages = () => {
    const placeholderIngame = `https://picsum.photos/seed/${item.id}ingame/600/400?grayscale`;
    const aiHintRealLife = item.aiHint || "fashion clothing";
    const aiHintIngame = `${item.aiHint || "fashion clothing"} ingame`;

    switch (viewMode) {
      case 'ingame':
        return (
          <div className="aspect-[3/4] relative w-full">
            <Image
              src={item.ingameImageUrl || placeholderIngame}
              alt={`${item.name} (In-game)`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHintIngame}
            />
          </div>
        );
      case 'combined':
        return (
          <div className="flex flex-col bg-muted/30"> {/* Images stacked vertically */}
            <div className="aspect-video relative w-full">
              <Image
                src={item.imageUrl}
                alt={`${item.name} (Outfit)`}
                layout="fill"
                objectFit="contain"
                data-ai-hint={aiHintRealLife}
              />
              <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">Outfit</span>
            </div>
            {item.ingameImageUrl ? (
              <div className="aspect-video relative w-full mt-0.5">
                <Image
                  src={item.ingameImageUrl}
                  alt={`${item.name} (In-game)`}
                  layout="fill"
                  objectFit="contain"
                  data-ai-hint={aiHintIngame}
                />
                <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">In-Game</span>
              </div>
            ) : (
               <div className="aspect-video relative w-full mt-0.5 flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground text-sm p-2 text-center">In-game image not available</p>
               </div>
            )}
          </div>
        );
      case 'realLife':
      default:
        return (
          <div className="aspect-[3/4] relative w-full">
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHintRealLife}
            />
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        {renderImages()}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-foreground mb-1 truncate" title={item.name}>{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2" title={item.description}>{item.description}</CardDescription>
        <div className="text-xs text-muted-foreground">
          <p>Game: {item.game}</p>
          <p>Category: {item.category}{item.rarity && ` (${item.rarity})`}</p>
          {item.priceCategory && <p>Price: {item.priceCategory}</p>}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
        <Button 
          size="sm" 
          asChild
          className="bg-cta-button text-cta-button-foreground hover:bg-cta-button-hover"
        >
          <Link href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get ${item.name}`}>
            <ArrowUpRight className="mr-2 h-4 w-4" /> Get it here
          </Link>
        </Button>
        {mounted && (
          <Button variant="ghost" size="icon" onClick={handleLikeToggle} aria-label={liked ? 'Unlike item' : 'Like item'}>
            <Heart className={`h-5 w-5 transition-colors ${liked ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
