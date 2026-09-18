import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { Sprout, Plus, CheckCircle2, Circle, Flame, Calendar, Award, Trash2, Edit2, RotateCcw } from 'lucide-react';

export const HabitsView = () => {
  const { habits, habitLogs, toggleHabitCompletion, addHabit, editHabit, deleteHabit } = useApp();
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    icon: '🌱',
    type: 'boolean', // boolean | count | duration | time
    goal: 1,
    unit: 'session',
    frequency: 'Daily',
    reminder: '09:00'
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const today = getTodayStr();
  const todayLogs = habitLogs[today] || {};

  // Habit Statistics Calculation
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => {
    const val = todayLogs[h.id];
    return h.type === 'count' ? (typeof val === 'number' && val >= h.goal) : !!val;
  }).length;
  const completionPct = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Open modal for new habit
  const handleOpenNew = () => {
    setEditingHabit(null);
    setFormData({
      name: '',
      icon: '🌱',
      type: 'boolean',
      goal: 1,
      unit: 'session',
      frequency: 'Daily',
      reminder: '09:00'
    });
    setModalOpen(true);
  };

  // Open modal for editing existing habit
  const handleOpenEdit = (h) => {
    setEditingHabit(h);
    setFormData({
      name: h.name,
      icon: h.icon || '🌱',
      type: h.type || 'boolean',
      goal: h.goal || 1,
      unit: h.unit || 'session',
      frequency: h.frequency || 'Daily',
      reminder: h.reminder || '09:00'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingHabit) {
      editHabit(editingHabit.id, formData);
    } else {
      addHabit(formData);
    }
    setModalOpen(false);
  };

  // Weekly days header (Mon-Sun)
  const getWeekDays = () => {
    const days = [];
    const now = new Date();
    const dayOfWeek = now.getDay();
    const distanceToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMon);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const str = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ dateStr: str, dayName, isToday: str === today });
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="page-container animate-fade-in">
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Habits & Routines 🌱</h1>
          <p className="section-desc">Build soft, nourishing daily rhythms at your own comfortable pace.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.2rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
            {['daily', 'weekly', 'monthly'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: viewMode === mode ? 'var(--accent-primary)' : 'transparent',
                  color: viewMode === mode ? '#FFF' : 'var(--text-muted)',
                  fontFamily: 'Quicksand',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <button className="bloom-btn bloom-btn-primary" onClick={handleOpenNew}>
            <Plus size={16} />
            <span>New Habit</span>
          </button>
        </div>
      </div>

      {/* Habits Stats Overview */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.8rem', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Today's Progress</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {completedToday} / {totalHabits} ({completionPct}%)
            </div>
          </div>
        </div>

        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.8rem', borderRadius: '50%', background: '#FFE082', color: '#E65100' }}>
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Habit Streak</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
              4 Days 🔥
            </div>
          </div>
        </div>

        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.8rem', borderRadius: '50%', background: '#C8E6C9', color: '#2E7D32' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Habits Tracked</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {totalHabits} Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Habits List depending on view mode */}
      {habits.length === 0 ? (
        <EmptyState
          icon="🌱"
          title="No habits created yet"
          message="Start tracking your daily gentle routines, hydration, or reading goals."
          actionLabel="Create Your First Habit"
          onAction={handleOpenNew}
        />
      ) : (
        <>
          {viewMode === 'daily' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {habits.map(h => {
                const currentVal = todayLogs[h.id];
                const isDone = h.type === 'count' ? (typeof currentVal === 'number' && currentVal >= h.goal) : !!currentVal;

                return (
                  <div key={h.id} className="bloom-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button 
                        onClick={() => toggleHabitCompletion(h.id)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                      >
                        {isDone ? (
                          <CheckCircle2 size={28} color="var(--accent-dark)" fill="var(--accent-light)" />
                        ) : (
                          <Circle size={28} color="var(--border-focus)" />
                        )}
                      </button>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.3rem' }}>{h.icon}</span>
                          <span style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                            {h.name}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                          Target: {h.goal} {h.unit} • Frequency: {h.frequency} • Reminder: {h.reminder}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {h.type === 'count' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.3rem 0.6rem', borderRadius: '15px' }}>
                          <button 
                            className="bloom-btn-icon" 
                            style={{ width: '26px', height: '26px' }}
                            onClick={() => toggleHabitCompletion(h.id, Math.max(0, (todayLogs[h.id] || 0) - 1))}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{todayLogs[h.id] || 0} / {h.goal}</span>
                          <button 
                            className="bloom-btn-icon" 
                            style={{ width: '26px', height: '26px' }}
                            onClick={() => toggleHabitCompletion(h.id, (todayLogs[h.id] || 0) + 1)}
                          >
                            +
                          </button>
                        </div>
                      )}

                      <button className="bloom-btn-icon" onClick={() => handleOpenEdit(h)} title="Edit habit">
                        <Edit2 size={16} />
                      </button>
                      <button className="bloom-btn-icon" onClick={() => deleteHabit(h.id)} title="Delete habit">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'weekly' && (
            <div className="bloom-card" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem', fontFamily: 'Quicksand', fontWeight: 700 }}>Habit</th>
                    {weekDays.map(d => (
                      <th key={d.dateStr} style={{ padding: '0.75rem', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 700, color: d.isToday ? 'var(--accent-dark)' : 'inherit' }}>
                        {d.dayName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {habits.map(h => (
                    <tr key={h.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{h.icon}</span>
                        <span>{h.name}</span>
                      </td>
                      {weekDays.map(d => {
                        const dayLog = habitLogs[d.dateStr] || {};
                        const val = dayLog[h.id];
                        const done = h.type === 'count' ? (typeof val === 'number' && val >= h.goal) : !!val;

                        return (
                          <td key={d.dateStr} style={{ padding: '0.85rem', textAlign: 'center' }}>
                            {done ? (
                              <span style={{ fontSize: '1.2rem', color: 'var(--accent-dark)' }}>🌸</span>
                            ) : (
                              <span style={{ fontSize: '1.2rem', opacity: 0.2 }}>○</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === 'monthly' && (
            <div className="bloom-card">
              <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Monthly Completion Heatmap
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Each petal represents a day of consistency. High consistency days glow in vibrant pastel pink 🌸
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {Array.from({ length: 30 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const opacity = (dayNum % 3 === 0) ? 0.9 : (dayNum % 2 === 0) ? 0.6 : 0.3;
                  return (
                    <div 
                      key={idx}
                      style={{
                        height: '45px',
                        borderRadius: '10px',
                        background: `rgba(244, 143, 177, ${opacity})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: opacity > 0.5 ? '#FFF' : 'var(--text-main)'
                      }}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Add / Edit Habit Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={editingHabit ? 'Edit Habit ✏️' : 'Create New Habit 🌱'}
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Habit Name</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Morning Meditation"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Icon Emoji</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.icon}
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Habit Type</label>
              <select 
                className="form-select"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="boolean">Boolean (Yes/No)</option>
                <option value="count">Count (Target number)</option>
                <option value="duration">Duration (Minutes/Hours)</option>
                <option value="time">Time of day</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Goal Target</label>
              <input 
                type="number" 
                className="form-input"
                min="1"
                value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Unit</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g. glasses, mins"
                value={formData.unit}
                onChange={e => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              {editingHabit ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
