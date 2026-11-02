import React, { useState, useEffect } from 'react';

interface MoonStatusBarProps {
  currentPage: number;
  totalPages: number;
  bookTitle: string;
  visible?: boolean;
}

export const MoonStatusBar: React.FC<MoonStatusBarProps> = ({
  currentPage,
  totalPages,
  bookTitle,
  visible = true,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  // Real-time clock formatted as HH:mm
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Battery status API (Supported in Android Chrome / WebView / modern browsers)
  useEffect(() => {
    let batteryInstance: any = null;
    let updateBattery: (() => void) | null = null;

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      try {
        (navigator as any).getBattery().then((battery: any) => {
          batteryInstance = battery;
          updateBattery = () => {
            setBatteryLevel(Math.round(battery.level * 100));
          };
          updateBattery();
          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
        }).catch(() => {
          // Battery API blocked or unsupported
        });
      } catch (err) {
        // Battery API threw synchronously in restricted environment
      }
    }

    return () => {
      if (batteryInstance && updateBattery) {
        try {
          batteryInstance.removeEventListener('levelchange', updateBattery);
          batteryInstance.removeEventListener('chargingchange', updateBattery);
        } catch (e) {}
      }
    };
  }, []);

  if (!visible) return null;

  const progressPercent = totalPages > 0 ? ((currentPage / totalPages) * 100).toFixed(1) : '0.0';
  const displayBattery = batteryLevel !== null ? batteryLevel : 85;

  return (
    <div className="w-full pointer-events-none select-none text-[10px] sm:text-[11px] font-mono tracking-tight px-3 py-1 flex items-center justify-between border-t border-black/10 dark:border-white/10 text-slate-700 dark:text-zinc-300 font-medium transition-colors">
      {/* Left: Battery & Clock */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span>&#123;{displayBattery}&#125;</span>
        <span>{currentTime}</span>
      </div>

      {/* Center: Book title & Page fraction */}
      <div className="flex-1 text-center truncate px-2 font-sans font-semibold tracking-wide uppercase text-[9.5px] sm:text-[10.5px]">
        {bookTitle} ({currentPage}/{totalPages})
      </div>

      {/* Right: Progress percentage */}
      <div className="shrink-0 font-bold text-[10px] sm:text-[11px]">
        {progressPercent}%
      </div>
    </div>
  );
};
