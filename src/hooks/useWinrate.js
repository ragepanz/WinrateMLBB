import { useState, useCallback } from 'react';

export const useWinrate = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const validateInputs = (inputs) => {
    for (const [key, value] of Object.entries(inputs)) {
      if (!value || isNaN(parseFloat(value))) {
        return `Isi ${key} dengan angka yang valid.`;
      }
    }
    return null;
  };

  const calculateWinNeeded = useCallback((totalMatches, currentWr, targetWr) => {
    const tMatch = parseInt(totalMatches);
    const cWr = parseFloat(currentWr);
    const tWr = parseFloat(targetWr);

    const errorMsg = validateInputs({ 'Total Match': tMatch, 'Winrate Sekarang': cWr, 'Target Winrate': tWr });
    if (errorMsg) {
      setError(errorMsg);
      setResults(null);
      return;
    }

    if (tWr > 100 || cWr > 100) {
      setError("Winrate tidak bisa lebih dari 100%.");
      setResults(null);
      return;
    }

    if (tWr <= cWr) {
      setError("Target WR harus lebih tinggi dari WR sekarang!");
      setResults(null);
      return;
    }

    const currentWins = Math.round(tMatch * (cWr / 100));
    const winNeeded = Math.ceil((tWr * tMatch - 100 * currentWins) / (100 - tWr));

    if (winNeeded < 0 || !isFinite(winNeeded)) {
      setError("Hasil tidak valid (mungkin target terlalu tinggi).");
      setResults(null);
      return;
    }

    setError(null);
    setResults({
      type: 'WinNeeded',
      winNeeded,
      totalFuture: tMatch + winNeeded,
      message: `Kamu butuh ${winNeeded} winstreak tanpa kalah.`
    });
  }, []);

  const calculateLooseCount = useCallback((totalMatches, currentWr, targetWr) => {
    const tMatch = parseInt(totalMatches);
    const cWr = parseFloat(currentWr);
    const tWr = parseFloat(targetWr);

    const errorMsg = validateInputs({ 'Total Match': tMatch, 'Winrate Sekarang': cWr, 'Target Winrate': tWr });
    if (errorMsg) return setError(errorMsg);

    if (tWr >= cWr) {
      setError("Target WR harus lebih rendah untuk hitung loose!");
      setResults(null);
      return;
    }

    const currentWins = Math.round(tMatch * (cWr / 100));
    // Formula: (CurrentWins) / (TotalMatches + GenericMatches) = TargetWR
    // CurrentWins = TargetWR * TotalMatches + TargetWR * GenericMatches
    // GenericMatches = (CurrentWins - TargetWR * TotalMatches) / TargetWR

    const matchesNeeded = Math.ceil((currentWins - (tWr / 100) * tMatch) / (tWr / 100));

    setError(null);
    setResults({
      type: 'LooseNeeded',
      loseNeeded: matchesNeeded,
      totalFuture: tMatch + matchesNeeded,
      message: `Anda bisa lose streak sebanyak ${matchesNeeded} kali.`
    });
  }, []);

  const calculateWinRate = useCallback((totalMatches, totalWins) => {
    const tMatch = parseInt(totalMatches);
    const tWins = parseInt(totalWins);

    const errorMsg = validateInputs({ 'Total Match': tMatch, 'Total Menang': tWins });
    if (errorMsg) return setError(errorMsg);

    if (tWins > tMatch) {
      setError("Total menang tidak boleh lebih dari total match!");
      setResults(null);
      return;
    }

    const wr = (tWins / tMatch) * 100;

    setError(null);
    setResults({
      type: 'SimpleWinRate',
      winRate: wr.toFixed(2),
      message: `Winrate anda adalah ${wr.toFixed(2)}%`
    });
  }, []);

  const calculateMatchDetails = useCallback((totalMatches, currentWr) => {
    const tMatch = parseInt(totalMatches);
    const cWr = parseFloat(currentWr);

    const errorMsg = validateInputs({ 'Total Match': tMatch, 'Winrate Sekarang': cWr });
    if (errorMsg) return setError(errorMsg);

    if (cWr > 100 || cWr < 0) {
      setError("Winrate harus antara 0 - 100%");
      setResults(null);
      return;
    }

    const totalWin = Math.round(tMatch * (cWr / 100));
    const totalLose = tMatch - totalWin;

    setError(null);
    setResults({
      type: 'MatchDetails',
      totalWin,
      totalLose,
      winRate: cWr,
      message: `Detail Match Anda`
    });
  }, []);

  return {
    calculateWinNeeded,
    calculateLooseCount,
    calculateWinRate,
    calculateMatchDetails,
    results,
    error,
    reset: () => { setResults(null); setError(null); }
  };
};