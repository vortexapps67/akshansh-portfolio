/* script.js - Interactive Engine for Dual-Theme Portfolio, Webhook & AI Chat Bubble */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPreloader();
  initCursorSpotlight();
  initMouseFollower();
  initScrollReveals();
  initCardSpotlight();
  initProjectsFilter();
  initMobileMenu();
  initWebhookContact();
  initChatBubble();
  initCanvasParticles();
  initPageTransitions();
  initMagneticHover();
  initProjectPreviews();
  initBeatwaveTicker();
  initScrollProgress();
  initStatCounters();
});

/* Cursor Spotlight Glow */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;
  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* ==========================================================================
   1. Theme Management (Light / Dark Switcher)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    updateToggleIcons('light');
  } else {
    document.body.classList.remove('light-theme');
    updateToggleIcons('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      let theme = 'dark';
      if (document.body.classList.contains('light-theme')) {
        theme = 'light';
      }
      
      localStorage.setItem('theme', theme);
      updateToggleIcons(theme);
    });
  });

  function updateToggleIcons(theme) {
    themeToggleBtns.forEach(btn => {
      if (theme === 'light') {
        btn.innerHTML = '&#9790;'; // Moon
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        btn.innerHTML = '&#9788;'; // Sun
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    });
  }
}

/* ==========================================================================
   2. Preloader Fade Transition
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    fadeLoaderOut();
  });

  setTimeout(() => {
    fadeLoaderOut();
  }, 1000);

  function fadeLoaderOut() {
    if (preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        window.dispatchEvent(new Event('scroll'));
      }, 600);
    }
  }
}

/* ==========================================================================
   3. Custom Soft Cursor Follower
   ========================================================================== */
function initMouseFollower() {
  const follower = document.getElementById('cursor-follower');
  if (!follower) return;

  let targetX = 0, targetY = 0;
  let followerX = 0, followerY = 0;
  let mouseActive = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    if (!mouseActive) {
      follower.style.opacity = '0.12';
      mouseActive = true;
    }
  });

  window.addEventListener('mouseleave', () => {
    follower.style.opacity = '0';
    mouseActive = false;
  });

  function smoothFollow() {
    if (mouseActive) {
      const dx = targetX - followerX;
      const dy = targetY - followerY;
      
      followerX += dx * 0.15;
      followerY += dy * 0.15;
      
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(smoothFollow);
  }
  smoothFollow();

  const updateHoverListeners = () => {
    const hoverables = document.querySelectorAll('a, button, .project-card, .agency-card, .filter-tab, .theme-toggle-btn, .chat-bubble-trigger, .chat-pill, .btn-download-action');
    hoverables.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        follower.classList.add('hovering');
      });
      elem.addEventListener('mouseleave', () => {
        follower.classList.remove('hovering');
      });
    });
  };
  updateHoverListeners();
  
  // Expose to other modules
  window.updateCursorHoverListeners = updateHoverListeners;
}

/* ==========================================================================
   4. Scroll Reveal Observer & Stagger Engine
   ========================================================================== */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-blur, .reveal-scale, .reveal-left, .stagger-group');
  if (reveals.length === 0) return;

  // Stagger children of grid containers automatically
  const gridContainers = document.querySelectorAll('.agencies-grid, .caps-grid, .stats-grid, .featured-grid, .projects-grid, .contact-details');
  gridContainers.forEach(grid => {
    grid.classList.add('stagger-group');
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(elem => {
    observer.observe(elem);
  });

  // Check elements already visible on load (above the fold)
  function checkViewportVisibility() {
    reveals.forEach(elem => {
      const rect = elem.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) {
        elem.classList.add('visible');
        observer.unobserve(elem);
      }
    });
  }

  checkViewportVisibility();
  window.addEventListener('load', checkViewportVisibility);
}

/* ==========================================================================
   Card Cursor Spotlight Physics
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.agency-card, .cap-card, .stat-card, .project-card, .contact-card-item');
  if (cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. Projects Grid Filter Logic (For projects.html)
   ========================================================================== */
function initProjectsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const agency = card.getAttribute('data-agency');

        if (filterVal === 'all' || agency === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Mobile Navigation Toggle Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggleBtn.innerHTML = navLinks.classList.contains('open') ? '&#10005;' : '&#9776;';
  });

  const items = navLinks.querySelectorAll('a');
  items.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '&#9776;';
    });
  });
}

/* ==========================================================================
   7. Discord Webhook Contact Form Poster
   ========================================================================== */
