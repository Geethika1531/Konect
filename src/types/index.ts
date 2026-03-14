// Konect Types - Based on PRD Data Model

// Identity types
export type GenderType = 
  | 'woman'
  | 'man'
  | 'non-binary'
  | 'trans-woman'
  | 'trans-man'
  | 'genderqueer'
  | 'agender'
  | 'two-spirit'
  | 'genderfluid'
  | 'custom';

export type OrientationType =
  | 'lesbian'
  | 'gay'
  | 'bisexual'
  | 'pansexual'
  | 'queer'
  | 'asexual'
  | 'aromantic'
  | 'straight'
  | 'questioning'
  | 'custom';

export type PronounType =
  | 'she/her'
  | 'he/him'
  | 'they/them'
  | 'ze/zir'
  | 'xe/xem'
  | 'any pronouns'
  | 'ask me'
  | 'custom';

export type IntentType = 'friends' | 'community' | 'dating';

export type MoodType = 
  | 'need-to-talk'
  | 'bored'
  | 'exploring'
  | 'chill'
  | 'adventurous'
  | 'creative'
  | 'study-buddy'
  | 'recovering'
  | 'traveling';

export type ActivityType =
  | 'coffee'
  | 'food'
  | 'drinks'
  | 'outdoors'
  | 'sports'
  | 'gaming'
  | 'movies'
  | 'music'
  | 'art'
  | 'study'
  | 'workshop'
  | 'other';

// User related types
export interface IdentityTag {
  id: string;
  type: 'gender' | 'orientation';
  label: string;
  custom: boolean;
}

export interface TrustFlowerTag {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

export interface TrustFlower {
  id: string;
  giverId: string;
  receiverId: string;
  meetupId: string;
  tags: TrustFlowerTag[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earnedAt?: Date;
}

export interface Profile {
  id: string;
  userId: string;
  photos: string[];
  voiceNoteUrl?: string;
  bio?: string;
  badges: Badge[];
  trustFlowerCount: number;
  verifiedBadge: boolean;
  interests: string[];
}

export interface User {
  id: string;
  phone?: string;
  email?: string;
  age: number;
  dateOfBirth: Date;
  genderIds: string[];
  orientationIds: string[];
  pronouns: string[];
  customGender?: string;
  customOrientation?: string;
  customPronouns?: string;
  intent: IntentType;
  bio?: string;
  photos: string[];
  voiceNoteUrl?: string;
  incognito: boolean;
  disappearingMode: boolean;
  verified: boolean;
  meetupCount: number;
  trustFlowerCount: number;
  badges: Badge[];
  interests: string[];
  mood?: MoodType;
  createdAt: Date;
  updatedAt: Date;
}

// Meetup types
export type MeetupStatus = 'scheduled' | 'completed' | 'cancelled' | 'pending';

export interface Meetup {
  id: string;
  user1Id: string;
  user2Id: string;
  status: MeetupStatus;
  location: string;
  locationCoords?: { lat: number; lng: number };
  scheduledAt: Date;
  verifiedAt?: Date;
  createdAt: Date;
}

// Event types
export type MicroEventStatus = 'open' | 'full' | 'completed' | 'cancelled';

export interface MicroEvent {
  id: string;
  creatorId: string;
  title: string;
  activityType: ActivityType;
  description?: string;
  datetime: Date;
  location: string;
  locationCoords: { lat: number; lng: number };
  maxParticipants: number;
  participants: string[];
  status: MicroEventStatus;
  createdAt: Date;
}

// Circle types
export type CircleRole = 'admin' | 'member';

export interface CircleMembership {
  circleId: string;
  userId: string;
  role: CircleRole;
  joinedAt: Date;
}

export interface Circle {
  id: string;
  name: string;
  coverImage?: string;
  createdBy: string;
  members: CircleMembership[];
  createdAt: Date;
}

// Mood Card
export interface MoodCard {
  id: string;
  userId: string;
  photoUrl?: string;
  caption: string;
  mood: MoodType;
  location?: { lat: number; lng: number };
  expiresAt: Date;
  createdAt: Date;
}

// Vibe Room
export interface VibeRoom {
  id: string;
  name: string;
  mood: MoodType;
  participants: string[];
  expiresAt: Date;
  createdAt: Date;
}

// Chat types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  type: 'voice' | 'text';
  content: string;
  audioUrl?: string;
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
  voiceCount: number;
  textUnlocked: boolean;
  createdAt: Date;
}

// Report types
export type ReportReason =
  | 'homophobic'
  | 'transphobic'
  | 'racist'
  | 'harassment'
  | 'fetishization'
  | 'inappropriate-content'
  | 'fake-profile'
  | 'spam'
  | 'other';

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: ReportReason;
  details?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  resolvedAt?: Date;
  createdAt: Date;
}

// Subscription types
export type SubscriptionTier = 'free' | 'monthly' | 'lifetime';

export interface Subscription {
  userId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate?: Date;
}

// Onboarding state
export interface OnboardingState {
  step: number;
  gender: GenderType[];
  customGender: string;
  orientation: OrientationType[];
  customOrientation: string;
  pronouns: PronounType[];
  customPronouns: string;
  dateOfBirth: Date | null;
  consentGiven: boolean;
  voiceNoteUrl: string | null;
  photos: string[];
  intent: IntentType | null;
  incognito: boolean;
  disappearingMode: boolean;
}

// App view types
export type AppView =
  | 'landing'
  | 'onboarding'
  | 'map'
  | 'profile'
  | 'chat'
  | 'events'
  | 'circles'
  | 'settings'
  | 'emergency';

export type OnboardingStep = 
  | 'welcome'
  | 'gender'
  | 'orientation'
  | 'pronouns'
  | 'age'
  | 'consent'
  | 'voice'
  | 'photos'
  | 'intent'
  | 'privacy'
  | 'complete';

// Map marker types
export interface MapMarker {
  id: string;
  type: 'user' | 'event' | 'mood-card' | 'venue';
  position: { lat: number; lng: number };
  data: User | MicroEvent | MoodCard;
}

// Special mode types
export type SpecialMode = 'breakup-recovery' | 'traveler' | 'university' | null;

// Memory Journal
export interface MemoryNote {
  id: string;
  userId: string;
  aboutUserId: string;
  note: string;
  createdAt: Date;
}

// Floating Plan
export interface FloatingPlan {
  id: string;
  userId: string;
  activity: ActivityType;
  availableSlots: { start: Date; end: Date }[];
  matchedWith?: string;
  status: 'open' | 'matched' | 'completed' | 'cancelled';
  createdAt: Date;
}
