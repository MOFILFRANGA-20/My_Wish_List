import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, FileText, BookOpen, CheckSquare, Target, Sprout, Book, Compass, DollarSign } from 'lucide-react';

export const SearchModal = () => {
  const { searchOpen, setSearchOpen, notes, journalEntries, tasks, goals, habits, books, trips, expenses, setActiveTab } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const filteredNotes = q ? notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) : [];
  const filteredJournal = q ? journalEntries.filter(j => j.title.toLowerCase().includes(q) || j.content.toLowerCase().includes(q)) : [];
  const filteredTasks = q ? tasks.filter(t => t.title.toLowerCase().includes(q)) : [];
  const filteredGoals = q ? goals.filter(g => g.name.toLowerCase().includes(q) || g.description?.toLowerCase().includes(q)) : [];
  const filteredHabits = q ? habits.filter(h => h.name.toLowerCase().includes(q)) : [];
  const filteredBooks = q ? books.filter(b => b.title.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q)) : [];
  const filteredTrips = q ? trips.filter(tr => tr.destination.toLowerCase().includes(q) || tr.notes?.toLowerCase().includes(q)) : [];
  const filteredExpenses = q ? expenses.filter(e => e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)) : [];

  const totalResults = filteredNotes.length + filteredJournal.length + filteredTasks.length + filteredGoals.length + filteredHabits.length + filteredBooks.length + filteredTrips.length + filteredExpenses.length;

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setSearchOpen(false);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setSearchOpen(false)}>
      <div className="modal-content animate-pop-in" style={{ maxWidth: '640px', padding: '1.25rem' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--accent-dark)" />
          <input 
            type="text"
            className="form-input"
            style={{ border: 'none', background: 'transparent', fontSize: '1.1rem', padding: '0.2rem' }}
            placeholder="Search your notes, journal, goals, habits, tasks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="bloom-btn-icon" onClick={() => setSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div style={{ marginTop: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
          {!query && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '2rem' }}>🔍</span>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Type anything to search across your Bloom life records.</p>
            </div>
          )}

          {query && totalResults === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '2rem' }}>🌷</span>
              <p style={{ marginTop: '0.5rem' }}>No matching items found for "{query}".</p>
            </div>
          )}

          {filteredNotes.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                📝 Notes ({filteredNotes.length})
              </div>
              {filteredNotes.map(n => (
                <div key={n.id} onClick={() => handleSelect('notes')} style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-primary)', marginBottom: '0.4rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{n.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.content.slice(0, 75)}...</div>
                </div>
              ))}
            </div>
          )}

          {filteredJournal.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                📓 Journal ({filteredJournal.length})
              </div>
              {filteredJournal.map(j => (
                <div key={j.id} onClick={() => handleSelect('journal')} style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-primary)', marginBottom: '0.4rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{j.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{j.content.slice(0, 75)}...</div>
                </div>
              ))}
            </div>
          )}

          {filteredGoals.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                🎯 Goals ({filteredGoals.length})
              </div>
              {filteredGoals.map(g => (
                <div key={g.id} onClick={() => handleSelect('goals')} style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-primary)', marginBottom: '0.4rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{g.name}</div>
                </div>
              ))}
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                📋 Tasks ({filteredTasks.length})
              </div>
              {filteredTasks.map(t => (
                <div key={t.id} onClick={() => handleSelect('tasks')} style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-primary)', marginBottom: '0.4rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.title}</div>
                </div>
              ))}
            </div>
          )}

          {filteredHabits.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                🌱 Habits ({filteredHabits.length})
              </div>
              {filteredHabits.map(h => (
                <div key={h.id} onClick={() => handleSelect('habits')} style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-primary)', marginBottom: '0.4rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{h.icon} {h.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
