import React, { ReactNode } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Shield } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};