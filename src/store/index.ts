import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  OnboardingState,
  AppView,
  OnboardingStep,
  SpecialMode,
  MoodType,
  MicroEvent,
  Circle,
  Conversation,
  MoodCard,
  IntentType,
} from '@/types';

// Default onboarding state
const defaultOnboardingState: OnboardingState = {
  step: 0,
  gender: [],
  customGender: '',
  orientation: [],
  customOrientation: '',
  pronouns: [],
  customPronouns: '',
  dateOfBirth: null,
  consentGiven: false,
  voiceNoteUrl: null,
  photos: [],
  intent: null,
  incognito: false,
  disappearingMode: false,
};

// App State Interface
interface AppState {
  // View state
  currentView: AppView;
  onboardingStep: OnboardingStep;
  specialMode: SpecialMode;
  currentMood: MoodType | null;
  
  // User state
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  
  // Onboarding state
  onboarding: OnboardingState;
  
  // Meetup progress
  meetupCount: number;
  meetupGoal: number;
  
  // Social data
  conversations: Conversation[];
  circles: Circle[];
  events: MicroEvent[];
  moodCards: MoodCard[];
  
  // UI state
  isMenuOpen: boolean;
  selectedUserId: string | null;
  selectedEventId: string | null;
  selectedCircleId: string | null;
  
  // Theme state
  themePreference: 'neutral' | 'lgbtq';
  setThemePreference: (theme: 'neutral' | 'lgbtq') => void;
  
  // Actions - Navigation
  setCurrentView: (view: AppView) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  setSpecialMode: (mode: SpecialMode) => void;
  setCurrentMood: (mood: MoodType | null) => void;
  
  // Actions - User
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
  
  // Actions - Onboarding
  updateOnboarding: <K extends keyof OnboardingState>(
    key: K,
    value: OnboardingState[K]
  ) => void;
  resetOnboarding: () => void;
  completeOnboarding: () => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  
  // Actions - Progress
  incrementMeetupCount: () => void;
  setMeetupCount: (count: number) => void;
  
  // Actions - Social
  setConversations: (conversations: Conversation[]) => void;
  setCircles: (circles: Circle[]) => void;
  setEvents: (events: MicroEvent[]) => void;
  setMoodCards: (cards: MoodCard[]) => void;
  
  // Actions - UI
  toggleMenu: () => void;
  setSelectedUser: (id: string | null) => void;
  setSelectedEvent: (id: string | null) => void;
  setSelectedCircle: (id: string | null) => void;
}

// Create the store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentView: 'landing',
      onboardingStep: 'welcome',
      specialMode: null,
      currentMood: null,
      
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      
      onboarding: defaultOnboardingState,
      
      meetupCount: 0,
      meetupGoal: 5,
      
      conversations: [],
      circles: [],
      events: [],
      moodCards: [],
      
      isMenuOpen: false,
      selectedUserId: null,
      selectedEventId: null,
      selectedCircleId: null,
      
      themePreference: 'neutral',
      setThemePreference: (theme) => set({ themePreference: theme }),
      
      // Navigation actions
      setCurrentView: (view) => set({ currentView: view }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      setSpecialMode: (mode) => set({ specialMode: mode }),
      setCurrentMood: (mood) => set({ currentMood: mood }),
      
      // User actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      logout: () => set({
        user: null,
        isAuthenticated: false,
        hasCompletedOnboarding: false,
        onboarding: defaultOnboardingState,
        currentView: 'landing',
        onboardingStep: 'welcome',
      }),
      
      // Onboarding actions
      updateOnboarding: (key, value) =>
        set((state) => ({
          onboarding: { ...state.onboarding, [key]: value },
        })),
      resetOnboarding: () => set({ onboarding: defaultOnboardingState }),
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
          currentView: 'map',
          onboardingStep: 'complete',
        }),
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      
      // Progress actions
      incrementMeetupCount: () =>
        set((state) => ({
          meetupCount: Math.min(state.meetupCount + 1, state.meetupGoal),
        })),
      setMeetupCount: (count) => set({ meetupCount: count }),
      
      // Social actions
      setConversations: (conversations) => set({ conversations }),
      setCircles: (circles) => set({ circles }),
      setEvents: (events) => set({ events }),
      setMoodCards: (cards) => set({ moodCards: cards }),
      
      // UI actions
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setSelectedUser: (id) => set({ selectedUserId: id }),
      setSelectedEvent: (id) => set({ selectedEventId: id }),
      setSelectedCircle: (id) => set({ selectedCircleId: id }),
    }),
    {
      name: 'konect-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        onboarding: state.onboarding,
        meetupCount: state.meetupCount,
        specialMode: state.specialMode,
        themePreference: state.themePreference,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useCurrentView = () => useAppStore((state) => state.currentView);
export const useOnboardingStep = () => useAppStore((state) => state.onboardingStep);

// Memoized meetup progress - use individual selectors to avoid object recreation
export const useMeetupCount = () => useAppStore((state) => state.meetupCount);
export const useMeetupGoal = () => useAppStore((state) => state.meetupGoal);

export const useSpecialMode = () => useAppStore((state) => state.specialMode);
export const useCurrentMood = () => useAppStore((state) => state.currentMood);