function initWebhookContact() {
  const form = document.getElementById('contact-me-form');
  const submitBtn = document.getElementById('btn-submit-form');
  if (!form) return;

  const webhookUrl = 'https://discord.com/api/webhooks/1521495307559375029/29jMtW_-QUWLEWQeUk46LsHM7aID3pY_g39863fjZJEiu8XIwDXaO08Ub2Z6wz-d6Ts-';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
    }

    const payload = {
      content: "<@1488900867305377935> New Handshake Inquiry Received!",
      embeds: [
        {
          title: "💼 New Work Inquiry - Portfolio",
          color: 3462041, // Decimal color for #34d399 (mint)
          fields: [
            {
              name: "👤 Client Name",
              value: name,
              inline: true
            },
            {
              name: "✉️ Email Address",
              value: email,
              inline: true
            },
            {
              name: "📞 Phone Number",
              value: phone,
              inline: true
            },
            {
              name: "📝 Message Details",
              value: message
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Akshansh Portfolio Handshake Portal"
          }
        }
      ]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Your message was successfully sent to Akshansh Sinha! Thank you.');
        form.reset();
      } else {
        throw new Error('Webhook POST failed');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      alert('There was a problem sending the webhook. Please try contacting directly at akshanshsinha890@gmail.com.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
}

/* ==========================================================================
   8. Floating "Ask Me Anything" AI Chat Bubble with 1000+ Scrollable Logs
   ========================================================================== */
function initChatBubble() {
  const triggerBtn = document.getElementById('chat-bubble-trigger');
  const chatContainer = document.getElementById('chat-box-container');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const typingIndicator = document.getElementById('chat-msg-typing');

  if (!triggerBtn || !chatContainer || !chatBody) return;

  let historyGenerated = false;

  // Toggle chat window open/close
  triggerBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('active');
    
    if (!historyGenerated) {
      generateChatHistory();
      historyGenerated = true;
    }
    
    scrollChatToBottom();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatContainer.classList.remove('active');
    });
  }

  // Handle option pill selection (delegated)
  chatBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-pill')) {
      const query = e.target.getAttribute('data-query');
      if (query) {
        appendMessage(query, 'user');
        simulateAssistantResponse(query);
      }
    }
  });

  // Handle free text inputs
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      handleUserTextSubmit();
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserTextSubmit();
      }
    });
  }

  function handleUserTextSubmit() {
    const text = chatInput.value.trim();
    if (text === '') return;

    appendMessage(text, 'user');
    chatInput.value = '';

    simulateAssistantResponse(text);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    
    // Insert before typing indicator
    chatBody.insertBefore(msgDiv, typingIndicator);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
  }

  function simulateAssistantResponse(query) {
    typingIndicator.style.display = 'block';
    scrollChatToBottom();

    const normalized = query.toLowerCase();
    let replyText = '';

    if (normalized.includes('stack') || normalized.includes('tech') || normalized.includes('skills')) {
      replyText = "Akshansh builds software using Kotlin, React, Compose UI, HTML5, and Custom CSS. He also integrates Google Gemini & Anthropic Claude APIs.";
    } else if (normalized.includes('project') || normalized.includes('work') || normalized.includes('apps') || normalized.includes('deliver')) {
      replyText = "He has shipped products under Zephyr Devs (banquet reservations, leasing portals, menus) and Vortex Apps (high-fidelity music web clients, WebSocket chat engines). Check the Projects page to view them.";
    } else if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('phone') || normalized.includes('number') || normalized.includes('call')) {
      replyText = "You can contact Akshansh via email at akshanshsinha890@gmail.com or call him directly at +91 7909007948.";
    } else if (normalized.includes('who') || normalized.includes('akshansh') || normalized.includes('founder')) {
      replyText = "Akshansh Sinha is the founder and principal full-stack architect behind Zephyr Devs and BeatLabs. He focuses on clean layouts, performance, and custom AI tooling.";
    } else {
      replyText = "I'm a quick assistant here to answer questions about Akshansh. You can reach out directly via email at akshanshsinha890@gmail.com or call +91 7909007948.";
    }

    const typingTime = Math.random() * 600 + 400;
    setTimeout(() => {
      typingIndicator.style.display = 'none';
      appendMessage(replyText, 'assistant');
      
      // Log the conversation message to the logging Webhook
      logChatMessageToDiscord(query, replyText);
    }, typingTime);
  }

  async function logChatMessageToDiscord(question, answer) {
    const loggingWebhookUrl = 'https://discord.com/api/webhooks/1521504762380554302/ev5LNEtE-bc-gtG47sLbPCJcpc83AnLr39ssoWebVr12oSrIzCHe8x1f0whp_SAyjG7N';
    
    const logPayload = {
      embeds: [
        {
          title: "🤖 AI Chatbot Interaction Log",
          color: 8421504, // Grey decimal
          fields: [
            {
              name: "❓ User Query",
              value: question
            },
            {
              name: "💬 AI Response",
              value: answer
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Akshansh Portfolio AI Assistant"
          }
        }
      ]
    };

    try {
      await fetch(loggingWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logPayload)
      });
    } catch (e) {
      console.warn('Logging webhook error:', e);
    }
  }

  function generateChatHistory() {
    const fragment = document.createDocumentFragment();
    
    const greetDiv = document.createElement('div');
    greetDiv.className = 'chat-msg assistant';
    greetDiv.textContent = "Hi! Ask me anything about Akshansh's projects, tech stack, or coordinates.";
    fragment.appendChild(greetDiv);

    const pillsDiv = document.createElement('div');
    pillsDiv.className = 'chat-pills-container';
    pillsDiv.innerHTML = `
      <button class="chat-pill" data-query="What is Akshansh's tech stack?">Tech Stack</button>
      <button class="chat-pill" data-query="Tell me about his projects.">Projects</button>
      <button class="chat-pill" data-query="How can I contact him?">Contact Info</button>
    `;
    fragment.appendChild(pillsDiv);

    chatBody.insertBefore(fragment, typingIndicator);
  }
}

