import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Calendar, Sparkles, TrendingUp, TrendingDown, Lightbulb, Target, Heart } from 'lucide-react';

export const MonthlyReviewInsightsView = () => {
  const { 
    expenses, 
    financeProfile, 
    financeMonthlyHistory, 
    savingsGoals 
  } = useApp();

  const currency = financeProfile?.currency || '₹';
  const income = financeProfile?.monthlyIncome || 50000;

  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonthStr = todayStr.slice(0, 7);

  // Month name helper
  const getMonthName = (dateStr) => {
    try {
      const d = new Date(dateStr + '-01T00:00:00');
      return d.toLocaleDateString(undefined, { month: 'Long' });
    } catch (err) {
      return 'September';
    }
  };
  const currentMonthName = getMonthName(currentMonthStr);

  // Current month expenses
  const currentMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));

  const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalSaved = Math.max(0, income - totalSpent);

  const optionalExpenses = currentMonthExpenses.filter(e => e.type === 'Optional');
  const unplannedExpenses = currentMonthExpenses.filter(e => e.type === 'Unplanned');

  const optionalSpent = optionalExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const unplannedSpent = unplannedExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  // Category totals for current month
  const categoryTotals = {};
  currentMonthExpenses.forEach(e => {
    const cat = e.category || '✨ Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const largestCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : 'N/A';
  const coffeeSpent = categoryTotals['☕ Coffee'] || 0;

  // Next month opportunity calculation (20% reduction of optional)
  const potentialExtraSave = Math.round(optionalSpent * 0.20);

  // Build Monthly Comparison table data
  const comparisonList = [
    {
      month: currentMonthName,
      income,
      spent: totalSpent,
      saved: totalSaved,
      categoryTotals
    },
    ...(financeMonthlyHistory || [])
  ];

  // Calculate category changes between current month and previous month
  const prevMonthObj = comparisonList[1];
  const prevFoodSpent = prevMonthObj?.categoryTotals?.['🍔 Food'] || 6200;
  const currentFoodSpent = categoryTotals['🍔 Food'] || 7200;

  const prevShoppingSpent = prevMonthObj?.categoryTotals?.['🛍️ Shopping'] || 4100;
  const currentShoppingSpent = categoryTotals['🛍️ Shopping'] || 5400;

  // Personal insights logic
  const topGoal = savingsGoals?.[0];
  const goalRemaining = topGoal ? Math.max(0, topGoal.targetAmount - topGoal.currentSaved) : 3500;

  const monthlySpentDiff = prevMonthObj ? (totalSpent - prevMonthObj.spent) : 2100;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER */}
      <div>
        <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
          End-of-Month Review & Trends 🌸
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
          Automatic financial summary, month-to-month comparison, and local spending observations.
        </p>
      </div>

      {/* 🌸 END-OF-MONTH REVIEW CARD */}
      <div 
        className="bloom-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%)',
          border: '1.5px solid var(--border-color)',
          padding: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>{currentMonthName} Money Review 🌷</span>
          </h3>
          <span className="bloom-badge">Monthly Report</span>
        </div>

        {/* 5 KEY METRICS ROW */}
        <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You earned</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {currency}{income.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You spent</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
              {currency}{totalSpent.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You saved</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#10B981', marginTop: '0.2rem' }}>
              {currency}{totalSaved.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: '#FEF3C7', border: '1px solid #FCD34D' }}>
            <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 600 }}>Optional spending</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#B45309', marginTop: '0.2rem' }}>
              {currency}{optionalSpent.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: '#FEE2E2', border: '1px solid #FCA5A5' }}>
            <div style={{ fontSize: '0.8rem', color: '#B91C1C', fontWeight: 600 }}>Unplanned spending</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#B91C1C', marginTop: '0.2rem' }}>
              {currency}{unplannedSpent.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 💡 YOUR SPENDING PATTERNS */}
        <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lightbulb size={18} color="var(--accent-dark)" />
            <span>💡 Your spending patterns</span>
          </h4>

          <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-main)' }}>
            <li>Your largest spending category was <strong>{largestCategory}</strong>.</li>
            <li>Your optional spending was <strong>{currency}{optionalSpent.toLocaleString()}</strong> this month.</li>
            {coffeeSpent > 0 && <li>You spent <strong>{currency}{coffeeSpent.toLocaleString()}</strong> on Coffee.</li>}
          </ul>
        </div>

        {/* 🌱 NEXT MONTH OPPORTUNITY */}
        <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #86EFAC' }}>
          <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: '#166534', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>🌱 Next Month Opportunity</span>
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#14532D', margin: 0, lineHeight: 1.5 }}>
            If you reduce optional spending by 20%, you could potentially save around <strong>{currency}{potentialExtraSave.toLocaleString()}</strong> more next month.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '0.3rem', fontStyle: 'italic' }}>
            Note: This is a dynamic calculation estimate based on your recorded data.
          </div>
        </div>
      </div>

      {/* 📅 MONTHLY COMPARISON TABLE */}
      <div className="bloom-card">
        <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          📅 Monthly Comparison
        </h3>

        <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Month</th>
                <th style={{ padding: '0.75rem' }}>Income</th>
                <th style={{ padding: '0.75rem' }}>Spent</th>
                <th style={{ padding: '0.75rem' }}>Saved</th>
              </tr>
            </thead>
            <tbody>
              {comparisonList.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{row.month}</td>
                  <td style={{ padding: '0.75rem' }}>{currency}{row.income.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--accent-dark)', fontWeight: 600 }}>{currency}{row.spent.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem', color: '#10B981', fontWeight: 700 }}>{currency}{row.saved.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CATEGORY CHANGES OBSERVATION */}
        <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Category Changes Comparison:
          </h4>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div>• Food spending changed from {currency}{prevFoodSpent.toLocaleString()} → {currency}{currentFoodSpent.toLocaleString()}.</div>
            <div>• Shopping changed from {currency}{prevShoppingSpent.toLocaleString()} → {currency}{currentShoppingSpent.toLocaleString()}.</div>
          </div>
        </div>
      </div>

      {/* 🧠 PERSONAL SPENDING INSIGHTS */}
      <div className="bloom-card">
        <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>🧠 Personal Spending Insights</span>
        </h3>

        {currentMonthExpenses.length < 2 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            “Keep tracking for a little longer and I'll have more useful patterns to show you.”
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '1rem' }}>
            {/* SMALL OBSERVATION */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.3rem' }}>
                🌷 Small observation
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                “You spent {currency}{coffeeSpent.toLocaleString()} on coffee this month.”
              </div>
            </div>

            {/* POSSIBLE OPPORTUNITY */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D97706', marginBottom: '0.3rem' }}>
                💡 Possible opportunity
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                “If you reduced coffee spending by {currency}300 next month, you could keep that amount toward your savings goal.”
              </div>
            </div>

            {/* MONTHLY CHANGE */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                📈 Monthly change
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                “Your spending was {currency}{Math.abs(monthlySpentDiff).toLocaleString()} {monthlySpentDiff >= 0 ? 'higher' : 'lower'} than last month.”
              </div>
            </div>

            {/* SAVINGS PROGRESS */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10B981', marginBottom: '0.3rem' }}>
                🎯 Savings progress
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                “You are {currency}{goalRemaining.toLocaleString()} away from your {topGoal?.name || 'vacation'} goal.”
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
