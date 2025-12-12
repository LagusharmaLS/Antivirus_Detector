import React, { useState } from 'react';
import { useThreats } from '../context/ThreatsContext';
import { generateRandomThreat } from '../utils/threatGenerator';
import { Upload, Check, AlertCircle, Loader } from 'lucide-react';

export const FileUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'scanning' | 'safe' | 'infected'>('idle');
  const [fileName, setFileName] = useState('');
  const { addThreat } = useThreats();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const simulateFileUpload = (file: File) => {
    setFileName(file.name);
    setIsUploading(true);
    setUploadStatus('scanning');
    
    // Simulate upload time
    setTimeout(() => {
      setIsUploading(false);
      
      // Randomly determine if file is infected (20% chance for demo purposes)
      const isInfected = Math.random() < 0.2;
      
      if (isInfected) {
        setUploadStatus('infected');
        const threat = generateRandomThreat();
        addThreat({
          ...threat,
          name: `${threat.name} in ${file.name}`,
          location: `/uploads/${file.name}`,
          fileSize: `${(file.size / 1024).toFixed(0)} KB`,
        });
      } else {
        setUploadStatus('safe');
        
        // Reset after showing "safe" status
        setTimeout(() => {
          setUploadStatus('idle');
          setFileName('');
        }, 3000);
      }
    }, 2000);
  };

  const getUploadStatusUI = () => {
    switch (uploadStatus) {
      case 'scanning':
        return (
          <div className="flex items-center text-blue-600">
            <Loader className="h-5 w-5 mr-2 animate-spin" />
            <span>Scanning {fileName}...</span>
          </div>
        );
      case 'safe':
        return (
          <div className="flex items-center text-green-600">
            <Check className="h-5 w-5 mr-2" />
            <span>File is safe!</span>
          </div>
        );
      case 'infected':
        return (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Virus detected! File has been quarantined.</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadStatus === 'idle' ? (
          <>
            <Upload className="h-10 w-10 text-blue-500 mb-3" />
            <p className="text-gray-700 mb-2">Drag and drop files here or click to upload</p>
            <p className="text-sm text-gray-500">All files will be automatically scanned for viruses</p>
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Select File
            </label>
          </>
        ) : (
          <div className="w-full">
            {getUploadStatusUI()}
            {uploadStatus === 'scanning' && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};