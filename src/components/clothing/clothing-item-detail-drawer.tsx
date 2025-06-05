
import type { ClothingItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ExternalLink, Tag } from 'lucide-react';

interface ClothingItemDetailDrawerProps {
  item: ClothingItem;
}

export default function ClothingItemDetailDrawer({ item }: ClothingItemDetailDrawerProps) {
  const placeholderIngame = `https://picsum.photos/seed/${item.id}ingame/800/600?grayscale`;
  const aiHintRealLife = item.aiHint || "fashion clothing";
  const aiHintIngame = `${item.aiHint || "fashion clothing"} ingame`;

  return (
    <ScrollArea className="h-full pr-6">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-2xl font-bold text-primary">{item.name}</SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">
          {item.category} from {item.game}
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6">
        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={item.imageUrl}
              alt={`${item.name} (Outfit View)`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHintRealLife}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">Outfit View</div>
          </div>
          {item.ingameImageUrl ? (
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={item.ingameImageUrl}
                alt={`${item.name} (In-Game View)`}
                layout="fill"
                objectFit="contain"
                data-ai-hint={aiHintIngame}
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">In-Game View</div>
            </div>
          ) : (
             <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-md bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">In-game image not available</p>
             </div>
          )}
        </div>

        <Separator />

        {/* Description Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
          <p className="text-foreground/80 leading-relaxed">{item.description}</p>
        </div>

        <Separator />

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-muted-foreground">Game:</p>
            <p className="text-foreground">{item.game}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Category:</p>
            <p className="text-foreground">{item.category}</p>
          </div>
          {item.priceCategory && (
            <div>
              <p className="font-medium text-muted-foreground">Price Range:</p>
              <p className="text-foreground">{item.priceCategory}</p>
            </div>
          )}
        </div>
        
        {/* Tags Section */}
        {item.tags && item.tags.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Tag className="mr-2 h-5 w-5 text-secondary" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Where to Buy Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Where to Buy</h3>
          <Button asChild className="w-full bg-cta-button text-cta-button-foreground hover:bg-cta-button-hover">
            <Link href={item.affiliateUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get it here
            </Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            This is the primary affiliate link. Availability may vary. Always check retailer T&Cs.
          </p>
          {/* Placeholder for future multiple links */}
          {/* 
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Other places to find this item:</p>
            <ul className="list-disc list-inside text-foreground/80">
              <li><Link href="#" className="hover:underline text-primary">Retailer A</Link></li>
              <li><Link href="#" className="hover:underline text-primary">Retailer B</Link></li>
            </ul>
          </div>
          */}
        </div>
      </div>
    </ScrollArea>
  );
}
