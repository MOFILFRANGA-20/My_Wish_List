import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { Film, Plus, Star, Trash2 } from 'lucide-react';

export const MediaView = () => {
  const { media, addMedia, updateMedia, deleteMedia } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    type: 'Movie', // Movie, TV Show, Anime, Podcast
    status: 'Want to Watch',
    notes: '',
    rating: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addMedia({
      title: form.title,
      type: form.type,
      status: form.status,
      notes: form.notes,
      rating: parseInt(form.rating) || 0,
      emoji: form.type === 'Movie' ? '🎬' : form.type === 'TV Show' ? '📺' : form.type === 'Anime' ? '🍿' : '🎧'
    });

    setForm({ title: '', type: 'Movie', status: 'Want to Watch', notes: '', rating: 0 });
    setModalOpen(false);
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Media & Watchlist 🎬</h1>
          <p className="section-desc">Keep track of movies, anime series, TV shows, and relaxing podcasts.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          <span>Add Media</span>
        </button>
      </div>

      {media.length === 0 ? (
        <EmptyState
          icon="🎬"
          title="No media in watchlist"
          message="Track your favorite cozy anime, movies, and podcasts."
          actionLabel="Add Media Item"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid-3">
          {media.map(m => (
            <div key={m.id} className="bloom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{m.emoji || '🎬'}</span>
                  <button className="bloom-btn-icon" onClick={() => deleteMedia(m.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <span className="bloom-badge">{m.type}</span>
                  <span className="bloom-badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-main)' }}>{m.status}</span>
                </div>

                <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem' }}>
                  {m.title}
                </h3>

                {m.notes && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                    "{m.notes}"
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.2rem', marginTop: '1rem', paddingTop: '0.6rem', borderTop: '1px dashed var(--border-color)' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star}
                    size={16}
                    color={star <= m.rating ? '#FFC107' : 'var(--border-color)'}
                    fill={star <= m.rating ? '#FFC107' : 'none'}
                    onClick={() => updateMedia(m.id, { rating: star })}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Add Media Item 🎬"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Studio Ghibli: Kiki's Delivery Service"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select 
                className="form-select"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                <option value="Movie">Movie</option>
                <option value="TV Show">TV Show</option>
                <option value="Anime">Anime</option>
                <option value="Podcast">Podcast</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select 
                className="form-select"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="Want to Watch">Want to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Wholesome cozy thoughts..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Add to Watchlist
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
