import React from 'react';

export const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter ml-1">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={20} />
      <input 
        {...props}
        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all"
      />
    </div>
  </div>
);