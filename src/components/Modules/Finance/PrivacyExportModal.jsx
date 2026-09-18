import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, Download, Trash2, Lock, AlertTriangle } from 'lucide-react';

export const PrivacyExportModal = () => {
  const { exportFinancialData, clearFinancialData, expenses, savingsGoals, recurringExpenses } = useApp();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDelete = () => {
    clearFinancialData();
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER */}
      <div>
        <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
          Privacy & Data Management 🔐
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
          Your financial data stays exclusively on your device with complete offline control.
        </p>
      </div>

      {/* PRIVACY GUARANTEE CARD */}
      <div 
        className="bloom-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)',
          border: '1.5px solid #86EFAC'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <ShieldCheck size={24} color="#166534" />
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.25rem', color: '#14532D', margin: 0 }}>
            100% Local Device Privacy
          </h3>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#166534', lineHeight: 1.5, marginBottom: '1rem' }}>
          Financial information is personal. Bloom stores everything in your browser's local storage.
        </p>

        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#14532D', fontWeight: 600 }}>
          <li>✓ No external HTTP/API requests</li>
          <li>✓ No cloud databases or servers</li>
          <li>✓ No analytics or tracking scripts</li>
          <li>✓ No bank integrations or account logins</li>
          <li>✓ Data persists safely on refresh</li>
        </ul>
      </div>

      {/* EXPORT & DELETE CONTROLS CARD */}
      <div className="bloom-card">
        <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Data Backup & Reset Options
        </h3>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Currently storing <strong>{expenses.length} expense records</strong>, <strong>{savingsGoals.length} savings goals</strong>, and <strong>{recurringExpenses.length} recurring items</strong>.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* EXPORT DATA BUTTON */}
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                Export My Financial Data
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Download a JSON backup file containing all your expenses, budgets, and savings goals.
              </div>
            </div>

            <button className="bloom-btn bloom-btn-primary" onClick={exportFinancialData}>
              <Download size={16} />
              <span>Export JSON Backup</span>
            </button>
          </div>

          {/* DELETE DATA BUTTON */}
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FEF2F2', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#991B1B' }}>
                Delete Financial Data
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B91C1C', marginTop: '0.1rem' }}>
                Permanently wipe all recorded expenses, savings goals, and budgets from this device.
              </div>
            </div>

            <button 
              className="bloom-btn" 
              style={{ background: '#EF4444', color: '#FFF' }}
              onClick={() => setConfirmDeleteOpen(true)}
            >
              <Trash2 size={16} />
              <span>Delete Financial Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {confirmDeleteOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setConfirmDeleteOpen(false)}>
          <div className="modal-content animate-pop-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <AlertTriangle size={48} color="#EF4444" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Are you sure?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                This action will permanently erase all your expense history, category budgets, and savings goals. This cannot be undone.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <button className="bloom-btn bloom-btn-outline" onClick={() => setConfirmDeleteOpen(false)}>
                  Cancel
                </button>
                <button className="bloom-btn" style={{ background: '#EF4444', color: '#FFF' }} onClick={handleConfirmDelete}>
                  Yes, Delete Financial Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
