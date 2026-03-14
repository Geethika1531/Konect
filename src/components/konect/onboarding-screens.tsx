'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  Camera,
  Info,
  Shield,
  Heart,
  Users,
  Calendar,
  MapPin,
  Lock,
  EyeOff,
  AlertCircle,
  Check,
  Plus,
  X,
  Clock,
} from 'lucide-react';
import { useAppStore } from '@/store';
import type { GenderType, OrientationType, PronounType, IntentType } from '@/types';

// Welcome Screen - First step of onboarding
export function WelcomeScreen() {
  const router = useRouter();
  const { setOnboardingStep } = useAppStore();

  const handleStart = () => {
    setOnboardingStep('gender');
    router.push('/onboarding?step=gender');
  };

  return (
    <div className="min-h-screen bg-premium-dark flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-3xl gradient-rainbow flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Heart className="w-12 h-12 text-white" fill="white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Welcome to{' '}
            <span className="text-gradient-rainbow">Konect</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Let&apos;s set up your profile. This helps us match you with like-minded people and keep everyone safe.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 justify-center text-muted-foreground">
              <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">1</Badge>
              <span>Tell us about yourself</span>
            </div>
            <div className="flex items-center gap-3 justify-center text-muted-foreground">
              <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">2</Badge>
              <span>Add your photos and voice</span>
            </div>
            <div className="flex items-center gap-3 justify-center text-muted-foreground">
              <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">3</Badge>
              <span>Set your preferences</span>
            </div>
          </div>

          <Button
            size="lg"
            className="btn-premium px-8 py-6 text-lg rounded-2xl shadow-xl text-white"
            onClick={handleStart}
          >
            Let&apos;s Get Started
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            You can always update these later in settings
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Gender Identity Screen
const genderOptions: { value: GenderType; label: string; emoji: string }[] = [
  { value: 'woman', label: 'Woman', emoji: '👩' },
  { value: 'man', label: 'Man', emoji: '👨' },
  { value: 'non-binary', label: 'Non-binary', emoji: '🧑' },
  { value: 'trans-woman', label: 'Trans Woman', emoji: '👩‍🦰' },
  { value: 'trans-man', label: 'Trans Man', emoji: '👨‍🦱' },
  { value: 'genderqueer', label: 'Genderqueer', emoji: '🌈' },
  { value: 'agender', label: 'Agender', emoji: '⚪' },
  { value: 'genderfluid', label: 'Genderfluid', emoji: '🌊' },
  { value: 'two-spirit', label: 'Two-Spirit', emoji: '🪶' },
  { value: 'custom', label: 'Prefer to self-describe', emoji: '✏️' },
];

export function GenderIdentityScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [selected, setSelected] = useState<GenderType[]>(onboarding.gender);
  const [customGender, setCustomGender] = useState(onboarding.customGender);

  const handleToggle = (gender: GenderType) => {
    if (gender === 'custom') {
      setSelected((prev) =>
        prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev.filter((g) => g !== 'custom'), gender]
      );
    } else {
      setSelected((prev) =>
        prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
      );
    }
  };

  const handleNext = () => {
    updateOnboarding('gender', selected);
    updateOnboarding('customGender', customGender);
    setOnboardingStep('orientation');
  };

  const isValid = selected.length > 0 && (selected.includes('custom') ? customGender.length > 0 : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender/20 via-background to-peach/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="px-3 py-1">Step 1 of 9</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
              What's your{' '}
              <span className="text-gradient-rainbow">gender identity</span>?
            </h1>
            <p className="text-muted-foreground">
              Choose all that apply. You can update this anytime.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {genderOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selected.includes(option.value)
                      ? 'gradient-rainbow-border border-0 shadow-lg'
                      : 'border-2 hover:border-primary/50'
                  }`}
                  onClick={() => handleToggle(option.value)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                    {selected.includes(option.value) && (
                      <Check className="w-5 h-5 ml-auto text-primary" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {selected.includes('custom') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Input
                placeholder="Enter your gender identity..."
                value={customGender}
                onChange={(e) => setCustomGender(e.target.value)}
                className="text-center"
              />
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('welcome')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              disabled={!isValid}
              onClick={handleNext}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Sexual Orientation Screen
const orientationOptions: { value: OrientationType; label: string; emoji: string; gradient: string }[] = [
  { value: 'lesbian', label: 'Lesbian', emoji: '👩‍❤️‍👩', gradient: 'from-pink-400 to-orange-400' },
  { value: 'gay', label: 'Gay', emoji: '🏳️‍🌈', gradient: 'from-violet-400 to-sky-400' },
  { value: 'bisexual', label: 'Bisexual', emoji: '💜', gradient: 'from-pink-400 to-violet-400' },
  { value: 'pansexual', label: 'Pansexual', emoji: '💛', gradient: 'from-pink-400 to-cyan-400' },
  { value: 'queer', label: 'Queer', emoji: '🌈', gradient: 'from-violet-400 to-pink-400' },
  { value: 'asexual', label: 'Asexual', emoji: '♠️', gradient: 'from-gray-600 to-gray-800' },
  { value: 'aromantic', label: 'Aromantic', emoji: '💚', gradient: 'from-green-400 to-emerald-600' },
  { value: 'straight', label: 'Straight', emoji: '💙', gradient: 'from-sky-400 to-blue-600' },
  { value: 'questioning', label: 'Questioning', emoji: '❓', gradient: 'from-purple-400 to-pink-400' },
  { value: 'custom', label: 'Something else', emoji: '✨', gradient: 'from-amber-400 to-orange-400' },
];

export function SexualOrientationScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [selected, setSelected] = useState<OrientationType[]>(onboarding.orientation);
  const [customOrientation, setCustomOrientation] = useState(onboarding.customOrientation);

  const handleToggle = (orientation: OrientationType) => {
    if (orientation === 'custom') {
      setSelected((prev) =>
        prev.includes(orientation) ? prev.filter((o) => o !== orientation) : [...prev.filter((o) => o !== 'custom'), orientation]
      );
    } else {
      setSelected((prev) =>
        prev.includes(orientation) ? prev.filter((o) => o !== orientation) : [...prev, orientation]
      );
    }
  };

  const handleNext = () => {
    updateOnboarding('orientation', selected);
    updateOnboarding('customOrientation', customOrientation);
    setOnboardingStep('pronouns');
  };

  const isValid = selected.length > 0 && (selected.includes('custom') ? customOrientation.length > 0 : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-background to-pink-100 dark:from-violet-950/20 dark:via-background dark:to-pink-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 2 of 9</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Who are you{' '}
              <span className="text-gradient-rainbow">attracted to</span>?
            </h1>
            <p className="text-muted-foreground">
              Select all that apply. This helps us show you relevant people.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {orientationOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selected.includes(option.value)
                      ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg`
                      : 'border-2 hover:border-primary/50'
                  }`}
                  onClick={() => handleToggle(option.value)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {selected.includes('custom') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <Input
                placeholder="Enter your orientation..."
                value={customOrientation}
                onChange={(e) => setCustomOrientation(e.target.value)}
                className="text-center"
              />
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('gender')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              disabled={!isValid}
              onClick={handleNext}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Pronouns Screen
const pronounOptions: { value: PronounType; label: string }[] = [
  { value: 'she/her', label: 'She/Her' },
  { value: 'he/him', label: 'He/Him' },
  { value: 'they/them', label: 'They/Them' },
  { value: 'ze/zir', label: 'Ze/Zir' },
  { value: 'xe/xem', label: 'Xe/Xem' },
  { value: 'any pronouns', label: 'Any Pronouns' },
  { value: 'ask me', label: 'Ask Me' },
  { value: 'custom', label: 'Custom' },
];

export function PronounsScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [selected, setSelected] = useState<PronounType[]>(onboarding.pronouns);
  const [customPronouns, setCustomPronouns] = useState(onboarding.customPronouns);
  const [showInfo, setShowInfo] = useState(false);

  const handleToggle = (pronoun: PronounType) => {
    setSelected((prev) =>
      prev.includes(pronoun) ? prev.filter((p) => p !== pronoun) : [pronoun]
    );
  };

  const handleNext = () => {
    updateOnboarding('pronouns', selected);
    updateOnboarding('customPronouns', customPronouns);
    setOnboardingStep('age');
  };

  const isValid = selected.length > 0 && (selected.includes('custom') ? customPronouns.length > 0 : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-background to-violet-100 dark:from-sky-950/20 dark:via-background dark:to-violet-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 3 of 9</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
              What are your{' '}
              <span className="text-gradient-rainbow">pronouns</span>?
            </h1>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto"
            >
              <Info className="w-4 h-4" />
              <span className="text-sm">What are pronouns?</span>
            </button>
          </div>

          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground">
                  Pronouns are words we use to refer to people when not using their name. 
                  Sharing your pronouns helps others address you correctly and creates an 
                  inclusive environment for everyone.
                </p>
              </Card>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {pronounOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selected.includes(option.value) ? 'default' : 'outline'}
                  className={`px-4 py-2 text-base cursor-pointer transition-all duration-200 ${
                    selected.includes(option.value)
                      ? 'gradient-rainbow text-white border-0'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleToggle(option.value)}
                >
                  {option.label}
                </Badge>
              </motion.div>
            ))}
          </div>

          {selected.includes('custom') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <Input
                placeholder="Enter your pronouns (e.g., ey/em)..."
                value={customPronouns}
                onChange={(e) => setCustomPronouns(e.target.value)}
                className="text-center"
              />
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('orientation')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              disabled={!isValid}
              onClick={handleNext}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Age Verification Screen
export function AgeVerificationScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [birthDate, setBirthDate] = useState(
    onboarding.dateOfBirth
      ? new Date(onboarding.dateOfBirth).toISOString().split('T')[0]
      : ''
  );
  const [error, setError] = useState('');

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleNext = () => {
    const age = calculateAge(new Date(birthDate));
    if (age < 18) {
      setError('You must be at least 18 years old to use Konect.');
      return;
    }
    updateOnboarding('dateOfBirth', new Date(birthDate));
    setOnboardingStep('consent');
  };

  const isValid = birthDate && calculateAge(new Date(birthDate)) >= 18;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-background to-purple-200 dark:from-violet-950/30 dark:via-background dark:to-purple-950/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-xl border-0 bg-card/80 backdrop-blur">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="secondary" className="px-3 py-1 mb-4">Step 4 of 9</Badge>
              <h1 className="text-2xl font-bold font-display mb-3">
                Verify Your Age
              </h1>
              <p className="text-muted-foreground">
                Konect is for adults 18+. Your date of birth is kept private.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="birthdate" className="text-base mb-2 block">
                  Date of Birth
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setError('');
                  }}
                  className="text-center text-lg py-3"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setOnboardingStep('pronouns')}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                className="flex-1 gradient-lavender-peach text-white"
                disabled={!isValid}
                onClick={handleNext}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// 18+ Consent Screen
