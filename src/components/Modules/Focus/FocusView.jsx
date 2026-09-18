import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Timer, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

export const FocusView = () => {
  const { focusSessions, logFocusSession } = useApp();
  const [mode, setMode] = useState('focus'); // 'focus' (25m) | 'break' (5m)
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLabel, setSessionLabel] = useState('Deep Work Session');

  // Today focused time total
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = focusSessions.filter(s => s.date === todayStr);
  const todayTotalMins = todaySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        logFocusSession(durationMinutes, sessionLabel);
        alert('🎉 Focus Session Completed! Time for a refreshing break 🌸');
        setMode('break');
        setDurationMinutes(5);
        setSecondsLeft(5 * 60);
      } else {
        alert('🌱 Break ended! Ready for another focus cycle?');
        setMode('focus');
        setDurationMinutes(25);
        setSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, durationMinutes, sessionLabel, logFocusSession]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  };

  const switchMode = (newMode, mins) => {
    setIsRunning(false);
    setMode(newMode);
    setDurationMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  const minutesStr = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secondsStr = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '650px' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Focus Timer ⏱️</h1>
        <p className="section-desc">Immerse yourself in gentle, distraction-free focus cycles.</p>
      </div>

      <div className="bloom-card animate-pop-in" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
        {/* Mode Selector Tabs */}
        <div style={{ display: 'inline-flex', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '30px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button
            onClick={() => switchMode('focus', 25)}
            style={{
              padding: '0.4rem 1.2rem',
              borderRadius: '20px',
              border: 'none',
              background: mode === 'focus' ? 'var(--accent-primary)' : 'transparent',
              color: mode === 'focus' ? '#FFF' : 'var(--text-muted)',
              fontFamily: 'Quicksand',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            25m Focus 🎯
          </button>
          <button
            onClick={() => switchMode('break', 5)}
            style={{
              padding: '0.4rem 1.2rem',
              borderRadius: '20px',
              border: 'none',
              background: mode === 'break' ? 'var(--accent-primary)' : 'transparent',
              color: mode === 'break' ? '#FFF' : 'var(--text-muted)',
              fontFamily: 'Quicksand',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            5m Break 🍵
          </button>
        </div>

        {/* Circular Digital Timer Display */}
        <div 
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: '6px solid var(--accent-light)',
            margin: '0 auto 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(244, 143, 177, 0.2)',
            background: 'linear-gradient(135deg, #FFF 0%, #FFF5F8 100%)'
          }}
        >
          <div style={{ fontFamily: 'Quicksand', fontSize: '3.2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-1px' }}>
            {minutesStr}:{secondsStr}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--accent-dark)', fontWeight: 700 }}>
            {mode === 'focus' ? 'Deep Focus' : 'Gentle Break'}
          </div>
        </div>

        {/* Timer Label Input */}
        <div style={{ maxWidth: '300px', margin: '0 auto 1.5rem' }}>
          <input 
            type="text"
            className="form-input"
            style={{ textAlign: 'center', fontSize: '0.9rem' }}
            placeholder="Focus Session Title..."
            value={sessionLabel}
            onChange={e => setSessionLabel(e.target.value)}
          />
        </div>

        {/* Timer Control Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button className="bloom-btn bloom-btn-outline" onClick={resetTimer}>
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>

          <button className="bloom-btn bloom-btn-primary" style={{ padding: '0.75rem 2rem' }} onClick={toggleTimer}>
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>

        {/* Today Summary */}
        <div style={{ background: 'var(--accent-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--accent-dark)', fontWeight: 700 }}>
          Today: {Math.floor(todayTotalMins / 60)}h {todayTotalMins % 60}m focused ✨
        </div>
      </div>
    </div>
  );
};
