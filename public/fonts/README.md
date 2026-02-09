# Custom Fonts Directory

This directory contains custom athletic and collegiate fonts for the Jersey Designer.

## Quick Start

1. **Download fonts** from the sources listed in `/docs/CUSTOM_FONTS_GUIDE.md`
2. **Convert to web formats** (.woff, .woff2) using Font Squirrel
3. **Place font files here** following the naming convention below

## Expected Font Files

Place the following files in this directory:

```
fonts/
├── OldSportAthletic.woff2
├── OldSportAthletic.woff
├── JackportCollegeNCV.woff2
├── JackportCollegeNCV.woff
├── CollegiateHeavyOutline.woff2
├── CollegiateHeavyOutline.woff
├── HighSchoolUSA.woff2
├── HighSchoolUSA.woff
├── FTYDeliriumNCV.woff2
├── FTYDeliriumNCV.woff
├── JerseyM54.woff2
├── JerseyM54.woff
├── JerseyLetters.woff2
├── JerseyLetters.woff
├── SFCollegiate.woff2
├── SFCollegiate.woff
├── UniversalCollege.woff2
├── UniversalCollege.woff
├── FridayNightLights.woff2
├── FridayNightLights.woff
├── SportingOutline.woff2
├── SportingOutline.woff
├── StarShield.woff2
├── StarShield.woff
├── AtlantaCollege.woff2
└── AtlantaCollege.woff
```

## Font Sources

Most fonts can be found on:
- **DaFont**: https://www.dafont.com/ (Free for personal use)
- **Creative Market**: https://creativemarket.com/ (Premium)
- **Font Bundles**: https://fontbundles.net/ (Premium)

## Important Notes

⚠️ **Licensing**: These fonts may require commercial licenses for production use.

✅ **Already Working**: The application is already configured to use these fonts once you add the files.

📖 **Full Guide**: See `/docs/CUSTOM_FONTS_GUIDE.md` for detailed instructions.

## Testing

After adding fonts:
1. Restart dev server: `npm run dev`
2. Go to Step 2: Preview Canvas
3. Open Font Selector
4. Select "Collegiate" category
5. Choose your new font!
