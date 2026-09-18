import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Companion } from '../../Shell/Companion';
import { Sprout, CheckCircle2, Circle, FileText, Sparkles, Droplet, ArrowRight, Heart } from 'lucide-react';

export const TodayDashboard = () => {
  const { habits, habitLogs, toggleHabitCompletion, setActiveTab, moods, logMood, waterLogs, updateWater } = useApp();

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const today = getTodayStr();
  const todayLogs = habitLogs[today] || {};

  // Calculate completed habits count
  const completedHabitsCount = habits.filter(h => {
    const val = todayLogs[h.id];
    if (h.type === 'count') return typeof val === 'number' && val >= h.goal;
    return !!val;
  }).length;

  const totalHabitsCount = habits.length;
  const progressPct = totalHabitsCount > 0 ? Math.round((completedHabitsCount / totalHabitsCount) * 100) : 0;

  // Mood options
  const moodOptions = [
    { label: 'Amazing', emoji: '😍' },
    { label: 'Good', emoji: '😊' },
    { label: 'Okay', emoji: '😐' },
    { label: 'Low', emoji: '😔' },
    { label: 'Tired', emoji: '😴' }
  ];

  const todayMoodObj = moods.find(m => m.date === today);

  const todayWater = waterLogs[today] || { current: 4, target: 8 };

  return (
    <div className="page-container animate-fade-in">
      {/* Header Greeting */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Quicksand', fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
          Good morning 🌷
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Here is your gentle snapshot for today.
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        
        {/* Left Column (8 cols on desktop) */}
        <div style={{ gridColumn: 'span 8' }}>
          
          {/* Mood Question Card */}
          <div className="bloom-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #FFF 0%, #FFF5F8 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-dark)' }}>
                How are you feeling today?
              </div>
              <Heart size={18} color="var(--accent-primary)" fill="var(--accent-primary)" />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {moodOptions.map(opt => {
                const isSelected = todayMoodObj?.mood?.includes(opt.emoji);
                return (
                  <button
                    key={opt.label}
                    onClick={() => logMood({ mood: `${opt.emoji} ${opt.label}`, energy: 4, stress: 2 })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.9rem',
                      borderRadius: '20px',
                      border: isSelected ? '2px solid var(--accent-dark)' : '1px solid var(--border-color)',
                      background: isSelected ? 'var(--accent-light)' : '#FFF',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: isSelected ? 'var(--accent-dark)' : 'var(--text-main)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Habits Progress Card */}
          <div className="bloom-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)' }}>
                  Today's Habits 🌱
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {completedHabitsCount} of {totalHabitsCount} habits completed
                </div>
              </div>
              <button className="bloom-btn bloom-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setActiveTab('habits')}>
                View All <ArrowRight size={14} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="bloom-progress-bar" style={{ marginBottom: '1.25rem', height: '12px' }}>
              <div className="bloom-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>

            {/* Habit Items Quick List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {habits.slice(0, 5).map(h => {
                const currentVal = todayLogs[h.id];
                const isDone = h.type === 'count' ? (typeof currentVal === 'number' && currentVal >= h.goal) : !!currentVal;

                return (
                  <div 
                    key={h.id} 
                    onClick={() => toggleHabitCompletion(h.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isDone ? 'var(--accent-subtle)' : 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{h.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                          {h.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {h.type === 'count' ? `${currentVal || 0}/${h.goal} ${h.unit}` : h.type === 'duration' ? `${h.goal} ${h.unit}` : isDone ? 'Completed' : 'Not completed yet'}
                        </div>
                      </div>
                    </div>

                    <div>
                      {isDone ? (
                        <CheckCircle2 size={22} color="var(--accent-dark)" fill="var(--accent-light)" />
                      ) : (
                        <Circle size={22} color="var(--border-focus)" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Encouragement Banner / Little Win */}
          <div className="bloom-card" style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FCE4EC 100%)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Sparkles size={24} color="var(--accent-dark)" />
              <div>
                <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent-dark)' }}>
                  ✨ Little Win
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {completedHabitsCount > 0 
                    ? `You've completed ${completedHabitsCount} habits today! Keep enjoying your quiet momentum.` 
                    : 'Every small step counts today. Take it easy and nurture your rhythm 🌸'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols on desktop) */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Companion Widget */}
          <Companion />

          {/* Quick Note Widget */}
          <div className="bloom-card" onClick={() => setActiveTab('notes')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <FileText size={18} color="var(--accent-dark)" />
              <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.05rem' }}>
                Quick Note
              </div>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              What's on your mind right now? Tap to open your private digital notebook 📝
            </div>
          </div>

          {/* Water Tracker Widget */}
          <div className="bloom-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.05rem' }}>
                <Droplet size={18} color="#4FC3F7" />
                <span>Water Hydration</span>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-dark)' }}>
                {todayWater.current} / {todayWater.target}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
              {Array.from({ length: todayWater.target }).map((_, idx) => (
                <span 
                  key={idx}
                  onClick={() => updateWater(idx < todayWater.current ? -1 : 1)}
                  style={{ fontSize: '1.3rem', cursor: 'pointer', opacity: idx < todayWater.current ? 1 : 0.3 }}
                >
                  🥤
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
