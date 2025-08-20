# Floro - Google OAuth Integration

This project implements Google OAuth login using Supabase Auth.

## Setup Instructions

### 1. Google Cloud Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (this enables OAuth 2.0)
4. Go to "APIs & Services" > "Credentials"
5. Click "Create Credentials" > "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add these authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for local development)
   - `https://your-domain.vercel.app/auth/callback` (for production)
8. Note down your Client ID and Client Secret

### 2. Supabase Setup
1. Go to [Supabase](https://supabase.com/) and sign up/login
2. Create a new project
3. Once created, go to "Settings" > "API" to get your project URL and anon key
4. Go to "Authentication" > "Providers" > "Google"
5. Enable Google provider and enter your Google Client ID and Client Secret
6. Copy the redirect URL from Supabase and add it to your Google Cloud credentials

### 3. Environment Configuration
1. Copy `env.example` to `.env.local`
2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 4. Run the Project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Features
- Google OAuth login integration
- Supabase authentication
- Next.js 14 with App Router
- Tailwind CSS styling
- TypeScript support

## Project Structure
```
src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    └── supabase/
        └── client.ts
```
