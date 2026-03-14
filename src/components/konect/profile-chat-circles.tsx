'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Settings,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Shield,
  Edit,
  Camera,
  Mic,
  Send,
  Phone,
  Video,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Check,
  Star,
  Award,
  Users,
  Plus,
  ChevronRight,
  Clock,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Bell,
  HelpCircle,
  LogOut,
  Trash2,
  AlertTriangle,
  Flower2,
  Leaf,
  Sparkles,
  Zap,
  Emergency,
  PhoneCall,
  Map,
} from 'lucide-react';
import { useAppStore } from '@/store';

// Trust Flower tags
const trustFlowerTags = [
  { id: '1', label: 'Great Listener', color: 'bg-violet-500', emoji: '🌸' },
  { id: '2', label: 'Fun Energy', color: 'bg-amber-500', emoji: '🌻' },
  { id: '3', label: 'Punctual', color: 'bg-emerald-500', emoji: '🌷' },
  { id: '4', label: 'Good Storyteller', color: 'bg-pink-500', emoji: '🌺' },
  { id: '5', label: 'Supportive', color: 'bg-sky-500', emoji: '💙' },
];

// User badges
const userBadges = [
  { id: '1', name: 'First Meetup', emoji: '🎉', earned: true },
  { id: '2', name: '5 Meetups', emoji: '⭐', earned: true },
  { id: '3', name: 'Trusted Friend', emoji: '💜', earned: true },
  { id: '4', name: 'Event Host', emoji: '🎪', earned: false },
  { id: '5', name: 'Community Builder', emoji: '🌟', earned: false },
];

// Mock circles
const mockCircles = [
  { id: '1', name: 'Coffee Lovers', members: 8, lastActive: '2h ago', coverGradient: 'from-amber-400 to-orange-500' },
  { id: '2', name: 'Art Squad', members: 5, lastActive: '1d ago', coverGradient: 'from-pink-400 to-purple-500' },
  { id: '3', name: 'Study Group', members: 12, lastActive: '5m ago', coverGradient: 'from-emerald-400 to-teal-500' },
];

// Mock conversations
const mockConversations = [
  { id: '1', name: 'Alex', lastMessage: 'That was such a fun coffee meetup! 🎉', time: '2m ago', unread: 2, avatar: 'A' },
  { id: '2', name: 'Jordan', lastMessage: 'See you at the art gallery tomorrow!', time: '1h ago', unread: 0, avatar: 'J' },
  { id: '3', name: 'Sam', lastMessage: 'Thanks for the book recommendation!', time: '3h ago', unread: 1, avatar: 'S' },
  { id: '4', name: 'Taylor', lastMessage: 'Voice message (0:15)', time: '1d ago', unread: 0, avatar: 'T' },
];

// Mock messages
const mockMessages = [
  { id: '1', sender: 'other', type: 'voice', duration: 12, time: '10:30 AM' },
  { id: '2', sender: 'me', type: 'text', content: 'Hey! I listened to your voice note. That cafe sounds amazing!', time: '10:32 AM' },
  { id: '3', sender: 'other', type: 'text', content: 'Yes! The lattes there are incredible. Want to check it out this weekend?', time: '10:35 AM' },
  { id: '4', sender: 'me', type: 'voice', duration: 8, time: '10:38 AM' },
  { id: '5', sender: 'other', type: 'text', content: 'That was such a fun coffee meetup! 🎉', time: '2:15 PM' },
];

