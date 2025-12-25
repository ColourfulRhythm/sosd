# Vercel Deployment Configuration

## CRITICAL FIX FOR "fsPath" ERROR

The error `Cannot read properties of undefined (reading 'fsPath')` occurs when Vercel can't find the project root.

### Solution:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **General**
2. Find **"Root Directory"** setting
3. Set it to: `school of self discovery` (the subdirectory name)
4. Save and redeploy

This tells Vercel where your Next.js project is located within the repository.

## Important Settings

### Project Settings → General
1. **Root Directory**: **MUST BE SET** to `school of self discovery` (or the exact folder name)
2. **Framework Preset**: Should be "Next.js"
3. **Build Command**: Should be `npm run build` (or leave empty for auto-detection)
4. **Output Directory**: Leave empty (Next.js handles this automatically)
5. **Install Command**: Should be `npm install` (or leave empty for auto-detection)
6. **Node.js Version**: Should be 18.x or higher

### Project Settings → Git
1. **Production Branch**: Should be `main`
2. **Skip Git Submodules**: Enable this to avoid submodule warnings

## Troubleshooting

- **fsPath Error**: Set Root Directory to the project folder name
- **Build completes in 1 second**: Build command is not running - check Root Directory
- **404 errors**: Root Directory is incorrect

## Expected Build Time
A proper Next.js build should take 30-60 seconds, not 1 second.
