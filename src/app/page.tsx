import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/search/search-bar';
import ClothingItemCard from '@/components/clothing/clothing-item-card';
import { getFeaturedItems, clothingCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const featuredItems = getFeaturedItems(4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden shadow-md min-h-[300px] md:min-h-[400px] flex items-center justify-center p-6 text-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
        <Image
          src="https://picsum.photos/1200/600?random=1"
          alt="Fashion background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          data-ai-hint="pastel fashion background"
          priority
        />
        <div className="relative z-10 bg-background/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
             Dress like your favorite stylist
          </h1>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            Cosplay enchanting outfits or <br/> wear stylish pieces and accessories like Nikki
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-foreground flex items-center">
            <Sparkles className="mr-2 h-7 w-7 text-secondary" />
            Featured Items
          </h2>
          <Button variant="outline" asChild>
            <Link href="/search">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map(item => (
            <ClothingItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Browse by Category Section */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-6 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {clothingCategories.map(category => (
            <Button key={category} variant="secondary" size="lg" asChild>
              <Link href={`/search?category=${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Call to Action Section 
      <section>
        <Card className="bg-primary/10 border-primary/30 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-primary mb-3">Join Nikki&apos;s Closet!</h3>
            <p className="text-foreground mb-6">
              Create an account to save your favorite items, get price drop notifications, and more!
            </p>
            <div className="space-x-4">
              <Button variant="default" size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>*/}
    </div>
  );
}
