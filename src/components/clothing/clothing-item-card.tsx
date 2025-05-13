'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ClothingItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth'; // Assuming useAuth provides a way to manage liked items

interface ClothingItemCardProps {
  item: ClothingItem;
}

export default function ClothingItemCard({ item }: ClothingItemCardProps) {
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

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative w-full">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.aiHint || "fashion clothing"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-foreground mb-1 truncate" title={item.name}>{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2" title={item.description}>{item.description}</CardDescription>
        <div className="text-xs text-muted-foreground">
          <p>Game: {item.game}</p>
          <p>Category: {item.category}{item.rarity && ` (${item.rarity})`}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
        <Button variant="outline" size="sm" asChild>
          <Link href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get ${item.name}`}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Get Item
          </Link>
        </Button>
        {mounted && (
          <Button variant="ghost" size="icon" onClick={handleLikeToggle} aria-label={liked ? 'Unlike item' : 'Like item'}>
            <Heart className={`h-5 w-5 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