/* ==========================================================================
   9. Live Interactive Canvas Background (Particle Network)
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  let particleColor = 'rgba(52, 211, 153, 0.3)';
  let lineR = 52, lineG = 211, lineB = 153;

  function updateColors() {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      particleColor = 'rgba(13, 148, 136, 0.25)';
      lineR = 13; lineG = 148; lineB = 136;
    } else {
      particleColor = 'rgba(52, 211, 153, 0.3)';
      lineR = 52; lineG = 211; lineB = 153;
    }
  }
  updateColors();

  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateColors, 50);
    });
  });

  window.addEventListener('resize', resizeCanvas);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1.2;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          let rx = dx / dist;
          let ry = dy / dist;

          this.x -= rx * force * 1.5;
          this.y -= ry * force * 1.5;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const area = (canvas.width * canvas.height) / 13000;
    const count = Math.min(Math.max(area, 40), 120);

    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
  }

  function connectParticles() {
    const maxDist = 110;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          let alpha = (1 - dist / maxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  resizeCanvas();
  animate();
}

/* ==========================================================================
   10. Page-Fade Transitions
   ========================================================================== */
function initPageTransitions() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Fade-in effect on load
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 100);

  // Intercept navigation links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Filter out absolute URLs, hashes, targets, or downloads
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('#') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          link.getAttribute('target') === '_blank' ||
          link.classList.contains('btn-download-action') ||
          link.classList.contains('project-btn-link')) {
        return;
      }

      e.preventDefault();
      overlay.classList.add('active');
      overlay.style.opacity = '1';

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
}

/* ==========================================================================
   11. Magnetic Hover Physics on Interactive Elements
   ========================================================================== */
function initMagneticHover() {
  const magnetics = document.querySelectorAll('.btn, .nav-brand, .theme-toggle-btn, .chat-bubble-trigger, .agency-card, .filter-tab');
  
  // Disable magnetic hover on mobile
  if (window.innerWidth < 768) return;

  magnetics.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2;
      
      // Distance from mouse to element center
      const deltaX = e.clientX - elemCenterX;
      const deltaY = e.clientY - elemCenterY;

      // Translate element by fractional offset (max 15px)
      elem.style.transform = `translate(${deltaX * 0.28}px, ${deltaY * 0.28}px) scale(1.02)`;
      elem.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transform = '';
      elem.style.boxShadow = '';
    });
  });
}

// GitHub live-stat fetching removed in the Aurora Glass rebuild — stats are static copy now.

/* ==========================================================================
   13. Project Spec Mockup Modals
   ========================================================================== */
