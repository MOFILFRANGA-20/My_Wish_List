import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Calculator, PiggyBank, Plus, Edit2, Trash2, Sparkles, HeartHandshake } from 'lucide-react';
import { AddGoalModal } from './AddGoalModal';
import { AddSavingsModal } from './AddSavingsModal';

export const SavingsCalculatorGoalsView = () => {
  const { 
    financeProfile, 
    updateFinanceProfile, 
    savingsGoals, 
    deleteSavingsGoal 
  } = useApp();

  const currency = financeProfile?.currency || '₹';

  // Calculator input state (defaults from profile or sensible initial seed numbers)
  const [calcIncome, setCalcIncome] = useState(financeProfile?.monthlyIncome || 50000);
  const [calcFixed, setCalcFixed] = useState(financeProfile?.fixedExpenses || 15000);
  const [calcNecessary, setCalcNecessary] = useState(financeProfile?.avgNecessaryExpenses || 15400);
  const [calcOptional, setCalcOptional] = useState(financeProfile?.avgOptionalExpenses || 4850);

  // Goal Modals State
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const [savingsModalOpen, setSavingsModalOpen] = useState(false);
  const [goalToDeposit, setGoalToDeposit] = useState(null);

  // Dynamic savings calculation
  const currentPotentialSavings = Math.max(0, calcIncome - calcFixed - calcNecessary - calcOptional);
  const savings10PctReduce = Math.max(0, calcIncome - calcFixed - calcNecessary - (calcOptional * 0.90));
  const savings20PctReduce = Math.max(0, calcIncome - calcFixed - calcNecessary - (calcOptional * 0.80));

  const handleUpdateDefaultsFromCalc = () => {
    updateFinanceProfile({
      monthlyIncome: parseFloat(calcIncome) || 0,
      fixedExpenses: parseFloat(calcFixed) || 0,
      avgNecessaryExpenses: parseFloat(calcNecessary) || 0,
      avgOptionalExpenses: parseFloat(calcOptional) || 0
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER */}
      <div>
        <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>
          Savings Calculator & Goals 💰
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
          Calculate potential savings scenarios and track progress toward your dream goals.
        </p>
      </div>

      {/* 💰 "HOW MUCH CAN I SAVE?" CALCULATOR */}
      <div 
        className="bloom-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8FA 100%)',
          border: '1.5px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calculator size={20} color="var(--accent-dark)" />
            <span>💰 “How Much Can I Save?” Calculator</span>
          </h3>
          <span className="bloom-badge">Dynamic Scenario Engine</span>
        </div>

        {/* INPUT FIELDS GRID */}
        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Monthly Income ({currency})</label>
            <input 
              type="number"
              className="form-input"
              value={calcIncome}
              onChange={e => setCalcIncome(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Fixed Expenses ({currency})</label>
            <input 
              type="number"
              className="form-input"
              value={calcFixed}
              onChange={e => setCalcFixed(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Average Necessary Expenses ({currency})</label>
            <input 
              type="number"
              className="form-input"
              value={calcNecessary}
              onChange={e => setCalcNecessary(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Optional Spending ({currency})</label>
            <input 
              type="number"
              className="form-input"
              value={calcOptional}
              onChange={e => setCalcOptional(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* SCENARIOS RESULTS COMPARISON GRID */}
        <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Potential Savings Scenarios (Estimates):
        </h4>

        <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
          {/* CURRENT SPENDING */}
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Current Spending</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              {currency}{Math.round(currentPotentialSavings).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Income − Fixed − Necessary − Optional
            </div>
          </div>

          {/* REDUCE OPTIONAL BY 10% */}
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700 }}>Reduce Optional by 10%</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: '#15803D', marginTop: '0.3rem' }}>
              {currency}{Math.round(savings10PctReduce).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#166534', marginTop: '0.2rem' }}>
              +{currency}{Math.round(savings10PctReduce - currentPotentialSavings).toLocaleString()} extra saved monthly
            </div>
          </div>

          {/* REDUCE OPTIONAL BY 20% */}
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #FFF0F5 0%, #FCE4EC 100%)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-dark)', fontWeight: 700 }}>Reduce Optional by 20%</div>
            <div style={{ fontFamily: 'Quicksand', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-dark)', marginTop: '0.3rem' }}>
              {currency}{Math.round(savings20PctReduce).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-dark)', marginTop: '0.2rem' }}>
              +{currency}{Math.round(savings20PctReduce - currentPotentialSavings).toLocaleString()} extra saved monthly
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="bloom-btn bloom-btn-outline" onClick={handleUpdateDefaultsFromCalc}>
            Save as Default Baseline Profile ⚙️
          </button>
        </div>
      </div>

      {/* 🎯 SAVINGS GOALS CONTAINER */}
      <div className="bloom-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PiggyBank size={20} color="var(--accent-dark)" />
              <span>🎯 Savings Goals</span>
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Nurture specific funds for gadgets, trips, and milestones.</span>
          </div>

          <button 
            className="bloom-btn bloom-btn-primary"
            onClick={() => { setGoalToEdit(null); setGoalModalOpen(true); }}
          >
            <Plus size={16} />
            <span>Create New Goal</span>
          </button>
        </div>

        {savingsGoals.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No savings goals yet. Create one to begin your savings journey!
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {savingsGoals.map(goal => {
              const current = goal.currentSaved || 0;
              const target = goal.targetAmount || 1;
              const percent = Math.min(100, Math.round((current / target) * 100));
              return (
                <div 
                  key={goal.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', margin: 0 }}>
                        {goal.name}
                      </h4>
                      <span className="bloom-badge" style={{ background: percent >= 100 ? '#E6F4EA' : undefined, color: percent >= 100 ? '#10B981' : undefined }}>
                        {percent}%
                      </span>
                    </div>

                    {goal.note && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        "{goal.note}"
                      </div>
                    )}

                    <div style={{ fontFamily: 'Quicksand', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.6rem' }}>
                      {currency}{current.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ {currency}{target.toLocaleString()}</span>
                    </div>

                    <div className="bloom-progress-bar" style={{ height: '10px', marginTop: '0.5rem' }}>
                      <div className="bloom-progress-fill" style={{ width: `${percent}%` }} />
                    </div>

                    {goal.targetDate && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        Target Date: {goal.targetDate}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                    <button 
                      className="bloom-btn bloom-btn-secondary" 
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                      onClick={() => { setGoalToDeposit(goal); setSavingsModalOpen(true); }}
                    >
                      + Add Savings
                    </button>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button 
                        className="bloom-btn-icon" 
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => { setGoalToEdit(goal); setGoalModalOpen(true); }}
                      >
                        <Edit2 size={14} />
                      </button>

                      <button 
                        className="bloom-btn-icon" 
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => deleteSavingsGoal(goal.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODALS */}
      <AddGoalModal 
        isOpen={goalModalOpen} 
        onClose={() => setGoalModalOpen(false)}
        goalToEdit={goalToEdit}
      />

      <AddSavingsModal 
        isOpen={savingsModalOpen} 
        onClose={() => setSavingsModalOpen(false)}
        goal={goalToDeposit}
      />
    </div>
  );
};
