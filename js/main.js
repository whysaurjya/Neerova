/**
 * NEEROVA PLUMBING - JAVASCRIPT MASTER
 * Handles GSAP Animations for Hero Texts, Floating Tabs, Section Headings, Numerical Counters, & Buttons
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins if available
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0. Modern GSAP Preloader Animation (Cinematic Hydraulic Network Calibration)
  const preloader = document.getElementById('neerovaPreloader');
  const barFill = document.getElementById('preloaderBarFill');
  const counter = document.getElementById('preloaderCounter');
  const statusMsg = document.getElementById('preloaderStatusMsg');

  if (preloader) {
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      const tl = gsap.timeline();

      // Step 1: Initial element entrance animation
      tl.set(['.preloader-curtain-top', '.preloader-curtain-bottom'], { yPercent: 0 })
        .fromTo('.preloader-water-icon', 
          { scale: 0.4, opacity: 0, rotation: -12 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.8)' }
        )
        .fromTo('.brand-letter',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.preloader-sub-tag',
          { opacity: 0, letterSpacing: '0.05em' },
          { opacity: 1, letterSpacing: '0.18em', duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo('.preloader-bar-wrap, .preloader-meta-row',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );

      // Step 2: Realistic Calibration Progress Simulation with GSAP
      const progressObj = { value: 0 };
      const statusUpdates = [
        { at: 0, text: 'Scanning Bengaluru Pipeline Dynamics...' },
        { at: 35, text: 'Calibrating 24/7 Mobile Dispatch Fleet...' },
        { at: 68, text: 'Priming Diagnostic Acoustic Sensors...' },
        { at: 92, text: 'Hydraulic Network Primed · Neerova Ready' }
      ];

      let lastMsgIndex = 0;

      tl.to(progressObj, {
        value: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.round(progressObj.value);
          if (barFill) barFill.style.width = `${currentVal}%`;
          if (counter) counter.textContent = `${currentVal}%`;

          // Dynamic status message cross-fade
          for (let i = statusUpdates.length - 1; i >= 0; i--) {
            if (currentVal >= statusUpdates[i].at && lastMsgIndex !== i) {
              lastMsgIndex = i;
              if (statusMsg) {
                gsap.to(statusMsg, {
                  opacity: 0,
                  y: -5,
                  duration: 0.15,
                  onComplete: () => {
                    statusMsg.textContent = statusUpdates[i].text;
                    gsap.to(statusMsg, { opacity: 1, y: 0, duration: 0.2 });
                  }
                });
              }
              break;
            }
          }
        }
      });

      // Step 3: Cinematic Completion Pulse & Dual Curtain Split Reveal
      tl.to('.preloader-water-icon', {
        scale: 1.08,
        duration: 0.35,
        ease: 'power2.out'
      })
      .to('.preloader-core', {
        scale: 1.04,
        opacity: 0,
        y: -25,
        duration: 0.55,
        ease: 'power3.in'
      }, '+=0.1')
      .to('.preloader-curtain-top', {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut'
      }, '-=0.25')
      .to('.preloader-curtain-bottom', {
        yPercent: 100,
        duration: 0.85,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.classList.remove('preloader-active');
          preloader.style.display = 'none';

          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }

          // Trigger Hero sequence and targeted text/button animations
          playHeroEntrance();
          initFocusedAnimations();
        }
      }, '<');
    } else {
      // Fallback for offline / non-GSAP environments
      let progress = 0;
      const updatePreloader = () => {
        progress += 5;
        if (progress > 100) progress = 100;
        if (barFill) barFill.style.width = `${progress}%`;
        if (counter) counter.textContent = `${progress}%`;
        if (progress < 100) {
          setTimeout(updatePreloader, 35);
        } else {
          setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.remove('preloader-active');
            setTimeout(() => { 
              preloader.style.display = 'none'; 
              initFocusedAnimations();
            }, 750);
          }, 300);
        }
      };
      updatePreloader();
    }
  } else {
    initFocusedAnimations();
  }

  // ==========================================================================
  // 1. HERO ENTRANCE: TEXTS & FLOATING TABS / BADGES
  // ==========================================================================
  function playHeroEntrance() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;

    const heroTl = gsap.timeline();

    // Floating navbar drop
    heroTl.fromTo('.navbar-pill', 
      { y: -40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    )
    // Value Proposition Pills
    .fromTo('.hero-badge-row .hero-pill-badge', 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, 
      '-=0.45'
    )
    // Hero Main Title ("Transforming Bengaluru with Reliable Plumbing")
    .fromTo('.hero-main-title', 
      { y: 40, opacity: 0, scale: 0.97 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 
      '-=0.55'
    )
    // Hero Description Paragraph ("Bengaluru’s highest-rated plumbing experts...")
    .fromTo('.hero-desc-para', 
      { y: 28, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, 
      '-=0.65'
    )
    // Verified Trust Card (Avatars & 4.9 Star Rating)
    .fromTo('.hero-verified-trust-card', 
      { y: 25, opacity: 0, scale: 0.96 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'back.out(1.5)' }, 
      '-=0.55'
    )
    // Master Plumber Visual
    .fromTo('.hero-dominant-plumber', 
      { y: 45, scale: 0.95, opacity: 0 }, 
      { y: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'power3.out' }, 
      '-=0.7'
    )
    // Floating Tabs & Badges pop entrance
    .fromTo('.hero-floating-badge', 
      { scale: 0.6, opacity: 0, y: 15 }, 
      { scale: 1, opacity: 1, y: 0, stagger: 0.16, duration: 0.75, ease: 'back.out(1.8)' }, 
      '-=0.65'
    )
    // Lead Quote Dock Card
    .fromTo('.hero-quote-dock', 
      { y: 35, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.55'
    );
  }

  // ==========================================================================
  // 2. FOCUSED ANIMATIONS: TEXTS, FLOATING TABS, NUMERICAL STATS, & BUTTONS
  // ==========================================================================
  function initFocusedAnimations() {
    if (typeof gsap === 'undefined') return;

    // A. Continuous Floating Physics for Hero Floating Tabs & Badges
    if (!prefersReducedMotion) {
      gsap.to('.hero-floating-badge.badge-top-left', {
        y: '-=10',
        rotation: 1.2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.hero-floating-badge.badge-bottom-right', {
        y: '+=10',
        rotation: -1.2,
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3
      });

      gsap.to('.about-floating-spec-card', {
        y: '-=8',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // B. Hero Interactive Cursor Parallax on Floating Tabs (Desktop)
    const heroSection = document.getElementById('hero');
    const badge1 = document.querySelector('.hero-floating-badge.badge-top-left');
    const badge2 = document.querySelector('.hero-floating-badge.badge-bottom-right');

    if (heroSection && window.innerWidth > 992 && !prefersReducedMotion) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        if (badge1) {
          gsap.to(badge1, {
            x: -xPos * 16,
            y: -yPos * 12,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (badge2) {
          gsap.to(badge2, {
            x: xPos * 18,
            y: yPos * 14,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      heroSection.addEventListener('mouseleave', () => {
        if (badge1) gsap.to(badge1, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
        if (badge2) gsap.to(badge2, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
      });
    }

    if (typeof ScrollTrigger === 'undefined') return;

    // C. Section Text Areas Animations (Kickers, Lines, Titles, Subtitles)
    const sectionIds = ['#portfolio', '#about', '#testimonials', '#faqs', '#service-areas', '.footer-section'];
    sectionIds.forEach(secSelector => {
      const sec = document.querySelector(secSelector);
      if (!sec) return;

      const kickerLine = sec.querySelector('.kicker-line');
      const kickerText = sec.querySelector('.kicker-text');
      const title = sec.querySelector('.section-title');
      const subtitle = sec.querySelector('.section-subtitle');

      // Animate kicker line expanding
      if (kickerLine) {
        gsap.fromTo(kickerLine,
          { width: 0, opacity: 0 },
          {
            width: 24,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Animate Section Text Headings
      const textHeadings = [kickerText, title, subtitle].filter(Boolean);
      if (textHeadings.length > 0) {
        gsap.fromTo(textHeadings,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // D. About Section Texts & Live Stats Number Counters
    const aboutLead = document.querySelector('.about-lead-text');
    const aboutSub = document.querySelector('.about-sub-text');
    if (aboutLead && aboutSub) {
      gsap.fromTo([aboutLead, aboutSub],
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-left',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Numerical Stats Counter Interpolation (15K+, 90-Day, 100%)
    const statsStrip = document.querySelector('.about-stats-strip');
    const statNums = document.querySelectorAll('.about-stats-strip .stat-num');
    if (statsStrip && statNums.length >= 3) {
      let countersAnimated = false;
      ScrollTrigger.create({
        trigger: statsStrip,
        start: 'top 88%',
        onEnter: () => {
          if (countersAnimated) return;
          countersAnimated = true;

          // Stat 1: 15K+
          const s1 = { val: 0 };
          gsap.to(s1, {
            val: 15,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              statNums[0].textContent = `${Math.round(s1.val)}K+`;
            }
          });

          // Stat 2: 90-Day
          const s2 = { val: 0 };
          gsap.to(s2, {
            val: 90,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: () => {
              statNums[1].textContent = `${Math.round(s2.val)}-Day`;
            }
          });

          // Stat 3: 100%
          const s3 = { val: 0 };
          gsap.to(s3, {
            val: 100,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              statNums[2].textContent = `${Math.round(s3.val)}%`;
            }
          });
        }
      });
    }

    // E. Buttons & Interactive Areas Animations
    const interactiveButtons = document.querySelectorAll(
      '.btn-pill-primary, .btn-form-submit, .btn-contact-card, .footer-newsletter-btn, #backToTopBtn, .phone-pill, .btn-modal-close'
    );
    interactiveButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.04, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
      });
      btn.addEventListener('mousedown', () => {
        gsap.to(btn, { scale: 0.96, duration: 0.1, ease: 'power2.inOut', overwrite: 'auto' });
      });
      btn.addEventListener('mouseup', () => {
        gsap.to(btn, { scale: 1.04, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
      });
    });

    // Locality area chips entrance & button interactions
    const areaChips = document.querySelectorAll('.area-chip');
    if (areaChips.length > 0) {
      gsap.fromTo(areaChips,
        { scale: 0.8, opacity: 0, y: 12 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: '.areas-chips-container',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // 1. Sticky Navigation, Scroll Spy & Fluid Active Navbar Pill
  const headerWrapper = document.getElementById('headerWrapper');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navActivePill = document.getElementById('navActivePill');
  const navLinksContainer = document.querySelector('.nav-links');

  const updateNavPillPosition = () => {
    const activeLink = document.querySelector('.nav-links .nav-item.active');
    if (activeLink && navActivePill && navLinksContainer) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = navLinksContainer.getBoundingClientRect();
      const leftOffset = linkRect.left - containerRect.left;
      const topOffset = linkRect.top - containerRect.top;

      navActivePill.style.width = `${linkRect.width}px`;
      navActivePill.style.height = `${linkRect.height}px`;
      navActivePill.style.transform = `translate3d(${leftOffset}px, ${topOffset}px, 0)`;
      navActivePill.style.opacity = '1';
    }
  };

  // Initial layout calculation
  setTimeout(updateNavPillPosition, 60);
  window.addEventListener('resize', updateNavPillPosition);

  let isNavClicking = false;
  let navClickTimer = null;

  // Click on nav links provides instant fluid sliding response with zero delay
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          isNavClicking = true;
          clearTimeout(navClickTimer);

          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          updateNavPillPosition();

          const targetOffset = targetElement.offsetTop - 75;
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });

          navClickTimer = setTimeout(() => {
            isNavClicking = false;
          }, 850);
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header blur / elevation
    if (scrollY > 50) {
      headerWrapper.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      headerWrapper.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }

    // When clicking a nav item, ignore intermediate scroll spy updates
    if (isNavClicking) return;

    // Scroll spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (!currentSectionId) return;

    let stateChanged = false;
    navLinks.forEach(link => {
      const isCurrent = link.getAttribute('href') === `#${currentSectionId}`;
      if (isCurrent && !link.classList.contains('active')) {
        link.classList.add('active');
        stateChanged = true;
      } else if (!isCurrent && link.classList.contains('active')) {
        link.classList.remove('active');
        stateChanged = true;
      }
    });

    if (stateChanged) {
      updateNavPillPosition();
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNavOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) closeMobileMenu();
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // 3. Two-Row Customer Reviews Infinite Opposing Sliders
  const initInfiniteReviewsRow = (wrapperId, trackId, direction = -1, speed = 0.70, initialOffset = 0) => {
    const wrapper = document.getElementById(wrapperId);
    const track = document.getElementById(trackId);
    if (!wrapper || !track) return;

    let currentPos = initialOffset;
    let baseSpeed = speed; // e.g. 0.70 for Row 1, 0.52 for Row 2
    let isDragging = false;
    let lastDragX = 0;
    let dragVelocity = 0;
    let isHovered = false;

    const getHalfTrackWidth = () => track.scrollWidth / 2;

    const animateLoop = () => {
      const halfWidth = getHalfTrackWidth();

      if (!isDragging) {
        // When hovered, smoothly decelerate to 25% speed for effortless readability
        const activeSpeed = isHovered ? (baseSpeed * 0.25) : baseSpeed;
        
        // direction: -1 (Right to Left), +1 (Left to Right)
        currentPos += (direction * activeSpeed) + dragVelocity;
        dragVelocity *= 0.94; // natural momentum damping
      }

      // Infinite seamless boundary wrapping in both directions
      if (halfWidth > 0) {
        if (currentPos <= -halfWidth) {
          currentPos += halfWidth;
        } else if (currentPos >= 0) {
          currentPos -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${currentPos}px, 0, 0)`;
      requestAnimationFrame(animateLoop);
    };

    // Start 60fps loop
    requestAnimationFrame(animateLoop);

    // Hover slowdown
    wrapper.addEventListener('mouseenter', () => { isHovered = true; });
    wrapper.addEventListener('mouseleave', () => { isHovered = false; });

    // Pointer Drag Handling (Mouse & Touch gestures)
    const onStartDrag = (clientX) => {
      isDragging = true;
      lastDragX = clientX;
      dragVelocity = 0;
      wrapper.classList.add('is-dragging');
    };

    const onMoveDrag = (clientX) => {
      if (!isDragging) return;
      const delta = clientX - lastDragX;
      currentPos += delta;
      dragVelocity = delta * 0.4;
      lastDragX = clientX;
    };

    const onEndDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.classList.remove('is-dragging');
    };

    wrapper.addEventListener('pointerdown', (e) => {
      onStartDrag(e.clientX);
      try { wrapper.setPointerCapture(e.pointerId); } catch (err) {}
    });

    wrapper.addEventListener('pointermove', (e) => {
      onMoveDrag(e.clientX);
    });

    wrapper.addEventListener('pointerup', (e) => {
      onEndDrag();
      try { wrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    wrapper.addEventListener('pointercancel', (e) => {
      onEndDrag();
      try { wrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    });
  };

  // Row 1: Right to Left (direction: -1, speed: 0.70, initialOffset: -20px)
  initInfiniteReviewsRow('reviewsRowWrapper1', 'reviewsRowTrack1', -1, 0.70, -20);

  // Row 2: Left to Right (direction: +1, speed: 0.52, initialOffset: -240px for staggered composition)
  initInfiniteReviewsRow('reviewsRowWrapper2', 'reviewsRowTrack2', 1, 0.52, -240);

  // 4. FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.accordion-icon i');
        if (icon && typeof gsap !== 'undefined') {
          gsap.to(icon, { rotation: 0, duration: 0.3 });
        }
      });

      // Toggle current
      if (!isActive) {
        currentItem.classList.add('active');
        const icon = currentItem.querySelector('.accordion-icon i');
        if (icon && typeof gsap !== 'undefined') {
          gsap.to(icon, { rotation: 180, duration: 0.35, ease: 'back.out(2)' });
        }
      }
    });
  });

  // 4b. Infinite Horizontal Project Showcase (Draggable + Continuous Auto-Scroll)
  const showcaseWrapper = document.querySelector('.gallery-showcase-wrapper');
  const showcaseTrack = document.querySelector('.gallery-showcase-track');

  if (showcaseWrapper && showcaseTrack) {
    let currentX = 0;
    const autoScrollSpeed = 0.85; // Continuous smooth scrolling velocity
    let isDragging = false;
    let prevX = 0;
    let dragVelocity = 0;

    const getHalfWidth = () => showcaseTrack.scrollWidth / 2;

    const tick = () => {
      const halfWidth = getHalfWidth();

      if (!isDragging) {
        // Continuous auto-scroll with momentum inertia
        currentX -= (autoScrollSpeed + dragVelocity);
        dragVelocity *= 0.95;
      }

      // Infinite seamless boundary wrapping in both directions
      if (halfWidth > 0) {
        if (currentX <= -halfWidth) {
          currentX += halfWidth;
        } else if (currentX > 0) {
          currentX -= halfWidth;
        }
      }

      showcaseTrack.style.transform = `translate3d(${currentX}px, 0, 0)`;
      requestAnimationFrame(tick);
    };

    // Start 60fps animation loop
    requestAnimationFrame(tick);

    // Pointer Drag Handling (Mouse & Touch gestures)
    const onDragStart = (clientX) => {
      isDragging = true;
      prevX = clientX;
      dragVelocity = 0;
      showcaseWrapper.classList.add('is-dragging');
    };

    const onDragMove = (clientX) => {
      if (!isDragging) return;
      const delta = clientX - prevX;
      currentX += delta;
      dragVelocity = delta * 0.4;
      prevX = clientX;
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      showcaseWrapper.classList.remove('is-dragging');
    };

    showcaseWrapper.addEventListener('pointerdown', (e) => {
      onDragStart(e.clientX);
      showcaseWrapper.setPointerCapture(e.pointerId);
    });

    showcaseWrapper.addEventListener('pointermove', (e) => {
      onDragMove(e.clientX);
    });

    showcaseWrapper.addEventListener('pointerup', (e) => {
      onEndDrag();
      try { showcaseWrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    showcaseWrapper.addEventListener('pointercancel', (e) => {
      onEndDrag();
      try { showcaseWrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    });
  }

  // 5. Service Areas & Live Dispatch Information
  const areaChipButtons = document.querySelectorAll('.area-chip');
  const dispatchEtaText = document.getElementById('dispatchEtaText');

  const areaDetails = {
    'Indiranagar': { eta: '25 - 35 mins', units: '2 Mobile units' },
    'BTM Layout': { eta: '20 - 30 mins', units: '3 Mobile units' },
    'Malleshwaram': { eta: '30 - 40 mins', units: '2 Mobile units' },
    'Koramangala': { eta: '25 - 35 mins', units: '3 Mobile units' },
    'IT Park': { eta: '30 - 40 mins', units: '2 Mobile units' },
    'Shivajinagar': { eta: '25 - 35 mins', units: '2 Mobile units' },
    'Bellandur': { eta: '25 - 35 mins', units: '3 Mobile units' },
    'Mahadevapura': { eta: '30 - 40 mins', units: '2 Mobile units' },
    'Whitefield': { eta: '35 - 45 mins', units: '2 Mobile units' },
    'HSR Layout': { eta: '25 - 35 mins', units: '3 Mobile units' },
    'Vijayanagar': { eta: '30 - 45 mins', units: '2 Mobile units' },
    'Peenya': { eta: '35 - 50 mins', units: '1 Mobile unit' },
    'Hebbal': { eta: '35 - 45 mins', units: '2 Mobile units' },
    'Rajajinagar': { eta: '25 - 35 mins', units: '2 Mobile units' },
    'Banashankari': { eta: '30 - 40 mins', units: '3 Mobile units' }
  };

  areaChipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      areaChipButtons.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(chip, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
      }

      const areaName = chip.getAttribute('data-area');
      const details = areaDetails[areaName];

      if (details && dispatchEtaText) {
        if (typeof gsap !== 'undefined') {
          gsap.to(dispatchEtaText, {
            opacity: 0,
            y: -4,
            duration: 0.15,
            onComplete: () => {
              dispatchEtaText.innerHTML = `<strong>${areaName}</strong>: ${details.units} available · Estimated arrival: <strong>${details.eta}</strong>`;
              gsap.to(dispatchEtaText, { opacity: 1, y: 0, duration: 0.25 });
            }
          });
        } else {
          dispatchEtaText.innerHTML = `<strong>${areaName}</strong>: ${details.units} available · Estimated arrival: <strong>${details.eta}</strong>`;
        }
      }
    });
  });

  // 6. Lead Quote Form Submission
  const quoteForm = document.getElementById('leadQuoteForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalClientName = document.getElementById('modalClientName');

  const openModalWithGSAP = (modalEl) => {
    if (!modalEl) return;
    modalEl.classList.add('active');
    const modalCard = modalEl.querySelector('.modal-card');
    if (modalCard && typeof gsap !== 'undefined') {
      gsap.fromTo(modalCard, 
        { scale: 0.85, opacity: 0, y: 25 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' }
      );
    }
  };

  const closeModalWithGSAP = (modalEl) => {
    if (!modalEl) return;
    const modalCard = modalEl.querySelector('.modal-card');
    if (modalCard && typeof gsap !== 'undefined') {
      gsap.to(modalCard, {
        scale: 0.9,
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          modalEl.classList.remove('active');
        }
      });
    } else {
      modalEl.classList.remove('active');
    }
  };

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('quoteName');
      const phoneInput = document.getElementById('quotePhone');
      const submitBtn = document.getElementById('quoteSubmitBtn');

      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert('Please fill in your name and phone number to request a quote.');
        return;
      }

      // Loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (modalClientName) {
          modalClientName.textContent = nameInput.value.trim();
        }

        openModalWithGSAP(successModal);
        quoteForm.reset();
      }, 900);
    });
  }

  const modalCloseX = document.getElementById('modalCloseX');

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => closeModalWithGSAP(successModal));
  }

  if (modalCloseX && successModal) {
    modalCloseX.addEventListener('click', () => closeModalWithGSAP(successModal));
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModalWithGSAP(successModal);
    });
  }

  // 7. Newsletter Subscription Form & Modal
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterModal = document.getElementById('newsletterModal');
  const newsletterCloseBtn = document.getElementById('newsletterCloseBtn');

  if (newsletterForm && newsletterModal) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (email && email.value) {
        openModalWithGSAP(newsletterModal);
        newsletterForm.reset();
      }
    });
  }

  if (newsletterCloseBtn && newsletterModal) {
    newsletterCloseBtn.addEventListener('click', () => closeModalWithGSAP(newsletterModal));
    newsletterModal.addEventListener('click', (e) => {
      if (e.target === newsletterModal) closeModalWithGSAP(newsletterModal);
    });
  }

  // 8. Request Master Technician Modal
  const btnOpenTechModal = document.getElementById('btnOpenTechModal');
  const techRequestModal = document.getElementById('techRequestModal');
  const techModalCloseX = document.getElementById('techModalCloseX');
  const techDispatchForm = document.getElementById('techDispatchForm');
  const techSuccessState = document.getElementById('techSuccessState');
  const techDoneBtn = document.getElementById('techDoneBtn');
  const techSubmitBtn = document.getElementById('techSubmitBtn');
  const techLocality = document.getElementById('techLocality');
  const techLocConfirmed = document.getElementById('techLocConfirmed');
  const techTicketId = document.getElementById('techTicketId');

  const closeTechModal = () => {
    if (techRequestModal) {
      closeModalWithGSAP(techRequestModal);
      setTimeout(() => {
        if (techDispatchForm) {
          techDispatchForm.style.display = 'flex';
          techDispatchForm.reset();
        }
        if (techSuccessState) {
          techSuccessState.style.display = 'none';
        }
      }, 300);
    }
  };

  if (btnOpenTechModal && techRequestModal) {
    btnOpenTechModal.addEventListener('click', () => {
      openModalWithGSAP(techRequestModal);
    });
  }

  if (techModalCloseX) techModalCloseX.addEventListener('click', closeTechModal);
  if (techDoneBtn) techDoneBtn.addEventListener('click', closeTechModal);

  if (techRequestModal) {
    techRequestModal.addEventListener('click', (e) => {
      if (e.target === techRequestModal) {
        closeTechModal();
      }
    });
  }

  if (techDispatchForm) {
    techDispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (techSubmitBtn) {
        const origText = techSubmitBtn.innerHTML;
        techSubmitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Deploying Units...';
        techSubmitBtn.disabled = true;

        setTimeout(() => {
          techSubmitBtn.innerHTML = origText;
          techSubmitBtn.disabled = false;

          const chosenLoc = techLocality ? techLocality.value : 'your locality';
          if (techLocConfirmed) techLocConfirmed.textContent = chosenLoc;
          if (techTicketId) techTicketId.textContent = `#NEER-BLR-${Math.floor(100 + Math.random() * 900)}`;

          techDispatchForm.style.display = 'none';
          if (techSuccessState) {
            techSuccessState.style.display = 'block';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(techSuccessState, 
                { opacity: 0, scale: 0.95 }, 
                { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
              );
            }
          }
        }, 900);
      }
    });
  }

  // 9. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power3.inOut' });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
});
