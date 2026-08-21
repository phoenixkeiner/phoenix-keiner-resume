import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kaplay from 'kaplay';
import { initMainScene } from './scenes/mainScene';

let globalGameInstance = null;
const MAX_JOY = 48;

export default function Game() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const joystickRef = useRef({ x: 0, y: 0 });
  const interactRef = useRef(null);

  const [joyBase, setJoyBase] = useState(null);
  const [joyDelta, setJoyDelta] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (globalGameInstance || !canvasRef.current) return;

    const isMobile = window.innerWidth < 768;
    let gameWidth, gameHeight;

    if (isMobile) {
      gameWidth = Math.min(window.innerWidth - 16, 420);
      gameHeight = Math.min(window.innerHeight - 200, 640);
    } else {
      const availH = window.innerHeight - 180;
      gameHeight = Math.min(availH, 700);
      gameWidth = Math.min(Math.round(gameHeight * 0.72), 504);
    }

    const k = kaplay({
      width: gameWidth,
      height: gameHeight,
      canvas: canvasRef.current,
      background: [120, 175, 230],
      letterbox: false,
      stretch: false,
      debug: false,
      touchToMouse: false,
      crisp: true,
    });

    globalGameInstance = k;
    initMainScene(k, navigate, joystickRef, interactRef);
    k.go('main');

    return () => {
      if (globalGameInstance) {
        try { globalGameInstance.quit(); } catch {}
        globalGameInstance = null;
      }
    };
  }, [navigate]);

  function onTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setJoyBase({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setJoyDelta({ x: 0, y: 0 });
    joystickRef.current = { x: 0, y: 0 };
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (!joyBase) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (touch.clientX - rect.left) - joyBase.x;
    const dy = (touch.clientY - rect.top) - joyBase.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clamped = Math.min(dist, MAX_JOY);
    const angle = Math.atan2(dy, dx);
    setJoyDelta({ x: Math.cos(angle) * clamped, y: Math.sin(angle) * clamped });
    joystickRef.current = {
      x: Math.cos(angle) * (clamped / MAX_JOY),
      y: Math.sin(angle) * (clamped / MAX_JOY),
    };
  }

  function onTouchEnd(e) {
    e.preventDefault();
    setJoyBase(null);
    setJoyDelta({ x: 0, y: 0 });
    joystickRef.current = { x: 0, y: 0 };
  }

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center pt-4 px-2 pb-6 gap-3">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          Phoenix's Career Journey
        </h1>
        <p className="text-xs text-white/40 hidden md:block mt-0.5">
          WASD / Arrow Keys to move · SPACE or click to interact
        </p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-2 border-brand-orange/30 rounded-lg shadow-2xl block"
          style={{ touchAction: 'none', imageRendering: 'pixelated' }}
        />
        <div
          className="absolute inset-0 md:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'none' }}
        >
          {joyBase && (
            <>
              <div
                className="absolute rounded-full border-2 border-white/20 bg-white/5 pointer-events-none"
                style={{
                  width: MAX_JOY * 2,
                  height: MAX_JOY * 2,
                  left: joyBase.x - MAX_JOY,
                  top: joyBase.y - MAX_JOY,
                }}
              />
              <div
                className="absolute rounded-full bg-white/40 border-2 border-white/70 pointer-events-none"
                style={{
                  width: 26,
                  height: 26,
                  left: joyBase.x + joyDelta.x - 13,
                  top: joyBase.y + joyDelta.y - 13,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-lg text-sm font-medium transition-colors"
        >
          ← Resume
        </button>
        <button
          className="md:hidden px-7 py-2 bg-brand-orange hover:bg-brand-rust text-white rounded-lg font-bold text-base transition-colors"
          onTouchStart={(e) => { e.preventDefault(); interactRef.current?.(); }}
          style={{ touchAction: 'none' }}
        >
          TALK
        </button>
        <span className="md:hidden text-xs text-white/30">Drag anywhere to move</span>
      </div>
    </div>
  );
}
