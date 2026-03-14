'use client';

import Link from 'next/link';
import { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Heart,
  Shield,
  ChevronRight,
  Users,
  Compass,
  GraduationCap,
  Phone,
  UserCheck,
  MapPin,
  AlertCircle,
  Zap,
  Star,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { useAppStore } from '@/store';

const features = [
  {
    icon: Heart,
    title: "You're Welcome Here",
    description: "Exactly as you are. Your identity is celebrated, your safety is guaranteed in our inclusive community.",
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Zap,
    title: "See Who's Nearby",
    description: "A simple, privacy-first feed shows people nearby who are free and open to connecting right now.",
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Phone-verified users, 24/7 AI moderation, and intelligent safe meetup venue suggestions.",
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Share what makes you unique and what kind of connections you're looking for.",
  },
  {
    step: 2,
    title: "Find Your People",
    description: "Discover nearby users who share your interests through our localized feed.",
  },
  {
    step: 3,
    title: "Connect Offline",
    description: "Meet up safely at verified local venues and build genuine, real-world friendships.",
  },
];

const specialModes = [
  { icon: Heart, title: 'Breakup Recovery', desc: 'Connect with understanding people for gentle support.', color: 'bg-purple-100 dark:bg-purple-900/20', iconColor: 'text-purple-600' },
  { icon: Compass, title: 'Traveler Mode', desc: 'Meet friendly locals and discover new cities.', color: 'bg-orange-100 dark:bg-orange-900/20', iconColor: 'text-orange-600' },
  { icon: GraduationCap, title: 'University Mode', desc: 'Find campus friends and study buddies.', color: 'bg-green-100 dark:bg-green-900/20', iconColor: 'text-green-600' },
];

const safetyFeatures = [
  { icon: Phone, title: 'Phone Verification', desc: 'Every user is securely authenticated.' },
  { icon: UserCheck, title: '24/7 Moderation', desc: 'Proactive community safety checks.' },
  { icon: MapPin, title: 'Safe Venues', desc: 'Partnered with verified public spaces.' },
  { icon: AlertCircle, title: 'Emergency SOS', desc: 'Instant access to emergency assistance.' },
];

const testimonials = [
  {
    name: "Alex",
    role: "Moved to a new city",
    text: "Konect made moving to Seattle so much easier. I met my core friend group within the first month!",
    rating: 5,
  },
  {
    name: "Jordan",
    role: "University Student",
    text: "University Mode is a lifesaver. Found people in my major to study with almost instantly.",
    rating: 5,
  },
  {
    name: "Sam",
    role: "Freelancer",
    text: "Working from home gets lonely. Konect helps me find impromptu coffee buddies during the day.",
    rating: 5,
  },
];

// Theme Toggle - Connected to Global Store
function ThemeToggle() {
  const { themePreference, setThemePreference } = useAppStore();
  const isLGBTQ = themePreference === 'lgbtq';
  
  const toggleTheme = useCallback(() => {
    setThemePreference(isLGBTQ ? 'neutral' : 'lgbtq');
  }, [isLGBTQ, setThemePreference]);
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border transition-all duration-500 touch-target ${
        isLGBTQ ? 'gradient-rainbow-animated text-white border-transparent shadow-lg scale-110' : 'border-border hover:border-primary/50'
      }`}
      aria-label="Toggle theme"
    >
      <Heart className="w-4 h-4" fill={isLGBTQ ? 'white' : 'currentColor'} />
    </button>
  );
}

function HomePage() {
  const { themePreference } = useAppStore();
  const [count] = useState(2847);

  return (
    <div className='min-h-screen flex flex-col bg-premium-light dark:bg-premium-dark'>
      {/* Hero Section */}
      <section className='relative overflow-hidden min-h-[85vh] sm:min-h-screen flex items-center'>
        <div className='absolute inset-0 hero-gradient-animated' />
        
        <div className='relative container mx-auto px-4 pt-6 pb-12 sm:pt-8 sm:pb-16'>
          {/* Header */}
          <div className='flex items-center justify-between mb-8 sm:mb-12'>
            <Link href='/' className='flex items-center gap-2'>
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${themePreference === 'lgbtq' ? 'gradient-rainbow' : 'gradient-terracotta'}`}>
                <Heart className='w-5 h-5 text-white' fill='white' />
              </div>
              <span className='text-lg sm:text-xl font-bold text-gradient-theme'>Konect</span>
            </Link>
            
            <div className='flex items-center gap-2 sm:gap-3'>
              <ThemeToggle />
              <Link href='/login' className='hidden sm:block'>
                <Button variant='ghost' size='sm'>Sign In</Button>
              </Link>
              <Link href='/onboarding'>
                <Button size='sm' className='btn-primary text-white'>Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Hero Content */}
          <div className='max-w-2xl mx-auto lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center'>
            <div className='text-center lg:text-left'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
                <span className='text-gradient-theme'>You&apos;re not alone.</span>
                <br />
                <span className='text-foreground/90'>We&apos;re here to help.</span>
              </h1>

              <p className='text-base sm:text-lg text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0'>
                Konect guides you toward genuine friendships—starting with your very first coffee chat.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6'>
                <Link href='/onboarding' className='w-full sm:w-auto'>
                  <Button size='lg' className='w-full btn-primary text-white font-semibold h-12'>
                    Start Your Journey
                    <ChevronRight className='ml-2 w-4 h-4' />
                  </Button>
                </Link>
                <Link href='/discover' className='w-full sm:w-auto'>
                  <Button size='lg' variant='outline' className='w-full h-12'>
                    See How It Works
                  </Button>
                </Link>
              </div>

              <div className='flex items-center justify-center lg:justify-start gap-4 mt-8 pt-6 border-t border-border/50 max-w-lg lg:mx-0 mx-auto'>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-white ${['bg-primary', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'][i-1]} font-medium text-xs z-${50-(i*10)}`}>
                      {['User', 'Dave', 'Mia', 'Zoe'][i-1][0]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center text-amber-500 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="font-medium">Loved by 50,000+ users</p>
                </div>
              </div>
            </div>

            {/* Desktop Nearby Preview */}
            <div className='hidden lg:block'>
              <div className={`p-5 rounded-2xl bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/30 shadow-lg transition-colors duration-500 ${themePreference === 'lgbtq' ? 'border-primary/30 shadow-primary/10' : ''}`}>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-semibold flex items-center gap-2'>
                    <Zap className='w-4 h-4 text-primary' />
                    Nearby Now
                  </h3>
                  <span className='text-sm text-muted-foreground'>4 people nearby</span>
                </div>
                  {['Alex', 'Jordan', 'Sam'].map((name, i) => (
                    <div key={i} className='flex items-center gap-3 p-3 rounded-xl bg-background/80 hover:bg-background transition-colors group cursor-default border border-transparent hover:border-border/50 shadow-sm'>
                      <div 
                        className='w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm'
                        style={{ backgroundColor: ['#c45d3e', '#5bcefa', '#d4a853'][i] }}
                      >
                        {name[0]}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className="flex items-center justify-between mb-0.5">
                          <p className='font-semibold text-sm group-hover:text-primary transition-colors'>{name}</p>
                          <span className='text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full'>
                            {['0.2', '0.5', '0.8'][i]} mi
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1 opacity-70" />
                          <span className='truncate'>{['Coffee at The Grind', 'Studying at Library', 'Walking in park'][i]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-center">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground w-full">
                      View all nearby <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className='border-y border-border/50 bg-background/50 backdrop-blur-sm'>
        <div className='container mx-auto px-4 py-8 sm:py-10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center'>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-bold text-gradient-theme">50K+</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Active Users</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-bold text-gradient-theme">120K+</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Friendships</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-bold text-gradient-theme">4.9/5</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">App Rating</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-bold text-gradient-theme">98%</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Feel Safer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='py-16 sm:py-24 bg-muted/20 relative overflow-hidden'>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className='container mx-auto px-4'>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>What Makes Us Different</h2>
            <p className='text-lg text-muted-foreground'>
              Friendship, designed with intention. We've built Konect from the ground up to foster real, meaningful connections.
            </p>
          </div>
          
          <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
            {features.map((f, i) => (
              <Card key={i} className='p-6 sm:p-8 bg-background/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                <div className={`w-14 h-14 rounded-2xl ${f.bgColor} flex items-center justify-center mb-6`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h3 className='text-xl font-bold mb-3'>{f.title}</h3>
                <p className='text-muted-foreground leading-relaxed'>{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className='py-16 sm:py-24'>
        <div className='container mx-auto px-4'>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>How It Works</h2>
            <p className='text-lg text-muted-foreground'>
              Three simple steps to expanding your social circle.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
              {/* Connector line for desktop */}
              <div className='hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-border/50 -z-10' />
              
              {howItWorks.map((step, i) => (
                <div key={i} className='relative flex flex-col items-center justify-center text-center group'>
                  <div className='w-12 h-12 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center font-bold text-lg mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm'>
                    {step.step}
                  </div>
                  <h3 className='text-xl font-bold mb-3'>{step.title}</h3>
                  <p className='text-muted-foreground'>{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href='/onboarding'>
                <Button size='lg' className='btn-primary text-white'>
                  Create Your Profile Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className='py-16 sm:py-24 bg-muted/20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-5xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 items-center'>
              <div className='lg:col-span-2'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
                  <Shield className='w-4 h-4' />
                  <span>Safety First</span>
                </div>
                <h2 className='text-3xl sm:text-4xl font-bold mb-4 leading-tight'>Your Safety is Our Foundation</h2>
                <p className='text-lg text-muted-foreground mb-8'>
                  We verified 100% of our user base. We partner with public venues. We moderate 24/7. Because real connection requires real trust.
                </p>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">Fake profiles allowed</span>
                  </div>
                  <div className="w-px bg-border my-2" />
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold">24/7</span>
                    <span className="text-sm text-muted-foreground">Active moderation</span>
                  </div>
                </div>
              </div>
              
              <div className='lg:col-span-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {safetyFeatures.map((item, i) => (
                    <Card key={i} className='p-5 flex gap-4 items-start border-border/50 bg-background/50 backdrop-blur-sm'>
                      <div className='w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center'>
                        <item.icon className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <h4 className='font-bold mb-1'>{item.title}</h4>
                        <p className='text-sm text-muted-foreground'>{item.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className='py-16 sm:py-24'>
        <div className='container mx-auto px-4'>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>For Whatever Life Brings</h2>
            <p className='text-lg text-muted-foreground'>
              Different seasons need different support systems. Konect adapts to where you are in life.
            </p>
          </div>
          
          <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
            {specialModes.map((m, i) => (
              <Card key={i} className={`p-6 sm:p-8 ${m.color} border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <m.icon className={`w-8 h-8 ${m.iconColor} mb-4 relative z-10`} />
                <h3 className='text-xl font-bold mb-2 relative z-10'>{m.title}</h3>
                <p className='text-muted-foreground relative z-10'>{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 sm:py-24 bg-muted/20 relative overflow-hidden'>
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className='container mx-auto px-4 relative z-10'>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Real People, Real Connections</h2>
            <p className='text-lg text-muted-foreground'>
              Don't just take our word for it. Here's what our community is saying.
            </p>
          </div>

          <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
            {testimonials.map((t, i) => (
              <Card key={i} className='p-6 sm:p-8 border-border/50 bg-background/80 backdrop-blur-sm'>
                <div className="flex items-center text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className='text-lg mb-6 leading-relaxed'>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 sm:py-32 relative overflow-hidden'>
        <div className={`absolute inset-0 transition-all duration-700 ${themePreference === 'lgbtq' ? 'gradient-rainbow-animated opacity-90' : 'gradient-terracotta opacity-95'}`} />
        <div className='container mx-auto px-4 text-center relative z-10'>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg'>Ready to Meet Someone Real?</h2>
            <p className='text-lg sm:text-xl text-white mb-8 max-w-lg mx-auto drop-shadow-md opacity-90'>
              Stop swiping. Start meeting. Join thousands who've already found genuine, lasting friendships on Konect.
            </p>
            <Link href='/onboarding' className="inline-block">
              <Button size='lg' className={`bg-white hover:bg-gray-100 font-bold px-8 h-14 text-lg rounded-xl shadow-xl hover:-translate-y-1 transition-all ${themePreference === 'lgbtq' ? 'text-purple-600' : 'text-primary'}`}>
                Get Started Free
                <ChevronRight className='ml-2 w-5 h-5' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-6 border-t border-border/30 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500 ${themePreference === 'lgbtq' ? 'gradient-rainbow' : 'gradient-terracotta'}`}>
                <Heart className='w-3.5 h-3.5 text-white' fill='white' />
              </div>
              <span className='font-semibold text-gradient-theme text-sm'>Konect</span>
            </div>
            
            <div className='flex items-center gap-5 text-sm text-muted-foreground'>
              <Link href='/privacy' className='hover:text-foreground transition-colors'>Privacy</Link>
              <Link href='/terms' className='hover:text-foreground transition-colors'>Terms</Link>
              <Link href='/contact' className='hover:text-foreground transition-colors'>Contact</Link>
            </div>
            
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Konect
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default memo(HomePage);
