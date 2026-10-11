import React from 'react';

const AIInsight = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-blue-200 dark:border-blue-800 w-full max-w-5xl mx-auto p-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded-md tracking-wide">VERSION 2</span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI privacy insight</h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Optional feature</span>
      </div>
      
      <h3 className="text-lg font-bold mb-2">What else might this image reveal?</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        AI can optionally inspect visible content for privacy clues that EXIF metadata cannot describe.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold text-sm mb-3">Possible visual privacy clues</h4>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc marker:text-slate-300">
            <li>Faces or people in the background</li>
            <li>Addresses, signs or recognizable locations</li>
            <li>Documents, IDs or screens</li>
            <li>Vehicle plates, badges or other identifiers</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center">
          <h4 className="font-semibold text-sm mb-3">Run optional AI check</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            The image is sent to the selected AI provider only after the user chooses this feature.
          </p>
          <button className="bg-brand-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors w-full shadow-sm">
            Analyze privacy risks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsight;