import React from 'react';
import { Sun, Moon, Shield } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-2 text-brand-blue font-bold text-xl">
        <Shield className="w-6 h-6" />
        <span>Privacy Checker</span>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <a href="#how-it-works" className="hover:text-brand-blue transition-colors hidden sm:block">How it works</a>
        <a href="#privacy" className="hover:text-brand-blue transition-colors hidden sm:block">Privacy</a>
        
        <div 
          onClick={toggleDarkMode}
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full p-1 cursor-pointer select-none"
        >
          <div className={`p-1.5 rounded-full ${!isDarkMode ? 'bg-white shadow' : ''}`}>
            <Sun className="w-4 h-4 text-slate-700 dark:text-slate-400" />
          </div>
          <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-slate-700 shadow text-white' : ''}`}>
            <Moon className="w-4 h-4 text-slate-400 dark:text-white" />
          </div>
        </div>
        
        <button className="bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm">
          Analyze locally
        </button>
      </div>
    </nav>
  );
};

export default Navbar;