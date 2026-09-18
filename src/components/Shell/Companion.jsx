import React from 'react';
import { useApp } from '../../context/AppContext';

export const Companion = () => {
  const { companion } = useApp();
  const level = companion?.level || 1;
  const xp = companion?.xp || 0;

  const stages = [
    { level: 1, name: 'Tiny Seed', icon: '🌰', minXP: 0, maxXP: 50 },
    { level: 2, name: 'Growing Sprout', icon: '🌱', minXP: 51, maxXP: 120 },
    { level: 3, name: 'Cute Plant', icon: '🪴', minXP: 121, maxXP: 250 },
    { level: 4, name: 'Blooming Flower', icon: '🌸', minXP: 251, maxXP: 500 }
  ];

  const currentStage = stages.find(s => s.level === level) || stages[0];
  const progressPct = Math.min(100, Math.round((xp / currentStage.maxXP) * 100));

  return (
    <div className="bloom-card animate-pop-in" style={{ padding: '1.2rem', textAlign: 'center', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }} className="animate-float">
        {currentStage.icon}
      </div>
      <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent-dark)' }}>
        {currentStage.name}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Level {level} Companion • {xp} XP
      </div>
      
      <div className="bloom-progress-bar" style={{ height: '8px' }}>
        <div className="bloom-progress-fill" style={{ width: `${progressPct}%` }}></div>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.6rem', fontStyle: 'italic' }}>
        “You're growing beautifully every day 🌷”
      </div>
    </div>
  );
};
