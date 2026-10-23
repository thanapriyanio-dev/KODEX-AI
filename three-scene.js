/**
 * KODEX AI — THREE.JS 3D CREATIVE AMBIENT EXPERIENCE
 * Features:
 * - Dimensional Cyber Hologram Core (Rotating Wireframe Gyroscope & Polyhedrons)
 * - Dynamic Wave Particle Lattice with Mouse Gravity & Inertia
 * - Theme-Reactive WebGL Lighting (Cyber Obsidian, Cosmic Nebula, Emerald, Solar)
 */

(function () {
  const canvas = document.getElementById('ambient-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const lightCyan = new THREE.PointLight(0x06b6d4, 3, 70);
  lightCyan.position.set(18, 20, 15);
  scene.add(lightCyan);

  const lightViolet = new THREE.PointLight(0x8b5cf6, 2.5, 70);
  lightViolet.position.set(-20, -15, 15);
  scene.add(lightViolet);

  const lightAmber = new THREE.PointLight(0xf59e0b, 1.8, 50);
  lightAmber.position.set(0, -20, 10);
  scene.add(lightAmber);

  // Group for all 3D floating elements
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // =========================================================================
  // 1. CENTRAL HOLOGRAPHIC GYROSCOPE CORE
  // =========================================================================
  const coreGroup = new THREE.Group();
  coreGroup.position.set(12, 2, -4); // Positioned near hero interactive cockpit
  mainGroup.add(coreGroup);

  // Outer Ring
  const outerRingGeo = new THREE.TorusGeometry(5.2, 0.08, 16, 100);
  const ringMatCyan = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });
  const outerRing = new THREE.Mesh(outerRingGeo, ringMatCyan);
  coreGroup.add(outerRing);

  // Middle Ring
  const midRingGeo = new THREE.TorusGeometry(4.0, 0.06, 16, 100);
  const ringMatViolet = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.65,
    wireframe: true
  });
  const midRing = new THREE.Mesh(midRingGeo, ringMatViolet);
  midRing.rotation.x = Math.PI / 4;
  coreGroup.add(midRing);

  // Inner Icosahedron Core
  const innerCoreGeo = new THREE.IcosahedronGeometry(2.4, 1);
  const innerCoreMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
    roughness: 0.2,
    metalness: 0.9
  });
  const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
  coreGroup.add(innerCore);

  // Inner Glowing Sphere
  const sphereGeo = new THREE.SphereGeometry(1.2, 24, 24);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35
  });
  const innerGlowSphere = new THREE.Mesh(sphereGeo, sphereMat);
  coreGroup.add(innerGlowSphere);

  // =========================================================================
  // 2. SCATTERED 3D FLOATING TECH GEOMETRIES
  // =========================================================================
  const geometries = [
    new THREE.IcosahedronGeometry(1.5, 0),
    new THREE.OctahedronGeometry(1.3, 0),
    new THREE.TorusGeometry(1.2, 0.3, 16, 32),
    new THREE.DodecahedronGeometry(1.4, 0),
    new THREE.BoxGeometry(1.6, 1.6, 1.6),
    new THREE.TetrahedronGeometry(1.4, 0)
  ];

  const floatingItems = [];

  for (let i = 0; i < 22; i++) {
    const geom = geometries[i % geometries.length];
    const isCyan = i % 2 === 0;
    
    const mat = new THREE.MeshStandardMaterial({
      color: isCyan ? 0x06b6d4 : 0x8b5cf6,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: i % 3 === 0,
      transparent: true,
      opacity: 0.75
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = (Math.random() - 0.5) * 56;
    mesh.position.y = (Math.random() - 0.5) * 40;
    mesh.position.z = (Math.random() - 0.5) * 20 - 5;

    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.015,
      rotZ: (Math.random() - 0.5) * 0.01,
      floatSpeed: 0.6 + Math.random() * 0.8,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: mesh.position.y,
      baseX: mesh.position.x
    };

    mainGroup.add(mesh);
    floatingItems.push(mesh);
  }

  // =========================================================================
  // 3. DYNAMIC WAVE PARTICLE LATTICE
  // =========================================================================
  const particleCount = 260;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const originalPos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const x = (Math.random() - 0.5) * 70;
    const y = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 26;

    particlePos[i] = x;
    particlePos[i + 1] = y;
    particlePos[i + 2] = z;

    originalPos[i] = x;
    originalPos[i + 1] = y;
    originalPos[i + 2] = z;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.45,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // =========================================================================
  // 4. MOUSE PARALLAX & INTERACTIVE PHYSICS
  // =========================================================================
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  let scrollProgress = 0;
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, { passive: true });

  // Theme Switching Event Hook
  window.addEventListener('themeChanged', (e) => {
    const theme = e.detail?.theme || 'theme-cyber';
    if (theme === 'theme-nebula') {
      lightCyan.color.setHex(0xd946ef); // Fuchsia
      lightViolet.color.setHex(0x8b5cf6); // Purple
      particleMat.color.setHex(0xf472b6);
      ringMatCyan.color.setHex(0xd946ef);
      innerCoreMat.color.setHex(0xa855f7);
    } else if (theme === 'theme-emerald') {
      lightCyan.color.setHex(0x10b981); // Emerald
      lightViolet.color.setHex(0x06b6d4); // Cyan
      particleMat.color.setHex(0x34d399);
      ringMatCyan.color.setHex(0x10b981);
      innerCoreMat.color.setHex(0x059669);
    } else if (theme === 'theme-solar') {
      lightCyan.color.setHex(0x0284c7); // Deep Sky Blue
      lightViolet.color.setHex(0x6366f1); // Indigo
      particleMat.color.setHex(0x0284c7);
      ringMatCyan.color.setHex(0x0284c7);
      innerCoreMat.color.setHex(0x4338ca);
      ambientLight.intensity = 1.0;
    } else {
      // Default Cyber Obsidian
      lightCyan.color.setHex(0x06b6d4);
      lightViolet.color.setHex(0x8b5cf6);
      particleMat.color.setHex(0x38bdf8);
      ringMatCyan.color.setHex(0x06b6d4);
      innerCoreMat.color.setHex(0x6366f1);
      ambientLight.intensity = 0.6;
    }
  });

  // Responsive Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // =========================================================================
  // 5. ANIMATION LOOP
  // =========================================================================
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse inertia
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // Camera subtle parallax & scroll depth transition
    camera.position.x = mouseX * 2.8;
    camera.position.y = mouseY * 2.2 - scrollProgress * 5.0;
    camera.lookAt(0, -scrollProgress * 2.5, 0);

    mainGroup.rotation.y = scrollProgress * 0.45;

    // Rotate Central Hologram Core
    if (coreGroup) {
      outerRing.rotation.x = elapsedTime * 0.4;
      outerRing.rotation.y = elapsedTime * 0.3;

      midRing.rotation.y = -elapsedTime * 0.5;
      midRing.rotation.z = elapsedTime * 0.35;

      innerCore.rotation.x = elapsedTime * 0.6;
      innerCore.rotation.y = elapsedTime * 0.8;

      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      innerGlowSphere.scale.set(pulse, pulse, pulse);

      // Core tracks mouse slightly and ascends out of view on scroll so it stays in hero
      coreGroup.position.x = 12 + mouseX * 2;
      coreGroup.position.y = 2 + mouseY * 1.5 + scrollProgress * 28;
    }

    // Floating Geometries motion
    floatingItems.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotX;
      mesh.rotation.y += mesh.userData.rotY;
      mesh.rotation.z += mesh.userData.rotZ;

      mesh.position.y = mesh.userData.baseY + Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 1.8;
      mesh.position.x = mesh.userData.baseX + Math.cos(elapsedTime * 0.4 + mesh.userData.floatOffset) * 1.0;
    });

    // Particle Wave Animation
    const positions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
      const origX = originalPos[i];
      const origY = originalPos[i + 1];
      const origZ = originalPos[i + 2];

      // Subtle sine wave displacement
      positions[i + 1] = origY + Math.sin(elapsedTime * 1.2 + origX * 0.12) * 1.2;
      positions[i] = origX + Math.cos(elapsedTime * 0.8 + origY * 0.1) * 0.8;
    }
    particleGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();
