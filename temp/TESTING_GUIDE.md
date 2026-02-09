# Quick Testing Guide for Routing & State Fixes

## 🎯 How to Test All the Fixes

### Test 1: State Persistence & Restoration
1. Open the app: `npm run dev`
2. Click "Get Started" from homepage
3. Upload a jersey image (any image file)
4. Upload player Excel file  
5. **Close the browser tab completely**
6. Open the app again
7. ✅ **Expected:** Dialog appears asking "Restore Previous Session?"
8. Click "Restore Session"
9. ✅ **Expected:** All images and data restored, same step

### Test 2: Auto-Save Indicator
1. With data loaded, observe top of page
2. ✅ **Expected:** See "Last saved: Just now" with badge "Auto-save enabled"
3. Make any change (select different player, navigate steps)
4. ✅ **Expected:** Save indicator updates

### Test 3: Step Navigation Validation
1. Fresh start (or clear data)
2. Try clicking Step 2, 3, or 4 buttons
3. ✅ **Expected:** Buttons are disabled (faded), tooltip says "Complete previous steps to unlock"
4. Upload images + data
5. ✅ **Expected:** All step buttons become clickable

### Test 4: Confirmation on Clear
1. With data loaded, click "Clear All Data" button (top right)
2. ✅ **Expected:** Dialog appears: "This will delete all your jersey images..."
3. Click "Keep Working"
4. ✅ **Expected:** Dialog closes, data remains
5. Click "Clear All Data" again
6. Click "Clear Everything"
7. ✅ **Expected:** Returns to homepage, data cleared, toast shows success

### Test 5: Navigation Forward/Back
1. Upload images + data
2. Click "Continue to Canvas Design" (Step 1)
3. ✅ **Expected:** Moves to Step 2
4. Click "Back to Upload"
5. ✅ **Expected:** Returns to Step 1
6. Click Continue → Continue → Continue
7. ✅ **Expected:** Reaches Step 4
8. Click "Back to Customize"
9. ✅ **Expected:** Returns to Step 3

### Test 6: Toast Notifications
Upload only images (no player data):
✅ **Expected:** Toast: "Great! Now upload your player data to continue"

Upload only player data (no images):
✅ **Expected:** Toast: "Great! Now upload your jersey images to continue"

Try to navigate to locked step:
✅ **Expected:** Toast: "Please complete previous steps first"

Clear data:
✅ **Expected:** Toast: "Project cleared. Ready to start fresh!"

### Test 7: Error Recovery
1. Open browser DevTools Console
2. In Application tab → Storage → Local Storage
3. Manually corrupt the `dotstitch_player_data` entry (add invalid JSON)
4. Refresh page
5. ✅ **Expected:** Toast: "Failed to load previous session. Starting fresh."
6. App still works, no crash

### Test 8: Step 4 State Consistency
1. Complete flow to Step 4
2. Note which player is selected
3. Click "Back to Customize" (Step 3)
4. Select a different player
5. Click "Continue to Export" (Step 4)
6. ✅ **Expected:** Selected player remains consistent (the one you selected in Step 3)

### Test 9: Header isPremium
1. Sign in/Sign up
2. ✅ **Expected:** No console errors about isPremium
3. If you have > 100 total points purchased:
4. ✅ **Expected:** "Premium" badge appears in header

### Test 10: Start Fresh Flow
1. Have a saved session
2. Open app → restore dialog appears
3. Click "Start Fresh"
4. ✅ **Expected:** Start with empty state, no data loaded

---

## 🐛 What to Look For (Should NOT Happen)

❌ Step navigation buttons calling incorrect function
❌ Console errors about "onStepClick is not a function"
❌ Console errors about "isPremium is undefined"
❌ Losing data when refreshing page
❌ Being able to click locked steps
❌ Data clearing without confirmation
❌ State getting out of sync in Step 4
❌ Crashes when localStorage is full
❌ Crashes when rendering steps

---

## ✅ Success Criteria

All tests pass with expected results ✓
No console errors ✓
Smooth navigation between all steps ✓
Data persists across browser sessions ✓
User cannot lose work accidentally ✓

---

## 🚀 Running the Tests

```bash
# Start development server
npm run dev

# Open browser to http://localhost:8080

# Run through each test scenario above

# Check browser console for errors (there should be none)
```

---

## 📋 Checklist for Quality Assurance

- [ ] State persistence works (Test 1)
- [ ] Auto-save indicator shows (Test 2)
- [ ] Step locking works (Test 3)
- [ ] Confirmation dialogs work (Test 4)
- [ ] Back/Next navigation works (Test 5)
- [ ] All toast messages appear (Test 6)
- [ ] Error handling graceful (Test 7)
- [ ] State stays in sync (Test 8)
- [ ] No isPremium errors (Test 9)
- [ ] Fresh start works (Test 10)

---

## 🎓 Expected User Experience

**Professional Feel:**
- Saves work automatically ✓
- Never loses progress ✓
- Clear feedback on all actions ✓
- Prevents mistakes with confirmations ✓
- Smooth, logical flow ✓

**No Confusion:**
- Can't navigate to incomplete steps ✓
- Always knows what to do next ✓
- Tooltips explain everything ✓
- Error messages are helpful ✓

**Reliable:**
- Works after browser refresh ✓
- Handles errors gracefully ✓
- State always consistent ✓
- No crashes or freezes ✓
