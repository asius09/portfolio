"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useFont, FontOption } from "@/hooks/use-font";
import { cn } from "@/lib/utils";

/** Interaction physics mode for cursor proximity */
export type InteractiveMode = "repel" | "attract" | "vortex" | "ripple";

/** Geometric shape of individual dot particles */
export type ParticleShape = "dot" | "square";

/**
 * Configuration props for the DottedWordmark component.
 */
export interface DottedWordmarkProps {
  /** Text rendered as a generative dot matrix (default: "asius") */
  text?: string;
  /** Optional CSS class name for the wrapper element */
  className?: string;
  /** Custom font family override (defaults to current theme font) */
  fontFamily?: string;
  /** Typography weight used during glyph rasterization (default: 700) */
  fontWeight?: number | string;
  /** Base typography raster size in virtual coordinate space (default: 500) */
  fontSize?: number;
  /** Scale factor applied to the wordmark size (default: 1.0) */
  scale?: number;
  /** Matrix sampling density; higher values produce tighter dot pitch (default: 1.5) */
  density?: number;
  /** Particle dot radius in virtual pixels (default: 3) */
  dotSize?: number;
  /** Geometry rendered for each matrix particle (default: "dot") */
  shape?: ParticleShape;
  /** Whether mouse hover physics and click dispersion are enabled (default: true) */
  interactive?: boolean;
  /** Cursor interaction physics behavior (default: "repel") */
  interactiveMode?: InteractiveMode;
  /** Multiplier for cursor interaction forces (default: 1.0) */
  interactiveIntensity?: number;
  /** Whether to render the ambient background matrix grid (default: true) */
  showBackgroundGrid?: boolean;
  /** Custom dot color override (defaults to theme-aware foreground) */
  color?: string;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface BgGridDot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
}

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

interface BufferDimensions {
  width: number;
  height: number;
}

const FONT_MAP: Record<FontOption, string> = {
  zain: "Zain",
  outfit: "Outfit",
  geist: "Geist, 'Geist Sans'",
  inter: "Inter",
  schibsted: "Schibsted Grotesk",
};

/**
 * Resolves standard CSS font shorthand for Canvas2D text rendering.
 */
function resolveFontString(
  fontId: FontOption,
  customFamily?: string,
  fontWeight: number | string = 700,
  fontSize: number = 500,
): string {
  const family = customFamily ?? FONT_MAP[fontId] ?? "Zain";
  return `${fontWeight} ${fontSize}px ${family}, sans-serif`;
}

/**
 * Interactive generative dot-matrix typography component.
 * Features optical bounding-box centering, batched Canvas2D draw calls,
 * spring-damper cursor physics, and zero-idle CPU sleep.
 */
