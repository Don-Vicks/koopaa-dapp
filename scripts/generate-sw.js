#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Generating optimized service worker...');

// Read the source service worker
const swSource = fs.readFileSync(
  path.join(__dirname, '../public/sw.js'),
  'utf8'
);

// Add build timestamp and version
const buildInfo = `// Generated on: ${new Date().toISOString()}
// Build version: ${process.env.npm_package_version || '1.0.0'}
// Environment: ${process.env.NODE_ENV || 'production'}

`;

// Optimize the service worker for production
const optimizedSW =
  buildInfo +
  swSource
    .replace(/console\.log\(/g, '// console.log(') // Comment out console logs in production
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Minimize whitespace
    .trim();

// Write the optimized service worker
fs.writeFileSync(path.join(__dirname, '../public/sw.js'), optimizedSW);

console.log('✅ Service worker generated successfully!');
console.log('📱 PWA is ready for production build');

// Generate a simple offline page if it doesn't exist
const offlinePagePath = path.join(__dirname, '../public/offline.html');
if (!fs.existsSync(offlinePagePath)) {
  const offlineHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KooPaa - Offline</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
            color: white; 
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            text-align: center; 
            max-width: 400px; 
        }
        .icon { 
            font-size: 4rem; 
            margin-bottom: 1rem; 
        }
        h1 { 
            margin-bottom: 1rem; 
            color: #6366f1; 
        }
        p { 
            margin-bottom: 2rem; 
            opacity: 0.8; 
        }
        button { 
            background: #6366f1; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 16px; 
        }
        button:hover { 
            background: #5855eb; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">📱</div>
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Don't worry, some features of KooPaa are still available offline.</p>
        <button onclick="window.location.reload()">Try Again</button>
    </div>
</body>
</html>`;

  fs.writeFileSync(offlinePagePath, offlineHTML);
  console.log('📄 Offline page generated');
}

console.log('🎉 PWA setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Run: npm run build:pwa');
console.log('2. Test PWA features');
console.log('3. Deploy to production');
console.log('4. Use Bubblewrap to build Android app');
