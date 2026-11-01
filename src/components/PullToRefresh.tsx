import React, { useState, useRef } from 'react';
import { ArrowDown, Loader2, CheckCircle2 } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<{ verifiedFiles: number; totalBooks: number } | void>;
  children: React.ReactNode;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const touchStateRef = useRef<{
    startY: number;
    isPulling: boolean;
    hasVibrated: boolean;
  }>({
    startY: 0,
    isPulling: false,
    hasVibrated: false,
  });

  const THRESHOLD = 60; // px threshold to trigger refresh

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isRefreshing) return;

    const container = containerRef.current;
    if (!container || container.scrollTop > 5) {
      touchStateRef.current.isPulling = false;
      return;
    }

    touchStateRef.current = {
      startY: e.touches[0].clientY,
      isPulling: true,
      hasVibrated: false,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStateRef.current.isPulling || isRefreshing) return;

    const container = containerRef.current;
    if (container && container.scrollTop > 5) {
      touchStateRef.current.isPulling = false;
      setPullDistance(0);
      return;
    }

    const currentY = e.touches[0].clientY;
    const rawDeltaY = currentY - touchStateRef.current.startY;

    if (rawDeltaY > 0) {
      // Damped resistance curve
      const distance = Math.min(85, Math.pow(rawDeltaY, 0.8) * 1.5);
      setPullDistance(distance);

      // Light haptic feedback on Android when crossing the trigger threshold
      if (distance >= THRESHOLD && !touchStateRef.current.hasVibrated) {
        touchStateRef.current.hasVibrated = true;
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(15);
          } catch {}
        }
      }
    } else {
      setPullDistance(0);
    }
  };

  const handleTouchEnd = async () => {
    if (!touchStateRef.current.isPulling || isRefreshing) return;
    touchStateRef.current.isPulling = false;

    if (pullDistance >= THRESHOLD) {
      // Trigger refresh
      setIsRefreshing(true);
      setPullDistance(52); // Keep indicator visible during refresh
      setStatusMessage('Verificando archivos y biblioteca...');

      try {
        const result = await onRefresh();
        setIsSuccess(true);
        if (result && typeof result === 'object' && 'totalBooks' in result) {
          setStatusMessage(`¡${result.totalBooks} obras verificadas!`);
        } else {
          setStatusMessage('¡Biblioteca actualizada!');
        }

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(25);
          } catch {}
        }

        // Wait to show success state before retracting
        setTimeout(() => {
          setIsRefreshing(false);
          setIsSuccess(false);
          setPullDistance(0);
          setStatusMessage('');
        }, 800);
      } catch (err) {
        console.error('Pull to refresh failed:', err);
        setIsRefreshing(false);
        setPullDistance(0);
        setStatusMessage('');
      }
    } else {
      // Snap back if released before threshold
      setPullDistance(0);
    }
  };

  // Mouse drag support for testing on desktop / browser
  const mouseStateRef = useRef<{ isDown: boolean; startY: number }>({ isDown: false, startY: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRefreshing) return;
    const container = containerRef.current;
    if (!container || container.scrollTop > 5) return;

    mouseStateRef.current = { isDown: true, startY: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseStateRef.current.isDown || isRefreshing) return;
    const rawDeltaY = e.clientY - mouseStateRef.current.startY;
    if (rawDeltaY > 0) {
      const distance = Math.min(85, Math.pow(rawDeltaY, 0.8) * 1.5);
      setPullDistance(distance);
    }
  };

  const handleMouseUp = () => {
    if (!mouseStateRef.current.isDown) return;
    mouseStateRef.current.isDown = false;
    handleTouchEnd();
  };

  const progressRatio = Math.min(1, pullDistance / THRESHOLD);
  const arrowRotation = progressRatio * 180;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      id="library-scroll-container"
      className={`relative overflow-y-auto overflow-x-hidden ${className}`}
    >
      {/* Pull-to-refresh Visual Indicator Badge */}
      <div
        className="w-full flex items-center justify-center pointer-events-none transition-all duration-150 overflow-hidden"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 10 ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#061a12]/95 border border-rose-200/80 dark:border-emerald-800/80 shadow-md text-xs font-semibold backdrop-blur-md">
          {isRefreshing ? (
            isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-in zoom-in-75 duration-150 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-rose-500 dark:text-emerald-400 animate-spin shrink-0" />
            )
          ) : (
            <div
              className="p-1 rounded-full bg-rose-50 dark:bg-emerald-950/60 text-rose-600 dark:text-emerald-400 shrink-0 transition-transform duration-150"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          )}

          <span className="text-[11.5px] text-[#4c0519] dark:text-[#ecfdf5] font-medium truncate">
            {isRefreshing
              ? statusMessage
              : pullDistance >= THRESHOLD
              ? 'Suelta para verificar archivos'
              : 'Desliza para actualizar biblioteca'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="transition-transform duration-100 ease-out"
        style={{
          transform: isRefreshing ? `translateY(4px)` : `translateY(${pullDistance * 0.2}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
