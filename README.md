# 💜 Konect: Find Your People, Right Now

Konect is a modern social discovery platform designed for the vibrant youth of India (18-30). It moves beyond static profiles, focusing on real-time "Nearby Now" energy, local events, and safe, voice-first interactions.

Built with a mobile-first philosophy, Konect helps you find your circles in cities like Bengaluru, whether you're looking for a study buddy, a biriyani partner, or a coworking friend.

---

## ✨ Core Features

### 🗺️ Nearby Now (Discover Feed)
A real-time hub showing who’s active in your vicinity (e.g., Indiranagar, Koramangala, HSR Layout). See what people are doing *right now*—from getting coffee to playing basketball.

### 👩🏽‍🎤 Rich Identity Profiles
Detailed persona mockups tailored to the Indian context. 
- **Diverse Personas**: UI Designers, MTech students, Artists, Gamers, and more.
- **Vibe Filtering**: Filter by energy (Need to Talk, Bored, Adventurous, Creative).
- **Reputation Badges**: Trust signals like "Great Listener," "Top Player," and "Verified."

### 🎙️ Safe Voice-First Chat
Break the ice with real voices. Our "Say Hi" system requires two voice notes before unlocking text chat, ensuring more authentic and human connections from the start.

### 🌈 Luminous Pride Mode
A premium, high-contrast inclusive theme called **"Midnight Prism."** 
- **Community-Specific Feeds**: Toggling the Pride theme instantly switches you to a dedicated feed of LGBTQ+ personas.
- **Premium Aesthetic**: Ambient aurora glows, glassmorphism, and a luminous Indigo palette designed for perfect legibility and a welcoming vibe.

### 🏏 Indian Events Hub
A curated section for micro-events near you:
- Chai & Conversations @ Church Street
- Gully Cricket @ Cubbon Park
- Biriyani Nights & Sunset Treks

---

## ⚡ Technology Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/) - App Router, Server Components.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first design system.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Radix UI primitives.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth, high-end micro-interactions.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Global theme and mood handling.
- **Icons**: [Lucide React](https://lucide.dev/) - Modern icon set.
- **Database**: [Supabase](https://supabase.com/) & [Firebase](https://firebase.google.com/) integration.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 📁 Structure

```
src/
├── app/                 # Next.js App Router (Discover, Profiles, Events)
├── components/          # Interactive UI & Global Layouts
├── lib/                 # Theme context, Supabase & Firebase clients
├── store/               # Zustand global state (Theme, Mood, Meetups)
└── types/               # TypeScript definitions
```

---

## 🛡️ Safety First

Konect is built with safety as a priority. Our interface includes prominent safety tips, reporting tools, and 24/7 support links to ensure every meetup is a positive one.

---

Made with 💜 for India's youth.
© 2026 Konect, Founder : Sathwik Giddi
