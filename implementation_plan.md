# DTFT Talk Mobile Application - Implementation Plan

Build the **DTFT Talk** mobile application using **React Native Expo**, strictly adopting the **DTFT Talk** branding (`Speak • Learn • Grow`) across all screens (replacing any legacy "DTFT Academy" references), and matching the exact visual designs provided in the user's screenshots.

---

## User Review Required

> [!IMPORTANT]
> **Key Brand Correction & Design Requirements**:
> 1. **Project Name is strictly DTFT Talk**:
>    - All legacy mentions of "DTFT Academy" are replaced with **DTFT Talk**.
>    - Brand Logo: DTFT Talk 4-color speech bubble logo + stylized "DTFT Talk" (`DTFT` in bold navy/blue, `Talk` with orange/yellow/green accent) + tagline `Speak • Learn • Grow`.
>    - Welcome Screen Title: **"Welcome to DTFT Talk"** with subtitle *"Spoken English & Skill Development Centre"* and *"Learn Today. Lead Tomorrow."*.
>    - Login Screen: **DTFT Talk** Student Portal Login (`Speak • Learn • Grow`).
> 2. **Strict 1-to-1 Mapping to Provided Screens** (No unnecessary screens from old reference structure):
>    - **Screen 1**: `WelcomeScreen` (Branded as **DTFT Talk**, 3D student mascot with laptop & AI chip, floating pills `Learn`, `Practice`, `Build`, `Grow`, 4 category tiles, "Build Your Skills for a Better Future" card, "Get Started ->" & "Login" buttons, "Safe • Secure • Trusted" footer).
>    - **Screen 2**: `LoginScreen` (**DTFT Talk** Student Portal Login, mobile/email & interactive OTP verification, "Safe • Secure • Trusted").
>    - **Screen 3**: `HomeScreen` (DTFT Talk header, Spoken English banner with student mascot and Big Ben background, 6 quick action pills, 7-day streak card, Continue Learning card, Today's Practice 4-card row, Popular Topics 8-card grid, "New to DTFT Talk? Take Tour" banner).
>    - **Screen 4**: `NotesScreen` ("My Notes" banner, search bar, category filter pills, "All Notes (24)" counter, 6 detailed note cards with page/PDF/size metadata, sticky "Tip: Download notes" footer).
>    - **Screen 5**: `PracticeScreen` ("Speaking Practice" mic banner, category pills, "Speaking Practice Modules" with New / In Progress / Not Started status badges, and 68% circular progress card).
>    - **Screen 6**: `CourseDetailScreen` ("Spoken English (Complete Course)", 12 Weeks / 2.5K+ Students stats, 5 sub-tabs [Overview, What You'll Learn, Curriculum, Reviews, FAQ], Course Overview with quote callout, 6 Key Learning Outcomes checkmarks, 5 numbered curriculum steps, 4 highlight tiles, Ananya Ma'am instructor spotlight, student reviews, and sticky enrollment bar with ₹2,999 price and 40% OFF).
>    - **Screen 7**: `ProgressScreen` (4th bottom tab: Speaking progress, daily streak analytics).
>    - **Screen 8**: `ProfileScreen` (5th bottom tab: Student Profile, settings, and certificates).
> 3. **Assets & App Icons**: Dedicated app icons (`icon.png`, `adaptive-icon.png`, `favicon.png`, `splash.png`) and vector artwork generated in `assets/` tailored strictly to **DTFT Talk**.

---

## Clean Codebase & Directory Structure

```
DTFT-Talk/
├── assets/
│   ├── icon.png                 # DTFT Talk App Icon (iOS/Android)
│   ├── adaptive-icon.png        # Android Adaptive Icon
│   ├── favicon.png              # Web Favicon
│   ├── splash.png               # DTFT Talk Splash Screen
│   └── images/                  # Mascots, backgrounds, badges & avatars
├── src/
│   ├── common/                  # Universal Reusable Components for these screens
│   │   ├── AppLogo.tsx          # DTFT Talk speech-bubble & 4-circle logo
│   │   ├── AppHeader.tsx        # Header with Back button / DTFT Talk Logo / Bell / Avatar
│   │   ├── CustomButton.tsx     # Primary solid, outline, and pill button variants
│   │   ├── CategoryPill.tsx     # Horizontal category filter pill
│   │   ├── NoteCard.tsx         # Notes list card (PDF, pages, size, badge)
│   │   ├── PracticeModuleCard.tsx # Speaking practice module card
│   │   ├── CircularProgress.tsx # Circular progress ring (68%)
│   │   ├── BottomTabBar.tsx     # Custom 5-tab bar (Home, Notes, Practice, Progress, Profile)
│   │   └── index.ts             # Barrel export
│   ├── constants/
│   │   ├── color.ts             # Exact color palette matching designs
│   │   ├── fonts.ts             # Typography & sizing tokens
│   │   ├── assetImages.ts       # Images & SVG asset helpers
│   │   └── mockData.ts          # Complete data matching all screens
│   ├── appNavigation/
│   │   ├── navigationTypes.ts   # RootStackParamList & BottomTabParamList
│   │   ├── BottomTabNavigator.tsx # 5 Tabs: Home, Notes, Practice, Progress, Profile
│   │   ├── AppNavigator.tsx     # Root Stack: Welcome -> Login -> MainTabs -> CourseDetail
│   │   └── index.ts             # Barrel export
│   ├── pages/                   # Exactly matching user's screens
│   │   ├── Welcome/             # Welcome Screen (DTFT Talk Branded)
│   │   │   └── WelcomeScreen.tsx
│   │   ├── Login/               # DTFT Talk Login Screen
│   │   │   └── LoginScreen.tsx
│   │   ├── Home/                # Home Screen (Home Tab)
│   │   │   └── HomeScreen.tsx
│   │   ├── Notes/               # My Notes Screen (Notes Tab)
│   │   │   └── NotesScreen.tsx
│   │   ├── Practice/            # Speaking Practice Screen (Practice Tab)
│   │   │   └── PracticeScreen.tsx
│   │   ├── CourseDetail/        # Spoken English Complete Course Screen
│   │   │   └── CourseDetailScreen.tsx
│   │   ├── Progress/            # Progress Tab
│   │   │   └── ProgressScreen.tsx
│   │   ├── Profile/             # Profile Tab
│   │   │   └── ProfileScreen.tsx
│   │   └── index.ts             # Barrel export
│   └── utils/
│       ├── formatters.ts        # Currency (₹), duration, rating & percentage formatters
│       ├── helpers.ts           # Responsive dimensions & greetings
│       └── index.ts             # Barrel export
├── App.tsx                      # Root component with SafeAreaProvider & NavigationContainer
├── app.json                     # Expo config with icons & splash ("name": "DTFT Talk")
├── package.json
└── tsconfig.json
```

---

## Screen by Screen Specifications

### 1. Welcome Screen (`src/pages/Welcome/WelcomeScreen.tsx`)
- **Brand Header**: Multi-color **DTFT Talk** logo (`D` red, `T` teal, `F` yellow, `T` blue with `Talk` accent) + `DTFT TALK | SCHOOL OF ENGLISH & SKILLS` with tagline `Speak • Learn • Grow`.
- **Title**: `Welcome to DTFT Talk` (multi-color letters), `Spoken English & Skill Development Centre`, `Learn Today. Lead Tomorrow.`.
- **Hero Artwork**: 3D cartoon boy with blue hoodie studying on laptop, AI chip glowing overhead, stack of books, pencil holder, plant, and floating chips: `Learn`, `Practice`, `Build`, `Grow`.
- **Category Tiles**: 4 circular pastel tiles:
  - Spoken English (Chat bubble icon, blue)
  - AI & Communication (Brain AI icon, pink)
  - Creative Skills (Palette icon, yellow)
  - Career Growth (Rising graph icon, green)
- **Feature Card**: `Build Your Skills for a Better Future` (Practical Training, Expert Guidance, Certification, Job Support) with laptop & graduation graphic.
- **CTAs**: `Get Started ->` (solid blue) and `Login` (outline).
- **Footer**: `Safe • Secure • Trusted` with shield icon.

### 2. Login Screen (`src/pages/Login/LoginScreen.tsx`)
- **Brand Header**: **DTFT Talk** 4-color speech bubble logo + `Speak • Learn • Grow`.
- **Title**: `Student Portal Login` with subtitle `Sign in to continue your English learning journey`.
- **Form**: Mobile Number / Email ID input, Student ID option, interactive 6-digit OTP verification with countdown timer & Resend button.
- **CTAs**: `Verify & Sign In`, Google/Apple login, and `Continue as Guest`.
- **Navigation**: Directly navigates to Main Tabs on sign-in.

### 3. Home Screen (`src/pages/Home/HomeScreen.tsx`) - [Home Tab]
- **Header**: DTFT Talk 4-color speech bubble logo + tagline, notification bell with red alert dot, student avatar.
- **Hero Banner**: `Start Your Spoken English Journey Today! Small steps. Big confidence.` with `Let's Learn ->` button (navigates to Course Detail) and London / Big Ben student illustration.
- **Quick Category Pills**: `My Notes`, `Grammar Practice`, `Speaking Practice`, `Listening Practice`, `Vocabulary Builder`, `Conversation Practice`.
- **Streak & Level**: `7 Day Streak - Keep going! You're doing great!` + `Your Level Beginner >`.
- **Continue Learning**: `Present Simple Tense` [Grammar], notebook illustration, `3/5 Lessons` progress bar, `Continue ->` button.
- **Today's Practice**: 4 cards in a row: Speaking (pink), Listening (blue), Grammar (green), Daily Quiz (purple).
- **Popular Topics**: 8-topic grid: Tenses, Articles, Prepositions, Sentence Formation, Active & Passive Voice, Modal Verbs, Conditionals, Phrasal Verbs.
- **Interactive Tour**: `New to DTFT Talk? Take Tour ->`.

### 4. Notes Screen (`src/pages/Notes/NotesScreen.tsx`) - [Notes Tab]
- **Header**: Back arrow, DTFT Talk logo, notification bell, student avatar.
- **Hero Banner**: `My Notes - Your study materials, anytime, anywhere. Notes • PDFs • Grammar • Practice` with stack of books.
- **Search Bar**: `Search notes, topics...` with clear & filter.
- **Filter Pills**: `All Notes`, `Grammar`, `Vocabulary`, `Conversation`, `Speaking`, `Listening`.
- **Section Header**: `All Notes (24)` with `Latest First ▾` sort.
- **6 Note Cards**:
  1. `Basic Grammar Rules` [Grammar badge] (12 pages • PDF • 2.5 MB)
  2. `Tense Notes (Complete Guide)` [Grammar badge] (18 pages • PDF • 3.2 MB)
  3. `Daily Vocabulary (1000+ Words)` [Vocabulary badge] (20 pages • PDF • 4.1 MB)
  4. `Real Life Conversations` [Conversation badge] (16 pages • PDF • 2.8 MB)
  5. `Speaking Tips & Fluency` [Speaking badge] (14 pages • PDF • 2.3 MB)
  6. `Listening Practice (Audio + Notes)` [Listening badge] (10 pages • PDF • 1.9 MB)
- **Sticky Footer**: `Tip: Download notes for offline study anytime!` with `Download All` CTA.

### 5. Speaking Practice Screen (`src/pages/Practice/PracticeScreen.tsx`) - [Practice Tab]
- **Header**: Back arrow, DTFT Talk logo, notification bell, student avatar.
- **Hero Banner**: `Speaking Practice - Listen. Repeat. Record. Improve.` with `Start Practice ->` and microphone boy mascot.
- **Category Pills**: `All Speaking`, `Basic Phrases`, `Daily Conversation`, `Interview Practice`, `Travel English`, `Group Discussion`.
- **Modules List**:
  1. `Introduce Yourself` [New badge] (5 Lessons • 15 min • Beginner) -> `Start ->`
  2. `Daily Conversations` [In Progress badge] (8 Lessons • 20 min • Beginner) -> `Continue ->`
  3. `Interview Preparation` [Not Started badge] (6 Lessons • 18 min • Intermediate) -> `Start ->`
  4. `Travel English` [Not Started badge] (7 Lessons • 18 min • Beginner) -> `Start ->`
  5. `Group Discussion` [Not Started badge] (5 Lessons • 16 min • Intermediate) -> `Start ->`
- **Speaking Progress**: `Your Speaking Progress - You are doing great! Keep practicing!` with circular `68%` progress gauge.

### 6. Course Detail Screen (`src/pages/CourseDetail/CourseDetailScreen.tsx`)
- **Hero Section**: `Beginner` badge, share button, `Spoken English (Complete Course)` title, subtitle, duration (12 Weeks), level (Beginner), students (2.5K+), mascot illustration with speech bubbles (`Listen`, `Speak`, `Practice`, `Grow`).
- **Sub-Tabs**: `Overview`, `What You'll Learn`, `Curriculum`, `Reviews`, `FAQ`.
- **Course Overview**: Description + sticky note `"Better English Brighter Future"`.
- **Key Learning Outcomes**: 6 green checkmark points.
- **Course Curriculum**: 5 numbered modules with lesson counts and durations.
- **Course Highlights**: 4 tiles (Audio Lessons, PDF Notes, Real-Life Examples, Certificate of Completion).
- **Instructor Spotlight**: Ananya Ma'am (Spoken English Trainer | 8+ Years Experience) with `View Profile`.
- **Student Reviews**: 4.8 star rating, reviews from Riya Das & Rahul Sen.
- **Sticky Bottom Bar**: `Enroll Now` graduation cap CTA, `₹2,999` price, `₹4,999` strikethrough, and `40% OFF` badge.

### 7. Progress & Profile Tabs
- **Progress Screen**: Streak summary, speaking practice duration, accuracy rate, and achievement badges.
- **Profile Screen**: Student profile card, course certifications, offline downloads, account settings, and logout.

---

## Verification Plan

### Automated Checks
- `npx tsc --noEmit` to verify type safety across all components, screens, and navigation.
- Asset imports and icon verification.

### Manual Verification
- Start Expo dev server (`npx expo start --web`).
- Verify DTFT Talk branding across Welcome, Login, Home, Notes, Practice, Course Detail, Progress, and Profile screens.
- Test navigation, filters, search, buttons, and responsive layouts.