// Profile Screen
export function ProfileScreen() {
  const { setCurrentView, logout } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Art enthusiast, coffee lover, and always up for an adventure. Looking for genuine connections! ✨');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('map')}>
            <Map className="w-5 h-5" />
          </Button>
          <h1 className="font-bold font-display">Profile</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                <AvatarFallback className="gradient-lavender-peach text-white text-3xl">
                  Y
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-4">You</h2>
            <p className="text-muted-foreground">they/them • 26</p>
            
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary">🎨 Art</Badge>
              <Badge variant="secondary">☕ Coffee</Badge>
              <Badge variant="secondary">📚 Books</Badge>
            </div>
          </div>

          {/* Trust Flowers */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-pink-500" />
                Trust Flowers
              </h3>
              <Badge variant="secondary" className="text-lg">🌸 23</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {trustFlowerTags.map((tag) => (
                <Badge key={tag.id} className={`${tag.color} text-white border-0`}>
                  {tag.emoji} {tag.label}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-4">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-500" />
              Badges
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {userBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                    badge.earned
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30'
                      : 'bg-muted opacity-50'
                  }`}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-[10px] text-center mt-1">{badge.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">About Me</h3>
            {isEditing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="resize-none"
              />
            ) : (
              <p className="text-muted-foreground">{bio}</p>
            )}
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground">Meetups</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Circles</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => setCurrentView('settings')}>
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600" onClick={logout}>
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Chat List Screen
export function ChatListScreen() {
  const { setCurrentView } = useAppStore();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('map')}>
            <Map className="w-5 h-5" />
          </Button>
          <h1 className="font-bold font-display">Messages</h1>
          <Button variant="ghost" size="icon">
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto px-4">
          {mockConversations.map((conv) => (
            <motion.button
              key={conv.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className="w-full flex items-center gap-3 py-4 border-b"
              onClick={() => setSelectedChat(conv.id)}
            >
              <Avatar className="w-12 h-12">
                <AvatarFallback className="gradient-lavender-peach text-white">
                  {conv.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{conv.name}</span>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      {/* Selected Chat Detail */}
      {selectedChat && (
        <ChatDetailScreen
          chatId={selectedChat}
          onBack={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
}

// Chat Detail Screen
function ChatDetailScreen({ chatId, onBack }: { chatId: string; onBack: () => void }) {
  const [message, setMessage] = useState('');
  const [voiceUnlocked, setVoiceUnlocked] = useState(true);
  const [voiceCount, setVoiceCount] = useState(2);

  const chat = mockConversations.find((c) => c.id === chatId);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Map className="w-5 h-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="gradient-lavender-peach text-white">
              {chat?.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{chat?.name}</div>
            <div className="text-xs text-muted-foreground">Active now</div>
          </div>
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Voice unlock notice */}
      {!voiceUnlocked && (
        <div className="bg-primary/10 px-4 py-2 text-center text-sm">
          <Mic className="w-4 h-4 inline mr-2" />
          Send {2 - voiceCount} more voice note(s) to unlock text chat
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'voice' ? (
                <div className={`max-w-[70%] rounded-2xl p-3 ${
                  msg.sender === 'me'
                    ? 'gradient-lavender-peach text-white'
                    : 'bg-muted'
                }`}>
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    <div className="flex-1 h-6 bg-white/20 rounded-full flex items-center px-2">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 mx-0.5 rounded-full ${
                            msg.sender === 'me' ? 'bg-white/60' : 'bg-primary/40'
                          }`}
                          style={{
                            height: `${Math.random() * 16 + 4}px`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{msg.duration}s</span>
                  </div>
                  <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                </div>
              ) : (
                <div className={`max-w-[70%] rounded-2xl p-3 ${
                  msg.sender === 'me'
                    ? 'gradient-lavender-peach text-white'
                    : 'bg-muted'
                }`}>
                  <p>{msg.content}</p>
                  <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder={voiceUnlocked ? "Type a message..." : "Send voice notes to unlock text..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!voiceUnlocked}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button
            size="icon"
            className="rounded-full w-10 h-10 gradient-lavender-peach text-white"
            onClick={() => {
              if (message.trim()) {
                setMessage('');
              }
            }}
          >
            {message.trim() ? (
              <Send className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Circles Screen
export function CirclesScreen() {
  const { setCurrentView } = useAppStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('map')}>
            <Map className="w-5 h-5" />
          </Button>
          <h1 className="font-bold font-display">Circles</h1>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Introduction */}
          <Card className="p-4 gradient-lavender-peach text-white">
            <h3 className="font-semibold mb-2">What are Circles?</h3>
            <p className="text-sm opacity-90">
              Circles are private friend groups you create after meeting people. 
              Stay connected, plan meetups, and grow your community!
            </p>
          </Card>

          {/* Your Circles */}
          <div>
            <h3 className="font-semibold mb-3">Your Circles</h3>
            <div className="space-y-3">
              {mockCircles.map((circle) => (
                <motion.div
                  key={circle.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card className="overflow-hidden">
                    <div className={`h-20 bg-gradient-to-r ${circle.coverGradient} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <h4 className="font-semibold">{circle.name}</h4>
                        <p className="text-sm opacity-80">{circle.members} members</p>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(5, circle.members))].map((_, i) => (
                          <Avatar key={i} className="w-8 h-8 border-2 border-white">
                            <AvatarFallback className="bg-gradient-to-br from-violet-400 to-pink-400 text-white text-xs">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        {circle.lastActive}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Create New */}
          <Button className="w-full gradient-lavender-peach text-white" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Circle
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}

// Settings Screen
export function SettingsScreen() {
  const { setCurrentView, logout } = useAppStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('map')}>
            <Map className="w-5 h-5" />
          </Button>
          <h1 className="font-bold font-display">Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Account */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">ACCOUNT</h3>
            <Card className="divide-y">
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span>Privacy & Safety</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">PREFERENCES</h3>
            <Card className="divide-y">
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span>Language</span>
                </div>
                <span className="text-muted-foreground">English</span>
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span>Appearance</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Special Modes */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">SPECIAL MODES</h3>
            <Card className="divide-y">
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-purple-500" />
                  <span>Breakup Recovery</span>
                </div>
                <Badge variant="secondary">Off</Badge>
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-500" />
                  <span>Traveler Mode</span>
                </div>
                <Badge variant="secondary">Off</Badge>
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>University Mode</span>
                </div>
                <Badge variant="secondary">Off</Badge>
              </button>
            </Card>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">SUPPORT</h3>
            <Card className="divide-y">
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <span>Report a Problem</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Subscription */}
          <Card className="p-4 gradient-lavender-peach text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Free Tier</h3>
                <p className="text-sm opacity-80">5 meetups remaining free</p>
              </div>
              <Button variant="secondary" size="sm">
                Upgrade
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <div>
            <h3 className="text-sm font-medium text-red-500 mb-2">DANGER ZONE</h3>
            <Card className="divide-y border-red-200">
              <button className="w-full flex items-center justify-between p-4 text-red-500">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 text-red-500">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Account</span>
                </div>
              </button>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Emergency Screen
export function EmergencyScreen() {
  const { setCurrentView } = useAppStore();
  const [location, setLocation] = useState('123 Main Street, City');

  return (
    <div className="min-h-screen bg-red-50 dark:bg-red-950/30 flex flex-col">
      <header className="sticky top-0 z-50 bg-red-500 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setCurrentView('map')}>
            <Map className="w-5 h-5" />
          </Button>
          <h1 className="font-bold font-display">Emergency</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Emergency Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex justify-center"
        >
          <button className="w-48 h-48 rounded-full bg-red-500 text-white flex flex-col items-center justify-center shadow-2xl">
            <Emergency className="w-16 h-16 mb-2" />
            <span className="text-lg font-bold">SOS</span>
            <span className="text-xs opacity-80">Tap for Help</span>
          </button>
        </motion.div>

        {/* Location */}
        <Card className="p-4 bg-white/80 backdrop-blur">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="font-semibold">Your Location</span>
          </div>
          <p className="text-muted-foreground text-sm">{location}</p>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-20 flex-col gap-2 bg-red-500 hover:bg-red-600">
            <PhoneCall className="w-6 h-6" />
            <span>Call Emergency</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-orange-500 hover:bg-orange-600">
            <Users className="w-6 h-6" />
            <span>Alert Contacts</span>
          </Button>
        </div>

        {/* Safety Tips */}
        <Card className="p-4 bg-white/80 backdrop-blur">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            Safety Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Always meet in public places
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Share your live location with a friend
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Trust your instincts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Have an exit plan
            </li>
          </ul>
        </Card>

        {/* Silent Exit */}
        <Button variant="outline" className="w-full" size="lg">
          <Phone className="w-5 h-5 mr-2" />
          Fake Call (Silent Exit)
        </Button>
      </div>
    </div>
  );
}
