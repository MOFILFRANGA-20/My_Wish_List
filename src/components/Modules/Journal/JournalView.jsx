import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { BookOpen, Plus, Heart, Calendar, Star, Trash2 } from 'lucide-react';

export const JournalView = () => {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const todayStr = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    title: '',
    mood: '😊 Good',
    content: '',
    happyPrompt: '',
    gratefulPrompt: '',
    tagsStr: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() && !form.content.trim()) return;

    addJournalEntry({
      title: form.title || 'Daily Entry 🌷',
      mood: form.mood,
      content: form.content,
      prompts: {
        happy: form.happyPrompt,
        grateful: form.gratefulPrompt
      },
      tags: form.tagsStr ? form.tagsStr.split(',').map(t => t.trim()).filter(Boolean) : []
    });

    setForm({ title: '', mood: '😊 Good', content: '', happyPrompt: '', gratefulPrompt: '', tagsStr: '' });
    setModalOpen(false);
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Daily Journal 📓</h1>
          <p className="section-desc">Write your thoughts freely, practice quiet gratitude, and reflect on your days.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          <span>New Journal Entry</span>
        </button>
      </div>

      {/* Journal Entries List */}
      {journalEntries.length === 0 ? (
        <EmptyState
          icon="📓"
          title="Your diary is empty"
          message="Write your first quiet thoughts or what made you smile today."
          actionLabel="Write Journal Entry"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {journalEntries.map(j => (
            <div key={j.id} className="bloom-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="bloom-badge">{j.date}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{j.mood}</span>
                </div>
                <button className="bloom-btn-icon" onClick={() => deleteJournalEntry(j.id)}>
                  <Trash2 size={16} />
                </button>
              </div>

              <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {j.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: '1rem' }}>
                {j.content}
              </p>

              {j.prompts && (j.prompts.happy || j.prompts.grateful) && (
                <div style={{ background: 'var(--accent-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                  {j.prompts.happy && (
                    <div style={{ fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                      <strong style={{ color: 'var(--accent-dark)' }}>What made me happy: </strong> {j.prompts.happy}
                    </div>
                  )}
                  {j.prompts.grateful && (
                    <div style={{ fontSize: '0.88rem' }}>
                      <strong style={{ color: 'var(--accent-dark)' }}>What I am grateful for: </strong> {j.prompts.grateful}
                    </div>
                  )}
                </div>
              )}

              {j.tags && j.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {j.tags.map(t => (
                    <span key={t} className="bloom-badge" style={{ fontSize: '0.72rem' }}>#{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Journal Entry Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Write Journal Entry 📓"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Entry Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. A Peaceful Afternoon Matcha"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Today's Mood</label>
            <select 
              className="form-select"
              value={form.mood}
              onChange={e => setForm({ ...form, mood: e.target.value })}
            >
              <option value="😍 Amazing">😍 Amazing</option>
              <option value="😊 Good">😊 Good</option>
              <option value="😐 Okay">😐 Okay</option>
              <option value="😔 Low">😔 Low</option>
              <option value="😴 Tired">😴 Tired</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Free Writing Content</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '140px' }}
              placeholder="What happened today? Write your honest reflections..."
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">✨ Prompt: What made you happy today?</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Warm sunlight and fresh flowers"
              value={form.happyPrompt}
              onChange={e => setForm({ ...form, happyPrompt: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🤍 Prompt: What are you grateful for?</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Peaceful home and good health"
              value={form.gratefulPrompt}
              onChange={e => setForm({ ...form, gratefulPrompt: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. matcha, peaceful, autumn"
              value={form.tagsStr}
              onChange={e => setForm({ ...form, tagsStr: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Save Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
