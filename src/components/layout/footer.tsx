import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto py-8 text-center text-muted-foreground">
      <p className="mb-2 text-bold text-sm">* I may recieve a commission if you make a purchase through the links. Thank you for using this website.</p>
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Nikki&apos;s Closet. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
