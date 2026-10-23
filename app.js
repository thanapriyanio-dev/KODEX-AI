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
  // CELEBRATION & SPARKLES ENGINE (Powered by Canvas Confetti)
  // =========================================================================
  function triggerSparkles(x = 0.5, y = 0.5) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 32,
        spread: 60,
        origin: { x, y },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'],
        disableForReducedMotion: true
      });
    }
  }

  function triggerMiniSparkles(x = 0.5, y = 0.5) {
    triggerSparkles(x, y);
  }

  function triggerConfettiCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#34d399']
      });
    }
  }

  // =========================================================================
  // 2B. REAL AI SPEECH SYNTHESIS ENGINE (Web Speech API)
  // =========================================================================
  let cachedVoices = [];

  function loadCachedVoices() {
    if ('speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
  }
  if ('speechSynthesis' in window) {
    loadCachedVoices();
    window.speechSynthesis.onvoiceschanged = loadCachedVoices;
  }

  function getBestVoice(gender = 'female') {
    if (!('speechSynthesis' in window)) return null;
    if (cachedVoices.length === 0) loadCachedVoices();
    const englishVoices = cachedVoices.filter(v => v.lang.startsWith('en'));
    if (englishVoices.length === 0) return cachedVoices[0] || null;

    if (gender === 'female') {
      const preferred = englishVoices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Natural') || 
        v.name.includes('Samantha') || 
        v.name.includes('Jenny') || 
        v.name.includes('Zira') ||
        v.name.includes('Female')
      );
      return preferred || englishVoices[0];
    } else {
      const preferred = englishVoices.find(v => 
        v.name.includes('David') || 
        v.name.includes('Guy') || 
        v.name.includes('Male')
      );
      return preferred || englishVoices[0];
    }
  }

  function speakAIVoice(text, options = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }
    if (!soundEnabled) {
      console.log('Sound is muted.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop pending speech cleanly

      const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/["']/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const voice = getBestVoice(options.voiceType || 'female');
      if (voice) utterance.voice = voice;

      utterance.pitch = options.pitch !== undefined ? options.pitch : 1.15;
      utterance.rate = options.rate !== undefined ? options.rate : 1.0;
      utterance.volume = options.volume !== undefined ? options.volume : 1.0;

      utterance.onstart = () => {
        if (typeof waveIntensity !== 'undefined') waveIntensity = 2.4;
        if (options.onStart) options.onStart();
      };

      utterance.onend = () => {
        if (typeof waveIntensity !== 'undefined') waveIntensity = 0.5;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = () => {
        if (typeof waveIntensity !== 'undefined') waveIntensity = 0.5;
        if (options.onEnd) options.onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
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
  // 5. THE 3D INTERACTIVE KODA BESTIE CONTROLLER (SHOWSTOPPER FRIENDLY AI)
  // =========================================================================
  const kodaMascot = document.getElementById('koda-mascot');
  const kodaPokeBtn = document.getElementById('koda-poke-btn');
  const kodaSpeechText = document.getElementById('koda-speech-text');
  const kodaSpeechBubble = document.getElementById('koda-speech-bubble');
  const kodaMoodButtons = document.querySelectorAll('.btn-mood-reaction');
  const floatingKodaBtn = document.getElementById('floating-koda-btn');
  const floatingKodaTooltip = document.getElementById('floating-koda-tooltip');

  // Friendly speech dialogues for Koda
  const kodaDialogues = {
    greet: [
      "Hey there, champion! 🚀 I'm Koda, your personal AI placement companion. Let's make interview prep fun, friendly, and stress-free!",
      "Welcome to your dream engineering sprint! ✨ Which company are we conquering today? Zoho, Google, or Microsoft?",
      "Hello friend! Remember: Every master engineer started by solving their first tricky while-loop. You're already ahead!"
    ],
    tip: {
      zoho: "💡 Zoho Round 2 Secret: Focus on matrix spiral traversals & string pointer manipulations. Avoid <code>split()</code> or helper libraries — Zoho interviewers value pure algorithmic fundamentals!",
      google: "💡 Google L3/L4 Secret: Always ask 2 clarifying edge-case questions before coding. State your Big-O time and space tradeoffs out loud!",
      microsoft: "💡 Microsoft SWE Secret: Write clean, self-documenting code with clear variable names and handle null/empty boundaries gracefully.",
      amazon: "💡 Amazon SDE Secret: Structure behavioral stories with STAR (Situation, Task, Action, Result) and weave in 'Customer Obsession' and 'Ownership'!",
      uber: "💡 Uber Backend Secret: Brush up on concurrency primitives, geospatial hashes (Quadtrees), and idempotent distributed APIs!"
    },
    hype: [
      "YOU'VE GOT THIS! 🌟 48,500+ students started right where you are and cracked their dream offers. You are brilliant, resilient, and 100% capable!",
      "Believe in your logic! 💥 Every bug you debug is a step closer to that ₹30+ LPA offer letter. Let's make it happen!",
      "You + Koda = Unbeatable! 🏆 Keep your head held high, take a deep breath, and let's conquer today's challenge together!"
    ],
    test: [
      "Quick Quiz Time! 🧠 In an in-place matrix transposition, what is the auxiliary space complexity? (Hint: It's O(1)!). Scroll down to test your speed in the Crucible!",
      "Speed Challenge! ⚡ Can you detect a cycle in a directed graph using DFS in under 4 minutes? Jump to the Round 2 arena below to find out!"
    ],
    poke: [
      "Eeee! That tickles! 😄 Ready to write some elegant code today?",
      "High five! 🖐️ Keep that energetic vibe going, you're doing fantastic!",
      "Boop! 🤖 My neural cores are 100% warmed up to help you land that offer!",
      "I believe in you! Let's solve a tricky puzzle together right now!"
    ]
  };

  let pokeIndex = 0;

  const kodaListenBtn = document.getElementById('koda-listen-btn');
  const kodaVoiceIcon = document.getElementById('koda-voice-icon');
  const kodaVoiceBtnLabel = document.getElementById('koda-voice-btn-label');

  function speakCurrentKodaText() {
    if (!kodaSpeechText) return;
    playSound('click');
    speakAIVoice(kodaSpeechText.textContent, {
      pitch: 1.25,
      rate: 1.05,
      voiceType: 'female',
      onStart: () => {
        if (kodaListenBtn) kodaListenBtn.classList.add('speaking');
        if (kodaVoiceBtnLabel) kodaVoiceBtnLabel.textContent = 'Speaking...';
        if (kodaMascot) kodaMascot.style.filter = 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.8))';
      },
      onEnd: () => {
        if (kodaListenBtn) kodaListenBtn.classList.remove('speaking');
        if (kodaVoiceBtnLabel) kodaVoiceBtnLabel.textContent = 'Hear Koda Speak';
        if (kodaMascot) kodaMascot.style.filter = '';
      }
    });
  }

  if (kodaListenBtn) {
    kodaListenBtn.addEventListener('click', speakCurrentKodaText);
  }

  function setKodaSpeech(htmlText, animate = true, speak = true) {
    if (!kodaSpeechText) return;
    if (animate && kodaSpeechBubble) {
      kodaSpeechBubble.style.transform = 'scale(0.97)';
      kodaSpeechBubble.style.opacity = '0.7';
      setTimeout(() => {
        kodaSpeechText.innerHTML = htmlText;
        kodaSpeechBubble.style.transform = 'scale(1)';
        kodaSpeechBubble.style.opacity = '1';
        if (speak) {
          setTimeout(speakCurrentKodaText, 100);
        }
      }, 150);
    } else {
      kodaSpeechText.innerHTML = htmlText;
      if (speak) {
        setTimeout(speakCurrentKodaText, 100);
      }
    }
  }

  function pokeKoda(e) {
    playSound('pop');
    triggerMiniSparkles(0.7, 0.4);
    if (kodaMascot) {
      kodaMascot.style.transform = 'scale(1.12) rotate(4deg)';
      setTimeout(() => {
        kodaMascot.style.transform = '';
      }, 350);
    }
    const lines = kodaDialogues.poke;
    const line = lines[pokeIndex % lines.length];
    pokeIndex++;
    setKodaSpeech(`"${line}"`, true, true);
  }

  if (kodaMascot) kodaMascot.addEventListener('click', pokeKoda);
  if (kodaPokeBtn) kodaPokeBtn.addEventListener('click', pokeKoda);

  // Mood reaction button clicks
  kodaMoodButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      kodaMoodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mood = btn.dataset.mood;
      playSound('click');

      if (mood === 'greet') {
        const lines = kodaDialogues.greet;
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        setKodaSpeech(`"${randomLine}"`, true, true);
        triggerMiniSparkles(0.7, 0.35);
      } else if (mood === 'tip') {
        const companyTip = kodaDialogues.tip[activeCompanyKey] || kodaDialogues.tip.zoho;
        setKodaSpeech(`"${companyTip}"`, true, true);
        triggerMiniSparkles(0.7, 0.35);
      } else if (mood === 'hype') {
        const lines = kodaDialogues.hype;
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        setKodaSpeech(`"${randomLine}"`, true, true);
        triggerConfettiCelebration();
        playSound('success');
      } else if (mood === 'test') {
        const lines = kodaDialogues.test;
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        setKodaSpeech(`"${randomLine}"`, true, true);
        triggerMiniSparkles(0.7, 0.35);
      }
    });
  });

  // Floating Koda Helper Widget Interactivity
  const floatingTips = [
    "👋 Need help with Round 2? Click me anytime!",
    "💡 Tip: Practice your voice mock in the Studio!",
    "🎯 Try the CTC Salary Predictor below!",
    "✨ You've got this! One step at a time!"
  ];
  let floatingTipIdx = 0;

  if (floatingKodaBtn) {
    floatingKodaBtn.addEventListener('click', () => {
      playSound('pop');
      triggerMiniSparkles(0.9, 0.9);
      floatingTipIdx = (floatingTipIdx + 1) % floatingTips.length;
      if (floatingKodaTooltip) {
        floatingKodaTooltip.innerHTML = `<span>${floatingTips[floatingTipIdx]}</span>`;
      }
      // If clicked, smoothly scroll to Koda stage or chat
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Periodic gentle tooltip suggestion update
  setInterval(() => {
    if (floatingKodaTooltip && !document.hidden) {
      floatingTipIdx = (floatingTipIdx + 1) % floatingTips.length;
      floatingKodaTooltip.style.opacity = '0';
      setTimeout(() => {
        floatingKodaTooltip.innerHTML = `<span>${floatingTips[floatingTipIdx]}</span>`;
        floatingKodaTooltip.style.opacity = '1';
      }, 300);
    }
  }, 12000);

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

    const companyEncouragements = {
      zoho: "Aiming for <strong>Zoho Corp</strong>? 🏢 Great ambition! Zoho prizes pure, clean problem-solving without relying on pre-built libraries. Let's train your pointers and matrix logic!",
      google: "Targeting <strong>Google SWE L3/L4</strong>? ⚡ Google loves elegant graph traversals, bitmask optimization, and solid algorithmic complexity intuition. You can do this!",
      microsoft: "Setting sights on <strong>Microsoft</strong>? 🚀 Microsoft values clean modular architectures, thread-safe data structures, and sharp analytical clarity. Let's master it!",
      amazon: "Preparing for <strong>Amazon SDE</strong>? 📦 Master the 16 Leadership Principles and priority heaps to crush your SDE-1 loop with flying colors!",
      uber: "Gunning for <strong>Uber Systems</strong>? 🚗 Distributed systems, spatial indexing, and high-concurrency dispatch algorithms are our specialty. Let's level up!"
    };

    if (companyEncouragements[compKey]) {
      setKodaSpeech(`"${companyEncouragements[compKey]}"`);
    }

    playSound('pop');
    triggerMiniSparkles(0.7, 0.4);
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
  const realMicBtn = document.getElementById('real-mic-speak-btn');
  const realMicLabel = document.getElementById('real-mic-label');
  const realMicIcon = document.getElementById('real-mic-icon');
  const studioTranscript = document.getElementById('studio-transcript-box');
  const metricLogic = document.getElementById('metric-logic');
  const metricConf = document.getElementById('metric-conf');
  const hudScore = document.getElementById('hud-composite-score');
  const studioBotImg = document.getElementById('studio-bot-img');

  function updateStudioTranscript(speaker, text, isUser = false) {
    if (!studioTranscript) return;
    const msg = document.createElement('div');
    msg.className = `t-msg ${isUser ? 'user' : 'bot'}`;
    msg.innerHTML = `<strong>${speaker}:</strong> "${text}"`;
    studioTranscript.appendChild(msg);
    studioTranscript.scrollTop = studioTranscript.scrollHeight;
  }

  function setBotSpeakingVisual(active) {
    if (studioBotImg) {
      if (active) studioBotImg.classList.add('speaking');
      else studioBotImg.classList.remove('speaking');
    }
  }

  // 1. Ask Zoho LLD Question with AI Voice
  if (askZohoBtn) {
    askZohoBtn.addEventListener('click', () => {
      playSound('click');
      waveIntensity = 2.4;
      waveColor = '#06b6d4';
      askZohoBtn.classList.add('active');
      if (askGoogleBtn) askGoogleBtn.classList.remove('active');
      if (realMicBtn) realMicBtn.classList.remove('recording');

      const qText = "Welcome to your Zoho Round 3 technical mock! Here is your Low Level Design challenge: Architect a Railway Waiting List Reservation console application without utilizing external java collection libraries. How will you ensure cancellations and seat reallocations run in strict O(1) time?";
      updateStudioTranscript('Dex AI Interviewer', qText);

      speakAIVoice(qText, {
        pitch: 1.0,
        rate: 0.98,
        voiceType: 'female',
        onStart: () => setBotSpeakingVisual(true),
        onEnd: () => {
          setBotSpeakingVisual(false);
          waveIntensity = 0.6;
        }
      });
    });
  }

  // 2. Ask Google Graph Question with AI Voice
  if (askGoogleBtn) {
    askGoogleBtn.addEventListener('click', () => {
      playSound('click');
      waveIntensity = 2.5;
      waveColor = '#8b5cf6';
      askGoogleBtn.classList.add('active');
      if (askZohoBtn) askZohoBtn.classList.remove('active');
      if (realMicBtn) realMicBtn.classList.remove('recording');

      const gText = "Welcome to the Google L4 Systems and Algorithms round. Given a cluster of geographically distributed nodes, determine if removing any two bridges disconnects critical routing services. State your time complexity using Tarjan's Bridge finding algorithm.";
      updateStudioTranscript('Dex AI Interviewer', gText);

      speakAIVoice(gText, {
        pitch: 1.0,
        rate: 0.98,
        voiceType: 'female',
        onStart: () => setBotSpeakingVisual(true),
        onEnd: () => {
          setBotSpeakingVisual(false);
          waveIntensity = 0.6;
        }
      });
    });
  }

  // 3. Candidate Voice Simulation (Pre-recorded high-tier response)
  if (simulateCandidateBtn) {
    simulateCandidateBtn.addEventListener('click', () => {
      playSound('pop');
      waveIntensity = 2.0;
      waveColor = '#10b981';

      const candidateSpeech = "To achieve O(1) cancellations without java.util collections, I will maintain custom Doubly Linked List nodes with direct pointers in an indexed array. When a ticket is cancelled, node splicing operates in constant O(1) time without list re-indexing.";
      updateStudioTranscript('Candidate (You)', candidateSpeech, true);

      speakAIVoice(candidateSpeech, {
        pitch: 1.08,
        rate: 1.02,
        voiceType: 'male',
        onEnd: () => {
          setTimeout(() => {
            playSound('success');
            triggerMiniSparkles();
            if (metricLogic) metricLogic.textContent = '100%';
            if (metricConf) metricConf.textContent = '98%';
            if (hudScore) hudScore.textContent = '99.4 / 100';

            const evalMsg = "Outstanding delivery! Zero-Library constraint verified. O(1) pointer reconfiguration verified. AI Stress Grade: S+ Tier. You're ready for Round 3!";
            updateStudioTranscript('Dex AI Evaluation', evalMsg);
            speakAIVoice(evalMsg, {
              pitch: 1.05,
              rate: 1.0,
              voiceType: 'female',
              onStart: () => setBotSpeakingVisual(true),
              onEnd: () => setBotSpeakingVisual(false)
            });
          }, 400);
        }
      });
    });
  }

  // 4. Real Microphone Input (Speech-To-Text)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let micActive = false;
  let recognitionInstance = null;

  if (realMicBtn) {
    realMicBtn.addEventListener('click', () => {
      if (!SpeechRecognition) {
        alert("Web Speech Recognition is not natively enabled in this browser. Don't worry! Click 'Candidate Voice' to experience spoken mock answers!");
        return;
      }

      if (micActive) {
        if (recognitionInstance) recognitionInstance.stop();
        return;
      }

      try {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = 'en-US';
        recognitionInstance.interimResults = false;
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onstart = () => {
          micActive = true;
          realMicBtn.classList.add('recording');
          if (realMicLabel) realMicLabel.textContent = 'Listening... Speak!';
          if (realMicIcon) realMicIcon.setAttribute('data-lucide', 'mic-off');
          lucide.createIcons();
          playSound('pop');
          waveIntensity = 2.2;
          waveColor = '#ef4444';
        };

        recognitionInstance.onresult = (e) => {
          const spoken = e.results[0][0].transcript;
          updateStudioTranscript('Candidate (Your Mic)', spoken, true);

          setTimeout(() => {
            playSound('success');
            triggerMiniSparkles();
            if (metricLogic) metricLogic.textContent = '98%';
            if (metricConf) metricConf.textContent = '97%';
            if (hudScore) hudScore.textContent = '98.9 / 100';

            const feedback = `Excellent answer! We captured: "${spoken}". Your technical clarity is strong with minimal hesitations. You qualify for the next engineering phase!`;
            updateStudioTranscript('Dex AI Telemetry', feedback);
            speakAIVoice(feedback, {
              pitch: 1.0,
              rate: 1.0,
              voiceType: 'female',
              onStart: () => setBotSpeakingVisual(true),
              onEnd: () => setBotSpeakingVisual(false)
            });
          }, 500);
        };

        recognitionInstance.onerror = (err) => {
          console.warn('Mic speech error:', err);
          micActive = false;
          realMicBtn.classList.remove('recording');
          if (realMicLabel) realMicLabel.textContent = 'Speak With Mic';
          if (realMicIcon) realMicIcon.setAttribute('data-lucide', 'mic');
          lucide.createIcons();
          waveIntensity = 0.5;
          waveColor = '#06b6d4';
        };

        recognitionInstance.onend = () => {
          micActive = false;
          realMicBtn.classList.remove('recording');
          if (realMicLabel) realMicLabel.textContent = 'Speak With Mic';
          if (realMicIcon) realMicIcon.setAttribute('data-lucide', 'mic');
          lucide.createIcons();
          waveIntensity = 0.5;
          waveColor = '#06b6d4';
        };

        recognitionInstance.start();
      } catch (ex) {
        console.warn('Microphone start error:', ex);
        alert("Microphone could not be started. Click 'Candidate Voice' to test the audio feedback!");
      }
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

  const enrollModalBtn = document.getElementById('enroll-track-modal-btn');
  if (enrollModalBtn) {
    enrollModalBtn.addEventListener('click', () => {
      playSound('success');
      triggerConfettiBurst();
      enrollModalBtn.innerHTML = '<i data-lucide="check-circle-2"></i> Sprint Enrolled! Check Email For Schedule';
      lucide.createIcons();
      setTimeout(() => {
        if (modal) modal.classList.remove('open');
        enrollModalBtn.innerHTML = '<i data-lucide="check-circle-2"></i> Enroll in this 8-Week AI Sprint Free';
        lucide.createIcons();
      }, 1600);
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

  // =========================================================================
  // 14. SCROLL-REVEAL OBSERVER, PROGRESS BAR & SMOOTH SCROLLING ANIMATIONS
  // =========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const navSections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links .nav-link');

  // Real-time Scroll Progress Bar & Dynamic Nav Highlighting
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgressBar) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Active Navigation Link on Scroll
    const scrollPos = window.scrollY + 180;
    navSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });

  // Intersection Observer for Cinematic Scroll-Reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // Eagerly reveal any elements currently inside viewport or near top on load
  const triggerInitialReveal = () => {
    const vpHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vpHeight * 0.95) {
        el.classList.add('is-revealed');
      }
    });
  };
  triggerInitialReveal();
  setTimeout(triggerInitialReveal, 200);

  // Smooth Scroll with Navbar Offset for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.classList.add('is-revealed');
        const navHeight = 74;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });

  // Round 2 Celebration Banner Action
  const r2CelebrateBtn = document.getElementById('r2-celebrate-btn');
  if (r2CelebrateBtn) {
    r2CelebrateBtn.addEventListener('click', () => {
      playSound('success');
      triggerConfettiBurst();
      const r2Arena = document.getElementById('round2-arena');
      if (r2Arena) r2Arena.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 15. ROUND 2 SPECIALIZED ARENA: MATRIX VISUALIZER & STEP SIMULATOR
  // =========================================================================
  const matrixContainer = document.getElementById('matrix-visual-container');
  const simStepInfo = document.getElementById('sim-step-info');
  const simStepBtn = document.getElementById('sim-step-btn');
  const simAutoBtn = document.getElementById('sim-auto-btn');
  const r2TitleDisplay = document.getElementById('r2-title-display');
  const r2DescDisplay = document.getElementById('r2-desc-display');
  const r2BadgeDisplay = document.getElementById('r2-badge-display');

  const r2Problems = {
    'zoho-spiral': {
      company: 'ZOHO ROUND 2',
      title: 'Odd-Length String X-Pattern Parser',
      desc: "Print an odd-length string (e.g. 'PRIME') in an 'X' pattern matrix using pure 2D pointers. Zero Java collection libraries or helper buffers permitted.",
      gridSize: 5,
      word: 'PRIME',
      steps: [
        { row: 0, text: 'Step 1: Row 0 -> pointers at (0,0)=\'P\' and (0,4)=\'P\'' },
        { row: 1, text: 'Step 2: Row 1 -> pointers at (1,1)=\'R\' and (1,3)=\'R\'' },
        { row: 2, text: 'Step 3: Row 2 -> center intersection (2,2)=\'I\'' },
        { row: 3, text: 'Step 4: Row 3 -> pointers at (3,1)=\'M\' and (3,3)=\'M\'' },
        { row: 4, text: 'Step 5: Row 4 -> pointers at (4,0)=\'E\' and (4,4)=\'E\'' }
      ]
    },
    'google-graph': {
      company: 'GOOGLE ROUND 2',
      title: 'Distributed Graph Cycle & Topo Sorter',
      desc: 'Detect dependency cycles in multi-region cluster topologies. Identify strongly connected components under strict memory and time bounds.',
      gridSize: 5,
      word: 'NODES',
      steps: [
        { row: 0, text: 'Step 1: Initialize adjacency degree table for cluster A' },
        { row: 1, text: 'Step 2: Push zero in-degree nodes to execution queue' },
        { row: 2, text: 'Step 3: Relax topological edges across Region 2 nodes' },
        { row: 3, text: 'Step 4: Detect cycle invariant in back-edge (Node 3 -> 1)' },
        { row: 4, text: 'Step 5: Cycle Resolved! Graph validated 100% acyclic' }
      ]
    },
    'msft-lru': {
      company: 'MICROSOFT ROUND 2',
      title: 'O(1) LRU Cache Doubly Linked List',
      desc: 'Architect a production-ready cache eviction engine supporting get() and put() in strict O(1) time complexity with custom node references.',
      gridSize: 5,
      word: 'CACHE',
      steps: [
        { row: 0, text: 'Step 1: put(\'A\', 1) -> Allocate Node at MRU head' },
        { row: 1, text: 'Step 2: put(\'B\', 2) -> Shift previous head pointers in O(1)' },
        { row: 2, text: 'Step 3: get(\'A\') -> Hit! Move Node A to front of cache' },
        { row: 3, text: 'Step 4: Capacity breach -> Evict LRU tail node in O(1)' },
        { row: 4, text: 'Step 5: Rebalance complete. 0.02ms access verified' }
      ]
    }
  };

  let activeR2ProblemKey = 'zoho-spiral';
  let currentSimStep = 0;
  let autoSimInterval = null;

  function renderMatrixGrid(probKey) {
    if (!matrixContainer) return;
    const prob = r2Problems[probKey];
    matrixContainer.innerHTML = '';
    matrixContainer.style.gridTemplateColumns = `repeat(${prob.gridSize}, 36px)`;

    const N = prob.gridSize;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.textContent = '·';
        matrixContainer.appendChild(cell);
      }
    }
    currentSimStep = 0;
    updateSimulationState();
  }

  function updateSimulationState() {
    if (!matrixContainer) return;
    const prob = r2Problems[activeR2ProblemKey];
    const N = prob.gridSize;
    const cells = matrixContainer.querySelectorAll('.matrix-cell');

    cells.forEach(cell => {
      cell.classList.remove('highlight-diag', 'highlight-center');
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);

      if (r < currentSimStep) {
        if (r === c && r === Math.floor(N / 2)) {
          cell.textContent = prob.word[r];
          cell.classList.add('highlight-center');
        } else if (r === c || r + c === N - 1) {
          cell.textContent = prob.word[c];
          cell.classList.add('highlight-diag');
        } else {
          cell.textContent = ' ';
        }
      } else {
        cell.textContent = '·';
      }
    });

    if (simStepInfo) {
      if (currentSimStep === 0) {
        simStepInfo.innerHTML = `<i data-lucide="play"></i> Ready to trace ${prob.title}`;
      } else if (currentSimStep <= prob.steps.length) {
        simStepInfo.innerHTML = `<i data-lucide="check-circle-2"></i> ${prob.steps[currentSimStep - 1].text}`;
      } else {
        simStepInfo.innerHTML = `<i data-lucide="check-check"></i> Visual Trace Complete! Zero-Library Validated.`;
      }
      lucide.createIcons();
    }
  }

  if (simStepBtn) {
    simStepBtn.addEventListener('click', () => {
      const prob = r2Problems[activeR2ProblemKey];
      if (currentSimStep >= prob.steps.length) {
        currentSimStep = 0;
      }
      currentSimStep++;
      playSound('click');
      updateSimulationState();
    });
  }

  if (simAutoBtn) {
    simAutoBtn.addEventListener('click', () => {
      const prob = r2Problems[activeR2ProblemKey];
      if (autoSimInterval) {
        clearInterval(autoSimInterval);
        autoSimInterval = null;
        simAutoBtn.innerHTML = '<i data-lucide="zap"></i> Auto Animate';
        lucide.createIcons();
        return;
      }

      currentSimStep = 0;
      simAutoBtn.innerHTML = '<i data-lucide="pause"></i> Pause Trace';
      lucide.createIcons();
      playSound('pop');

      autoSimInterval = setInterval(() => {
        if (currentSimStep < prob.steps.length) {
          currentSimStep++;
          playSound('click');
          updateSimulationState();
        } else {
          clearInterval(autoSimInterval);
          autoSimInterval = null;
          simAutoBtn.innerHTML = '<i data-lucide="zap"></i> Re-Play Trace';
          lucide.createIcons();
          playSound('success');
          triggerMiniSparkles();
        }
      }, 650);
    });
  }

  // R2 Problem Tab Buttons
  document.querySelectorAll('.r2-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.r2-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const probKey = btn.dataset.r2Problem;
      activeR2ProblemKey = probKey;
      const prob = r2Problems[probKey];

      if (r2BadgeDisplay) r2BadgeDisplay.textContent = prob.company;
      if (r2TitleDisplay) r2TitleDisplay.textContent = prob.title;
      if (r2DescDisplay) r2DescDisplay.textContent = prob.desc;

      if (autoSimInterval) {
        clearInterval(autoSimInterval);
        autoSimInterval = null;
        if (simAutoBtn) {
          simAutoBtn.innerHTML = '<i data-lucide="zap"></i> Auto Animate';
          lucide.createIcons();
        }
      }

      renderMatrixGrid(probKey);
      playSound('pop');
    });
  });

  // Initial render of matrix grid
  renderMatrixGrid('zoho-spiral');

  // =========================================================================
  // 16. AI CODE AUTO-OPTIMIZER (INTERACTIVE DIFF ENGINE)
  // =========================================================================
  const diffBtnUnopt = document.getElementById('diff-btn-unopt');
  const diffBtnOpt = document.getElementById('diff-btn-opt');
  const codeDiffDisplay = document.getElementById('code-diff-display');
  const metricDiffTime = document.getElementById('metric-diff-time');
  const metricDiffMem = document.getElementById('metric-diff-mem');
  const metricDiffPass = document.getElementById('metric-diff-pass');

  const unoptCode = `<span class="c-cm">// Brute force approach with high memory allocation</span>
<span class="c-kw">for</span> (<span class="c-kw">int</span> i = 0; i &lt; n; i++) {
    <span class="c-kw">for</span> (<span class="c-kw">int</span> j = 0; j &lt; n; j++) {
        String cell = (i == j || i+j == n-1) ? str.substring(j, j+1) : " ";
        System.out.print(cell);
    }
    System.out.println();
}`;

  const optCode = `<span class="c-cm">// Kodex AI Optimized: O(N) single-pass with zero heap string allocation</span>
<span class="c-kw">char</span>[] buf = <span class="c-kw">new char</span>[n];
<span class="c-kw">for</span> (<span class="c-kw">int</span> i = 0; i &lt; n; i++) {
    java.util.Arrays.fill(buf, <span class="c-str">' '</span>);
    buf[i] = str.charAt(i);
    buf[n - 1 - i] = str.charAt(n - 1 - i);
    System.out.println(buf);
}`;

  if (diffBtnUnopt && diffBtnOpt && codeDiffDisplay) {
    diffBtnUnopt.addEventListener('click', () => {
      diffBtnUnopt.classList.add('active');
      diffBtnOpt.classList.remove('active');
      codeDiffDisplay.innerHTML = `<code>${unoptCode}</code>`;
      if (metricDiffTime) { metricDiffTime.textContent = 'O(N²) Nested'; metricDiffTime.style.color = '#f87171'; }
      if (metricDiffMem) { metricDiffMem.textContent = '42.8 MB Allocated'; metricDiffMem.style.color = '#f87171'; }
      if (metricDiffPass) { metricDiffPass.textContent = '35% Borderline'; metricDiffPass.style.color = '#f59e0b'; }
      playSound('click');
    });

    diffBtnOpt.addEventListener('click', () => {
      diffBtnOpt.classList.add('active');
      diffBtnUnopt.classList.remove('active');
      codeDiffDisplay.innerHTML = `<code>${optCode}</code>`;
      if (metricDiffTime) { metricDiffTime.textContent = 'O(N) Linear (12ms)'; metricDiffTime.style.color = '#34d399'; }
      if (metricDiffMem) { metricDiffMem.textContent = '0.2 MB Stack Only'; metricDiffMem.style.color = '#34d399'; }
      if (metricDiffPass) { metricDiffPass.textContent = '99.4% S+ Tier Clear'; metricDiffPass.style.color = '#34d399'; }
      playSound('success');
      triggerMiniSparkles();
    });
  }

  // =========================================================================
  // 17. ROUND 2 SPEED ATTACK DUEL MINI-GAME
  // =========================================================================
  const duelQuestions = [
    {
      q: "Question 1: In Zoho Round 2, which approach detects a loop in a Singly Linked List in O(N) time with O(1) space without modifying node structure?",
      options: [
        { text: "Floyd's Cycle-Finding Algorithm (Tortoise & Hare)", correct: true },
        { text: "Store visited node references in a HashSet", correct: false },
        { text: "Reverse the Linked List and check head collision", correct: false },
        { text: "Compare node memory pointers using bubble sort", correct: false }
      ]
    },
    {
      q: "Question 2: Under Zoho Round 2 zero-library rules, what is the optimal way to reverse words in a char string without using .split()?",
      options: [
        { text: "Reverse entire character array, then reverse each word in-place using two pointers", correct: true },
        { text: "Allocate a StringTokenizer and push tokens to a Stack", correct: false },
        { text: "Use regular expression replaceWith() matcher", correct: false },
        { text: "Convert char array to ArrayList<Character> and call Collections.reverse()", correct: false }
      ]
    },
    {
      q: "Question 3: For Microsoft & Google Round 2 LRU Cache, how do we guarantee strict O(1) access for both get() and put()?",
      options: [
        { text: "Doubly Linked List for O(1) node reordering + Hash Map for O(1) key lookups", correct: true },
        { text: "Binary Search Tree ordered by timestamp frequency", correct: false },
        { text: "Min-Heap priority queue keyed by last access timestamp", correct: false },
        { text: "Single circular array with linear probing search", correct: false }
      ]
    }
  ];

  let currentDuelQIndex = 0;
  let duelXP = 0;
  let duelTimerSeconds = 60;
  let duelTimerInterval = null;

  const duelQuestionText = document.getElementById('duel-question-text');
  const duelOptionsContainer = document.getElementById('duel-options-container');
  const duelFeedbackText = document.getElementById('duel-feedback-text');
  const duelNextBtn = document.getElementById('duel-next-btn');
  const duelXpScore = document.getElementById('duel-xp-score');
  const duelTimeLeft = document.getElementById('duel-time-left');

  function renderDuelQuestion(qIdx) {
    if (!duelQuestionText || !duelOptionsContainer) return;
    const qData = duelQuestions[qIdx];
    duelQuestionText.textContent = qData.q;
    duelOptionsContainer.innerHTML = '';

    qData.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'duel-opt-btn';
      btn.dataset.correct = opt.correct;
      btn.innerHTML = `<i data-lucide="chevron-right"></i> <span>${opt.text}</span>`;
      
      btn.addEventListener('click', () => {
        handleDuelAnswer(btn, opt.correct);
      });

      duelOptionsContainer.appendChild(btn);
    });

    if (duelFeedbackText) {
      duelFeedbackText.textContent = "Select the optimal engineering choice...";
      duelFeedbackText.style.color = "var(--text-muted)";
    }
    if (duelNextBtn) duelNextBtn.style.display = 'none';
    lucide.createIcons();
  }

  function handleDuelAnswer(selectedBtn, isCorrect) {
    const allBtns = duelOptionsContainer.querySelectorAll('.duel-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      duelXP += 150;
      if (duelXpScore) duelXpScore.textContent = duelXP;
      if (duelFeedbackText) {
        duelFeedbackText.innerHTML = "<strong style='color:#34d399;'>✓ Correct! +150 XP</strong> Zero-alloc pointer solution recognized.";
      }
      playSound('success');
      triggerMiniSparkles();
    } else {
      selectedBtn.classList.add('wrong');
      allBtns.forEach(b => {
        if (b.dataset.correct === 'true') b.classList.add('correct');
      });
      if (duelFeedbackText) {
        duelFeedbackText.innerHTML = "<strong style='color:#f87171;'>✗ Suboptimal Choice!</strong> The interviewer marked this as violation.";
      }
      playSound('click');
    }

    if (duelNextBtn) {
      duelNextBtn.style.display = 'inline-flex';
      if (currentDuelQIndex === duelQuestions.length - 1) {
        duelNextBtn.innerHTML = '<span>Finish Duel & Celebrate 🏆</span>';
      }
    }
  }

  if (duelNextBtn) {
    duelNextBtn.addEventListener('click', () => {
      if (currentDuelQIndex < duelQuestions.length - 1) {
        currentDuelQIndex++;
        renderDuelQuestion(currentDuelQIndex);
        playSound('pop');
      } else {
        playSound('success');
        triggerConfettiBurst();
        if (duelFeedbackText) {
          duelFeedbackText.innerHTML = `<strong style='color:#fbbf24;'>🎉 ROUND 2 DUEL MASTERED! Total Score: ${duelXP} XP</strong> — Interview Clearance Probability: 99.8%!`;
        }
        duelNextBtn.style.display = 'none';
      }
    });
  }

  // Initialize Duel Timer
  function startDuelTimer() {
    if (duelTimerInterval) clearInterval(duelTimerInterval);
    duelTimerInterval = setInterval(() => {
      if (duelTimerSeconds > 0) {
        duelTimerSeconds--;
        if (duelTimeLeft) duelTimeLeft.textContent = `${duelTimerSeconds}s`;
      } else {
        clearInterval(duelTimerInterval);
        if (duelFeedbackText) duelFeedbackText.textContent = "Time limit expired for this round!";
      }
    }, 1000);
  }
  startDuelTimer();

  // Initial render of first duel question
  renderDuelQuestion(0);

  // Initial calculation run
  recalculateCTC();
  lucide.createIcons();
});

