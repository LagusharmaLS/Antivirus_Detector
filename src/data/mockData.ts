import { Threat } from '../context/ThreatsContext';

export const mockThreats: Threat[] = [
  {
    id: '1',
    name: 'Trojan.Win32.Downloader',
    type: 'trojan',
    severity: 'high',
    status: 'active',
    detectedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    location: '/uploads/document.pdf',
    fileSize: '285 KB',
    description: 'This trojan attempts to download additional malware from remote servers.',
  },
  {
    id: '2',
    name: 'Virus.Win32.Encryptr',
    type: 'virus',
    severity: 'critical',
    status: 'quarantined',
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: '/uploads/archive.zip',
    fileSize: '1.2 MB',
    description: 'Dangerous virus that encrypts user files and demands ransom.',
  },
  {
    id: '3',
    name: 'Spyware.Browser.DataCollector',
    type: 'spyware',
    severity: 'medium',
    status: 'resolved',
    detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    location: '/browser/extensions/addon.js',
    fileSize: '56 KB',
    description: 'Spyware that collects browsing history and form data.',
  },
  {
    id: '4',
    name: 'Ransomware.Crypt.Locker',
    type: 'ransomware',
    severity: 'critical',
    status: 'quarantined',
    detectedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    location: '/downloads/installer.exe',
    fileSize: '3.4 MB',
    description: 'Ransomware that encrypts files and demands payment for decryption.',
  },
  {
    id: '5',
    name: 'Malware.JS.Cryptominer',
    type: 'malware',
    severity: 'low',
    status: 'active',
    detectedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    location: '/scripts/analytics.js',
    fileSize: '124 KB',
    description: 'JavaScript cryptocurrency miner that uses system resources.',
  },
];

export const recentLogs = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    level: 'info',
    message: 'Quick scan completed successfully',
    source: 'Scanner',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    level: 'warning',
    message: 'Suspicious file detected and quarantined',
    source: 'Quarantine',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    level: 'error',
    message: 'Failed to update virus definitions',
    source: 'Updater',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    level: 'info',
    message: 'Virus definitions updated to version 12.3.456',
    source: 'Updater',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    level: 'info',
    message: 'Scheduled scan started',
    source: 'Scheduler',
  },
];

export const systemPerformance = {
  cpuUsage: 12, // percentage
  memoryUsage: 24, // percentage
  diskUsage: 58, // percentage
  networkUsage: 7, // percentage
  scanImpact: 'Low',
  lastUpdated: new Date(),
};

export const virusDefinitions = {
  version: '12.3.456',
  lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  totalSignatures: 8456789,
  recentlyAdded: 345,
};