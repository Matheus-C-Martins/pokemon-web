# GitHub Pages Deployment Setup

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Initial Setup Required

After pushing this code to GitHub, you need to configure GitHub Pages:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically run on every push to `main`

## How It Works

The deployment workflow (`.github/workflows/deploy.yml`) will:
- Trigger on every push to the `main` branch
- Install dependencies
- Build the production bundle
- Deploy to GitHub Pages automatically

## Accessing Your Game

Once deployed, your game will be available at:
```
https://<your-username>.github.io/pokemon-web/
```

## Manual Deployment

You can also trigger a manual deployment:
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Important Notes

- The `base` path in `vite.config.ts` is set to `/pokemon-web/`
- If you rename your repository, update the `base` in `vite.config.ts`
- The `.nojekyll` file prevents GitHub from processing files through Jekyll
