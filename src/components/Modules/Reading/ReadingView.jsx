import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { Book, Plus, Star, Trash2, CheckCircle } from 'lucide-react';

export const ReadingView = () => {
  const { books, addBook, updateBook, deleteBook } = useApp();
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'Want to Read',
    totalPages: 250,
    coverEmoji: '📚',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addBook({
      title: form.title,
      author: form.author,
      status: form.status,
      totalPages: parseInt(form.totalPages) || 100,
      coverEmoji: form.coverEmoji || '📚',
      notes: form.notes
    });

    setForm({ title: '', author: '', status: 'Want to Read', totalPages: 250, coverEmoji: '📚', notes: '' });
    setModalOpen(false);
  };

  const filteredBooks = books.filter(b => filter === 'All' || b.status === filter);

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Reading Bookshelf 📚</h1>
          <p className="section-desc">Track reading progress, personal ratings, and book reflections.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          <span>Add Book</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {['All', 'Reading', 'Want to Read', 'Finished'].map(st => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              border: filter === st ? '1.5px solid var(--accent-dark)' : '1px solid var(--border-color)',
              background: filter === st ? 'var(--accent-light)' : 'var(--bg-card)',
              color: filter === st ? 'var(--accent-dark)' : 'var(--text-main)',
              fontFamily: 'Quicksand',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            {st}
          </button>
        ))}
      </div>

      {filteredBooks.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No books found"
          message="Add books to your personal cozy reading shelf."
          actionLabel="Add Book"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid-3">
          {filteredBooks.map(b => {
            const pct = Math.min(100, Math.round(((b.currentPage || 0) / (b.totalPages || 1)) * 100));

            return (
              <div key={b.id} className="bloom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>{b.coverEmoji || '📚'}</div>
                    <button className="bloom-btn-icon" onClick={() => deleteBook(b.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <span className="bloom-badge" style={{ marginBottom: '0.4rem' }}>{b.status}</span>
                  <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                    {b.title}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    by {b.author || 'Unknown Author'}
                  </div>

                  {b.notes && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1rem' }}>
                      "{b.notes}"
                    </p>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      <span>Progress</span>
                      <span>{b.currentPage} / {b.totalPages} pages ({pct}%)</span>
                    </div>
                    <div className="bloom-progress-bar" style={{ height: '8px' }}>
                      <div className="bloom-progress-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '0.15rem' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={16}
                        color={star <= b.rating ? '#FFC107' : 'var(--border-color)'}
                        fill={star <= b.rating ? '#FFC107' : 'none'}
                        onClick={() => updateBook(b.id, { rating: star })}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>

                  <button 
                    className="bloom-btn bloom-btn-secondary"
                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}
                    onClick={() => {
                      const nextP = b.currentPage >= b.totalPages ? 0 : Math.min(b.totalPages, (b.currentPage || 0) + 25);
                      updateBook(b.id, { currentPage: nextP, status: nextP >= b.totalPages ? 'Finished' : 'Reading' });
                    }}
                  >
                    +25 Pages
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Book Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Add Book 📚"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Book Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. The Little Book of Hygge"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Meik Wiking"
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select 
                className="form-select"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="Want to Read">Want to Read</option>
                <option value="Reading">Reading</option>
                <option value="Finished">Finished</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Total Pages</label>
              <input 
                type="number" 
                className="form-input"
                value={form.totalPages}
                onChange={e => setForm({ ...form, totalPages: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes / Reflection</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="Personal review or favorite quote..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Add to Bookshelf
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
