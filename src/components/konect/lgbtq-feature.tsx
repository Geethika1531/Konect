'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Heart,
  Users,
  Globe,
  MessageCircle,
  Calendar,
  MapPin,
  Shield,
  Sparkles,
  Flag,
  Rainbow,
  X,
  ChevronRight,
  Info,
  Check,
} from 'lucide-react';

// Pride flag types
type PrideFlag = 
  | 'rainbow' 
  | 'trans' 
  | 'bisexual' 
  | 'pansexual' 
  | 'lesbian' 
  | 'nonbinary' 
  | 'asexual' 
  | 'aromantic' 
  | 'intersex' 
  | 'polyamory'
  | 'genderfluid';

// Pride flag data
const prideFlags: Record<PrideFlag, {
  name: string;
  gradient: string;
  description: string;
  colors: string[];
}> = {
  rainbow: {
    name: 'Rainbow Pride',
    gradient: 'gradient-rainbow',
    description: 'The classic LGBTQ+ pride flag representing the diversity of the community',
    colors: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'],
  },
  trans: {
    name: 'Transgender Pride',
    gradient: 'gradient-trans',
    description: 'Representing transgender and non-binary individuals',
    colors: ['Light Blue', 'Pink', 'White', 'Pink', 'Light Blue'],
  },
  bisexual: {
    name: 'Bisexual Pride',
    gradient: 'gradient-bisexual',
    description: 'Representing attraction to multiple genders',
    colors: ['Pink', 'Purple', 'Blue'],
  },
  pansexual: {
    name: 'Pansexual Pride',
    gradient: 'gradient-pansexual',
    description: 'Representing attraction regardless of gender',
    colors: ['Pink', 'Yellow', 'Cyan'],
  },
  lesbian: {
    name: 'Lesbian Pride',
    gradient: 'gradient-lesbian',
    description: 'Representing women who love women',
    colors: ['Orange', 'White', 'Pink'],
  },
  nonbinary: {
    name: 'Non-Binary Pride',
    gradient: 'gradient-nonbinary',
    description: 'Representing those outside the gender binary',
    colors: ['Yellow', 'White', 'Purple', 'Black'],
  },
  asexual: {
    name: 'Asexual Pride',
    gradient: 'bg-gradient-to-b from-black via-gray-500 via-purple-300 to-white',
    description: 'Representing those who experience little to no sexual attraction',
    colors: ['Black', 'Gray', 'White', 'Purple'],
  },
  aromantic: {
    name: 'Aromantic Pride',
    gradient: 'bg-gradient-to-b from-green-500 via-white via-gray-400 to-black',
    description: 'Representing those who experience little to no romantic attraction',
    colors: ['Green', 'Light Green', 'White', 'Gray', 'Black'],
  },
  intersex: {
    name: 'Intersex Pride',
    gradient: 'bg-gradient-to-b from-yellow-400 via-purple-500 to-yellow-400',
    description: 'Representing intersex individuals',
    colors: ['Yellow', 'Purple'],
  },
  polyamory: {
    name: 'Polyamory Pride',
    gradient: 'bg-gradient-to-b from-blue-500 via-red-500 to-black',
    description: 'Representing ethical non-monogamy',
    colors: ['Blue', 'Red', 'Black'],
  },
  genderfluid: {
    name: 'Genderfluid Pride',
    gradient: 'bg-gradient-to-b from-pink-400 via-white via-purple-500 to-blue-500',
    description: 'Representing those whose gender identity changes',
    colors: ['Pink', 'White', 'Purple', 'Black', 'Blue'],
  },
};

// LGBTQ+ resources
const lgbtqResources = [
  {
    title: 'Find LGBTQ+ Friendly Spaces',
    description: 'Discover cafes, bars, and community centers near you',
    icon: MapPin,
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    title: 'Community Events',
    description: 'Pride parades, meetups, and support groups',
    icon: Calendar,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Safe Meetups',
    description: 'Connect with verified community members',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Support Network',
    description: '24/7 access to LGBTQ+ support resources',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
  },
];

// Community stories
const communityStories = [
  {
    name: 'Alex & Jordan',
    location: 'San Francisco',
    story: 'We met at a Konect pride event and have been inseparable since. The LGBTQ+ filtering helped us find each other!',
    flag: 'rainbow' as PrideFlag,
  },
  {
    name: 'Sam',
    location: 'New York',
    story: 'As a trans person, I finally feel safe on a social app. The inclusive features let me be my authentic self.',
    flag: 'trans' as PrideFlag,
  },
  {
    name: 'Riley & Quinn',
    location: 'Austin',
    story: 'Found our polycule through Konect! The polyamory-friendly features are exactly what we needed.',
    flag: 'polyamory' as PrideFlag,
  },
];

interface LGBTQButtonProps {
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
}

