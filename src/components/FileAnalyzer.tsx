import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react';

interface AnalysisResult {
  fileName: string;
  fileType: string;
  fileSize: string;
  status: 'scanning' | 'clean' | 'suspicious' | 'malicious';
  threats: string[];
  timestamp: Date;
}

export const FileAnalyzer: React.FC = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setIsAnalyzing(true);
    
    // Simulate file analysis
    setTimeout(() => {
      const newResults = acceptedFiles.map((file): AnalysisResult => {
        const random = Math.random();
        return {
          fileName: file.name,
          fileType: file.type || 'application/octet-stream',
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          status: random > 0.8 ? 'malicious' : random > 0.6 ? 'suspicious' : 'clean',
          threats: random > 0.8 
            ? ['Trojan detected', 'Known malware signature'] 
            : random > 0.6 
            ? ['Suspicious behavior detected']
            : [],
          timestamp: new Date(),
        };
      });
      
      setAnalysisResults((prev) => [...newResults, ...prev]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getStatusIcon = (status: AnalysisResult['status']) => {
    switch (status) {
      case 'scanning':
        return <Loader className="h-5 w-5 animate-spin text-blue-500" />;
      case 'clean':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'malicious':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: AnalysisResult['status']) => {
    switch (status) {
      case 'scanning':
        return 'bg-blue-50 text-blue-700';
      case 'clean':
        return 'bg-green-50 text-green-700';
      case 'suspicious':
        return 'bg-amber-50 text-amber-700';
      case 'malicious':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <FileText className="h-12 w-12 text-blue-500 mb-3" />
        <p className="text-gray-700 mb-2">
          Drag and drop files here or click to select files
        </p>
        <p className="text-sm text-gray-500">
          Files will be automatically scanned for malware and suspicious content
        </p>
      </div>

      {isAnalyzing && (
        <div className="flex items-center justify-center p-4">
          <Loader className="h-6 w-6 text-blue-500 animate-spin mr-2" />
          <span className="text-gray-600">Analyzing files...</span>
        </div>
      )}

      <div className="space-y-4">
        {analysisResults.map((result, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 ${getStatusColor(result.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(result.status)}
                <div className="ml-3">
                  <h4 className="font-medium">{result.fileName}</h4>
                  <p className="text-sm opacity-80">
                    {result.fileType} • {result.fileSize}
                  </p>
                </div>
              </div>
              <span className="text-sm">
                {result.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            {result.threats.length > 0 && (
              <div className="mt-3 pl-8">
                <h5 className="font-medium mb-1">Detected Threats:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {result.threats.map((threat, i) => (
                    <li key={i}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {(result.status === 'suspicious' || result.status === 'malicious') && (
              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1 bg-white bg-opacity-20 rounded-md text-sm hover:bg-opacity-30 transition-colors">
                  Details
                </button>
                <button className="px-3 py-1 bg-white bg-opacity-20 rounded-md text-sm hover:bg-opacity-30 transition-colors">
                  Quarantine
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};