import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const xTo = gsap.quickTo('.cursor-ring', 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo('.cursor-ring', 'y', { duration: 0.4, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      gsap.set('.cursor-dot', { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to('.cursor-dot', { scale: 0.5, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to('.cursor-dot', { scale: 1, duration: 0.1 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.hover === 'true' ||
        target.classList.contains('hover-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="cursor-dot" />
      <div className={`cursor-ring ${isHovered ? 'hovered' : ''}`} />
    </>
  );
}

export default Cursor;
