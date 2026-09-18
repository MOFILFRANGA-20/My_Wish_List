import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Smile, Calendar, Heart, Zap, ShieldAlert } from 'lucide-react';

export const MoodView = () => {
  const { moods, logMood } = useApp();
  const todayStr = new Date().toISOString().split('T')[0];

  const moodOptions = [
    { label: 'Amazing', emoji: '😍' },
    { label: 'Good', emoji: '😊' },
    { label: 'Okay', emoji: '😐' },
    { label: 'Low', emoji: '😔' },
    { label: 'Tired', emoji: '😴' }
  ];

  const [selectedMood, setSelectedMood] = useState('😊 Good');
  const [energy, setEnergy] = useState(4);
  const [stress, setStress] = useState(2);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    logMood({ mood: selectedMood, energy: parseInt(energy), stress: parseInt(stress), note });
    setNote('');
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Mood & Well-being 😊</h1>
        <p className="section-desc">Reflect gently on how you are feeling, your energy, and stress levels.</p>
      </div>

      <div className="grid-2">
        {/* Log Mood Form Card */}
        <div className="bloom-card">
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Record Today's Mood
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">How are you feeling?</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                {moodOptions.map(m => {
                  const val = `${m.emoji} ${m.label}`;
                  const isSelected = selectedMood === val;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSelectedMood(val)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem',
                        padding: '0.75rem 0.4rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--accent-dark)' : '1px solid var(--border-color)',
                        background: isSelected ? 'var(--accent-light)' : 'var(--bg-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Energy Level (1-5)</span>
                <span>⚡ {energy} / 5</span>
              </label>
              <input 
                type="range"
                min="1"
                max="5"
                value={energy}
                onChange={e => setEnergy(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Stress Level (1-5)</span>
                <span>🌿 {stress} / 5</span>
              </label>
              <input 
                type="range"
                min="1"
                max="5"
                value={stress}
                onChange={e => setStress(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Optional Note</label>
              <input 
                type="text"
                className="form-input"
                placeholder="Why are you feeling this way today?"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            <button type="submit" className="bloom-btn bloom-btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Save Mood Entry
            </button>
          </form>
        </div>

        {/* Mood History Log Card */}
        <div className="bloom-card">
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Mood Log History
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
            {moods.map((m, idx) => (
              <div key={idx} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    {m.mood}
                  </div>
                  {m.note && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      "{m.note}"
                    </div>
                  )}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Energy: {m.energy}/5 • Stress: {m.stress}/5
                  </div>
                </div>
                <span className="bloom-badge">{m.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
