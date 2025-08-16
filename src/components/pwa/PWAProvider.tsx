'use client';

import { ReactNode } from 'react';
import { PWARegister } from './PWARegister';
import { PWAInstall } from './PWAInstall';
import { OfflinePage } from './OfflinePage';

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  return (
    <>
      {/* PWA Registration and Management */}
      <PWARegister />

      {/* PWA Install Prompt */}
      <PWAInstall />

      {/* Offline Page */}
      <OfflinePage />

      {/* Main App Content */}
      {children}
    </>
  );
}
