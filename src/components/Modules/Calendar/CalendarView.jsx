import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Calendar as CalendarIcon, Sprout, CheckSquare, BookOpen, Smile, DollarSign } from 'lucide-react';

export const CalendarView = () => {
  const { habits, habitLogs, tasks, journalEntries, moods, expenses } = useApp();
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const selectedHabitLogs = habitLogs[selectedDate] || {};
  const selectedTasks = tasks.filter(t => t.dueDate === selectedDate);
  const selectedJournal = journalEntries.filter(j => j.date === selectedDate);
  const selectedMood = moods.find(m => m.date === selectedDate);
  const selectedExpenses = expenses.filter(e => e.date === selectedDate);

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Life Timeline Calendar 📅</h1>
        <p className="section-desc">Select any date to see your combined timeline of habits, journal entries, mood, and tasks.</p>
      </div>

      <div className="grid-2">
        {/* Date Selector Card */}
        <div className="bloom-card">
          <label className="form-label" style={{ marginBottom: '0.5rem' }}>Select Date</label>
          <input 
            type="date"
            className="form-input"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}
          />

          <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent-dark)' }}>
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Selected Timeline View
            </div>
          </div>
        </div>

        {/* Selected Date Activity Stream */}
        <div className="bloom-card">
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Day Timeline Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Mood */}
            {selectedMood && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: '#FFF0F5', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Smile size={20} color="var(--accent-dark)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Mood: {selectedMood.mood}</div>
                  {selectedMood.note && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>"{selectedMood.note}"</div>}
                </div>
              </div>
            )}

            {/* Habits done */}
            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sprout size={16} />
                <span>Habits Tracked</span>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                {habits.map(h => {
                  const done = !!selectedHabitLogs[h.id];
                  return (
                    <span key={h.id} style={{ display: 'inline-block', marginRight: '0.6rem', opacity: done ? 1 : 0.4 }}>
                      {h.icon} {h.name} {done ? '✓' : ''}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Journal Entries */}
            {selectedJournal.length > 0 && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={16} />
                  <span>Journal Written</span>
                </div>
                {selectedJournal.map(j => (
                  <div key={j.id} style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    "{j.title}"
                  </div>
                ))}
              </div>
            )}

            {/* Expenses */}
            {selectedExpenses.length > 0 && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <DollarSign size={16} />
                  <span>Expenses Recorded</span>
                </div>
                {selectedExpenses.map(e => (
                  <div key={e.id} style={{ fontSize: '0.85rem' }}>
                    {e.description}: ${parseFloat(e.amount).toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
