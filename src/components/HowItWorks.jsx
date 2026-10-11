import React from 'react';

const HowItWorks = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-8 px-4" id="how-it-works">
      <h2 className="text-xl font-bold mb-6">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="text-brand-blue text-xs font-bold mb-2">01</div>
          <h3 className="font-bold text-sm mb-1">Choose image</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Select or drop a photo.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="text-brand-blue text-xs font-bold mb-2">02</div>
          <h3 className="font-bold text-sm mb-1">Inspect</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Read EXIF metadata locally.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="text-brand-blue text-xs font-bold mb-2">03</div>
          <h3 className="font-bold text-sm mb-1">Review</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Understand privacy clues.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="text-brand-blue text-xs font-bold mb-2">04</div>
          <h3 className="font-bold text-sm mb-1">Clean</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Remove metadata and download.</p>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-900 text-white rounded-xl p-6 flex justify-between items-center text-sm">
        <div className="font-bold">Privacy Checker</div>
        <div className="text-slate-400 text-xs text-right">Client-side EXIF Tools • No backend database • No account required</div>
      </div>
    </div>
  );
};

export default HowItWorks;