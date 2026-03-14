'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useSyncExternalStore } from 'react';

export type ThemeMode = 'neutral' | 'lgbtq';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'konect_theme_preference';

// Helper function to apply theme to document
function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.classList.remove('theme-neutral', 'theme-lgbtq');
  root.classList.add(`theme-${theme}`);
  root.setAttribute('data-theme', theme);
  root.style.setProperty('--theme-transition', 'all 0.3s ease');
}

// Helper function to update theme in database
async function updateThemeInDatabase(theme: ThemeMode): Promise<void> {
  try {
    await fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme_preference: theme }),
    });
  } catch {
    // Silently fail - theme is still saved locally
  }
}

// Get initial theme from localStorage (for SSR safety)
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'neutral';
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'lgbtq' ? 'lgbtq' : 'neutral';
}

// Custom hook for localStorage subscription
function useLocalStorageTheme() {
  const storedValue = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => getInitialTheme(),
    () => 'neutral' as ThemeMode
  );
  return storedValue;
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
  isAuthenticated?: boolean;
}

export function ThemeProvider({ 
  children, 
  initialTheme,
  isAuthenticated = false 
}: ThemeProviderProps) {
  // Use localStorage hook for reactivity
  const storedTheme = useLocalStorageTheme();
  
  // State initialized from server or localStorage
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return initialTheme || 'neutral';
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync with localStorage after hydration
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'lgbtq' || saved === 'neutral') {
        applyThemeToDocument(saved);
      }
      // Mark as hydrated
      setIsHydrated(true);
    }
    return null;
  });

  // Set theme with persistence
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeToDocument(newTheme);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
    
    // If authenticated, update in database
    if (isAuthenticated) {
      updateThemeInDatabase(newTheme);
    }
  }, [isAuthenticated]);

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'neutral' ? 'lgbtq' : 'neutral');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme: isHydrated ? (storedTheme === 'lgbtq' ? 'lgbtq' : 'neutral') : theme, 
      setTheme, 
      toggleTheme, 
      isLoading: !isHydrated,
      isAuthenticated 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook for theme-aware styling
export function useThemeStyles() {
  const { theme } = useTheme();
  
  return {
    primaryGradient: theme === 'lgbtq' ? 'gradient-rainbow-animated' : 'gradient-terracotta',
    buttonClass: theme === 'lgbtq' ? 'btn-lgbtq' : 'btn-primary',
    accentColor: theme === 'lgbtq' ? 'var(--rainbow-gradient)' : 'var(--terracotta)',
    textGradient: theme === 'lgbtq' ? 'text-gradient-rainbow' : 'text-gradient-theme',
  };
}

// Export for use in non-React contexts
export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'neutral';
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'lgbtq' ? 'lgbtq' : 'neutral';
}

export function applyThemeImmediately(theme: ThemeMode): void {
  applyThemeToDocument(theme);
}
