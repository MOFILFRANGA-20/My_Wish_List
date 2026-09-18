import React from 'react';
import { Plus } from 'lucide-react';

export const EmptyState = ({ icon = '🌷', title, message, actionLabel, onAction }) => {
  return (
    <div 
      className="bloom-card animate-fade-in" 
      style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8FA 100%)'
      }}
    >
      <div style={{ fontSize: '3.2rem', marginBottom: '0.75rem' }} className="animate-float">
        {icon}
      </div>
      <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '360px', marginBottom: '1.5rem' }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button className="bloom-btn bloom-btn-primary" onClick={onAction}>
          <Plus size={16} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
