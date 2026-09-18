import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Shell/Sidebar';
import { BottomNav } from './components/Shell/BottomNav';
import { Header } from './components/Shell/Header';
import { Toast } from './components/Common/Toast';
import { SearchModal } from './components/Common/SearchModal';

// Modules
import { TodayDashboard } from './components/Modules/Today/TodayDashboard';
import { HabitsView } from './components/Modules/Habits/HabitsView';
import { NotesView } from './components/Modules/Notes/NotesView';
import { VaultView } from './components/Modules/Vault/VaultView';
import { GoalsView } from './components/Modules/Goals/GoalsView';
import { InsightsView } from './components/Modules/Insights/InsightsView';
import { MoodView } from './components/Modules/Mood/MoodView';
import { JournalView } from './components/Modules/Journal/JournalView';
import { WaterView } from './components/Modules/Water/WaterView';
import { SleepView } from './components/Modules/Sleep/SleepView';
import { TasksView } from './components/Modules/Tasks/TasksView';
import { FocusView } from './components/Modules/Focus/FocusView';
import { FinanceView } from './components/Modules/Finance/FinanceView';
import { ReadingView } from './components/Modules/Reading/ReadingView';
import { MediaView } from './components/Modules/Media/MediaView';
import { TravelView } from './components/Modules/Travel/TravelView';
import { BrainDumpView } from './components/Modules/BrainDump/BrainDumpView';
import { CalendarView } from './components/Modules/Calendar/CalendarView';
import { AchievementsView } from './components/Modules/Achievements/AchievementsView';
import { SettingsView } from './components/Modules/Settings/SettingsView';

const MainContentRouter = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'today': return <TodayDashboard />;
    case 'habits': return <HabitsView />;
    case 'notes': return <NotesView />;
    case 'vault': return <VaultView />;
    case 'goals': return <GoalsView />;
    case 'insights': return <InsightsView />;
    case 'mood': return <MoodView />;
    case 'journal': return <JournalView />;
    case 'water': return <WaterView />;
    case 'sleep': return <SleepView />;
    case 'tasks': return <TasksView />;
    case 'focus': return <FocusView />;
    case 'finance': return <FinanceView />;
    case 'reading': return <ReadingView />;
    case 'media': return <MediaView />;
    case 'travel': return <TravelView />;
    case 'braindump': return <BrainDumpView />;
    case 'calendar': return <CalendarView />;
    case 'achievements': return <AchievementsView />;
    case 'settings': return <SettingsView />;
    default: return <TodayDashboard />;
  }
};

export function AppContent() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <MainContentRouter />
      </div>
      <BottomNav />
      <Toast />
      <SearchModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
