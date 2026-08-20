import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isInitialized = useRef(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch or coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default cursor on desktop when custom cursor is active
    document.body.classList.add('custom-cursor-enabled');

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isInitialized.current) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        isInitialized.current = true;
      }

      setIsVisible(true);

      // Check if hovering over clickable or interactive elements
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover, [data-hover]')
        );
        setIsHovered(isClickable);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Ultra-smooth 60/120fps direct DOM animation loop without React state re-renders
    const render = () => {
      const ease = 0.2; // Smooth lerp coefficient
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Lerp Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 border-2 border-[#5ce1e6] bg-[#5ce1e6]/10 shadow-[0_0_25px_rgba(92,225,230,0.6)] backdrop-blur-[1px] scale-110'
            : isMouseDown
            ? 'w-8 h-8 border border-[#4c8dff] bg-[#4c8dff]/20 shadow-[0_0_15px_rgba(76,141,255,0.5)] scale-90'
            : 'w-10 h-10 border border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_12px_rgba(92,225,230,0.25)] scale-100'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        {isHovered && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6] animate-ping" />
        )}
      </div>

      {/* Inner Direct Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none bg-gradient-to-tr from-[#5ce1e6] to-[#4c8dff] transition-all duration-100 shadow-[0_0_10px_#5ce1e6] ${
          isHovered ? 'w-3 h-3 bg-white shadow-[0_0_16px_#5ce1e6]' : 'w-2 h-2'
        }`}
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
};
