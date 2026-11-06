import { useState, useRef, useCallback } from 'react';

interface UseSwipeDownOptions {
  onClose: () => void;
  threshold?: number; // Distancia en px para activar el cierre (por defecto 60px)
}

/**
 * Hook para permitir deslizar hacia abajo (swipe down to dismiss) en modales y hojas inferiores.
 * Funciona de forma fluida con gestos táctiles en Android/iOS y con mouse en escritorio.
 */
export function useSwipeDownToClose({ onClose, threshold = 60 }: UseSwipeDownOptions) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const isTrackingRef = useRef(false);

  // --- Touch Event Handlers ---
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // No interceptar si el usuario tocó un botón o input
    const target = e.target as HTMLElement | null;
    if (target && target.closest('button, input, textarea, select, a, [role="button"]')) {
      return;
    }

    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    startXRef.current = touch.clientX;
    startTimeRef.current = Date.now();
    isTrackingRef.current = true;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isTrackingRef.current || isClosing) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - startYRef.current;
      const deltaX = touch.clientX - startXRef.current;

      // Solo permitir arrastre hacia abajo cuando el movimiento vertical predomina
      if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
        // Resistencia elástica a partir de 160px
        const adjustedY = deltaY > 160 ? 160 + (deltaY - 160) * 0.35 : deltaY;
        setDragY(adjustedY);
      } else if (deltaY < 0) {
        setDragY(0);
      }
    },
    [isClosing]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isTrackingRef.current || isClosing) return;
    isTrackingRef.current = false;
    setIsDragging(false);

    const elapsed = Date.now() - startTimeRef.current;
    const velocity = dragY / Math.max(elapsed, 1);
    const shouldClose = dragY >= threshold || (dragY > 30 && velocity > 0.35);

    if (shouldClose) {
      setIsClosing(true);
      setDragY(window.innerHeight || 600);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
        setDragY(0);
      }, 180);
    } else {
      setDragY(0);
    }
  }, [dragY, threshold, isClosing, onClose]);

  // --- Mouse Drag Handlers (para pruebas en navegador / desktop) ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, input, textarea, select, a, [role="button"]')) {
        return;
      }

      startYRef.current = e.clientY;
      startXRef.current = e.clientX;
      startTimeRef.current = Date.now();
      isTrackingRef.current = true;
      setIsDragging(true);

      const onMouseMove = (ev: MouseEvent) => {
        if (!isTrackingRef.current) return;
        const deltaY = ev.clientY - startYRef.current;
        const deltaX = ev.clientX - startXRef.current;
        if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
          const adjustedY = deltaY > 160 ? 160 + (deltaY - 160) * 0.35 : deltaY;
          setDragY(adjustedY);
        } else if (deltaY < 0) {
          setDragY(0);
        }
      };

      const onMouseUp = (ev: MouseEvent) => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        if (!isTrackingRef.current) return;
        isTrackingRef.current = false;
        setIsDragging(false);

        const deltaY = ev.clientY - startYRef.current;
        const elapsed = Date.now() - startTimeRef.current;
        const velocity = deltaY / Math.max(elapsed, 1);
        const shouldClose = deltaY >= threshold || (deltaY > 30 && velocity > 0.35);

        if (shouldClose) {
          setIsClosing(true);
          setDragY(window.innerHeight || 600);
          setTimeout(() => {
            onClose();
            setIsClosing(false);
            setDragY(0);
          }, 180);
        } else {
          setDragY(0);
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [threshold, onClose]
  );

  const modalStyle: React.CSSProperties = {
    transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
    transition: isDragging
      ? 'none'
      : isClosing
      ? 'transform 0.18s cubic-bezier(0.32, 1, 0.23, 1), opacity 0.18s ease-out'
      : 'transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1)',
    opacity: isClosing ? 0.3 : undefined,
    willChange: isDragging || isClosing ? 'transform, opacity' : undefined,
  };

  const dragHandleProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onMouseDown: handleMouseDown,
  };

  return {
    dragHandleProps,
    dragY,
    isDragging,
    isClosing,
    modalStyle,
  };
}
