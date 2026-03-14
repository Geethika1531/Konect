'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store';

export function ThemeController() {
  const themePreference = useAppStore((state) => state.themePreference);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-neutral', 'theme-lgbtq');
    
    // Add the current theme class
    const themeClass = themePreference === 'lgbtq' ? 'theme-lgbtq' : 'theme-neutral';
    root.classList.add(themeClass);
    
    // Set the data-theme attribute for CSS selectors
    root.setAttribute('data-theme', themePreference);
    
    // Update local storage as a fallback/sync mechanism
    localStorage.setItem('konect_theme_preference', themePreference);
  }, [themePreference]);

  return null; // This component doesn't render anything
}
