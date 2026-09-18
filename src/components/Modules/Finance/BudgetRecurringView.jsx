import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Target, AlertTriangle, Plus, Edit2, Trash2, CheckCircle2, Bell, Calendar } from 'lucide-react';
import { AddRecurringModal } from './AddRecurringModal';

export const BudgetRecurringView = () => {
  const { 
    expenses, 
    financeProfile, 
    updateFinanceProfile, 
    categoryBudgets, 
    updateCategoryBudgets,
    recurringExpenses,
    deleteRecurringExpense,
    logRecurringExpense,
    customCategories
  } = useApp();

  const currency = financeProfile?.currency || '₹';
  const monthlyBudget = financeProfile?.monthlyBudget || 35000;

  const [editingMonthlyBudget, setEditingMonthlyBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  const [recurringModalOpen, setRecurringModalOpen] = useState(false);
  const [recurringToEdit, setRecurringToEdit] = useState(null);

  const [editingCategoryLimits, setEditingCategoryLimits] = useState(false);
  const [tempCategoryLimits, setTempCategoryLimits] = useState(categoryBudgets || {});

  const currentMonthStr = new Date().toISOString().split('T')[0].slice(0, 7);
  const currentMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));

  const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const remainingBudget = Math.max(0, monthlyBudget - totalSpent);
  const totalBudgetPct = monthlyBudget > 0 ? Math.min(100, Math.round((totalSpent / monthlyBudget) * 100)) : 0;

  // Category spent totals
  const categorySpentMap = {};
  currentMonthExpenses.forEach(e => {
    const cat = e.category || '✨ Other';
    categorySpentMap[cat] = (categorySpentMap[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  // Calculate warnings
  const warnings = [];
  if (totalBudgetPct >= 85) {
    warnings.push(`💭 Monthly spending has reached ${totalBudgetPct}% of your total budget limit.`);
  }

  Object.entries(categoryBudgets || {}).forEach(([cat, limit]) => {
    const spent = categorySpentMap[cat] || 0;
    if (limit > 0) {
      const pct = Math.round((spent / limit) * 100);
      if (pct >= 85) {
        warnings.push(`🌷 You've used ${pct}% of your ${cat} budget.`);
      }
    }
  });

  const handleSaveMonthlyBudget = (e) => {
    e.preventDefault();
    const num = parseFloat(tempBudget);
    if (num && num > 0) {
      updateFinanceProfile({ monthlyBudget: num });
    }
    setEditingMonthlyBudget(false);
  };

  const handleSaveCategoryLimits = (e) => {
    e.preventDefault();
    updateCategoryBudgets(tempCategoryLimits);
    setEditingCategoryLimits(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER */}
      <div>
        <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
          Monthly Budget & Recurring Expenses 📆
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
          Define spending limits, manage recurring bills, and view gentle warnings.
        </p>
      </div>

      {/* GENTLE WARNING BANNERS */}
      {warnings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {warnings.map((warn, idx) => (
            <div 
              key={idx}
              style={{
                padding: '0.9rem 1.1rem',
                borderRadius: 'var(--radius-lg)',
                background: '#FFFBEB',
                border: '1px solid #FCD34D',
                color: '#92400E',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
              className="animate-pop-in"
            >
              <Bell size={18} color="#D97706" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}

      {/* OVERALL MONTHLY BUDGET CARD */}
      <div className="bloom-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', margin: 0 }}>
            Monthly Budget Limit 🎯
          </h3>
          <button 
            className="bloom-btn bloom-btn-outline" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
            onClick={() => { setTempBudget(monthlyBudget); setEditingMonthlyBudget(!editingMonthlyBudget); }}
          >
            {editingMonthlyBudget ? 'Cancel' : 'Edit Budget'}
          </button>
        </div>

        {editingMonthlyBudget ? (
          <form onSubmit={handleSaveMonthlyBudget} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
            <input 
              type="number"
              className="form-input"
              style={{ fontSize: '1.2rem', fontWeight: 700 }}
              value={tempBudget}
              onChange={e => setTempBudget(e.target.value)}
              autoFocus
            />
            <button type="submit" className="bloom-btn bloom-btn-primary">Save</button>
          </form>
        ) : (
          <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Limit</div>
              <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {currency}{monthlyBudget.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Spent So Far</div>
              <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
                {currency}{totalSpent.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Budget Remaining</div>
              <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#10B981', marginTop: '0.2rem' }}>
                {currency}{remainingBudget.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS BAR */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>Overall Progress</span>
            <span>{totalBudgetPct}% Spent</span>
          </div>
          <div className="bloom-progress-bar" style={{ height: '10px' }}>
            <div className="bloom-progress-fill" style={{ width: `${totalBudgetPct}%` }} />
          </div>
        </div>
      </div>

      {/* CATEGORY BUDGETS CARD */}
      <div className="bloom-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)', margin: 0 }}>
              Category Budgets (Optional)
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Set individual spending targets for key categories.</span>
          </div>

          <button 
            className="bloom-btn bloom-btn-outline" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
            onClick={() => { setTempCategoryLimits({ ...categoryBudgets }); setEditingCategoryLimits(!editingCategoryLimits); }}
          >
            {editingCategoryLimits ? 'Cancel' : 'Set Category Limits'}
          </button>
        </div>

        {editingCategoryLimits ? (
          <form onSubmit={handleSaveCategoryLimits}>
            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
              {customCategories?.slice(0, 8).map(cat => (
                <div key={cat}>
                  <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>{cat}</label>
                  <input 
                    type="number"
                    className="form-input"
                    placeholder="Limit e.g. 8000"
                    value={tempCategoryLimits[cat] || ''}
                    onChange={e => setTempCategoryLimits({ ...tempCategoryLimits, [cat]: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="bloom-btn bloom-btn-primary">Save Category Limits</button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(categoryBudgets || {}).length === 0 ? (
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                No category budgets set yet. Tap <strong>Set Category Limits</strong> to add custom targets.
              </div>
            ) : (
              Object.entries(categoryBudgets).map(([cat, limit]) => {
                if (!limit) return null;
                const spent = categorySpentMap[cat] || 0;
                const pct = Math.min(100, Math.round((spent / limit) * 100));
                return (
                  <div key={cat} style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      <span>{cat}</span>
                      <span>{currency}{spent.toLocaleString()} / {currency}{limit.toLocaleString()}</span>
                    </div>

                    <div className="bloom-progress-bar" style={{ height: '8px' }}>
                      <div className="bloom-progress-fill" style={{ width: `${pct}%`, background: pct > 85 ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : undefined }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* 🧾 RECURRING EXPENSES SECTION */}
      <div className="bloom-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', margin: 0 }}>
              Recurring Expenses 🧾
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Rent, subscriptions, internet, phone, and utilities.</span>
          </div>

          <button 
            className="bloom-btn bloom-btn-primary" 
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }}
            onClick={() => { setRecurringToEdit(null); setRecurringModalOpen(true); }}
          >
            <Plus size={16} />
            <span>Add Recurring</span>
          </button>
        </div>

        {recurringExpenses.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No recurring expenses saved yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recurringExpenses.map(item => (
              <div 
                key={item.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {item.category} • {item.frequency} • Next: {item.nextDate} • {item.paymentMethod || 'UPI'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--accent-dark)' }}>
                    {currency}{parseFloat(item.amount).toLocaleString()}
                  </span>

                  <button 
                    className="bloom-btn bloom-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={() => logRecurringExpense(item)}
                    title="Log to current month's expenses with 1 click"
                  >
                    + Log Expense
                  </button>

                  <button 
                    className="bloom-btn-icon" 
                    style={{ width: '32px', height: '32px' }} 
                    onClick={() => { setRecurringToEdit(item); setRecurringModalOpen(true); }}
                  >
                    <Edit2 size={14} />
                  </button>

                  <button 
                    className="bloom-btn-icon" 
                    style={{ width: '32px', height: '32px' }} 
                    onClick={() => deleteRecurringExpense(item.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECURRING MODAL */}
      <AddRecurringModal 
        isOpen={recurringModalOpen} 
        onClose={() => setRecurringModalOpen(false)}
        recurringToEdit={recurringToEdit}
      />
    </div>
  );
};
