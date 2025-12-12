import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">SecureShield</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Scans</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Threats</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Settings</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Help</a>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Dashboard</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Scans</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Threats</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Settings</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Help</a>
          </div>
        </div>
      )}
    </nav>
  );
};