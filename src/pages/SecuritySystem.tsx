import React, { useState, useEffect } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { NetworkMonitor } from '../components/NetworkMonitor';
import { EndpointProtection } from '../components/EndpointProtection';
import { FileAnalyzer } from '../components/FileAnalyzer';
import { useThreats } from '../context/ThreatsContext';
import { useScan } from '../context/ScanContext';
import { recentLogs, systemPerformance, virusDefinitions } from '../data/mockData';
import {
  Terminal,
  Server,
  Database,
  Shield,
  AlertTriangle,
  Clock,
  RefreshCw,
  AlertCircle,
  Network,
  FileText,
} from 'lucide-react';

export const SecuritySystem: React.FC = () => {
  const { threats, activeCount } = useThreats();
  const { isScanning, scanProgress, scanSpeed, scanResults } = useScan();
  const [logs, setLogs] = useState<Array<{ timestamp: Date; message: string; level: string }>>([]);
  const [systemUptime, setSystemUptime] = useState<string>('23 days, 14 hours, 37 minutes');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'endpoints' | 'files'>('overview');

  // Simulate log generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (logs.length > 20) {
        setLogs((prev) => prev.slice(1));
      }
      
      const randomMessages = [
        { message: 'Security scan complete', level: 'info' },
        { message: 'Virus definitions updated', level: 'info' },
        { message: 'File access verified', level: 'info' },
        { message: 'System integrity check passed', level: 'info' },
        { message: 'Unusual file activity detected', level: 'warning' },
        { message: 'Failed login attempt', level: 'warning' },
        { message: 'Potential malware signature detected', level: 'warning' },
        { message: 'Connection attempt blocked', level: 'error' },
        { message: 'Quarantine action failed', level: 'error' },
      ];
      
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      const newLog = {
        timestamp: new Date(),
        ...randomMessages[randomIndex],
      };
      
      setLogs((prev) => [...prev, newLog]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-1">Security System Interface</h1>
        <p className="opacity-90">Automated security monitoring and threat management</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-black bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <Server className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">System Status</h3>
            </div>
            <p className="text-xl font-semibold mt-2">
              {activeCount > 0 ? 'Alert Status' : 'Normal Operation'}
            </p>
            <p className="text-sm mt-1">Uptime: {systemUptime}</p>
          </div>
          
          <div className="bg-black bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <Database className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Virus Definitions</h3>
            </div>
            <p className="text-xl font-semibold mt-2">v{virusDefinitions.version}</p>
            <p className="text-sm mt-1">Signatures: {virusDefinitions.totalSignatures.toLocaleString()}</p>
          </div>
          
          <div className="bg-black bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Threats</h3>
            </div>
            <p className="text-xl font-semibold mt-2">
              {activeCount > 0 ? (
                <span className="text-red-400">{activeCount} Active</span>
              ) : (
                <span className="text-green-400">None Detected</span>
              )}
            </p>
            <p className="text-sm mt-1">Total detected: {threats.length}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            selectedTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            selectedTab === 'endpoints'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedTab('endpoints')}
        >
          Endpoints
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            selectedTab === 'files'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedTab('files')}
        >
          File Analysis
        </button>
      </div>
      
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Network Monitor"
            icon={<Network className="h-5 w-5" />}
            className="lg:col-span-2"
          >
            <NetworkMonitor />
          </DashboardCard>
          
          <DashboardCard
            title="Security Log"
            icon={<Terminal className="h-5 w-5" />}
          >
            <div className="font-mono text-xs bg-black text-green-400 p-2 rounded-md h-80 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{log.timestamp.toLocaleTimeString()}]</span>{' '}
                  <span className={
                    log.level === 'error' 
                      ? 'text-red-400' 
                      : log.level === 'warning' 
                      ? 'text-yellow-400' 
                      : 'text-green-400'
                  }>
                    {log.level.toUpperCase()}:
                  </span>{' '}
                  {log.message}
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      )}

      {selectedTab === 'endpoints' && (
        <DashboardCard
          title="Endpoint Protection"
          icon={<Shield className="h-5 w-5" />}
        >
          <EndpointProtection />
        </DashboardCard>
      )}

      {selectedTab === 'files' && (
        <DashboardCard
          title="File Analysis"
          icon={<FileText className="h-5 w-5" />}
        >
          <FileAnalyzer />
        </DashboardCard>
      )}
    </div>
  );
};