function initProjectPreviews() {
  // Dynamically inject modal wrapper structure to prevent HTML bloat
  const modal = document.createElement('div');
  modal.className = 'preview-modal';
  modal.id = 'project-preview-modal';
  modal.innerHTML = `
    <div class="preview-modal-content">
      <div class="preview-modal-header">
        <h3 id="modal-project-title">Project Name</h3>
        <button class="preview-modal-close" id="modal-close-btn" aria-label="Close preview">&times;</button>
      </div>
      <div class="preview-modal-body">

        <!-- Project hero row -->
        <div class="preview-modal-hero">
          <div class="preview-modal-hero-logo" id="modal-hero-logo">&#127925;</div>
          <div>
            <div class="preview-modal-hero-title" id="modal-hero-title">BeatWave</div>
            <p class="preview-modal-desc" id="modal-browser-desc">
              High-fidelity music streaming client loaded with responsive controls.
            </p>
            <div class="preview-modal-url" id="modal-browser-url">https://beatwave.oneapp.dev</div>
          </div>
        </div>

        <!-- Specifications Columns -->
        <div class="preview-modal-specs">
          <div class="preview-modal-spec-item">
            <div class="preview-modal-spec-lbl">Engine Runtime</div>
            <div class="preview-modal-spec-val" id="modal-spec-runtime">React Single Page App</div>
          </div>
          <div class="preview-modal-spec-item">
            <div class="preview-modal-spec-lbl">Avg Response Speed</div>
            <div class="preview-modal-spec-val" id="modal-spec-speed">&lt; 0.4 seconds</div>
          </div>
          <div class="preview-modal-spec-item">
            <div class="preview-modal-spec-lbl">Database Integration</div>
            <div class="preview-modal-spec-val" id="modal-spec-db">IndexedDB Cache</div>
          </div>
        </div>

      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('#modal-close-btn');
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    unlockScroll();
  });

  // Listen to clicks inside modal overlay to close it
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      unlockScroll();
    }
  });

  // Lock page scroll while the modal is open (Escape also closes)
  function lockScroll() { document.body.style.overflow = 'hidden'; }
  function unlockScroll() { document.body.style.overflow = ''; }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      unlockScroll();
    }
  });

  // Project specs datasets
  const projectMetadata = {
    'beatwave': {
      title: 'BeatWave Music',
      logo: '<img src="assets/beatwavepng.png" alt="BeatWave">',
      url: 'https://beatwave.oneapp.dev',
      desc: 'An open-source high-fidelity audio streaming client designed for seamless background media runtimes with zero telemetry tracking.',
      runtime: 'React SPAs Client',
      speed: '< 0.45s Speed',
      db: 'IndexedDB Store'
    },
    'wavemirror': {
      title: 'WaveMirror Movies',
      logo: '<img src="assets/wavemirror.png" alt="WaveMirror">',
      url: 'https://wavemirrors.netlify.app',
      desc: 'Lightweight media portal querying open APIs with fast search results filters and responsive cards layouts.',
      runtime: 'HTML5 / CSS / Vanilla JS',
      speed: '< 0.5s Loading',
      db: 'Local Storage Cache'
    },
    'onyx': {
      title: 'Onyx Secure Chat',
      logo: '<img src="assets/onyx logo.png" alt="Onyx Chat">',
      url: 'https://onyxchat.netlify.app',
      desc: 'Low-latency messaging module connecting clients over WebSockets and securing packets exchange routing.',
      runtime: 'NodeJS Socket Server',
      speed: '12ms Ping Delay',
      db: 'MongoDB Clusters'
    },
    'rajdarbar': {
      title: 'Rajdarbar Banquet',
      logo: '🏰',
      url: 'https://rajdarbars.vercel.app',
      desc: 'Premium wedding reservation schedule and booking inquiry pipeline built for high-conversion sales routing.',
      runtime: 'SEO Semantics HTML5',
      speed: '< 0.6s Paint Time',
      db: 'Inquiries Firestore'
    },
    'haveli': {
      title: 'Haveli Restaurant',
      logo: '🍛',
      url: 'https://havelirestaurants.netlify.app',
      desc: 'Digital menus catalog and reservations sync portal tailored for responsive layouts on touch interfaces.',
      runtime: 'CSS Flexbox / Vanilla JS',
      speed: '< 0.4s Paint Speed',
      db: 'Local JSON Synced'
    },
    'rkm': {
      title: 'RKM Square Portal',
      logo: '🏢',
      url: 'https://rkmsquare.vercel.app',
      desc: 'Commercial leasing workspace showcasing matrices of empty shops and routing applications to agents.',
      runtime: 'React / Firebase Host',
      speed: '< 0.5s First Load',
      db: 'Firebase Auth & Store'
    },
    'panna': {
      title: 'Panna Event Decors',
      logo: '🎈',
      url: 'https://pannaevents.vercel.app',
      desc: 'Local design and decoration catalog optimized for keyword index ranks and local search clicks.',
      runtime: 'Static Semantic SEO',
      speed: '< 0.6s Load Speed',
      db: 'Inquiries Email routing'
    }
  };

  // Bind click listener on project card titles
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const cardId = card.id;
    // Map full names or sub strings (e.g. "proj-beatwave" -> "beatwave", "feat-beatwave" -> "beatwave")
    const cleanId = cardId.replace('proj-', '').replace('feat-', '');

    const titleLink = card.querySelector('.project-title');
    if (titleLink && projectMetadata[cleanId]) {
      // Style the cursor and interaction properties
      titleLink.style.cursor = 'pointer';
      titleLink.title = 'Click to open browser mockup specs';
      
      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        const data = projectMetadata[cleanId];

        // Populate modal parameters
        modal.querySelector('#modal-project-title').textContent = data.title;
        modal.querySelector('#modal-browser-url').textContent = data.url;
        modal.querySelector('#modal-hero-logo').innerHTML = data.logo;
        modal.querySelector('#modal-hero-title').textContent = data.title;
        modal.querySelector('#modal-browser-desc').textContent = data.desc;
        modal.querySelector('#modal-spec-runtime').textContent = data.runtime;
        modal.querySelector('#modal-spec-speed').textContent = data.speed;
        modal.querySelector('#modal-spec-db').textContent = data.db;

        // Open modal and lock page scroll beneath it
        modal.classList.add('active');
        lockScroll();
      });
    }
  });
}

/* ==========================================================================
   14. BeatWave Live Download Counter Ticker
   ========================================================================== */
function initBeatwaveTicker() {
  const tickers = document.querySelectorAll('.live-download-val');
  if (tickers.length === 0) return;

  // Set static 2,600+ counter
  tickers.forEach(t => {
    t.textContent = '2,600+';
  });

  // Listen to clicks on download buttons to send a log event to Discord Webhook
  const downloadBtns = document.querySelectorAll('.btn-download-action');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      logDownloadEventToDiscord(btn.getAttribute('href'));
    });
  });

  async function logDownloadEventToDiscord(fileUrl) {
    const loggingWebhookUrl = 'https://discord.com/api/webhooks/1521504762380554302/ev5LNEtE-bc-gtG47sLbPCJcpc83AnLr39ssoWebVr12oSrIzCHe8x1f0whp_SAyjG7N';
    
    const logPayload = {
      embeds: [
        {
          title: "📥 APK Download Clicked",
          color: 3066993, // Green decimal
          fields: [
            {
              name: "🔗 Target File",
              value: fileUrl
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Akshansh Portfolio System Audits"
          }
        }
      ]
    };

    try {
      await fetch(loggingWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logPayload)
      });
    } catch (e) {
      console.warn('Logging webhook error:', e);
    }
  }
}

/* ==========================================================================
   15. Scroll Progress Bar & Dynamic Header Elevation
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const headerWrapper = document.querySelector('.header-wrapper');

  let ticking = false;

  function updateScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (headerWrapper) {
      if (scrollY > 30) {
        headerWrapper.classList.add('scrolled');
      } else {
        headerWrapper.classList.remove('scrolled');
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  updateScroll();
}

/* ==========================================================================
   16. Animated Metric Numerical Counters
   ========================================================================== */
function initStatCounters() {
  const statElements = document.querySelectorAll('.stat-num, .hero-stat-num');
  if (statElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  statElements.forEach(el => {
    const raw = el.textContent.trim();
    el.setAttribute('data-target-text', raw);
    observer.observe(el);
  });

  function animateCounter(el) {
    const raw = el.getAttribute('data-target-text') || el.textContent.trim();
    
    // Parse prefix (e.g. "<"), numeric portion (e.g. "0.6", "30", "99.9", "150"), suffix (e.g. "%+", "%", "s", "+")
    const match = raw.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const targetVal = parseFloat(match[2]);
    const suffix = match[3] || '';
    const decimals = (match[2].split('.')[1] || '').length;

    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Exponential ease-out curve for high-end organic deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = targetVal * ease;

      el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = raw; // Final exact value guarantee
      }
    }

    requestAnimationFrame(step);
  }
}

