'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, RefreshCw, Home } from 'lucide-react';

export function OfflinePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (isOnline) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-white text-xl">You're Offline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-center text-sm">
            It looks like you've lost your internet connection. Don't worry,
            some features of KooPaa are still available offline.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>View cached savings groups</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Access offline features</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Blockchain transactions</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleRetry}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={retryCount > 3}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${retryCount > 3 ? 'animate-spin' : ''}`}
              />
              {retryCount > 3 ? 'Retrying...' : 'Retry Connection'}
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {retryCount > 0 && (
            <p className="text-xs text-gray-400 text-center">
              Retry attempt: {retryCount}/3
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
