import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { INITIAL_SEED_DATA } from '../services/seedData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation & Shell State
  const [activeTab, setActiveTab] = useState('today');
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize or load from local storage
  const [settings, setSettings] = useState(() => StorageService.get('settings', INITIAL_SEED_DATA.settings));
  const [companion, setCompanion] = useState(() => StorageService.get('companion', INITIAL_SEED_DATA.companion));
  const [habits, setHabits] = useState(() => StorageService.get('habits', INITIAL_SEED_DATA.habits));
  const [habitLogs, setHabitLogs] = useState(() => StorageService.get('habitLogs', INITIAL_SEED_DATA.habitLogs));
  const [notes, setNotes] = useState(() => StorageService.get('notes', INITIAL_SEED_DATA.notes));
  const [vaultNotes, setVaultNotes] = useState(() => StorageService.get('vaultNotes', INITIAL_SEED_DATA.vaultNotes));
  const [vaultLocked, setVaultLocked] = useState(true);
  const [goals, setGoals] = useState(() => StorageService.get('goals', INITIAL_SEED_DATA.goals));
  const [tasks, setTasks] = useState(() => StorageService.get('tasks', INITIAL_SEED_DATA.tasks));
  const [journalEntries, setJournalEntries] = useState(() => StorageService.get('journalEntries', INITIAL_SEED_DATA.journalEntries));
  const [moods, setMoods] = useState(() => StorageService.get('moods', INITIAL_SEED_DATA.moods));
  const [waterLogs, setWaterLogs] = useState(() => StorageService.get('waterLogs', INITIAL_SEED_DATA.waterLogs));
  const [sleepLogs, setSleepLogs] = useState(() => StorageService.get('sleepLogs', INITIAL_SEED_DATA.sleepLogs));
  const [focusSessions, setFocusSessions] = useState(() => StorageService.get('focusSessions', INITIAL_SEED_DATA.focusSessions));
  const [expenses, setExpenses] = useState(() => StorageService.get('expenses', INITIAL_SEED_DATA.expenses));
  const [financeProfile, setFinanceProfile] = useState(() => StorageService.get('financeProfile', INITIAL_SEED_DATA.financeProfile));
  const [categoryBudgets, setCategoryBudgets] = useState(() => StorageService.get('categoryBudgets', INITIAL_SEED_DATA.categoryBudgets));
  const [recurringExpenses, setRecurringExpenses] = useState(() => StorageService.get('recurringExpenses', INITIAL_SEED_DATA.recurringExpenses));
  const [savingsGoals, setSavingsGoals] = useState(() => StorageService.get('savingsGoals', INITIAL_SEED_DATA.savingsGoals));
  const [customCategories, setCustomCategories] = useState(() => StorageService.get('customCategories', INITIAL_SEED_DATA.customCategories));
  const [financeMonthlyHistory, setFinanceMonthlyHistory] = useState(() => StorageService.get('financeMonthlyHistory', INITIAL_SEED_DATA.financeMonthlyHistory));
  const [books, setBooks] = useState(() => StorageService.get('books', INITIAL_SEED_DATA.books));
  const [media, setMedia] = useState(() => StorageService.get('media', INITIAL_SEED_DATA.media));
  const [trips, setTrips] = useState(() => StorageService.get('trips', INITIAL_SEED_DATA.trips));
  const [brainDump, setBrainDump] = useState(() => StorageService.get('brainDump', INITIAL_SEED_DATA.brainDump));
  const [achievements, setAchievements] = useState(() => StorageService.get('achievements', INITIAL_SEED_DATA.achievements));

  // Sync theme attribute to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings?.theme || 'pink');
  }, [settings?.theme]);

  // Persist handlers
  useEffect(() => { StorageService.set('settings', settings); }, [settings]);
  useEffect(() => { StorageService.set('companion', companion); }, [companion]);
  useEffect(() => { StorageService.set('habits', habits); }, [habits]);
  useEffect(() => { StorageService.set('habitLogs', habitLogs); }, [habitLogs]);
  useEffect(() => { StorageService.set('notes', notes); }, [notes]);
  useEffect(() => { StorageService.set('vaultNotes', vaultNotes); }, [vaultNotes]);
  useEffect(() => { StorageService.set('goals', goals); }, [goals]);
  useEffect(() => { StorageService.set('tasks', tasks); }, [tasks]);
  useEffect(() => { StorageService.set('journalEntries', journalEntries); }, [journalEntries]);
  useEffect(() => { StorageService.set('moods', moods); }, [moods]);
  useEffect(() => { StorageService.set('waterLogs', waterLogs); }, [waterLogs]);
  useEffect(() => { StorageService.set('sleepLogs', sleepLogs); }, [sleepLogs]);
  useEffect(() => { StorageService.set('focusSessions', focusSessions); }, [focusSessions]);
  useEffect(() => { StorageService.set('expenses', expenses); }, [expenses]);
  useEffect(() => { StorageService.set('financeProfile', financeProfile); }, [financeProfile]);
  useEffect(() => { StorageService.set('categoryBudgets', categoryBudgets); }, [categoryBudgets]);
  useEffect(() => { StorageService.set('recurringExpenses', recurringExpenses); }, [recurringExpenses]);
  useEffect(() => { StorageService.set('savingsGoals', savingsGoals); }, [savingsGoals]);
  useEffect(() => { StorageService.set('customCategories', customCategories); }, [customCategories]);
  useEffect(() => { StorageService.set('financeMonthlyHistory', financeMonthlyHistory); }, [financeMonthlyHistory]);
  useEffect(() => { StorageService.set('books', books); }, [books]);
  useEffect(() => { StorageService.set('media', media); }, [media]);
  useEffect(() => { StorageService.set('trips', trips); }, [trips]);
  useEffect(() => { StorageService.set('brainDump', brainDump); }, [brainDump]);
  useEffect(() => { StorageService.set('achievements', achievements); }, [achievements]);

  // Toast Trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Plant Companion XP Boost Helper
  const rewardXP = (amount = 10) => {
    setCompanion(prev => {
      let newXP = (prev?.xp || 0) + amount;
      let newLevel = prev?.level || 1;
      // Level thresholds: Level 1 (Seed 0-50), Level 2 (Sprout 51-120), Level 3 (Plant 121-250), Level 4 (Flower 251+)
      if (newXP >= 250 && newLevel < 4) newLevel = 4;
      else if (newXP >= 120 && newLevel < 3) newLevel = 3;
      else if (newXP >= 50 && newLevel < 2) newLevel = 2;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  // Today Date helper string (YYYY-MM-DD)
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // ---------------- HABITS HANDLERS ----------------
  const toggleHabitCompletion = (habitId, value = null) => {
    const today = getTodayStr();
    setHabitLogs(prev => {
      const todayLogs = prev[today] || {};
      const currentVal = todayLogs[habitId];
      let newVal;

      if (value !== null) {
        newVal = value;
      } else {
        // Toggle boolean or increment
        const habitObj = habits.find(h => h.id === habitId);
        if (habitObj?.type === 'count') {
          const count = typeof currentVal === 'number' ? currentVal : 0;
          newVal = count >= habitObj.goal ? 0 : count + 1;
        } else {
          newVal = !currentVal;
        }
      }

      const updated = {
        ...prev,
        [today]: {
          ...todayLogs,
          [habitId]: newVal
        }
      };

      if (newVal) {
        rewardXP(15);
        showToast('✨ Habit progress recorded!');
      }
      return updated;
    });
  };

  const addHabit = (habitData) => {
    const newHabit = {
      id: 'h_' + Date.now(),
      createdAt: getTodayStr(),
      ...habitData
    };
    setHabits(prev => [...prev, newHabit]);
    showToast('🌱 New habit added!');
  };

  const editHabit = (habitId, updatedData) => {
    setHabits(prev => prev.map(h => h.id === habitId ? { ...h, ...updatedData } : h));
    showToast('✏️ Habit updated!');
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    showToast('Deleted habit.');
  };

  // ---------------- NOTES & VAULT HANDLERS ----------------
  const addNote = (noteData, isVault = false) => {
    const newEntry = {
      id: (isVault ? 'v_' : 'n_') + Date.now(),
      createdAt: getTodayStr(),
      pinned: false,
      favorite: false,
      ...noteData
    };
    if (isVault) {
      setVaultNotes(prev => [newEntry, ...prev]);
    } else {
      setNotes(prev => [newEntry, ...prev]);
    }
    showToast(isVault ? '🔐 Private vault note saved!' : '📝 Note created!');
  };

  const editNote = (noteId, updatedData, isVault = false) => {
    if (isVault) {
      setVaultNotes(prev => prev.map(n => n.id === noteId ? { ...n, ...updatedData } : n));
    } else {
      setNotes(prev => prev.map(n => n.id === noteId ? { ...n, ...updatedData } : n));
    }
    showToast('Note updated!');
  };

  const deleteNote = (noteId, isVault = false) => {
    if (isVault) {
      setVaultNotes(prev => prev.filter(n => n.id !== noteId));
    } else {
      setNotes(prev => prev.filter(n => n.id !== noteId));
    }
    showToast('Note removed.');
  };

  const togglePinNote = (noteId) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, pinned: !n.pinned } : n));
  };

  const toggleFavNote = (noteId) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, favorite: !n.favorite } : n));
  };

  // ---------------- GOALS HANDLERS ----------------
  const addGoal = (goalData) => {
    const newGoal = {
      id: 'g_' + Date.now(),
      current: 0,
      milestones: [],
      ...goalData
    };
    setGoals(prev => [...prev, newGoal]);
    showToast('🎯 Goal created!');
  };

  const updateGoalProgress = (goalId, newCurrent) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const target = g.target || 1;
        const bounded = Math.max(0, Math.min(newCurrent, target));
        if (bounded >= target) {
          rewardXP(30);
          showToast('🎉 Milestone reached! Goal accomplished!');
        }
        return { ...g, current: bounded };
      }
      return g;
    }));
  };

  const toggleGoalMilestone = (goalId, milestoneId) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedMs = g.milestones.map(m => m.id === milestoneId ? { ...m, done: !m.done } : m);
        const completedCount = updatedMs.filter(m => m.done).length;
        return { ...g, milestones: updatedMs, current: completedCount };
      }
      return g;
    }));
  };

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
    showToast('Goal removed.');
  };

  // ---------------- TASKS HANDLERS ----------------
  const addTask = (taskData) => {
    const newTask = {
      id: 't_' + Date.now(),
      completed: false,
      subtasks: [],
      ...taskData
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('📋 Task created!');
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newStatus = !t.completed;
        if (newStatus) rewardXP(10);
        return { ...t, completed: newStatus };
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // ---------------- JOURNAL HANDLERS ----------------
  const addJournalEntry = (entryData) => {
    const newEntry = {
      id: 'j_' + Date.now(),
      date: getTodayStr(),
      favorite: false,
      ...entryData
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    rewardXP(20);
    showToast('📓 Journal entry saved!');
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries(prev => prev.filter(j => j.id !== id));
  };

  // ---------------- MOOD HANDLERS ----------------
  const logMood = (moodObj) => {
    const today = getTodayStr();
    setMoods(prev => {
      const filtered = prev.filter(m => m.date !== today);
      return [{ date: today, ...moodObj }, ...filtered];
    });
    rewardXP(10);
    showToast('😊 Mood recorded!');
  };

  // ---------------- WATER HANDLERS ----------------
  const updateWater = (delta) => {
    const today = getTodayStr();
    setWaterLogs(prev => {
      const todayLog = prev[today] || { current: 0, target: 8 };
      const newCurrent = Math.max(0, todayLog.current + delta);
      if (newCurrent >= todayLog.target && todayLog.current < todayLog.target) {
        rewardXP(15);
        showToast('💧 Hydration target met today!');
      }
      return {
        ...prev,
        [today]: { ...todayLog, current: newCurrent }
      };
    });
  };

  const setWaterTarget = (newTarget) => {
    const today = getTodayStr();
    setWaterLogs(prev => ({
      ...prev,
      [today]: { ...(prev[today] || { current: 0 }), target: newTarget }
    }));
    showToast('Water target updated!');
  };

  // ---------------- SLEEP HANDLERS ----------------
  const logSleep = (sleepData) => {
    const today = getTodayStr();
    setSleepLogs(prev => {
      const filtered = prev.filter(s => s.date !== today);
      return [{ date: today, ...sleepData }, ...filtered];
    });
    showToast('😴 Sleep record saved!');
  };

  // ---------------- FOCUS TIMER HANDLERS ----------------
  const logFocusSession = (minutes, label = 'Focus Session') => {
    const session = {
      id: 'f_' + Date.now(),
      date: getTodayStr(),
      durationMinutes: minutes,
      label
    };
    setFocusSessions(prev => [session, ...prev]);
    rewardXP(25);
    showToast(`⏱️ Focused for ${minutes} minutes!`);
  };

  // ---------------- FINANCE HANDLERS ----------------
  const addExpense = (expenseData) => {
    const newExp = {
      id: 'e_' + Date.now(),
      date: expenseData.date || getTodayStr(),
      amount: parseFloat(expenseData.amount) || 0,
      category: expenseData.category || '✨ Other',
      type: expenseData.type || 'Necessary',
      paymentMethod: expenseData.paymentMethod || 'UPI',
      description: expenseData.description || 'Expense',
      note: expenseData.note || ''
    };
    setExpenses(prev => [newExp, ...prev]);
    rewardXP(10);
    showToast('💰 Expense recorded!');
  };

  const editExpense = (expenseId, updatedFields) => {
    setExpenses(prev => prev.map(e => e.id === expenseId ? { ...e, ...updatedFields, amount: parseFloat(updatedFields.amount || e.amount) } : e));
    showToast('✏️ Expense updated!');
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast('Deleted expense.');
  };

  const updateFinanceProfile = (fields) => {
    setFinanceProfile(prev => ({ ...prev, ...fields }));
    showToast('⚙️ Finance settings saved!');
  };

  const updateCategoryBudgets = (newBudgets) => {
    setCategoryBudgets(newBudgets);
    showToast('🎯 Category budgets updated!');
  };

  const addCustomCategory = (categoryName) => {
    if (!categoryName) return;
    const trimmed = categoryName.trim();
    if (!customCategories.includes(trimmed)) {
      setCustomCategories(prev => [...prev, trimmed]);
      showToast('🏷️ Custom category added!');
    }
  };

  const addRecurringExpense = (recurringData) => {
    const newItem = {
      id: 'rc_' + Date.now(),
      name: recurringData.name || 'Recurring Item',
      amount: parseFloat(recurringData.amount) || 0,
      category: recurringData.category || '🏠 Bills',
      frequency: recurringData.frequency || 'Monthly',
      nextDate: recurringData.nextDate || getTodayStr(),
      type: recurringData.type || 'Necessary',
      paymentMethod: recurringData.paymentMethod || 'UPI'
    };
    setRecurringExpenses(prev => [...prev, newItem]);
    showToast('🧾 Recurring expense added!');
  };

  const editRecurringExpense = (id, fields) => {
    setRecurringExpenses(prev => prev.map(item => item.id === id ? { ...item, ...fields, amount: parseFloat(fields.amount || item.amount) } : item));
    showToast('✏️ Recurring expense updated!');
  };

  const deleteRecurringExpense = (id) => {
    setRecurringExpenses(prev => prev.filter(item => item.id !== id));
    showToast('Deleted recurring expense.');
  };

  const logRecurringExpense = (recurringItem) => {
    addExpense({
      amount: recurringItem.amount,
      category: recurringItem.category,
      type: recurringItem.type || 'Necessary',
      date: getTodayStr(),
      paymentMethod: recurringItem.paymentMethod || 'UPI',
      description: recurringItem.name,
      note: `Recurring ${recurringItem.frequency} expense`
    });

    // Advance nextDate by 1 month
    const currentDate = new Date(recurringItem.nextDate || getTodayStr());
    currentDate.setMonth(currentDate.getMonth() + 1);
    const nextDateStr = currentDate.toISOString().split('T')[0];

    setRecurringExpenses(prev => prev.map(r => r.id === recurringItem.id ? { ...r, nextDate: nextDateStr } : r));
  };

  const addSavingsGoal = (goalData) => {
    const newGoal = {
      id: 'sg_' + Date.now(),
      name: goalData.name || 'Savings Goal',
      targetAmount: parseFloat(goalData.targetAmount) || 0,
      currentSaved: parseFloat(goalData.currentSaved) || 0,
      targetDate: goalData.targetDate || '',
      note: goalData.note || ''
    };
    setSavingsGoals(prev => [...prev, newGoal]);
    showToast('🎯 Savings goal created!');
  };

  const editSavingsGoal = (id, fields) => {
    setSavingsGoals(prev => prev.map(g => g.id === id ? {
      ...g,
      ...fields,
      targetAmount: parseFloat(fields.targetAmount !== undefined ? fields.targetAmount : g.targetAmount),
      currentSaved: parseFloat(fields.currentSaved !== undefined ? fields.currentSaved : g.currentSaved)
    } : g));
    showToast('✏️ Savings goal updated!');
  };

  const deleteSavingsGoal = (id) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
    showToast('Deleted savings goal.');
  };

  const addSavingsContribution = (goalId, amount) => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return;

    setSavingsGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const newTotal = g.currentSaved + numericAmount;
        if (newTotal >= g.targetAmount && g.currentSaved < g.targetAmount) {
          rewardXP(30);
          showToast('🎉 Goal achieved! Congratulations on your savings!');
        } else {
          showToast(`💰 Added ${financeProfile?.currency || '₹'}${numericAmount} to ${g.name}!`);
        }
        return { ...g, currentSaved: newTotal };
      }
      return g;
    }));
  };

  const exportFinancialData = () => {
    try {
      const dataToExport = {
        app: 'Bloom 🌸 Personal Expenses & Savings',
        exportedAt: new Date().toISOString(),
        financeProfile,
        categoryBudgets,
        customCategories,
        recurringExpenses,
        savingsGoals,
        financeMonthlyHistory,
        expenses
      };
      const jsonStr = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my_money_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('📥 Financial data exported successfully!');
    } catch (e) {
      console.error(e);
      showToast('Export failed.');
    }
  };

  const clearFinancialData = () => {
    setExpenses([]);
    setFinanceProfile({
      monthlyIncome: 0,
      monthlyBudget: 0,
      fixedExpenses: 0,
      avgNecessaryExpenses: 0,
      avgOptionalExpenses: 0,
      currency: '₹'
    });
    setCategoryBudgets({});
    setRecurringExpenses([]);
    setSavingsGoals([]);
    showToast('🌸 All financial data deleted.');
  };

  // ---------------- READING HANDLERS ----------------
  const addBook = (bookData) => {
    const newBook = {
      id: 'b_' + Date.now(),
      status: 'Want to Read',
      currentPage: 0,
      totalPages: 100,
      rating: 0,
      ...bookData
    };
    setBooks(prev => [...prev, newBook]);
    showToast('📚 Book added to library!');
  };

  const updateBook = (bookId, updatedFields) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, ...updatedFields } : b));
  };

  const deleteBook = (bookId) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
  };

  // ---------------- MEDIA HANDLERS ----------------
  const addMedia = (mediaData) => {
    const newMedia = {
      id: 'm_' + Date.now(),
      status: 'Want to Watch',
      rating: 0,
      ...mediaData
    };
    setMedia(prev => [...prev, newMedia]);
    showToast('🎬 Media item added!');
  };

  const updateMedia = (mediaId, fields) => {
    setMedia(prev => prev.map(m => m.id === mediaId ? { ...m, ...fields } : m));
  };

  const deleteMedia = (mediaId) => {
    setMedia(prev => prev.filter(m => m.id !== mediaId));
  };

  // ---------------- TRAVEL HANDLERS ----------------
  const addTrip = (tripData) => {
    const newTrip = {
      id: 'tr_' + Date.now(),
      places: [],
      spent: 0,
      ...tripData
    };
    setTrips(prev => [...prev, newTrip]);
    showToast('✈️ New trip planned!');
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  // ---------------- BRAIN DUMP HANDLERS ----------------
  const updateBrainDump = (text) => {
    setBrainDump(text);
  };

  // ---------------- SETTINGS HANDLERS ----------------
  const updateSettings = (fields) => {
    setSettings(prev => ({ ...prev, ...fields }));
    showToast('⚙️ Settings updated!');
  };

  // Reset all application data
  const resetAllData = () => {
    StorageService.clearAllData();
    setSettings(INITIAL_SEED_DATA.settings);
    setCompanion(INITIAL_SEED_DATA.companion);
    setHabits(INITIAL_SEED_DATA.habits);
    setHabitLogs(INITIAL_SEED_DATA.habitLogs);
    setNotes(INITIAL_SEED_DATA.notes);
    setVaultNotes(INITIAL_SEED_DATA.vaultNotes);
    setGoals(INITIAL_SEED_DATA.goals);
    setTasks(INITIAL_SEED_DATA.tasks);
    setJournalEntries(INITIAL_SEED_DATA.journalEntries);
    setMoods(INITIAL_SEED_DATA.moods);
    setWaterLogs(INITIAL_SEED_DATA.waterLogs);
    setSleepLogs(INITIAL_SEED_DATA.sleepLogs);
    setFocusSessions(INITIAL_SEED_DATA.focusSessions);
    setExpenses(INITIAL_SEED_DATA.expenses);
    setFinanceProfile(INITIAL_SEED_DATA.financeProfile);
    setCategoryBudgets(INITIAL_SEED_DATA.categoryBudgets);
    setRecurringExpenses(INITIAL_SEED_DATA.recurringExpenses);
    setSavingsGoals(INITIAL_SEED_DATA.savingsGoals);
    setCustomCategories(INITIAL_SEED_DATA.customCategories);
    setFinanceMonthlyHistory(INITIAL_SEED_DATA.financeMonthlyHistory);
    setBooks(INITIAL_SEED_DATA.books);
    setMedia(INITIAL_SEED_DATA.media);
    setTrips(INITIAL_SEED_DATA.trips);
    setBrainDump(INITIAL_SEED_DATA.brainDump);
    setAchievements(INITIAL_SEED_DATA.achievements);
    showToast('🌸 Bloom has been reset to defaults.');
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      searchOpen,
      setSearchOpen,
      toastMessage,
      showToast,
      settings,
      updateSettings,
      companion,
      habits,
      habitLogs,
      toggleHabitCompletion,
      addHabit,
      editHabit,
      deleteHabit,
      notes,
      vaultNotes,
      vaultLocked,
      setVaultLocked,
      addNote,
      editNote,
      deleteNote,
      togglePinNote,
      toggleFavNote,
      goals,
      addGoal,
      updateGoalProgress,
      toggleGoalMilestone,
      deleteGoal,
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      journalEntries,
      addJournalEntry,
      deleteJournalEntry,
      moods,
      logMood,
      waterLogs,
      updateWater,
      setWaterTarget,
      sleepLogs,
      logSleep,
      focusSessions,
      logFocusSession,
      expenses,
      addExpense,
      editExpense,
      deleteExpense,
      financeProfile,
      updateFinanceProfile,
      categoryBudgets,
      updateCategoryBudgets,
      customCategories,
      addCustomCategory,
      recurringExpenses,
      addRecurringExpense,
      editRecurringExpense,
      deleteRecurringExpense,
      logRecurringExpense,
      savingsGoals,
      addSavingsGoal,
      editSavingsGoal,
      deleteSavingsGoal,
      addSavingsContribution,
      financeMonthlyHistory,
      exportFinancialData,
      clearFinancialData,
      books,
      addBook,
      updateBook,
      deleteBook,
      media,
      addMedia,
      updateMedia,
      deleteMedia,
      trips,
      addTrip,
      deleteTrip,
      brainDump,
      updateBrainDump,
      achievements,
      resetAllData,
      exportData: StorageService.exportAllData,
      importData: (jsonStr) => {
        const ok = StorageService.importData(jsonStr);
        if (ok) window.location.reload();
        return ok;
      }
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