export const DottedWordmark: React.FC<DottedWordmarkProps> = ({
  text = "asius",
  className,
  fontFamily,
  fontWeight = 700,
  fontSize = 500,
  scale = 1.0,
  density = 1.5,
  dotSize = 3,
  shape = "dot",
  interactive = true,
  interactiveMode = "repel",
  interactiveIntensity = 1.0,
  showBackgroundGrid = true,
  color: customColor,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const { font } = useFont();
  const [mounted, setMounted] = useState<boolean>(false);

  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, active: false });
  const lastClickRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const bgGridRef = useRef<BgGridDot[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const entranceStartRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);
  const bufferDimensionsRef = useRef<BufferDimensions>({ width: 1920, height: 640 });

  const wakeLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    setMounted(true);
    isReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /**
   * Rasterizes text onto an offscreen canvas and computes particle grid positions.
   */
  const initMatrix = useCallback(
    (containerW: number, containerH: number, activeFont: FontOption) => {
      if (containerW <= 0 || containerH <= 0) return;

      const bufferW = 1920;
      const bufferH = Math.max(320, Math.round(bufferW * (containerH / containerW)));
      bufferDimensionsRef.current = { width: bufferW, height: bufferH };

      const step = Math.max(3, Math.round(12 / density));
      const computedFontSize = Math.round(fontSize * scale);
      const fontString = resolveFontString(activeFont, fontFamily, fontWeight, computedFontSize);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = bufferW;
      maskCanvas.height = bufferH;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      maskCtx.fillStyle = "#000000";
      maskCtx.fillRect(0, 0, bufferW, bufferH);
      maskCtx.font = fontString;

      let metrics = maskCtx.measureText(text);
      if (metrics.width < 100) {
        maskCtx.font = `bold ${computedFontSize}px sans-serif`;
        metrics = maskCtx.measureText(text);
      }

      const visualAscent =
        typeof metrics.actualBoundingBoxAscent === "number" && metrics.actualBoundingBoxAscent > 0
          ? metrics.actualBoundingBoxAscent
          : computedFontSize * 0.52;
      const visualDescent =
        typeof metrics.actualBoundingBoxDescent === "number" ? metrics.actualBoundingBoxDescent : 0;
      const visualLeft =
        typeof metrics.actualBoundingBoxLeft === "number" ? metrics.actualBoundingBoxLeft : 0;
      const visualRight =
        typeof metrics.actualBoundingBoxRight === "number" && metrics.actualBoundingBoxRight > 0
          ? metrics.actualBoundingBoxRight
          : metrics.width;

      const visualWidth = visualLeft + visualRight;
      const visualHeight = visualAscent + visualDescent;

      const drawX = Math.round((bufferW - visualWidth) / 2 + visualLeft);
      const drawY = Math.round((bufferH - visualHeight) / 2 + visualAscent);

      maskCtx.fillStyle = "#ffffff";
      maskCtx.textAlign = "left";
      maskCtx.textBaseline = "alphabetic";
      maskCtx.fillText(text, drawX, drawY);

      const maskData = maskCtx.getImageData(0, 0, bufferW, bufferH).data;
      const nextTargets: Particle[] = [];
      const existing = particlesRef.current;

      const scanStartY = Math.max(0, Math.floor((drawY - visualAscent - step) / step) * step);
      const scanEndY = Math.min(bufferH, Math.ceil((drawY + visualDescent + step) / step) * step);
      const scanStartX = Math.max(0, Math.floor((drawX - visualLeft - step) / step) * step);
      const scanEndX = Math.min(bufferW, Math.ceil((drawX + visualRight + step) / step) * step);

      for (let y = scanStartY; y <= scanEndY; y += step) {
        for (let x = scanStartX; x <= scanEndX; x += step) {
          const idx = (y * bufferW + x) * 4;
          if (maskData[idx] > 100) {
            const targetIdx = nextTargets.length;
            if (targetIdx < existing.length) {
              const p = existing[targetIdx];
              nextTargets.push({
                originX: x,
                originY: y,
                x: p.x,
                y: p.y,
                vx: p.vx,
                vy: p.vy,
                radius: dotSize,
              });
            } else {
              nextTargets.push({
                originX: x,
                originY: y,
                x,
                y,
                vx: 0,
                vy: 0,
                radius: dotSize,
              });
            }
          }
        }
      }

      const newBgGrid: BgGridDot[] = [];
      if (showBackgroundGrid) {
        const bgStep = step * 2;
        const isDark = resolvedTheme !== "light";
        const baseCenterAlpha = isDark ? 0.08 : 0.06;
        const halfW = bufferW / 2;
        const halfH = bufferH / 2;

        const bgStartX = Math.round((bufferW % bgStep) / 2);
        const bgStartY = Math.round((bufferH % bgStep) / 2);

        for (let y = bgStartY; y < bufferH; y += bgStep) {
          for (let x = bgStartX; x < bufferW; x += bgStep) {
            const idx = (y * bufferW + x) * 4;
            const idxLeft = (y * bufferW + Math.max(0, x - step)) * 4;
            const idxRight = (y * bufferW + Math.min(bufferW - 1, x + step)) * 4;

            if (maskData[idx] > 50 || maskData[idxLeft] > 50 || maskData[idxRight] > 50) {
              continue;
            }

            const normX = (x - halfW) / halfW;
            const normY = (y - halfH) / halfH;
            const normDist = Math.hypot(normX, normY);
            const radialFactor = Math.max(0.15, 1 - Math.min(1, Math.pow(normDist / 1.35, 1.6)));
            const calculatedBgAlpha = baseCenterAlpha * radialFactor;

            newBgGrid.push({
              originX: x,
              originY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              radius: dotSize * 0.45,
              baseAlpha: calculatedBgAlpha,
              currentAlpha: calculatedBgAlpha,
            });
          }
        }
      }

      particlesRef.current = nextTargets;
      bgGridRef.current = newBgGrid;
      entranceStartRef.current = performance.now();
      wakeLoopRef.current();
    },
    [
      text,
      fontFamily,
      fontWeight,
      fontSize,
      scale,
      density,
      dotSize,
      showBackgroundGrid,
      resolvedTheme,
    ],
  );

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const clientW = container.clientWidth || Math.floor(rect.width);
      const clientH = container.clientHeight || Math.floor(rect.height);

      if (clientW <= 0 || clientH <= 0) return;

      initMatrix(clientW, clientH, font);

      const { width: bufW, height: bufH } = bufferDimensionsRef.current;
      if (canvas.width !== bufW || canvas.height !== bufH) {
        canvas.width = bufW;
        canvas.height = bufH;
      }
    };

    updateSize();

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateSize);
    }

    const handleFontLoad = () => updateSize();
    document.fonts?.addEventListener("loadingdone", handleFontLoad);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    const isDark = resolvedTheme !== "light";
    const dotBaseColor = customColor ?? (isDark ? "#ffffff" : "#171717");
    const bgBaseColor = isDark ? "rgba(255, 255, 255, " : "rgba(0, 0, 0, ";

    const spring = 0.12;
    const damping = 0.78;

    const render = (time: number) => {
      const { width: bufW, height: bufH } = bufferDimensionsRef.current;
      if (bufW <= 0 || bufH <= 0) {
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, bufW, bufH);

      const elapsed = time - entranceStartRef.current;
      const isEntering = !isReducedMotionRef.current && elapsed < 350;
      const entranceProgress = isReducedMotionRef.current
        ? 1
        : Math.min(1, Math.max(0, elapsed / 300));
      const entranceEase = 1 - Math.pow(1 - entranceProgress, 3);

      const mouse = mouseRef.current;
      const hasMouse = interactive && mouse.active && !isReducedMotionRef.current;
      let hasActiveMotion = isEntering || hasMouse;

      if (showBackgroundGrid) {
        const bgGrid = bgGridRef.current;
        const bgHoverRadius = 180 * interactiveIntensity;
        const bgSpring = 0.1;
        const bgDamping = 0.82;

        for (let i = 0; i < bgGrid.length; i++) {
          const bg = bgGrid[i];

          if (!isReducedMotionRef.current) {
            let targetX = bg.originX;
            let targetY = bg.originY;
            let targetAlpha = bg.baseAlpha;

            if (hasMouse) {
              const dx = bg.originX - mouse.x;
              const dy = bg.originY - mouse.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < bgHoverRadius * bgHoverRadius && distSq > 0.001) {
                const dist = Math.sqrt(distSq);
                const factor = 1 - dist / bgHoverRadius;
                targetX += (dx / dist) * factor * 2;
                targetY += (dy / dist) * factor * 2;
                targetAlpha += factor * 0.04;
              }
            }

            const ax = (targetX - bg.x) * bgSpring;
            const ay = (targetY - bg.y) * bgSpring;
            bg.vx = (bg.vx + ax) * bgDamping;
            bg.vy = (bg.vy + ay) * bgDamping;
            bg.x += bg.vx;
            bg.y += bg.vy;
            bg.currentAlpha += (targetAlpha - bg.currentAlpha) * 0.15;

            if (Math.abs(bg.vx) > 0.02 || Math.abs(bg.vy) > 0.02) {
              hasActiveMotion = true;
            }
          }

          ctx.fillStyle = `${bgBaseColor}${bg.currentAlpha})`;
          ctx.beginPath();
          ctx.arc(bg.x, bg.y, bg.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const particles = particlesRef.current;
      const repelR = 140 * interactiveIntensity;
      const repelForce = 90 * interactiveIntensity;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReducedMotionRef.current) {
          let targetX = p.originX;
          let targetY = p.originY;

          if (hasMouse) {
            const dx = p.originX - mouse.x;
            const dy = p.originY - mouse.y;
            const dist = Math.hypot(dx, dy) || 1;

            switch (interactiveMode) {
              case "repel": {
                if (dist < repelR) {
                  const force = (1 - dist / repelR) * repelForce;
                  targetX += (dx / dist) * force;
                  targetY += (dy / dist) * force;
                }
                break;
              }
              case "attract": {
                const pullR = 160 * interactiveIntensity;
                if (dist < pullR) {
                  const pull = (1 - dist / pullR) * 70 * interactiveIntensity;
                  targetX -= (dx / dist) * pull;
                  targetY -= (dy / dist) * pull;
                }
                break;
              }
              case "vortex": {
                const vortexR = 200 * interactiveIntensity;
                if (dist < vortexR) {
                  const strength = (1 - dist / vortexR) * 0.12 * interactiveIntensity;
                  const cos2 = Math.cos(strength);
                  const sin2 = Math.sin(strength);
                  const rx = dx * cos2 - dy * sin2;
                  const ry = dx * sin2 + dy * cos2;
                  const pullIn = (1 - dist / vortexR) * 0.12 * interactiveIntensity;
                  targetX = mouse.x + rx * (1 - pullIn);
                  targetY = mouse.y + ry * (1 - pullIn);
                }
                break;
              }
              case "ripple": {
                const rippleR = 240 * interactiveIntensity;
                if (dist < rippleR) {
                  const fade = 1 - dist / rippleR;
                  const wave = Math.sin(dist * 0.09 - time * 0.005);
                  const amp = wave * fade * 28 * interactiveIntensity;
                  targetX += (dx / dist) * amp;
                  targetY += (dy / dist) * amp;
                }
                break;
              }
            }
          }

          const ax = (targetX - p.x) * spring;
          const ay = (targetY - p.y) * spring;
          p.vx = (p.vx + ax) * damping;
          p.vy = (p.vy + ay) * damping;
          p.x += p.vx;
          p.y += p.vy;

          if (
            !hasMouse &&
            Math.abs(p.vx) < 0.01 &&
            Math.abs(p.vy) < 0.01 &&
            Math.abs(p.x - targetX) < 0.05 &&
            Math.abs(p.y - targetY) < 0.05
          ) {
            p.x = targetX;
            p.y = targetY;
            p.vx = 0;
            p.vy = 0;
          } else {
            hasActiveMotion = true;
          }
        }
      }

      ctx.fillStyle = dotBaseColor;
      const currentRadius = dotSize * entranceEase;

      if (shape === "square") {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.fillRect(
            p.x - currentRadius,
            p.y - currentRadius,
            currentRadius * 2,
            currentRadius * 2,
          );
        }
      } else {
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.moveTo(p.x + currentRadius, p.y);
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (!isReducedMotionRef.current && hasActiveMotion) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
        animFrameIdRef.current = null;
      }
    };

    const wakeLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };
    wakeLoopRef.current = wakeLoop;

    wakeLoop();

    return () => {
      document.fonts?.removeEventListener("loadingdone", handleFontLoad);
      resizeObserver.disconnect();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      isRunningRef.current = false;
    };
  }, [
    mounted,
    resolvedTheme,
    interactive,
    interactiveMode,
    interactiveIntensity,
    showBackgroundGrid,
    shape,
    customColor,
    initMatrix,
    font,
    dotSize,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || isReducedMotionRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { width: bufW, height: bufH } = bufferDimensionsRef.current;
    mouseRef.current.x = (e.clientX - rect.left) * (bufW / rect.width);
    mouseRef.current.y = (e.clientY - rect.top) * (bufH / rect.height);
    mouseRef.current.active = true;
    wakeLoopRef.current();
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    wakeLoopRef.current();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || isReducedMotionRef.current) return;
    const now = performance.now();
    if (now - lastClickRef.current < 400) return;
    lastClickRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { width: bufW, height: bufH } = bufferDimensionsRef.current;
    const clickX = (e.clientX - rect.left) * (bufW / rect.width);
    const clickY = (e.clientY - rect.top) * (bufH / rect.height);

    const clickRadius = 220 * interactiveIntensity;
    const clickForce = 140 * interactiveIntensity;
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < clickRadius) {
        const factor = 1 - dist / clickRadius;
        const impulse = factor * clickForce;
        p.vx += (dx / dist) * impulse;
        p.vy += (dy / dist) * impulse;
      }
    }
    wakeLoopRef.current();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="block h-full w-full cursor-pointer touch-pan-y"
        aria-hidden="true"
      />
    </div>
  );
};
