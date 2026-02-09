# Adding Custom Athletic Fonts to DotStitch

## Overview
DotStitch now includes 13 premium athletic and collegiate fonts specifically designed for sports jerseys. These fonts are already configured in the font selector but require manual installation since they are commercial/premium fonts.

## Font List

### Collegiate & Varsity Fonts
1. **Old Sport Athletic** - Classic athletic/varsity style (very high downloads)
2. **Jackport College NCV** - Bold collegiate varsity look
3. **Collegiate Heavy Outline** - Traditional college lettering
4. **High School USA** - High-school sports vibe font
5. **SF Collegiate** - Varsity/college font
6. **Universal College** - School/varsity themed lettering
7. **Atlanta College** - Collegiate block font

### Jersey-Specific Fonts
8. **Jersey M54** - Blocky jersey style lettering
9. **Jersey Letters** - Simple athletic block letters
10. **Star Shield** - Bold jersey/number style

### Stylized Athletic Fonts
11. **FTY Delirium NCV** - Stylized athletic font
12. **Friday Night Lights** - Sports-themed decorative font
13. **Sporting Outline** - Outlined sports font

## Installation Steps

### Step 1: Download the Fonts

Visit the following sources to download the font files:

- **DaFont.com** (Free for personal use): https://www.dafont.com/
  - Search for each font name
  - Download the `.ttf` or `.otf` files
  
- **Creative Market** (Premium): https://creativemarket.com/
- **MyFonts** (Premium): https://www.myfonts.com/
- **Font Bundles** (Premium): https://fontbundles.net/

**Note:** Most of these fonts are free for personal use but require a license for commercial use. Please check the license terms before using them in production.

### Step 2: Convert Fonts to Web Formats

For optimal web performance, convert your fonts to `.woff` and `.woff2` formats:

1. Visit **Font Squirrel Webfont Generator**: https://www.fontsquirrel.com/tools/webfont-generator
2. Upload your `.ttf` or `.otf` files
3. Select "Optimal" settings
4. Download the generated web font kit

### Step 3: Add Fonts to Your Project

1. Create a `fonts` folder in the `public` directory:
   ```
   public/
   └── fonts/
       ├── OldSportAthletic.woff2
       ├── OldSportAthletic.woff
       ├── JackportCollegeNCV.woff2
       ├── JackportCollegeNCV.woff
       └── ... (other fonts)
   ```

2. Copy all `.woff` and `.woff2` files to `public/fonts/`

### Step 4: Verify Installation

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open the application and navigate to **Step 2: Preview Canvas**

3. Click on the **Font Selector** dropdown

4. Select the **"Collegiate"** category - you should see all the new fonts listed

5. Select a font and verify it appears correctly in the preview

## Font File Naming Convention

The CSS file expects the following file names (case-sensitive):

- `OldSportAthletic.woff2` / `OldSportAthletic.woff`
- `JackportCollegeNCV.woff2` / `JackportCollegeNCV.woff`
- `CollegiateHeavyOutline.woff2` / `CollegiateHeavyOutline.woff`
- `HighSchoolUSA.woff2` / `HighSchoolUSA.woff`
- `FTYDeliriumNCV.woff2` / `FTYDeliriumNCV.woff`
- `JerseyM54.woff2` / `JerseyM54.woff`
- `JerseyLetters.woff2` / `JerseyLetters.woff`
- `SFCollegiate.woff2` / `SFCollegiate.woff`
- `UniversalCollege.woff2` / `UniversalCollege.woff`
- `FridayNightLights.woff2` / `FridayNightLights.woff`
- `SportingOutline.woff2` / `SportingOutline.woff`
- `StarShield.woff2` / `StarShield.woff`
- `AtlantaCollege.woff2` / `AtlantaCollege.woff`

## Troubleshooting

### Fonts Not Showing Up?

1. **Check file paths**: Ensure fonts are in `public/fonts/` directory
2. **Check file names**: File names must match exactly (case-sensitive)
3. **Clear browser cache**: Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Check console**: Open browser DevTools (F12) and look for 404 errors in the Console tab

### Font Looks Different Than Expected?

1. **Check font variant**: Some fonts have multiple styles (Regular, Bold, Outline, etc.)
2. **Verify correct file**: Make sure you downloaded the correct variant
3. **Check font weight**: Some fonts require specific font-weight values

### Performance Issues?

1. **Use `.woff2` format**: This is the most compressed and fastest format
2. **Preload critical fonts**: Add `<link rel="preload">` in `index.html` for frequently used fonts
3. **Limit font selection**: Only include fonts you actually use

## License Compliance

**Important:** Most of these fonts have specific licensing requirements:

- ✅ **Personal/Non-Commercial Use**: Usually free
- ⚠️ **Commercial Use**: Often requires purchasing a license
- 📄 **Always check the license**: Read the license file included with each font

For production deployment, ensure you have proper licenses for all fonts used.

## Alternative: Using Similar Google Fonts

If you prefer to use free, open-source fonts without licensing concerns, consider these Google Fonts alternatives:

- **Old Sport Athletic** → `Bebas Neue` or `Oswald`
- **Jackport College** → `Graduate` or `Staatliches`
- **Jersey M54** → `Anton` or `Russo One`
- **Collegiate Heavy Outline** → `Bungee Outline`

These are already included and working in the application!

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify font files are correctly named and placed
3. Ensure fonts are in web-compatible formats (.woff, .woff2)
4. Test with a simple font first to verify the setup works

---

**Ready to use?** Once fonts are installed, they will appear automatically in the font selector and can be applied to player names and numbers instantly!
