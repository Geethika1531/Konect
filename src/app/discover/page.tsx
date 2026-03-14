"use client";

import { Coffee, Zap, Sparkles, Star, Circle as CircleIcon, Tent, Shield, AlertTriangle, Heart, MessageCircle, X, Award, Play, Mic, Send, Palette, User, Music, Camera, Laptop, Activity } from 'lucide-react';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MoodType } from '@/types';

// --- DATA LAYER ---

const indianUsers = [
  {
    id: "p1",
    name: "Priya",
    age: 22,
    pronouns: "she/her",
    location: 'Indiranagar, Bengaluru',
    mood: 'coffee' as MoodType,
    moodLabel: '☕️ Getting Coffee',
    avatar: '👩🏽‍💻',
    color: '#FF6B6B',
    bio: 'UI Designer by day, Biriyani enthusiast by night. Looking for a coworking buddy!',
    interests: ['Design', 'Biriyani', 'Startups', 'Anime'],
    badges: ['Great Listener', 'Verified'],
    isLGBTQ: false,
    isNearby: true
  },
  {
    id: "a1",
    name: 'Arjun',
    age: 24,
    pronouns: "he/him",
    location: 'Koramangala, Bengaluru',
    mood: 'adventurous' as MoodType,
    moodLabel: '🏀 Playing Ball',
    avatar: '👨🏽‍🎓',
    color: '#4D96FF',
    bio: 'MTech student @ IISc. Always up for a quick 3v3 or a technical debate.',
    interests: ['Basketball', 'Coding', 'Filter Coffee'],
    badges: ['Top Player', 'Early Bird'],
    isLGBTQ: false,
    isNearby: true
  },
  {
    id: "r1",
    name: 'Riya',
    age: 21,
    pronouns: "they/them",
    location: 'HSR Layout, Bengaluru',
    mood: 'study-buddy' as MoodType,
    moodLabel: '📚 Study Session',
    avatar: '👩🏽',
    color: '#6BCB77',
    bio: 'Final year psych student. Currently obsessed with Jungian archetypes and lofi beats.',
    interests: ['Psychology', 'Music', 'Reading'],
    badges: ['Silent Walker'],
    isLGBTQ: false,
    isNearby: true
  },
  {
    id: "k1",
    name: 'Kabir',
    age: 26,
    pronouns: "he/him",
    location: 'Church Street, Bengaluru',
    mood: 'creative' as MoodType,
    moodLabel: '🎸 Busking',
    avatar: '👨🏽‍🎤',
    color: '#FFD93D',
    bio: 'Independent musician. Usually found near Blossom Book House with my guitar.',
    interests: ['Music', 'Books', 'Chai'],
    badges: ['Rising Star', 'Verified'],
    isLGBTQ: false,
    isNearby: true
  },
  {
    id: "s1",
    name: 'Sanya',
    age: 23,
    pronouns: "she/her",
    location: 'Whitefield, Bengaluru',
    mood: 'exploring' as MoodType,
    moodLabel: '🧘🏽‍♀️ Yoga Flow',
    avatar: '👩🏽‍🎨',
    color: '#92A9BD',
    bio: 'Product Manager. Trying to find a balance between sprint planning and inner peace.',
    interests: ['Yoga', 'Tech', 'Hiking'],
    badges: ['Peace Maker'],
    isLGBTQ: false,
    isNearby: true
  },
  {
    id: "q1",
    name: 'Ishaan',
    age: 25,
    pronouns: "they/them",
    location: 'MG Road, Bengaluru',
    mood: 'creative' as MoodType,
    moodLabel: '🌈 Pride Prep',
    avatar: '🧑🏽‍🎨',
    color: '#A855F7',
    bio: 'Non-binary artist & activist. Let’s talk about safe spaces and street art!',
    interests: ['Art', 'Activism', 'Fashion'],
    badges: ['Community Hero', 'Verified'],
    isLGBTQ: true,
    isNearby: true
  },
  {
    id: "q2",
    name: 'Zoya',
    age: 24,
    pronouns: "she/they",
    location: 'Ulsoor, Bengaluru',
    mood: 'exploring' as MoodType,
    moodLabel: '📷 Photo Walk',
    avatar: '👩🏻‍🎤',
    color: '#EC4899',
    bio: 'Queer photographer exploring Bangalore’s hidden corners. Love vintage lenses.',
    interests: ['Photography', 'History', 'Cats'],
    badges: ['Creative Soul'],
    isLGBTQ: true,
    isNearby: true
  },
  {
    id: "q3",
    name: 'Advait',
    age: 27,
    pronouns: "he/him",
    location: 'Jayanagar, Bengaluru',
    mood: 'chill' as MoodType,
    moodLabel: '🍷 Wine Tasting',
    avatar: '🧑🏻‍💼',
    color: '#F43F5E',
    bio: 'Marketing lead. Usually hosting queer mixers or hunting for the best red wine.',
    interests: ['Wine', 'Mixing', 'Travel'],
    badges: ['Super Host'],
    isLGBTQ: true,
    isNearby: true
  },
  {
    id: "q4",
    name: 'Meera',
    age: 22,
    pronouns: "she/her",
    location: 'Kalyan Nagar, Bengaluru',
    mood: 'exploring' as MoodType,
    moodLabel: '🎮 Gaming',
    avatar: '👩🏽‍💻',
    color: '#8B5CF6',
    bio: 'Gamer girl & dev. Looking for a duo partner for Valorant. 🏳️‍🌈',
    interests: ['Gaming', 'Code', 'K-Pop'],
    badges: ['Quick Relays'],
    isLGBTQ: true,
    isNearby: true
  }
];

