import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { CheckSquare, Plus, CheckCircle2, Circle, Trash2, Calendar, Flag } from 'lucide-react';

export const TasksView = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    subtasksText: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const subtasksList = form.subtasksText
      ? form.subtasksText.split('\n').filter(l => l.trim().length > 0).map((t, i) => ({
          id: 'st_' + Date.now() + '_' + i,
          text: t.trim(),
          done: false
        }))
      : [];

    addTask({
      title: form.title,
      priority: form.priority,
      dueDate: form.dueDate,
      subtasks: subtasksList
    });

    setForm({ title: '', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0], subtasksText: '' });
    setModalOpen(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Tasks & To-Dos 📋</h1>
          <p className="section-desc">Manage action items, study assignments, and quick domestic to-dos.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.2rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: filter === f ? 'var(--accent-primary)' : 'transparent',
                  color: filter === f ? '#FFF' : 'var(--text-muted)',
                  fontFamily: 'Quicksand',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <button className="bloom-btn bloom-btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No tasks found"
          message="Keep your mind clear by adding your next to-do item."
          actionLabel="Create Task"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredTasks.map(t => (
            <div key={t.id} className="bloom-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <button onClick={() => toggleTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {t.completed ? (
                    <CheckCircle2 size={24} color="var(--accent-dark)" fill="var(--accent-light)" />
                  ) : (
                    <Circle size={24} color="var(--border-focus)" />
                  )}
                </button>

                <div>
                  <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.05rem', textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                    {t.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: t.priority === 'High' ? '#D32F2F' : t.priority === 'Medium' ? '#F57C00' : '#388E3C', fontWeight: 700 }}>
                      ● {t.priority} Priority
                    </span>
                    <span>• Due: {t.dueDate}</span>
                  </div>
                </div>
              </div>

              <button className="bloom-btn-icon" onClick={() => deleteTask(t.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Create New Task 📋"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Submit assignment outline"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select 
                className="form-select"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input 
                type="date" 
                className="form-input"
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
