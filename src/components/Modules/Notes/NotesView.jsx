import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { FileText, Plus, Search, Pin, Star, Trash2, Edit3, Tag, Folder } from 'lucide-react';

export const NotesView = () => {
  const { notes, addNote, editNote, deleteNote, togglePinNote, toggleFavNote } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Categories list
  const categories = [
    'All',
    '📝 Notes',
    '📔 Journal',
    '💡 Ideas',
    '📚 Study',
    '📋 Lists',
    '✈️ Travel',
    '💭 Thoughts'
  ];

  const [formData, setFormData] = useState({
    title: '',
    category: '📝 Notes',
    content: '',
    tags: ''
  });

  const handleOpenNew = () => {
    setEditingNote(null);
    setFormData({
      title: '',
      category: '📝 Notes',
      content: '',
      tags: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (n) => {
    setEditingNote(n);
    setFormData({
      title: n.title,
      category: n.category || '📝 Notes',
      content: n.content,
      tags: Array.isArray(n.tags) ? n.tags.join(', ') : n.tags || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const notePayload = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      tags: tagsArray
    };

    if (editingNote) {
      editNote(editingNote.id, notePayload);
    } else {
      addNote(notePayload);
    }
    setModalOpen(false);
  };

  // Filter notes by search & category
  const filteredNotes = notes.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const regularNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Personal Notes 📝</h1>
          <p className="section-desc">Organize thoughts, lists, cozy recipes, and inspirations in your private notebook.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={handleOpenNew}>
          <Plus size={16} />
          <span>New Note</span>
        </button>
      </div>

      {/* Categories & Search Filter Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
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

        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No notes found"
          message={searchQuery ? `No notes match "${searchQuery}".` : 'Start writing your first little thought.'}
          actionLabel="Create Note"
          onAction={handleOpenNew}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Pinned Notes Section */}
          {pinnedNotes.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1rem', color: 'var(--accent-dark)', marginBottom: '0.75rem' }}>
                <Pin size={16} />
                <span>Pinned Notes ({pinnedNotes.length})</span>
              </div>
              <div className="grid-3">
                {pinnedNotes.map(n => (
                  <NoteCard key={n.id} note={n} onEdit={handleOpenEdit} onDelete={deleteNote} onPin={togglePinNote} onFav={toggleFavNote} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Notes Section */}
          {regularNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  All Notes ({regularNotes.length})
                </div>
              )}
              <div className="grid-3">
                {regularNotes.map(n => (
                  <NoteCard key={n.id} note={n} onEdit={handleOpenEdit} onDelete={deleteNote} onPin={togglePinNote} onFav={toggleFavNote} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for Creating / Editing Note */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={editingNote ? 'Edit Note ✏️' : 'New Note 📝'}
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Note Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Cozy Recipe Ideas"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

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
            <label className="form-label">Content</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '160px' }}
              placeholder="Write your note here..."
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. recipes, cozy, food"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              {editingNote ? 'Save Changes' : 'Save Note'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const NoteCard = ({ note, onEdit, onDelete, onPin, onFav }) => {
  return (
    <div className="bloom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
            {note.title}
          </h3>
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            <button className="bloom-btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => onPin(note.id)}>
              <Pin size={14} color={note.pinned ? 'var(--accent-dark)' : 'var(--text-muted)'} fill={note.pinned ? 'var(--accent-dark)' : 'none'} />
            </button>
            <button className="bloom-btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => onFav(note.id)}>
              <Star size={14} color={note.favorite ? '#FFC107' : 'var(--text-muted)'} fill={note.favorite ? '#FFC107' : 'none'} />
            </button>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--accent-dark)', fontWeight: 700, marginBottom: '0.6rem' }}>
          {note.category}
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', opacity: 0.85, whiteSpace: 'pre-line', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {note.content}
        </div>
      </div>

      <div>
        {Array.isArray(note.tags) && note.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {note.tags.map(tag => (
              <span key={tag} className="bloom-badge" style={{ fontSize: '0.7rem' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>{note.createdAt}</span>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button className="bloom-btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => onEdit(note)}>
              <Edit3 size={14} />
            </button>
            <button className="bloom-btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => onDelete(note.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
