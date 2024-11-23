import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const locationToAngles = (lat: number, long: number) => {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
};

export const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const lastTime = useRef(Date.now());
  const focusRef = useRef<[number, number]>([0, 0]);
  const isTransitioning = useRef(false);
  const lastRotationPosition = useRef(0);
  
  // Calculate initial angles for Jakarta
  const [initialPhi, initialTheta] = locationToAngles(-6.2088, 106.8456);
  const autoRotationSpeed = -0.00002; // Very slow rotation
  
  useEffect(() => {
    let width = 0;
    let currentPhi = initialPhi;
    let currentTheta = initialTheta;
    let currentScale = 1;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = Math.min(window.innerWidth, window.innerHeight) * 1.8;
      }
    }
    window.addEventListener('resize', onResize);
    onResize();

    // Make focusRef globally accessible
    (window as any).globeFocusRef = focusRef;
    
    if (!canvasRef.current) return;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: currentPhi,
      theta: currentTheta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.2, 0.2, 0.2],
      markers: [
        { location: [-6.2088, 106.8456], size: 0.08 }, // Jakarta
        { location: [-7.2575, 112.7521], size: 0.06 }, // Surabaya
        { location: [-6.9175, 107.6191], size: 0.06 }, // Bandung
        { location: [-5.1477, 119.4327], size: 0.06 }, // Makassar
        { location: [-0.9433, 100.3714], size: 0.06 }, // Padang
      ],
      onRender: (state) => {
        const currentTime = Date.now();
        const delta = currentTime - lastTime.current;
        lastTime.current = currentTime;

        // Handle focus transitions
        const [targetPhi, targetTheta] = focusRef.current;
        if (targetPhi !== 0 || targetTheta !== 0) {
          isTransitioning.current = true;
          const phiDist = targetPhi - currentPhi;
          const thetaDist = targetTheta - currentTheta;
          
          currentPhi += phiDist * 0.08;
          currentTheta += thetaDist * 0.08;

          if (Math.abs(phiDist) < 0.001 && Math.abs(thetaDist) < 0.001) {
            focusRef.current = [0, 0];
            isTransitioning.current = false;
            lastRotationPosition.current = currentPhi;
          }
        } else if (pointerInteracting.current !== null) {
          // Update position during drag
          currentPhi = lastRotationPosition.current + pointerInteractionMovement.current;
        } else if (!isTransitioning.current) {
          // Auto-rotation from last position
          currentPhi += delta * autoRotationSpeed;
          lastRotationPosition.current = currentPhi;
        }

        state.phi = currentPhi;
        state.theta = currentTheta;
        state.width = width * 2;
        state.height = width * 2;
        state.scale = currentScale;
      }
    });

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      currentScale = Math.min(Math.max(currentScale + delta, 0.8), 1.5);
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
      <canvas
        ref={canvasRef}
        style={{ 
          width: `${Math.min(window.innerWidth, window.innerHeight) * 1.8}px`,
          height: `${Math.min(window.innerWidth, window.innerHeight) * 1.8}px`,
          maxWidth: 'none',
          maxHeight: 'none',
          cursor: pointerInteracting.current ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grabbing';
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          lastRotationPosition.current += pointerInteractionMovement.current;
          pointerInteractionMovement.current = 0;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grab';
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          lastRotationPosition.current += pointerInteractionMovement.current;
          pointerInteractionMovement.current = 0;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grab';
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
      />
    </div>
  );
};