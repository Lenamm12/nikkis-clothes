
import type { ClothingItem } from '@/types';
import clothingItemsData from './urls.json';

const clothingItems: ClothingItem[] = clothingItemsData as unknown as ClothingItem[];


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
