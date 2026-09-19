/* script.js - Interactive Engine for Dual-Theme Portfolio, Webhook & AI Chat Bubble */

document.addEventListener('DOMContentLoaded', () => {
  // Coarse-pointer / mobile devices skip all pointer-driven flourishes, tilt calculations,
  // particle loops and per-frame canvas renders to preserve 60-120fps scrolling.
  const coarse = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches ||
                 /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  initTheme();
  initPreloader();
  if (!coarse) {
    initCursorSpotlight();
    initMouseFollower();
    initCardSpotlight();
    initMagneticHover();
    initButtonRipples();
    initAuroraParallax();
    initFloatingParticles();
    initHeroOrbGyro();
    initCardBeams();
    initScrollBlurEngine();
    initInteractiveLinesBackground();
  }
  initScrollReveals(coarse);
  initProjectsFilter();
  initMobileMenu();
  initWebhookContact();
  initChatBubble();
  initPageTransitions();
  initProjectPreviews();
  initBeatwaveTicker();
  initScrollProgress(coarse);
  initStatCounters();
  initUpiCopy();
  initHudTelemetry();
});

/* Cursor Spotlight Glow */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;
  let queued = false;
  let px = 0, py = 0;

  window.addEventListener('mousemove', (e) => {
    px = e.clientX;
    py = e.clientY;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      spotlight.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      queued = false;
    });
  }, { passive: true });
}

/* ==========================================================================
   1. Theme Management (Light / Dark Switcher)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.add('theme-light');
    updateToggleIcons('light');
  } else {
    document.body.classList.remove('light-theme');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.remove('theme-light');
    updateToggleIcons('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');

      let theme = 'dark';
      if (document.body.classList.contains('light-theme')) {
        theme = 'light';
      }

      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('theme-light', theme === 'light');
      localStorage.setItem('theme', theme);
      updateToggleIcons(theme);
    });
  });

  function updateToggleIcons(theme) {
    const sunSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    const moonSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    themeToggleBtns.forEach(btn => {
      if (theme === 'light') {
        btn.innerHTML = moonSvg;
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        btn.innerHTML = sunSvg;
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
  }, 950);

  function fadeLoaderOut() {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        window.dispatchEvent(new Event('scroll'));
      }, 750);
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

      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
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
function initScrollReveals(coarse) {
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
    threshold: coarse ? 0.01 : 0.06,
    rootMargin: coarse ? '0px 0px 80px 0px' : '0px 0px -40px 0px'
  });

  reveals.forEach(elem => {
    observer.observe(elem);
  });

  // Check elements already visible on load (above the fold)
  function checkViewportVisibility() {
    reveals.forEach(elem => {
      const rect = elem.getBoundingClientRect();
      if (rect.top < window.innerHeight * (coarse ? 1.05 : 0.94)) {
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

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  cards.forEach(card => {
    const enableTilt = !isReducedMotion && !isMobile && (card.classList.contains('project-card') || card.classList.contains('agency-card'));
    let cardRect = null;

    card.addEventListener('pointerenter', () => {
      cardRect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      const rect = cardRect || (cardRect = card.getBoundingClientRect());
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const normX = (x - centerX) / centerX;
        const normY = (y - centerY) / centerY;
        const tiltX = -(normY * 3.5).toFixed(2);
        const tiltY = (normX * 3.5).toFixed(2);
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(1.01)`;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      cardRect = null;
      if (enableTilt) {
        card.style.transform = '';
      }
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
      if (tab.classList.contains('active')) return;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      cards.forEach((card, idx) => {
        const agency = card.getAttribute('data-agency');
        const matches = (filterVal === 'all' || agency === filterVal);

        if (matches) {
          card.classList.remove('filter-hidden');
          card.style.transitionDelay = `${idx * 40}ms`;
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.transitionDelay = '0ms';
          card.classList.add('filter-hidden');
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

  const hamburgerSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
  const closeSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  toggleBtn.innerHTML = hamburgerSvg;

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggleBtn.innerHTML = hamburgerSvg;
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  const items = navLinks.querySelectorAll('a');
  items.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== toggleBtn) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   6b. UPI Clipboard Copy Handler
   ========================================================================== */
function initUpiCopy() {
  const copyBtns = document.querySelectorAll('.copy-upi-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const upiId = btn.getAttribute('data-upi') || 'akshanshsinha67@axl';
      try {
        await navigator.clipboard.writeText(upiId);
        showToast(`UPI ID copied: ${upiId}`, 'copy');
        const statusSpan = btn.querySelector('.copy-status');
        const originalHtml = statusSpan ? statusSpan.innerHTML : '';
        if (statusSpan) {
          statusSpan.innerHTML = '<span style="color:var(--accent-2)">✓ Copied!</span>';
        }
        btn.style.color = 'var(--accent-2)';
        setTimeout(() => {
          if (statusSpan) statusSpan.innerHTML = originalHtml;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = upiId;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`UPI ID copied: ${upiId}`, 'copy');
      }
    });
  });
}

