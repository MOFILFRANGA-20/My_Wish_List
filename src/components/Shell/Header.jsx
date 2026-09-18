import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Lock, Unlock, Sparkles, Smile } from 'lucide-react';

export const Header = () => {
  const { setSearchOpen, settings, vaultLocked, setVaultLocked, activeTab, setActiveTab } = useApp();

  // Date formatting e.g. "Friday, September 18"
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="top-header">
      <div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {formattedDate}
        </div>
        <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-dark)' }}>
          {settings.userNickname || 'Bloom 🌸'}
        </div>
      </div>

      <div className="header-actions">
        <button className="header-search-btn" onClick={() => setSearchOpen(true)}>
          <Search size={16} />
          <span>Search your life...</span>
          <span className="kbd-shortcut">Ctrl+K</span>
        </button>

        <button 
          className="bloom-btn-icon" 
          title="Quick Mood Check-in"
          onClick={() => setActiveTab('mood')}
        >
          <Smile size={18} />
        </button>

        {activeTab === 'vault' && (
          <button 
            className="bloom-btn bloom-btn-secondary" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => setVaultLocked(!vaultLocked)}
          >
            {vaultLocked ? <Lock size={14} /> : <Unlock size={14} />}
            <span>{vaultLocked ? 'Vault Locked' : 'Lock Vault'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
