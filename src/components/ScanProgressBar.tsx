import React from 'react';

interface ScanProgressBarProps {
  progress: number;
  status: 'active' | 'paused' | 'complete' | 'cancelled';
}

export const ScanProgressBar: React.FC<ScanProgressBarProps> = ({ progress, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-amber-500';
      case 'complete':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Scanning...';
      case 'paused':
        return 'Paused';
      case 'complete':
        return 'Complete';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          {getStatusText()}
        </span>
        <span className="text-sm font-medium text-gray-700">{progress.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};