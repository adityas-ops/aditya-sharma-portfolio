import { useEffect, useRef } from "react";

interface HeroFireProps {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.18;

  // a lean, so the tongues are not perfectly vertical
  float x = uv.x + 0.05 * sin(uv.y * 3.2 + t * 0.6);

  // turbulence scrolling upward is what makes the licks climb
  float a = fbm(vec2(x * 2.6, uv.y * 1.6 - t));
  float b = fbm(vec2(x * 5.3 + 4.2, uv.y * 2.9 - t * 1.5));
  float f = a * 0.72 + b * 0.34;

  // subtracting height tapers every tongue to a tip
  float e = clamp(f * 2.4 - uv.y * 2.3, 0.0, 1.0);

  // transparent so the background shows through; premultiplied to match the canvas compositor
  float alpha = 0.3 * smoothstep(0.06, 0.5, e) + 0.7 * smoothstep(0.5, 0.96, e);

  gl_FragColor = vec4(u_color * alpha, alpha);
}
`;

/**
 * Rare UI WebGL Fire Background Effect
 * Matches the exact organic fluid fire from https://www.rareui.com/ footer.
 */
export function HeroFire({
  color = "#FC4C01",
  className = "",
  style,
}: HeroFireProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: true }) ||
      (canvas.getContext("experimental-webgl", {
        antialias: false,
        alpha: true,
      }) as WebGLRenderingContext | null);

    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();

    const dispose = () => {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (program) gl.deleteProgram(program);
    };

    if (!vs || !fs || !program) {
      dispose();
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      dispose();
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uColor = gl.getUniformLocation(program, "u_color");

    let hex = color.replace("#", "").trim();
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const num = parseInt(hex, 16);
    const rgb: [number, number, number] =
      hex.length !== 6 || Number.isNaN(num)
        ? [0.988, 0.298, 0.004]
        : [
            ((num >> 16) & 255) / 255,
            ((num >> 8) & 255) / 255,
            (num & 255) / 255,
          ];
    gl.uniform3f(uColor, rgb[0], rgb[1], rgb[2]);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const startTime = performance.now();
    let animId = 0;

    const render = () => {
      gl.uniform1f(
        uTime,
        18 + (prefersReducedMotion ? 0 : (performance.now() - startTime) / 1000)
      );
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };

    const updateSize = () => {
      const w = Math.max(1, Math.round(0.5 * canvas.clientWidth));
      const h = Math.max(1, Math.round(0.5 * canvas.clientHeight));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uResolution, w, h);
        render();
      }
    };

    updateSize();
    render();

    // Start animation unconditionally on mount
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (buffer) gl.deleteBuffer(buffer);
      dispose();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={style}
    />
  );
}

export default HeroFire;
