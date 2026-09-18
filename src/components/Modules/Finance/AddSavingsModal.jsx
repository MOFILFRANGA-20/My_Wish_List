import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';

export const AddSavingsModal = ({ isOpen, onClose, goal }) => {
  const { addSavingsContribution, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal) return;
    const num = parseFloat(amount);
    if (!num || num <= 0) return;

    addSavingsContribution(goal.id, num);
    onClose();
  };

  if (!goal) return null;

  const remaining = Math.max(0, goal.targetAmount - goal.currentSaved);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add Savings to ${goal.name}`} icon="💰">
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '0.75rem', background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', marginBottom: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--accent-dark)', fontWeight: 600 }}>Currently Saved</div>
          <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {currency}{goal.currentSaved.toLocaleString()} / {currency}{goal.targetAmount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {remaining > 0 ? `${currency}${remaining.toLocaleString()} left to reach goal` : 'Goal target reached! 🎉'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Deposit Amount ({currency})</label>
          <input 
            type="number"
            step="any"
            className="form-input"
            style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center' }}
            placeholder="e.g. 500"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.2rem' }}>
          <button type="button" className="bloom-btn bloom-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bloom-btn bloom-btn-primary">
            + Add Savings
          </button>
        </div>
      </form>
    </Modal>
  );
};
