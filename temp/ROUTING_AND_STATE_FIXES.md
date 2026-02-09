# Routing and State Management Issues Found

## Critical Issues Identified:

### 1. **Missing `isPremium` in useAuth hook**
- Used in `Header.tsx` line 11 but not defined in useAuth
- Will cause runtime error

### 2. **StepNavigation prop mismatch**
- `Index.tsx` passes `onStepChange` (line 181)
- `StepNavigation.tsx` expects `onStepClick` (line 14)
- **Result:** Step navigation buttons won't work

### 3. **Missing `canGoToStep` validation in StepNavigation**
- StepNavigation doesn't receive or use the `canGoToStep` function
- Users can click on steps they haven't unlocked yet
- No visual feedback for disabled steps

### 4. **No state persistence across route navigation**
- When navigating from OnboardingPage to /design, all state is lost
- Jersey images and player data not persisted
- Users have to re-upload everything

### 5. **Inconsistent state initialization in Step4Export**
- Creates local state for selectedPlayer (lines 25-27)
- Doesn't sync with parent's selectedPlayer changes
- Can cause confusion when navigating back/forward

### 6. **No error boundaries for step components**
- If any step crashes, entire app breaks
- No recovery mechanism

### 7. **Missing route guards**
- No protection against accessing /design without data
- Users can navigate directly to steps via URL
- No validation that required data exists

### 8. **Canvas persistence issues**
- DesignCanvas uses localStorage per player
- But localStorage keys not cleared when starting new project
- Can cause old data to appear for new jerseys

### 9. **No confirmation on destructive actions**
- "Start New Project" button clears all data without confirmation
- No undo mechanism

### 10. **Missing loading states**
- No loading indicators when navigating between steps
- No feedback when saving to localStorage

## Fixes Applied:
All issues will be fixed in the following files.
