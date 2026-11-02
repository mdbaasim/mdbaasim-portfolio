/**
 * Main Portfolio Application Script
 * Mohammed baasim H - Cybersecurity & AI Builder
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    if (navOverlay) navOverlay.classList.toggle('active', isActive);
    mobileToggle.setAttribute('aria-expanded', isActive);
    mobileToggle.classList.toggle('open', isActive);
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close mobile nav when clicking any link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 2. Active Navigation on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 3. Navbar Scrolled Shadow/Glass Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Toast Notification Engine
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;
    
    const iconSvg = type === 'success' 
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-msg">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  window.showToast = showToast;

  // 5. Copy Email Action
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'mdbaasim06@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast('Direct contact: ' + email);
      });
    });
  });

  // 6. Interactive Formspree Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner"></span> Transmitting & Encrypting...
      `;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formspree.io/f/maeelyjd', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          showToast('Message transmitted successfully! Mohammed will respond shortly.', 'success');
        } else {
          const data = await response.json();
          if (data && data.errors && data.errors.length > 0) {
            showToast(data.errors.map(err => err.message).join(', '), 'info');
          } else {
            showToast('Submission error. Please email mdbaasim06@gmail.com directly.', 'info');
          }
        }
      } catch (err) {
        showToast('Network issue. Direct contact: mdbaasim06@gmail.com', 'info');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // 7. Project Detail Modal Data
  const projectDetails = {
    'hoptrace': {
      title: 'HopTrace Forensics',
      subtitle: 'AI-Powered Email Threat Detection & Digital Forensic Intelligence Platform',
      status: 'Implemented Platform',
      tech: ['Python', 'FastAPI', 'AI', 'Software Development', 'RFC 5322 Parsing', 'Threat Intelligence'],
      description: 'HopTrace Forensics is designed for digital forensic investigators and incident responders to dissect email headers, trace transport hop anomalies, detect forged senders (SPF/DKIM/DMARC alignment checks), and uncover indicators of compromise (IoCs) embedded in fraudulent correspondence.',
      highlights: [
        'Automated header hop analysis mapping mail transfer agent (MTA) traversal paths',
        'Heuristic and AI-driven phishing indicator classification',
        'Suspicious domain resolution and DNS reputation verification',
        'Structured forensic audit reporting exportable for SecOps incident handling'
      ],
      github: 'https://github.com/mdbaasim/HopTrace-Forensics',
      demo: '#'
    },
    'agent-security': {
      title: 'Agent Workflow Security',
      subtitle: 'Autonomous AI Agent Policy Guard & Evasion Detection Prototype',
      status: 'Implemented Prototype',
      tech: ['Python', 'AI Security', 'Policy Enforcement', 'GitHub', 'FastAPI', 'Execution Graphs'],
      description: 'A cybersecurity prototype built to counter sophisticated policy evasion in autonomous AI agents. When a sensitive action is denied under a specific objective, the guard permanently attaches a denial tombstone to prevent the agent from switching tools, using SQL aliases, or delegating child tasks to achieve unauthorized bypass.',
      highlights: [
        'Objective-level stateful enforcement tracking multi-step agent execution trees',
        'Correlation engine detecting tool-switching and delegated evasion vectors',
        'Guarded tool proxy that halts unauthorized tasks at the pre-execution boundary',
        'Interactive security sandbox and live SSE audit telemetry for incident investigation'
      ],
      github: 'https://github.com/mdbaasim/Agent-Workflow-Security',
      demo: '#'
    },
    'scamguard': {
      title: 'ScamGuard Pro',
      subtitle: 'Multi-Vector Anti-Scam & Threat Intelligence Platform',
      status: 'Implemented Security Tool',
      tech: ['Python', 'AI', 'Threat Intelligence', 'FastAPI', 'Web Security', 'Heuristic Scoring'],
      description: 'An AI-based platform engineered to empower users and enterprise helpdesks to detect multi-channel scams. Inspects suspicious URLs, fraudulent telephony numbers, and social engineering email artifacts using machine learning classification and threat intelligence feeds.',
      highlights: [
        'Multi-vector ingestion for URLs, telephony caller IDs, and communication text',
        'AI classification evaluating linguistic social engineering cues and urgency patterns',
        'Domain age and lexical spoofing detection (typosquatting & IDN homograph checks)',
        'Actionable risk scoring with immediate defensive remediation guidance'
      ],
      github: 'https://github.com/mdbaasim/ScamGuard-Pro',
      demo: '#'
    },
    'fraudflow': {
      title: 'FraudFlow Intelligence',
      subtitle: 'Graph-Based Financial Flow Anomaly Detection Concept',
      status: 'Architectural Concept & Engine',
      tech: ['AI / ML', 'Graph Analysis', 'Anomaly Detection', 'FinSec', 'Python', 'Pattern Recognition'],
      description: 'An AI-powered concept and algorithmic engine for identifying anomalous money-flow patterns, cyclic transactions, structuring behaviors, and syndicate financial fraud across interconnected account graphs.',
      highlights: [
        'Graph-theoretic traversal detecting circular routing and rapid velocity movements',
        'Machine learning anomaly baselining across atypical transaction volumes and frequencies',
        'Rule-based heuristics for regulatory compliance and suspicious activity detection',
        'Modular architecture designed for pluggable streaming event pipelines'
      ],
      github: 'https://github.com/mdbaasim/FraudFlow-Intelligence',
      demo: '#'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalContent = document.getElementById('project-modal-body');
  const closeProjectModalBtn = document.getElementById('close-project-modal-btn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal || !projectModalContent) return;

    projectModalContent.innerHTML = `
      <div class="modal-badge-row">
        <span class="cyber-badge-cyan">${data.status}</span>
      </div>
      <h3 class="modal-project-title">${data.title}</h3>
      <p class="modal-project-subtitle">${data.subtitle}</p>
      
      <div class="modal-section">
        <h4>Architecture & Purpose</h4>
        <p>${data.description}</p>
      </div>

      <div class="modal-section">
        <h4>Key Technical Features</h4>
        <ul class="modal-features-list">
          ${data.highlights.map(h => `<li><span class="list-bullet">›</span> ${h}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4>Technologies Used</h4>
        <div class="tech-tags">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          View Source Repository
        </a>
        <button class="btn btn-secondary" onclick="window.showToast('Live sandbox demo instance accessible via project repo.')">
          Demo Environment
        </button>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-project-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // 8. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 20);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // 9. Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openResumeBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  // 11. Continuous Reversible Scroll Reveal Animations (triggers every time you scroll)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Reset when scrolled out so it animates fresh every time you scroll
          entry.target.classList.remove('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
  }

  // 12. Interactive 3D Holographic Card Parallax Tilt
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }
});
