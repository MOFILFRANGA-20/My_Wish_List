import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { EmptyState } from '../../Common/EmptyState';
import { Compass, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

export const TravelView = () => {
  const { trips, addTrip, deleteTrip } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    placesText: '',
    notes: '',
    budget: 1000
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.destination.trim()) return;

    addTrip({
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      places: form.placesText ? form.placesText.split('\n').filter(p => p.trim()) : [],
      notes: form.notes,
      budget: parseFloat(form.budget) || 0,
      emoji: '✈️'
    });

    setForm({ destination: '', startDate: '', endDate: '', placesText: '', notes: '', budget: 1000 });
    setModalOpen(false);
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">Travel Journal & Trips ✈️</h1>
          <p className="section-desc">Plan future adventures, itinerary highlights, and keep travel memories.</p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          <span>Plan Trip</span>
        </button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon="✈️"
          title="No trips planned"
          message="Start planning your next getaway or cozy weekend trip."
          actionLabel="Plan New Trip"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid-2">
          {trips.map(tr => (
            <div key={tr.id} className="bloom-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  {tr.destination}
                </h3>
                <button className="bloom-btn-icon" onClick={() => deleteTrip(tr.id)}>
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--accent-dark)', fontWeight: 700, marginBottom: '0.75rem' }}>
                🗓️ {tr.startDate} — {tr.endDate || 'TBD'}
              </div>

              {tr.notes && (
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  {tr.notes}
                </p>
              )}

              {tr.places && tr.places.length > 0 && (
                <div style={{ background: 'var(--bg-primary)', padding: '0.8rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Places to Visit
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {tr.places.map(p => (
                      <span key={p} className="bloom-badge" style={{ fontSize: '0.75rem' }}>
                        📍 {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Trip Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Plan New Trip ✈️"
        icon="🌸"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Destination</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Kyoto & Arashiyama Bamboo Grove 🍁"
              value={form.destination}
              onChange={e => setForm({ ...form, destination: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-input"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-input"
                value={form.endDate}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Places to Visit (One per line)</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="Tenryu-ji Temple&#10;Matcha Tea Ceremony&#10;Bamboo Path"
              value={form.placesText}
              onChange={e => setForm({ ...form, placesText: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Travel Notes & Memories</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Packing reminders, hotel details..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Save Trip
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
