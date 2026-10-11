import React from 'react';
import { X, Download, ShieldAlert, CheckCircle, Smartphone, Calendar, FileText } from 'lucide-react';
import { generatePdfReport } from '../utils/reportGenerator';
import { formatBytes } from '../utils/exifReader';

const ReportModal = ({ isOpen, onClose, file, metadata }) => {
  if (!isOpen) return null;

  const hasGps = metadata && (metadata.latitude !== undefined || metadata.GPSLatitude !== undefined);
  const device = metadata?.Model || metadata?.Make ? `${metadata?.Make || ''} ${metadata?.Model || ''}`.trim() : 'Unknown';
  const dateTaken = metadata?.DateTimeOriginal ? new Date(metadata.DateTimeOriginal).toLocaleString() : 'Unknown';
  const rawData = JSON.stringify(metadata || {}, null, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Metadata Report</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{file.name} • {formatBytes(file.size)}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Risk Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                {hasGps ? <ShieldAlert className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                GPS Location
              </div>
              <div className={`text-base font-bold ${hasGps ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                {hasGps ? 'Found in file' : 'Not exposed'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                <Smartphone className="w-4 h-4 text-brand-blue" />
                Device Information
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white truncate" title={device}>
                {device}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                <Calendar className="w-4 h-4 text-brand-blue" />
                Date & Time
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                {dateTaken}
              </div>
            </div>
          </div>

          {/* Raw Parsed Fields */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">Raw Metadata Fields ({Object.keys(metadata || {}).length})</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono max-h-64">
              <pre>{rawData}</pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={() => generatePdfReport(file, metadata)}
            className="flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportModal;