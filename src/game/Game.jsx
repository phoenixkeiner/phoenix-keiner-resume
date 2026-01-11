import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import kaplay from 'kaplay';
import { initMainScene } from './scenes/mainScene';

let globalGameInstance = null;

export default function Game() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (globalGameInstance || !canvasRef.current || !containerRef.current) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    
    let gameWidth, gameHeight;
    
    if (isMobile) {
      gameWidth = Math.min(window.innerWidth - 32, 500);
      gameHeight = Math.min(window.innerHeight - 200, 750);
    } else {
      const availableHeight = window.innerHeight - 300;
      gameHeight = Math.min(availableHeight, 800);
      gameWidth = Math.min(gameHeight * 0.75, 600);
    }

    const k = kaplay({
      width: gameWidth,
      height: gameHeight,
      canvas: canvasRef.current,
      background: [20, 20, 40],
      letterbox: false,
      stretch: false,
      debug: false,
      touchToMouse: true,
    });

    globalGameInstance = k;
    initMainScene(k, navigate);
    k.go("main");

    return () => {
      if (globalGameInstance) {
        try {
          globalGameInstance.quit();
        } catch (e) {
          console.log("Game cleanup");
        }
        globalGameInstance = null;
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="mb-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Phoenix's Career Journey</h1>
        <p className="text-sm md:text-base text-gray-300">
          <span className="hidden md:inline">Use WASD or Arrow Keys to move. Press SPACE to interact.</span>
          <span className="md:hidden">Drag to move. Tap NPCs to talk.</span>
        </p>
      </div>
      <div ref={containerRef} className="flex justify-center items-center flex-1 w-full">
        <canvas 
          ref={canvasRef} 
          className="border-4 border-purple-500 rounded-lg shadow-2xl"
          style={{ 
            touchAction: 'none',
            imageRendering: 'pixelated',
            display: 'block',
          }}
        />
      </div>
      <div className="mt-3 flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 md:px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
        >
          Back to Resume
        </button>
      </div>
      <div className="mt-2 text-center text-gray-400 text-xs md:text-sm max-w-md px-4">
        <p className="hidden md:block">Mobile: Drag your finger to move. Tap NPCs or dialogue to interact.</p>
        <p className="md:hidden">Drag to move around. Tap characters to learn about Phoenix's career!</p>
      </div>
    </div>
  );
}