import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { useEffect, useRef } from 'react';

export type BackButtonHandler = () => boolean;

interface RegisteredHandler {
  id: string;
  priority: number;
  timestamp: number;
  handler: BackButtonHandler;
}

const handlers: RegisteredHandler[] = [];
let isListenerAttached = false;
let lastBackPressTime = 0;
let exitToastListeners: Set<(visible: boolean) => void> = new Set();
let toastTimeout: any = null;

export const subscribeExitToast = (callback: (visible: boolean) => void) => {
  exitToastListeners.add(callback);
  return () => {
    exitToastListeners.delete(callback);
  };
};

const notifyToast = (visible: boolean) => {
  exitToastListeners.forEach(cb => cb(visible));
};

export const registerBackButtonHandler = (
  id: string,
  priority: number,
  handler: BackButtonHandler
) => {
  // Remove existing with same id if any
  const existingIdx = handlers.findIndex(h => h.id === id);
  if (existingIdx !== -1) {
    handlers.splice(existingIdx, 1);
  }

  handlers.push({
    id,
    priority,
    timestamp: Date.now(),
    handler,
  });

  // Sort descending by priority, then newest first
  handlers.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return b.timestamp - a.timestamp;
  });

  ensureListenerAttached();

  return () => {
    const removeIdx = handlers.findIndex(h => h.id === id);
    if (removeIdx !== -1) {
      handlers.splice(removeIdx, 1);
    }
  };
};

export const handleBackPress = () => {
  // 1. Iterate through registered handlers by priority/LIFO
  for (const item of [...handlers]) {
    try {
      const handled = item.handler();
      if (handled) {
        // Event was consumed, stop here
        return true;
      }
    } catch (err) {
      console.error(`[BackButton] Error in handler ${item.id}:`, err);
    }
  }

  // 2. If no handler consumed the event, we are on the main library screen
  const now = Date.now();
  if (now - lastBackPressTime < 2000) {
    // Second back press within 2 seconds -> exit app
    if (Capacitor.isNativePlatform()) {
      CapApp.exitApp();
    }
    return false;
  } else {
    // First back press -> show warning toast
    lastBackPressTime = now;
    notifyToast(true);
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      notifyToast(false);
    }, 2000);
    return false;
  }
};

const ensureListenerAttached = () => {
  if (isListenerAttached) return;
  isListenerAttached = true;

  if (Capacitor.isNativePlatform()) {
    CapApp.addListener('backButton', () => {
      handleBackPress();
    });
  }

  // Also support desktop Escape key for closing menus/modals
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // On Escape, only trigger if handlers consume it (don't exit app on desktop)
        for (const item of [...handlers]) {
          try {
            const handled = item.handler();
            if (handled) {
              e.preventDefault();
              return;
            }
          } catch (err) {
            console.error(`[BackButton] Error on escape in handler ${item.id}:`, err);
          }
        }
      }
    });
  }
};

// React hook to easily register a back button action
export function useBackHandler(
  handler: () => boolean,
  priority: number = 10,
  enabled: boolean = true
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const id = Math.random().toString(36).substring(2, 9);
    return registerBackButtonHandler(id, priority, () => handlerRef.current());
  }, [enabled, priority]);
}
