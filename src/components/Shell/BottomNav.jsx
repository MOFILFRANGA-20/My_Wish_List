import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Sprout, FileText, Target, BarChart2, MoreHorizontal } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const mainItems = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'habits', label: 'Habits', icon: Sprout },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'insights', label: 'Insights', icon: BarChart2 },
    { id: 'settings', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-items">
        {mainItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