export function ConsentScreen() {
  const { updateOnboarding, setOnboardingStep } = useAppStore();
  const [consent, setConsent] = useState(false);

  const handleNext = () => {
    updateOnboarding('consentGiven', true);
    setOnboardingStep('voice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-background to-zinc-100 dark:from-slate-950/30 dark:via-background dark:to-zinc-950/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-xl border-0 bg-card/80 backdrop-blur">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="px-3 py-1 mb-4">Step 5 of 9</Badge>
              <h1 className="text-2xl font-bold font-display mb-3">
                Content Notice
              </h1>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-muted-foreground text-sm">
                Konect may include conversations about mature topics including:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  Relationships and dating
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  LGBTQ+ topics
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  Personal experiences
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Meetups with new people
                </li>
              </ul>
              <div className="pt-4 border-t">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    className="mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    I understand and consent to viewing mature content. I agree to follow 
                    community guidelines and treat others with respect.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setOnboardingStep('age')}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                className="flex-1 gradient-lavender-peach text-white"
                disabled={!consent}
                onClick={handleNext}
              >
                I Understand
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Voice Note Screen
export function VoiceNoteScreen() {
  const { updateOnboarding, setOnboardingStep } = useAppStore();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording for demo
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 15) {
            clearInterval(interval);
            setIsRecording(false);
            setHasRecorded(true);
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      if (recordingTime >= 3) {
        setHasRecorded(true);
      }
    }
  };

  const handleNext = () => {
    updateOnboarding('voiceNoteUrl', 'demo-voice-note.mp3');
    setOnboardingStep('photos');
  };

  const handleSkip = () => {
    updateOnboarding('voiceNoteUrl', null);
    setOnboardingStep('photos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-background to-pink-100 dark:from-rose-950/20 dark:via-background dark:to-pink-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 6 of 9</Badge>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Record a{' '}
              <span className="text-gradient-rainbow">Voice Intro</span>
            </h1>
            <p className="text-muted-foreground">
              Introduce yourself in up to 15 seconds. Voice notes are the first message method on Konect.
            </p>
          </div>

          <Card className="p-8 shadow-xl border-0 bg-card/80 backdrop-blur mb-6">
            <div className="flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 animate-pulse'
                    : hasRecorded
                    ? 'bg-emerald-500'
                    : 'gradient-lavender-peach'
                }`}
              >
                <Mic className={`w-10 h-10 text-white ${isRecording ? 'animate-bounce' : ''}`} />
              </motion.button>

              {isRecording && (
                <div className="mt-4 text-center">
                  <div className="text-2xl font-mono text-red-500">{recordingTime}s / 15s</div>
                  <p className="text-sm text-muted-foreground mt-1">Tap to stop</p>
                </div>
              )}

              {hasRecorded && !isRecording && (
                <div className="mt-4 text-center">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Check className="w-5 h-5" />
                    <span>Voice note recorded!</span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setHasRecorded(false);
                      setRecordingTime(0);
                    }}
                  >
                    Re-record
                  </Button>
                </div>
              )}

              {!isRecording && !hasRecorded && (
                <p className="mt-4 text-sm text-muted-foreground">Tap to start recording</p>
              )}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('consent')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              disabled={!hasRecorded}
              onClick={handleNext}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Photos Screen
export function PhotosScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [photos, setPhotos] = useState<string[]>(onboarding.photos);

  const handleAddPhoto = () => {
    if (photos.length < 6) {
      // Simulate adding a photo
      const newPhotos = [...photos, `/placeholder-photo-${photos.length + 1}.jpg`];
      setPhotos(newPhotos);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    updateOnboarding('photos', photos);
    setOnboardingStep('intent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-background to-orange-100 dark:from-amber-950/20 dark:via-background dark:to-orange-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 7 of 9</Badge>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Add Your{' '}
              <span className="text-gradient-rainbow">Photos</span>
            </h1>
            <p className="text-muted-foreground">
              Add up to 6 photos. All photos are reviewed for safety.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-2xl bg-muted relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            ))}
            {photos.length < 6 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddPhoto}
                className="aspect-square rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Plus className="w-8 h-8 text-muted-foreground" />
              </motion.button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('voice')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              onClick={handleNext}
            >
              {photos.length > 0 ? 'Continue' : 'Skip for Now'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Intent Selection Screen
const intentOptions: { value: IntentType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'friends',
    label: 'Friends Only',
    description: 'Looking for platonic connections and friendships',
    icon: <Users className="w-6 h-6" />,
  },
  {
    value: 'community',
    label: 'Community',
    description: 'Want to build and join friend groups',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    value: 'dating',
    label: 'Dating',
    description: 'Open to romantic connections if they develop',
    icon: <Heart className="w-6 h-6" />,
  },
];

export function IntentScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep } = useAppStore();
  const [selected, setSelected] = useState<IntentType | null>(onboarding.intent);

  const handleNext = () => {
    if (selected) {
      updateOnboarding('intent', selected);
      setOnboardingStep('privacy');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-background to-cyan-100 dark:from-teal-950/20 dark:via-background dark:to-cyan-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 8 of 9</Badge>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
              What are you{' '}
              <span className="text-gradient-rainbow">looking for</span>?
            </h1>
            <p className="text-muted-foreground">
              This helps us match you with like-minded people.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {intentOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selected === option.value
                      ? 'gradient-rainbow-border border-0 shadow-lg'
                      : 'border-2 hover:border-primary/50'
                  }`}
                  onClick={() => setSelected(option.value)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selected === option.value
                        ? 'bg-white/20'
                        : 'bg-primary/10'
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                    {selected === option.value && (
                      <Check className="w-5 h-5 ml-auto" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('photos')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              disabled={!selected}
              onClick={handleNext}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Privacy Settings Screen
export function PrivacyScreen() {
  const { onboarding, updateOnboarding, setOnboardingStep, completeOnboarding } = useAppStore();
  const [incognito, setIncognito] = useState(onboarding.incognito);
  const [disappearingMode, setDisappearingMode] = useState(onboarding.disappearingMode);

  const handleComplete = () => {
    updateOnboarding('incognito', incognito);
    updateOnboarding('disappearingMode', disappearingMode);
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-background to-zinc-100 dark:from-slate-950/20 dark:via-background dark:to-zinc-950/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="px-3 py-1 mb-4">Step 9 of 9</Badge>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Privacy{' '}
              <span className="text-gradient-rainbow">Settings</span>
            </h1>
            <p className="text-muted-foreground">
              Optional privacy controls to keep you safe
            </p>
          </div>

          <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur mb-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <EyeOff className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Incognito Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Hide profile from certain groups
                  </div>
                </div>
              </div>
              <Switch
                checked={incognito}
                onCheckedChange={setIncognito}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Disappearing Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Auto-hide profile after 15 min inactivity
                  </div>
                </div>
              </div>
              <Switch
                checked={disappearingMode}
                onCheckedChange={setDisappearingMode}
              />
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setOnboardingStep('intent')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 gradient-lavender-peach text-white"
              onClick={handleComplete}
            >
              Complete Setup
              <Check className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
