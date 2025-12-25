
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const NeuralNexusSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [activeTheme, setActiveTheme] = useState(0);
  const [density, setDensity] = useState(100);

  // Refs for Three.js objects to be accessed by UI
  const networkRef = useRef<{
    triggerPulse: (x: number, y: number) => void;
    updateTheme: (index: number) => void;
    morphFormation: () => void;
    updateDensity: (val: number) => void;
    resetCamera: () => void;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config = {
      paused: false,
      activePaletteIndex: 0,
      currentFormation: 0,
      numFormations: 3,
      densityFactor: 1
    };

    const colorPalettes = [
      [
        new THREE.Color(0x667eea),
        new THREE.Color(0x764ba2),
        new THREE.Color(0xf093fb),
        new THREE.Color(0x9d50bb),
        new THREE.Color(0x6e48aa)
      ],
      [
        new THREE.Color(0xf857a6),
        new THREE.Color(0xff5858),
        new THREE.Color(0xfeca57),
        new THREE.Color(0xff6348),
        new THREE.Color(0xff9068)
      ],
      [
        new THREE.Color(0x4facfe),
        new THREE.Color(0x00f2fe),
        new THREE.Color(0x43e97b),
        new THREE.Color(0x38f9d7),
        new THREE.Color(0x4484ce)
      ]
    ];

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 28);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    function createStarfield() {
      const count = 8000;
      const positions = [];
      const colors = [];
      const sizes = [];
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(50, 150);
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        positions.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
        const colorChoice = Math.random();
        if (colorChoice < 0.7) colors.push(1, 1, 1);
        else if (colorChoice < 0.85) colors.push(0.7, 0.8, 1);
        else colors.push(1, 0.9, 0.8);
        sizes.push(THREE.MathUtils.randFloat(0.1, 0.3));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float uTime;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float twinkle = sin(uTime * 2.0 + position.x * 100.0) * 0.3 + 0.7;
            gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      });
      return new THREE.Points(geo, mat);
    }

    const starField = createStarfield();
    scene.add(starField);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.6;
    controls.minDistance = 8;
    controls.maxDistance = 80;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enablePan = false;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.8, 0.6, 0.7);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const pulseUniforms = {
      uTime: { value: 0.0 },
      uPulsePositions: { value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)] },
      uPulseTimes: { value: [-1e3, -1e3, -1e3] },
      uPulseColors: { value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)] },
      uPulseSpeed: { value: 18.0 },
      uBaseNodeSize: { value: 0.6 }
    };

    const noiseFunctions = `
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }`;

    const nodeShader = {
      vertexShader: `${noiseFunctions}
      attribute float nodeSize;
      attribute float nodeType;
      attribute vec3 nodeColor;
      attribute float distanceFromRoot;
      uniform float uTime;
      uniform vec3 uPulsePositions[3];
      uniform float uPulseTimes[3];
      uniform float uPulseSpeed;
      uniform float uBaseNodeSize;
      varying vec3 vColor;
      varying float vNodeType;
      varying vec3 vPosition;
      varying float vPulseIntensity;
      varying float vDistanceFromRoot;
      varying float vGlow;
      float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
          if (pulseTime < 0.0) return 0.0;
          float timeSinceClick = uTime - pulseTime;
          if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
          float pulseRadius = timeSinceClick * uPulseSpeed;
          float distToClick = distance(worldPos, pulsePos);
          float pulseThickness = 3.0;
          float waveProximity = abs(distToClick - pulseRadius);
          return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
      }
      void main() {
          vNodeType = nodeType;
          vColor = nodeColor;
          vDistanceFromRoot = distanceFromRoot;
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vPosition = worldPos;
          float totalPulseIntensity = 0.0;
          for (int i = 0; i < 3; i++) totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
          vPulseIntensity = min(totalPulseIntensity, 1.0);
          float breathe = sin(uTime * 0.7 + distanceFromRoot * 0.15) * 0.15 + 0.85;
          float pulseSize = nodeSize * breathe * (1.0 + vPulseIntensity * 2.5);
          vGlow = 0.5 + 0.5 * sin(uTime * 0.5 + distanceFromRoot * 0.2);
          vec3 modifiedPosition = position;
          if (nodeType > 0.5) modifiedPosition += normal * snoise(position * 0.08 + uTime * 0.08) * 0.15;
          vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
          gl_PointSize = pulseSize * uBaseNodeSize * (1000.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
      }`,
      fragmentShader: `
      uniform float uTime;
      uniform vec3 uPulseColors[3];
      varying vec3 vColor;
      varying float vNodeType;
      varying vec3 vPosition;
      varying float vPulseIntensity;
      varying float vDistanceFromRoot;
      varying float vGlow;
      void main() {
          vec2 center = 2.0 * gl_PointCoord - 1.0;
          float dist = length(center);
          if (dist > 1.0) discard;
          float glowStrength = pow(1.0 - smoothstep(0.0, 0.5, dist), 1.2) + (1.0 - smoothstep(0.0, 1.0, dist)) * 0.3;
          vec3 finalColor = vColor * (0.9 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25));
          if (vPulseIntensity > 0.0) {
              finalColor = mix(finalColor, mix(vec3(1.0), uPulseColors[0], 0.4), vPulseIntensity * 0.8);
              finalColor *= (1.0 + vPulseIntensity * 1.2);
              glowStrength *= (1.0 + vPulseIntensity);
          }
          finalColor += vec3(1.0) * smoothstep(0.4, 0.0, dist) * 0.3;
          float alpha = glowStrength * (0.95 - 0.3 * dist) * smoothstep(100.0, 15.0, length(vPosition - cameraPosition));
          gl_FragColor = vec4(finalColor * (1.0 + vGlow * 0.1), alpha);
      }`
    };

    const connectionShader = {
      vertexShader: `${noiseFunctions}
      attribute vec3 startPoint;
      attribute vec3 endPoint;
      attribute float connectionStrength;
      attribute float pathIndex;
      attribute vec3 connectionColor;
      uniform float uTime;
      uniform vec3 uPulsePositions[3];
      uniform float uPulseTimes[3];
      uniform float uPulseSpeed;
      varying vec3 vColor;
      varying float vConnectionStrength;
      varying float vPulseIntensity;
      varying float vPathPosition;
      varying float vDistanceFromCamera;
      float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
          if (pulseTime < 0.0) return 0.0;
          float timeSinceClick = uTime - pulseTime;
          if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
          float pulseRadius = timeSinceClick * uPulseSpeed;
          float distToClick = distance(worldPos, pulsePos);
          float waveProximity = abs(distToClick - pulseRadius);
          return smoothstep(3.0, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
      }
      void main() {
          float t = position.x; vPathPosition = t;
          vec3 midPoint = mix(startPoint, endPoint, 0.5);
          vec3 perp = normalize(cross(normalize(endPoint - startPoint), vec3(0.0, 1.0, 0.0)));
          if (length(perp) < 0.1) perp = vec3(1.0, 0.0, 0.0);
          midPoint += perp * (sin(t * 3.14159) * 0.15);
          vec3 finalPos = mix(mix(startPoint, midPoint, t), mix(midPoint, endPoint, t), t);
          finalPos += perp * snoise(vec3(pathIndex * 0.08, t * 0.6, uTime * 0.15)) * 0.12;
          vPulseIntensity = 0.0;
          for (int i = 0; i < 3; i++) vPulseIntensity += getPulseIntensity((modelMatrix * vec4(finalPos, 1.0)).xyz, uPulsePositions[i], uPulseTimes[i]);
          vPulseIntensity = min(vPulseIntensity, 1.0);
          vColor = connectionColor; vConnectionStrength = connectionStrength;
          vDistanceFromCamera = length((modelMatrix * vec4(finalPos, 1.0)).xyz - cameraPosition);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      }`,
      fragmentShader: `
      uniform float uTime;
      uniform vec3 uPulseColors[3];
      varying vec3 vColor;
      varying float vConnectionStrength;
      varying float vPulseIntensity;
      varying float vPathPosition;
      varying float vDistanceFromCamera;
      void main() {
          float combinedFlow = (sin(vPathPosition * 25.0 - uTime * 4.0) * 0.5 + 0.5 + (sin(vPathPosition * 15.0 - uTime * 2.5 + 1.57) * 0.5 + 0.5) * 0.5) / 1.5;
          vec3 finalColor = vColor * (0.8 + 0.2 * sin(uTime * 0.6 + vPathPosition * 12.0));
          float flowIntensity = 0.4 * combinedFlow * vConnectionStrength;
          if (vPulseIntensity > 0.0) {
              finalColor = mix(finalColor, mix(vec3(1.0), uPulseColors[0], 0.3) * 1.2, vPulseIntensity * 0.7);
              flowIntensity += vPulseIntensity * 0.8;
          }
          float alpha = (0.7 * vConnectionStrength + combinedFlow * 0.3);
          alpha = mix(alpha, min(1.0, alpha * 2.5), vPulseIntensity);
          gl_FragColor = vec4(finalColor * (0.7 + flowIntensity + vConnectionStrength * 0.5), alpha * smoothstep(100.0, 15.0, vDistanceFromCamera));
      }`
    };

    class Node {
      position: THREE.Vector3;
      connections: { node: Node; strength: number }[] = [];
      level: number;
      type: number;
      size: number;
      distanceFromRoot: number = 0;
      helixIndex?: number;
      helixT?: number;

      constructor(position: THREE.Vector3, level = 0, type = 0) {
        this.position = position;
        this.level = level;
        this.type = type;
        this.size = type === 0 ? THREE.MathUtils.randFloat(0.8, 1.4) : THREE.MathUtils.randFloat(0.5, 1.0);
      }
      addConnection(node: Node, strength = 1.0) {
        if (!this.isConnectedTo(node)) {
          this.connections.push({ node, strength });
          node.connections.push({ node: this, strength });
        }
      }
      isConnectedTo(node: Node) {
        return this.connections.some(conn => conn.node === node);
      }
    }

    function generateNeuralNetwork(formationIndex: number, densityFactor = 1.0) {
      let nodes: Node[] = [];
      let rootNode: Node;

      if (formationIndex % 3 === 0) {
        rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 2.0; nodes.push(rootNode);
        for (let layer = 1; layer <= 5; layer++) {
          const radius = layer * 4; const numPoints = Math.floor(layer * 12 * densityFactor);
          for (let i = 0; i < numPoints; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints); const theta = 2 * Math.PI * i / ((1 + Math.sqrt(5)) / 2);
            const node = new Node(new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)), layer, (layer === 5 || Math.random() < 0.3) ? 1 : 0);
            node.distanceFromRoot = radius; nodes.push(node);
            if (layer > 1) {
              const prev = nodes.filter(n => n.level === layer - 1 && n !== rootNode).sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position));
              for (let j = 0; j < Math.min(3, prev.length); j++) node.addConnection(prev[j], Math.max(0.3, 1.0 - (node.position.distanceTo(prev[j].position) / (radius * 2))));
            } else rootNode.addConnection(node, 0.9);
          }
          const layerNodes = nodes.filter(n => n.level === layer && n !== rootNode);
          for (const node of layerNodes) {
            const nearby = layerNodes.filter(n => n !== node).sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position)).slice(0, 5);
            for (const near of nearby) if (node.position.distanceTo(near.position) < radius * 0.8 && !node.isConnectedTo(near)) node.addConnection(near, 0.6);
          }
        }
      } else if (formationIndex % 3 === 1) {
        rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.8; nodes.push(rootNode);
        const helixArrays: Node[][] = [];
        for (let h = 0; h < 4; h++) {
          const phase = (h / 4) * Math.PI * 2; const helixNodes: Node[] = [];
          for (let i = 0; i < Math.floor(50 * densityFactor); i++) {
            const t = i / (Math.floor(50 * densityFactor) - 1); const radius = 12 * (Math.sin(t * Math.PI) * 0.7 + 0.3);
            const node = new Node(new THREE.Vector3(radius * Math.cos(phase + t * Math.PI * 6), (t - 0.5) * 30, radius * Math.sin(phase + t * Math.PI * 6)), Math.ceil(t * 5), (i > Math.floor(50 * densityFactor) - 5 || Math.random() < 0.25) ? 1 : 0);
            node.distanceFromRoot = node.position.length(); node.helixIndex = h; node.helixT = t; nodes.push(node); helixNodes.push(node);
          }
          helixArrays.push(helixNodes); rootNode.addConnection(helixNodes[0], 1.0);
          for (let i = 0; i < helixNodes.length - 1; i++) helixNodes[i].addConnection(helixNodes[i + 1], 0.85);
        }
        for (let h = 0; h < 4; h++) {
          const cur = helixArrays[h]; const nxt = helixArrays[(h + 1) % 4];
          for (let i = 0; i < cur.length; i += 5) {
            const targetIdx = Math.round(cur[i].helixT! * (nxt.length - 1));
            if (targetIdx < nxt.length) cur[i].addConnection(nxt[targetIdx], 0.7);
          }
        }
      } else {
        rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.6; nodes.push(rootNode);
        const createBranch = (startNode: Node, direction: THREE.Vector3, depth: number, strength: number, scale: number) => {
          if (depth > 4) return;
          const endPos = startNode.position.clone().add(direction.clone().multiplyScalar(5 * scale));
          const newNode = new Node(endPos, depth, (depth === 4 || Math.random() < 0.3) ? 1 : 0);
          newNode.distanceFromRoot = endPos.length(); nodes.push(newNode); startNode.addConnection(newNode, strength);
          if (depth < 4) {
            for (let i = 0; i < 3; i++) {
              const angle = (i / 3) * Math.PI * 2; const p1 = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
              const p2 = direction.clone().cross(p1).normalize();
              createBranch(newNode, direction.clone().add(p1.multiplyScalar(Math.cos(angle) * 0.7)).add(p2.multiplyScalar(Math.sin(angle) * 0.7)).normalize(), depth + 1, strength * 0.7, scale * 0.75);
            }
          }
        };
        for (let i = 0; i < 6; i++) {
          const phi = Math.acos(1 - 2 * (i + 0.5) / 6); const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          createBranch(rootNode, new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)).normalize(), 1, 0.9, 1.0);
        }
      }
      return { nodes, rootNode };
    }

    let nodesMesh: THREE.Points | null = null;
    let connectionsMesh: THREE.LineSegments | null = null;
    let currentNetwork: { nodes: Node[]; rootNode: Node } | null = null;

    const createNetworkVisualization = (formationIndex: number, densityFactor = 1.0) => {
      if (nodesMesh) { scene.remove(nodesMesh); nodesMesh.geometry.dispose(); (nodesMesh.material as THREE.ShaderMaterial).dispose(); }
      if (connectionsMesh) { scene.remove(connectionsMesh); connectionsMesh.geometry.dispose(); (connectionsMesh.material as THREE.ShaderMaterial).dispose(); }
      
      currentNetwork = generateNeuralNetwork(formationIndex, densityFactor);
      const palette = colorPalettes[config.activePaletteIndex];
      
      const nodesGeo = new THREE.BufferGeometry();
      const nodePos: number[] = [], nodeT: number[] = [], nodeS: number[] = [], nodeC: number[] = [], nodeD: number[] = [];
      currentNetwork.nodes.forEach(node => {
        nodePos.push(node.position.x, node.position.y, node.position.z); nodeT.push(node.type); nodeS.push(node.size); nodeD.push(node.distanceFromRoot);
        const color = palette[Math.min(node.level, palette.length - 1) % palette.length].clone();
        color.offsetHSL(THREE.MathUtils.randFloatSpread(0.03), THREE.MathUtils.randFloatSpread(0.08), THREE.MathUtils.randFloatSpread(0.08));
        nodeC.push(color.r, color.g, color.b);
      });
      nodesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePos, 3));
      nodesGeo.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeT, 1));
      nodesGeo.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeS, 1));
      nodesGeo.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeC, 3));
      nodesGeo.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(nodeD, 1));
      nodesMesh = new THREE.Points(nodesGeo, new THREE.ShaderMaterial({ uniforms: THREE.UniformsUtils.clone(pulseUniforms), vertexShader: nodeShader.vertexShader, fragmentShader: nodeShader.fragmentShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      scene.add(nodesMesh);

      const connGeo = new THREE.BufferGeometry();
      const connC: number[] = [], connS: number[] = [], connP: number[] = [], startP: number[] = [], endP: number[] = [], pathI: number[] = [];
      const processed = new Set<string>(); let pathIdx = 0;
      currentNetwork.nodes.forEach((node, ni) => {
        node.connections.forEach(conn => {
          const ci = currentNetwork!.nodes.indexOf(conn.node); if (ci === -1) return;
          const key = [Math.min(ni, ci), Math.max(ni, ci)].join('-');
          if (!processed.has(key)) {
            processed.add(key);
            for (let i = 0; i < 20; i++) {
              connP.push(i / 19, 0, 0); startP.push(node.position.x, node.position.y, node.position.z); endP.push(conn.node.position.x, conn.node.position.y, conn.node.position.z);
              pathI.push(pathIdx); connS.push(conn.strength);
              const color = palette[Math.min(Math.floor((node.level + conn.node.level) / 2), palette.length - 1) % palette.length].clone();
              color.offsetHSL(THREE.MathUtils.randFloatSpread(0.03), THREE.MathUtils.randFloatSpread(0.08), THREE.MathUtils.randFloatSpread(0.08));
              connC.push(color.r, color.g, color.b);
            }
            pathIdx++;
          }
        });
      });
      connGeo.setAttribute('position', new THREE.Float32BufferAttribute(connP, 3));
      connGeo.setAttribute('startPoint', new THREE.Float32BufferAttribute(startP, 3));
      connGeo.setAttribute('endPoint', new THREE.Float32BufferAttribute(endP, 3));
      connGeo.setAttribute('connectionStrength', new THREE.Float32BufferAttribute(connS, 1));
      connGeo.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connC, 3));
      connGeo.setAttribute('pathIndex', new THREE.Float32BufferAttribute(pathI, 1));
      connectionsMesh = new THREE.LineSegments(connGeo, new THREE.ShaderMaterial({ uniforms: THREE.UniformsUtils.clone(pulseUniforms), vertexShader: connectionShader.vertexShader, fragmentShader: connectionShader.fragmentShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      scene.add(connectionsMesh);

      palette.forEach((color, i) => { if (i < 3) { (nodesMesh!.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[i].copy(color); (connectionsMesh!.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[i].copy(color); } });
    };

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!config.paused) {
        if (nodesMesh) { (nodesMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = t; nodesMesh.rotation.y = Math.sin(t * 0.04) * 0.05; }
        if (connectionsMesh) { (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = t; connectionsMesh.rotation.y = Math.sin(t * 0.04) * 0.05; }
      }
      starField.rotation.y += 0.0002;
      (starField.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      controls.update();
      composer.render();
    };

    const triggerPulse = (clientX: number, clientY: number) => {
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
      const plane = new THREE.Plane(camera.position.clone().normalize(), -camera.position.clone().normalize().dot(camera.position) + camera.position.length() * 0.5);
      const point = new THREE.Vector3();
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(plane, point)) {
        const time = clock.getElapsedTime();
        if (nodesMesh && connectionsMesh) {
          const idx = (Math.floor(time * 10)) % 3;
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulsePositions.value[idx].copy(point);
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulseTimes.value[idx] = time;
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulsePositions.value[idx].copy(point);
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulseTimes.value[idx] = time;
          const color = colorPalettes[config.activePaletteIndex][Math.floor(Math.random() * 3)];
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[idx].copy(color);
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[idx].copy(color);
        }
      }
    };

    networkRef.current = {
      triggerPulse,
      updateTheme: (index) => { config.activePaletteIndex = index; createNetworkVisualization(config.currentFormation, config.densityFactor); },
      morphFormation: () => { config.currentFormation = (config.currentFormation + 1) % 3; createNetworkVisualization(config.currentFormation, config.densityFactor); controls.autoRotate = false; setTimeout(() => controls.autoRotate = true, 2500); },
      updateDensity: (val) => { config.densityFactor = val / 100; createNetworkVisualization(config.currentFormation, config.densityFactor); },
      resetCamera: () => { controls.reset(); controls.autoRotate = false; setTimeout(() => controls.autoRotate = true, 2000); }
    };

    const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); composer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', handleResize);

    createNetworkVisualization(0);
    animate();

    return () => { window.removeEventListener('resize', handleResize); renderer.dispose(); };
  }, []);

  return (
    <div ref={containerRef} className="horizontal-section bg-black flex items-center justify-center relative overflow-hidden h-screen w-screen selection:bg-none">
      <style>{`
        :root {
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --glass-highlight: rgba(255, 255, 255, 0.2);
            --text-main: rgba(255, 255, 255, 0.9);
            --text-muted: rgba(255, 255, 255, 0.6);
        }
        .glass-panel {
            backdrop-filter: blur(24px) saturate(120%);
            -webkit-backdrop-filter: blur(24px) saturate(120%);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
            border: 1px solid var(--glass-border);
            border-top: 1px solid var(--glass-highlight);
            border-left: 1px solid var(--glass-highlight);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.02);
            border-radius: 24px; color: var(--text-main); transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: absolute; z-index: 10; overflow: hidden;
        }
        .glass-panel:hover { transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.15); }
        .theme-button {
            width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer; position: relative;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .theme-button::after {
            content: ''; position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.8); opacity: 0; transform: scale(1.1); transition: all 0.3s ease;
        }
        .theme-button.active::after { opacity: 1; transform: scale(1); }
        .density-slider { -webkit-appearance: none; width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; outline: none; }
        .density-slider::-webkit-slider-thumb {
            -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; cursor: pointer;
            box-shadow: 0 0 15px rgba(255,255,255,0.8); transition: all 0.2s ease; margin-top: -6px;
        }
        .control-button {
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-main); padding: 12px 24px; border-radius: 50px;
            cursor: pointer; font-size: 13px; font-weight: 500; text-transform: uppercase; transition: all 0.3s ease;
        }
        .control-button:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-4px); }
        .impact-text {
            background: linear-gradient(135deg, #fff 30%, #a5b4fc 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Instructions */}
      <div className="glass-panel top-8 left-8 w-[280px] p-6 hidden md:block">
        <div className="impact-text font-poppins font-bold text-lg mb-2">Quantum Neural Network</div>
        <div className="text-sm text-white/60 font-light">
          Haz clic para enviar pulsos de energía.<br />Arrastra para explorar la estructura.
        </div>
      </div>

      {/* Theme & Density */}
      <div className="glass-panel top-8 right-8 w-[240px] p-6 flex flex-col gap-6 hidden md:flex">
        <div>
          <div className="text-[10px] uppercase tracking-[2px] text-white/60 mb-3 font-bold">Tema de Cristal</div>
          <div className="grid grid-cols-3 gap-3 justify-items-center">
            {[0, 1, 2].map(idx => (
              <button
                key={idx}
                className={`theme-button ${activeTheme === idx ? 'active' : ''}`}
                style={{ background: idx === 0 ? 'radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95)' : idx === 1 ? 'radial-gradient(circle at 30% 30%, #fb7185, #9f1239)' : 'radial-gradient(circle at 30% 30%, #38bdf8, #0c4a6e)' }}
                onClick={() => { setActiveTheme(idx); networkRef.current?.updateTheme(idx); }}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-white/60 mb-2">
            <span>Densidad</span>
            <span className="text-white font-bold">{density}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={density}
            className="density-slider"
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setDensity(val);
              networkRef.current?.updateDensity(val);
            }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <button className="control-button" onClick={() => networkRef.current?.morphFormation()}>Morph</button>
        <button className="control-button" onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Freeze'}</button>
        <button className="control-button" onClick={() => networkRef.current?.resetCamera()}>Reset</button>
      </div>

      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair absolute inset-0 z-[1]"
        onClick={(e) => !paused && networkRef.current?.triggerPulse(e.clientX, e.clientY)}
      />
    </div>
  );
};

export default NeuralNexusSection;
