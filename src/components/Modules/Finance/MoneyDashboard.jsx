import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Plus, TrendingUp, PiggyBank, ArrowRight, ShieldCheck, Heart, Sparkles, Edit2 } from 'lucide-react';

export const MoneyDashboard = ({ onOpenAddExpense, onSelectTab }) => {
  const { expenses, financeProfile, updateFinanceProfile, savingsGoals } = useApp();

  const currency = financeProfile?.currency || '₹';
  const income = financeProfile?.monthlyIncome || 50000;

  const [editingIncome, setEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(income);

  // Get current year and month string (YYYY-MM)
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonthStr = todayStr.slice(0, 7);

  // Filter current month expenses
  const currentMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));

  // Totals
  const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const remaining = Math.max(0, income - totalSpent);

  // Unwanted / Optional spending total
  const optionalSpent = currentMonthExpenses
    .filter(e => e.type === 'Optional' || e.type === 'Unplanned')
    .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  // Potential savings formula: (Income - Fixed - Necessary) or Remaining - (Optional reduced)
  const potentialSavings = Math.max(0, remaining + (optionalSpent * 0.5));

  // Category summary map
  const categoryTotalsMap = {};
  currentMonthExpenses.forEach(e => {
    const cat = e.category || '✨ Other';
    categoryTotalsMap[cat] = (categoryTotalsMap[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  const sortedCategories = Object.entries(categoryTotalsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const handleSaveIncome = (e) => {
    e.preventDefault();
    const num = parseFloat(tempIncome);
    if (num && num > 0) {
      updateFinanceProfile({ monthlyIncome: num });
    }
    setEditingIncome(false);
  };

  const percentSpent = income > 0 ? Math.min(100, Math.round((totalSpent / income) * 100)) : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* THIS MONTH SUMMARY CONTAINER */}
      <div 
        className="bloom-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%)',
          border: '1.5px solid var(--border-color)',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <span className="bloom-badge" style={{ marginBottom: '0.4rem' }}>
              <Heart size={12} fill="var(--accent-dark)" /> This Month Summary
            </span>
            <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
              My Money 💗
            </h2>
          </div>

          <button 
            className="bloom-btn bloom-btn-primary"
            onClick={onOpenAddExpense}
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.95rem' }}
          >
            <Plus size={18} />
            <span>Add Expense</span>
          </button>
        </div>

        {/* 4 KEY METRICS GRID */}
        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
          {/* INCOME */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Income</span>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                onClick={() => { setTempIncome(income); setEditingIncome(!editingIncome); }}
                title="Edit Income"
              >
                <Edit2 size={14} />
              </button>
            </div>

            {editingIncome ? (
              <form onSubmit={handleSaveIncome} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                <input 
                  type="number" 
                  className="form-input" 
                  style={{ padding: '0.2rem 0.5rem', fontSize: '1.1rem', fontWeight: 700 }} 
                  value={tempIncome} 
                  onChange={e => setTempIncome(e.target.value)} 
                  autoFocus
                />
                <button type="submit" className="bloom-btn bloom-btn-primary" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>Save</button>
              </form>
            ) : (
              <div style={{ fontFamily: 'Quicksand', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {currency}{income.toLocaleString()}
              </div>
            )}
          </div>

          {/* SPENT */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Spent</span>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
              {currency}{totalSpent.toLocaleString()}
            </div>
          </div>

          {/* REMAINING */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Remaining</span>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.6rem', fontWeight: 700, color: '#10B981', marginTop: '0.2rem' }}>
              {currency}{remaining.toLocaleString()}
            </div>
          </div>

          {/* POTENTIAL SAVINGS */}
          <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #FFF0F5 0%, #FCE4EC 100%)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-dark)', fontWeight: 700 }}>Potential Savings</span>
              <Sparkles size={14} color="var(--accent-dark)" />
            </div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
              {currency}{Math.round(potentialSavings).toLocaleString()}
            </div>
          </div>
        </div>

        {/* SPENDING PROGRESS INDICATOR */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>Monthly Budget Usage</span>
            <span>{percentSpent}% Used ({currency}{totalSpent.toLocaleString()} / {currency}{income.toLocaleString()})</span>
          </div>
          <div className="bloom-progress-bar" style={{ height: '12px' }}>
            <div 
              className="bloom-progress-fill" 
              style={{ 
                width: `${percentSpent}%`,
                background: percentSpent > 90 
                  ? 'linear-gradient(90deg, #F59E0B, #EF4444)' 
                  : 'linear-gradient(90deg, var(--accent-primary), var(--accent-dark))'
              }} 
            />
          </div>
        </div>
      </div>

      {/* 2 COLUMN CONTENT GRID */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {/* SPENDING BREAKDOWN PREVIEW */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)', margin: 0 }}>
              Top Spending Categories 🍔
            </h3>
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--accent-dark)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              onClick={() => onSelectTab('breakdown')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {sortedCategories.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No expenses recorded this month yet. Tap <strong>+ Add Expense</strong> to begin!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {sortedCategories.map(([cat, amount]) => {
                const catPercent = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      <span>{cat}</span>
                      <span style={{ fontFamily: 'Quicksand', fontWeight: 700 }}>{currency}{amount.toLocaleString()}</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${catPercent}%`, background: 'var(--accent-primary)', borderRadius: '10px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* POSSIBLE SAVINGS OPPORTUNITY PREVIEW */}
        <div className="bloom-card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🌱 Possible Savings</span>
            </h3>
            <span className="bloom-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>Friendly Review</span>
          </div>

          <div style={{ background: 'var(--accent-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Optional & Unplanned Spending This Month</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
              {currency}{optionalSpent.toLocaleString()}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: 1.4 }}>
              Review these expenses to find potential areas to reduce and boost your monthly savings.
            </p>
          </div>

          <button 
            className="bloom-btn bloom-btn-outline" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => onSelectTab('breakdown')}
          >
            Review Optional Spending 💭
          </button>
        </div>
      </div>

      {/* SAVINGS GOALS PREVIEW CONTAINER */}
      <div className="bloom-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <PiggyBank size={20} color="var(--accent-dark)" />
            <span>🎯 Savings Goals</span>
          </h3>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--accent-dark)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            onClick={() => onSelectTab('calculator')}
          >
            <span>Manage Goals</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {savingsGoals.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem' }}>
            No savings goals created yet. Tap <strong>Manage Goals</strong> to set your first target!
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '1rem' }}>
            {savingsGoals.slice(0, 4).map(goal => {
              const current = goal.currentSaved || 0;
              const target = goal.targetAmount || 1;
              const percent = Math.min(100, Math.round((current / target) * 100));
              return (
                <div key={goal.id} style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    <span>{goal.name}</span>
                    <span style={{ color: 'var(--accent-dark)' }}>{percent}%</span>
                  </div>

                  <div style={{ fontFamily: 'Quicksand', fontSize: '1.1rem', fontWeight: 700, marginTop: '0.3rem', color: 'var(--text-main)' }}>
                    {currency}{current.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ {currency}{target.toLocaleString()}</span>
                  </div>

                  <div className="bloom-progress-bar" style={{ height: '8px', marginTop: '0.6rem' }}>
                    <div className="bloom-progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
