# Deploy to GitHub Pages
Write-Host "🚀 Deploying Place of Grace website to GitHub Pages..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Create gh-pages branch
Write-Host "🌿 Creating gh-pages branch..." -ForegroundColor Yellow
git checkout --orphan gh-pages

# Remove all files except build
Write-Host "🧹 Cleaning gh-pages branch..." -ForegroundColor Yellow
git rm -rf .
git clean -fd

# Copy build files to root
Write-Host "📁 Copying build files..." -ForegroundColor Yellow
Copy-Item -Path "build\*" -Destination "." -Recurse -Force

# Add all files
Write-Host "➕ Adding files to git..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push origin gh-pages --force

# Go back to main branch
Write-Host "🔄 Switching back to main branch..." -ForegroundColor Yellow
git checkout main

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your website will be available at: https://sirbyrone.github.io/place-of-grace" -ForegroundColor Cyan
Write-Host "⏰ It may take a few minutes for changes to appear." -ForegroundColor Yellow
