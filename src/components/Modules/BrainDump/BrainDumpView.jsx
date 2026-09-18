import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Sparkles, FileText, CheckSquare, Target, BookOpen } from 'lucide-react';

export const BrainDumpView = () => {
  const { brainDump, updateBrainDump, addNote, addTask, addGoal, addJournalEntry, setActiveTab } = useApp();

  const handleConvertToNote = () => {
    if (!brainDump.trim()) return;
    addNote({ title: 'Brain Dump Conversion 💭', content: brainDump, category: '💭 Thoughts' });
    setActiveTab('notes');
  };

  const handleConvertToTask = () => {
    if (!brainDump.trim()) return;
    addTask({ title: brainDump.slice(0, 50), priority: 'Medium', dueDate: new Date().toISOString().split('T')[0] });
    setActiveTab('tasks');
  };

  const handleConvertToGoal = () => {
    if (!brainDump.trim()) return;
    addGoal({ name: brainDump.slice(0, 50), category: '🌱 Personal', description: brainDump, target: 1 });
    setActiveTab('goals');
  };

  const handleConvertToJournal = () => {
    if (!brainDump.trim()) return;
    addJournalEntry({ title: 'Unfiltered Thoughts 💭', content: brainDump, mood: '😊 Good' });
    setActiveTab('journal');
  };

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>
          Get it out of your head 💭
        </h1>
        <p className="section-desc">
          A blank, distraction-free space for rapid thoughts, mental clutter, and stream-of-consciousness writing.
        </p>
      </div>

      <div className="bloom-card animate-pop-in">
        <textarea 
          className="form-textarea"
          style={{
            minHeight: '320px',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            padding: '1.25rem',
            border: 'none',
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)'
          }}
          placeholder="Type whatever is currently on your mind... No formatting needed."
          value={brainDump}
          onChange={e => updateBrainDump(e.target.value)}
          autoFocus
        />

        {/* Quick Conversion Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Convert this dump to:
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="bloom-btn bloom-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleConvertToNote}>
              <FileText size={14} />
              <span>Note</span>
            </button>
            <button className="bloom-btn bloom-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleConvertToTask}>
              <CheckSquare size={14} />
              <span>Task</span>
            </button>
            <button className="bloom-btn bloom-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleConvertToGoal}>
              <Target size={14} />
              <span>Goal</span>
            </button>
            <button className="bloom-btn bloom-btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={handleConvertToJournal}>
              <BookOpen size={14} />
              <span>Journal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
