# KooPaa PWA Build Guide

This guide will walk you through building KooPaa as a Progressive Web App (PWA) and creating an Android app using Bubblewrap.

## 🚀 PWA Features

- **Offline Support**: Cache-based offline functionality
- **Install Prompt**: Native app installation experience
- **Push Notifications**: Real-time updates and alerts
- **Background Sync**: Data synchronization when online
- **Responsive Design**: Optimized for all device sizes
- **Fast Loading**: Advanced caching strategies

## 📱 PWA Components

### 1. Service Worker (`public/sw.js`)

- Handles caching strategies
- Manages offline functionality
- Processes push notifications
- Background sync capabilities

### 2. Web App Manifest (`public/manifest.json`)

- App metadata and configuration
- Icon definitions
- Theme colors and display settings
- App shortcuts

### 3. PWA Components

- `PWAInstall`: Installation prompt component
- `PWARegister`: Service worker registration
- `OfflinePage`: Offline experience component

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio (for Bubblewrap)
- Java Development Kit (JDK) 11+

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_PWA_ENABLED=true
```

### 3. Development Server

```bash
npm run dev
# or
yarn dev
```

The PWA features are disabled in development mode for better debugging.

## 🏗️ Building for Production

### 1. Build the PWA

```bash
npm run build
# or
yarn build
```

### 2. Test PWA Features

```bash
npm run start
# or
yarn start
```

Visit your app and test:

- Install prompt
- Offline functionality
- Service worker registration
- Caching behavior

## 📱 Building Android App with Bubblewrap

### 1. Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

### 2. Initialize Bubblewrap Project

```bash
bubblewrap init --manifest https://your-domain.com/manifest.json
```

### 3. Configure Build Settings

Edit `bubblewrap.json`:

- Update `webManifestUrl` to your actual domain
- Modify `packageId` if needed
- Adjust signing key settings

### 4. Build Android App

```bash
bubblewrap build
```

### 5. Generate APK

```bash
bubblewrap build --apk
```

### 6. Generate App Bundle (for Play Store)

```bash
bubblewrap build --aab
```

## 🔧 Advanced Configuration

### Customizing Service Worker

Edit `public/sw.js` to modify:

- Caching strategies
- Offline behavior
- Push notification handling

### PWA Manifest Customization

Update `public/manifest.json` for:

- App branding
- Icon sizes
- Theme colors
- App shortcuts

### Next.js PWA Configuration

Modify `next.config.ts` to adjust:

- Caching patterns
- Service worker behavior
- PWA features

## 🧪 Testing PWA Features

### 1. Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

### 2. Chrome DevTools

- Application tab for PWA features
- Service Workers panel
- Manifest viewer
- Storage inspection

### 3. PWA Testing Checklist

- [ ] App installs correctly
- [ ] Offline functionality works
- [ ] Service worker registers
- [ ] Caching strategies effective
- [ ] Push notifications functional
- [ ] App shortcuts accessible

## 🚀 Deployment

### 1. Build Production Version

```bash
npm run build
```

### 2. Deploy to Hosting

- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Custom server

### 3. Update Bubblewrap Configuration

Update `bubblewrap.json` with your production domain:

```json
{
  "webManifestUrl": "https://your-production-domain.com/manifest.json"
}
```

### 4. Rebuild Android App

```bash
bubblewrap build --apk
bubblewrap build --aab
```

## 📊 Performance Optimization

### 1. Image Optimization

- Use Next.js Image component
- Implement lazy loading
- Optimize icon sizes

### 2. Caching Strategies

- Static assets: Cache First
- API calls: Network First
- Images: Stale While Revalidate

### 3. Bundle Optimization

- Code splitting
- Tree shaking
- Dynamic imports

## 🔒 Security Considerations

### 1. HTTPS Required

PWA features only work over HTTPS in production.

### 2. Content Security Policy

Implement CSP headers for security:

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
  },
];
```

### 3. Service Worker Security

- Validate cached content
- Implement integrity checks
- Secure offline data

## 🐛 Troubleshooting

### Common Issues

#### Service Worker Not Registering

- Check HTTPS requirement
- Verify file path (`/sw.js`)
- Check browser console for errors

#### Install Prompt Not Showing

- Ensure PWA criteria met
- Check manifest.json validity
- Verify service worker registration

#### Offline Functionality Not Working

- Check service worker cache
- Verify offline page routing
- Test caching strategies

#### Bubblewrap Build Failures

- Verify Java JDK installation
- Check Android SDK setup
- Ensure manifest.json accessible

### Debug Commands

```bash
# Check service worker status
navigator.serviceWorker.getRegistrations()

# Clear all caches
caches.keys().then(names => names.forEach(name => caches.delete(name)))

# Test offline mode
Chrome DevTools → Network → Offline
```

## 📚 Additional Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [Next.js PWA Plugin](https://www.npmjs.com/package/next-pwa)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## 🎯 Next Steps

1. **Customize Branding**: Update icons, colors, and app name
2. **Implement Push Notifications**: Set up notification service
3. **Add Offline Features**: Enhance offline user experience
4. **Performance Monitoring**: Implement analytics and monitoring
5. **User Testing**: Gather feedback on PWA experience

---

For support or questions, please refer to the project documentation or create an issue in the repository.
