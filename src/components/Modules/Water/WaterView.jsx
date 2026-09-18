import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Droplet, Plus, Minus, Settings } from 'lucide-react';

export const WaterView = () => {
  const { waterLogs, updateWater, setWaterTarget } = useApp();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayWater = waterLogs[todayStr] || { current: 5, target: 8 };

  const [newTargetInput, setNewTargetInput] = useState(todayWater.target);
  const [editingTarget, setEditingTarget] = useState(false);

  const handleSaveTarget = (e) => {
    e.preventDefault();
    setWaterTarget(parseInt(newTargetInput) || 8);
    setEditingTarget(false);
  };

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Daily Water Hydration 💧</h1>
        <p className="section-desc">Keep your body hydrated and refreshed throughout the day.</p>
      </div>

      <div className="bloom-card animate-pop-in" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }} className="animate-float">
          🥤
        </div>

        <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '2rem', color: 'var(--accent-dark)', marginBottom: '0.2rem' }}>
          {todayWater.current} / {todayWater.target} Glasses
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          ({todayWater.current * 250} ml / {todayWater.target * 250} ml target)
        </div>

        {/* Glasses Visual Row */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {Array.from({ length: todayWater.target }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => updateWater(idx < todayWater.current ? -1 : 1)}
              style={{
                fontSize: '2rem',
                cursor: 'pointer',
                opacity: idx < todayWater.current ? 1 : 0.2,
                transform: idx < todayWater.current ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            >
              🥤
            </span>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button className="bloom-btn bloom-btn-outline" onClick={() => updateWater(-1)}>
            <Minus size={16} />
            <span>Remove Glass</span>
          </button>

          <button className="bloom-btn bloom-btn-primary" onClick={() => updateWater(1)}>
            <Plus size={16} />
            <span>Drink Glass (+250ml)</span>
          </button>
        </div>

        {/* Edit Target Form Toggle */}
        {!editingTarget ? (
          <button 
            style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setEditingTarget(true)}
          >
            Adjust Daily Goal Target ({todayWater.target} glasses)
          </button>
        ) : (
          <form onSubmit={handleSaveTarget} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <input 
              type="number"
              min="1"
              max="20"
              className="form-input"
              style={{ width: '80px', textAlign: 'center' }}
              value={newTargetInput}
              onChange={e => setNewTargetInput(e.target.value)}
            />
            <button type="submit" className="bloom-btn bloom-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              Save Goal
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
