'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import {
  WelcomeScreen,
  GenderIdentityScreen,
  SexualOrientationScreen,
  PronounsScreen,
  AgeVerificationScreen,
  ConsentScreen,
  VoiceNoteScreen,
  PhotosScreen,
  IntentScreen,
  PrivacyScreen,
} from '@/components/konect/onboarding-screens';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { onboardingStep, setOnboardingStep, hasCompletedOnboarding } = useAppStore();

  // Sync URL param with store
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      setOnboardingStep(stepParam as typeof onboardingStep);
    }
  }, [searchParams, setOnboardingStep]);

  // Redirect if already completed
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.push('/discover');
    }
  }, [hasCompletedOnboarding, router]);

  const renderStep = () => {
    switch (onboardingStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'gender':
        return <GenderIdentityScreen />;
      case 'orientation':
        return <SexualOrientationScreen />;
      case 'pronouns':
        return <PronounsScreen />;
      case 'age':
        return <AgeVerificationScreen />;
      case 'consent':
        return <ConsentScreen />;
      case 'voice':
        return <VoiceNoteScreen />;
      case 'photos':
        return <PhotosScreen />;
      case 'intent':
        return <IntentScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      case 'complete':
        router.push('/discover');
        return null;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderStep()}
    </AnimatePresence>
  );
}
