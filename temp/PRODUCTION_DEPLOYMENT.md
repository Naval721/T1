# Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Set these in your Vercel/hosting dashboard:

```env
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 2. Build Test
```bash
npm run build
npm run preview
```

### 3. Supabase Setup

#### Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Copy your project URL and anon key

#### Run Database Migration
Execute this SQL in Supabase SQL Editor:

```sql
-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    points_balance INTEGER NOT NULL DEFAULT 5,
    total_points_purchased INTEGER NOT NULL DEFAULT 0,
    total_points_used INTEGER NOT NULL DEFAULT 0,
    free_exports_used INTEGER NOT NULL DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMPTZ,
    last_points_update TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Points Transactions Table
CREATE TABLE IF NOT EXISTS points_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    transaction_type TEXT CHECK (transaction_type IN ('purchase', 'usage', 'refund', 'bonus', 'free_trial')),
    points_amount INTEGER NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for points_transactions
CREATE POLICY "Users can view own transactions" ON points_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON points_transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, points_balance)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', ''),
        5  -- Free trial: 5 points
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import from GitHub: `Naval721/DotStitch`
   - Click "Import"

3. **Configure Environment:**
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📋 Post-Deployment Steps

### 1. Test Production Site
- [ ] Sign up works
- [ ] Sign in works
- [ ] Upload images works
- [ ] Upload Excel works
- [ ] Font selection works
- [ ] Canvas customization works
- [ ] Export works
- [ ] Pricing page loads
- [ ] Points system works

### 2. Configure Domain (Optional)
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### 3. Enable Analytics
Vercel automatically provides:
- Performance metrics
- User analytics
- Error tracking

## 🔒 Security Checklist

- [x] Environment variables not committed
- [x] Supabase RLS policies enabled
- [x] API keys secured
- [x] HTTPS enabled (automatic on Vercel)
- [x] Authentication working
- [x] CORS configured

## 🎯 Performance Optimization

Already implemented:
- [x] Code splitting (lazy loading)
- [x] Image optimization
- [x] Minification (production build)
- [x] Tree shaking
- [x] Gzip compression
- [x] CDN delivery (Vercel Edge Network)

## 📊 Monitoring

### Error Tracking
Check Vercel dashboard for:
- Build errors
- Runtime errors
- Performance issues

### User Feedback
Monitor:
- Sign-up conversion rate
- Export success rate
- Page load times

## 🐛 Troubleshooting

### Build Fails
```bash
# Test locally
npm run build
# Check output for errors
```

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart Vercel deployment after adding variables
- Check Vercel dashboard → Settings → Environment Variables

### Supabase Connection Issues
- Verify URL and key are correct
- Check Supabase project is not paused
- Verify database tables exist

### Font Loading Issues
- Fonts are loaded from Google Fonts CDN
- Check `index.html` has font links
- Verify internet connection on client

## 🔄 Update Deployment

```bash
# Make changes
git add .
git commit -m "Update: description"
git push origin main

# Vercel auto-deploys on push to main
```

## 📞 Support

If issues persist:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Test Supabase connection

## ✅ Production Ready Features

- ✅ Font Selection (45+ fonts)
- ✅ Global Position Templates
- ✅ High-Quality Exports (480 DPI)
- ✅ Points-Based Pricing
- ✅ Authentication System
- ✅ State Persistence
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Loading States
- ✅ Toast Notifications

Your app is **production ready**! 🎉
