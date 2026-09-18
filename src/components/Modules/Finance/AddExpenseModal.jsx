import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';

export const AddExpenseModal = ({ isOpen, onClose, initialCategory = null }) => {
  const { addExpense, customCategories, addCustomCategory, financeProfile } = useApp();

  const currency = financeProfile?.currency || '₹';

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(initialCategory || '🍔 Food');
  const [type, setType] = useState('Necessary'); // Necessary, Optional, Unplanned
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Cash, UPI, Card, Bank, Other
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newCustomCategoryInput, setNewCustomCategoryInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setCategory(initialCategory || (customCategories?.[0] || '🍔 Food'));
      setType('Necessary');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('UPI');
      setDescription('');
      setNote('');
      setShowAddCustom(false);
      setNewCustomCategoryInput('');
    }
  }, [isOpen, initialCategory, customCategories]);

  const handleCreateCustomCategory = (e) => {
    e.preventDefault();
    if (!newCustomCategoryInput.trim()) return;
    const catName = newCustomCategoryInput.trim();
    addCustomCategory(catName);
    setCategory(catName);
    setNewCustomCategoryInput('');
    setShowAddCustom(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    addExpense({
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
    { label: 'Necessary', desc: 'Essential living requirement', color: '#10B981', bg: '#E6F4EA' },
    { label: 'Optional', desc: 'Discretionary spending', color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Unplanned', desc: 'Unexpected / impulse purchase', color: '#EF4444', bg: '#FEE2E2' }
  ];

  const paymentMethods = ['UPI', 'Card', 'Cash', 'Bank', 'Other'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Expense 💰" icon="🌸">
      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <div className="form-group" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Expense Amount ({currency})
          </label>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '280px' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-dark)' }}>
              {currency}
            </span>
            <input 
              type="number"
              step="any"
              className="form-input"
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                textAlign: 'center',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                height: '60px',
                borderRadius: 'var(--radius-lg)',
                borderColor: 'var(--accent-primary)',
                background: '#FFF'
              }}
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
              required
            />
          </div>
        </div>

        {/* Expense Type Selector Pills */}
        <div className="form-group">
          <label className="form-label">Expense Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {expenseTypes.map(t => {
              const isSelected = type === t.label;
              return (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => setType(t.label)}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2px solid ${t.color}` : '1px solid var(--border-color)',
                    background: isSelected ? t.bg : 'var(--bg-primary)',
                    color: isSelected ? t.color : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.1rem'
                  }}
                >
                  <span>{t.label}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 500, opacity: 0.85 }}>{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Selector */}
        <div className="form-group">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <label className="form-label" style={{ margin: 0 }}>Category</label>
            <button 
              type="button" 
              style={{ background: 'none', border: 'none', color: 'var(--accent-dark)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setShowAddCustom(!showAddCustom)}
            >
              {showAddCustom ? 'Cancel Custom' : '+ Add Custom Category'}
            </button>
          </div>

          {showAddCustom ? (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 🪴 Gardening" 
                value={newCustomCategoryInput}
                onChange={e => setNewCustomCategoryInput(e.target.value)}
              />
              <button 
                type="button" 
                className="bloom-btn bloom-btn-primary" 
                style={{ whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
                onClick={handleCreateCustomCategory}
              >
                Add
              </button>
            </div>
          ) : (
            <select 
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {customCategories?.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        {/* Description / Note */}
        <div className="form-group">
          <label className="form-label">Note / Description (Optional)</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="e.g. Dinner with friends, Coffee at cafe"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Grid for Date & Payment Method */}
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

        {/* Submit Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button type="button" className="bloom-btn bloom-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bloom-btn bloom-btn-primary" style={{ padding: '0.75rem 1.8rem' }}>
            <span>Save Expense</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
