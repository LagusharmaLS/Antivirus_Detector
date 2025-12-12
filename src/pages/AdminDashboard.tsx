import React, { useState } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { ThreatCard } from '../components/ThreatCard';
import { ScanProgressBar } from '../components/ScanProgressBar';
import { NetworkMonitor } from '../components/NetworkMonitor';
import { useThreats } from '../context/ThreatsContext';
import { useScan } from '../context/ScanContext';
import { systemPerformance, virusDefinitions, recentLogs } from '../data/mockData';
import {
  Shield,
  AlertTriangle,
  Activity,
  Server,
  Clock,
  Database,
  List,
  Calendar,
  BarChart2,
  Network,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    threats,
    updateThreatStatus,
    removeThreat,
    quarantinedCount,
    activeCount,
    resolvedCount,
  } = useThreats();
  
  const {
    isScanning,
    scanProgress,
    startScan,
    pauseScan,
    resumeScan,
    cancelScan,
    lastScanDate,
    scanResults,
    scheduledScans,
  } = useScan();
  
  const [selectedTab, setSelectedTab] = useState<'overview' | 'threats' | 'scans'>('overview');

  const activeScanStatus = isScanning ? 'active' : scanProgress === 100 ? 'complete' : 'cancelled';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-1">System Administrator Dashboard</h1>
        <p className="opacity-90">Monitor and manage security across your application</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Active Threats</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{activeCount}</p>
            {activeCount > 0 && (
              <p className="text-sm mt-1 text-red-200">Requires attention</p>
            )}
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Quarantined</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{quarantinedCount}</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">System Status</h3>
            </div>
            <p className="text-xl font-semibold mt-2">
              {activeCount > 0 ? 'At Risk' : 'Protected'}
            </p>
            <p className="text-sm mt-1">
              Last scan: {lastScanDate ? lastScanDate.toLocaleString() : 'Never'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200">
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
            selectedTab === 'threats'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedTab('threats')}
        >
          Threats
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            selectedTab === 'scans'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedTab('scans')}
        >
          Scans
        </button>
      </div>
      
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Network Security"
            icon={<Network className="h-5 w-5" />}
            className="col-span-1 md:col-span-2 lg:col-span-3"
          >
            <NetworkMonitor />
          </DashboardCard>

          <DashboardCard
            title="Security Overview"
            icon={<Shield className="h-5 w-5" />}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            {isScanning ? (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Scan Progress</h4>
                <ScanProgressBar progress={scanProgress} status={activeScanStatus} />
                <div className="flex space-x-2 mt-3">
                  {isScanning ? (
                    <>
                      <button
                        onClick={pauseScan}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md text-sm hover:bg-amber-200 transition-colors"
                      >
                        Pause
                      </button>
                      <button
                        onClick={cancelScan}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={resumeScan}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      Resume
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Start a New Scan</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => startScan('quick')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Quick Scan
                  </button>
                  <button
                    onClick={() => startScan('full')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Full Scan
                  </button>
                  <button
                    onClick={() => startScan('custom')}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Custom Scan
                  </button>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Virus Definitions</h4>
              <div className="text-sm">
                <p>Version: {virusDefinitions.version}</p>
                <p>Last Updated: {virusDefinitions.lastUpdated.toLocaleString()}</p>
                <p>Total Signatures: {virusDefinitions.totalSignatures.toLocaleString()}</p>
                <p>Recently Added: {virusDefinitions.recentlyAdded}</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      )}
    </div>
  );
};
              