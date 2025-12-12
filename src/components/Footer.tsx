import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-800">SecureShield</span>
          </div>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} SecureShield Antivirus. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};