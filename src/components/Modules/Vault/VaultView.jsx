import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { Lock, Unlock, Key, Plus, ShieldCheck, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const VaultView = () => {
  const { vaultNotes, vaultLocked, setVaultLocked, settings, updateSettings, addNote, deleteNote } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [setupPinModal, setSetupPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [noteForm, setNoteForm] = useState({ title: '', content: '', category: 'Private Journal' });
  const [visibleNoteIds, setVisibleNoteIds] = useState([]);

  const userPin = settings?.vaultPin;

  // Handle PIN Unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    if (!userPin) {
      setSetupPinModal(true);
      return;
    }

    if (pinInput === userPin) {
      setVaultLocked(false);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  // Handle Set PIN
  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(newPin)) {
      alert('PIN must be 4 numeric digits (e.g. 1234)');
      return;
    }
    updateSettings({ vaultPin: newPin });
    setSetupPinModal(false);
    setNewPin('');
    setVaultLocked(false);
  };

  // Handle Add Vault Note
  const handleAddVaultNote = (e) => {
    e.preventDefault();
    if (!noteForm.title.trim()) return;
    addNote({ title: noteForm.title, content: noteForm.content, category: noteForm.category }, true);
    setNoteForm({ title: '', content: '', category: 'Private Journal' });
    setNewNoteModal(false);
  };

  const toggleNoteVisibility = (id) => {
    setVisibleNoteIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Screen 1: Vault Locked or No PIN Set
  if (vaultLocked) {
    return (
      <div className="page-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="bloom-card animate-pop-in" style={{ maxWidth: '440px', width: '100%', textAlign: 'center', padding: '2.5rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <Lock size={32} />
          </div>

          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            🔐 Private Vault
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {userPin ? 'Enter your 4-digit PIN to access your private entries.' : 'Protect your personal reflections with a 4-digit PIN.'}
          </p>

          {!userPin ? (
            <div>
              <button className="bloom-btn bloom-btn-primary" style={{ width: '100%' }} onClick={() => setSetupPinModal(true)}>
                <Key size={16} />
                <span>Set Up 4-Digit PIN</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleUnlock}>
              <div className="form-group">
                <input 
                  type="password"
                  maxLength={4}
                  className="form-input"
                  style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.4rem', padding: '0.75rem' }}
                  placeholder="••••"
                  value={pinInput}
                  onChange={e => { setPinInput(e.target.value); setPinError(''); }}
                  autoFocus
                />
              </div>

              {pinError && (
                <div style={{ color: 'var(--accent-dark)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                  {pinError}
                </div>
              )}

              <button type="submit" className="bloom-btn bloom-btn-primary" style={{ width: '100%' }}>
                <Unlock size={16} />
                <span>Unlock Vault</span>
              </button>
            </form>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} />
            <span>100% Local device protection. No cloud data transmission.</span>
          </div>
        </div>

        {/* Set PIN Modal */}
        <Modal 
          isOpen={setupPinModal} 
          onClose={() => setSetupPinModal(false)}
          title="Set Up Vault PIN 🔐"
          icon="🔑"
        >
          <form onSubmit={handleSavePin}>
            <div className="form-group">
              <label className="form-label">Enter 4-Digit PIN</label>
              <input 
                type="password"
                maxLength={4}
                className="form-input"
                style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.4rem' }}
                placeholder="1234"
                value={newPin}
                onChange={e => setNewPin(e.target.value)}
                required
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Note: Keep your PIN safe. It is stored exclusively on your device's browser memory.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setSetupPinModal(false)}>
                Cancel
              </button>
              <button type="submit" className="bloom-btn bloom-btn-primary">
                Save PIN & Unlock
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  // Screen 2: Vault Unlocked View
  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 className="section-title">Private Vault 🔐</h1>
            <span className="bloom-badge">Unlocked</span>
          </div>
          <p className="section-desc">Your private space for intimate journal notes, secrets, and key details.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="bloom-btn bloom-btn-outline" onClick={() => setSetupPinModal(true)}>
            <Key size={16} />
            <span>Change PIN</span>
          </button>

          <button className="bloom-btn bloom-btn-primary" onClick={() => setNewNoteModal(true)}>
            <Plus size={16} />
            <span>New Private Note</span>
          </button>

          <button className="bloom-btn bloom-btn-secondary" onClick={() => setVaultLocked(true)}>
            <Lock size={16} />
            <span>Lock Now</span>
          </button>
        </div>
      </div>

      {/* Vault Security Disclaimer Banner */}
      <div className="bloom-card" style={{ marginBottom: '1.5rem', background: '#FFF0F5', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <AlertCircle size={20} color="var(--accent-dark)" />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          Vault notes are stored locally on your device. Click the eye icon to reveal contents. Lock the vault when stepping away.
        </span>
      </div>

      {/* Vault Notes List */}
      <div className="grid-2">
        {vaultNotes.map(n => {
          const isRevealed = visibleNoteIds.includes(n.id);
          return (
            <div key={n.id} className="bloom-card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDFE 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.2rem' }}>
                    {n.category || 'Private'}
                  </div>
                  <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem' }}>
                    {n.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button className="bloom-btn-icon" onClick={() => toggleNoteVisibility(n.id)}>
                    {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button className="bloom-btn-icon" onClick={() => deleteNote(n.id, true)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ minHeight: '80px', padding: '0.8rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', margin: '0.75rem 0', fontFamily: isRevealed ? 'inherit' : 'monospace', fontSize: '0.9rem', color: isRevealed ? 'var(--text-main)' : 'var(--text-muted)' }}>
                {isRevealed ? n.content : '••••••••••••••••••••••••••••••••••••••••'}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Saved on {n.createdAt}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Vault Note Modal */}
      <Modal 
        isOpen={newNoteModal} 
        onClose={() => setNewNoteModal(false)}
        title="Add Private Vault Note 🔐"
        icon="🌸"
      >
        <form onSubmit={handleAddVaultNote}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Secret Aspirations"
              value={noteForm.title}
              onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={noteForm.category}
              onChange={e => setNoteForm({ ...noteForm, category: e.target.value })}
            >
              <option value="Private Journal">Private Journal</option>
              <option value="Personal Notes">Personal Notes</option>
              <option value="Important Info">Important Info</option>
              <option value="Secrets">Secrets</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Private Content</label>
            <textarea 
              className="form-textarea"
              style={{ minHeight: '140px' }}
              placeholder="Write your private entry here..."
              value={noteForm.content}
              onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setNewNoteModal(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Save Private Note
            </button>
          </div>
        </form>
      </Modal>

      {/* Change PIN Modal */}
      <Modal 
        isOpen={setupPinModal} 
        onClose={() => setSetupPinModal(false)}
        title="Change Vault PIN 🔑"
        icon="🌸"
      >
        <form onSubmit={handleSavePin}>
          <div className="form-group">
            <label className="form-label">New 4-Digit PIN</label>
            <input 
              type="password"
              maxLength={4}
              className="form-input"
              style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.4rem' }}
              placeholder="1234"
              value={newPin}
              onChange={e => setNewPin(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="bloom-btn bloom-btn-outline" onClick={() => setSetupPinModal(false)}>
              Cancel
            </button>
            <button type="submit" className="bloom-btn bloom-btn-primary">
              Save New PIN
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
