import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useThreats } from './ThreatsContext';
import { generateRandomThreat } from '../utils/threatGenerator';

interface ScanContextType {
  isScanning: boolean;
  scanProgress: number;
  scanSpeed: number;
  lastScanDate: Date | null;
  scheduledScans: ScheduledScan[];
  scanResults: ScanResult | null;
  startScan: (type: ScanType) => void;
  pauseScan: () => void;
  resumeScan: () => void;
  cancelScan: () => void;
  scheduleNewScan: (scan: Omit<ScheduledScan, 'id'>) => void;
  removeScheduledScan: (id: string) => void;
}

export type ScanType = 'quick' | 'full' | 'custom';

export interface ScheduledScan {
  id: string;
  name: string;
  type: ScanType;
  schedule: string;
  lastRun: Date | null;
  nextRun: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface ScanResult {
  startTime: Date;
  endTime: Date | null;
  scanType: ScanType;
  filesScanned: number;
  threatsFound: number;
  status: 'completed' | 'cancelled' | 'failed' | 'in-progress';
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanContextProvider');
  }
  return context;
};

interface ScanContextProviderProps {
  children: ReactNode;
}

export const ScanContextProvider: React.FC<ScanContextProviderProps> = ({ children }) => {
  const { addThreat } = useThreats();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSpeed, setScanSpeed] = useState(0);
  const [lastScanDate, setLastScanDate] = useState<Date | null>(null);
  const [scheduledScans, setScheduledScans] = useState<ScheduledScan[]>([
    {
      id: '1',
      name: 'Daily Quick Scan',
      type: 'quick',
      schedule: 'Daily at 12:00 PM',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: '2',
      name: 'Weekly Full Scan',
      type: 'full',
      schedule: 'Weekly on Sunday at 2:00 AM',
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'pending',
    },
  ]);
  const [scanResults, setScanResults] = useState<ScanResult | null>(null);
  const [scanInterval, setScanInterval] = useState<NodeJS.Timeout | null>(null);

  const startScan = (type: ScanType) => {
    // Reset previous scan state
    setIsScanning(true);
    setScanProgress(0);
    setScanSpeed(Math.floor(Math.random() * 50) + 150); // Random scan speed between 150-200 files/sec
    
    // Create new scan result
    const newScanResult: ScanResult = {
      startTime: new Date(),
      endTime: null,
      scanType: type,
      filesScanned: 0,
      threatsFound: 0,
      status: 'in-progress',
    };
    
    setScanResults(newScanResult);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          // Complete scan
          clearInterval(interval);
          setIsScanning(false);
          setLastScanDate(new Date());
          
          // Update scan results
          setScanResults((prevResult) => {
            if (prevResult) {
              return {
                ...prevResult,
                endTime: new Date(),
                status: 'completed',
              };
            }
            return prevResult;
          });
          
          return 100;
        }
        
        // Increment progress
        const increment = Math.random() * 2 + 0.5; // Random increment between 0.5 and 2.5
        
        // Randomly find threats during scan (with low probability)
        if (Math.random() < 0.05) {
          const newThreat = generateRandomThreat();
          addThreat(newThreat);
          
          setScanResults((prevResult) => {
            if (prevResult) {
              return {
                ...prevResult,
                threatsFound: prevResult.threatsFound + 1,
              };
            }
            return prevResult;
          });
        }
        
        // Update files scanned count
        setScanResults((prevResult) => {
          if (prevResult) {
            const filesScannedIncrement = Math.floor(Math.random() * 100) + 50;
            return {
              ...prevResult,
              filesScanned: prevResult.filesScanned + filesScannedIncrement,
            };
          }
          return prevResult;
        });
        
        return Math.min(prev + increment, 100);
      });
    }, 300);
    
    setScanInterval(interval);
  };

  const pauseScan = () => {
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
  };

  const resumeScan = () => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setLastScanDate(new Date());
          
          setScanResults((prevResult) => {
            if (prevResult) {
              return {
                ...prevResult,
                endTime: new Date(),
                status: 'completed',
              };
            }
            return prevResult;
          });
          
          return 100;
        }
        
        const increment = Math.random() * 2 + 0.5;
        
        if (Math.random() < 0.05) {
          const newThreat = generateRandomThreat();
          addThreat(newThreat);
          
          setScanResults((prevResult) => {
            if (prevResult) {
              return {
                ...prevResult,
                threatsFound: prevResult.threatsFound + 1,
              };
            }
            return prevResult;
          });
        }
        
        setScanResults((prevResult) => {
          if (prevResult) {
            const filesScannedIncrement = Math.floor(Math.random() * 100) + 50;
            return {
              ...prevResult,
              filesScanned: prevResult.filesScanned + filesScannedIncrement,
            };
          }
          return prevResult;
        });
        
        return Math.min(prev + increment, 100);
      });
    }, 300);
    
    setScanInterval(interval);
  };

  const cancelScan = () => {
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
    
    setIsScanning(false);
    
    setScanResults((prevResult) => {
      if (prevResult) {
        return {
          ...prevResult,
          endTime: new Date(),
          status: 'cancelled',
        };
      }
      return prevResult;
    });
  };

  const scheduleNewScan = (scan: Omit<ScheduledScan, 'id'>) => {
    const newScan: ScheduledScan = {
      ...scan,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    setScheduledScans([...scheduledScans, newScan]);
  };

  const removeScheduledScan = (id: string) => {
    setScheduledScans(scheduledScans.filter((scan) => scan.id !== id));
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (scanInterval) {
        clearInterval(scanInterval);
      }
    };
  }, [scanInterval]);

  return (
    <ScanContext.Provider
      value={{
        isScanning,
        scanProgress,
        scanSpeed,
        lastScanDate,
        scheduledScans,
        scanResults,
        startScan,
        pauseScan,
        resumeScan,
        cancelScan,
        scheduleNewScan,
        removeScheduledScan,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};