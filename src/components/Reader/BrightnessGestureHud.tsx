import React from 'react';
import { Sun } from 'lucide-react';

interface BrightnessGestureHudProps {
  visible: boolean;
  brightness: number; // 20 to 100
}

export const BrightnessGestureHud: React.FC<BrightnessGestureHudProps> = ({
  visible,
  brightness,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none bg-black/85 backdrop-blur-md text-white border border-white/20 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
      <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
      
      {/* Vertical level bar */}
      <div className="w-2.5 h-24 bg-white/20 rounded-full overflow-hidden flex flex-col justify-end">
        <div
          className="w-full bg-amber-400 rounded-full transition-all duration-75"
          style={{ height: `${brightness}%` }}
        />
      </div>

      <span className="text-xs font-bold font-mono tracking-wider text-amber-300">
        {brightness}%
      </span>
    </div>
  );
};