/* ==========================================================================
   6c. Floating Glass Toast System
   ========================================================================== */
let toastTimeout = null;
function showToast(message, icon = 'check') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  
  let iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
  if (icon === 'copy' || icon === '📋') {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  } else if (icon === 'error' || icon === '✕') {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  }
  
  toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span>${message}</span>`;
  toast.classList.add('active');
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
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
        showToast('Message delivered successfully to Discord!', '✓');
        form.reset();
      } else {
        throw new Error('Webhook POST failed');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      showToast('Could not deliver message. Direct email: akshanshsinha890@gmail.com', '⚠');
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
  const magnetics = document.querySelectorAll('.btn, .nav-brand, .theme-toggle-btn, .chat-bubble-trigger, .filter-tab');
  
  // Disable magnetic hover on mobile or reduced motion
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  magnetics.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - elemCenterX;
      const deltaY = e.clientY - elemCenterY;

      // Clamped smooth translation (max 10px) with spring tracking
      const clampedX = Math.max(-10, Math.min(10, deltaX * 0.22));
      const clampedY = Math.max(-10, Math.min(10, deltaY * 0.22));

      elem.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease';
      elem.style.transform = `translate(${clampedX}px, ${clampedY}px) scale(1.02)`;
      elem.style.boxShadow = '0 12px 28px rgba(0,0,0,0.18)';
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
      elem.style.transform = '';
      elem.style.boxShadow = '';
    });
  });
}

/* ==========================================================================
   11b. Tactile Button Click Ripple Effect
   ========================================================================== */
function initButtonRipples() {
  const rippleTargets = document.querySelectorAll('.btn, .filter-tab, .btn-download-action, .upi-support-btn');
  rippleTargets.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      btn.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });
}

// GitHub live-stat fetching removed in the Aurora Glass rebuild: stats are static copy now.

/* ==========================================================================
   11c. Aurora Blob Parallax on Mouse
   ========================================================================== */
function initAuroraParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const blobs = document.querySelectorAll('.aurora-blob');
  if (!blobs.length) return;

  // Wrap each blob in a shell that receives the parallax translate
  // The CSS drift animation stays on the inner blob, shell handles mouse offset
  const shells = [];
  blobs.forEach((blob) => {
    const shell = document.createElement('div');
    shell.style.cssText = 'position:absolute;inset:0;pointer-events:none;will-change:transform;';
    blob.parentNode.insertBefore(shell, blob);
    shell.appendChild(blob);
    shells.push(shell);
  });

  // Each shell gets a different parallax depth factor
  const depths = [0.012, 0.02, 0.008, 0.016, 0.024];

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    const dx = currentX - window.innerWidth / 2;
    const dy = currentY - window.innerHeight / 2;

    shells.forEach((shell, i) => {
      const depth = depths[i] || 0.01;
      const tx = dx * depth;
      const ty = dy * depth;
      shell.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    requestAnimationFrame(tick);
  }

  tick();
}


/* ==========================================================================
   11d. Ambient Floating Particles
   ========================================================================== */
function initFloatingParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const aurora = document.querySelector('.aurora');
  if (!aurora) return;

  const COUNT = 22;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1.5; // 1.5px to 4.5px
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 14; // 14s to 34s
    const delay = Math.random() * -30; // negative = already mid-animation
    const opacity = Math.random() * 0.22 + 0.06;
    const driftX = (Math.random() - 0.5) * 120;
    const driftY = -(Math.random() * 180 + 60); // always drift upward

    dot.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      left:${x}%;
      top:${y}%;
      background:oklch(90% 0.01 215);
      opacity:${opacity};
      pointer-events:none;
      will-change:transform,opacity;
      animation:fp-float-${i} ${duration}s ${delay}s linear infinite;
    `;

    // Inject a unique keyframe per particle
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes fp-float-${i} {
        0%   { transform: translate(0, 0) scale(1);   opacity: ${opacity}; }
        40%  { opacity: ${Math.min(opacity * 1.8, 0.5)}; }
        100% { transform: translate(${driftX}px, ${driftY}px) scale(0.3); opacity: 0; }
      }
    `;
    document.head.appendChild(styleTag);

    fragment.appendChild(dot);
  }

  aurora.appendChild(fragment);
}

/* ==========================================================================
   11e. 3D Hero Orb Gyroscope on Mouse
   ========================================================================== */
function initHeroOrbGyro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const hero = document.querySelector('.hero-layout');
  const orb = document.querySelector('.orb');
  if (!hero || !orb) return;

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isHovered = false;

  hero.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotX = -y * 22;
    targetRotY = x * 26;
  });

  hero.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
  });

  function gyroLoop() {
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    if (Math.abs(currentRotX) > 0.02 || Math.abs(currentRotY) > 0.02 || isHovered) {
      orb.style.transform = `perspective(800px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
    } else {
      orb.style.transform = '';
    }

    requestAnimationFrame(gyroLoop);
  }

  gyroLoop();
}

