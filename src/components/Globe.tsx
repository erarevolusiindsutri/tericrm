import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import createGlobe from 'cobe';

export const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phi = useRef(3.1);
  
  useEffect(() => {
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = Math.min(window.innerWidth, window.innerHeight) * 1.6;
      }
    }
    window.addEventListener('resize', onResize);
    onResize();
    
    if (!canvasRef.current) return;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phi.current,
      theta: -0.5,
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
        // Update phi based on drag interaction
        state.phi = phi.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{ 
            width: `${Math.min(window.innerWidth, window.innerHeight) * 1.6}px`,
            height: `${Math.min(window.innerWidth, window.innerHeight) * 1.6}px`,
            contain: 'layout paint size',
            opacity: 0.9,
            position: 'absolute',
            left: '50%',
            top: '70%',
            transform: 'translate(-50%, -50%)',
            cursor: pointerInteracting.current ? 'grabbing' : 'grab',
          }}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            canvasRef.current!.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
            // Store the final position
            phi.current = phi.current + pointerInteractionMovement.current;
            pointerInteractionMovement.current = 0;
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
            // Store the final position
            phi.current = phi.current + pointerInteractionMovement.current;
            pointerInteractionMovement.current = 0;
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
    </div>
  );
};