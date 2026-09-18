import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Heart, 
  List, 
  PieChart, 
  Calendar, 
  Calculator, 
  Sparkles, 
  Lock, 
  Plus 
} from 'lucide-react';

import { MoneyDashboard } from './MoneyDashboard';
import { MyExpensesView } from './MyExpensesView';
import { SpendingBreakdownView } from './SpendingBreakdownView';
import { BudgetRecurringView } from './BudgetRecurringView';
import { SavingsCalculatorGoalsView } from './SavingsCalculatorGoalsView';
import { MonthlyReviewInsightsView } from './MonthlyReviewInsightsView';
import { PrivacyExportModal } from './PrivacyExportModal';

import { AddExpenseModal } from './AddExpenseModal';
import { EditExpenseModal } from './EditExpenseModal';

export const FinanceView = () => {
  const [activeSubTab, setActiveSubTab] = useState('dashboard');
  
  // Modals state
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [editExpenseModalOpen, setEditExpenseModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const navTabs = [
    { id: 'dashboard', label: 'My Money 💗', icon: Heart },
    { id: 'expenses', label: 'My Expenses 📋', icon: List },
    { id: 'breakdown', label: 'Breakdown 📊', icon: PieChart },
    { id: 'budget', label: 'Budget & Recurring 📆', icon: Calendar },
    { id: 'calculator', label: 'Calculator & Goals 🎯', icon: Calculator },
    { id: 'review', label: 'Review & Trends 🌸', icon: Sparkles },
    { id: 'privacy', label: 'Privacy 🔐', icon: Lock }
  ];

  const handleEditExpenseTrigger = (expense) => {
    setExpenseToEdit(expense);
    setEditExpenseModalOpen(true);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title">
            <span>My Money 💗</span>
          </h1>
          <p className="section-desc">
            Personal expenses, dynamic savings awareness, budget tracking & financial clarity.
          </p>
        </div>

        <button 
          className="bloom-btn bloom-btn-primary" 
          onClick={() => setAddExpenseModalOpen(true)}
          style={{ padding: '0.65rem 1.4rem', boxShadow: 'var(--shadow-md)' }}
        >
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* SUB-NAVIGATION TAB BAR */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          overflowX: 'auto', 
          paddingBottom: '0.5rem', 
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          scrollbarWidth: 'none'
        }}
      >
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '20px',
                border: 'none',
                background: isActive ? 'var(--accent-dark)' : 'var(--bg-card)',
                color: isActive ? '#FFFFFF' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE SUB-VIEW ROUTER */}
      {activeSubTab === 'dashboard' && (
        <MoneyDashboard 
          onOpenAddExpense={() => setAddExpenseModalOpen(true)} 
          onSelectTab={(tabId) => setActiveSubTab(tabId)}
        />
      )}

      {activeSubTab === 'expenses' && (
        <MyExpensesView 
          onOpenAddExpense={() => setAddExpenseModalOpen(true)}
          onEditExpense={handleEditExpenseTrigger}
        />
      )}

      {activeSubTab === 'breakdown' && (
        <SpendingBreakdownView />
      )}

      {activeSubTab === 'budget' && (
        <BudgetRecurringView />
      )}

      {activeSubTab === 'calculator' && (
        <SavingsCalculatorGoalsView />
      )}

      {activeSubTab === 'review' && (
        <MonthlyReviewInsightsView />
      )}

      {activeSubTab === 'privacy' && (
        <PrivacyExportModal />
      )}

      {/* MODALS */}
      <AddExpenseModal 
        isOpen={addExpenseModalOpen} 
        onClose={() => setAddExpenseModalOpen(false)}
      />

      <EditExpenseModal 
        isOpen={editExpenseModalOpen}
        onClose={() => setEditExpenseModalOpen(false)}
        expense={expenseToEdit}
      />
    </div>
  );
};
