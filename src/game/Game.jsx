import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import kaplay from 'kaplay';
import { initMainScene } from './scenes/mainScene';

export default function Game() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const gameInstanceRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !canvasRef.current) {
      return;
    }

    isInitialized.current = true;

    const k = kaplay({
      width: 800,
      height: 600,
      canvas: canvasRef.current,
      background: [20, 20, 40],
      scale: 1,
      letterbox: true,
      debug: false,
    });

    gameInstanceRef.current = k;
    initMainScene(k, navigate);
    k.go("main");

    return () => {
      if (gameInstanceRef.current) {
        try {
          gameInstanceRef.current.quit();
        } catch (e) {
          console.log("Game cleanup");
        }
        gameInstanceRef.current = null;
        isInitialized.current = false;
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Phoenix's Career Journey</h1>
        <p className="text-gray-300">Use WASD or Arrow Keys to move. Press SPACE to interact.</p>
      </div>
      <canvas ref={canvasRef} className="border-4 border-purple-500 rounded-lg shadow-2xl" />
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          Back to Resume
        </button>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm max-w-md">
        <p>Mobile: Tap and hold to move. Tap NPCs to talk.</p>
      </div>
    </div>
  );
}