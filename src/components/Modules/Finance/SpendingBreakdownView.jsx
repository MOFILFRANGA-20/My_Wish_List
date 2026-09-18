import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PieChart, AlertCircle, ArrowDownRight, Sparkles, Filter, ChevronRight, X } from 'lucide-react';

export const SpendingBreakdownView = () => {
  const { expenses, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [selectedCategoryDrilldown, setSelectedCategoryDrilldown] = useState(null);

  const currentMonthStr = new Date().toISOString().split('T')[0].slice(0, 7);
  const currentMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));

  const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  // Group total spending by category
  const categoryTotals = {};
  currentMonthExpenses.forEach(e => {
    const cat = e.category || '✨ Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  // Optional and Unplanned expenses calculation
  const optionalExpenses = currentMonthExpenses.filter(e => e.type === 'Optional');
  const unplannedExpenses = currentMonthExpenses.filter(e => e.type === 'Unplanned');
  
  const totalOptionalAmount = optionalExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalUnplannedAmount = unplannedExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalReducibleAmount = totalOptionalAmount + totalUnplannedAmount;

  // Breakdown of optional expenses by category
  const optionalCategoryTotals = {};
  [...optionalExpenses, ...unplannedExpenses].forEach(e => {
    const cat = e.category || '✨ Other';
    optionalCategoryTotals[cat] = (optionalCategoryTotals[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  const sortedOptionalCategories = Object.entries(optionalCategoryTotals)
    .sort((a, b) => b[1] - a[1]);

  // Expenses for the selected category drilldown
  const drilldownExpenses = selectedCategoryDrilldown 
    ? currentMonthExpenses.filter(e => e.category === selectedCategoryDrilldown)
    : [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* SECTION HEADER */}
      <div>
        <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
          Spending Breakdown & Review 📊
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
          Visual insights into where your money went and gentle areas to review.
        </p>
      </div>

      {/* CATEGORY SPENDING BREAKDOWN CONTAINER */}
      <div className="bloom-card">
        <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
          Where did my money go? 🍔
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Tap any category card below to inspect individual transactions.
        </p>

        {sortedCategories.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No expenses logged for this month yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {sortedCategories.map(([cat, amt]) => {
              const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
              const isSelected = selectedCategoryDrilldown === cat;
              return (
                <div 
                  key={cat}
                  onClick={() => setSelectedCategoryDrilldown(isSelected ? null : cat)}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: 'var(--radius-lg)',
                    background: isSelected ? 'var(--accent-light)' : 'var(--bg-primary)',
                    border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      <span>{cat}</span>
                      <span className="bloom-badge" style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem' }}>{pct}%</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-dark)' }}>
                        {currency}{amt.toLocaleString()}
                      </span>
                      <ChevronRight size={16} color="var(--text-muted)" style={{ transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>
                  </div>

                  <div className="bloom-progress-bar" style={{ height: '8px' }}>
                    <div className="bloom-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DRILLDOWN MODAL / PANEL */}
        {selectedCategoryDrilldown && (
          <div style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1.5px solid var(--accent-primary)', boxShadow: 'var(--shadow-md)' }} className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--border-color)' }}>
              <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                Transactions in {selectedCategoryDrilldown}
              </h4>
              <button className="bloom-btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => setSelectedCategoryDrilldown(null)}>
                <X size={14} />
              </button>
            </div>

            {drilldownExpenses.length === 0 ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No transactions found.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {drilldownExpenses.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', fontSize: '0.88rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.description || item.category}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.date} • {item.type}</div>
                    </div>
                    <div style={{ fontFamily: 'Quicksand', fontWeight: 700, color: 'var(--accent-dark)' }}>
                      {currency}{parseFloat(item.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🚨 UNWANTED / OPTIONAL EXPENSES REVIEW */}
      <div 
        className="bloom-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 100%)',
          border: '1.5px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={20} color="var(--accent-dark)" />
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
            💭 “Where could I reduce spending?”
          </h3>
        </div>

        <div style={{ background: 'var(--accent-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', margin: 0, fontWeight: 600 }}>
            You spent <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>{currency}{totalReducibleAmount.toLocaleString()}</span> on optional & unplanned expenses this month.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem', marginBottom: 0 }}>
            These are discretionary items that you selected. Reviewing them helps identify potential areas to save more next month.
          </p>
        </div>

        {/* OPTIONAL CATEGORY BREAKDOWN */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Optional & Unplanned Spending Breakdown:
          </h4>

          {sortedOptionalCategories.length === 0 ? (
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              No optional or unplanned expenses logged this month! Great job! 🎉
            </div>
          ) : (
            <div className="grid-2" style={{ gap: '0.75rem' }}>
              {sortedOptionalCategories.map(([cat, amt]) => (
                <div key={cat} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{cat}</span>
                  <span style={{ fontFamily: 'Quicksand', fontWeight: 700, color: 'var(--accent-dark)' }}>{currency}{amt.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* POTENTIAL REDUCTION SUMMARY BOX */}
        <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B45309' }}>
              Potential amount to reduce
            </div>
            <div style={{ fontSize: '0.8rem', color: '#92400E', marginTop: '0.1rem' }}>
              Worth reviewing next month to keep more toward your goals.
            </div>
          </div>

          <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#B45309' }}>
            {currency}{totalReducibleAmount.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
