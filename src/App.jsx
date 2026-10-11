import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import AnalysisResult from './components/AnalysisResult';
import AIInsight from './components/AIInsight';
import HowItWorks from './components/HowItWorks';
import { extractMetadata } from './utils/exifReader';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // Handle system preference on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Update HTML class for Tailwind dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // Extract metadata
    const data = await extractMetadata(file);
    setMetadata(data);
  };

  return (
    <div className="min-h-screen">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-12 pb-20 px-4">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full tracking-wide mb-4">
            PRIVATE BY DEFAULT
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Know what your photos reveal.
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Inspect hidden image metadata, understand privacy risks, and clean your photos before you share them.
          </p>
        </div>

        {/* Dynamic Content based on file state */}
        {!selectedFile ? (
          <UploadBox onFileSelect={handleFileSelect} />
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Allow users to select a different file */}
            <div className="max-w-5xl mx-auto w-full flex justify-end mb-[-10px]">
               <button 
                 onClick={() => { setSelectedFile(null); setMetadata(null); setPreviewUrl(null); }}
                 className="text-sm text-brand-blue hover:underline dark:text-blue-400 font-medium"
               >
                 + Analyze another photo
               </button>
            </div>
            
            <AnalysisResult file={selectedFile} metadata={metadata} previewUrl={previewUrl} />
            <AIInsight />
          </div>
        )}
        
        <HowItWorks />
      </main>
    </div>
  );
}

export default App;