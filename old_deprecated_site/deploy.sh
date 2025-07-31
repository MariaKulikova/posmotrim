#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "gh-pages branch exists"
else
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Initial gh-pages commit"
  git checkout main
fi

# Copy dist contents to a temporary directory
echo "Preparing deployment..."
cp -r dist /tmp/setify-dist

# Switch to gh-pages branch
git checkout gh-pages

# Remove all existing files
git rm -rf .

# Copy files from dist
cp -r /tmp/setify-dist/* .

# Add .nojekyll file
touch .nojekyll

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "Deployment complete! Your site should be available at your GitHub Pages URL."