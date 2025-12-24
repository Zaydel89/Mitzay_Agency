
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const NeuralNexusSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, dataNodes: THREE.Points, trailSystem: THREE.Points, backgroundNodes: THREE.Points;
    let composer: EffectComposer, controls: OrbitControls;
    let time = 0;
    let currentVisualization = 0;
    let isTransforming = false;
    let transformProgress = 0;
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    let dataFlow = true;
    let showTrails = true;
    let glowEffect = true;
    const nodeCount = 28000;
    const trailCount = 10000;
    const transformSpeed = 0.018;
    const visualizationNames = ["HARMONIC SPHERE", "TOROIDAL VORTEX", "NEBULA CORE"];
    let baseColors = ['#00ffff', '#ffff00', '#ff00ff'];
    let colorSchemes = baseColors.map(generateScheme);

    function generateScheme(baseHex: string) {
      const base = new THREE.Color(baseHex);
      const hsl = base.getHSL({ h: 0, s: 0, l: 0 });
      const scheme = [];
      for (let i = 0; i < 10; i++) {
        const h = (hsl.h + (i - 5) * 0.03) % 1;
        const s = Math.min(1, Math.max(0, hsl.s + (i - 5) * 0.02));
        const l = Math.min(1, Math.max(0, hsl.l + (i - 5) * 0.03));
        const c = new THREE.Color().setHSL(h, s, l);
        scheme.push(c);
      }
      return scheme;
    }

    function updateCSSColors(baseHex: string) {
      const base = new THREE.Color(baseHex);
      const hsl = base.getHSL({ h: 0, s: 0, l: 0 });
      const accentHsl = { h: hsl.h, s: hsl.s, l: Math.min(1, hsl.l + 0.4) };
      const accent = new THREE.Color().setHSL(accentHsl.h, accentHsl.s, accentHsl.l).getHexString();
      const secondaryHsl = { h: (hsl.h + 0.08) % 1, s: hsl.s * 0.8, l: hsl.l };
      const secondary = new THREE.Color().setHSL(secondaryHsl.h, secondaryHsl.s, secondaryHsl.l).getHexString();
      const startColor = new THREE.Color().setHSL(hsl.h - 0.05, hsl.s, hsl.l);
      const startHex = startColor.getHexString();
      const endColor = new THREE.Color().setHSL(hsl.h + 0.1, hsl.s * 0.8, hsl.l);
      const endHex = endColor.getHexString();
      const root = containerRef.current?.parentElement;
      if (root) {
        root.style.setProperty('--primary-color', baseHex);
        root.style.setProperty('--accent-color', `#${accent}`);
        root.style.setProperty('--secondary-color', `#${secondary}`);
        root.style.setProperty('--gradient-start', `#${startHex}`);
        root.style.setProperty('--gradient-middle', baseHex);
        root.style.setProperty('--gradient-end', `#${endHex}`);
        const primaryRgb = `${Math.round(base.r * 255)}, ${Math.round(base.g * 255)}, ${Math.round(base.b * 255)}`;
        root.style.setProperty('--primary-rgb', primaryRgb);
        const accentC = new THREE.Color(`#${accent}`);
        const accentRgb = `${Math.round(accentC.r * 255)}, ${Math.round(accentC.g * 255)}, ${Math.round(accentC.b * 255)}`;
        root.style.setProperty('--accent-rgb', accentRgb);
        const secondaryC = new THREE.Color(`#${secondary}`);
        const secondaryRgb = `${Math.round(secondaryC.r * 255)}, ${Math.round(secondaryC.g * 255)}, ${Math.round(secondaryC.b * 255)}`;
        root.style.setProperty('--secondary-rgb', secondaryRgb);
      }
    }

    function generateHarmonicSphere(i: number, count: number) {
      const t = i / count;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 80;
      const perturbation = 0.2 * (Math.sin(5 * phi) * Math.cos(3 * theta) + Math.cos(4 * phi) * Math.sin(2 * theta));
      const r = radius * (1 + perturbation);
      return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }

    function generateToroidalVortex(i: number, count: number) {
      const t = i / count;
      const theta = t * Math.PI * 2;
      const phi = theta * 10 + Math.PI * (1 + Math.sqrt(5)) * t * 10;
      const major = 70;
      const minor = 25 + Math.sin(theta * 3) * 5;
      return new THREE.Vector3((major + minor * Math.cos(phi)) * Math.cos(theta), (major + minor * Math.cos(phi)) * Math.sin(theta), minor * Math.sin(phi) + Math.cos(theta * 4) * 10);
    }

    function generateNebulaCore(i: number, count: number) {
      const coreRatio = 0.25;
      const coreCount = Math.floor(count * coreRatio);
      if (i < coreCount) {
        const t = i / coreCount;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i + Math.sin(t * 10) * 0.5;
        const radius = 25 * Math.pow(Math.random(), 1.5);
        return new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi) + Math.sin(theta * 2) * 2);
      } else {
        const ringParticles = count - coreCount;
        const ringIndex = i - coreCount;
        const numRings = 8;
        const ringNum = Math.floor(ringIndex / (ringParticles / numRings));
        const nodeInRing = ringIndex % Math.floor(ringParticles / numRings);
        const nodeInRingT = nodeInRing / Math.floor(ringParticles / numRings);
        const angle = nodeInRingT * Math.PI * 2 + Math.sin(ringNum * 2) * 0.3;
        const baseRadius = 35 + ringNum * 10;
        const ringRadius = baseRadius + Math.sin(angle * 4) * 5;
        const tiltAngle = (ringNum % 2 === 0 ? 1 : -1) * (Math.PI / 6 + ringNum * Math.PI / 15);
        const axisAngle = ringNum * Math.PI / 4;
        const axis = new THREE.Vector3(Math.sin(axisAngle), Math.cos(axisAngle), Math.sin(axisAngle * 2)).normalize();
        const rotationMatrix = new THREE.Matrix4().makeRotationAxis(axis, tiltAngle);
        const pos = new THREE.Vector3(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius);
        pos.applyMatrix4(rotationMatrix);
        return pos;
      }
    }

    const visualizations = [generateHarmonicSphere, generateToroidalVortex, generateNebulaCore];

    function createTrailTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const context = canvas.getContext('2d')!;
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    function createEnhancedParticleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const context = canvas.getContext('2d')!;
      const centerX = 128, centerY = 128;
      const outerGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 128);
      outerGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      outerGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      outerGradient.addColorStop(0.6, 'rgba(200, 255, 255, 0.4)');
      outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = outerGradient;
      context.fillRect(0, 0, 256, 256);
      const coreGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      coreGradient.addColorStop(1, 'rgba(200, 255, 255, 0.3)');
      context.fillStyle = coreGradient;
      context.beginPath(); context.arc(centerX, centerY, 20, 0, Math.PI * 2); context.fill();
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    function assignParticleProperties(i: number, colors: Float32Array, sizes: Float32Array | null, vizIndex: number) {
      const colorScheme = colorSchemes[vizIndex];
      let color; let brightness = 1.0;
      if (sizes) {
        if (vizIndex === 0) {
          color = colorScheme[Math.floor((i / nodeCount) * 12) % colorScheme.length];
          brightness = 0.8 + Math.random() * 0.7;
          sizes[i] = 1.0 + Math.random() * 2.5;
        } else if (vizIndex === 1) {
          color = colorScheme[Math.floor(i / (nodeCount / 10)) % colorScheme.length];
          brightness = 0.9 + Math.random() * 0.6;
          sizes[i] = 1.0 + Math.random() * 2.5;
        } else {
          const coreCount = Math.floor(nodeCount * 0.25);
          if (i < coreCount) { color = colorScheme[i % 4]; brightness = 1.2 + Math.random() * 0.6; sizes[i] = 2.0 + Math.random() * 2.5; }
          else { color = colorScheme[4 + (i % (colorScheme.length - 4))]; brightness = 0.8 + Math.random() * 0.6; sizes[i] = 1.0 + Math.random() * 2.0; }
        }
      } else {
        color = colorScheme[Math.floor((i / nodeCount) * 12) % colorScheme.length];
      }
      colors[i * 3] = color.r * brightness; colors[i * 3 + 1] = color.g * brightness; colors[i * 3 + 2] = color.b * brightness;
    }

    function init() {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000814, 0.0005);
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2500);
      camera.position.set(0, 0, 155);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      containerRef.current!.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; controls.dampingFactor = 0.1; controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.9;
      controls.minDistance = 30; controls.maxDistance = 350; controls.enablePan = false;

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.6, 0.8));
      const distortionShader = {
        uniforms: { tDiffuse: { value: null }, time: { value: 0.0 }, intensity: { value: 0.02 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float intensity; varying vec2 vUv; void main() { vec2 uv = vUv; uv.x += sin(uv.y * 10.0 + time) * intensity; uv.y += cos(uv.x * 10.0 + time) * intensity; gl_FragColor = texture2D(tDiffuse, uv); }`
      };
      composer.addPass(new ShaderPass(distortionShader));
      composer.addPass(new OutputPass());

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(nodeCount * 3);
      const colors = new Float32Array(nodeCount * 3);
      const sizes = new Float32Array(nodeCount);
      for (let i = 0; i < nodeCount; i++) {
        const pos = visualizations[currentVisualization](i, nodeCount);
        positions[i * 3] = pos.x; positions[i * 3 + 1] = pos.y; positions[i * 3 + 2] = pos.z;
        assignParticleProperties(i, colors, sizes, currentVisualization);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.userData.currentColors = new Float32Array(colors);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, textureMap: { value: createEnhancedParticleTexture() }, glowIntensity: { value: 1.0 } },
        vertexShader: `attribute vec3 color; attribute float size; varying vec3 vColor; uniform float time; uniform float glowIntensity; void main() { vColor = color * (1.0 + 0.2 * sin(time * 2.0 + position.y * 0.05)) * glowIntensity; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (350.0 / -mvPosition.z) * (1.0 + 0.1 * sin(time + position.x)); gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform sampler2D textureMap; uniform float time; varying vec3 vColor; void main() { vec2 uv = gl_PointCoord - vec2(0.5); float r = length(uv) * 2.0; vec4 tex = texture2D(textureMap, gl_PointCoord); float alpha = tex.a * (1.0 - smoothstep(0.8, 1.0, r)); gl_FragColor = vec4(vColor, alpha); }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
      });
      dataNodes = new THREE.Points(geometry, material);
      scene.add(dataNodes);

      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(trailCount * 3);
      const trailColors = new Float32Array(trailCount * 3);
      const trailSizes = new Float32Array(trailCount);
      const trailOpacities = new Float32Array(trailCount);
      for (let i = 0; i < trailCount; i++) {
        trailPositions[i * 3] = (Math.random() - 0.5) * 120;
        trailPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        trailPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
        const color = colorSchemes[currentVisualization][Math.floor(Math.random() * colorSchemes[currentVisualization].length)];
        trailColors[i * 3] = color.r; trailColors[i * 3 + 1] = color.g; trailColors[i * 3 + 2] = color.b;
        trailSizes[i] = Math.random() * 2 + 0.8; trailOpacities[i] = Math.random() * 0.6 + 0.3;
      }
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
      trailGeometry.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1));
      trailGeometry.setAttribute('opacity', new THREE.BufferAttribute(trailOpacities, 1));
      const trailMaterial = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, textureMap: { value: createTrailTexture() } },
        vertexShader: `attribute vec3 color; attribute float size; attribute float opacity; varying vec3 vColor; varying float vOpacity; uniform float time; void main() { vColor = color; vOpacity = opacity * (0.5 + 0.5 * sin(time + position.x * 0.1)); vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (300.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform sampler2D textureMap; varying vec3 vColor; varying float vOpacity; void main() { vec4 tex = texture2D(textureMap, gl_PointCoord); gl_FragColor = vec4(vColor * tex.rgb, tex.a * vOpacity); }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
      });
      trailSystem = new THREE.Points(trailGeometry, trailMaterial);
      scene.add(trailSystem);

      const bgGeometry = new THREE.BufferGeometry();
      const bgCount = 3000; const bgPositions = new Float32Array(bgCount * 3); const bgColors = new Float32Array(bgCount * 3); const bgSizes = new Float32Array(bgCount);
      for (let i = 0; i < bgCount; i++) {
        const radius = 250 + Math.random() * 350; const phi = Math.random() * Math.PI * 2; const theta = Math.random() * Math.PI;
        bgPositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi); bgPositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi); bgPositions[i * 3 + 2] = radius * Math.cos(theta);
        const intensity = Math.random() * 0.4 + 0.2; bgColors[i * 3] = intensity * 0.3; bgColors[i * 3 + 1] = intensity * 0.4; bgColors[i * 3 + 2] = intensity * 0.6;
        bgSizes[i] = Math.random() * 3 + 1;
      }
      bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3)); bgGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3)); bgGeometry.setAttribute('size', new THREE.BufferAttribute(bgSizes, 1));
      backgroundNodes = new THREE.Points(bgGeometry, new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
      scene.add(backgroundNodes);

      updateCSSColors(baseColors[currentVisualization]);
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      time += 0.012;
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        if (hudRef.current) {
          const fpsEl = hudRef.current.querySelector('#fps-display');
          if (fpsEl) fpsEl.textContent = fps.toString();
        }
        frameCount = 0; lastTime = currentTime;
      }
      controls.update();
      if (backgroundNodes) { backgroundNodes.rotation.y += 0.0004; backgroundNodes.rotation.x += 0.00015; }

      if (isTransforming) {
        transformProgress += transformSpeed;
        if (transformProgress >= 1.0) {
          dataNodes.geometry.attributes.position.array.set(dataNodes.userData.toPositions);
          dataNodes.geometry.attributes.color.array.set(dataNodes.userData.toColors);
          dataNodes.geometry.attributes.size.array.set(dataNodes.userData.toSizes);
          dataNodes.geometry.attributes.position.needsUpdate = true;
          dataNodes.geometry.attributes.color.needsUpdate = true;
          dataNodes.geometry.attributes.size.needsUpdate = true;
          dataNodes.geometry.userData.currentColors = new Float32Array(dataNodes.userData.toColors);
          currentVisualization = dataNodes.userData.targetVisualization;
          isTransforming = false; transformProgress = 0;
        } else {
          const t = transformProgress; const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          for (let i = 0; i < dataNodes.geometry.attributes.position.array.length; i++) {
            dataNodes.geometry.attributes.position.array[i] = dataNodes.userData.fromPositions[i] * (1 - ease) + dataNodes.userData.toPositions[i] * ease;
            dataNodes.geometry.attributes.color.array[i] = dataNodes.userData.fromColors[i] * (1 - ease) + dataNodes.userData.toColors[i] * ease;
          }
          for (let i = 0; i < dataNodes.geometry.attributes.size.array.length; i++) {
            dataNodes.geometry.attributes.size.array[i] = dataNodes.userData.fromSizes[i] * (1 - ease) + dataNodes.userData.toSizes[i] * ease;
          }
          dataNodes.geometry.attributes.position.needsUpdate = true;
          dataNodes.geometry.attributes.color.needsUpdate = true;
          dataNodes.geometry.attributes.size.needsUpdate = true;
        }
      } else if (dataFlow) {
        const pos = dataNodes.geometry.attributes.position.array;
        if (currentVisualization === 0) {
          for (let i = 0; i < nodeCount; i++) {
            const x = pos[i * 3]; const z = pos[i * 3 + 2];
            pos[i * 3] = x * Math.cos(0.005) - z * Math.sin(0.005); pos[i * 3 + 2] = x * Math.sin(0.005) + z * Math.cos(0.005);
          }
        } else if (currentVisualization === 1) {
          for (let i = 0; i < nodeCount; i++) {
            const x = pos[i * 3]; const y = pos[i * 3 + 1];
            pos[i * 3] = x * Math.cos(0.004) - y * Math.sin(0.004); pos[i * 3 + 1] = x * Math.sin(0.004) + y * Math.cos(0.004);
          }
        } else {
          const coreCount = Math.floor(nodeCount * 0.25);
          for (let i = 0; i < nodeCount; i++) {
            const ix = i * 3, iz = i * 3 + 2; const x = pos[ix], z = pos[iz];
            const rot = i < coreCount ? 0.0015 : 0.0025 + Math.floor((i - coreCount) / (nodeCount - coreCount) * 8) * 0.002;
            pos[ix] = x * Math.cos(rot) - z * Math.sin(rot); pos[iz] = x * Math.sin(rot) + z * Math.cos(rot);
          }
        }
        dataNodes.geometry.attributes.position.needsUpdate = true;
      }

      if (trailSystem && showTrails) {
        const trailPos = trailSystem.geometry.attributes.position.array; const trailOpac = trailSystem.geometry.attributes.opacity.array;
        for (let i = 0; i < trailCount; i++) {
          const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
          if (currentVisualization === 0) { trailPos[iy] += 0.35; if (trailPos[iy] > 70) trailPos[iy] = -70; trailPos[ix] += Math.sin(time * 2.2 + i * 0.12) * 0.12; trailPos[iz] += Math.cos(time * 2.0 + i * 0.12) * 0.12; }
          else if (currentVisualization === 1) { const d = Math.sqrt(trailPos[ix] ** 2 + trailPos[iz] ** 2); if (d > 0.1) { const exp = 1 + Math.sin(time * 3.5 + i * 0.06) * 0.006; trailPos[ix] *= exp; trailPos[iz] *= exp; } trailPos[iy] += Math.sin(time * 2.8 + i * 0.04) * 0.25; }
          else { const s = 0.012 + (i % 6) * 0.006; const x = trailPos[ix], z = trailPos[iz]; trailPos[ix] = x * Math.cos(s) - z * Math.sin(s); trailPos[iz] = x * Math.sin(s) + z * Math.cos(s); trailPos[iy] += Math.sin(time * 1.5 + i * 0.08) * 0.15; }
          trailOpac[i] = 0.4 + Math.sin(time * 3.5 + i * 0.12) * 0.35;
        }
        trailSystem.geometry.attributes.position.needsUpdate = true; trailSystem.geometry.attributes.opacity.needsUpdate = true; trailSystem.material.uniforms.time.value = time;
      }
      if (dataNodes) dataNodes.material.uniforms.time.value = time;
      composer.passes[2].uniforms.time.value = time; composer.render();
    }

    const handleExecute = () => {
      if (isTransforming) return;
      const nextViz = (currentVisualization + 1) % visualizations.length;
      document.getElementById('mode-display')!.textContent = visualizationNames[nextViz];
      isTransforming = true; transformProgress = 0;
      const pos = dataNodes.geometry.attributes.position.array; const col = dataNodes.geometry.attributes.color.array; const siz = dataNodes.geometry.attributes.size.array;
      const newPos = new Float32Array(pos.length); const newCol = new Float32Array(col.length); const newSiz = new Float32Array(siz.length);
      for (let i = 0; i < nodeCount; i++) {
        const p = visualizations[nextViz](i, nodeCount); newPos[i * 3] = p.x; newPos[i * 3 + 1] = p.y; newPos[i * 3 + 2] = p.z;
        assignParticleProperties(i, newCol, newSiz, nextViz);
      }
      dataNodes.userData = { ...dataNodes.userData, fromPositions: new Float32Array(pos), toPositions: newPos, fromColors: new Float32Array(dataNodes.geometry.userData.currentColors), toColors: newCol, fromSizes: new Float32Array(siz), toSizes: newSiz, targetVisualization: nextViz };
      const trailCol = trailSystem.geometry.attributes.color.array; const scheme = colorSchemes[nextViz];
      for (let i = 0; i < trailCount; i++) { const c = scheme[Math.floor(Math.random() * scheme.length)]; trailCol[i * 3] = c.r; trailCol[i * 3 + 1] = c.g; trailCol[i * 3 + 2] = c.b; }
      trailSystem.geometry.attributes.color.needsUpdate = true;
      updateCSSColors(baseColors[nextViz]);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight); composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    init();

    const executeBtn = document.getElementById('execute-btn');
    executeBtn?.addEventListener('click', handleExecute);

    const flowSwitch = document.getElementById('flow-switch');
    flowSwitch?.addEventListener('click', () => { dataFlow = !dataFlow; flowSwitch.classList.toggle('active', dataFlow); });

    const trailsSwitch = document.getElementById('trails-switch');
    trailsSwitch?.addEventListener('click', () => { showTrails = !showTrails; trailsSwitch.classList.toggle('active', showTrails); if (trailSystem) trailSystem.visible = showTrails; document.getElementById('trail-display')!.textContent = showTrails ? 'ACTIVE' : 'INACTIVE'; });

    const glowSwitch = document.getElementById('glow-switch');
    glowSwitch?.addEventListener('click', () => { glowEffect = !glowEffect; glowSwitch.classList.toggle('active', glowEffect); if (dataNodes) dataNodes.material.uniforms.glowIntensity.value = glowEffect ? 1.0 : 0.5; document.getElementById('glow-display')!.textContent = glowEffect ? 'ENABLED' : 'DISABLED'; });

    const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
    colorPicker?.addEventListener('input', (e: any) => {
      baseColors[currentVisualization] = e.target.value; colorSchemes[currentVisualization] = generateScheme(e.target.value);
      const colors = dataNodes.geometry.attributes.color.array; for (let i = 0; i < nodeCount; i++) assignParticleProperties(i, colors, null, currentVisualization); dataNodes.geometry.attributes.color.needsUpdate = true;
      const trailColors = trailSystem.geometry.attributes.color.array; const scheme = colorSchemes[currentVisualization]; for (let i = 0; i < trailCount; i++) { const c = scheme[Math.floor(Math.random() * scheme.length)]; trailColors[i * 3] = c.r; trailColors[i * 3 + 1] = c.g; trailColors[i * 3 + 2] = c.b; } trailSystem.geometry.attributes.color.needsUpdate = true;
      updateCSSColors(e.target.value);
    });

    const toggleBtn = document.getElementById('controls-toggle');
    toggleBtn?.addEventListener('click', () => document.getElementById('control-panel')?.classList.toggle('expanded'));

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="horizontal-section bg-black flex items-center justify-center relative overflow-hidden font-orbitron text-primary snap-start">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&display=swap');
        :root {
            --primary-color: #00ffff;
            --accent-color: #88ffff;
            --secondary-color: #0088ff;
            --primary-rgb: 0, 255, 255;
            --accent-rgb: 136, 255, 255;
            --secondary-rgb: 0, 136, 255;
            --gradient-start: #00ff88;
            --gradient-middle: #00ffff;
            --gradient-end: #0088ff;
        }
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .grid-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.05;
            background-image: linear-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px);
            background-size: 60px 60px; animation: gridShift 15s linear infinite;
        }
        @keyframes gridShift { 0% { transform: translate(0, 0); } 100% { transform: translate(60px, 60px); } }
        .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 8px; pointer-events: none;
            background: linear-gradient(90deg, transparent 0%, var(--primary-color) 40%, var(--accent-color) 50%, var(--primary-color) 60%, transparent 100%);
            box-shadow: 0 0 40px var(--primary-color), 0 0 80px rgba(var(--primary-rgb), 0.6), 0 0 120px rgba(var(--primary-rgb), 0.3);
            animation: scanMove 2.5s ease-in-out infinite; z-index: 50;
        }
        @keyframes scanMove { 0%, 100% { top: 0%; opacity: 0; } 10%, 90% { opacity: 1; } 50% { top: 100%; } }
        .tech-pattern {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.03;
            background-image: radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(var(--secondary-rgb), 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb), 0.08) 0%, transparent 70%);
            animation: techPulse 6s ease-in-out infinite;
        }
        @keyframes techPulse { 0%, 100% { opacity: 0.03; transform: scale(1); } 50% { opacity: 0.08; transform: scale(1.15); } }
        .circuit-lines {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.1;
            background-image: linear-gradient(45deg, transparent 40%, rgba(var(--primary-rgb), 0.15) 41%, rgba(var(--primary-rgb), 0.15) 42%, transparent 43%), linear-gradient(-45deg, transparent 40%, rgba(var(--secondary-rgb), 0.15) 41%, rgba(var(--secondary-rgb), 0.15) 42%, transparent 43%);
            background-size: 180px 180px; animation: circuitFlow 12s linear infinite;
        }
        @keyframes circuitFlow { 0% { background-position: 0px 0px, 0px 0px; } 100% { background-position: 180px 180px, -180px 180px; } }
        
        #hud {
            position: absolute; top: 20px; left: 20px; font-size: 12px; color: var(--primary-color); text-transform: uppercase; letter-spacing: 1px; z-index: 100;
            background: rgba(0, 0, 0, 0.6); padding: 10px 15px; border: 1px solid rgba(var(--primary-rgb), 0.2); border-radius: 15px; backdrop-filter: blur(20px);
            box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.2); transition: all 0.3s ease;
        }
        .hud-line { margin: 2px 0; display: flex; justify-content: space-between; align-items: center; position: relative; }
        .hud-value { color: var(--accent-color); font-weight: 500; margin-left: 8px; text-shadow: 0 0 8px rgba(var(--accent-rgb), 0.4); }
        #status-indicator { width: 6px; height: 6px; background: var(--primary-color); border-radius: 50%; box-shadow: 0 0 8px var(--primary-color); animation: statusPulse 1.8s ease-in-out infinite; }
        @keyframes statusPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        
        #control-panel { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 15px; z-index: 100; }
        .control-section { display: flex; align-items: center; gap: 15px; background: rgba(0, 0, 0, 0.6); padding: 10px 20px; border: 1px solid rgba(var(--primary-rgb), 0.2); border-radius: 15px; backdrop-filter: blur(20px); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; box-shadow: inset 0 0 15px rgba(var(--primary-rgb), 0.1); }
        .cyber-switch { position: relative; width: 40px; height: 20px; background: #001133; border: 1px solid var(--primary-color); cursor: pointer; border-radius: 10px; transition: all 0.3s; }
        .cyber-switch::before { content: ''; position: absolute; top: 1px; left: 1px; width: 16px; height: 16px; background: var(--primary-color); border-radius: 50%; transition: 0.3s; }
        .cyber-switch.active::before { transform: translateX(20px); background: var(--accent-color); }
        .switch-label { color: var(--primary-color); user-select: none; cursor: pointer; font-size: 9px; }
        #execute-btn, #controls-toggle { background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(var(--primary-rgb), 0.2); color: var(--primary-color); font-family: 'Orbitron', sans-serif; font-size: 11px; padding: 8px 18px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; border-radius: 20px; transition: 0.3s; backdrop-filter: blur(20px); }
        #execute-btn:hover { background: rgba(var(--primary-rgb), 0.1); transform: scale(1.05); }
        .cyber-icon { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; margin-right: 5px; vertical-align: middle; }
        .performance-bars { position: absolute; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 5px; z-index: 100; }
        .perf-bar { width: 80px; height: 3px; background: rgba(0,0,0,0.6); border: 1px solid var(--primary-color); overflow: hidden; }
        .perf-bar::before { content: ''; display: block; height: 100%; background: var(--primary-color); width: 70%; animation: perfPulse 1.8s infinite; }
        @keyframes perfPulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        .perf-label { font-size: 8px; color: var(--primary-color); }

        /* Impact Text Effects */
        .impact-text {
          font-family: 'Orbitron', sans-serif;
          color: var(--primary-color);
          text-transform: uppercase;
          font-weight: 900;
          text-align: center;
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
          letter-spacing: 0.25em;
          font-size: clamp(1rem, 4vw, 2.2rem);
          text-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 40px rgba(var(--primary-rgb), 0.5);
          animation: impactFlicker 4s infinite, impactGlitch 10s infinite;
          width: 90%;
          line-height: 1.2;
        }

        @keyframes impactFlicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; filter: drop-shadow(0 0 15px var(--primary-color)); }
          20%, 24%, 55% { opacity: 0.4; filter: none; }
        }

        @keyframes impactGlitch {
          0%, 89%, 100% { transform: translate(-50%, -50%) skew(0deg); }
          90% { transform: translate(-51%, -49%) skew(2deg); color: #ff00ff; text-shadow: 2px 0 red, -2px 0 blue; }
          91% { transform: translate(-49%, -51%) skew(-2deg); color: #00ffff; text-shadow: -2px 0 red, 2px 0 blue; }
          92% { transform: translate(-50%, -50%) skew(0deg); }
        }

        @media (max-width: 768px) { #hud, .performance-bars, .control-section { display: none; } #controls-toggle { display: block; } }
      `}</style>

      <div ref={containerRef} className="absolute inset-0 z-0"></div>
      <div className="grid-overlay"></div>
      <div className="tech-pattern"></div>
      <div className="circuit-lines"></div>
      <div className="scan-line"></div>

      {/* Impact Text */}
      <h2 className="impact-text">
        Habla con nuestra Inteligencia Artificial
      </h2>

      <div ref={hudRef} id="hud">
        <div className="hud-line">
          <span>SYSTEM:</span>
          <span className="hud-value">ONLINE</span>
          <div id="status-indicator"></div>
        </div>
        <div className="hud-line">
          <span>FPS:</span>
          <span className="hud-value" id="fps-display">60</span>
        </div>
        <div className="hud-line">
          <span>NODES:</span>
          <span className="hud-value" id="node-display">28,000</span>
        </div>
        <div className="hud-line">
          <span>MODE:</span>
          <span className="hud-value" id="mode-display">HARMONIC SPHERE</span>
        </div>
        <div className="hud-line">
            <span>TRAILS:</span>
            <span className="hud-value" id="trail-display">ACTIVE</span>
        </div>
        <div className="hud-line">
            <span>GLOW:</span>
            <span className="hud-value" id="glow-display">ENABLED</span>
        </div>
      </div>

      <div className="performance-bars">
        <div className="perf-label">CPU LOAD</div>
        <div className="perf-bar"></div>
        <div className="perf-label">MEMORY</div>
        <div className="perf-bar" style={{width: '60%'}}></div>
      </div>

      <div id="data-stream" ref={dataStreamRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold tracking-[6px] opacity-0 pointer-events-none transition-opacity duration-1000">
        NEURAL NEXUS
      </div>

      <div id="control-panel">
        <button id="controls-toggle" className="hidden">CONTROLS</button>
        <div className="control-section">
          <div className="cyber-switch active" id="flow-switch"></div>
          <span className="switch-label">DATA_FLOW</span>
          <div className="cyber-switch active" id="trails-switch"></div>
          <span className="switch-label">TRAILS</span>
          <div className="cyber-switch active" id="glow-switch"></div>
          <span className="switch-label">GLOW</span>
          <input type="color" id="color-picker" defaultValue="#00ffff" className="w-6 h-6 bg-transparent border-none cursor-pointer" />
        </div>
        <button id="execute-btn">
          <svg className="cyber-icon" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          EXECUTE_NEXT
        </button>
      </div>
    </div>
  );
};

export default NeuralNexusSection;
