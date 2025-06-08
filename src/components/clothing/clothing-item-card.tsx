
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ClothingItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, ArrowUpRight, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ClothingItemDetailDrawer from './clothing-item-detail-drawer';

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
          <div className="flex flex-row aspect-[3/2] w-full bg-muted/10">
            {/* Real-life/Outfit Image */}
            <div className="relative w-1/2 h-full">
              <Image
                src={item.imageUrl || `https://placehold.co/300x400.png?text=${encodeURIComponent(item.name)}`}
                alt={`${item.name} (Outfit)`}
                layout="fill"
                objectFit="cover"
                data-ai-hint={aiHintRealLife}
                className="rounded-l-sm"
              />
              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">Outfit</span>
            </div>
            
            {/* In-game Image */}
            <div className="relative w-1/2 h-full">
              {item.ingameImageUrl ? (
                <Image
                  src={item.ingameImageUrl}
                  alt={`${item.name} (In-game)`}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={aiHintIngame}
                  className="rounded-r-sm"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-r-sm">
                  <p className="text-muted-foreground text-xs p-2 text-center">In-game image not available</p>
                </div>
              )}
              <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">In-Game</span>
            </div>
          </div>
        );
      case 'realLife':
      default:
        return (
          <div className="aspect-[3/4] relative w-full">
            <Image
              src={item.imageUrl || `https://placehold.co/400x600.png?text=${encodeURIComponent(item.name)}`}
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
    <Sheet>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="p-0">
          {renderImages()}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <SheetTrigger asChild>
            <CardTitle className="text-lg font-semibold text-foreground mb-1 truncate cursor-pointer hover:text-primary" title={item.name}>{item.name}</CardTitle>
          </SheetTrigger>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2" title={item.description}>{item.description}</CardDescription>
          <div className="text-xs text-muted-foreground">
            <p>Game: {item.game}</p>
            <p>Category: {item.category}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
          <div className="flex gap-2">
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> Details
              </Button>
            </SheetTrigger>
          </div>
          {mounted && (
            <Button variant="ghost" size="icon" onClick={handleLikeToggle} aria-label={liked ? 'Unlike item' : 'Like item'}>
              <Heart className={`h-5 w-5 transition-colors ${liked ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
            </Button>
          )}
        </CardFooter>
      </Card>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <ClothingItemDetailDrawer item={item} />
      </SheetContent>
    </Sheet>
  );
}
