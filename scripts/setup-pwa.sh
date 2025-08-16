#!/bin/bash

echo "🚀 Setting up KooPaa PWA Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# PWA Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PWA_ENABLED=true

# Add your other environment variables here
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

# Make scripts executable
chmod +x scripts/generate-sw.js

# Generate initial service worker
echo "🔧 Generating service worker..."
npm run generate-sw

echo ""
echo "🎉 PWA setup complete!"
echo ""
echo "Next steps:"
echo "1. Start development server: npm run dev"
echo "2. Build for production: npm run build:pwa"
echo "3. Test PWA features: npm run pwa:test"
echo "4. Build Android app with Bubblewrap"
echo ""
echo "📚 For detailed instructions, see PWA_BUILD_GUIDE.md"
echo ""
echo "Happy coding! 🚀" 