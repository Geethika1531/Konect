'use client';

import { useState, useCallback, memo } from 'react';
import { Heart } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThemeToggleProps {
  variant?: 'default' | 'compact';
  className?: string;
}

function ThemeToggle({ variant = 'default', className = '' }: ThemeToggleProps) {
  const [isLGBTQ, setIsLGBTQ] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('konect_theme_preference') === 'lgbtq';
  });
  
  const toggleTheme = useCallback(() => {
    const newTheme = !isLGBTQ;
    setIsLGBTQ(newTheme);
    
    // Apply to DOM
    const root = document.documentElement;
    root.classList.remove('theme-neutral', 'theme-lgbtq');
    root.classList.add(newTheme ? 'theme-lgbtq' : 'theme-neutral');
    root.setAttribute('data-theme', newTheme ? 'lgbtq' : 'neutral');
    
    // Save to localStorage
    localStorage.setItem('konect_theme_preference', newTheme ? 'lgbtq' : 'neutral');
    
    // Sync to database (non-blocking)
    fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme_preference: newTheme ? 'lgbtq' : 'neutral' }),
    }).catch(() => {});
  }, [isLGBTQ]);

  const tooltipText = isLGBTQ ? 'Switch to neutral theme' : 'Switch to LGBTQ+ theme';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center rounded-full border transition-colors touch-target ${
              isLGBTQ 
                ? 'gradient-rainbow-animated border-transparent text-white' 
                : 'border-border hover:border-primary/50'
            } ${variant === 'compact' ? 'p-2' : 'px-3 py-1.5 gap-2'} ${className}`}
            aria-label={tooltipText}
          >
            <Heart className={`w-4 h-4 ${isLGBTQ ? 'text-white' : ''}`} fill={isLGBTQ ? 'white' : 'none'} />
            {variant !== 'compact' && (
              <span className='text-sm font-medium'>{isLGBTQ ? 'LGBTQ+' : 'Theme'}</span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(ThemeToggle);
export { ThemeToggle };
