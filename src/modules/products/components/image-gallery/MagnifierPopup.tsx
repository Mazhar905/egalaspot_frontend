import React from 'react';

type MagnifierPopupProps = {
  src: string;
  position: { x: number; y: number; mouseX: number; mouseY: number };
  zoomLevel: number;
  size: { width: number; height: number };
  visible: boolean;
};

const MAGNIFIER_SIZE = 200; // Adjust the size of the magnifier popup

const MagnifierPopup = ({ src, position, zoomLevel, size, visible }: MagnifierPopupProps) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.mouseY}px`,
        left: `${position.mouseX + MAGNIFIER_SIZE / 2}px`,
        width: `${MAGNIFIER_SIZE}px`,
        height: `${MAGNIFIER_SIZE}px`,
        borderRadius: '50%',
        background: `url(${src}) no-repeat`,
        backgroundSize: `${size.width * zoomLevel}px ${size.height * zoomLevel}px`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        pointerEvents: 'none',
        border: '2px solid #000',
        boxShadow: '0 0 5px rgba(0,0,0,0.5)',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    />
  );
};

export default MagnifierPopup;
