"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, Calendar, Plus, Mic, Zap, Shield, ChevronRight, ChevronLeft, Info, Search, Map } from 'lucide-react';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function OnboardingPage() {
  const router = useRouter();
  const { themePreference, setThemePreference, hasCompletedOnboarding, setHasCompletedOnboarding } = useAppStore();
  const isLGBTQ = themePreference === 'lgbtq';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    genders: [] as string[],
    pronouns: [] as string[],
    orientation: [] as string[],
    intent: '',
    photos: [] as string[],
    isRecording: false,
    hasVoiceNote: false,
    distance: [10],
    ageRange: [18, 35],
    showMe: ['Everyone'],
    incognito: false,
    blurPhotos: false,
    disappearing: false
  });

  // Theme Persistence
  const toggleTheme = () => {
    const newTheme = isLGBTQ ? 'neutral' : 'lgbtq';
    setThemePreference(newTheme);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const progress = (step / 3) * 100;

  const handleComplete = () => {
    // In a real app, save to Supabase/Firebase here
    setHasCompletedOnboarding(true);
    router.push('/discover');
  };

  const identityOptions = [
    "Woman", "Man", "Non-binary", "Trans Woman", "Trans Man", "Genderqueer", "Agender"
  ];

  const pronounOptions = [
    "she/her", "he/him", "they/them", "ze/zir", "any", "ask me"
  ];

  const orientationOptions = [
    "Lesbian", "Gay", "Bisexual", "Pansexual", "Queer", "Asexual", "Straight", "Questioning"
  ];

  const intentOptions = [
    { id: 'friends', label: 'Friends Only', desc: 'Find your platonic circle' },
    { id: 'community', label: 'Community', desc: 'Join local groups & events' },
    { id: 'dating', label: 'Dating', desc: 'Find a romantic connection' }
  ];

  return (
    <div className={`min-h-screen ${isLGBTQ ? 'bg-[#1e1436] text-white' : 'bg-[#fffbf7] text-[#4a3427]'} transition-colors duration-1000 relative overflow-hidden flex flex-col`}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {isLGBTQ ? (
          <>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[120px]" 
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px]" 
            />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#fce7d2]/40 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#fae0c5]/30 blur-[100px]" />
          </>
        )}
      </div>

      {/* Persistent Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isLGBTQ ? 'bg-white/5 border-white/10' : 'bg-white/50 border-[#4a3427]/5'}`}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 shadow-md ${isLGBTQ ? 'gradient-rainbow' : 'bg-[#d97706]'}`}>
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-black tracking-tighter text-lg uppercase">KONECT</span>
          </Link>
          
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 border-2 ${
              isLGBTQ 
                ? 'bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]'
            }`}
          >
            <span className="text-xs font-black uppercase tracking-widest">{isLGBTQ ? 'PRIDE ON' : 'NEUTRAL'}</span>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isLGBTQ ? 'bg-white shadow-[0_0_10px_white]' : 'bg-[#d97706]'}`} />
          </button>
        </div>
        <Progress value={progress} className={`h-1.5 rounded-none transition-all duration-1000 ${isLGBTQ ? '[&>div]:gradient-rainbow' : '[&>div]:bg-[#d97706]'}`} />
      </header>

      <main className="flex-1 relative z-10 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-3">
                  <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    {isLGBTQ ? "So glad you're here." : "Hi there! Let's connect."}
                  </h1>
                  <p className={`text-sm font-bold uppercase tracking-[0.2em] ${isLGBTQ ? 'text-white/60' : 'text-[#4a3427]/60'}`}>
                    This is your handshake with the community. Let it be authentic.
                  </p>
                </div>

                <div className={`p-8 md:p-12 rounded-[3.5rem] border-2 shadow-2xl ${isLGBTQ ? 'bg-white/10 border-white/20 backdrop-blur-2xl' : 'bg-white border-[#4a3427]/10'}`}>
                  <div className="space-y-12">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 opacity-70">
                          <User className="w-3.5 h-3.5" /> Your Name
                        </label>
                        <Input 
                          placeholder="Your name or nickname"
                          className={`h-14 rounded-2xl border-2 font-bold px-6 focus-visible:ring-0 ${isLGBTQ ? 'bg-white/10 border-white/10 focus:border-white/40' : 'border-[#4a3427]/10 focus:border-[#d97706]/40'}`}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 opacity-70">
                          <Calendar className="w-3.5 h-3.5" /> Age
                        </label>
                        <Input 
                          type="number"
                          placeholder="Must be 18+"
                          className={`h-14 rounded-2xl border-2 font-bold px-6 focus-visible:ring-0 ${isLGBTQ ? 'bg-white/10 border-white/10 focus:border-white/40' : 'border-[#4a3427]/10 focus:border-[#d97706]/40'}`}
                          value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Gender Identity */}
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">How do you identify? (Select all)</label>
                      <div className="flex flex-wrap gap-3">
                        {identityOptions.map(id => (
                          <button
                            key={id}
                            onClick={() => {
                              const newGenders = formData.genders.includes(id) 
                                ? formData.genders.filter(g => g !== id)
                                : [...formData.genders, id];
                              setFormData({...formData, genders: newGenders});
                            }}
                            className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                              formData.genders.includes(id)
                                ? (isLGBTQ ? 'gradient-rainbow border-transparent shadow-[0_5px_15px_rgba(168,85,247,0.3)]' : 'bg-[#d97706] border-[#d97706] text-white')
                                : (isLGBTQ ? 'bg-white/5 border-white/10 text-white/70 hover:border-white/30' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]/70 hover:border-[#d97706]/30')
                            }`}
                          >
                            {id}
                          </button>
                        ))}
                        <button
                          onClick={() => setFormData({...formData, genders: formData.genders.includes('Self-describe') ? formData.genders.filter(g => g !== 'Self-describe') : [...formData.genders, 'Self-describe']})}
                          className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                            formData.genders.includes('Self-describe')
                              ? (isLGBTQ ? 'gradient-rainbow border-transparent' : 'bg-[#d97706] border-[#d97706] text-white')
                              : (isLGBTQ ? 'bg-white/5 border-white/10 text-white/70' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]/70')
                          }`}
                        >
                          Self-describe
                        </button>
                      </div>
                      <AnimatePresence>
                        {formData.genders.includes('Self-describe') && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                            <Input placeholder="How would you describe your identity?" className={`h-12 rounded-xl mt-2 border-2 ${isLGBTQ ? 'bg-white/5 border-white/10 text-white' : 'border-[#4a3427]/10'}`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pronouns */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">What pronouns do you use?</label>
                        <div className="group relative">
                          <Info className="w-3.5 h-3.5 opacity-40 cursor-help" />
                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl text-[10px] font-bold leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-50 ${isLGBTQ ? 'bg-white text-[#1e1436]' : 'bg-[#4a3427] text-white'}`}>
                            Sharing pronouns helps everyone in the community feel seen and respected.
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {pronounOptions.map(p => (
                          <button
                            key={p}
                            onClick={() => {
                              const newP = formData.pronouns.includes(p) 
                                ? formData.pronouns.filter(item => item !== p)
                                : [...formData.pronouns, p];
                              setFormData({...formData, pronouns: newP});
                            }}
                            className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                              formData.pronouns.includes(p)
                                ? (isLGBTQ ? 'gradient-rainbow border-transparent' : 'bg-[#d97706] border-[#d97706] text-white')
                                : (isLGBTQ ? 'bg-white/5 border-white/10 text-white/70' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]/70')
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sexual Orientation */}
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Who are you attracted to? (Optional)</label>
                      <div className="flex flex-wrap gap-3">
                        {orientationOptions.map(o => (
                          <button
                            key={o}
                            onClick={() => {
                              const newO = formData.orientation.includes(o) 
                                ? formData.orientation.filter(item => item !== o)
                                : [...formData.orientation, o];
                              setFormData({...formData, orientation: newO});
                            }}
                            className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                              formData.orientation.includes(o)
                                ? (isLGBTQ ? 'gradient-rainbow border-transparent' : 'bg-[#d97706] border-[#d97706] text-white')
                                : (isLGBTQ ? 'bg-white/5 border-white/10 text-white/70' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]/70')
                            }`}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Intent */}
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">What are you here for?</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {intentOptions.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setFormData({...formData, intent: opt.id})}
                            className={`p-5 rounded-2xl text-left transition-all duration-300 border-2 ${
                              formData.intent === opt.id
                                ? (isLGBTQ ? 'gradient-rainbow border-transparent shadow-[0_10px_20px_rgba(168,85,247,0.3)] scale-[1.02]' : 'bg-[#d97706] border-[#d97706] text-white shadow-lg')
                                : (isLGBTQ ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427] hover:bg-[#d97706]/5')
                            }`}
                          >
                            <h4 className="text-xs font-black uppercase tracking-tighter italic">{opt.label}</h4>
                            <p className={`text-[9px] font-bold opacity-60 mt-1 uppercase leading-tight ${formData.intent === opt.id && !isLGBTQ ? 'text-white' : ''}`}>{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={nextStep}
                      disabled={!formData.name || !formData.age || formData.genders.length === 0 || !formData.intent}
                      className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-xl group ${
                        isLGBTQ 
                          ? 'gradient-rainbow shadow-[0_15px_40px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.5)] hover:scale-[1.02]' 
                          : 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-[#d97706]/20 hover:scale-[1.02]'
                      }`}
                    >
                      Continue <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-3">
                  <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    {isLGBTQ ? "Let your colors shine." : "Visual & Audio Presence."}
                  </h1>
                  <p className={`text-sm font-bold uppercase tracking-[0.2em] ${isLGBTQ ? 'text-white/60' : 'text-[#4a3427]/60'}`}>
                    Photos and voice notes bring your profile to life.
                  </p>
                </div>

                <div className={`p-8 md:p-12 rounded-[3.5rem] border-2 shadow-2xl ${isLGBTQ ? 'bg-white/10 border-white/20 backdrop-blur-2xl' : 'bg-white border-[#4a3427]/10'}`}>
                  <div className="space-y-12">
                    {/* Photo Grid */}
                    <div className="space-y-5 text-center sm:text-left">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Add your vibe (First one is main)</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <button 
                            key={i} 
                            onClick={() => {
                              if (!formData.photos.includes(i.toString())) {
                                setFormData({...formData, photos: [...formData.photos, i.toString()]});
                              }
                            }}
                            className={`aspect-square rounded-[1.5rem] border-2 border-dashed flex items-center justify-center transition-all duration-300 relative group overflow-hidden ${
                              formData.photos.includes(i.toString())
                                ? (isLGBTQ ? 'border-purple-400/50 bg-white/5' : 'border-[#d97706]/30 bg-[#4a3427]/5')
                                : (isLGBTQ ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-[#4a3427]/10 hover:border-[#d97706]/20 hover:bg-[#d97706]/5')
                            }`}
                          >
                            {formData.photos.includes(i.toString()) ? (
                              <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">🖼️</div>
                            ) : (
                              <Plus className={`w-6 h-6 transition-transform group-hover:rotate-90 ${isLGBTQ ? 'text-white/20' : 'text-[#4a3427]/20'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Voice Note Recorder */}
                    <Card className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center text-center space-y-6 transition-all duration-500 overflow-hidden relative ${
                      isLGBTQ ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'bg-[#fffbf7] border-[#4a3427]/5 hover:border-[#d97706]/20'
                    }`}>
                      {formData.isRecording && (
                        <motion.div 
                          className="absolute inset-0 bg-red-500/10" 
                          animate={{ opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 relative ${
                        formData.isRecording ? 'bg-red-500 scale-110 shadow-red-500/40' : (isLGBTQ ? 'bg-white/10 text-white' : 'bg-[#d97706]/10 text-[#d97706]')
                      }`}>
                        <Mic className={`w-10 h-10 ${formData.isRecording ? 'text-white animate-pulse' : ''}`} />
                        {formData.isRecording && (
                          <motion.div 
                            className="absolute -inset-2 rounded-full border-2 border-red-500"
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>

                      <div className="space-y-3 relative z-10">
                        <h3 className="text-xl font-black tracking-tighter uppercase italic">
                          {formData.isRecording ? "🔴 Recording... 0:15" : "15-Second Intro"}
                        </h3>
                        <p className={`text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-[250px] ${isLGBTQ ? 'text-white/60' : 'text-[#4a3427]/60'}`}>
                          {formData.hasVoiceNote 
                            ? "Voice is active! You sound amazing." 
                            : "Say hi, share your energy! This is the first thing people hear."}
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          if (formData.isRecording) {
                            setFormData({...formData, isRecording: false, hasVoiceNote: true});
                          } else {
                            setFormData({...formData, isRecording: true});
                          }
                        }}
                        className={`h-16 px-12 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-xl ${
                          formData.isRecording 
                            ? 'bg-red-500 hover:bg-red-600 text-white scale-105' 
                            : (isLGBTQ ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#4a3427]/5 text-[#4a3427] hover:bg-[#4a3427]/10')
                        }`}
                      >
                        {formData.isRecording ? "Stop & Save" : (formData.hasVoiceNote ? "Re-record Voice" : "Start Recording")}
                      </Button>
                    </Card>

                    <div className="flex gap-4">
                      <Button onClick={prevStep} variant="outline" className={`h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] flex-1 ${isLGBTQ ? 'border-white/10 hover:bg-white/10' : 'border-[#4a3427]/10'}`}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={formData.photos.length === 0 || !formData.hasVoiceNote}
                        className={`h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] flex-[2] transition-all duration-500 shadow-xl ${
                          isLGBTQ ? 'gradient-rainbow shadow-[0_15px_40px_rgba(168,85,247,0.4)]' : 'bg-[#d97706] text-white shadow-[#d97706]/20'
                        }`}
                      >
                        Final Step <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-3">
                  <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    {isLGBTQ ? "Set your vibe." : "Discovery & Privacy."}
                  </h1>
                  <p className={`text-sm font-bold uppercase tracking-[0.2em] ${isLGBTQ ? 'text-white/60' : 'text-[#4a3427]/60'}`}>
                    Fine-tune who you see and how you connect.
                  </p>
                </div>

                <div className={`p-8 md:p-12 rounded-[3.5rem] border-2 shadow-2xl ${isLGBTQ ? 'bg-white/10 border-white/20 backdrop-blur-2xl' : 'bg-white border-[#4a3427]/10'}`}>
                  <div className="space-y-12">
                    {/* Show Me Multi-select */}
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Who do you want to meet?</label>
                      <div className="flex flex-wrap gap-3">
                        {["Women", "Men", "Non-binary", "Everyone"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              const newOpts = formData.showMe.includes(opt) 
                                ? formData.showMe.filter(o => o !== opt)
                                : [...formData.showMe, opt];
                              setFormData({...formData, showMe: newOpts});
                            }}
                            className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                              formData.showMe.includes(opt)
                                ? (isLGBTQ ? 'gradient-rainbow border-transparent shadow-[0_5px_15px_rgba(168,85,247,0.3)]' : 'bg-[#4a3427] border-[#4a3427] text-white')
                                : (isLGBTQ ? 'bg-white/5 border-white/10 text-white/70 hover:border-white/30' : 'bg-[#4a3427]/5 border-[#4a3427]/10 text-[#4a3427]/70 hover:border-[#d97706]/30')
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sliders */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 flex items-center gap-2">
                             <Map className="w-3" /> Max Distance
                          </label>
                          <span className="text-xs font-black">{formData.distance} mi</span>
                        </div>
                        <Slider 
                          defaultValue={formData.distance}
                          max={100}
                          step={5}
                          onValueChange={(val) => setFormData({...formData, distance: val})}
                          className={`${isLGBTQ ? '[&>[role=slider]]:bg-white' : '[&>[role=slider]]:bg-[#d97706]'}`}
                        />
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 flex items-center gap-2">
                             <User className="w-3" /> Age Range
                          </label>
                          <span className="text-xs font-black">{formData.ageRange[0]}-{formData.ageRange[1]}</span>
                        </div>
                        <Slider 
                          defaultValue={formData.ageRange}
                          min={18}
                          max={80}
                          step={1}
                          onValueChange={(val) => setFormData({...formData, ageRange: val})}
                          className={`${isLGBTQ ? '[&>[role=slider]]:bg-white' : '[&>[role=slider]]:bg-[#d97706]'}`}
                        />
                      </div>
                    </div>

                    {/* Safety Toggles */}
                    <div className="space-y-6 border-t pt-10 border-[#4a3427]/5">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-6 flex items-center gap-2">
                         <Shield className="w-3.5 h-3.5" /> Safety & Privacy
                      </h3>
                      
                      <div className="space-y-8">
                        {[
                          { id: 'incognito', label: 'Incognito Mode', desc: 'Hide my profile from certain groups', tooltip: 'Your profile won\'t be shown to users you haven\'t expressed interest in. You can change this anytime.', state: formData.incognito },
                          { id: 'blurPhotos', label: 'Photo Blur', desc: 'Blur my photos until we match', tooltip: 'Your photos will appear blurred to new users until you both like each other. Adds an extra layer of privacy.', state: formData.blurPhotos },
                          { id: 'disappearing', label: 'Disappearing Mode', desc: 'Auto-hide after 15m of inactivity', tooltip: 'For extra privacy when you\'re not actively using the app.', state: formData.disappearing },
                        ].map((item) => (
                          <div key={item.id} className="flex items-start justify-between group gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black uppercase tracking-tight italic group-hover:text-purple-400 transition-colors">{item.label}</h4>
                                <div className="group/tooltip relative">
                                  <Info className="w-3.5 h-3.5 opacity-40 cursor-help" />
                                  <div className={`absolute bottom-full left-0 mb-3 w-56 p-4 rounded-2xl text-[10px] font-bold leading-relaxed opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-50 ${isLGBTQ ? 'bg-white text-[#1e1436]' : 'bg-[#4a3427] text-white'}`}>
                                    {item.tooltip}
                                  </div>
                                </div>
                              </div>
                              <p className={`text-[10px] font-bold tracking-widest opacity-40 uppercase`}>{item.desc}</p>
                            </div>
                            <Switch 
                              checked={item.state} 
                              onCheckedChange={(checked) => setFormData({...formData, [item.id]: checked} as any)} 
                              className={`${isLGBTQ ? 'data-[state=checked]:bg-purple-500' : 'data-[state=checked]:bg-[#d97706]'}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={prevStep} variant="outline" className={`h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] flex-1 ${isLGBTQ ? 'border-white/10 hover:bg-white/10' : 'border-[#4a3427]/10'}`}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button 
                        onClick={handleComplete}
                        className={`h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex-[2] transition-all duration-500 shadow-2xl relative overflow-hidden group ${
                          isLGBTQ ? 'gradient-rainbow shadow-purple-500/40 hover:shadow-purple-500/60' : 'bg-[#d97706] text-white'
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">Complete Profile <Zap className={`w-4 h-4 fill-current ${isLGBTQ ? 'animate-pulse text-white' : ''}`} /></span>
                        {isLGBTQ && (
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className={`text-center mt-12 text-[9px] font-black uppercase tracking-[0.4em] opacity-40`}>
             You can update these anytime in profile settings.
          </p>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="h-12 flex items-center justify-center relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Authentic Connections © 2026</span>
      </footer>
    </div>
  );
}
