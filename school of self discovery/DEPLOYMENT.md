# Vercel Deployment Configuration

## Important Settings

If the site is not loading after deployment, check these settings in your Vercel project dashboard:

### Project Settings → General
1. **Root Directory**: Leave empty (or set to project root if needed)
2. **Framework Preset**: Should be "Next.js" (auto-detected)
3. **Build Command**: Should be `npm run build` (or leave empty for auto-detection)
4. **Output Directory**: Leave empty (Next.js handles this automatically)
5. **Install Command**: Should be `npm install` (or leave empty for auto-detection)

### Project Settings → Git
1. **Production Branch**: Should be `main`
2. **Skip Git Submodules**: Enable this to avoid submodule warnings

## Troubleshooting

If build completes too quickly (< 5 seconds), it means Next.js build is not running:
- Check that Framework Preset is set to "Next.js"
- Verify package.json has the correct build script
- Check build logs for any errors

## Expected Build Time
A proper Next.js build should take 30-60 seconds, not 1 second.

