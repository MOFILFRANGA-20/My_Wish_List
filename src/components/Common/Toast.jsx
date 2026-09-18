import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div 
      className="animate-pop-in"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 300,
        background: 'var(--accent-dark)',
        color: '#FFF',
        padding: '0.85rem 1.4rem',
        borderRadius: '30px',
        boxShadow: '0 10px 30px rgba(216, 92, 130, 0.3)',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        fontSize: '0.92rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}
    >
      <span>{toastMessage}</span>
    </div>
  );
};
