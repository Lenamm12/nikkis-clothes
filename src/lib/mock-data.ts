
import type { ClothingItem, PurchaseOption } from '@/types';

const clothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Starry Night Gown',
    description: 'A beautiful gown shimmering with the light of a thousand stars. Perfect for elegant evenings.',
    imageUrl: 'https://picsum.photos/seed/item1rl/400/600',
    ingameImageUrl: 'https://picsum.photos/seed/item1ig/600/400',
    game: 'Shining Nikki',
    category: 'Dress',
    priceCategory: '>100',
    purchaseOptions: [
      { shopName: 'Official Store', url: '#', price: '$120.00', quality: 'high' },
      { shopName: 'Reseller Emporium', url: '#', price: '$95.00', quality: 'mid', notes: 'Slightly used' }
    ],
    tags: ['elegant', 'stars', 'gown', 'blue'],
    aiHint: 'starry gown',
  },
  {
    id: '2',
    name: 'Sakura Kimono',
    description: 'A delicate kimono adorned with cherry blossom patterns. Evokes the beauty of spring.',
    imageUrl: 'https://picsum.photos/seed/item2rl/400/601',
    ingameImageUrl: 'https://picsum.photos/seed/item2ig/600/401',
    game: 'Love Nikki',
    category: 'Dress',
    priceCategory: '50-100',
    purchaseOptions: [
      { shopName: 'Traditional Wears', url: '#', price: '$75.50', quality: 'high' }
    ],
    tags: ['kimono', 'sakura', 'pink', 'traditional'],
    aiHint: 'sakura kimono',
  },
  {
    id: '3',
    name: 'Moonlit Tiara',
    description: 'A sparkling tiara that captures the essence of the moonlight. Adds a touch of royalty.',
    imageUrl: 'https://picsum.photos/seed/item3rl/400/602',
    // No ingameImageUrl for this one to test placeholder
    game: 'Shining Nikki',
    category: 'Accessory',
    priceCategory: '>100',
    purchaseOptions: [
      { shopName: 'Royal Jewels Co.', url: '#', price: '$150.00', quality: 'high' }
    ],
    tags: ['tiara', 'moon', 'jewelry', 'silver'],
    aiHint: 'moon tiara',
  },
  {
    id: '4',
    name: 'Casual Explorer Shorts',
    description: 'Comfortable and stylish shorts for everyday adventures. Ready for anything!',
    imageUrl: 'https://picsum.photos/seed/item4rl/400/603',
    ingameImageUrl: 'https://picsum.photos/seed/item4ig/600/403',
    game: 'Love Nikki',
    category: 'Bottoms',
    priceCategory: '<50',
    purchaseOptions: [
      { shopName: 'Adventure Gear', url: '#', price: '$30.00', quality: 'mid' }
    ],
    tags: ['casual', 'shorts', 'adventure', 'khaki'],
    aiHint: 'explorer shorts',
  },
  {
    id: '5',
    name: 'Rose Garden Hat',
    description: 'A wide-brimmed hat decorated with fresh roses. Perfect for a sunny day in the garden.',
    imageUrl: 'https://picsum.photos/seed/item5rl/400/604',
    ingameImageUrl: 'https://picsum.photos/seed/item5ig/600/404',
    game: 'Infinity Nikki', // New Game
    category: 'Accessory',
    priceCategory: '<50',
    purchaseOptions: [
      { shopName: 'Floral Boutique', url: '#', price: '$45.00', quality: 'mid' }
    ],
    tags: ['hat', 'roses', 'summer', 'floral'],
    aiHint: 'rose hat',
  },
  {
    id: '6',
    name: 'Ocean Whisper Earrings',
    description: 'Earrings crafted from rare sea gems, whispering tales of the deep ocean.',
    imageUrl: 'https://picsum.photos/seed/item6rl/400/605',
    ingameImageUrl: 'https://picsum.photos/seed/item6ig/600/405',
    game: 'Love Nikki',
    category: 'Accessory',
    priceCategory: '50-100',
    purchaseOptions: [
      { shopName: 'Deep Sea Treasures', url: '#', price: '$65.00', quality: 'high' }
    ],
    tags: ['earrings', 'ocean', 'blue', 'gems'],
    aiHint: 'ocean earrings',
  },
   {
    id: '7',
    name: 'Sweet Strawberry Dress',
    description: 'A cute and playful dress with a strawberry print, perfect for a picnic.',
    imageUrl: 'https://picsum.photos/seed/item7rl/400/606',
    // No ingameImageUrl for this one
    game: 'Shining Nikki',
    category: 'Dress',
    priceCategory: '<50',
    purchaseOptions: [
      { shopName: 'Fruity Fashion', url: '#', price: '$40.00', quality: 'mid' }
    ],
    tags: ['cute', 'strawberry', 'dress', 'red'],
    aiHint: 'strawberry dress',
  },
  {
    id: '8',
    name: 'Midnight Velvet Cape',
    description: 'A luxurious velvet cape, dark as the midnight sky, for a mysterious allure.',
    imageUrl: 'https://picsum.photos/seed/item8rl/400/607',
    ingameImageUrl: 'https://picsum.photos/seed/item8ig/600/407',
    game: 'Infinity Nikki', // New Game
    category: 'Outerwear',
    priceCategory: '>100',
    purchaseOptions: [
      { shopName: 'Mystic Garbs', url: '#', price: '$180.00', quality: 'high' }
    ],
    tags: ['velvet', 'cape', 'dark', 'mysterious'],
    aiHint: 'velvet cape',
  },
  {
    id: '9',
    name: 'Cyber Runner Visor',
    description: 'A futuristic visor for the tech-savvy stylist.',
    imageUrl: 'https://picsum.photos/seed/item9rl/400/608',
    ingameImageUrl: 'https://picsum.photos/seed/item9ig/600/408',
    game: 'Infinity Nikki',
    category: 'Accessory',
    priceCategory: '50-100',
    purchaseOptions: [
      { shopName: 'Tech Emporium', url: '#', price: '$80.00', quality: 'high' },
      { shopName: 'Budget Gadgets', url: '#', price: '$55.00', quality: 'low', notes: 'Refurbished unit' }
    ],
    tags: ['cyberpunk', 'visor', 'future', 'tech'],
    aiHint: 'cyber visor',
  },
  {
    id: '10',
    name: 'Wanderer\'s Boots',
    description: 'Sturdy boots for long journeys across any terrain.',
    imageUrl: 'https://picsum.photos/seed/item10rl/400/609',
    ingameImageUrl: 'https://picsum.photos/seed/item10ig/600/409',
    game: 'Infinity Nikki',
    category: 'Shoes',
    priceCategory: '<50',
    purchaseOptions: [
      { shopName: 'Trailblazer Outfits', url: '#', price: '$48.00', quality: 'mid' }
    ],
    tags: ['boots', 'travel', 'adventure', 'brown'],
    aiHint: 'leather boots',
  },
  {
    id: '11',
    name: 'Star Sea',
    game: 'Infinity Nikki',
    category: 'Outfit',
    description: 'Among a sea of stars lies the unpredictable fate.',
    imageUrl: '',
    ingameImageUrl: 'https://static.wikia.nocookie.net/shining-nikki/images/4/44/Star_Sea_TW.jpg/revision/latest/scale-to-width-down/1000?cb=20240716230717',
    purchaseOptions: [
      { shopName: 'Celestial Threads', url: '#', price: 'Contact for price', quality: 'high' }
    ],
    tags: [],
    aiHint: ''
  }
];

