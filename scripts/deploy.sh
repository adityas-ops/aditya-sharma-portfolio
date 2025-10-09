#!/bin/bash

echo "🚀 Starting deployment process..."

# Clean build
echo "🧹 Cleaning and building..."
npm run build:clean

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Show the generated files
    echo "📁 Generated files:"
    ls -la dist/assets/ | head -5
    
    # Check the HTML file for correct asset references
    echo "🔍 Checking HTML file..."
    grep -E "(script.*src|link.*href.*css)" dist/index.html
    
    echo ""
    echo "🚀 Ready for deployment!"
    echo "📝 Next steps:"
    echo "   1. Commit your changes: git add . && git commit -m 'Fix white screen and add debugging'"
    echo "   2. Push to deploy: git push origin main"
    echo "   3. Check Vercel dashboard for deployment status"
    echo ""
    echo "🔍 After deployment, check the console for debug logs to identify any remaining issues."
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
