'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-transaction-toast';

interface PWAInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWARegister() {
  const [isOnline, setIsOnline] = useState(true);
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          setSwRegistration(registration);
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
                  toast({
                    title: 'App Update Available',
                    description:
                      'A new version of KooPaa is available. Refresh to update.',
                    action: (
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                      >
                        Update Now
                      </button>
                    ),
                  });
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
  }, [toast]);

  useEffect(() => {
    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as PWAInstallPromptEvent;

      // Store the event for later use
      (window as any).deferredPrompt = promptEvent;

      toast({
        title: 'Install KooPaa',
        description: 'Add KooPaa to your home screen for quick access',
        action: (
          <button
            onClick={() => {
              if ((window as any).deferredPrompt) {
                (window as any).deferredPrompt.prompt();
                (window as any).deferredPrompt.userChoice.then(
                  (choiceResult: any) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the install prompt');
                    } else {
                      console.log('User dismissed the install prompt');
                    }
                    (window as any).deferredPrompt = null;
                  }
                );
              }
            }}
            className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
          >
            Install
          </button>
        ),
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, [toast]);

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