export function getAllClothingItems(): ClothingItem[] {
  return clothingItems;
}

export function getClothingItemById(id: string): ClothingItem | undefined {
  return clothingItems.find(item => item.id === id);
}

export function searchClothingItems(query: string): ClothingItem[] {
  if (!query) return clothingItems; // Return all if query is empty, filters will apply later
  const lowerCaseQuery = query.toLowerCase();
  return clothingItems.filter(item =>
    item.name.toLowerCase().includes(lowerCaseQuery) ||
    item.description.toLowerCase().includes(lowerCaseQuery) ||
    item.category.toLowerCase().includes(lowerCaseQuery) || // Keep category search here for broad match
    item.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
}

export function getFeaturedItems(count: number = 4): ClothingItem[] {
  // Simple featured logic: take the first 'count' items
  return clothingItems.slice(0, count);
}

export const clothingCategories = Array.from(new Set(clothingItems.map(item => item.category))).sort();

// Static lists for filters
export const gameOptions = ["all", "Shining Nikki", "Love Nikki", "Infinity Nikki"];
export const priceCategoryOptions = ["all", "<50", "50-100", ">100"];
export const itemCategoryOptions = ["all", ...clothingCategories];

// For suggestion form game dropdown
export const availableGames = ["Love Nikki", "Shining Nikki", "Infinity Nikki"];
