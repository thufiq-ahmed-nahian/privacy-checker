import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

const UploadBox = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 w-full max-w-4xl mx-auto transition-colors">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Check a photo</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Your original image stays on your device during the basic check.</p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-xl py-16 px-6 flex flex-col items-center justify-center transition-colors
          ${isDragging ? 'border-brand-blue bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-600'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full mb-4">
          <Upload className="w-6 h-6 text-brand-blue dark:text-blue-400" />
        </div>
        
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleChange}
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-brand-blue hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium mb-3 transition-colors shadow-sm"
        >
          Choose image
        </button>
        
        <div className="text-brand-blue font-semibold mb-3">or</div>
        <div className="text-lg font-medium mb-4">Drop an image here</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          JPG, PNG or WebP • Processed locally
        </div>
      </div>
    </div>
  );
};

export default UploadBox;