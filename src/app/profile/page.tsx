'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Bell, Settings, UserCircle } from 'lucide-react';
import type { ClothingItem } from '@/types';
import { getClothingItemById, getAllClothingItems } from '@/lib/mock-data'; // Assuming you have this function
import ClothingItemCard from '@/components/clothing/clothing-item-card';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [likedItemsDetails, setLikedItemsDetails] = useState<ClothingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    } else {
      // Fetch details for liked items
      const items = user.likedItems
        .map(id => getClothingItemById(id))
        .filter(item => item !== undefined) as ClothingItem[];
      setLikedItemsDetails(items);
    }
  }, [user, router]);

  if (!mounted || !user) {
    // You can show a loading spinner here or return null
    return (
        <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading profile...</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4 bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <UserCircle className="h-16 w-16 text-primary" />
          <div>
            <CardTitle className="text-3xl font-bold text-foreground">Welcome, {user.username}!</CardTitle>
            <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Button onClick={() => { logout(); router.push('/'); }} variant="destructive">
            <Heart className="mr-2 h-4 w-4"/> Log Out (Dev Only)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Heart className="mr-3 h-6 w-6 text-red-500" /> Your Liked Items
          </CardTitle>
          <CardDescription>Here are the clothing items you&apos;ve favorited.</CardDescription>
        </CardHeader>
        <CardContent>
          {likedItemsDetails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedItemsDetails.map(item => (
                <ClothingItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven&apos;t liked any items yet. Start browsing!</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Bell className="mr-3 h-6 w-6 text-secondary" /> Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your notification preferences for price drops and new arrivals (coming soon).</p>
          {/* Placeholder for notification settings UI */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Settings className="mr-3 h-6 w-6 text-muted-foreground" /> Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Update your profile information or change your password (coming soon).</p>
          {/* Placeholder for account settings UI */}
        </CardContent>
      </Card>
    </div>
  );
}
