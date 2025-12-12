import React from 'react';
import { Shield, Laptop, Server, Smartphone, Globe, AlertTriangle } from 'lucide-react';

interface Endpoint {
  id: string;
  name: string;
  type: 'desktop' | 'server' | 'mobile' | 'web';
  status: 'protected' | 'at-risk' | 'updating';
  lastUpdate: Date;
  threats: number;
}

const mockEndpoints: Endpoint[] = [
  {
    id: '1',
    name: 'Development Workstation',
    type: 'desktop',
    status: 'protected',
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    threats: 0,
  },
  {
    id: '2',
    name: 'Production Server',
    type: 'server',
    status: 'protected',
    lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
    threats: 0,
  },
  {
    id: '3',
    name: 'Mobile App',
    type: 'mobile',
    status: 'at-risk',
    lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    threats: 2,
  },
  {
    id: '4',
    name: 'Web Application',
    type: 'web',
    status: 'updating',
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
    threats: 0,
  },
];

export const EndpointProtection: React.FC = () => {
  const getEndpointIcon = (type: Endpoint['type']) => {
    switch (type) {
      case 'desktop':
        return <Laptop className="h-5 w-5" />;
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'web':
        return <Globe className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Endpoint['status']) => {
    switch (status) {
      case 'protected':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      case 'updating':
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockEndpoints.map((endpoint) => (
          <div
            key={endpoint.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-gray-600">
                {getEndpointIcon(endpoint.type)}
                <span className="ml-2 font-medium">{endpoint.name}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  endpoint.status
                )}`}
              >
                {endpoint.status === 'at-risk' ? (
                  <div className="flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    At Risk
                  </div>
                ) : (
                  endpoint.status.charAt(0).toUpperCase() + endpoint.status.slice(1)
                )}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Last Update</span>
                <span>{endpoint.lastUpdate.toLocaleString()}</span>
              </div>
              
              {endpoint.threats > 0 && (
                <div className="bg-red-50 text-red-700 p-2 rounded-md flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {endpoint.threats} active threat{endpoint.threats > 1 ? 's' : ''}
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
                {endpoint.status === 'at-risk' && (
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors">
                    Fix Issues
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center mb-3">
          <Shield className="h-6 w-6 mr-2" />
          <h3 className="font-semibold">Endpoint Protection Status</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {mockEndpoints.filter((e) => e.status === 'protected').length}
            </div>
            <div className="text-sm opacity-90">Protected</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {mockEndpoints.filter((e) => e.status === 'at-risk').length}
            </div>
            <div className="text-sm opacity-90">At Risk</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {mockEndpoints.reduce((sum, e) => sum + e.threats, 0)}
            </div>
            <div className="text-sm opacity-90">Active Threats</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {mockEndpoints.filter((e) => e.status === 'updating').length}
            </div>
            <div className="text-sm opacity-90">Updating</div>
          </div>
        </div>
      </div>
    </div>
  );
};