import React, { useState } from 'react';
import { Check, Download, FileText } from 'lucide-react';
import { cleanImageMetadata } from '../utils/metadataCleaner';
import { downloadBlob } from '../utils/downloadFile';
import { formatBytes } from '../utils/exifReader';
import { generatePdfReport } from '../utils/reportGenerator';
import ReportModal from './ReportModal';

const AnalysisResult = ({ file, metadata, previewUrl }) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanedFile, setCleanedFile] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const hasGps = metadata && (metadata.latitude !== undefined || metadata.GPSLatitude !== undefined);
  const device = metadata?.Model || metadata?.Make ? `${metadata?.Make || ''} ${metadata?.Model || ''}`.trim() : 'Unknown';
  const dateTaken = metadata?.DateTimeOriginal ? new Date(metadata.DateTimeOriginal).toLocaleString() : 'Unknown';
  const hasMetadata = Object.keys(metadata || {}).length > 0;

  // Handler 1: Remove Metadata
  const handleRemoveMetadata = async () => {
    setIsCleaning(true);
    try {
      const cleaned = await cleanImageMetadata(file);
      setCleanedFile(cleaned);
    } catch (err) {
      console.error("Cleaning failed:", err);
    } finally {
      setIsCleaning(false);
    }
  };

  // Handler 2: Download Clean Copy (preserves file format)
  const handleDownloadCleanCopy = async () => {
    if (cleanedFile) {
      downloadBlob(cleanedFile, cleanedFile.name);
    } else {
      setIsCleaning(true);
      try {
        const cleaned = await cleanImageMetadata(file);
        setCleanedFile(cleaned);
        downloadBlob(cleaned, cleaned.name);
      } catch (err) {
        console.error("Clean and download failed:", err);
      } finally {
        setIsCleaning(false);
      }
    }
  };

  // Handler 3: View Report Modal
  const handleViewReport = () => {
    setIsReportOpen(true);
  };

  // Handler 4: Download PDF Report
  const handleDownloadReport = () => {
    generatePdfReport(file, metadata);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-5xl mx-auto shadow-sm overflow-hidden mb-8 transition-colors">
        <div className="border-b border-slate-200 dark:border-slate-700 p-4 px-6 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-brand-blue tracking-wider">ANALYSIS RESULT</span>
            {hasMetadata ? (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                EXIF found
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                Clean
              </span>
            )}
          </div>
          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {file.name} <span className="text-slate-400 font-normal ml-2">{formatBytes(file.size)}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Photo Preview */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-slate-700 aspect-square md:aspect-auto">
              <span className="text-xs text-slate-400 font-semibold mb-2 tracking-wider">PHOTO PREVIEW</span>
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded-md shadow-sm mb-2" />
              )}
              <span className="text-xs text-slate-400 mb-1">Original image</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate w-full px-2">{file.name}</span>
            </div>

            {/* GPS Location */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-2 font-medium">GPS location</div>
                <div className={`text-xl font-bold mb-2 ${hasGps ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                  {hasGps ? 'Found' : 'Not found'}
                </div>
                {hasGps && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 text-xs px-2 py-0.5 rounded font-medium mb-2">
                    Privacy-sensitive
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {hasGps ? 'May reveal where the photo was taken.' : 'No GPS coordinates detected.'}
              </p>
            </div>

            {/* Device */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-2 font-medium">Device</div>
                <div className="text-lg font-bold mb-2 text-slate-900 dark:text-white truncate" title={device}>
                  {device}
                </div>
                {device !== 'Unknown' && (
                  <span className="inline-block bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded font-medium mb-2">
                    Detected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Device information detected.</p>
            </div>

            {/* Date taken */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-2 font-medium">Date taken</div>
                <div className="text-sm font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">
                  {dateTaken}
                </div>
                {dateTaken !== 'Unknown' && (
                  <span className="inline-block bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded font-medium mb-2">
                    Detected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Original capture timestamp.</p>
            </div>
          </div>

          {/* Control Bar - Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-700 pt-5 mt-2">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Button 1: Remove Metadata */}
              <button 
                onClick={handleRemoveMetadata}
                disabled={isCleaning}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors text-sm shadow-sm
                  ${cleanedFile 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                <Check className="w-4 h-4" />
                {isCleaning ? 'Cleaning...' : cleanedFile ? 'Metadata removed' : 'Remove metadata'}
              </button>
              
              {/* Button 2: Download Clean Copy */}
              <button 
                onClick={handleDownloadCleanCopy}
                className="flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download clean copy
              </button>

              {/* Button 3: View Report */}
              <button 
                onClick={handleViewReport}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-md font-medium transition-colors text-sm"
              >
                view report
              </button>
              
              {/* Button 4: Download Report */}
              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-md font-medium transition-colors text-sm"
              >
                Download report
              </button>
            </div>

            <span className="text-xs text-slate-400 whitespace-nowrap">Original stays untouched.</span>
          </div>
        </div>
      </div>

      {/* Interactive Report Modal */}
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        file={file} 
        metadata={metadata} 
      />
    </>
  );
};

export default AnalysisResult;