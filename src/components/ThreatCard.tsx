import React from 'react';
import { Threat } from '../context/ThreatsContext';
import { Shield, AlertTriangle, Skull, Bug, Eye } from 'lucide-react';

interface ThreatCardProps {
  threat: Threat;
  onQuarantine?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
}

export const ThreatCard: React.FC<ThreatCardProps> = ({
  threat,
  onQuarantine,
  onDelete,
  onRestore,
}) => {
  const getThreatIcon = () => {
    switch (threat.type) {
      case 'virus':
        return <Bug className="h-5 w-5" />;
      case 'trojan':
        return <Skull className="h-5 w-5" />;
      case 'ransomware':
        return <AlertTriangle className="h-5 w-5" />;
      case 'spyware':
        return <Eye className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getSeverityColor = () => {
    switch (threat.severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = () => {
    switch (threat.status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'quarantined':
        return 'bg-amber-100 text-amber-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`p-2 rounded-full ${
            threat.severity === 'critical' || threat.severity === 'high' 
              ? 'bg-red-100 text-red-600' 
              : 'bg-blue-100 text-blue-600'
          } mr-3`}>
            {getThreatIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{threat.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
                {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {threat.type.charAt(0).toUpperCase() + threat.type.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Location: {threat.location}</p>
              <p>Size: {threat.fileSize}</p>
              <p>Detected: {threat.detectedAt.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
        {threat.status === 'active' && onQuarantine && (
          <button 
            onClick={onQuarantine}
            className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md text-sm hover:bg-amber-200 transition-colors"
          >
            Quarantine
          </button>
        )}
        
        {threat.status === 'quarantined' && onRestore && (
          <button 
            onClick={onRestore}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
          >
            Restore
          </button>
        )}
        
        {onDelete && (
          <button 
            onClick={onDelete}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};