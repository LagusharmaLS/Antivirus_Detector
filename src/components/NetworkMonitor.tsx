import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Network, Shield, AlertTriangle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface NetworkData {
  timestamp: string;
  inbound: number;
  outbound: number;
  threats: number;
}

const generateMockData = (): NetworkData[] => {
  const data: NetworkData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    data.push({
      timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      inbound: Math.floor(Math.random() * 100),
      outbound: Math.floor(Math.random() * 80),
      threats: Math.random() < 0.2 ? Math.floor(Math.random() * 3) : 0,
    });
  }
  
  return data;
};

const networkData = generateMockData();

export const NetworkMonitor: React.FC = () => {
  const chartData = {
    labels: networkData.map(d => d.timestamp),
    datasets: [
      {
        label: 'Inbound Traffic',
        data: networkData.map(d => d.inbound),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Outbound Traffic',
        data: networkData.map(d => d.outbound),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Traffic (Mb/s)',
        },
      },
    },
  };

  const blockedConnections = networkData.reduce((sum, d) => sum + d.threats, 0);
  const averageInbound = Math.round(networkData.reduce((sum, d) => sum + d.inbound, 0) / networkData.length);
  const averageOutbound = Math.round(networkData.reduce((sum, d) => sum + d.outbound, 0) / networkData.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center text-blue-700">
            <Network className="h-5 w-5 mr-2" />
            <h4 className="font-medium">Inbound Traffic</h4>
          </div>
          <p className="text-2xl font-semibold text-blue-800 mt-2">{averageInbound} Mb/s</p>
          <p className="text-sm text-blue-600">Average over 24h</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center text-green-700">
            <Network className="h-5 w-5 mr-2" />
            <h4 className="font-medium">Outbound Traffic</h4>
          </div>
          <p className="text-2xl font-semibold text-green-800 mt-2">{averageOutbound} Mb/s</p>
          <p className="text-sm text-green-600">Average over 24h</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center text-amber-700">
            <Shield className="h-5 w-5 mr-2" />
            <h4 className="font-medium">Blocked Connections</h4>
          </div>
          <p className="text-2xl font-semibold text-amber-800 mt-2">{blockedConnections}</p>
          <p className="text-sm text-amber-600">Last 24 hours</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-medium text-gray-800 mb-4">Network Traffic Analysis</h4>
        <Line data={chartData} options={chartOptions} className="h-64" />
      </div>
      
      {blockedConnections > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h4 className="font-medium">Security Alert</h4>
          </div>
          <p className="text-sm text-red-600 mt-1">
            {blockedConnections} suspicious connection attempts were blocked in the last 24 hours.
            Review the security logs for more details.
          </p>
        </div>
      )}
    </div>
  );
};