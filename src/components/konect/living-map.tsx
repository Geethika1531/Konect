'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Search,
  Filter,
  Plus,
  Users,
  Calendar,
  MessageCircle,
  Heart,
  Sparkles,
  Navigation,
  Clock,
  Coffee,
  Utensils,
  Wine,
  TreePine,
  Gamepad2,
  Film,
  Music,
  Palette,
  BookOpen,
  Building2,
  ChevronRight,
  X,
  Send,
  Mic,
  Phone,
  Shield,
  Settings,
  User,
  Bell,
  Map,
  Layers,
  Compass,
  Zap,
  Star,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore, useMeetupCount, useMeetupGoal, useSpecialMode, useCurrentMood } from '@/store';
import type { MoodType, ActivityType, MicroEvent } from '@/types';

// Mood options
const moodOptions: { value: MoodType; label: string; emoji: string; color: string }[] = [
  { value: 'need-to-talk', label: 'Need to Talk', emoji: '💬', color: 'bg-violet-500' },
  { value: 'bored', label: 'Bored', emoji: '😐', color: 'bg-gray-500' },
  { value: 'exploring', label: 'Exploring', emoji: '🗺️', color: 'bg-emerald-500' },
  { value: 'chill', label: 'Chill', emoji: '😌', color: 'bg-sky-500' },
  { value: 'adventurous', label: 'Adventurous', emoji: '🎢', color: 'bg-orange-500' },
  { value: 'creative', label: 'Creative', emoji: '🎨', color: 'bg-pink-500' },
  { value: 'study-buddy', label: 'Study Buddy', emoji: '📚', color: 'bg-amber-500' },
  { value: 'recovering', label: 'Recovering', emoji: '💜', color: 'bg-purple-500' },
];

// Activity icons
const activityIcons: Record<ActivityType, React.ReactNode> = {
  coffee: <Coffee className="w-5 h-5" />,
  food: <Utensils className="w-5 h-5" />,
  drinks: <Wine className="w-5 h-5" />,
  outdoors: <TreePine className="w-5 h-5" />,
  sports: <Zap className="w-5 h-5" />,
  gaming: <Gamepad2 className="w-5 h-5" />,
  movies: <Film className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />,
  art: <Palette className="w-5 h-5" />,
  study: <BookOpen className="w-5 h-5" />,
  workshop: <Building2 className="w-5 h-5" />,
  other: <Star className="w-5 h-5" />,
};

// Mock users for the map
const mockUsers = [
  { id: '1', name: 'Alex', age: 28, pronouns: 'they/them', mood: 'exploring', lat: 51.5074, lng: -0.1278, distance: '0.3 km', interests: ['art', 'music'], verified: true },
  { id: '2', name: 'Jordan', age: 24, pronouns: 'she/her', mood: 'chill', lat: 51.5074, lng: -0.1298, distance: '0.5 km', interests: ['coffee', 'books'], verified: true },
  { id: '3', name: 'Sam', age: 31, pronouns: 'he/him', mood: 'adventurous', lat: 51.5084, lng: -0.1268, distance: '0.7 km', interests: ['outdoors', 'sports'], verified: false },
  { id: '4', name: 'Taylor', age: 26, pronouns: 'they/them', mood: 'need-to-talk', lat: 51.5064, lng: -0.1288, distance: '0.4 km', interests: ['music', 'art'], verified: true },
  { id: '5', name: 'Morgan', age: 29, pronouns: 'she/her', mood: 'creative', lat: 51.5094, lng: -0.1258, distance: '1.2 km', interests: ['art', 'coffee'], verified: true },
];

