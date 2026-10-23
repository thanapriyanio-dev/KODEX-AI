/**
 * KODEX AI — THE COGNITIVE CAREER OS
 * Next-Gen Interactive Controller:
 * - 4-Theme Creative Switcher (Cyber Void, Cosmic Nebula, Emerald Matrix, Solar Platinum)
 * - 3D Mouse Gyroscope Cockpit Parallax
 * - Live AI Voice Studio & Real-time Canvas Equalizer
 * - Interactive Code Execution Terminal (In-Hero & Arena IDE)
 * - Dynamic CTC Salary Predictor with Celebration Confetti
 * - Web Audio API Synthesis Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CUSTOM MAGNETIC LUMINESCENT CURSOR
  // =========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Enlarge cursor on interactive links and buttons
  document.querySelectorAll('a, button, input, .comp-pill-btn, .comp-chip, .card-3d-tilt').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) {
        cursorRing.style.width = '48px';
        cursorRing.style.height = '48px';
        cursorRing.style.borderColor = 'var(--accent-cyan)';
        cursorRing.style.background = 'rgba(6, 182, 212, 0.08)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) {
        cursorRing.style.width = '32px';
        cursorRing.style.height = '32px';
        cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.55)';
        cursorRing.style.background = 'transparent';
      }
    });
  });

  // =========================================================================
  // 2. AUDIO SYNTHESIZER (Web Audio API - Zero External Dependencies)
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        freqs.forEach((freq, idx) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + idx * 0.06);
          g.gain.setValueAtTime(0.1, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.28);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.28);
        });
      }
    } catch (e) {
      console.warn('Audio feedback:', e);
    }
  }

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) {
        soundIcon.setAttribute('data-lucide', soundEnabled ? 'volume-2' : 'volume-x');
        lucide.createIcons();
      }
      if (soundEnabled) playSound('pop');
    });
  }

  // =========================================================================
  // 3. 4-THEME CREATIVE PALETTE CONTROLLER
  // =========================================================================
  const themeSelectorWrap = document.getElementById('theme-selector-wrap');
  const themePillBtn = document.getElementById('theme-pill-btn');
  const currentThemeLabel = document.getElementById('current-theme-label');
  const themeOptButtons = document.querySelectorAll('.theme-opt-btn');

  const themeClassMap = {
    cyber: 'theme-cyber',
    nebula: 'theme-nebula',
    emerald: 'theme-emerald',
    solar: 'theme-solar'
  };

  const themeNameMap = {
    cyber: 'Cyber Void',
    nebula: 'Cosmic Nebula',
    emerald: 'Emerald Matrix',
    solar: 'Solar Platinum'
  };

  if (themePillBtn && themeSelectorWrap) {
    themePillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeSelectorWrap.classList.toggle('open');
      playSound('pop');
    });

    document.addEventListener('click', () => {
      themeSelectorWrap.classList.remove('open');
    });
  }

  function applyTheme(themeKey) {
    // Remove old classes
    document.body.classList.remove('theme-cyber', 'theme-nebula', 'theme-emerald', 'theme-solar');
    
    // Add new class
    const newClass = themeClassMap[themeKey] || 'theme-cyber';
    document.body.classList.add(newClass);

    // Update label
    if (currentThemeLabel) {
      currentThemeLabel.textContent = themeNameMap[themeKey] || 'Theme';
    }

    // Update active button state
    themeOptButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === themeKey);
    });

    // Notify Three.js 3D Canvas
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newClass } }));
  }

  themeOptButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = btn.dataset.theme;
      applyTheme(selected);
      if (themeSelectorWrap) themeSelectorWrap.classList.remove('open');
      playSound('pop');
      triggerMiniSparkles();
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(12, 16, 28, 0.98)';
      navLinks.style.padding = '20px';
      navLinks.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      navLinks.style.borderRadius = '16px';
      playSound('pop');
    });
  }

  // =========================================================================
  // 4. 3D GYROSCOPE MOUSE PARALLAX TILT
  // =========================================================================
  const tiltCards = document.querySelectorAll('.card-3d-tilt');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // =========================================================================
  // 5. IN-HERO 3D COCKPIT LIVE EQUALIZER & RUN BUTTON
  // =========================================================================
  const cockpitWaveCanvas = document.getElementById('cockpit-waveform-canvas');
  if (cockpitWaveCanvas) {
    const cCtx = cockpitWaveCanvas.getContext('2d');
    let cOffset = 0;

    function resizeCockpitWave() {
      cockpitWaveCanvas.width = cockpitWaveCanvas.parentElement.clientWidth;
      cockpitWaveCanvas.height = 54;
    }
    resizeCockpitWave();
    window.addEventListener('resize', resizeCockpitWave);

    function drawCockpitWave() {
      requestAnimationFrame(drawCockpitWave);
      cCtx.clearRect(0, 0, cockpitWaveCanvas.width, cockpitWaveCanvas.height);

      const w = cockpitWaveCanvas.width;
      const h = cockpitWaveCanvas.height;
      const centerY = h / 2;

      const bars = 36;
      const bWidth = w / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * bWidth;
        const s = Math.sin((i * 0.35) + cOffset);
        const c = Math.cos((i * 0.2) - cOffset * 0.9);
        const barHeight = Math.abs(s * c) * (h * 0.75) + 4;

        cCtx.fillStyle = 'rgba(6, 182, 212, 0.75)';
        cCtx.fillRect(x + 2, centerY - barHeight / 2, bWidth - 4, barHeight);
      }
      cOffset += 0.09;
    }
    drawCockpitWave();
  }

  // In-Hero Code Execution Button
  const cockpitRunBtn = document.getElementById('cockpit-run-btn');
  const cockpitExecOutput = document.getElementById('cockpit-exec-output');
  if (cockpitRunBtn && cockpitExecOutput) {
    cockpitRunBtn.addEventListener('click', () => {
      playSound('click');
      cockpitExecOutput.innerHTML = `<span><i data-lucide="loader"></i> Compiling kernel AST...</span><strong style="color:var(--accent-amber);">Running</strong>`;
      lucide.createIcons();

      setTimeout(() => {
        playSound('success');
        triggerMiniSparkles();
        cockpitExecOutput.innerHTML = `<span><i data-lucide="check-circle-2"></i> All Checks Passed (O(1) space)</span><strong style="color:var(--accent-emerald);">MATCH: 99.4% [OFFER READY]</strong>`;
        lucide.createIcons();
      }, 700);
    });
  }

  // =========================================================================
  // 6. TARGET COMPANY BLUEPRINT CONTROLLER
  // =========================================================================
  const companyData = {
    zoho: {
      name: 'Zoho Corp',
      role: 'Software Craftsman & Member Technical Staff',
      salary: '₹12.0 – ₹18.0 LPA',
      focus: 'C/Java Pointers, Zero-Library Strings, LLD (Railway/Taxi CLI)',
      rounds: 'Round 1 (Apt) → Round 2 (Basic) → Round 3 (Advanced LLD) → HR',
      probability: '98.8%',
      roadmapTitle: 'Zoho Corporation: Software Craftsman Blueprint',
      steps: [
        { num: 'PHASE 01', title: 'Round 1: General & Tech Aptitude Mastery', desc: '400+ Speed math, C-pointers dry runs, and pseudo-code tracing under time pressure.' },
        { num: 'PHASE 02', title: 'Round 2: Basic Programming (No Built-in Methods)', desc: 'String manipulations, nested loops, spiral matrices, pattern printing without library helpers.' },
        { num: 'PHASE 03', title: 'Round 3: Advanced Programming & Data Structures', desc: 'Railway reservation system, Snake & Ladder, Call Taxi booking console application.' },
        { num: 'PHASE 04', title: 'Round 4: Technical & HR Culture Alignment', desc: '1-on-1 AI mock interviews evaluating loyalty, attitude, and architectural rationale.' }
      ]
    },
    google: {
      name: 'Google',
      role: 'Software Engineer L3 / L4 Systems',
      salary: '₹36.0 – ₹52.0 LPA',
      focus: 'Topological Sort, Bitmask DP, Scalable Concurrency & Heuristics',
      rounds: 'Screening → 3x Coding (Graphs/DP) → Googlyness Behavioral',
      probability: '96.4%',
      roadmapTitle: 'Google: Software Engineer L3/L4 Track',
      steps: [
        { num: 'PHASE 01', title: 'Advanced Graph Algorithms & Shortest Path', desc: 'Dijkstra, Bellman-Ford, Tarjan strongly connected components with edge case probes.' },
        { num: 'PHASE 02', title: 'Dynamic Programming & Bitmask States', desc: 'Knapsack variations, interval DP, matrix exponentiation optimization.' },
        { num: 'PHASE 03', title: 'Scalable Concurrency & Memory Profiling', desc: 'Multithreading, lock-free queues, race conditions handling.' },
        { num: 'PHASE 04', title: 'Googleyness & Live Scenario Defense', desc: 'AI-led cross-examination of ambiguous requirements and engineering tradeoffs.' }
      ]
    },
    microsoft: {
      name: 'Microsoft',
      role: 'SDE Core & Azure Cloud Infrastructure',
      salary: '₹24.0 – ₹42.0 LPA',
      focus: 'Binary Trees, LRU Caching, Thread-Safe Design Patterns',
      rounds: 'OA Codility → 2 Tech Coding → As-Appropriate (AA) Director',
      probability: '97.6%',
      roadmapTitle: 'Microsoft: SDE Core & Azure Cloud',
      steps: [
        { num: 'PHASE 01', title: 'Online Assessment (Codility) Speed Drill', desc: 'Array sliding windows, prefix sums, and strict 100% test case pass guarantees.' },
        { num: 'PHASE 02', title: 'Binary Trees & Graph Traversals', desc: 'Lowest Common Ancestor, Trie indexing, graph cycle detection.' },
        { num: 'PHASE 03', title: 'Low Level Architecture & Design Patterns', desc: 'Factory, Observer, Singleton, and thread-safe caching designs.' },
        { num: 'PHASE 04', title: 'As-Appropriate (AA) Director Mock Round', desc: 'Comprehensive behavioral review with our AI mimicking Microsoft engineering directors.' }
      ]
    },
    amazon: {
      name: 'Amazon',
      role: 'SDE-I & AWS Cloud Services',
      salary: '₹28.0 – ₹40.0 LPA',
      focus: 'Heaps, Priority Queues, 16 Leadership Principles (STAR Format)',
      rounds: 'OA1/OA2 → 3x Coding Rounds → Bar Raiser Cultural',
      probability: '97.2%',
      roadmapTitle: 'Amazon: SDE-1 & AWS Cloud Track',
      steps: [
        { num: 'PHASE 01', title: 'Amazon OA1 & OA2 Simulation', desc: 'Debugging section, 2 DSA questions under 70 minutes, Work Style Assessment.' },
        { num: 'PHASE 02', title: 'Heaps, Trees & Priority Queues', desc: 'Top K frequent elements, Median in a stream, Merge K sorted lists.' },
        { num: 'PHASE 03', title: 'System Design for SDE-1', desc: 'Design URL shortener, Rate limiter, and distributed key-value store.' },
        { num: 'PHASE 04', title: '16 Leadership Principles Drill', desc: 'AI checks whether your answers demonstrate Ownership, Dive Deep, and Bias for Action.' }
      ]
    },
    uber: {
      name: 'Uber',
      role: 'Distributed Backend & High-Scale Systems',
      salary: '₹38.0 – ₹55.0 LPA',
      focus: 'Geohashing, Quadtrees, Concurrency, Real-Time Dispatch',
      rounds: 'OA Screening → System Design → Algorithmic Concurrency',
      probability: '95.8%',
      roadmapTitle: 'Uber: Distributed Systems & Backend Track',
      steps: [
        { num: 'PHASE 01', title: 'Geospatial Indexing & Data Structures', desc: 'Spatial hashes, KD-Trees, R-Trees for real-time driver-rider dispatch.' },
        { num: 'PHASE 02', title: 'Concurrent Data Structures & Locks', desc: 'Read-write locks, optimistic locking, distributed transactions.' },
        { num: 'PHASE 03', title: 'System Architecture & Message Queues', desc: 'Kafka partitioning, redis pub/sub, idempotent API design.' },
        { num: 'PHASE 04', title: 'Live System Stress Test Simulation', desc: 'AI simulates surge pricing surge loads and demands architectural failover plans.' }
      ]
    }
  };

  let activeCompanyKey = 'zoho';

  const heroTargetRole = document.getElementById('hero-target-role');
  const heroTargetFocus = document.getElementById('hero-target-focus');
  const heroTargetSalary = document.getElementById('hero-target-salary');

  function updateHeroCompany(compKey) {
    if (!companyData[compKey]) return;
    activeCompanyKey = compKey;
    const c = companyData[compKey];

    if (heroTargetRole) heroTargetRole.textContent = `${c.name}: ${c.role}`;
    if (heroTargetFocus) heroTargetFocus.textContent = `Focus: ${c.focus}`;
    if (heroTargetSalary) heroTargetSalary.textContent = c.salary;

    document.querySelectorAll('.comp-pill-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.company === compKey);
    });

    playSound('pop');
    triggerMiniSparkles();
  }

  document.querySelectorAll('.comp-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      updateHeroCompany(btn.dataset.company);
    });
  });

  document.querySelectorAll('[data-switch-company]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const comp = elem.getAttribute('data-switch-company');
      updateHeroCompany(comp);
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // =========================================================================
  // 7. LIVE AI VOICE MOCK STUDIO (DEX STUDIO PRO)
  // =========================================================================
  const waveformCanvas = document.getElementById('voice-waveform-canvas');
  let waveIntensity = 1.0;
  let waveColor = '#06b6d4';

  if (waveformCanvas) {
    const ctx = waveformCanvas.getContext('2d');
    let waveOffset = 0;

    function resizeWaveform() {
      waveformCanvas.width = waveformCanvas.parentElement.clientWidth;
      waveformCanvas.height = 60;
    }
    resizeWaveform();
    window.addEventListener('resize', resizeWaveform);

    function drawWaveform() {
      requestAnimationFrame(drawWaveform);
      ctx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);

      const width = waveformCanvas.width;
      const height = waveformCanvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = waveColor;

      const bars = 48;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const sinVal = Math.sin((i * 0.3) + waveOffset);
        const cosVal = Math.cos((i * 0.15) - waveOffset * 0.8);
        const barHeight = Math.abs(sinVal * cosVal) * (height * 0.7) * waveIntensity + 4;

        ctx.fillStyle = waveColor;
        ctx.fillRect(x + 2, centerY - barHeight / 2, barWidth - 4, barHeight);
      }

      waveOffset += 0.08 * waveIntensity;
    }
    drawWaveform();
  }

  // Voice Studio Controls
  const askZohoBtn = document.getElementById('ask-question-btn');
  const askGoogleBtn = document.getElementById('ask-question-google-btn');
  const simulateCandidateBtn = document.getElementById('simulate-user-reply-btn');
  const studioTranscript = document.getElementById('studio-transcript-box');
  const metricLogic = document.getElementById('metric-logic');
  const metricConf = document.getElementById('metric-conf');
  const hudScore = document.getElementById('hud-composite-score');

  function updateStudioTranscript(speaker, text, isUser = false) {
    if (!studioTranscript) return;
    const msg = document.createElement('div');
    msg.className = `t-msg ${isUser ? 'user' : 'bot'}`;
    msg.innerHTML = `<strong>${speaker}:</strong> "${text}"`;
    studioTranscript.appendChild(msg);
    studioTranscript.scrollTop = studioTranscript.scrollHeight;
  }

  if (askZohoBtn) {
    askZohoBtn.addEventListener('click', () => {
      playSound('click');
      waveIntensity = 1.4;
      waveColor = '#06b6d4';
      askZohoBtn.classList.add('active');
      if (askGoogleBtn) askGoogleBtn.classList.remove('active');

      updateStudioTranscript('Dex AI', 'For Zoho Round 3: Design a Railway Waiting List Reservation CLI without java.util collections. How do you handle cancellations in O(1)?');
      
      setTimeout(() => { waveIntensity = 0.6; }, 2000);
    });
  }

  if (askGoogleBtn) {
    askGoogleBtn.addEventListener('click', () => {
      playSound('click');
      waveIntensity = 1.6;
      waveColor = '#8b5cf6';
      askGoogleBtn.classList.add('active');
      if (askZohoBtn) askZohoBtn.classList.remove('active');

      updateStudioTranscript('Dex AI', 'Google L4 Graph Round: Given an undirected cluster of data center nodes, detect if disconnecting any 2 edges isolates critical services.');
      
      setTimeout(() => { waveIntensity = 0.6; }, 2000);
    });
  }

  if (simulateCandidateBtn) {
    simulateCandidateBtn.addEventListener('click', () => {
      playSound('pop');
      waveIntensity = 1.8;
      waveColor = '#10b981';

      updateStudioTranscript('Candidate (You)', 'I will implement a Circular Doubly Linked List with custom Node pointers for the waiting queue, avoiding prohibited libraries, and update pointers in O(1) on seat release.', true);

      setTimeout(() => {
        playSound('success');
        triggerMiniSparkles();
        if (metricLogic) metricLogic.textContent = '100%';
        if (metricConf) metricConf.textContent = '98%';
        if (hudScore) hudScore.textContent = '99.4 / 100';
        updateStudioTranscript('Dex AI Evaluation', 'Outstanding! Zero-Library constraint verified. O(1) pointer reconfiguration verified. AI Stress Grade: S+ Tier.');
        waveIntensity = 0.5;
        waveColor = '#06b6d4';
      }, 1300);
    });
  }

  // =========================================================================
  // 8. INTERACTIVE CTC & SALARY PREDICTOR
  // =========================================================================
  const sliderExp = document.getElementById('slider-experience');
  const sliderHours = document.getElementById('slider-hours');
  const yearDisplay = document.getElementById('year-display');
  const hoursDisplay = document.getElementById('hours-display');
  const tierDisplay = document.getElementById('tier-display');
  const ctcDisplay = document.getElementById('dial-ctc-display');
  const deltaDisplay = document.getElementById('dial-delta-display');
  const prepTimeDisplay = document.getElementById('calc-prep-time');
  const probDisplay = document.getElementById('calc-probability');
  const roundsDisplay = document.getElementById('calc-rounds');
  const lockCtcBtn = document.getElementById('lock-ctc-btn');

  let selectedTier = 'product';

  const tierBaseSalary = {
    product: { base: 14.5, name: 'Tier-1 Product (Zoho, Swiggy, Freshworks)', weeks: 8, rounds: 16 },
    faang: { base: 36.0, name: 'FAANG / Tier-1 Global (Google, Microsoft, Uber)', weeks: 14, rounds: 28 },
    startup: { base: 22.0, name: 'High-Growth Unicorn (Razorpay, CRED, Zepto)', weeks: 10, rounds: 20 }
  };

  const yearNames = ['1st Year (Foundations)', '2nd Year (Core DSA)', '3rd Year (Interview Sprint)', 'Final Year (Immediate Drives)'];

  function recalculateCTC() {
    if (!sliderExp || !sliderHours) return;
    const year = parseInt(sliderExp.value, 10);
    const hours = parseFloat(sliderHours.value);
    const tierData = tierBaseSalary[selectedTier];

    if (yearDisplay) yearDisplay.textContent = yearNames[year - 1];
    if (hoursDisplay) hoursDisplay.textContent = `${hours} Hours / Day`;
    if (tierDisplay) tierDisplay.textContent = tierData.name;

    const hoursMultiplier = 0.85 + (hours * 0.12);
    const yearBonus = year === 3 || year === 4 ? 1.15 : 1.0;
    const computedCTC = (tierData.base * hoursMultiplier * yearBonus).toFixed(1);

    if (ctcDisplay) ctcDisplay.textContent = `₹${computedCTC} LPA`;
    if (deltaDisplay) deltaDisplay.textContent = `+${Math.round(computedCTC * 21)}% vs Campus Average`;
    if (prepTimeDisplay) prepTimeDisplay.textContent = `${tierData.weeks} Weeks`;
    if (probDisplay) probDisplay.textContent = `${Math.min(99.4, (88 + hours * 3)).toFixed(1)}%`;
    if (roundsDisplay) roundsDisplay.textContent = `${tierData.rounds} Sessions`;
  }

  if (sliderExp) sliderExp.addEventListener('input', recalculateCTC);
  if (sliderHours) sliderHours.addEventListener('input', recalculateCTC);

  document.querySelectorAll('.tier-sel-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tier-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTier = btn.getAttribute('data-tier');
      playSound('pop');
      recalculateCTC();
    });
  });

  if (lockCtcBtn) {
    lockCtcBtn.addEventListener('click', () => {
      playSound('success');
      triggerConfettiBurst();
      lockCtcBtn.innerHTML = '<i data-lucide="check-check"></i> Target Package Locked & Profile Activated!';
      lucide.createIcons();
    });
  }

  // =========================================================================
  // 9. ROADMAP MODAL CONTROLLER
  // =========================================================================
  const modal = document.getElementById('roadmap-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const roadmapTimeline = document.getElementById('roadmap-timeline-content');
  const viewRoadmapTrigger = document.getElementById('view-roadmap-trigger');

  function openRoadmapModal(compKey) {
    const data = companyData[compKey] || companyData.zoho;
    if (modalTitle) modalTitle.textContent = data.roadmapTitle;

    if (roadmapTimeline) {
      roadmapTimeline.innerHTML = data.steps.map(step => `
        <div class="timeline-step">
          <div class="step-number">${step.num}</div>
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
        </div>
      `).join('');
    }

    if (modal) modal.classList.add('open');
    playSound('click');
  }

  if (viewRoadmapTrigger) {
    viewRoadmapTrigger.addEventListener('click', () => {
      openRoadmapModal(activeCompanyKey);
    });
  }

  document.querySelectorAll('.btn-track-action').forEach((btn) => {
    btn.addEventListener('click', () => {
      const comp = btn.dataset.company || 'zoho';
      openRoadmapModal(comp);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
      playSound('pop');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // =========================================================================
  // 10. MINI-IDE LIVE COMPILER TEST RUNNER
  // =========================================================================
  const runCodeBtn = document.getElementById('run-code-btn');
  const terminalBody = document.getElementById('terminal-body-text');
  const testStatusTag = document.getElementById('test-status-tag');

  if (runCodeBtn) {
    runCodeBtn.addEventListener('click', () => {
      playSound('click');
      if (testStatusTag) testStatusTag.textContent = 'Compiling Java 21...';
      if (terminalBody) {
        terminalBody.innerHTML = '<span style="color:#06b6d4;">> Compiling ZohoPatternSolver.java against 4 test suites...</span>';
      }

      setTimeout(() => {
        playSound('success');
        triggerMiniSparkles();
        if (testStatusTag) {
          testStatusTag.textContent = 'ALL 4/4 TESTS PASSED ✓';
          testStatusTag.style.background = 'rgba(16, 185, 129, 0.2)';
          testStatusTag.style.color = '#10B981';
        }

        if (terminalBody) {
          terminalBody.innerHTML = `
<span style="color:#10B981;">✓ Test Case 1 (Odd Length String "PROGRAM"): PASSED (0.012s)</span>
<span style="color:#10B981;">✓ Test Case 2 (Odd Length String "ZOHOCORP1"): PASSED (0.014s)</span>
<span style="color:#10B981;">✓ Test Case 3 (Zero Library Constraint Check): 100% COMPLIANT</span>
<span style="color:#10B981;">✓ Test Case 4 (Space O(1) Memory Bound): 0.2 MB USED</span>
<br>
<span style="color:#06b6d4;">⭐ Kodexa AI Code Score: 99/100 (Technical Interviewer Grade: S+ Tier)</span>
          `;
        }
      }, 700);
    });
  }

  // =========================================================================
  // 11. INTERACTIVE AI CHAT MENTOR ENGINE
  // =========================================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatMessages = document.getElementById('chat-messages-container');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  const botResponses = {
    round2: "For Zoho Round 2, they test pure algorithmic logic without built-in libraries like `.split()`, `HashMap`, or `regex`. Master 2D matrix traversal, string pointers, and pattern printing in pure C or Java!",
    project: "If you're in 3rd year with zero projects, build 2 production-grade projects: 1) A distributed URL Shortener with Redis cache & rate limiter, and 2) A Railway Reservation CLI system in Java. We provide full interactive blueprints on Kodex AI!",
    dp: "The top 5 Dynamic Programming patterns Google tests: 1) 0/1 Knapsack & Unbounded variations, 2) Longest Common Subsequence (LCS), 3) Longest Increasing Subsequence (LIS), 4) Interval DP (Matrix Chain), and 5) DP on Trees!",
    mechanical: "Yes! 42% of students placed at Zoho Tenkasi & Chennai via Kodex AI came from Mechanical, Civil & ECE branches. Zoho looks for raw problem-solving capability, clean logic, and dedication rather than your degree title.",
    default: "Great question! Kodex AI analyzes over 14,000 real campus placement rounds to give you company-specific roadmaps. Select your target company above or launch a Voice AI mock interview to pinpoint your strengths!"
  };

  function appendChatMessage(text, isUser = false) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i data-lucide="${isUser ? 'user' : 'bot'}"></i></div>
      <div class="msg-bubble">${text}</div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    lucide.createIcons();
  }

  function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const query = chatInput ? chatInput.value.trim() : '';
    if (!query) return;

    appendChatMessage(query, true);
    if (chatInput) chatInput.value = '';
    playSound('click');

    setTimeout(() => {
      playSound('pop');
      const qLower = query.toLowerCase();
      let response = botResponses.default;

      if (qLower.includes('round 2') || qLower.includes('zoho')) {
        response = botResponses.round2;
      } else if (qLower.includes('project') || qLower.includes('3rd year') || qLower.includes('zero')) {
        response = botResponses.project;
      } else if (qLower.includes('dp') || qLower.includes('google') || qLower.includes('pattern')) {
        response = botResponses.dp;
      } else if (qLower.includes('mechanical') || qLower.includes('non-cs') || qLower.includes('branch')) {
        response = botResponses.mechanical;
      }

      appendChatMessage(response, false);
    }, 600);
  }

  if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);

  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (chatInput) chatInput.value = btn.getAttribute('data-prompt');
      handleChatSubmit();
    });
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (chatMessages) {
        chatMessages.innerHTML = `
          <div class="chat-msg bot-msg">
            <div class="msg-avatar"><i data-lucide="bot"></i></div>
            <div class="msg-bubble">
              Chat reset! 👋 Ask Dex anything about campus placements, Zoho coding patterns, or mock interviews.
            </div>
          </div>
        `;
        lucide.createIcons();
        playSound('pop');
      }
    });
  }

  // =========================================================================
  // 12. LIVE HACKATHON COUNTDOWN TIMER
  // =========================================================================
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');
  let totalSecondsRemaining = 4 * 86400 + 16 * 3600 + 32 * 60 + 59;

  function updateTimer() {
    if (totalSecondsRemaining <= 0) return;
    totalSecondsRemaining--;
    const d = Math.floor(totalSecondsRemaining / 86400);
    const h = Math.floor((totalSecondsRemaining % 86400) / 3600);
    const m = Math.floor((totalSecondsRemaining % 3600) / 60);
    const s = Math.floor(totalSecondsRemaining % 60);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }
  setInterval(updateTimer, 1000);

  // =========================================================================
  // 13. CELEBRATION EFFECTS
  // =========================================================================
  function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981', '#38bdf8', '#f59e0b']
      });
    }
  }

  function triggerMiniSparkles() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.75 },
        ticks: 120,
        colors: ['#06b6d4', '#8b5cf6', '#10b981']
      });
    }
  }

  const regHackathonBtn = document.getElementById('register-hackathon-btn');
  if (regHackathonBtn) {
    regHackathonBtn.addEventListener('click', () => {
      playSound('success');
      triggerConfettiBurst();
      regHackathonBtn.innerHTML = '<i data-lucide="check-circle"></i> Registered for CodePulse 2026!';
      lucide.createIcons();
    });
  }

  const applyMouBtn = document.getElementById('apply-mou-btn');
  if (applyMouBtn) {
    applyMouBtn.addEventListener('click', () => {
      playSound('success');
      triggerConfettiBurst();
      alert('Thank you! Our Institutional Partnership Lead will contact your Placement Cell within 24 hours with the 2026 MOU Draft.');
    });
  }

  // Initial calculation run
  recalculateCTC();
  lucide.createIcons();
});
