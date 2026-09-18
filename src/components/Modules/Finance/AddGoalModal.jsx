import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../Common/Modal';

export const AddGoalModal = ({ isOpen, onClose, goalToEdit = null }) => {
  const { addSavingsGoal, editSavingsGoal, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSaved, setCurrentSaved] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (goalToEdit && isOpen) {
      setName(goalToEdit.name || '');
      setTargetAmount(goalToEdit.targetAmount || '');
      setCurrentSaved(goalToEdit.currentSaved || 0);
      setTargetDate(goalToEdit.targetDate || '');
      setNote(goalToEdit.note || '');
    } else if (isOpen) {
      setName('');
      setTargetAmount('');
      setCurrentSaved('0');
      setTargetDate('');
      setNote('');
    }
  }, [goalToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tAmt = parseFloat(targetAmount);
    if (!name.trim() || !tAmt || tAmt <= 0) return;

    if (goalToEdit) {
      editSavingsGoal(goalToEdit.id, {
        name: name.trim(),
        targetAmount: tAmt,
        currentSaved: parseFloat(currentSaved) || 0,
        targetDate,
        note: note.trim()
      });
    } else {
      addSavingsGoal({
        name: name.trim(),
        targetAmount: tAmt,
        currentSaved: parseFloat(currentSaved) || 0,
        targetDate,
        note: note.trim()
      });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={goalToEdit ? "Edit Savings Goal 🎯" : "New Savings Goal 🎯"} icon="🌸">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Goal Name</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="e.g. 🎧 Buy headphones, 🏖️ Vacation"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Target Amount ({currency})</label>
            <input 
              type="number"
              step="any"
              className="form-input"
              placeholder="e.g. 10000"
              value={targetAmount}
              onChange={e => setTargetAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Saved ({currency})</label>
            <input 
              type="number"
              step="any"
              className="form-input"
              placeholder="0"
              value={currentSaved}
              onChange={e => setCurrentSaved(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Target Date (Optional)</label>
          <input 
            type="date"
            className="form-input"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Optional Note</label>
          <input 
            type="text"
            className="form-input"
            placeholder="e.g. Noise cancelling headphone for study"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.2rem' }}>
          <button type="button" className="bloom-btn bloom-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bloom-btn bloom-btn-primary">
            {goalToEdit ? "Save Changes" : "Create Goal"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
