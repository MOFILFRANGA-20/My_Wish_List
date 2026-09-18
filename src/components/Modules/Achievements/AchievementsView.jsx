import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

export const AchievementsView = () => {
  const { achievements } = useApp();

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Personal Milestone Badges 🏆</h1>
        <p className="section-desc">Gentle achievements unlocked as you build positive habits and quiet rhythms.</p>
      </div>

      <div className="grid-3">
        {achievements.map(a => (
          <div 
            key={a.id} 
            className="bloom-card"
            style={{
              opacity: a.unlocked ? 1 : 0.6,
              background: a.unlocked ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%)' : 'var(--bg-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{a.icon}</span>
              {a.unlocked ? (
                <span className="bloom-badge" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                  Unlocked ✨
                </span>
              ) : (
                <span className="bloom-badge" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                  Locked 🔒
                </span>
              )}
            </div>

            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
              {a.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