const indianEvents = [
  {
    id: "e1",
    title: "Chai & Conversations ☕",
    date: "Tomorrow, 6:30 PM",
    location: "Indian Coffee House, Church Street",
    attendees: 12,
    icon: <Coffee className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-600",
    tags: ["Chat", "Chai", "New Friends"]
  },
  {
    id: "e2",
    title: "Gully Cricket Match 🏏",
    date: "This Saturday, 4 PM",
    location: "Cubbon Park Grounds",
    attendees: 8,
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600",
    tags: ["Sports", "Outdoor", "Competitive"]
  },
  {
    id: "e3",
    title: "Street Art Walk 🎨",
    date: "Sunday, 8 AM",
    location: "Lohdi Colony Market",
    attendees: 5,
    icon: <Sparkles className="w-5 h-5" />,
    color: "bg-pink-100 text-pink-600",
    tags: ["Art", "Walking", "Photography"]
  },
  {
    id: "e4",
    title: "Biriyani Night 🍛",
    date: "Next Friday, 8 PM",
    location: "Behrouz Biriyani, Koramangala",
    attendees: 15,
    icon: <Star className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-600",
    tags: ["Food", "Dinner", "Chat"]
  },
  {
    id: "e5",
    title: "Board Game Cafe 🎲",
    date: "Wednesday, 7 PM",
    location: "The Game Space, Indiranagar",
    attendees: 6,
    icon: <CircleIcon className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-600",
    tags: ["Games", "Indoor", "Chill"]
  },
  {
    id: "e6",
    title: "Sunset Trek 🌄",
    date: "Next Saturday, 5 AM",
    location: "Skandagiri, Bengaluru",
    attendees: 10,
    icon: <Tent className="w-5 h-5" />,
    color: "bg-emerald-100 text-emerald-600",
    tags: ["Trek", "Adventure", "Nature"]
  }
];

const moodChips = [
  { id: 'need-to-talk' as MoodType, label: "💬 Need to Talk" },
  { id: 'bored' as MoodType, label: "😐 Bored" },
  { id: 'exploring' as MoodType, label: "🗺️ Exploring" },
  { id: 'chill' as MoodType, label: "😌 Chill" },
  { id: 'adventurous' as MoodType, label: "🎢 Adventurous" },
  { id: 'creative' as MoodType, label: "🎨 Creative" },
  { id: 'study-buddy' as MoodType, label: "📚 Study Buddy" },
  { id: 'recovering' as MoodType, label: "💜 Recovering" },
];

// --- COMPONENTS ---