// Main LGBTQ+ Button Component
export function LGBTQButton({ onClick, variant = 'default', className = '' }: LGBTQButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    onClick?.();
  };

  if (variant === 'icon') {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`relative w-12 h-12 rounded-full btn-lgbtq flex items-center justify-center shadow-lg ${className}`}
        >
          <Rainbow className="w-6 h-6 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full btn-lgbtq"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.button>
        <LGBTQModal open={showModal} onOpenChange={setShowModal} />
      </>
    );
  }

  if (variant === 'compact') {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className={`relative px-4 py-2 rounded-full btn-lgbtq text-white font-semibold flex items-center gap-2 shadow-lg ${className}`}
        >
          <Rainbow className="w-4 h-4" />
          <span>LGBTQ+</span>
        </motion.button>
        <LGBTQModal open={showModal} onOpenChange={setShowModal} />
      </>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`relative group px-6 py-4 rounded-2xl btn-lgbtq text-white font-bold flex items-center gap-3 shadow-xl overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Rainbow className="w-6 h-6 relative z-10" />
        <span className="relative z-10 text-lg">LGBTQ+ Community</span>
        <ChevronRight className="w-5 h-5 relative z-10 ml-1" />
        <motion.div
          className="absolute inset-0 btn-lgbtq opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>
      <LGBTQModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}

// LGBTQ+ Modal Component
interface LGBTQModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LGBTQModal({ open, onOpenChange }: LGBTQModalProps) {
  const [selectedFlag, setSelectedFlag] = useState<PrideFlag | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <Card className="bg-premium-dark border-0 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative h-32 overflow-hidden">
                <div className="absolute inset-0 gradient-rainbow opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Rainbow className="w-8 h-8" />
                    LGBTQ+ Community
                  </h2>
                  <p className="text-white/80 mt-1">Find your people, be yourself</p>
                </div>
              </div>

              {/* Content */}
              <Tabs defaultValue="flags" className="w-full">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                    <TabsTrigger value="flags" className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      <span className="hidden sm:inline">Flags</span>
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span className="hidden sm:inline">Resources</span>
                    </TabsTrigger>
                    <TabsTrigger value="stories" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Stories</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[calc(90vh-12rem)]">
                  {/* Pride Flags Tab */}
                  <TabsContent value="flags" className="p-6 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Object.entries(prideFlags).map(([key, flag]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedFlag(key as PrideFlag)}
                          className={`relative rounded-xl overflow-hidden transition-all ${
                            selectedFlag === key ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                          }`}
                        >
                          <div className={`h-20 ${flag.gradient}`} />
                          <div className="p-3 bg-card/50">
                            <div className="font-medium text-sm truncate">{flag.name}</div>
                            {selectedFlag === key && (
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {selectedFlag && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-premium p-6 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-24 h-16 rounded-lg ${prideFlags[selectedFlag].gradient}`} />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold">{prideFlags[selectedFlag].name}</h3>
                            <p className="text-muted-foreground mt-1">{prideFlags[selectedFlag].description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {prideFlags[selectedFlag].colors.map((color, i) => (
                                <Badge key={i} variant="secondary">{color}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-4 btn-premium text-white">
                          Show My Pride
                          <Heart className="ml-2 w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}
                  </TabsContent>

                  {/* Resources Tab */}
                  <TabsContent value="resources" className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {lgbtqResources.map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4 card-hover card-glass cursor-pointer">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center`}>
                                <resource.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{resource.title}</h3>
                                <p className="text-sm text-muted-foreground">{resource.description}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    <Card className="p-6 mt-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-3xl font-bold text-gradient-rainbow">50K+</div>
                          <div className="text-sm text-muted-foreground">LGBTQ+ Members</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gradient-rainbow">200+</div>
                          <div className="text-sm text-muted-foreground">Safe Spaces</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gradient-rainbow">1000+</div>
                          <div className="text-sm text-muted-foreground">Events Yearly</div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Stories Tab */}
                  <TabsContent value="stories" className="p-6 space-y-4">
                    <div className="space-y-4">
                      {communityStories.map((story, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-5 card-premium">
                            <div className="flex items-start gap-4">
                              <div className={`w-14 h-14 rounded-full ${prideFlags[story.flag].gradient} flex items-center justify-center text-white font-bold text-xl`}>
                                {story.name[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{story.name}</span>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{story.location}</span>
                                </div>
                                <p className="text-muted-foreground italic">&quot;{story.story}&quot;</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Button className="w-full mt-4 gradient-rainbow text-white py-6">
                      <Heart className="mr-2 w-5 h-5" />
                      Share Your Story
                    </Button>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="p-6 space-y-6">
                    <Card className="p-5 card-glass">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl gradient-rainbow flex items-center justify-center">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Privacy & Safety</h3>
                          <p className="text-sm text-muted-foreground">Control who can see your identity</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Show pride flag on profile</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Only show to LGBTQ+ community</span>
                          <input type="checkbox" className="w-5 h-5 accent-primary" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Filter out non-queer friendly users</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                        </label>
                      </div>
                    </Card>

                    <Card className="p-5 card-glass">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl gradient-trans flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Community Preferences</h3>
                          <p className="text-sm text-muted-foreground">Customize your experience</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Prioritize LGBTQ+ events in feed</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Join local pride celebrations</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span>Receive community news & updates</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                        </label>
                      </div>
                    </Card>

                    <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-xl text-sm text-muted-foreground">
                      <Info className="w-4 h-4 shrink-0" />
                      <p>Your settings help create a safer, more inclusive experience. All information is kept private and secure.</p>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Pride Badge Component
interface PrideBadgeProps {
  flag?: PrideFlag;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function PrideBadge({ flag = 'rainbow', size = 'md', showLabel = false }: PrideBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full ${prideFlags[flag].gradient} flex items-center justify-center shadow-lg`}>
      <Rainbow className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
      {showLabel && (
        <span className="absolute -bottom-5 text-xs font-medium whitespace-nowrap">
          {prideFlags[flag].name}
        </span>
      )}
    </div>
  );
}

// Pride Banner Component
export function PrideBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 gradient-rainbow opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="relative p-8 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Rainbow className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">Pride Month is Here! 🏳️‍🌈</h2>
          <p className="text-white/80 mt-1">Join the celebration with special events and meetups</p>
        </div>
        <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold">
          Join Events
        </Button>
      </div>
    </div>
  );
}

export default LGBTQButton;
