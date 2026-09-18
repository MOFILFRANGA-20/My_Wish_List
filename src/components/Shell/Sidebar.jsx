import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Sprout, 
  FileText, 
  Target, 
  BarChart2, 
  Smile, 
  BookOpen, 
  Droplet, 
  Moon, 
  CheckSquare, 
  Timer, 
  DollarSign, 
  Book, 
  Film, 
  Compass, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Lock, 
  Settings as SettingsIcon,
  Award
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, habits, notes, tasks, goals } = useApp();

  const mainNavItems = [
    { id: 'today', label: 'Today', icon: Home, badge: null },
    { id: 'habits', label: 'Habits', icon: Sprout, badge: habits.length },
    { id: 'notes', label: 'Notes', icon: FileText, badge: notes.length },
    { id: 'goals', label: 'Goals', icon: Target, badge: goals.length },
    { id: 'insights', label: 'Insights', icon: BarChart2, badge: null },
  ];

  const extraNavItems = [
    { id: 'mood', label: 'Mood', icon: Smile },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'water', label: 'Water', icon: Droplet },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: tasks.filter(t => !t.completed).length },
    { id: 'focus', label: 'Focus Timer', icon: Timer },
    { id: 'finance', label: 'My Money 💗', icon: DollarSign },
    { id: 'reading', label: 'Reading', icon: Book },
    { id: 'media', label: 'Media', icon: Film },
    { id: 'travel', label: 'Travel', icon: Compass },
    { id: 'braindump', label: 'Brain Dump', icon: Sparkles },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'achievements', label: 'Badges', icon: Award },
    { id: 'vault', label: 'Private Vault', icon: Lock },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🌸</span>
        <div>
          <h1 className="brand-title">Bloom</h1>
          <div className="brand-subtitle">My Private Life Space</div>
        </div>
      </div>

      <div className="sidebar-section-label">Main Menu</div>
      <nav className="sidebar-nav">
        {mainNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge !== null && item.badge > 0 && (
                <span className="item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-section-label">Personal Life</div>
      <nav className="sidebar-nav">
        {extraNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
