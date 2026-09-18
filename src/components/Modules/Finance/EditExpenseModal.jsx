import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';

export const EditExpenseModal = ({ isOpen, onClose, expense }) => {
  const { editExpense, customCategories, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Necessary');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (expense && isOpen) {
      setAmount(expense.amount || '');
      setCategory(expense.category || '🍔 Food');
      setType(expense.type || 'Necessary');
      setDate(expense.date || new Date().toISOString().split('T')[0]);
      setPaymentMethod(expense.paymentMethod || 'UPI');
      setDescription(expense.description || '');
      setNote(expense.note || '');
    }
  }, [expense, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense) return;
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    editExpense(expense.id, {
      amount: numAmount,
      category,
      type,
      date,
      paymentMethod,
      description: description.trim() || category,
      note: note.trim()
    });

    onClose();
  };

  const expenseTypes = [
    { label: 'Necessary', color: '#10B981', bg: '#E6F4EA' },
    { label: 'Optional', color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Unplanned', color: '#EF4444', bg: '#FEE2E2' }
  ];

  const paymentMethods = ['UPI', 'Card', 'Cash', 'Bank', 'Other'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Expense ✏️" icon="🌸">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <label className="form-label">Amount ({currency})</label>
          <input 
            type="number"
            step="any"
            className="form-input"
            style={{ fontSize: '1.6rem', fontWeight: 700, textAlign: 'center', height: '55px' }}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Expense Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {expenseTypes.map(t => {
              const isSelected = type === t.label;
              return (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => setType(t.label)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2px solid ${t.color}` : '1px solid var(--border-color)',
                    background: isSelected ? t.bg : 'var(--bg-primary)',
                    color: isSelected ? t.color : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {customCategories?.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Description / Note</label>
          <input 
            type="text" 
            className="form-input"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="grid-2" style={{ marginBottom: '1.2rem' }}>
          <div>
            <label className="form-label">Date</label>
            <input 
              type="date"
              className="form-input"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Payment Method</label>
            <select 
              className="form-select"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map(pm => (
                <option key={pm} value={pm}>{pm}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.2rem' }}>
          <button type="button" className="bloom-btn bloom-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bloom-btn bloom-btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
