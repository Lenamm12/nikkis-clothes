'use client';

import Link from 'next/link';
import { Heart, LogIn, LogOut, Search, User, UserPlus, Menu, X, PlusCircle } from 'lucide-react'; // Added PlusCircle
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/search/search-bar';
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const navLinks = (
    <>
      <Link href="/" passHref>
        <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Home</Button>
      </Link>
      <Link href="/search" passHref>
        <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Browse</Button>
      </Link>
      <Link href="/suggest-item" passHref>
        <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Suggest Item
        </Button>
      </Link>
      {mounted && user ? (
        <>
          <Link href="/profile" passHref>
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </>
      ) : mounted ? (
        <>
          <Link href="/login" passHref>
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </Button>
          </Link>
        </>
      ) : null }
    </>
  );

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity" aria-label="Nikki's Closet Home">
          Nikki&apos;s Closet
        </Link>

        <div className="hidden md:flex items-center space-x-2 flex-grow justify-center max-w-xl">
          <SearchBar />
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 bg-card p-6">
              <div className="flex flex-col space-y-4">
                <div className="mb-4">
                   <SearchBar />
                </div>
                {navLinks}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
