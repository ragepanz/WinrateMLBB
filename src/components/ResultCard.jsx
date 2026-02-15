import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const RANKS = {
    "WARRIOR": { color: "text-slate-500", shadow: "shadow-slate-500/50" },
    "ELITE": { color: "text-slate-400", shadow: "shadow-slate-500/50" },
    "MASTER": { color: "text-yellow-600", shadow: "shadow-yellow-600/50" },
    "GRANDMASTER": { color: "text-slate-300", shadow: "shadow-slate-500/50" },
    "EPIC": { color: "text-emerald-400", shadow: "shadow-emerald-500/50" },
    "LEGEND": { color: "text-blue-400", shadow: "shadow-blue-500/50" },
    "MYTHIC": { color: "text-amber-400", shadow: "shadow-amber-500/50" },
    "MYTHIC HONOR": { color: "text-blue-300", shadow: "shadow-blue-400/50" },
    "MYTHICAL GLORY": { color: "text-red-400", shadow: "shadow-red-500/50" },
    "MYTHICAL IMMORTAL": { color: "text-red-600", shadow: "shadow-red-600/50" },
};

const getRankInfo = (wr) => {
    if (wr >= 80) return { title: "MYTHICAL IMMORTAL", ...RANKS["MYTHICAL IMMORTAL"] };
    if (wr >= 70) return { title: "MYTHICAL GLORY", ...RANKS["MYTHICAL GLORY"] };
    if (wr >= 60) return { title: "MYTHIC HONOR", ...RANKS["MYTHIC HONOR"] };
    if (wr >= 55) return { title: "LEGEND", ...RANKS["LEGEND"] };
    if (wr >= 50) return { title: "EPIC", ...RANKS["EPIC"] };
    return { title: "GRANDMASTER", ...RANKS["GRANDMASTER"] };
};

export const ResultCard = ({ results, error, userRank }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        let text = "";
        if (results.type === 'WinNeeded') text = `Butuh ${results.winNeeded} winstreak lagi buat target WR! - Cek di MLBB WR Tracker`;
        if (results.type === 'LooseNeeded') text = `Bisa lose streak ${results.loseNeeded} kali aman! - Cek di MLBB WR Tracker`;
        if (results.type === 'SimpleWinRate' || results.type === 'MatchDetails') text = `Winrate gue ${results.winRate}% bos! - Cek di MLBB WR Tracker`;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 p-4 rounded-2xl text-center text-red-200 font-medium"
            >
                {error}
            </motion.div>
        );
    }

    if (!results) return null;

    let rank;
    if (userRank && RANKS[userRank]) {
        rank = { title: userRank, ...RANKS[userRank] };
    } else {
        const displayWr = (results.type === 'SimpleWinRate' || results.type === 'MatchDetails') ? parseFloat(results.winRate) : 50;
        rank = getRankInfo(displayWr);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-slate-900/50 border border-slate-700/50 p-6 rounded-[2.5rem] text-center shadow-2xl backdrop-blur-md"
        >
            {/* Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

            <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-widest">Hasil Analisa</p>

            {results.type === 'WinNeeded' && (
                <>
                    <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 my-2 tracking-tighter drop-shadow-lg">
                        {results.winNeeded}
                    </h2>
                    <p className="text-white/90 text-sm font-medium">{results.message}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-400 flex justify-between items-center">
                        <span>Total Match Nanti:</span>
                        <span className="text-white font-bold text-lg">{results.totalFuture}</span>
                    </div>
                </>
            )}

            {results.type === 'LooseNeeded' && (
                <>
                    <h2 className="text-6xl font-black text-white my-2 tracking-tighter drop-shadow-lg">
                        {results.loseNeeded}
                    </h2>
                    <p className="text-white/90 text-sm font-medium">{results.message}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-400">
                        Total match nanti: <span className="text-white font-bold">{results.totalFuture}</span>
                    </div>
                </>
            )}

            {results.type === 'SimpleWinRate' && (
                <>
                    <h2 className={`text-6xl font-black my-2 tracking-tighter drop-shadow-lg ${rank.color}`}>
                        {results.winRate}%
                    </h2>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 mt-2 mb-4">
                        <span className={`text-xs font-bold ${rank.color} drop-shadow-md`}>{rank.title}</span>
                    </div>
                </>
            )}

            {results.type === 'MatchDetails' && (
                <>
                    <h2 className={`text-6xl font-black my-2 tracking-tighter drop-shadow-lg ${rank.color}`}>
                        {results.winRate}%
                    </h2>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 mt-2 mb-4">
                        <span className={`text-xs font-bold ${rank.color} drop-shadow-md`}>{rank.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-700/50">
                        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                            <p className="text-emerald-400 text-xs font-bold uppercase">Total Menang</p>
                            <p className="text-2xl font-black text-white">{results.totalWin}</p>
                        </div>
                        <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                            <p className="text-red-400 text-xs font-bold uppercase">Total Kalah</p>
                            <p className="text-2xl font-black text-white">{results.totalLose}</p>
                        </div>
                    </div>
                </>
            )}

            {/* Share Button */}
            <button
                onClick={handleCopy}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-sm font-semibold active:scale-95 group"
            >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-slate-500 group-hover:text-white transition-colors" />}
                {copied ? "Tersalin!" : "Bagikan Hasil"}
            </button>

        </motion.div>
    );
};
