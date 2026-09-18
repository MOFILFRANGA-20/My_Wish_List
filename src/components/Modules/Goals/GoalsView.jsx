import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { Target, Plus, CheckSquare, Square, Calendar, Trash2, Trophy } from 'lucide-react';

export const GoalsView = () => {
  const { goals, addGoal, updateGoalProgress, toggleGoalMilestone, deleteGoal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    'All',
    '🎓 Study',
    '💰 Savings',
    '💻 Project',
    '📚 Reading',
    '🏃 Fitness',
    '✈️ Travel',
    '🌱 Personal'
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: '🌱 Personal',
    description: '',
    target: 5,
    deadline: '',
    milestonesText: ''
  });

  const handleOpenNew = () => {
    setFormData({
      name: '',
      category: '🌱 Personal',
      description: '',
      target: 5,
      deadline: '',
      milestonesText: ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const milestonesList = formData.milestonesText
      ? formData.milestonesText.split('\n').filter(line => line.trim().length > 0).map((line, idx) => ({
          id: 'm_' + Date.now() + '_' + idx,
          text: line.trim(),
          done: false
        }))
      : [];

    addGoal({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      target: milestonesList.length > 0 ? milestonesList.length : (formData.target || 1),
      deadline: formData.deadline,
      milestones: milestonesList
    });

    setModalOpen(false);
  };

  const filteredGoals = goals.filter(g => selectedCategory === 'All' || g.category === selectedCategory);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Life Goals 🎯</h1>
          <p className="section-desc">Track big dreams, study targets, savings, and personal milestones.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={handleOpenNew}>
          <Plus size={16} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              border: selectedCategory === cat ? '1.5px solid var(--accent-dark)' : '1px solid var(--border-color)',
              background: selectedCategory === cat ? 'var(--accent-light)' : 'var(--bg-card)',
              color: selectedCategory === cat ? 'var(--accent-dark)' : 'var(--text-main)',
              fontFamily: 'Quicksand',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Goals Cards Grid */}
      {filteredGoals.length === 0 ? (
        <EmptyState
          icon="🎯"
          title="No goals created yet"
          message="Set a project, study, or travel milestone to start nurturing your journey."
          actionLabel="Create Goal"
          onAction={handleOpenNew}
        />
      ) : (
        <div className="grid-2">
          {filteredGoals.map(g => {
            const target = g.target || 1;
            const current = g.current || 0;
            const pct = Math.min(100, Math.round((current / target) * 100));

            return (
              <div key={g.id} className="bloom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <span className="bloom-badge" style={{ marginBottom: '0.4rem' }}>
                        {g.category}
                      </span>
                      <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)' }}>
                        {g.name}
                      </h3>
                    </div>
                    <button className="bloom-btn-icon" onClick={() => deleteGoal(g.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {g.description && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {g.description}
                    </p>
                  )}

                  {/* Progress Bar & Percentage */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      <span style={{ color: 'var(--accent-dark)' }}>{pct}% Completed</span>
                      <span style={{ color: 'var(--text-muted)' }}>{current} / {target}</span>
                    </div>
                    <div className="bloom-progress-bar" style={{ height: '10px' }}>
                      <div className="bloom-progress-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>

                  {/* Milestones List */}
                  {g.milestones && g.milestones.length > 0 && (
                    <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        Milestones ({g.milestones.filter(m => m.done).length} / {g.milestones.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {g.milestones.map(m => (
                          <div 
                            key={m.id} 
                            onClick={() => toggleGoalMilestone(g.id, m.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}
                          >
                            {m.done ? (
                              <CheckSquare size={16} color="var(--accent-dark)" />
                            ) : (
                              <Square size={16} color="var(--text-muted)" />
                            )}
                            <span style={{ textDecoration: m.done ? 'line-through' : 'none', color: m.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
                              {m.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    <span>{g.deadline ? `Target: ${g.deadline}` : 'No deadline'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button 
                      className="bloom-btn-icon"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => updateGoalProgress(g.id, current - 1)}
                    >
                      -
                    </button>
                    <button 
                      className="bloom-btn-icon"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => updateGoalProgress(g.id, current + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Create New Goal 🎯"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Goal Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Build my personal website"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Deadline</label>
              <input 
                type="date" 
                className="form-input"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Short explanation of your goal..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Milestones (One per line)</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '100px' }}
              placeholder="Step 1: Design outline&#10;Step 2: Core feature build&#10;Step 3: Final launch"
              value={formData.milestonesText}
              onChange={e => setFormData({ ...formData, milestonesText: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Create Goal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
