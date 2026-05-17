# LifeOS — Personal Life Operating System

A premium Android productivity app built with React Native + Expo + TypeScript.

## Features

- **Home Dashboard** — Daily overview, habits, tasks, mood tracker, goals preview, weekly performance chart
- **Goals** — Category-based goal tracking with milestones, progress rings, streaks
- **Calendar** — Month/week/day/agenda views with time-blocked events
- **Notes** — Markdown-aware notes with folders, tags, pinning, search
- **Analytics** — Productivity/focus/mood trend charts, habit heatmaps, journal insights
- **More** — Business KPIs, content pipeline, travel planning, journal, settings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo SDK 52 |
| Navigation | Expo Router (file-based) |
| State | Zustand |
| Animations | React Native Reanimated |
| Gestures | React Native Gesture Handler |
| Database | Expo SQLite |
| Charts | React Native SVG (custom) |
| Gradients | Expo Linear Gradient |
| Haptics | Expo Haptics |

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`) — for building APK

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npx expo start
```

### Run on Android device (Expo Go)

1. Install **Expo Go** from Google Play Store on your Android phone
2. Run `npx expo start`
3. Scan the QR code with your phone's camera

### Run on Android Emulator

```bash
npx expo start --android
```

Or with Android Studio emulator running:
```bash
npx expo run:android
```

---

## Build APK for Android

### 1. Login to Expo account

```bash
eas login
```

### 2. Configure EAS

```bash
eas build:configure
```

### 3. Build preview APK (sideload-ready)

```bash
eas build --platform android --profile preview
```

This builds a signed `.apk` file. Download it from the EAS dashboard.

### 4. Build production AAB (for Play Store)

```bash
eas build --platform android --profile production
```

### 5. Install APK on your physical Android phone

```bash
# Connect phone via USB with USB debugging enabled, then:
adb install your-app.apk

# Or download APK from EAS dashboard and transfer to phone via USB/email
```

---

## Project Structure

```
lifeos/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout (providers, status bar)
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Tab bar navigation
│   │   ├── index.tsx       # Home dashboard
│   │   ├── goals.tsx       # Goals tracker
│   │   ├── calendar.tsx    # Calendar
│   │   ├── notes.tsx       # Notes
│   │   ├── analytics.tsx   # Analytics
│   │   └── more.tsx        # Business / Travel / Journal / Settings
│   ├── note/[id].tsx       # Note detail (modal)
│   └── goal/[id].tsx       # Goal detail (modal)
│
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable primitives
│   │   │   ├── ThemedText.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Separator.tsx
│   │   ├── home/           # Home screen components
│   │   ├── goals/          # Goal card
│   │   ├── notes/          # Note card
│   │   └── analytics/      # Charts & heatmap
│   │
│   ├── stores/             # Zustand state
│   │   ├── useAppStore.ts
│   │   ├── useGoalsStore.ts
│   │   ├── useNotesStore.ts
│   │   ├── useHabitsStore.ts
│   │   ├── useTasksStore.ts
│   │   └── useJournalStore.ts
│   │
│   ├── services/
│   │   └── database.ts     # SQLite schema & queries
│   │
│   ├── theme/
│   │   ├── colors.ts       # Dark/light color palettes
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useAnimatedPress.ts
│   │
│   └── utils/
│       ├── date.ts
│       └── format.ts
│
├── assets/                 # App icons, splash
├── app.json                # Expo config
├── eas.json                # EAS build profiles
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

---

## Architecture Decisions

- **Offline-first**: All data lives in Zustand stores (in-memory) + SQLite (persistent). No network required.
- **Feature-based structure**: Components are organized by feature domain, not type.
- **Zustand**: Lightweight, synchronous state. No boilerplate compared to Redux.
- **Expo Router**: File-based navigation like Next.js — each file in `app/` is a route.
- **Custom SVG charts**: No heavy charting library — custom `react-native-svg` paths for full control.
- **Reanimated spring animations**: All press interactions use spring physics for natural feel.

## Future Integrations (Prepared, Not Implemented)

- [ ] Outlook Calendar sync
- [ ] Google Calendar sync
- [ ] AI daily summaries (Claude API)
- [ ] Encrypted cloud backup
- [ ] Microsoft To Do integration
- [ ] iCloud / Google Drive export
