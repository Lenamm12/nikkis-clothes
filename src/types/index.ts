
export interface PurchaseOption {
  shopName: string;
  url: string;
  price?: string; // e.g., "$25.99", "¥3000", "Contact for price"
  quality?: 'low' | 'mid' | 'high';
  notes?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Represents real-life/costume image
  ingameImageUrl?: string; // Represents in-game screenshot
  game: string; // e.g., "Shining Nikki", "Love Nikki", "Infinity Nikki"
  category: string; // e.g., "Dress", "Accessory", "Hair"
  priceCategory?: '<50' | '50-100' | '>100'; // General price category for filtering
  purchaseOptions: PurchaseOption[];
  tags: string[];
  aiHint: string; // For placeholder image generation (real-life/costume)
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  likedItems: string[]; // Array of ClothingItem IDs
  // notificationPreferences: any; // Define later
}
