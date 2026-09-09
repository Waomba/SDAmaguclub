import React, { createContext, useContext, useEffect, useState } from 'react';
import { settingsService } from '../services/settingsService.js';

// Ported from includes/header.php's `<html data-theme="...">` + pages/settings.php
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');

  useEffect(() => {
    settingsService.theme().then((d) => setThemeState(d.theme || 'light')).catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = async (next) => {
    setThemeState(next);
    try { await settingsService.setTheme(next); } catch { /* keep local state even if save fails */ }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
