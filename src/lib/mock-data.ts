import type { ClothingItem } from '@/types';

const clothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Starry Night Gown',
    description: 'A beautiful gown shimmering with the light of a thousand stars. Perfect for elegant evenings.',
    imageUrl: 'https://picsum.photos/400/600',
    game: 'Shining Nikki',
    category: 'Dress',
    rarity: 'SSR',
    affiliateUrl: '#',
    tags: ['elegant', 'stars', 'gown', 'blue'],
    aiHint: 'starry gown',
  },
  {
    id: '2',
    name: 'Sakura Kimono',
    description: 'A delicate kimono adorned with cherry blossom patterns. Evokes the beauty of spring.',
    imageUrl: 'https://picsum.photos/400/601',
    game: 'Love Nikki',
    category: 'Dress',
    rarity: 'SR',
    affiliateUrl: '#',
    tags: ['kimono', 'sakura', 'pink', 'traditional'],
    aiHint: 'sakura kimono',
  },
  {
    id: '3',
    name: 'Moonlit Tiara',
    description: 'A sparkling tiara that captures the essence of the moonlight. Adds a touch of royalty.',
    imageUrl: 'https://picsum.photos/400/602',
    game: 'Shining Nikki',
    category: 'Accessory',
    rarity: 'SSR',
    affiliateUrl: '#',
    tags: ['tiara', 'moon', 'jewelry', 'silver'],
    aiHint: 'moon tiara',
  },
  {
    id: '4',
    name: 'Casual Explorer Shorts',
    description: 'Comfortable and stylish shorts for everyday adventures. Ready for anything!',
    imageUrl: 'https://picsum.photos/400/603',
    game: 'Love Nikki',
    category: 'Bottoms',
    rarity: 'R',
    affiliateUrl: '#',
    tags: ['casual', 'shorts', 'adventure', 'khaki'],
    aiHint: 'explorer shorts',
  },
  {
    id: '5',
    name: 'Rose Garden Hat',
    description: 'A wide-brimmed hat decorated with fresh roses. Perfect for a sunny day in the garden.',
    imageUrl: 'https://picsum.photos/400/604',
    game: 'Shining Nikki',
    category: 'Accessory',
    rarity: 'SR',
    affiliateUrl: '#',
    tags: ['hat', 'roses', 'summer', 'floral'],
    aiHint: 'rose hat',
  },
  {
    id: '6',
    name: 'Ocean Whisper Earrings',
    description: 'Earrings crafted from rare sea gems, whispering tales of the deep ocean.',
    imageUrl: 'https://picsum.photos/400/605',
    game: 'Love Nikki',
    category: 'Accessory',
    rarity: 'SSR',
    affiliateUrl: '#',
    tags: ['earrings', 'ocean', 'blue', 'gems'],
    aiHint: 'ocean earrings',
  },
   {
    id: '7',
    name: 'Sweet Strawberry Dress',
    description: 'A cute and playful dress with a strawberry print, perfect for a picnic.',
    imageUrl: 'https://picsum.photos/400/606',
    game: 'Shining Nikki',
    category: 'Dress',
    rarity: 'SR',
    affiliateUrl: '#',
    tags: ['cute', 'strawberry', 'dress', 'red'],
    aiHint: 'strawberry dress',
  },
  {
    id: '8',
    name: 'Midnight Velvet Cape',
    description: 'A luxurious velvet cape, dark as the midnight sky, for a mysterious allure.',
    imageUrl: 'https://picsum.photos/400/607',
    game: 'Love Nikki',
    category: 'Outerwear',
    rarity: 'SSR',
    affiliateUrl: '#',
    tags: ['velvet', 'cape', 'dark', 'mysterious'],
    aiHint: 'velvet cape',
  },
];

export function getAllClothingItems(): ClothingItem[] {
  return clothingItems;
}

export function getClothingItemById(id: string): ClothingItem | undefined {
  return clothingItems.find(item => item.id === id);
}

export function searchClothingItems(query: string): ClothingItem[] {
  if (!query) return clothingItems;
  const lowerCaseQuery = query.toLowerCase();
  return clothingItems.filter(item =>
    item.name.toLowerCase().includes(lowerCaseQuery) ||
    item.description.toLowerCase().includes(lowerCaseQuery) ||
    item.category.toLowerCase().includes(lowerCaseQuery) ||
    item.game.toLowerCase().includes(lowerCaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
}

export function getFeaturedItems(count: number = 4): ClothingItem[] {
  // Simple featured logic: take the first 'count' items or highly rated ones if available
  return clothingItems.slice(0, count);
}

export const clothingCategories = Array.from(new Set(clothingItems.map(item => item.category)));
