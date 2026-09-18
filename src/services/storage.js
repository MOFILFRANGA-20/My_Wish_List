/**
 * StorageService - Offline LocalStorage Abstraction for Bloom 🌸
 * Provides reliable data persistence with export/import and fallback mechanisms.
 */

const STORAGE_PREFIX = 'bloom_app_';

export const StorageService = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`[StorageService] Error reading key "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[StorageService] Error writing key "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (e) {
      console.error(`[StorageService] Error removing key "${key}":`, e);
      return false;
    }
  },

  exportAllData() {
    try {
      const exportObject = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        data: {}
      };

      for (let i = 0; i < localStorage.length; i++) {
        const fullKey = localStorage.key(i);
        if (fullKey && fullKey.startsWith(STORAGE_PREFIX)) {
          const cleanKey = fullKey.replace(STORAGE_PREFIX, '');
          try {
            exportObject.data[cleanKey] = JSON.parse(localStorage.getItem(fullKey));
          } catch (err) {
            exportObject.data[cleanKey] = localStorage.getItem(fullKey);
          }
        }
      }

      const jsonStr = JSON.stringify(exportObject, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bloom_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (e) {
      console.error('[StorageService] Export error:', e);
      return false;
    }
  },

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !parsed.data) {
        throw new Error('Invalid Bloom backup JSON structure.');
      }

      Object.keys(parsed.data).forEach(cleanKey => {
        this.set(cleanKey, parsed.data[cleanKey]);
      });

      return true;
    } catch (e) {
      console.error('[StorageService] Import error:', e);
      return false;
    }
  },

  clearAllData() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const fullKey = localStorage.key(i);
        if (fullKey && fullKey.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(fullKey);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.error('[StorageService] Clear error:', e);
      return false;
    }
  }
};