/* ==========================================================================
   11f. Electric Laser Border Beams and Scanlines for Cards
   ========================================================================== */
function initCardBeams() {
  const cards = document.querySelectorAll('.project-card, .agency-card');
  cards.forEach(card => {
    if (!card.querySelector('.card-beam')) {
      const beam = document.createElement('div');
      beam.className = 'card-beam';
      beam.setAttribute('aria-hidden', 'true');
      card.appendChild(beam);
    }
    if (!card.querySelector('.card-scanline')) {
      const scanline = document.createElement('div');
      scanline.className = 'card-scanline';
      scanline.setAttribute('aria-hidden', 'true');
      card.appendChild(scanline);
    }
  });
}

/* ==========================================================================
   11g. Scroll-Driven Progressive Blur: TEXT ONLY
   ========================================================================== */
function initScrollBlurEngine() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroTexts = document.querySelectorAll('.hero-title, .hero-desc');
  const sectionTexts = document.querySelectorAll('.section-title-lg, .section-label, .page-title, .page-desc');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;

        // 1. Hero Text Progressive Blur on Scroll (ONLY text elements)
        // Does NOT blur the orb, logo, buttons, cards, or badge
        if (heroTexts.length) {
          const heroH = 480;
          const heroRatio = Math.min(Math.max(scrollY / heroH, 0), 1);
          if (heroRatio > 0.02) {
            const blurVal = (heroRatio * 10).toFixed(1);
            const opacityVal = (1 - heroRatio * 0.7).toFixed(2);
            heroTexts.forEach(el => {
              el.style.filter = `blur(${blurVal}px)`;
              el.style.opacity = opacityVal;
            });
          } else {
            heroTexts.forEach(el => {
              el.style.filter = '';
              el.style.opacity = '';
            });
          }
        }

        // 2. In-Page Section Text Progressive Blur on scroll exit
        // Applies strictly to text headers and labels
        sectionTexts.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < 110 && rect.bottom > 0) {
            const exitRatio = Math.min(Math.max((110 - rect.top) / 110, 0), 1);
            const textBlur = (exitRatio * 8).toFixed(1);
            const textOpacity = (1 - exitRatio * 0.65).toFixed(2);
            el.style.filter = `blur(${textBlur}px)`;
            el.style.opacity = textOpacity;
          } else {
            el.style.filter = '';
            el.style.opacity = '';
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   11g-ii. HUD Telemetry Ping Randomizer (cheap: one text write every 3.2s)
   ========================================================================== */
function initHudTelemetry() {
  const latencyEl = document.getElementById('hud-latency');
  if (!latencyEl) return;

  setInterval(() => {
    const ms = Math.floor(Math.random() * 8) + 14;
    latencyEl.textContent = `LATENCY: ${ms}ms`;
  }, 3200);
}

/* ==========================================================================
   11h. Interactive Lines Background Engine
   One 2D canvas, flat maths, no per-frame object allocation. Only the
   line/field geometry and a handful of motes are drawn.
   ========================================================================== */
function initInteractiveLinesBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('interaction-lines-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Geometry is cached in locals; the canvas is composited in CSS pixels, so
  // there is no per-frame matrix or device-pixel scaling to pay for.
  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const dots = [];
  for (let i = 0; i < 26; i++) {
    dots.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      r: Math.random() * 1.5 + 0.9,
      a: Math.random() * 0.32 + 0.1
    });
  }

  let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  let curT = 0, lastT = performance.now();
  let lastActivity = Date.now();

  // The field follows the pointer when there is one. On touch devices the
  // canvas is not started at all (see the module gate in the bootstrap).
  window.addEventListener('mousemove', (e) => {
    lastActivity = Date.now();
    tmx = e.clientX / window.innerWidth;
    tmy = e.clientY / window.innerHeight;
  }, { passive: true });

  function frame(now) {
    const dt = Math.min((now - lastT) / 16.667, 4); // frames elapsed, capped
    lastT = now;
    curT += 0.0016 * dt;

    const isLight = document.body.classList.contains('light-theme') || document.documentElement.getAttribute('data-theme') === 'light';
    const dotColor = isLight ? '0, 0, 0' : '255, 255, 255';

    // Idle: the field drifts on its own so the hero never reads as frozen
    if ((Date.now() - lastActivity) / 1000 > 2) {
      tmx = 0.5 + Math.sin(curT * 0.8) * 0.32;
      tmy = 0.5 + Math.cos(curT * 0.5) * 0.32;
    }
    mx += (tmx - mx) * 0.06 * dt;
    my += (tmy - my) * 0.06 * dt;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${dotColor}, ${isLight ? 0.09 : 0.14})`;
    ctx.fillStyle = `rgba(${dotColor}, ${isLight ? 0.35 : 0.5})`;

    const minLines = 8, maxLines = 36, curveStrength = 1.15, segments = 30;
    const isSmall = width < 500;
    const u = isSmall ? 0.8 * height : 0;
    const dFactor = (isSmall ? 1.5 : 0.7) * curveStrength;

    const cX = width, cY = -(1.1 * height) + u;
    const fX = 0, fY = 2 * height;
    const gX = -width, gY = -height + u;

    const linesCount = Math.round(minLines + (my * (maxLines - minLines)));
    const bias = 0.6 + (mx * (0.4 - 0.6));

    for (let t = 0; t < linesCount; t++) {
      const norm = t / Math.max(1, linesCount - 1);
      const df = 1 - norm * norm;

      const eX = fX + (gX - fX) * df;
      const eY = fY + (gY - fY) * df;
      const lX = (cX + eX) * 0.5;
      const lY = (cY + eY) * 0.5;
      const tgX = (fX + lX) * 0.5;
      const tgY = (fY + lY) * 0.5;

      const midX = (cX + eX) * 0.5;
      const midY = (cY + eY) * 0.5;
      const diffX = tgX - midX;
      const diffY = tgY - midY;
      const kA = dFactor * (1 - bias) * 2;
      const kB = dFactor * bias * 2;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const segT = i / segments;
        const w = 2 * Math.pow(segT, kA) * Math.pow(1 - segT, kB);
        const px = cX + (eX - cX) * segT + diffX * w;
        const py = cY + (eY - cY) * segT + diffY * w;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Depth motes drifting over the lines
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx * dt * 16;
      d.y += d.vy * dt * 16;
      if (d.x < 0) d.x += 1; else if (d.x > 1) d.x -= 1;
      if (d.y < 0) d.y += 1; else if (d.y > 1) d.y -= 1;
      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc(d.x * width, d.y * height, d.r, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (running) animId = requestAnimationFrame(frame);
  }

  let animId = 0;
  let running = false;

  function start() {
    if (running) return;
    running = true;
    lastT = performance.now();
    animId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(animId);
  }

  // The canvas is fixed to the viewport, so the only time it can be off-screen
  // is when the tab itself is hidden: no frames are burned in the background.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  start();
}

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
      url: 'https://wavemirror.vercel.app',
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

  // Set static 4,000+ counter
  tickers.forEach(t => {
    t.textContent = '4,000+';
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
function initScrollProgress(coarse) {
  const progressBar = document.getElementById('scroll-progress-bar');
  const headerWrapper = document.querySelector('.header-wrapper');
  const bottomBlur = coarse ? null : document.querySelector('.progressive-blur-bottom');
  const root = document.documentElement;

  let ticking = false;
  let lastScrim = -1;

  function updateScroll() {
    ticking = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      // One custom property drives both the fill's scaleX and the tip dot's
      // position, so the whole bar costs a single style write per frame.
      progressBar.style.setProperty('--sp', Math.min(1, Math.max(0, progress / 100)).toFixed(4));
    }

    if (headerWrapper) {
      if (scrollY > 30) {
        headerWrapper.classList.add('scrolled');
      } else {
        headerWrapper.classList.remove('scrolled');
      }
    }

    // Drive the top scrim on desktop only: setting a custom property on :root
    // invalidates style for the whole tree, which causes frame drops on mobile.
    if (!coarse) {
      const scrim = (Math.min(Math.max(scrollY / 200, 0), 1) * 0.8).toFixed(2);
      if (scrim !== lastScrim) {
        root.style.setProperty('--top-scrim', scrim);
        lastScrim = scrim;
      }
    }

    // The bottom blur dissolves content into the footer on desktop.
    if (bottomBlur) {
      const nearEnd = docHeight > 0 && scrollY > docHeight - 120;
      bottomBlur.classList.toggle('is-on', scrollY > 40 && !nearEnd);
    }
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

