import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockThreats } from '../data/mockData';

export interface Threat {
  id: string;
  name: string;
  type: 'virus' | 'trojan' | 'malware' | 'ransomware' | 'spyware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'quarantined' | 'resolved';
  detectedAt: Date;
  location: string;
  fileSize: string;
  description: string;
}

interface ThreatsContextType {
  threats: Threat[];
  addThreat: (threat: Omit<Threat, 'id' | 'detectedAt'>) => void;
  updateThreatStatus: (id: string, status: 'active' | 'quarantined' | 'resolved') => void;
  removeThreat: (id: string) => void;
  quarantinedCount: number;
  activeCount: number;
  resolvedCount: number;
}

const ThreatsContext = createContext<ThreatsContextType | undefined>(undefined);

export const useThreats = () => {
  const context = useContext(ThreatsContext);
  if (!context) {
    throw new Error('useThreats must be used within a ThreatsContextProvider');
  }
  return context;
};

interface ThreatsContextProviderProps {
  children: ReactNode;
}

export const ThreatsContextProvider: React.FC<ThreatsContextProviderProps> = ({ children }) => {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);

  const addThreat = (threatData: Omit<Threat, 'id' | 'detectedAt'>) => {
    const newThreat: Threat = {
      ...threatData,
      id: Math.random().toString(36).substring(2, 11),
      detectedAt: new Date(),
    };
    setThreats([...threats, newThreat]);
  };

  const updateThreatStatus = (id: string, status: 'active' | 'quarantined' | 'resolved') => {
    setThreats(
      threats.map((threat) => (threat.id === id ? { ...threat, status } : threat))
    );
  };

  const removeThreat = (id: string) => {
    setThreats(threats.filter((threat) => threat.id !== id));
  };

  const quarantinedCount = threats.filter((t) => t.status === 'quarantined').length;
  const activeCount = threats.filter((t) => t.status === 'active').length;
  const resolvedCount = threats.filter((t) => t.status === 'resolved').length;

  return (
    <ThreatsContext.Provider
      value={{
        threats,
        addThreat,
        updateThreatStatus,
        removeThreat,
        quarantinedCount,
        activeCount,
        resolvedCount,
      }}
    >
      {children}
    </ThreatsContext.Provider>
  );
};