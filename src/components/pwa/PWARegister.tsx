'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PWAInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface ExtendedWindow extends Window {
  deferredPrompt?: PWAInstallPromptEvent;
}

export function PWARegister() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  toast.info(
                    'A new version of KooPaa is available. Refresh to update.',
                    {
                      action: {
                        label: 'Update Now',
                        onClick: () => window.location.reload(),
                      },
                    }
                  );
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as PWAInstallPromptEvent;

      // Store the event for later use
      (window as ExtendedWindow).deferredPrompt = promptEvent;

      toast.info('Add KooPaa to your home screen for quick access', {
        action: {
          label: 'Install',
          onClick: () => {
            const extendedWindow = window as ExtendedWindow;
            if (extendedWindow.deferredPrompt) {
              extendedWindow.deferredPrompt.prompt();
              extendedWindow.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
                } else {
                  console.log('User dismissed the install prompt');
                }
                extendedWindow.deferredPrompt = undefined;
              });
            }
          },
        },
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
        You are currently offline. Some features may be limited.
      </div>
    );
  }

  return null;
}