export default function DiscoverPage() {
  const { themePreference, setThemePreference, meetupCount, meetupGoal, currentMood, setCurrentMood } = useAppStore();
  const isLGBTQ = themePreference === 'lgbtq';
  
  const [selectedUser, setSelectedUser] = useState<typeof indianUsers[0] | null>(null);
  const [chatUser, setChatUser] = useState<typeof indianUsers[0] | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [voiceNoteCount, setVoiceNoteCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const toggleTheme = useCallback(() => {
    setThemePreference(isLGBTQ ? 'neutral' : 'lgbtq');
  }, [isLGBTQ, setThemePreference]);

  const filteredUsers = useMemo(() => {
    let users = indianUsers.filter(u => u.isLGBTQ === isLGBTQ);
    if (currentMood && currentMood !== 'all' as any) {
      users = users.filter((u) => u.mood === currentMood);
    }
    return users;
  }, [currentMood, isLGBTQ]);

  const meetupPercentage = (meetupCount / meetupGoal) * 100;

  const handleSayHi = (user: typeof indianUsers[0]) => {
    setChatUser(user);
    setIsProfileOpen(false);
    setIsChatOpen(true);
    setVoiceNoteCount(0);
  };

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceNoteCount(prev => prev + 1);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${isLGBTQ ? 'bg-[#1e1436] text-white' : 'bg-background'} transition-colors duration-700 relative overflow-hidden`}>
      {/* LGBTQ+ Ambient Glows - More Vibrant & Luminous */}
      {isLGBTQ && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse delay-700" />
          <div className="absolute top-[30%] right-[0%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[90px] animate-pulse delay-1000" />
        </div>
      )}

      {/* Dynamic Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b ${isLGBTQ ? 'bg-[#1e1436]/40 border-white/10' : 'bg-background/80 border-border/10'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${isLGBTQ ? 'gradient-rainbow shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'gradient-terracotta shadow-lg'} group-hover:scale-110 group-hover:rotate-3`}>
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className={`text-xl font-black tracking-tighter ${isLGBTQ ? 'text-white' : 'text-foreground'}`}>KONECT</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`group relative p-2.5 rounded-xl transition-all duration-500 overflow-hidden ${
                isLGBTQ 
                  ? 'bg-white/10 border border-white/20 text-white shadow-lg' 
                  : 'bg-primary/5 border-2 border-primary/20 text-primary'
              }`}
            >
              {isLGBTQ && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <Heart className={`w-5 h-5 relative z-10 transition-transform group-active:scale-125 ${isLGBTQ ? 'fill-current text-white' : ''}`} />
            </button>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${isLGBTQ ? 'bg-white/15 text-white border border-white/20' : 'bg-muted/20 border border-border/50 text-muted-foreground'}`}>
              SA
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-16 relative z-10">
        {/* Meetup Progress Bar */}
        <section className={`${isLGBTQ ? 'bg-white/5 backdrop-blur-xl ring-1 ring-white/10' : 'bg-muted/30'} rounded-[2.5rem] p-8 border ${isLGBTQ ? 'border-white/20' : 'border-border/10'} relative overflow-hidden group transition-all duration-500`}>
          <div className={`absolute top-0 right-0 w-64 h-64 opacity-[0.05] transition-transform duration-1000 group-hover:scale-150 rotate-45 ${isLGBTQ ? 'bg-gradient-to-br from-red-400 via-green-400 to-purple-400' : 'bg-primary'}`} />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 relative z-10">
            <div>
              <h2 className={`text-2xl font-black italic tracking-tight uppercase ${isLGBTQ ? 'text-white drop-shadow-sm' : ''}`}>Meetup Progress</h2>
              <p className={`text-sm font-bold uppercase tracking-widest mt-1 ${isLGBTQ ? 'text-white/80' : 'text-muted-foreground'}`}>
                <span className={isLGBTQ ? 'text-purple-300' : 'text-primary'}>{meetupGoal - meetupCount}</span> more connections to unlock perks
              </p>
            </div>
            <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center font-black text-xl shadow-lg border-2 ${isLGBTQ ? 'bg-white/20 text-white border-white/30' : 'bg-primary/10 text-primary border-primary/10'}`}>
              {meetupCount}/{meetupGoal}
            </div>
          </div>
          <Progress value={meetupPercentage} className={`h-4 rounded-full shadow-inner border ${isLGBTQ ? 'bg-white/10 border-white/10 [&>div]:gradient-rainbow' : 'bg-muted border-border/5 [&>div]:bg-primary'}`} />
        </section>

        {/* Mood Chips - Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-[12px] font-black uppercase tracking-[0.4em] px-1 ${isLGBTQ ? 'text-white/90 drop-shadow-sm' : 'text-muted-foreground'}`}>How's the energy?</h3>
            {currentMood && (
              <button 
                onClick={() => setCurrentMood(null)}
                className={`text-[11px] font-black uppercase tracking-widest hover:brightness-125 transition-all ${isLGBTQ ? 'text-white underline' : 'text-primary'}`}
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide no-scrollbar -mx-4 px-4 snap-x">
            {moodChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setCurrentMood(chip.id === currentMood ? null : chip.id)}
                className={`flex-none px-8 py-4 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 snap-center border-2 ${
                  currentMood === chip.id 
                    ? (isLGBTQ 
                        ? 'gradient-rainbow border-transparent text-white shadow-[0_15px_40px_rgba(168,85,247,0.4)] scale-105' 
                        : 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105')
                    : (isLGBTQ 
                        ? 'bg-white/10 border-white/20 text-white hover:border-white/40 hover:bg-white/15' 
                        : 'bg-background border-border/40 text-muted-foreground hover:border-primary/30')
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Now Feed */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded-full animate-pulse ${isLGBTQ ? 'gradient-rainbow shadow-[0_0_15px_rgba(255,255,255,0.7)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">Nearby Now</h2>
            </div>
            <Badge variant="secondary" className={`${isLGBTQ ? 'bg-white/20 border-white/30 text-white' : 'bg-muted text-muted-foreground'} text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full border shadow-sm`}>
              8 Online in HSR
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user) => (
                <motion.div
                  layout
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card 
                    className={`group cursor-pointer overflow-hidden rounded-[2.75rem] transition-all duration-500 hover:-translate-y-2 relative border-2 ${
                      isLGBTQ 
                        ? 'bg-white/10 backdrop-blur-2xl border-white/20 hover:border-white/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]' 
                        : 'bg-card border-border/10 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20'
                    }`}
                    onClick={() => {
                       setSelectedUser(user);
                       setIsProfileOpen(true);
                    }}
                  >
                    {/* LGBTQ+ Rainbow Edge - Always visible but brighter on hover */}
                    {isLGBTQ && (
                      <div className="absolute inset-x-0 top-0 h-[3px] gradient-rainbow opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}

                    <div className="p-7 h-full flex flex-col">
                      <div className="flex items-center gap-5 mb-6">
                        <div className="relative">
                          <div className={`w-16 h-16 rounded-[1.25rem] p-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isLGBTQ ? 'bg-gradient-to-br from-red-500 via-yellow-500 to-purple-500 shadow-lg' : ''}`} style={{ backgroundColor: isLGBTQ ? 'transparent' : user.color }}>
                            <div className={`w-full h-full rounded-[0.9rem] flex items-center justify-center text-4xl shadow-inner ${isLGBTQ ? 'bg-[#2a1b4d]' : 'bg-white/20'}`}>
                              {user.avatar}
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-[3px] border-card rounded-full shadow-lg" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black tracking-tight drop-shadow-sm">{user.name}, {user.age}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[11px] uppercase font-black tracking-widest ${isLGBTQ ? 'text-purple-300 drop-shadow-md' : 'text-primary'}`}>{user.moodLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-5">
                        <p className={`text-sm font-bold leading-relaxed lowercase italic line-clamp-3 ${isLGBTQ ? 'text-white/95 drop-shadow-sm' : 'text-muted-foreground/90'}`}>
                          "{user.bio}"
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {user.interests.slice(0, 3).map(interest => (
                            <Badge key={interest} variant="secondary" className={`${isLGBTQ ? 'bg-white/10 border-white/20 text-white shadow-sm' : 'bg-muted text-[10px]'} font-bold border px-3 py-1 uppercase tracking-wider rounded-xl`}>
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className={`mt-8 flex items-center justify-between border-t pt-6 pointer-events-none ${isLGBTQ ? 'border-white/10' : 'border-border/5'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isLGBTQ ? 'text-white/70' : 'text-muted-foreground/50'}`}>
                          <Palette className="w-3.5 h-3.5" />
                          {user.location.split(',')[0]}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-md ${isLGBTQ ? 'bg-white/20 text-white border border-white/30' : 'bg-primary/10 text-primary'}`}>
                          <MessageCircle className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="py-32 text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`${isLGBTQ ? 'bg-white/10 border border-white/20' : 'bg-muted'} w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl`}>
                <Heart className={`w-14 h-14 ${isLGBTQ ? 'text-white' : 'opacity-20'}`} />
              </motion.div>
              <h3 className={`text-xl font-black uppercase tracking-[0.2em] ${isLGBTQ ? 'text-white' : 'text-muted-foreground'}`}>Vibe not found</h3>
              <p className={`text-sm mt-3 font-medium ${isLGBTQ ? 'text-white/70' : 'text-muted-foreground opacity-60'}`}>Try clearing your energy filters or swapping themes!</p>
            </div>
          )}
        </section>

        {/* Quick CTA Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className={`p-10 rounded-[3.5rem] border-2 relative overflow-hidden group transition-all duration-500 ${isLGBTQ ? 'bg-white/10 border-white/20 backdrop-blur-xl hover:border-white/40 shadow-2xl shadow-purple-500/10' : 'bg-card border-border/10'}`}>
            <div className={`absolute -right-16 -bottom-16 w-64 h-64 opacity-[0.1] group-hover:scale-150 transition-transform duration-1000 rounded-full ${isLGBTQ ? 'bg-gradient-to-br from-red-400 via-green-400 to-purple-400' : 'bg-primary'}`} />
            <div className="relative z-10">
              <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 italic ${isLGBTQ ? 'text-white drop-shadow-sm' : ''}`}>Found a Cool Spot?</h3>
              <p className={`text-sm mb-10 font-bold leading-relaxed max-w-xs ${isLGBTQ ? 'text-white/90 drop-shadow-sm' : 'text-muted-foreground'}`}>Create a micro-event and let people near you join in real-time.</p>
              <Button className={`rounded-[1.5rem] font-black px-12 h-16 uppercase tracking-widest text-[12px] shadow-2xl transition-all hover:scale-105 active:scale-95 ${isLGBTQ ? 'gradient-rainbow shadow-purple-500/50' : 'bg-primary shadow-primary/20'} text-white`}>
                Create Micro-Event
              </Button>
            </div>
          </div>
          <div className={`p-10 rounded-[3.5rem] border-2 relative overflow-hidden group transition-all duration-500 ${isLGBTQ ? 'bg-white/10 border-white/20 backdrop-blur-xl hover:border-white/40 shadow-2xl shadow-blue-500/10' : 'bg-muted/20 border-border/10'}`}>
             <div className="absolute top-12 right-12 animate-pulse text-muted-foreground/10 group-hover:text-primary/20 transition-colors">
                <CircleIcon className="w-40 h-40" />
             </div>
             <div className="relative z-10">
              <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 italic ${isLGBTQ ? 'text-white drop-shadow-sm' : ''}`}>Find Your Circles</h3>
              <p className={`text-sm mb-10 font-bold leading-relaxed max-w-xs ${isLGBTQ ? 'text-white/90 drop-shadow-sm' : 'text-muted-foreground'}`}>Join interest-based groups in Bengaluru and meet like-minded people.</p>
              <Button variant="outline" className={`rounded-[1.5rem] border-2 font-black px-12 h-16 uppercase tracking-widest text-[12px] transition-all shadow-xl ${isLGBTQ ? 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/60' : 'hover:bg-primary/5'}`}>
                Explore Circles
              </Button>
            </div>
          </div>
        </section>

        {/* Events Near You Section */}
        <section className="pt-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Events Near You</h2>
            <Link href="/events" className={`text-sm font-black uppercase tracking-widest hover:underline ${isLGBTQ ? 'text-white drop-shadow-sm decoration-2' : 'text-primary'}`}>See All Discovery</Link>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar -mx-4 px-4 snap-x">
            {indianEvents.map((event) => (
              <Card key={event.id} className={`flex-none w-80 rounded-[2.75rem] snap-center group relative overflow-hidden transition-all duration-500 border-2 ${isLGBTQ ? 'bg-white/10 backdrop-blur-2xl border-white/20 hover:border-white/40 shadow-xl' : 'bg-card border-transparent shadow-lg hover:shadow-xl'}`}>
                {isLGBTQ && (
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-30 ${event.color.includes('orange') ? 'bg-orange-400' : event.color.includes('blue') ? 'bg-blue-400' : 'bg-purple-400'}`} />
                )}
                <div className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center ${event.color} transition-all group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-xl border-2 border-white/20`}>
                      {event.icon}
                    </div>
                    <Badge variant="outline" className={`text-[11px] font-black uppercase tracking-widest rounded-full px-4 py-1.5 shadow-md ${isLGBTQ ? 'bg-white/20 text-white border-white/40' : 'border-border/50'}`}>
                      {event.attendees} Joining
                    </Badge>
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight mb-4 transition-colors ${isLGBTQ ? 'text-white group-hover:text-purple-300 drop-shadow-sm' : 'group-hover:text-primary'}`}>{event.title}</h3>
                  <div className="space-y-4 mb-8">
                    <p className={`text-[11px] font-black flex items-center gap-2.5 uppercase tracking-widest ${isLGBTQ ? 'text-white/90' : 'text-muted-foreground'}`}>
                      <Zap className={`w-4 h-4 ${isLGBTQ ? 'text-purple-300' : 'text-primary'}`} /> {event.date}
                    </p>
                    <p className={`text-[11px] font-black flex items-center gap-2.5 uppercase tracking-widest ${isLGBTQ ? 'text-white/80' : 'text-muted-foreground'}`}>
                      <div className={`w-2 h-2 rounded-full ${isLGBTQ ? 'bg-purple-400' : 'bg-muted-foreground/30'}`} /> 
                      <span className="truncate">{event.location}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {event.tags.map(tag => (
                      <span key={tag} className={`text-[10px] font-black uppercase tracking-[0.2em] shadow-sm px-2 py-0.5 rounded ${isLGBTQ ? 'bg-white/10 text-white/70' : 'text-muted-foreground/40'}`}>{tag}</span>
                    ))}
                  </div>
                  <Button className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-500 shadow-lg ${
                    isLGBTQ 
                      ? 'bg-white/20 text-white border-2 border-white/30 hover:gradient-rainbow hover:border-transparent hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)]' 
                      : 'bg-primary/5 text-primary border-2 border-primary/20 hover:bg-primary hover:text-white hover:shadow-primary/20'
                  }`}>
                    Join Meetup
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Safety Footer */}
      <footer className="py-10 bg-muted/10 border-t border-border/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <Link href="/safety" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest">
              <Shield className="w-3 h-3" /> Safety Tips
            </Link>
            <Link href="/report" className="text-[10px] font-bold text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5 uppercase tracking-widest">
              <AlertTriangle className="w-3 h-3" /> Report
            </Link>
            <Link href="/support" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest">
              <Heart className="w-3 h-3" /> 24/7 Support
            </Link>
          </div>
          <div className="flex flex-col items-center opacity-70">
            <div className={`w-10 h-10 rounded-xl mb-4 transition-all duration-500 flex items-center justify-center ${isLGBTQ ? 'gradient-rainbow' : 'gradient-terracotta'}`}>
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Konect India</p>
            <p className="text-[9px] text-muted-foreground">© 2026 • Made with 💜 for India's youth</p>
          </div>
        </div>
      </footer>

      {/* --- MODALS & PANELS --- */}

      {/* Profile Panel */}
      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent side="bottom" className="h-[90vh] sm:h-[80vh] rounded-t-3xl border-0 p-0 overflow-hidden bg-background">
          <div className="h-full flex flex-col">
            {/* Header / Hero */}
            <div className="h-48 relative shrink-0" style={{ backgroundColor: selectedUser?.color }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute -bottom-10 left-6">
                <div className="w-28 h-28 rounded-3xl bg-white p-1 shadow-2xl">
                  <div className="w-full h-full rounded-2xl flex items-center justify-center text-white font-bold text-4xl" style={{ backgroundColor: selectedUser?.color }}>
                    {selectedUser?.avatar}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-12 px-6 pb-24 overflow-y-auto pt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold">{selectedUser?.name}, {selectedUser?.age}</h2>
                  <p className="text-muted-foreground font-medium">{selectedUser?.pronouns} • {selectedUser?.location}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1">
                  {selectedUser?.moodLabel}
                </Badge>
              </div>

              <div className="mb-8 p-4 bg-muted/30 rounded-2xl border border-border/10 italic text-muted-foreground leading-relaxed">
                "{selectedUser?.bio}"
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 mb-4 px-1">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser?.interests.map(i => (
                    <Badge key={i} variant="secondary" className="px-3 py-1 bg-background border-border/50 font-semibold hover:border-primary/30 transition-colors">
                      {i}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-0">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 mb-4 px-1">Reputation</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedUser?.badges.map(b => (
                    <div key={b} className="flex items-center gap-2 px-3 py-2 bg-amber-500/5 text-amber-600 border border-amber-500/10 rounded-xl text-xs font-bold">
                      <Award className="w-4 h-4" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border/20 flex gap-3">
              <Button 
                onClick={() => handleSayHi(selectedUser!)}
                className={`flex-1 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all ${isLGBTQ ? 'gradient-rainbow-animated' : 'gradient-terracotta'} text-white`}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Say Hi to {selectedUser?.name}
              </Button>
              <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 border-primary/20">
                <Heart className="w-6 h-6 text-primary" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Side Chat Box / Bottom Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="bottom" className="h-[85vh] sm:h-full sm:w-[400px] sm:side-right p-0 border-0 bg-background flex flex-col shadow-2xl rounded-t-3xl sm:rounded-none">
          {/* Chat Header */}
          <div className="px-4 py-4 border-b border-border/40 flex items-center justify-between shrink-0 bg-card/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl p-0.5 border border-primary/20">
                <div className="w-full h-full rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: chatUser?.color }}>
                  {chatUser?.avatar}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm">{chatUser?.name}</h3>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online Now</span>
              </div>
            </div>
            {/* The default close button will handle it, but we can add a visual drag handle for bottom sheet feel */}
            <div className="sm:hidden w-12 h-1 bg-muted rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
             <div className="text-center">
                <span className="px-3 py-1 bg-muted/40 text-muted-foreground text-[10px] rounded-full font-bold uppercase tracking-widest">Start of conversation</span>
             </div>

             {/* Outgoing Message (Mock) */}
             <div className="flex justify-start">
                <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-border/20 shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-24 bg-primary/20 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-primary origin-left animate-pulse" />
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold">Voice note • 0:12</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Sent Message (Interactive Mock) */}
             <AnimatePresence>
               {[...Array(voiceNoteCount)].map((_, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-end"
                 >
                    <div className={`${isLGBTQ ? 'gradient-rainbow-animated' : 'bg-primary'} p-4 rounded-2xl rounded-tr-none max-w-[85%] text-white shadow-lg`}>
                       <div className="flex items-center gap-3">
                          <div className="space-y-1 text-right">
                            <div className="h-1 w-24 bg-white/30 rounded-full" />
                            <p className="text-[10px] text-white/70 font-bold">Voice note • 0:08</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>

             {/* Unlock System Warning */}
             {voiceNoteCount < 2 && (
               <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 text-center">
                  <div className="bg-amber-100/50 w-10 h-10 rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-3">
                    <Mic className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-amber-600 uppercase mb-1 items-center gap-2 flex justify-center">
                    Voice Only Mode
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Send <span className="text-amber-600 font-bold">{2 - voiceNoteCount} more</span> voice note{2-voiceNoteCount !== 1 ? 's' : ''} to unlock text chat. We value real voices first!
                  </p>
               </div>
             )}

             {voiceNoteCount >= 2 && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-start">
                  <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-border/20 shadow-sm">
                    <p className="text-sm font-medium">Haha that's awesome! I love dogs too. What breed?</p>
                    <p className="text-[10px] text-muted-foreground font-bold mt-2">Just now</p>
                  </div>
               </motion.div>
             )}
          </div>

          {/* Chat Input */}
          <div className="p-4 sm:pb-6 bg-background border-t border-border/40 shrink-0">
             <div className="flex items-center gap-2">
                {voiceNoteCount >= 2 ? (
                  <>
                    <Input placeholder="Type a message..." className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-2xl" />
                    <Button className={`h-12 w-12 rounded-2xl shrink-0 ${isLGBTQ ? 'gradient-rainbow-animated' : 'bg-primary'} text-white`}>
                      <Send className="w-5 h-5" />
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleRecord}
                    className={`flex-1 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                      isRecording ? 'bg-red-500 animate-pulse text-white' : (isLGBTQ ? 'gradient-rainbow-animated text-white' : 'bg-primary/5 text-primary border-2 border-primary/20')
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                        <span className="font-bold text-xs uppercase">Recording...</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-6 h-6" />
                        <span className="font-bold text-xs uppercase text-[10px]">Hold to Record</span>
                      </>
                    )}
                  </Button>
                )}
             </div>
             <p className="text-[9px] text-muted-foreground text-center mt-3 font-bold uppercase tracking-widest opacity-60 pb-safe">
                Safety First: Always meet in public places
             </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
