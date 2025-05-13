export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  game: string; // e.g., "Shining Nikki", "Love Nikki"
  category: string; // e.g., "Dress", "Accessory", "Hair"
  rarity?: string; // e.g., "SSR", "SR", "R"
  priceRange?: string; // e.g. "$10-20" if it's a real item, or "In-game currency"
  affiliateUrl: string; // Link to buy/obtain item
  tags: string[];
  aiHint: string; // For placeholder image generation
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  likedItems: string[]; // Array of ClothingItem IDs
  // notificationPreferences: any; // Define later
}
