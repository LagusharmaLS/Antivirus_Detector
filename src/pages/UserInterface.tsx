import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { FileUploader } from '../components/FileUploader';
import { useThreats } from '../context/ThreatsContext';
import { useScan } from '../context/ScanContext';
import { Shield, AlertTriangle, HelpCircle, FileText, Zap } from 'lucide-react';

export const UserInterface: React.FC = () => {
  const { threats, activeCount } = useThreats();
  const { isScanning, scanProgress, startScan, lastScanDate } = useScan();

  const activeScanStatus = isScanning ? 'active' : scanProgress === 100 ? 'complete' : 'cancelled';

  // Filter for active threats to show in user interface
  const activeThreats = threats.filter((threat) => threat.status === 'active');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-1">File Security Center</h1>
        <p className="opacity-90">Upload files safely with real-time virus scanning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardCard
            title="Upload & Scan Files"
            icon={<FileText className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                All uploaded files are automatically scanned for viruses, malware, and other threats before being processed.
              </p>
              
              <FileUploader />
              
              {activeCount > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
                  <div className="flex items-center text-red-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h4 className="font-medium">Security Alert</h4>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    {activeCount} threat{activeCount > 1 ? 's' : ''} detected in your recent uploads. These files have been quarantined for your safety.
                  </p>
                </div>
              )}
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Protection Status"
            icon={<Shield className="h-5 w-5" />}
            className="mt-6"
          >
            <div className="flex items-center">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                activeCount > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                {activeCount > 0 ? (
                  <AlertTriangle className="h-8 w-8" />
                ) : (
                  <Shield className="h-8 w-8" />
                )}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">
                  {activeCount > 0 ? 'At Risk' : 'Protected'}
                </h3>
                <p className="text-sm text-gray-600">
                  {activeCount > 0
                    ? `${activeCount} active threat${activeCount > 1 ? 's' : ''} detected`
                    : 'Your files are secure'}
                </p>
                <div className="mt-2">
                  {lastScanDate ? (
                    <span className="text-xs text-gray-500">
                      Last scan: {lastScanDate.toLocaleString()}
                    </span>
                  ) : (
                    <button
                      onClick={() => startScan('quick')}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      Run Quick Scan
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {activeThreats.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-700 mb-2">Recent Threats</h4>
                <div className="space-y-2">
                  {activeThreats.slice(0, 3).map((threat) => (
                    <div key={threat.id} className="p-3 bg-red-50 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium text-red-700">{threat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          threat.severity === 'critical' || threat.severity === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">
                        Detected in: {threat.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DashboardCard>
        </div>
        
        <div>
          <DashboardCard
            title="Quick Actions"
            icon={<Zap className="h-5 w-5" />}
          >
            <div className="space-y-3">
              <button
                onClick={() => startScan('quick')}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <Shield className="h-4 w-4 mr-2" />
                Run Quick Scan
              </button>
              
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                Check File
              </button>
              
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Quarantine
              </button>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Help & Support"
            icon={<HelpCircle className="h-5 w-5" />}
            className="mt-6"
          >
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-700">What if a file is blocked?</h4>
                <p className="text-sm text-blue-600 mt-1">
                  If a legitimate file is blocked, contact your administrator to review the file.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-700">How scanning works</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Files are automatically scanned before being stored using advanced threat detection.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-700">Safe file types</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Documents, images, and most media files are typically safe. Executables require careful handling.
                </p>
              </div>
              
              <button className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};