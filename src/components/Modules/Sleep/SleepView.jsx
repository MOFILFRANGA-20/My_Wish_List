import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Moon, Clock, Calendar, Star } from 'lucide-react';

export const SleepView = () => {
  const { sleepLogs, logSleep } = useApp();
  const [bedtime, setBedtime] = useState('22:45');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState('Great');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate simple duration hours
    const [bH, bM] = bedtime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);
    let diffMins = (wH * 60 + wM) - (bH * 60 + bM);
    if (diffMins < 0) diffMins += 24 * 60;
    const durationHours = parseFloat((diffMins / 60).toFixed(1));

    logSleep({ bedtime, wakeTime, durationHours, quality });
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">Sleep & Rest 😴</h1>
        <p className="section-desc">Record bedtime, wake time, and track your sleep duration trends.</p>
      </div>

      <div className="grid-2">
        {/* Log Sleep Form Card */}
        <div className="bloom-card">
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Record Sleep
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Bedtime 🌙</label>
                <input 
                  type="time" 
                  className="form-input"
                  value={bedtime}
                  onChange={e => setBedtime(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Wake Time 🌅</label>
                <input 
                  type="time" 
                  className="form-input"
                  value={wakeTime}
                  onChange={e => setWakeTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Sleep Quality</label>
              <select 
                className="form-select"
                value={quality}
                onChange={e => setQuality(e.target.value)}
              >
                <option value="Great">Great (Deep & Restful)</option>
                <option value="Good">Good (Refreshed)</option>
                <option value="Okay">Okay (Fair)</option>
                <option value="Poor">Poor (Restless)</option>
              </select>
            </div>

            <button type="submit" className="bloom-btn bloom-btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Save Sleep Log
            </button>
          </form>
        </div>

        {/* Sleep History Card */}
        <div className="bloom-card">
          <h2 style={{ fontFamily: 'Quicksand', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Sleep History
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sleepLogs.map((s, idx) => (
              <div key={idx} style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-dark)' }}>
                    {s.durationHours} Hours Sleep
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    Bedtime: {s.bedtime} • Wake: {s.wakeTime} • Quality: {s.quality}
                  </div>
                </div>
                <span className="bloom-badge">{s.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
