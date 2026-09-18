import React, { useRef, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';
import { Settings as SettingsIcon, Palette, Download, Upload, Trash2, Key, ShieldCheck, User } from 'lucide-react';

export const SettingsView = () => {
  const { settings, updateSettings, exportData, importData, resetAllData } = useApp();
  const fileInputRef = useRef(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const themeOptions = [
    { id: 'pink', name: 'Pink (Default)', color: '#F48FB1' },
    { id: 'soft-pink', name: 'Soft Pink', color: '#F8BBD0' },
    { id: 'minimal-white', name: 'Minimal White', color: '#E0E0E0' },
    { id: 'strawberry', name: 'Strawberry', color: '#FF6B81' },
    { id: 'rose', name: 'Rose', color: '#FB7185' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const ok = importData(evt.target.result);
      if (ok) {
        alert('✨ Backup restored successfully!');
      } else {
        alert('❌ Error reading backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Settings & Preferences ⚙️</h1>
        <p className="section-desc">Customize theme colors, privacy PIN, local backup export/import, and settings.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* User Profile / Nickname */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
            <User size={20} color="var(--accent-dark)" />
            <span>Profile Nickname</span>
          </div>

          <div className="form-group">
            <label className="form-label">Personal Greeting Nickname</label>
            <input 
              type="text"
              className="form-input"
              value={settings.userNickname || 'Bloom 🌸'}
              onChange={e => updateSettings({ userNickname: e.target.value })}
            />
          </div>
        </div>

        {/* Theme & Palette Selection */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
            <Palette size={20} color="var(--accent-dark)" />
            <span>Appearance Theme</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.85rem' }}>
            {themeOptions.map(t => {
              const isSelected = (settings.theme || 'pink') === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => updateSettings({ theme: t.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--accent-dark)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--accent-light)' : 'var(--bg-primary)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.color }}></span>
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferences */}
        <div className="bloom-card">
          <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
            Time & Format Preferences
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Time Format</label>
              <select 
                className="form-select"
                value={settings.timeFormat || '12h'}
                onChange={e => updateSettings({ timeFormat: e.target.value })}
              >
                <option value="12h">12-Hour (09:00 AM)</option>
                <option value="24h">24-Hour (09:00)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">First Day of Week</label>
              <select 
                className="form-select"
                value={settings.firstDayOfWeek || 'Mon'}
                onChange={e => updateSettings({ firstDayOfWeek: e.target.value })}
              >
                <option value="Mon">Monday</option>
                <option value="Sun">Sunday</option>
              </select>
            </div>
          </div>
        </div>

        {/* Local Storage Backup & Data Export */}
        <div className="bloom-card">
          <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.4rem' }}>
            Data Persistence & Backup
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Since Bloom is 100% offline with no server database, download a local JSON backup anytime to transfer to another device.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="bloom-btn bloom-btn-primary" onClick={exportData}>
              <Download size={16} />
              <span>Download JSON Backup</span>
            </button>

            <button className="bloom-btn bloom-btn-outline" onClick={() => fileInputRef.current?.click()}>
              <Upload size={16} />
              <span>Restore Backup JSON</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".json"
              onChange={handleFileUpload}
            />

            <button className="bloom-btn bloom-btn-secondary" style={{ background: '#FFEBEE', color: '#D32F2F' }} onClick={() => setResetModalOpen(true)}>
              <Trash2 size={16} />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Reset Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Application Reset ⚠️"
        icon="🌸"
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Are you sure you want to clear all habits, notes, journal entries, and reset Bloom to factory defaults?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="bloom-btn bloom-btn-outline" onClick={() => setResetModalOpen(false)}>
              Cancel
            </button>
            <button 
              className="bloom-btn bloom-btn-primary"
              style={{ background: '#D32F2F', borderColor: '#D32F2F' }}
              onClick={() => {
                resetAllData();
                setResetModalOpen(false);
              }}
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