// Mock events
const mockEvents: MicroEvent[] = [
  { id: 'e1', creatorId: '1', title: 'Coffee & Chat', activityType: 'coffee', datetime: new Date(Date.now() + 3600000), location: 'The Daily Grind', locationCoords: { lat: 51.5074, lng: -0.1278 }, maxParticipants: 4, participants: ['1', '2'], status: 'open', createdAt: new Date() },
  { id: 'e2', creatorId: '3', title: 'Board Game Night', activityType: 'gaming', datetime: new Date(Date.now() + 7200000), location: 'Thirsty Meeples', locationCoords: { lat: 51.5084, lng: -0.1268 }, maxParticipants: 6, participants: ['3', '4', '5'], status: 'open', createdAt: new Date() },
  { id: 'e3', creatorId: '2', title: 'Study Session', activityType: 'study', datetime: new Date(Date.now() + 10800000), location: 'Central Library', locationCoords: { lat: 51.5064, lng: -0.1288 }, maxParticipants: 5, participants: ['2'], status: 'open', createdAt: new Date() },
];

// Mood Card component
function MoodCardItem({ mood, caption, user }: { mood: MoodType; caption: string; user: { name: string; avatar?: string } }) {
  const moodInfo = moodOptions.find(m => m.value === mood);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-2xl shadow-md card-hover"
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="gradient-lavender-peach text-white">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.name}</div>
          <Badge variant="secondary" className="text-xs">
            {moodInfo?.emoji} {moodInfo?.label}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{caption}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <MessageCircle className="w-4 h-4 mr-1" />
          Say Hi
        </Button>
        <Button size="sm" variant="ghost">
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// User Profile Card (for map markers)
function UserProfileCard({ user, onClose }: { user: typeof mockUsers[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 bg-card rounded-2xl shadow-xl"
    >
      <button onClick={onClose} className="absolute top-2 right-2">
        <X className="w-5 h-5 text-muted-foreground" />
      </button>
      
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-14 h-14">
          <AvatarFallback className="gradient-lavender-peach text-white text-lg">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{user.name}, {user.age}</span>
            {user.verified && (
              <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600">
                <Check className="w-3 h-3 mr-1" /> Verified
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{user.pronouns}</div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        {user.interests.map((interest) => (
          <Badge key={interest} variant="secondary" className="text-xs">
            {interest}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <MapPin className="w-4 h-4" />
        <span>{user.distance} away</span>
        <Badge variant="outline" className="ml-auto">
          {moodOptions.find(m => m.value === user.mood)?.emoji} {moodOptions.find(m => m.value === user.mood)?.label}
        </Badge>
      </div>
      
      <div className="flex gap-2">
        <Button className="flex-1 gradient-lavender-peach text-white">
          <Mic className="w-4 h-4 mr-2" />
          Send Voice Note
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Create Event Modal
function CreateEventModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>('coffee');
  const [datetime, setDatetime] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState([4]);
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Create event logic
    onOpenChange(false);
    setStep(1);
    setTitle('');
    setActivityType('coffee');
    setDatetime('');
    setLocation('');
    setMaxParticipants([4]);
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Create Micro-Event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 1 && (
            <>
              <div>
                <Label className="mb-2 block">Event Title</Label>
                <Input
                  placeholder="Coffee & Chat, Board Game Night..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Activity Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(['coffee', 'food', 'gaming', 'outdoors', 'study', 'music', 'art', 'other'] as ActivityType[]).map((activity) => (
                    <button
                      key={activity}
                      onClick={() => setActivityType(activity)}
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        activityType === activity
                          ? 'gradient-lavender-peach text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {activityIcons[activity]}
                      <span className="text-xs capitalize">{activity}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label className="mb-2 block">Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Location</Label>
                <div className="relative">
                  <Input
                    placeholder="Enter venue name or address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pr-10"
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Tip: Choose a public place from our safe venue list
                </p>
              </div>
              
              <div>
                <Label className="mb-2 block">Max Participants: {maxParticipants[0]}</Label>
                <Slider
                  value={maxParticipants}
                  onValueChange={setMaxParticipants}
                  min={2}
                  max={10}
                  step={1}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <Label className="mb-2 block">Description (Optional)</Label>
                <Textarea
                  placeholder="Tell people what to expect..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium mb-2">Preview</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-lavender-peach flex items-center justify-center text-white">
                    {activityIcons[activityType]}
                  </div>
                  <div>
                    <div className="font-medium">{title || 'Untitled Event'}</div>
                    <div className="text-sm text-muted-foreground">
                      {datetime ? new Date(datetime).toLocaleString() : 'No date set'}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button className="flex-1 gradient-lavender-peach text-white" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button className="flex-1 gradient-lavender-peach text-white" onClick={handleCreate}>
              <Calendar className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Living Map Component
export function LivingMap() {
  const { currentView, setCurrentView, setCurrentMood, selectedUserId, setSelectedUser } = useAppStore();
  const meetupCount = useMeetupCount();
  const meetupGoal = useMeetupGoal();
  const specialMode = useSpecialMode();
  const currentMood = useCurrentMood();
  
  const meetupPercentage = (meetupCount / meetupGoal) * 100;
  
  const [activeTab, setActiveTab] = useState('map');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapUser, setSelectedMapUser] = useState<typeof mockUsers[0] | null>(null);
  
  const handleEmergency = () => {
    setCurrentView('emergency');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-rainbow flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <div className="font-bold font-display">Konect</div>
                <div className="text-xs text-muted-foreground">
                  {meetupCount}/{meetupGoal} meetups free
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCurrentView('settings')}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCurrentView('profile')}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-3">
          <Progress value={meetupPercentage} className="flex-1 h-2" />
          <span className="text-sm font-medium">{meetupCount}/{meetupGoal}</span>
        </div>
      </div>

      {/* Mood Selector */}
      <div className="bg-card border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Your mood:</span>
          {moodOptions.map((mood) => (
            <Badge
              key={mood.value}
              variant={currentMood === mood.value ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap transition-all ${
                currentMood === mood.value
                  ? `${mood.color} text-white border-0`
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setCurrentMood(currentMood === mood.value ? null : mood.value)}
            >
              {mood.emoji} {mood.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Map View */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-950/30 dark:to-emerald-950/30">
          {/* Simulated map with user markers */}
          <div className="relative w-full h-full">
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 border-t border-gray-400"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 border-l border-gray-400"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
            </div>

            {/* User markers */}
            {mockUsers.map((user, index) => (
              <motion.button
                key={user.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMapUser(user)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${30 + index * 12}%`,
                  top: `${25 + (index % 3) * 15}%`,
                }}
              >
                <div className={`relative ${moodOptions.find(m => m.value === user.mood)?.color} p-1 rounded-full shadow-lg`}>
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarFallback className="bg-white text-foreground">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {user.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}

            {/* Event markers */}
            {mockEvents.map((event, index) => (
              <motion.button
                key={event.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${60 + (index % 2) * 10}%`,
                }}
              >
                <div className="bg-white p-2 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-lavender-peach flex items-center justify-center text-white">
                      {activityIcons[event.activityType]}
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.participants.length}/{event.maxParticipants}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Selected user popup */}
            <AnimatePresence>
              {selectedMapUser && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-24 left-4 right-4"
                >
                  <UserProfileCard
                    user={selectedMapUser}
                    onClose={() => setSelectedMapUser(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center"
          >
            <Layers className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center"
          >
            <Compass className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCreateEvent(true)}
            className="w-14 h-14 rounded-full gradient-lavender-peach shadow-xl flex items-center justify-center text-white"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Location button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-24 left-4 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center"
        >
          <Navigation className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-card border-t safe-bottom">
        <div className="container mx-auto">
          <div className="flex items-center justify-around py-2">
            <Button
              variant="ghost"
              className={`flex-col gap-1 ${activeTab === 'map' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <Map className="w-5 h-5" />
              <span className="text-xs">Map</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col gap-1 ${activeTab === 'events' ? 'text-primary' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Events</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col gap-1 ${activeTab === 'chat' ? 'text-primary' : ''}`}
              onClick={() => setCurrentView('chat')}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">Chat</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col gap-1 ${activeTab === 'circles' ? 'text-primary' : ''}`}
              onClick={() => setCurrentView('circles')}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Circles</span>
            </Button>
            <Button
              variant="ghost"
              className="flex-col gap-1 text-red-500"
              onClick={handleEmergency}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs">SOS</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Create Event Modal */}
      <CreateEventModal open={showCreateEvent} onOpenChange={setShowCreateEvent} />
    </div>
  );
}
