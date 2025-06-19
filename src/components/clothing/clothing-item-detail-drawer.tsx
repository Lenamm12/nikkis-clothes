
import type { ClothingItem, PurchaseOption } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ExternalLink, Tag, ShoppingCart, Package, DollarSign } from 'lucide-react';

interface ClothingItemDetailDrawerProps {
  item: ClothingItem;
}

const qualityBadgeVariant = (quality?: 'low' | 'mid' | 'high'): 'default' | 'secondary' | 'outline' | 'destructive' => {
  switch (quality) {
    case 'high':
      return 'default'; // Primary color for high quality
    case 'mid':
      return 'secondary'; // Secondary color for mid quality
    case 'low':
      return 'outline'; // Outline/Destructive for low quality (using outline for less alarm)
    default:
      return 'outline';
  }
};

export default function ClothingItemDetailDrawer({ item }: ClothingItemDetailDrawerProps) {
  const placeholderIngame = `https://picsum.photos/seed/${item.id}ingame/800/600?grayscale`;
  const aiHintRealLife = item.aiHint || "fashion clothing";
  const aiHintIngame = `${item.aiHint || "fashion clothing"} ingame`;

  const ingameImage = item.ingameImageUrl || placeholderIngame;

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
              src={item.imageUrl || item.purchaseOptions?.find(p => p.imageUrl != "")?.imageUrl || `https://placehold.co/400x600.png?text=${encodeURIComponent(item.name)}`}
              alt={`${item.name} (Outfit View)`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHintRealLife}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">Outfit View</div>
          </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={ingameImage}
                alt={`${item.name} (In-Game View)`}
                layout="fill"
                objectFit="contain"
                data-ai-hint={aiHintIngame}
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">In-Game View</div>
            </div>
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
              <p className="font-medium text-muted-foreground">General Price Range:</p>
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
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5 text-primary" /> Where to Buy
          </h3>
          {item.purchaseOptions && item.purchaseOptions.length > 0 ? (
            <ul className="space-y-4">
              {item.purchaseOptions.map((option, index) => (
                <li key={index} className="p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <span className="font-semibold text-lg text-foreground">{option.website} : {option.shopName}</span>
                    <Button 
                      size="sm" 
                      asChild 
                      className="mt-2 sm:mt-0 bg-cta-button text-cta-button-foreground hover:bg-cta-button-hover"
                    >
                      <Link href={option.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Get it here
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {option.price && (
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="mr-1.5 h-4 w-4" />
                        Price: <span className="text-foreground ml-1">{option.price}</span>
                      </div>
                    )}
                    {option.quality && (
                      <div className="flex items-center text-muted-foreground">
                        <Package className="mr-1.5 h-4 w-4" />
                        Quality: <Badge variant={qualityBadgeVariant(option.quality)} className="ml-1 capitalize">{option.quality}</Badge>
                      </div>
                    )}
                  </div>
                  {option.notes && <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-dashed">{option.notes}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No purchase options currently listed for this item.</p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
