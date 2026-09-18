import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';

export const AddRecurringModal = ({ isOpen, onClose, recurringToEdit = null }) => {
  const { addRecurringExpense, editRecurringExpense, customCategories, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('🏠 Bills');
  const [frequency, setFrequency] = useState('Monthly'); // Monthly, Weekly, Yearly
  const [nextDate, setNextDate] = useState('');
  const [type, setType] = useState('Necessary'); // Necessary, Optional
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  useEffect(() => {
    if (recurringToEdit && isOpen) {
      setName(recurringToEdit.name || '');
      setAmount(recurringToEdit.amount || '');
      setCategory(recurringToEdit.category || '🏠 Bills');
      setFrequency(recurringToEdit.frequency || 'Monthly');
      setNextDate(recurringToEdit.nextDate || new Date().toISOString().split('T')[0]);
      setType(recurringToEdit.type || 'Necessary');
      setPaymentMethod(recurringToEdit.paymentMethod || 'UPI');
    } else if (isOpen) {
      setName('');
      setAmount('');
      setCategory('🏠 Bills');
      setFrequency('Monthly');
      setNextDate(new Date().toISOString().split('T')[0]);
      setType('Necessary');
      setPaymentMethod('UPI');
    }
  }, [recurringToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmt = parseFloat(amount);
    if (!name.trim() || !numAmt || numAmt <= 0) return;

    if (recurringToEdit) {
      editRecurringExpense(recurringToEdit.id, {
        name: name.trim(),
        amount: numAmt,
        category,
        frequency,
        nextDate,
        type,
        paymentMethod
      });
    } else {
      addRecurringExpense({
        name: name.trim(),
        amount: numAmt,
        category,
        frequency,
        nextDate,
        type,
        paymentMethod
      });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={recurringToEdit ? "Edit Recurring Expense 🧾" : "Add Recurring Expense 🧾"} icon="🌸">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Expense Name</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="e.g. Rent, Internet, Netflix, Phone Bill"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Amount ({currency})</label>
            <input 
              type="number"
              step="any"
              className="form-input"
              placeholder="e.g. 15000"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Frequency</label>
            <select 
              className="form-select"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="grid-2">
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
            <label className="form-label">Expense Type</label>
            <select 
              className="form-select"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="Necessary">Necessary</option>
              <option value="Optional">Optional</option>
              <option value="Unplanned">Unplanned</option>
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Next Due Date</label>
            <input 
              type="date"
              className="form-input"
              value={nextDate}
              onChange={e => setNextDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select 
              className="form-select"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.2rem' }}>
          <button type="button" className="bloom-btn bloom-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bloom-btn bloom-btn-primary">
            {recurringToEdit ? "Save Changes" : "Save Recurring"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
