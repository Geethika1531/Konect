'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Heart,
  MapPin,
  Shield,
  Sparkles,
  MessageCircle,
  Calendar,
  Globe,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '@/store';

const features = [
  {
    icon: Heart,
    title: 'Free Until It Works',
    description: 'Full access until you log 5 real-life meetups. We only win when you make friends.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
  },
  {
    icon: Users,
    title: 'Inclusive by Design',
    description: 'Identity freedom, pronouns, and safety for everyone. Lesbian, gay, straight, trans, non-binary—all welcome.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: MapPin,
    title: 'Living Map',
    description: 'See nearby people and events in real-time. Connect based on mood, interests, and energy.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Multi-layer verification, 24/7 human moderation, emergency features, and safe venue suggestions.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description: 'Smart matching based on personality, conversation style, and shared interests—not just looks.',
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    icon: Calendar,
    title: 'Micro-Events',
    description: 'Join small group gatherings or create your own. Coffee chats, game nights, study sessions, and more.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

const stats = [
  { value: '61%', label: 'of young adults report serious loneliness' },
  { value: '12%', label: 'of people have no close friends' },
  { value: '79%', label: 'report swipe fatigue from dating apps' },
];

const testimonials = [
  {
    name: 'Alex, 28',
    location: 'San Francisco',
    text: 'After moving to a new city, Konect helped me find my people. The breakup recovery mode was exactly what I needed.',
    avatar: '🌸',
  },
  {
    name: 'Jordan, 23',
    location: 'Austin',
    text: 'As a trans person, I finally feel safe on a social app. The inclusive design and moderation make all the difference.',
    avatar: '💜',
  },
  {
    name: 'Sam, 31',
    location: 'New York',
    text: 'The free-for-5 model is genius. I made real friends before paying a cent. This is how apps should work.',
    avatar: '✨',
  },
];

export function LandingPage() {
  const { themePreference, setCurrentView, setOnboardingStep } = useAppStore();
  const isLGBTQ = themePreference === 'lgbtq';

  const handleGetStarted = () => {
    setCurrentView('onboarding');
    setOnboardingStep('gender');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/20 via-background to-peach/20 dark:from-lavender/10 dark:via-background dark:to-peach/10" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-lavender/20 blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-peach/20 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-warm-pink/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isLGBTQ ? 'gradient-rainbow shadow-lg' : 'gradient-terracotta'}`}>
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className={`text-3xl font-bold font-display transition-all duration-500 ${isLGBTQ ? 'text-gradient-rainbow' : 'text-gradient-theme'}`}>Konect</span>
              </div>
              <Badge variant="secondary" className="text-sm px-4 py-1">
                ✨ Find Your People
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight"
            >
              Make{' '}
              <span className={`transition-all duration-500 ${isLGBTQ ? 'text-gradient-rainbow' : 'text-gradient-theme'}`}>Real Friends</span>
              <br />
              Through Real Meetups
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Combat loneliness by forming genuine friendships. Free until you log 5 real-life meetups—we only profit when you make friends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="gradient-lavender-peach text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-2xl border-2"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                100% inclusive
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                4.8★ App Store
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold font-display mb-2">The Loneliness Crisis</h2>
            <p className="text-muted-foreground">We're here to change these numbers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center border-0 shadow-md bg-card/50 backdrop-blur">
                  <div className="text-4xl font-bold text-gradient-rainbow mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Why Konect is Different
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up for genuine connections, not endless swiping
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full card-hover border-0 shadow-md">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Modes Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Special Modes for Life's Moments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're healing, exploring, or starting fresh, we've got you covered
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center bg-breakup-gradient border-0 shadow-md card-hover">
                <div className="text-4xl mb-4">💜</div>
                <h3 className="text-lg font-semibold mb-2">Breakup Recovery</h3>
                <p className="text-sm text-muted-foreground">
                  Supportive matching, distraction activities, and recovery circles
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-sky-50 to-teal-50 dark:from-sky-950/30 dark:to-teal-950/30 border-0 shadow-md card-hover">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold mb-2">Traveler Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with locals who offer tours and authentic experiences
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-0 shadow-md card-hover">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold mb-2">University Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Campus maps, study groups, fresher welcome, and society discovery
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Real Stories from Real Friends
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full border-0 shadow-md bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-8 md:p-12 gradient-lavender-peach border-0 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                Ready to Find Your People?
              </h2>
              <p className="text-white/90 mb-6">
                Join thousands who are building real friendships through real meetups. Your first 5 are free.
              </p>
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-purple-600 font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${isLGBTQ ? 'gradient-rainbow shadow-md' : 'gradient-terracotta'}`}>
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className={`font-semibold font-display transition-all duration-500 ${isLGBTQ ? 'text-gradient-rainbow' : 'text-gradient-theme'}`}>Konect</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 Konect. Made with 💜 for everyone.
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
