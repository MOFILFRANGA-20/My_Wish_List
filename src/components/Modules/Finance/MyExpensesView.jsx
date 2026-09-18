import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Search, Filter, Plus, Edit2, Trash2, Calendar, Tag, CreditCard } from 'lucide-react';
import { EmptyState } from '../../Common/EmptyState';

export const MyExpensesView = ({ onOpenAddExpense, onEditExpense }) => {
  const { expenses, deleteExpense, customCategories, financeProfile } = useApp();
  const currency = financeProfile?.currency || '₹';

  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('This Month'); // All, Today, This Week, This Month, Custom
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All'); // All, Necessary, Optional, Unplanned

  const todayStr = new Date().toISOString().split('T')[0];

  const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };
  const yesterdayStr = getYesterdayStr();

  // Helper date filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDesc = e.description?.toLowerCase().includes(q);
        const matchNote = e.note?.toLowerCase().includes(q);
        const matchCat = e.category?.toLowerCase().includes(q);
        const matchAmt = e.amount?.toString().includes(q);
        if (!matchDesc && !matchNote && !matchCat && !matchAmt) return false;
      }

      // 2. Category Filter
      if (categoryFilter !== 'All' && e.category !== categoryFilter) {
        return false;
      }

      // 3. Type Filter
      if (typeFilter !== 'All' && e.type !== typeFilter) {
        return false;
      }

      // 4. Date Range Filter
      if (dateFilter === 'Today') {
        if (e.date !== todayStr) return false;
      } else if (dateFilter === 'This Week') {
        const expDate = new Date(e.date);
        const now = new Date();
        const diffDays = Math.floor((now - expDate) / (1000 * 60 * 60 * 24));
        if (diffDays < 0 || diffDays > 7) return false;
      } else if (dateFilter === 'This Month') {
        const currentMonth = todayStr.slice(0, 7);
        if (!e.date || !e.date.startsWith(currentMonth)) return false;
      } else if (dateFilter === 'Custom') {
        if (customStartDate && e.date < customStartDate) return false;
        if (customEndDate && e.date > customEndDate) return false;
      }

      return true;
    });
  }, [expenses, searchQuery, categoryFilter, typeFilter, dateFilter, customStartDate, customEndDate, todayStr]);

  // Group filtered expenses by date
  const groupedExpenses = useMemo(() => {
    const map = {};
    filteredExpenses.forEach(e => {
      const dateKey = e.date || todayStr;
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(e);
    });

    // Sort dates descending
    const sortedDates = Object.keys(map).sort((a, b) => b.localeCompare(a));
    return sortedDates.map(dateKey => ({
      dateKey,
      items: map[dateKey]
    }));
  }, [filteredExpenses, todayStr]);

  const getDateHeaderLabel = (dateStr) => {
    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    
    // Format nicely e.g. "September 15, 2026"
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (err) {
      return dateStr;
    }
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Necessary':
        return { bg: '#E6F4EA', color: '#10B981' };
      case 'Optional':
        return { bg: '#FEF3C7', color: '#D97706' };
      case 'Unplanned':
        return { bg: '#FEE2E2', color: '#EF4444' };
      default:
        return { bg: 'var(--accent-light)', color: 'var(--accent-dark)' };
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* HEADER & TOP CONTROLS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
            My Expenses 📋
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
            All recorded expenses grouped by date with custom filters.
          </p>
        </div>

        <button className="bloom-btn bloom-btn-primary" onClick={onOpenAddExpense}>
          <Plus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* FILTER BAR CARD */}
      <div className="bloom-card" style={{ padding: '1.25rem' }}>
        {/* Search Row */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search expense description, note, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid-3" style={{ gap: '0.75rem' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Date Range</label>
            <select 
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.88rem' }}
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
            >
              <option value="This Month">This Month</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="All">All Time</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Category</label>
            <select 
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.88rem' }}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {customCategories?.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Expense Type</label>
            <select 
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.88rem' }}
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Necessary">Necessary</option>
              <option value="Optional">Optional</option>
              <option value="Unplanned">Unplanned</option>
            </select>
          </div>
        </div>

        {dateFilter === 'Custom' && (
          <div className="grid-2" style={{ gap: '0.75rem', marginTop: '0.75rem' }}>
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Start Date</label>
              <input 
                type="date"
                className="form-input"
                value={customStartDate}
                onChange={e => setCustomStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>End Date</label>
              <input 
                type="date"
                className="form-input"
                value={customEndDate}
                onChange={e => setCustomEndDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* EXPENSE GROUPED LIST */}
      {groupedExpenses.length === 0 ? (
        <EmptyState 
          icon="📋"
          title="No matching expenses"
          message="No expenses match your search query or active filter settings."
          actionLabel="Log New Expense"
          onAction={onOpenAddExpense}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {groupedExpenses.map(group => {
            const dayTotal = group.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
            return (
              <div key={group.dateKey} className="bloom-card">
                {/* DATE GROUP HEADER */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px dashed var(--border-color)' }}>
                  <div style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={16} color="var(--accent-dark)" />
                    <span>{getDateHeaderLabel(group.dateKey)}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-dark)' }}>
                    Total: {currency}{dayTotal.toLocaleString()}
                  </div>
                </div>

                {/* EXPENSE TRANSACTIONS LIST */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {group.items.map(item => {
                    const badgeStyle = getTypeBadgeStyle(item.type);
                    return (
                      <div 
                        key={item.id}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          gap: '1rem',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* LEFT DETAILS */}
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                              {item.description || item.category}
                            </span>

                            {/* TYPE PILL */}
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '12px', background: badgeStyle.bg, color: badgeStyle.color }}>
                              {item.type || 'Necessary'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>{item.paymentMethod || 'UPI'}</span>
                            {item.note && (
                              <>
                                <span>•</span>
                                <span>"{item.note}"</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* RIGHT CONTROLS & AMOUNT */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.15rem', color: 'var(--accent-dark)' }}>
                            {currency}{parseFloat(item.amount).toLocaleString()}
                          </span>

                          <button 
                            className="bloom-btn-icon" 
                            style={{ width: '32px', height: '32px' }} 
                            onClick={() => onEditExpense(item)}
                            title="Edit Expense"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button 
                            className="bloom-btn-icon" 
                            style={{ width: '32px', height: '32px' }} 
                            onClick={() => deleteExpense(item.id)}
                            title="Delete Expense"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
