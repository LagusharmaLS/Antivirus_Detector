import React from 'react';
import { Shield, User, Server } from 'lucide-react';

interface UserTypeSelectorProps {
  userType: 'admin' | 'user' | 'system';
  setUserType: (type: 'admin' | 'user' | 'system') => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, setUserType }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select User Interface</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setUserType('admin')}
          className={`flex items-center p-4 rounded-lg border-2 transition-all ${
            userType === 'admin'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Shield className="h-5 w-5 mr-2" />
          <span>System Administrator</span>
        </button>
        
        <button
          onClick={() => setUserType('user')}
          className={`flex items-center p-4 rounded-lg border-2 transition-all ${
            userType === 'user'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <User className="h-5 w-5 mr-2" />
          <span>End User</span>
        </button>
        
        <button
          onClick={() => setUserType('system')}
          className={`flex items-center p-4 rounded-lg border-2 transition-all ${
            userType === 'system'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Server className="h-5 w-5 mr-2" />
          <span>Security System</span>
        </button>
      </div>
    </div>
  );
};