/**
 * Seed Data for Bloom 🌸
 * Rich, realistic initial data for first-time application launch.
 */

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const INITIAL_SEED_DATA = {
  settings: {
    theme: 'pink',
    timeFormat: '12h',
    firstDayOfWeek: 'Mon',
    vaultPin: null, // User can set up in Vault or Settings
    autoLockMinutes: 5,
    hideVaultPreviews: true,
    userNickname: 'Bloom Flower 🌷'
  },

  companion: {
    level: 2, // Sprout
    xp: 65,
    streakDays: 4,
    lastActiveDate: getTodayDateString()
  },

  habits: [
    {
      id: 'h1',
      name: 'Drink Water',
      icon: '💧',
      type: 'count', // count, duration, boolean, time
      goal: 8,
      unit: 'glasses',
      frequency: 'Daily',
      reminder: '09:00',
      createdAt: '2026-09-01'
    },
    {
      id: 'h2',
      name: 'Wake Up Early',
      icon: '🌅',
      type: 'time',
      goal: '07:00',
      unit: 'AM',
      frequency: 'Daily',
      reminder: '06:45',
      createdAt: '2026-09-01'
    },
    {
      id: 'h3',
      name: 'Sleep Before 11 PM',
      icon: '😴',
      type: 'time',
      goal: '23:00',
      unit: 'PM',
      frequency: 'Daily',
      reminder: '22:30',
      createdAt: '2026-09-01'
    },
    {
      id: 'h4',
      name: 'Daily Walk',
      icon: '🚶',
      type: 'duration',
      goal: 30,
      unit: 'mins',
      frequency: 'Daily',
      reminder: '17:00',
      createdAt: '2026-09-01'
    },
    {
      id: 'h5',
      name: 'Read Books',
      icon: '📚',
      type: 'duration',
      goal: 30,
      unit: 'mins',
      frequency: 'Daily',
      reminder: '21:00',
      createdAt: '2026-09-01'
    },
    {
      id: 'h6',
      name: 'Morning Meditation',
      icon: '🧘',
      type: 'boolean',
      goal: 1,
      unit: 'session',
      frequency: 'Daily',
      reminder: '07:30',
      createdAt: '2026-09-01'
    },
    {
      id: 'h7',
      name: 'No Phone Before Bed',
      icon: '📵',
      type: 'boolean',
      goal: 1,
      unit: 'check',
      frequency: 'Daily',
      reminder: '22:00',
      createdAt: '2026-09-01'
    }
  ],

  // Habit log records: date -> { habitId: completedValue }
  habitLogs: {
    [getTodayDateString()]: {
      h1: 5,
      h2: true,
      h4: 30,
      h5: 20,
      h6: true
    },
    [getYesterdayDateString()]: {
      h1: 8,
      h2: true,
      h3: true,
      h4: 35,
      h5: 30,
      h6: true,
      h7: true
    }
  },

  notes: [
    {
      id: 'n1',
      title: '🌸 Favorite Cozy Recipes',
      category: '💡 Ideas',
      content: '1. Matcha Oat Latte with vanilla syrup\n2. Warm cinnamon apple oats\n3. Berry & chia pudding bowl with coconut flakes',
      tags: ['recipes', 'cozy', 'food'],
      pinned: true,
      favorite: true,
      createdAt: '2026-09-15'
    },
    {
      id: 'n2',
      title: '✨ Autumn Bucket List',
      category: '📋 Lists',
      content: '• Visit the botanical garden 🌷\n• Bake pumpkin chocolate chip muffins\n• Read 3 cozy mystery books\n• Stargaze with hot cocoa',
      tags: ['autumn', 'goals', 'fun'],
      pinned: true,
      favorite: false,
      createdAt: '2026-09-14'
    },
    {
      id: 'n3',
      title: '📚 Weekly Study Routine',
      category: '📚 Study',
      content: 'Focus on Pomodoro 25/5 cycles. Morning focus block for deep learning, afternoon review session.',
      tags: ['study', 'productivity'],
      pinned: false,
      favorite: true,
      createdAt: '2026-09-10'
    }
  ],

  vaultNotes: [
    {
      id: 'v1',
      title: '🔐 Private Reflections & Aspirations',
      content: 'My private space to write candid feelings without filter. Working on patience, self-kindness, and listening to my inner voice.',
      category: 'Journal',
      createdAt: '2026-09-12'
    },
    {
      id: 'v2',
      title: '🔑 Emergency Codes & Key Info',
      content: 'Saved home wifi backup key, locker combination 42-18-90, passport expiry date 2031.',
      category: 'Secrets',
      createdAt: '2026-09-02'
    }
  ],

  goals: [
    {
      id: 'g1',
      name: 'Build & Polish My Personal Bloom App 🌸',
      category: '💻 Project',
      description: 'Create a cute, modern, fully local life-management application for daily tracking.',
      target: 5,
      current: 4,
      deadline: '2026-09-30',
      milestones: [
        { id: 'm1', text: 'Design pink & white aesthetic system', done: true },
        { id: 'm2', text: 'Build offline storage service & mock seed', done: true },
        { id: 'm3', text: 'Implement Habits & Notes section', done: true },
        { id: 'm4', text: 'Implement Vault, Goals & Insights', done: true },
        { id: 'm5', text: 'Final polish and theme customization', done: false }
      ]
    },
    {
      id: 'g2',
      name: 'Save $1,000 for Autumn Trip ✈️',
      category: '💰 Savings',
      description: 'Putting aside small weekly contributions into rainy day fund.',
      target: 1000,
      current: 750,
      deadline: '2026-11-15',
      milestones: [
        { id: 'm21', text: 'Save first $250', done: true },
        { id: 'm22', text: 'Save $500 milestone', done: true },
        { id: 'm23', text: 'Reach $750 target', done: true },
        { id: 'm24', text: 'Reach $1,000 final goal', done: false }
      ]
    },
    {
      id: 'g3',
      name: 'Read 12 Books This Season 📖',
      category: '📚 Reading',
      description: 'Nurture a calming evening reading habit.',
      target: 12,
      current: 5,
      deadline: '2026-12-31',
      milestones: [
        { id: 'm31', text: 'Finish 3 fiction novels', done: true },
        { id: 'm32', text: 'Finish 2 self-care guides', done: true },
        { id: 'm33', text: 'Read 3 poetry collections', done: false }
      ]
    }
  ],

  tasks: [
    {
      id: 't1',
      title: 'Water bedroom plants & prune leaves 🌱',
      priority: 'Medium',
      dueDate: getTodayDateString(),
      completed: false,
      subtasks: [
        { id: 'st1', text: 'Water monstera', done: true },
        { id: 'st2', text: 'Mist succulents', done: false }
      ]
    },
    {
      id: 't2',
      title: 'Prepare herbal tea and organize desk ☕',
      priority: 'Low',
      dueDate: getTodayDateString(),
      completed: true,
      subtasks: []
    },
    {
      id: 't3',
      title: 'Submit creative assignment outline 🎓',
      priority: 'High',
      dueDate: getTodayDateString(),
      completed: false,
      subtasks: []
    }
  ],

  journalEntries: [
    {
      id: 'j1',
      date: getTodayDateString(),
      mood: '😊 Good',
      title: 'A Gentle, Productive Morning 🌷',
      content: 'Woke up early and enjoyed a warm cup of matcha. Felt peaceful while listening to soft lofi beats. Took a short walk in the sunlight.',
      prompts: {
        happy: 'The warm morning sunshine through my window.',
        grateful: 'Fresh crisp air and friendly smiles on my morning walk.',
        learned: 'Small consistent steps lead to lovely peaceful days.'
      },
      tags: ['peaceful', 'morning', 'matcha'],
      favorite: true
    },
    {
      id: 'j2',
      date: getYesterdayDateString(),
      mood: '😍 Amazing',
      title: 'Sparkles and Quiet Progress ✨',
      content: 'Finished reading two chapters of my current favorite book and completed all my daily water goals!',
      prompts: {
        happy: 'Achieving a 4-day habit streak!',
        grateful: 'Quiet evening reading time.'
      },
      tags: ['reading', 'habits', 'streak'],
      favorite: false
    }
  ],

  moods: [
    { date: getTodayDateString(), mood: '😊 Good', energy: 4, stress: 2, note: 'Feeling focused and calm.' },
    { date: getYesterdayDateString(), mood: '😍 Amazing', energy: 5, stress: 1, note: 'Great sleep last night!' }
  ],

  waterLogs: {
    [getTodayDateString()]: { current: 5, target: 8 },
    [getYesterdayDateString()]: { current: 8, target: 8 }
  },

  sleepLogs: [
    { date: getTodayDateString(), bedtime: '23:15', wakeTime: '07:15', durationHours: 8.0, quality: 'Good' },
    { date: getYesterdayDateString(), bedtime: '22:45', wakeTime: '07:00', durationHours: 8.25, quality: 'Great' }
  ],

  focusSessions: [
    { date: getTodayDateString(), durationMinutes: 25, label: 'Bloom Feature Coding' },
    { date: getTodayDateString(), durationMinutes: 25, label: 'Habit Tracker Review' },
    { date: getYesterdayDateString(), durationMinutes: 50, label: 'Deep Reading' }
  ],

  financeProfile: {
    monthlyIncome: 50000,
    monthlyBudget: 35000,
    fixedExpenses: 15000,
    avgNecessaryExpenses: 15400,
    avgOptionalExpenses: 4850,
    currency: '₹'
  },

  categoryBudgets: {
    '🍔 Food': 8000,
    '🛍️ Shopping': 5000,
    '🚕 Transport': 4000,
    '☕ Coffee': 2000,
    '🏠 Bills': 18000
  },

  customCategories: [
    '☕ Coffee',
    '🍔 Food',
    '🚕 Transport',
    '🛍️ Shopping',
    '🎬 Entertainment',
    '📱 Subscriptions',
    '🏠 Bills',
    '🎓 Education',
    '💊 Personal Care',
    '💻 Technology',
    '✈️ Travel',
    '🎁 Gifts',
    '💗 Family',
    '✨ Other'
  ],

  recurringExpenses: [
    {
      id: 'rc1',
      name: 'Apartment Rent',
      amount: 15000,
      category: '🏠 Bills',
      frequency: 'Monthly',
      nextDate: '2026-10-01',
      type: 'Necessary',
      paymentMethod: 'Bank'
    },
    {
      id: 'rc2',
      name: 'High-Speed Broadband',
      amount: 999,
      category: '🏠 Bills',
      frequency: 'Monthly',
      nextDate: '2026-10-05',
      type: 'Necessary',
      paymentMethod: 'UPI'
    },
    {
      id: 'rc3',
      name: 'Mobile Postpaid Plan',
      amount: 499,
      category: '🏠 Bills',
      frequency: 'Monthly',
      nextDate: '2026-09-28',
      type: 'Necessary',
      paymentMethod: 'UPI'
    },
    {
      id: 'rc4',
      name: 'Music & Movie Streaming',
      amount: 649,
      category: '📱 Subscriptions',
      frequency: 'Monthly',
      nextDate: '2026-10-02',
      type: 'Optional',
      paymentMethod: 'Card'
    }
  ],

  savingsGoals: [
    {
      id: 'sg1',
      name: '🎧 Buy headphones',
      targetAmount: 10000,
      currentSaved: 6500,
      targetDate: '2026-10-15',
      note: 'Noise cancelling for study & work'
    },
    {
      id: 'sg2',
      name: '🏖️ Vacation',
      targetAmount: 50000,
      currentSaved: 25000,
      targetDate: '2026-12-20',
      note: 'Year-end autumn mountain trip'
    },
    {
      id: 'sg3',
      name: '💻 New laptop',
      targetAmount: 80000,
      currentSaved: 35000,
      targetDate: '2027-01-31',
      note: 'Upgraded creative workstation'
    },
    {
      id: 'sg4',
      name: '🎁 Birthday Gift for Mom',
      targetAmount: 5000,
      currentSaved: 3200,
      targetDate: '2026-10-05',
      note: 'Cozy scarf & tea sampler box'
    }
  ],

  financeMonthlyHistory: [
    {
      month: 'August',
      income: 48000,
      spent: 34200,
      saved: 13800,
      categoryTotals: {
        '🍔 Food': 6200,
        '🛍️ Shopping': 4100,
        '🚕 Transport': 3800,
        '🏠 Bills': 16500,
        '☕ Coffee': 1300,
        '✨ Other': 2300
      }
    },
    {
      month: 'July',
      income: 50000,
      spent: 37500,
      saved: 12500,
      categoryTotals: {
        '🍔 Food': 7800,
        '🛍️ Shopping': 6500,
        '🚕 Transport': 4200,
        '🏠 Bills': 15800,
        '☕ Coffee': 1600,
        '✨ Other': 1600
      }
    }
  ],

  expenses: [
    {
      id: 'e1',
      date: getTodayDateString(),
      amount: 280,
      category: '🍔 Food',
      type: 'Necessary',
      paymentMethod: 'Card',
      description: 'Lunch with team',
      note: 'Healthy lunch box'
    },
    {
      id: 'e2',
      date: getTodayDateString(),
      amount: 180,
      category: '☕ Coffee',
      type: 'Optional',
      paymentMethod: 'UPI',
      description: 'Morning Vanilla Latte',
      note: 'Cozy cafe visit'
    },
    {
      id: 'e3',
      date: getTodayDateString(),
      amount: 1299,
      category: '🛍️ Shopping',
      type: 'Unplanned',
      paymentMethod: 'UPI',
      description: 'Cotton T-shirt',
      note: 'Impulse store purchase'
    },
    {
      id: 'e4',
      date: getYesterdayDateString(),
      amount: 240,
      category: '🚕 Transport',
      type: 'Necessary',
      paymentMethod: 'UPI',
      description: 'Cab ride to office',
      note: 'Morning rush hour'
    },
    {
      id: 'e5',
      date: getYesterdayDateString(),
      amount: 1850,
      category: '🏠 Bills',
      type: 'Necessary',
      paymentMethod: 'Card',
      description: 'Weekly grocery refill',
      note: 'Veggies, fruit, almond milk'
    },
    {
      id: 'e6',
      date: '2026-09-01',
      amount: 15000,
      category: '🏠 Bills',
      type: 'Necessary',
      paymentMethod: 'Bank',
      description: 'Monthly house rent',
      note: 'Transferred to landlord'
    },
    {
      id: 'e7',
      date: '2026-09-05',
      amount: 1499,
      category: '📱 Subscriptions',
      type: 'Necessary',
      paymentMethod: 'UPI',
      description: 'Broadband & Streaming',
      note: 'Monthly wifi package'
    },
    {
      id: 'e8',
      date: '2026-09-10',
      amount: 1200,
      category: '🍔 Food',
      type: 'Optional',
      paymentMethod: 'Card',
      description: 'Dinner with friends',
      note: 'Weekend bistro'
    },
    {
      id: 'e9',
      date: '2026-09-12',
      amount: 2200,
      category: '🛍️ Shopping',
      type: 'Optional',
      paymentMethod: 'Card',
      description: 'Autumn cardigan',
      note: 'Cozy clothing'
    },
    {
      id: 'e10',
      date: '2026-09-14',
      amount: 1270,
      category: '☕ Coffee',
      type: 'Optional',
      paymentMethod: 'UPI',
      description: 'Work cafe sessions',
      note: 'Weekly lattes'
    },
    {
      id: 'e11',
      date: '2026-09-15',
      amount: 1500,
      category: '💻 Technology',
      type: 'Unplanned',
      paymentMethod: 'Card',
      description: 'Portable powerbank',
      note: 'Emergency gadget'
    },
    {
      id: 'e12',
      date: '2026-09-16',
      amount: 3720,
      category: '🍔 Food',
      type: 'Necessary',
      paymentMethod: 'Card',
      description: 'Weekly pantry & meal prep',
      note: 'Groceries'
    },
    {
      id: 'e13',
      date: '2026-09-17',
      amount: 2162,
      category: '✨ Other',
      type: 'Necessary',
      paymentMethod: 'UPI',
      description: 'Household items',
      note: 'Stationery & supplies'
    }
  ],

  books: [
    {
      id: 'b1',
      title: 'The Little Book of Hygge',
      author: 'Meik Wiking',
      status: 'Reading', // Want to Read, Reading, Finished
      currentPage: 142,
      totalPages: 288,
      rating: 5,
      notes: 'So cozy and encouraging! Reminds me to embrace quiet warmth.',
      coverEmoji: '🕯️'
    },
    {
      id: 'b2',
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'Finished',
      currentPage: 320,
      totalPages: 320,
      rating: 5,
      notes: 'Tiny 1% improvements stack up over time.',
      coverEmoji: '🌱'
    },
    {
      id: 'b3',
      title: 'Before the Coffee Gets Cold',
      author: 'Toshikazu Kawaguchi',
      status: 'Want to Read',
      currentPage: 0,
      totalPages: 225,
      rating: 0,
      notes: 'Recommended by a friend for cozy evening reading.',
      coverEmoji: '☕'
    }
  ],

  media: [
    {
      id: 'm1',
      title: 'Studio Ghibli: Kiki\'s Delivery Service',
      type: 'Movie', // Movie, TV Show, Anime, Podcast
      status: 'Finished', // Want to Watch, Watching, Finished
      rating: 5,
      notes: 'Wholesome, soothing, and beautifully animated 🧹 cat Jiji is adorable!',
      emoji: '🎬'
    },
    {
      id: 'm2',
      title: 'The Cozy Club Podcast',
      type: 'Podcast',
      status: 'Watching',
      rating: 4,
      notes: 'Weekly episodes on simple living and mindfulness.',
      emoji: '🎧'
    }
  ],

  trips: [
    {
      id: 'tr1',
      destination: 'Kyoto & Arashiyama Bamboo Grove 🍁',
      startDate: '2026-10-15',
      endDate: '2026-10-22',
      places: ['Tenryu-ji Temple', 'Togetsukyo Bridge', 'Matcha Tea Ceremony', 'Traditional Ryokan'],
      notes: 'Autumn foliage season trip! Pack cozy sweaters and camera.',
      budget: 1200,
      spent: 450,
      emoji: '✈️'
    }
  ],

  brainDump: '• Ideas for weekend baking\n• Remind mom about tea gift box\n• Explore soft lofi playlists for focus timer sessions\n• Plant seeds in balcony pot 🌸',

  achievements: [
    { id: 'ac1', title: '🌱 First Step', desc: 'Completed your first daily habit', icon: '🌱', unlocked: true },
    { id: 'ac2', title: '💧 Hydrated', desc: 'Reached your water goal 7 times', icon: '💧', unlocked: true },
    { id: 'ac3', title: '📖 Bookworm', desc: 'Finished your first book in Bloom', icon: '📖', unlocked: true },
    { id: 'ac4', title: '📝 Dear Diary', desc: 'Created 5 journal entries', icon: '📝', unlocked: false },
    { id: 'ac5', title: '⏱️ Deep Focus', desc: 'Completed 3 Pomodoro focus sessions', icon: '⏱️', unlocked: true },
    { id: 'ac6', title: '🔐 Vault Keeper', desc: 'Set up local private vault protection', icon: '🔐', unlocked: false }
  ]
};
