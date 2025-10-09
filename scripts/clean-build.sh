#!/bin/bash

# Clean build script to prevent asset loading issues
echo "🧹 Cleaning previous build..."
rm -rf dist

echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Generated files:"
ls -la dist/assets/ | head -10

echo ""
echo "🚀 Ready for deployment!"
