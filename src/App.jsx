import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Target, Trophy, Swords, RefreshCw, MinusCircle, Percent } from 'lucide-react';
import { useWinrate } from './hooks/useWinrate';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';

function App() {
  // Load initial state from localStorage or use defaults
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'target');
  const [form, setForm] = useState(() => {
    const savedForm = localStorage.getItem('winrateForm');
    return savedForm ? JSON.parse(savedForm) : {
      totalMatch: '',
      totalWin: '',
      currentWr: '',
      targetWr: '',
      selectedRank: ''
    };
  });

  // Save to localStorage whenever state changes
  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('winrateForm', JSON.stringify(form));
  }, [activeTab, form]);

  const { calculateWinNeeded, calculateWinRate, calculateLooseCount, calculateMatchDetails, results, error, reset } = useWinrate();

  const handleCalculate = () => {
    if (activeTab === 'target') {
      calculateWinNeeded(form.totalMatch, form.currentWr, form.targetWr);
    } else if (activeTab === 'winrate') {
      calculateMatchDetails(form.totalMatch, form.currentWr);
    } else if (activeTab === 'loose') {
      calculateLooseCount(form.totalMatch, form.currentWr, form.targetWr);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setForm({ totalMatch: '', totalWin: '', currentWr: '', targetWr: '', selectedRank: '' });
    reset();
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-300 p-6 flex justify-center items-start pt-10 md:items-center md:pt-0 font-sans selection:bg-violet-500/30 overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="inline-flex p-3 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-2xl shadow-xl shadow-violet-600/20 mb-2"
          >
            <Swords size={32} className="text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-white to-fuchsia-200 tracking-tighter"
          >
            WR TRACKER
          </motion.h1>
          <p className="text-slate-500 text-sm font-medium">Kalkulator Winrate Mobile Legends</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 backdrop-blur-md">
          {[
            { id: 'target', label: 'Target WR', icon: Target },
            { id: 'winrate', label: 'Cek Detail', icon: Percent },
            { id: 'loose', label: 'Lose Streak', icon: MinusCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                ? 'bg-slate-800 text-white shadow-lg shadow-black/20'
                : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 relative z-10"
            >
              {activeTab === 'target' && (
                <>
                  <InputField
                    label="Total Match" icon={Calculator} type="number" placeholder="Contoh: 1250"
                    value={form.totalMatch} onChange={e => setForm({ ...form, totalMatch: e.target.value })}
                  />
                  <InputField
                    label="Winrate Sekarang (%)" icon={Trophy} type="number" placeholder="Contoh: 50.5"
                    value={form.currentWr} onChange={e => setForm({ ...form, currentWr: e.target.value })}
                  />
                  <InputField
                    label="Target Winrate (%)" icon={Target} type="number" placeholder="Contoh: 60"
                    value={form.targetWr} onChange={e => setForm({ ...form, targetWr: e.target.value })}
                  />
                </>
              )}

              {activeTab === 'winrate' && (
                <>
                  <InputField
                    label="Total Match" icon={Calculator} type="number" placeholder="Contoh: 512"
                    value={form.totalMatch} onChange={e => setForm({ ...form, totalMatch: e.target.value })}
                  />
                  <InputField
                    label="Winrate Sekarang (%)" icon={Trophy} type="number" placeholder="Contoh: 50.5"
                    value={form.currentWr} onChange={e => setForm({ ...form, currentWr: e.target.value })}
                  />
                </>
              )}

              {activeTab === 'loose' && (
                <>
                  <InputField
                    label="Total Match" icon={Calculator} type="number" placeholder="Contoh: 1250"
                    value={form.totalMatch} onChange={e => setForm({ ...form, totalMatch: e.target.value })}
                  />
                  <InputField
                    label="Winrate Sekarang (%)" icon={Trophy} type="number" placeholder="Contoh: 65.5"
                    value={form.currentWr} onChange={e => setForm({ ...form, currentWr: e.target.value })}
                  />
                  <InputField
                    label="Target Winrate (%)" icon={Target} type="number" placeholder="Contoh: 60"
                    value={form.targetWr} onChange={e => setForm({ ...form, targetWr: e.target.value })}
                  />
                </>
              )}

              {/* Rank Selection - Optional */}
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-700/50">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider flex items-center gap-2">
                  <Trophy size={14} /> Pilih Rank Anda (Opsional)
                </label>
                <div className="relative">
                  <select
                    value={form.selectedRank || ''}
                    onChange={(e) => setForm({ ...form, selectedRank: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none font-medium cursor-pointer hover:bg-slate-800/50"
                  >
                    <option value="" className="bg-slate-900">Otomatis (Berdasarkan WR)</option>
                    <option value="WARRIOR" className="bg-slate-900">Warrior</option>
                    <option value="ELITE" className="bg-slate-900">Elite</option>
                    <option value="MASTER" className="bg-slate-900">Master</option>
                    <option value="GRANDMASTER" className="bg-slate-900">Grandmaster</option>
                    <option value="EPIC" className="bg-slate-900">Epic</option>
                    <option value="LEGEND" className="bg-slate-900">Legend</option>
                    <option value="MYTHIC" className="bg-slate-900">Mythic</option>
                    <option value="MYTHIC HONOR" className="bg-slate-900">Mythic Honor</option>
                    <option value="MYTHICAL GLORY" className="bg-slate-900">Mythical Glory</option>
                    <option value="MYTHICAL IMMORTAL" className="bg-slate-900">Mythical Immortal</option>
                  </select>
                  <div className="absolute right-4 top-3.5 text-slate-500 pointer-events-none">▼</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-2">
            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-4 rounded-2xl text-white font-bold transition-all active:scale-95 shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 group"
            >
              <Calculator size={20} className="group-hover:rotate-12 transition-transform" />
              Hitung Hasil
            </button>
            <button
              onClick={() => { setForm({ totalMatch: '', totalWin: '', currentWr: '', targetWr: '', selectedRank: '' }); reset(); }}
              className="w-full mt-3 text-slate-500 hover:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Reset Calculator
            </button>
          </div>
        </div>

        {/* Result Area */}
        <div className="min-h-[100px]">
          <AnimatePresence mode="wait">
            <ResultCard key={results ? 'res' : 'err'} results={results} error={error} userRank={form.selectedRank} />
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs text-medium">
          Dibuat dengan 🔥 untuk para Pemburu WR
        </p>
      </div>
    </div>
  );
}

export default App;