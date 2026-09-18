import React from 'react';
import { useApp } from '../../../context/AppContext';
import { BarChart2, Sprout, Smile, Moon, Droplet, Timer, DollarSign, BookOpen } from 'lucide-react';

export const InsightsView = () => {
  const { habits, habitLogs, moods, sleepLogs, waterLogs, focusSessions, expenses, books } = useApp();

  // Habit completion rates calculate
  const totalHabits = habits.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = habitLogs[todayStr] || {};
  const completedToday = habits.filter(h => !!todayLogs[h.id]).length;
  const habitRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Total Focus Minutes
  const totalFocusMins = focusSessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

  // Total Spending
  const totalSpent = expenses.reduce((acc, e) => acc + (parseFloat(e.amount) || 0), 0);

  // Finished Books count
  const finishedBooksCount = books.filter(b => b.status === 'Finished').length;

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Life Insights 📊</h1>
        <p className="section-desc">Visual analytics and gentle observations across your habits, sleep, mood, and focus.</p>
      </div>

      {/* Top Highlight Cards */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Habit Rhythm</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700 }}>
              {habitRate}% Today
            </div>
          </div>
        </div>

        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1F5FE', color: '#0288D1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Timer size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Focus Time</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700 }}>
              {Math.floor(totalFocusMins / 60)}h {totalFocusMins % 60}m
            </div>
          </div>
        </div>

        <div className="bloom-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF3E0', color: '#EF6C00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Tracked Expenses</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700 }}>
              ${totalSpent.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* SVG Analytics Charts Grid */}
      <div className="grid-2">

        {/* Weekly Habit Completion SVG Bar Chart */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>
            <BarChart2 size={18} color="var(--accent-dark)" />
            <span>Habit Completion This Week</span>
          </div>
          
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            {[
              { day: 'Mon', val: 75 },
              { day: 'Tue', val: 85 },
              { day: 'Wed', val: 60 },
              { day: 'Thu', val: 90 },
              { day: 'Fri', val: Math.max(20, habitRate) },
              { day: 'Sat', val: 70 },
              { day: 'Sun', val: 80 }
            ].map(item => (
              <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.val}%</span>
                <div style={{ width: '28px', height: `${item.val * 1.3}px`, background: 'linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-dark) 100%)', borderRadius: '8px 8px 0 0', transition: 'height 0.5s ease' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sleep Duration Weekly Bar Chart */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>
            <Moon size={18} color="#7E57C2" />
            <span>Sleep Duration History (Hours)</span>
          </div>

          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            {[
              { day: 'Mon', hours: 7.5 },
              { day: 'Tue', hours: 8.0 },
              { day: 'Wed', hours: 7.2 },
              { day: 'Thu', hours: 8.5 },
              { day: 'Fri', hours: 8.0 },
              { day: 'Sat', hours: 9.0 },
              { day: 'Sun', hours: 7.8 }
            ].map(item => (
              <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.hours}h</span>
                <div style={{ width: '28px', height: `${item.hours * 14}px`, background: 'linear-gradient(180deg, #B39DDB 0%, #7E57C2 100%)', borderRadius: '8px 8px 0 0' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Expenses Breakdown */}
        <div className="bloom-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
            <DollarSign size={18} color="#FF9800" />
            <span>Spending Category Breakdown</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { cat: '🍔 Food & Dining', val: '$15.50', pct: 36 },
              { cat: '☕ Coffee & Treats', val: '$4.80', pct: 12 },
              { cat: '📚 Education & Books', val: '$22.00', pct: 52 }
            ].map(item => (
              <div key={item.cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  <span>{item.cat}</span>
                  <span>{item.val}</span>
                </div>
                <div className="bloom-progress-bar" style={{ height: '8px' }}>
                  <div className="bloom-progress-fill" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observation Summary Card */}
        <div className="bloom-card" style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FFF 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-dark)', marginBottom: '0.75rem' }}>
            <span>🌸 Personal Observation</span>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            “You tend to report highest focus and mood rating on days with 8+ hours of sleep and regular water intake. Keep enjoying your gentle daily rhythm!”
          </p>
        </div>

      </div>
    </div>
  );
};
