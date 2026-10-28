/* ==========================================================================
   Storey Architecture x Elite Home Creations DFW — Interactive Motion Engine
   100% Parity with Storey Architecture GSAP, ScrollTrigger & Lenis Bundles
   ========================================================================== */

(function () {
  "use strict";

  const D = window.ELITE_DATA;
  const T = window.ELITE_TEMPLATES;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let lenis = null;
  let routeCleanupFns = [];
  let isTransitioning = false;
  let currentRouteKey = null;

  // Global mouse coordinates for 3D spinner raycasting & cursor followers
  const pointer = { x: -9999, y: -9999 };
  window.addEventListener(
    "mousemove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    },
    { passive: true }
  );

  function addCleanup(fn) {
    if (typeof fn === "function") {
      routeCleanupFns.push(fn);
    }
  }

  function runCleanup() {
    while (routeCleanupFns.length) {
      const fn = routeCleanupFns.pop();
      try {
        fn();
      } catch (err) {
        // ignore cleanup errors on detached nodes
      }
    }
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    }
  }

  // =========================================================================
  // 1. LENIS SMOOTH SCROLL INITIALIZATION (Exact BJo4ozbC.js config)
  // =========================================================================
  function initLenis() {
    if (!window.Lenis) return;
    lenis = new window.Lenis({
      lerp: 0.05,
      duration: 0.6,
      smoothWheel: true
    });
    window.__lenis = lenis;

    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    if (gsap) {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  // =========================================================================
  // 2. BUTTON MAIN ANIMATED — 8-Spoke Starburst Geometry & Hover/Focus GSAP
  // =========================================================================
  function initAnimatedButtons(root = document) {
    const buttons = root.querySelectorAll("[data-btn-animated]");
    const resizeHandlers = [];

    buttons.forEach((btn) => {
      if (btn.dataset.btnInitialized === "true") return;
      btn.dataset.btnInitialized = "true";

      const size = btn.dataset.btnSize || "small";
      const isContainerHover = btn.dataset.containerHover === "true";
      const circle = btn.querySelector("[data-btn-circle]");
      const textEl = btn.querySelector("[data-btn-text]");
      const spokes = btn.querySelectorAll("[data-btn-spoke]");
      const bars = btn.querySelectorAll("[data-btn-spoke-bar]");

      const isMobile = () => window.innerWidth < 640;

      const getMetrics = () => {
        const mob = isMobile();
        const scale = size === "large" ? (mob ? 4.5 : 1.25) : mob ? 2.5 : 1;
        return {
          circleSize: 1.2 * scale + "vw",
          barHeight: 0.12 * scale + "vw",
          barHeightHover: 0.12 * scale * 1.15 + "vw",
          barWidth: 0.145 * scale + "vw",
          barWidthHover: 0.145 * scale * 1.15 + "vw",
          paddingBottom: 0.55 * scale + "vw",
          paddingBottomHover: 0.55 * scale * 1.15 + "vw"
        };
      };

      const applyBaseGeometry = () => {
        const m = getMetrics();
        if (circle) {
          circle.style.width = m.circleSize;
          circle.style.height = m.circleSize;
        }
        spokes.forEach((sp) => {
          sp.style.width = m.barWidth;
          sp.style.paddingBottom = m.paddingBottom;
        });
        bars.forEach((bar) => {
          bar.style.height = m.barHeight;
        });
      };

      applyBaseGeometry();

      const onResize = () => applyBaseGeometry();
      window.addEventListener("resize", onResize, { passive: true });
      resizeHandlers.push(() => window.removeEventListener("resize", onResize));

      const animateIn = () => {
        if (!gsap) return;
        const m = getMetrics();
        gsap.to(spokes, {
          paddingBottom: m.paddingBottomHover,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(circle, {
          rotate: 90,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(bars, {
          height: m.barHeightHover,
          width: m.barWidthHover,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        if (textEl) {
          gsap.to(textEl, {
            x: "0.5vw",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      };

      const animateOut = () => {
        if (!gsap) return;
        const m = getMetrics();
        gsap.to(spokes, {
          paddingBottom: m.paddingBottom,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(circle, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(bars, {
          height: m.barHeight,
          width: m.barWidth,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        if (textEl) {
          gsap.to(textEl, {
            x: "0vw",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      };

      const hoverTarget = isContainerHover
        ? btn.closest("[data-display-card]") || btn.parentElement || btn
        : btn;

      hoverTarget.addEventListener("mouseenter", animateIn);
      hoverTarget.addEventListener("mouseleave", animateOut);
      hoverTarget.addEventListener("focusin", animateIn);
      hoverTarget.addEventListener("focusout", animateOut);
    });

    addCleanup(() => {
      resizeHandlers.forEach((fn) => fn());
    });
  }

  // =========================================================================
  // 3. DIRECTIONAL NAV LINK UNDERLINE (StyleTextButtonHover — BJo4ozbC.js)
  // =========================================================================
  function initDirectionalLinks(root = document) {
    const links = root.querySelectorAll("[data-directional-link]");
    links.forEach((link) => {
      if (link.dataset.dirInitialized === "true") return;
      link.dataset.dirInitialized = "true";
      const bar = link.querySelector("[data-directional-bar]");
      if (!bar) return;

      const getSide = (e) => {
        const rect = link.getBoundingClientRect();
        return e.clientX - rect.left < rect.width / 1.2 ? "left" : "right";
      };

      link.addEventListener("mouseenter", (e) => {
        const side = getSide(e);
        bar.style.transformOrigin = side;
        bar.style.transform = "scaleX(1)";
      });

      link.addEventListener("mouseleave", (e) => {
        const side = getSide(e);
        bar.style.transformOrigin = side;
        bar.style.transform = "scaleX(0)";
      });

      link.addEventListener("focus", () => {
        bar.style.transformOrigin = "left";
        bar.style.transform = "scaleX(1)";
      });

      link.addEventListener("blur", () => {
        bar.style.transformOrigin = "right";
        bar.style.transform = "scaleX(0)";
      });
    });
  }

  // =========================================================================
  // 4. CORE HEADER ADAPTIVE SCROLL VISIBILITY & THEME SWITCHING
  // =========================================================================
  function initCoreHeaderScroll() {
    const header = document.getElementById("core-header");
    if (!header) return;

    const updateHeader = () => {
      const hash = window.location.hash || "#/";
      const isHome = hash === "#/" || hash === "#" || hash === "";

      // Determine visibility: on Home, show once [data-activate-nav] reaches top <= 80px
      if (isHome) {
        const triggerEl = document.querySelector('[data-activate-nav="true"]');
        if (triggerEl) {
          const rect = triggerEl.getBoundingClientRect();
          if (rect.top <= 60) {
            header.classList.remove("opacity-0", "pointer-events-none");
            header.classList.add("opacity-100", "pointer-events-auto");
          } else {
            header.classList.add("opacity-0", "pointer-events-none");
            header.classList.remove("opacity-100", "pointer-events-auto");
          }
        }
      } else {
        header.classList.remove("opacity-0", "pointer-events-none");
        header.classList.add("opacity-100", "pointer-events-auto");
      }

      // Determine theme color (dark text vs light text) based on sections crossing top
      const themedSections = document.querySelectorAll("[data-nav-theme]");
      let activeTheme = "dark";
      themedSections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top <= 45 && r.bottom > 45) {
          activeTheme = sec.getAttribute("data-nav-theme") || "dark";
        }
      });

      if (activeTheme === "light") {
        header.classList.remove("text-secondary");
        header.classList.add("text-primary");
      } else {
        header.classList.remove("text-primary");
        header.classList.add("text-secondary");
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    addCleanup(() => window.removeEventListener("scroll", updateHeader));
  }

  // =========================================================================
  // 5. STYLE TEXT APPEAR COPY (Line-by-Line Reveal on Scroll — BJo4ozbC.js)
  // =========================================================================
  function initAppearText(root = document) {
    if (!gsap || !ScrollTrigger) return;
    const items = root.querySelectorAll("[data-appear-text]");
    items.forEach((el) => {
      const inner = el.querySelector("[data-appear-inner]");
      if (!inner) return;
      const delay = parseFloat(el.dataset.delay || "0");

      gsap.fromTo(
        inner,
        { yPercent: 35, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          }
        }
      );
    });
  }

  // =========================================================================
  // 6. STYLE IMAGE OVERLAY REVEAL & PARALLAX (CfRTJ5fT.js)
  // =========================================================================
  function initStyleImages(root = document) {
    if (!gsap || !ScrollTrigger) return;
    const containers = root.querySelectorAll("[data-style-image]");

    containers.forEach((container) => {
      const overlay = container.querySelector("[data-image-overlay]");
      const parallax = container.querySelector("[data-image-parallax]");
      const doScale = container.dataset.scale !== "false";

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            once: true
          }
        });
      }

      if (parallax && doScale) {
        gsap.fromTo(
          parallax,
          { y: "0%" },
          {
            y: "20%",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    });
  }

  // =========================================================================
  // 7. STYLE HOVERING ACTION — Cursor Follower + Velocity Rotation (DmBctEvM.js)
  // =========================================================================
  function initHoveringActions(root = document) {
    if (!gsap) return;
    const containers = root.querySelectorAll("[data-hover-action]");

    containers.forEach((container) => {
      const hoverObj = container.querySelector("[data-hover-object]");
      const hoverOpacity = container.querySelector("[data-hover-opacity]");
      const hoverSvg = container.querySelector("[data-hover-svg]");
      const imgContainer = container.querySelector("[data-hover-image-container]");

      if (!hoverObj || !hoverOpacity || !imgContainer) return;

      const xTo = gsap.quickTo(hoverObj, "x", { duration: 0.4, ease: "power2.out" });
      const yTo = gsap.quickTo(hoverObj, "y", { duration: 0.4, ease: "power2.out" });

      let prevX = null;
      let prevY = null;
      let lastTime = 0;

      container.addEventListener("mouseenter", () => {
        if (window.innerWidth < 640) return;
        gsap.to(hoverOpacity, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(imgContainer, {
          scale: 0.9,
          duration: 0.75,
          ease: "power4.out"
        });
      });

      container.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 640) return;
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        xTo(relX + 12);
        yTo(relY + 12);

        const now = Date.now();
        if (now - lastTime >= 80 && hoverSvg) {
          lastTime = now;
          if (prevX !== null && prevY !== null) {
            const dx = relX - prevX;
            const dy = relY - prevY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) * 0.6;
            gsap.to(hoverSvg, {
              rotation: angle,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          prevX = relX;
          prevY = relY;
        }
      });

      container.addEventListener("mouseleave", () => {
        gsap.to(hoverOpacity, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(imgContainer, {
          scale: 1,
          duration: 0.75,
          ease: "power4.out"
        });
      });
    });
  }

  // =========================================================================
  // 8. DISPLAY NOTE — Flying Paperclipped Handwritten Note (y2vK12k4.js)
  // =========================================================================
  function wrapNoteText(text, maxChars = 28) {
    const words = (text || "").split(" ");
    const lines = ["", "", "", "", "", ""];
    let currentLine = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentLine > 5) break;
      const candidate = lines[currentLine]
        ? lines[currentLine] + " " + word
        : word;
      if (candidate.length <= maxChars) {
        lines[currentLine] = candidate;
      } else {
        currentLine++;
        if (currentLine <= 5) {
          lines[currentLine] = word;
        }
      }
    }
    return lines;
  }

  function initInteractiveNotes(root = document) {
    if (!gsap) return;
    const notes = root.querySelectorAll("[data-interactive-note]");

    notes.forEach((noteEl) => {
      const paperclip = noteEl.querySelector("[data-note-paperclip]");
      const sheet = noteEl.querySelector("[data-note-sheet]");
      const lineSpans = noteEl.querySelectorAll("[data-note-line]");
      let noteIndex = Math.floor(Math.random() * D.notesList.length);
      let isAnimating = false;

      const renderNoteLines = (idx) => {
        const wrapped = wrapNoteText(D.notesList[idx], 28);
        lineSpans.forEach((sp, i) => {
          sp.textContent = wrapped[i] || "";
        });
      };

      renderNoteLines(noteIndex);

      const triggerNoteCycle = () => {
        if (isAnimating) return;
        isAnimating = true;

        gsap.to(sheet, {
          rotate: 45,
          translateY: "200vh",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            noteIndex = (noteIndex + 1) % D.notesList.length;
            renderNoteLines(noteIndex);
            gsap.to(sheet, {
              rotate: 0,
              translateY: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                isAnimating = false;
              }
            });
          }
        });

        if (paperclip) {
          gsap.to(paperclip, {
            rotate: -6,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(paperclip, {
                rotate: 0,
                delay: 0.8,
                duration: 0.4,
                ease: "power2.out"
              });
            }
          });
        }
      };

      noteEl.addEventListener("click", triggerNoteCycle);
      noteEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerNoteCycle();
        }
      });
    });
  }

  // =========================================================================
  // 9. BEFORE & AFTER RANGE SLIDER CONTROLLER
  // =========================================================================
  function initBeforeAfterSliders(root = document) {
    const sliders = root.querySelectorAll("[data-ba-slider]");
    sliders.forEach((slider) => {
      const range = slider.querySelector("[data-ba-range]");
      const beforeWrap = slider.querySelector("[data-ba-before]");
      const handle = slider.querySelector("[data-ba-handle]");
      if (!range || !beforeWrap || !handle) return;

      const update = () => {
        const val = parseFloat(range.value);
        beforeWrap.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
        handle.style.left = `${val}%`;
      };

      range.addEventListener("input", update);
      range.addEventListener("change", update);
    });
  }

  // =========================================================================
  // 10. CORE FOOTER STICKY REVEAL + DISPLAY CREDIT GLASS WIGGLE
  // =========================================================================
  function initCoreFooter(root = document) {
    if (!gsap || !ScrollTrigger) return;
    const footer = root.querySelector("[data-core-footer]");
    if (!footer) return;

    const lowerFooter = footer.querySelector("[data-lower-footer]");
    if (lowerFooter) {
      gsap.to(lowerFooter, {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      });
    }

    const creditWidget = footer.querySelector("[data-credit-widget]");
    const creditText = footer.querySelector("[data-credit-text]");
    const creditGlass = footer.querySelector("[data-credit-glass]");

    if (creditWidget && creditText && creditGlass) {
      creditWidget.addEventListener("mouseenter", () => {
        gsap.to(creditText, {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto"
        });
        gsap.fromTo(
          creditGlass,
          { rotate: 0 },
          {
            keyframes: [
              { rotate: -8, duration: 0.08 },
              { rotate: 8, duration: 0.08 },
              { rotate: -6, duration: 0.08 },
              { rotate: 6, duration: 0.08 },
              { rotate: 0, duration: 0.1 }
            ],
            ease: "power1.inOut"
          }
        );
      });

      creditWidget.addEventListener("mouseleave", () => {
        gsap.to(creditText, {
          x: "101%",
          duration: 0.35,
          ease: "power3.in",
          overwrite: "auto"
        });
      });
    }

    // Contact form parallax lift on desktop
    const formParallax = root.querySelector("[data-contact-form-parallax]");
    const coreContact = root.querySelector("[data-core-contact]");
    if (formParallax && coreContact && window.innerWidth >= 640) {
      gsap.fromTo(
        formParallax,
        { y: "50%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: coreContact,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );
    }
  }

  // =========================================================================
  // 11. GENERIC 4-BAR AUTO-ADVANCING SLIDER HELPER (Storey 10s Progress Bar)
  // =========================================================================
  function createFourBarSlider({
    barWraps,
    barFills,
    images,
    thumbs = null,
    duration = 10,
    onSlideChange = null
  }) {
    if (!gsap || !barWraps.length || !barFills.length) return;
    let activeIndex = 0;
    let tween = null;

    const goToSlide = (nextIdx) => {
      if (tween) tween.kill();

      // Update bar widths & fills
      barWraps.forEach((w, i) => {
        if (i === nextIdx) {
          w.classList.remove("w-1/6");
          w.classList.add("w-1/2");
        } else {
          w.classList.remove("w-1/2");
          w.classList.add("w-1/6");
        }
      });

      barFills.forEach((f) => {
        gsap.killTweensOf(f);
        gsap.set(f, { scaleX: 0 });
      });

      // Crossfade & scale images
      if (images && images.length) {
        images.forEach((imgWrap, i) => {
          if (i === nextIdx) {
            gsap.to(imgWrap, {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(imgWrap, {
              opacity: 0,
              scale: 1.05,
              duration: 0.75,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      }

      if (thumbs && thumbs.length) {
        thumbs.forEach((thWrap, i) => {
          if (i === nextIdx) {
            gsap.to(thWrap, {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(thWrap, {
              opacity: 0,
              scale: 1.05,
              duration: 0.75,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      }

      if (typeof onSlideChange === "function") {
        onSlideChange(nextIdx, activeIndex);
      }

      activeIndex = nextIdx;

      // Start 10s linear fill on active bar
      const activeFill = barFills[activeIndex];
      if (activeFill) {
        tween = gsap.fromTo(
          activeFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration,
            ease: "none",
            onComplete: () => {
              goToSlide((activeIndex + 1) % barWraps.length);
            }
          }
        );
      }
    };

    barWraps.forEach((wrap, idx) => {
      wrap.addEventListener("click", () => goToSlide(idx));
      wrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToSlide(idx);
        }
      });
    });

    goToSlide(0);

    addCleanup(() => {
      if (tween) tween.kill();
    });
  }

  // =========================================================================
  // 12. HOME VIEW SPECIFIC CHOREOGRAPHY (BV5TILUP.js)
  // =========================================================================
  function initHomeViewAnimations(root) {
    if (!gsap || !ScrollTrigger) return;

    // 12A. LandingHero Entrance & Parallax
    const hero = root.querySelector("[data-landing-hero]");
    if (hero) {
      const heroParallax = hero.querySelector("[data-hero-parallax]");
      const heroImgEl = hero.querySelector("[data-hero-img-element]");
      const topItems = hero.querySelectorAll("[data-hero-top-item]");
      const progressLines = hero.querySelectorAll(".project-slider-progress-line");
      const ctaBtn = hero.querySelector("#project-slider-cta-button");
      const statementEl = hero.querySelector("[data-hero-statement]");
      const statementWrap = hero.querySelector("[data-hero-statement-wrap]");

      gsap.to(hero, { opacity: 1, duration: 0.2 });
      if (heroImgEl) {
        gsap.to(heroImgEl, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        });
      }
      gsap.to(topItems, {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "power4.out"
      });
      gsap.to(progressLines, {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        stagger: 0.1,
        ease: "power4.out"
      });
      if (ctaBtn) {
        gsap.to(ctaBtn, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power4.out"
        });
      }

      if (heroParallax) {
        gsap.to(heroParallax, {
          y: "20%",
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Hero 4-slide auto-progress slider
      const heroBarWraps = Array.from(hero.querySelectorAll("[data-hero-bar-wrap]"));
      const heroBarFills = Array.from(hero.querySelectorAll("[data-hero-bar-fill]"));
      const heroSlideImgs = Array.from(hero.querySelectorAll("[data-hero-slide-img]"));

      createFourBarSlider({
        barWraps: heroBarWraps,
        barFills: heroBarFills,
        images: heroSlideImgs,
        duration: 10,
        onSlideChange: (nextIdx, prevIdx) => {
          if (nextIdx === prevIdx || !statementEl || !statementWrap) return;
          gsap.to(statementWrap, {
            yPercent: 100,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              statementEl.textContent = D.heroSlides[nextIdx].statement;
              gsap.fromTo(
                statementWrap,
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
              );
            }
          });
        }
      });
    }

    // 12B. 3D Interactive Intro Logo Spinner + ModalSpinnerExplainer
    const introSection = root.querySelector("#intro-section-container");
    const introSpinner = root.querySelector("#intro-logo-spinner");
    const explainer = root.querySelector("[data-spinner-explainer]");

    if (introSection && introSpinner) {
      const squares = Array.from(
        introSpinner.querySelectorAll("[data-spinner-square]")
      );
      let activeHoveredIdx = null;
      let explainerDismissed = false;

      const checkHoveredSquare = () => {
        if (window.innerWidth < 640) return;
        const hitElements = document.elementsFromPoint(pointer.x, pointer.y);
        let foundIdx = null;

        for (let i = 0; i < squares.length; i++) {
          if (hitElements.includes(squares[i])) {
            foundIdx = i;
            break;
          }
        }

        if (foundIdx !== activeHoveredIdx) {
          // Reset previous square
          if (activeHoveredIdx !== null && squares[activeHoveredIdx]) {
            const prevSq = squares[activeHoveredIdx];
            const prevInner = prevSq.firstElementChild;
            gsap.to(prevSq, {
              opacity: 0.4,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            if (prevInner) {
              gsap.to(prevInner, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }

          // Highlight new square
          if (foundIdx !== null && squares[foundIdx]) {
            const nextSq = squares[foundIdx];
            const nextInner = nextSq.firstElementChild;
            gsap.to(nextSq, {
              opacity: 1,
              scale: 1.3,
              duration: 0.3,
              ease: "power2.out"
            });
            if (nextInner) {
              gsap.to(nextInner, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }

            // Dismiss tutorial explainer on first hover
            if (explainer && !explainerDismissed) {
              explainerDismissed = true;
              gsap.to(explainer, {
                filter: "blur(5px)",
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          }

          activeHoveredIdx = foundIdx;
        }
      };

      gsap.fromTo(
        introSpinner,
        { rotation: 0 },
        {
          rotation: 120,
          ease: "none",
          scrollTrigger: {
            trigger: introSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          onUpdate: checkHoveredSquare
        }
      );

      const onMouseMoveSpinner = () => checkHoveredSquare();
      window.addEventListener("mousemove", onMouseMoveSpinner, { passive: true });
      addCleanup(() => window.removeEventListener("mousemove", onMouseMoveSpinner));

      if (explainer) {
        ScrollTrigger.create({
          trigger: introSection,
          start: "top 60%",
          once: true,
          onEnter: () => {
            gsap.to(explainer, {
              y: "0%",
              duration: 0.75,
              ease: "power3.out"
            });
          }
        });
      }
    }

    // 12C. Services Stacking Cards Parallax & Cover Shading
    const serviceCards = Array.from(
      root.querySelectorAll("[data-service-card-desktop]")
    );
    serviceCards.forEach((card, idx) => {
      if (idx >= serviceCards.length - 1) return;
      const nextCard = serviceCards[idx + 1];
      const cover = card.querySelector("[data-service-card-cover]");

      gsap.to(card, {
        y: "35%",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      });

      if (cover) {
        gsap.to(cover, {
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        });
      }
    });

    // Bottom logo rotation in Services section
    const servicesSection = root.querySelector("[data-services-section]");
    const servicesLogo = root.querySelector("[data-services-bottom-logo]");
    if (servicesSection && servicesLogo) {
      gsap.to(servicesLogo, {
        rotate: 45,
        ease: "none",
        scrollTrigger: {
          trigger: servicesSection,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // 12D. Projects CTA Banner Parallax ("We shape space into purpose")
    const projCta = root.querySelector("[data-projects-cta]");
    const projCtaImg = root.querySelector("[data-projects-cta-img]");
    if (projCta && projCtaImg) {
      gsap.fromTo(
        projCtaImg,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: projCta,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // 12E. Testimonials Section Vertical Lift, Background Spinner & 4-Bar Slider
    const testSection = root.querySelector("[data-testimonials-section]");
    if (testSection) {
      gsap.fromTo(
        testSection,
        { y: "12%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: testSection,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        }
      );

      const bgSpinner = testSection.querySelector("#background-logo-spinner");
      if (bgSpinner) {
        gsap.fromTo(
          bgSpinner,
          { rotation: 0 },
          {
            rotation: 120,
            ease: "none",
            scrollTrigger: {
              trigger: testSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      const testBarWraps = Array.from(
        testSection.querySelectorAll("[data-test-bar-wrap]")
      );
      const testBarFills = Array.from(
        testSection.querySelectorAll("[data-test-bar-fill]")
      );
      const testImgs = Array.from(testSection.querySelectorAll("[data-test-img]"));
      const testThumbs = Array.from(
        testSection.querySelectorAll("[data-test-thumb]")
      );
      const copyEl = testSection.querySelector("[data-test-copy]");
      const authorEl = testSection.querySelector("[data-test-author]");
      const companyEl = testSection.querySelector("[data-test-company]");

      createFourBarSlider({
        barWraps: testBarWraps,
        barFills: testBarFills,
        images: testImgs,
        thumbs: testThumbs,
        duration: 10,
        onSlideChange: (nextIdx, prevIdx) => {
          if (nextIdx === prevIdx) return;
          const item = D.testimonials[nextIdx];
          if (!item) return;
          gsap.to([copyEl, authorEl, companyEl], {
            opacity: 0,
            y: 8,
            duration: 0.2,
            onComplete: () => {
              if (copyEl) copyEl.textContent = item.copy;
              if (authorEl) authorEl.textContent = item.author;
              if (companyEl) companyEl.textContent = item.company;
              gsap.to([copyEl, authorEl, companyEl], {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out"
              });
            }
          });
        }
      });
    }
  }

  // =========================================================================
  // 13. PROJECT DETAIL VIEW SPECIFIC CHOREOGRAPHY (C9ab8ev8.js)
  // =========================================================================
  function initProjectDetailAnimations(root) {
    if (!gsap || !ScrollTrigger) return;
    const hero = root.querySelector("[data-project-hero]");
    if (!hero) return;

    const heroImg = hero.querySelector("[data-proj-hero-img]");
    const heroParallax = hero.querySelector("[data-proj-hero-parallax]");

    if (heroImg) {
      gsap.to(heroImg, {
        scale: 1,
        duration: 1.4,
        ease: "power3.out"
      });
    }

    if (heroParallax) {
      gsap.to(heroParallax, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  // =========================================================================
  // 14. STUDIO VIEW SPECIFIC CHOREOGRAPHY (DiPf60rn.js)
  // =========================================================================
  function initStudioViewAnimations(root) {
    if (!gsap || !ScrollTrigger) return;

    // 14A. Studio Hero Central 3D Spinner Entrance, Continuous Spin & Scroll Acceleration
    const studioHero = root.querySelector("[data-studio-hero]");
    const centralEntrance = root.querySelector("[data-studio-central-spinner]");
    const centralContainer = root.querySelector("#central-logo-spinner-container");
    const centralSpinner = root.querySelector("#central-logo-spinner");

    if (centralEntrance) {
      gsap.to(centralEntrance, {
        y: "0%",
        opacity: 1,
        delay: 0.25,
        duration: 1.5,
        ease: "power4.out"
      });
    }

    if (centralContainer) {
      const spinTween = gsap.to(centralContainer, {
        rotation: -360,
        duration: 100,
        ease: "none",
        repeat: -1
      });
      addCleanup(() => spinTween.kill());
    }

    if (studioHero && centralSpinner) {
      gsap.to(centralSpinner, {
        rotation: -60,
        ease: "none",
        scrollTrigger: {
          trigger: studioHero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // 14B. Studio About 4-Bar Slider
    const aboutSlider = root.querySelector("[data-studio-about-slider]");
    if (aboutSlider) {
      const wraps = Array.from(
        aboutSlider.querySelectorAll("[data-studio-about-bar-wrap]")
      );
      const fills = Array.from(
        aboutSlider.querySelectorAll("[data-studio-about-bar-fill]")
      );
      const imgs = Array.from(
        aboutSlider.querySelectorAll("[data-studio-about-img]")
      );
      createFourBarSlider({
        barWraps: wraps,
        barFills: fills,
        images: imgs,
        duration: 10
      });
    }

    // 14C. Core Principles Stacking Cards Parallax
    const principleCards = Array.from(
      root.querySelectorAll("[data-service-card-desktop]")
    );
    principleCards.forEach((card, idx) => {
      if (idx >= principleCards.length - 1) return;
      const nextCard = principleCards[idx + 1];
      const cover = card.querySelector("[data-service-card-cover]");

      gsap.to(card, {
        y: "35%",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      });

      if (cover) {
        gsap.to(cover, {
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        });
      }
    });

    // 14D. Studio Process Side 3D Spinner
    const processSec = root.querySelector("[data-studio-process]");
    const sideContainer = root.querySelector("#side-logo-spinner-container");
    const sideSpinner = root.querySelector("#side-logo-spinner");

    if (sideContainer) {
      const sideTween = gsap.to(sideContainer, {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1
      });
      addCleanup(() => sideTween.kill());
    }

    if (processSec && sideSpinner) {
      gsap.to(sideSpinner, {
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: processSec,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // 14E. Studio Practice 4-Tab Slider
    const practiceSec = root.querySelector("[data-studio-practice]");
    if (practiceSec) {
      const wraps = Array.from(
        practiceSec.querySelectorAll("[data-practice-bar-wrap]")
      );
      const fills = Array.from(
        practiceSec.querySelectorAll("[data-practice-bar-fill]")
      );
      const imgs = Array.from(practiceSec.querySelectorAll("[data-practice-img]"));
      const titleEl = practiceSec.querySelector("[data-practice-title]");
      const p0El = practiceSec.querySelector("[data-practice-p0]");
      const p1El = practiceSec.querySelector("[data-practice-p1]");

      createFourBarSlider({
        barWraps: wraps,
        barFills: fills,
        images: imgs,
        duration: 10,
        onSlideChange: (nextIdx, prevIdx) => {
          if (nextIdx === prevIdx) return;
          const pa = D.practiceAreas[nextIdx];
          if (!pa) return;
          gsap.to([titleEl, p0El, p1El], {
            opacity: 0,
            y: 6,
            duration: 0.2,
            onComplete: () => {
              if (titleEl) titleEl.textContent = pa.title;
              if (p0El) p0El.textContent = pa.paragraphs[0];
              if (p1El) p1El.textContent = pa.paragraphs[1];
              gsap.to([titleEl, p0El, p1El], {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out"
              });
            }
          });
        }
      });
    }
  }

  // =========================================================================
  // 15. JOURNAL POST MINIMAP SCROLL MARKER (dYN8OpZq.js)
  // =========================================================================
  function initJournalPostAnimations(root) {
    if (!gsap || !ScrollTrigger) return;
    const contentWrap = root.querySelector("[data-journal-post-content]");
    const minimap = root.querySelector("[data-journal-minimap]");
    const marker = root.querySelector("[data-journal-marker]");

    if (contentWrap && minimap && marker) {
      gsap.to(marker, {
        top: () => Math.max(0, minimap.offsetHeight - marker.offsetHeight),
        ease: "none",
        scrollTrigger: {
          trigger: contentWrap,
          start: "top 10%",
          end: "bottom 75%",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }
  }

  // =========================================================================
  // 16. INTAKE FORM SUBMISSION & ACCESSIBLE VALIDATION (Remediates Bug #2)
  // =========================================================================
  function initContactForms(root = document) {
    const forms = root.querySelectorAll("[data-elite-contact-form]");

    forms.forEach((form) => {
      if (form.dataset.formInitialized === "true") return;
      form.dataset.formInitialized = "true";

      const statusEl = form.querySelector("[data-form-status]");
      const submitBtn = form.querySelector('button[type="submit"]');
      const submitText = submitBtn
        ? submitBtn.querySelector("[data-btn-text]")
        : null;

      // Clear field error state on input
      form.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("input", () => {
          field.removeAttribute("aria-invalid");
          if (statusEl && statusEl.classList.contains("is-error")) {
            statusEl.textContent = "";
            statusEl.classList.remove("is-error");
          }
        });
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Honeypot check
        const honey = form.querySelector('input[name="extension"]');
        if (honey && honey.checked) return;

        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const locationInput = form.querySelector('input[name="location"]');
        const timelineInput = form.querySelector('input[name="timeline"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        const requiredFields = [
          { el: nameInput, label: "Name" },
          { el: emailInput, label: "Email" },
          { el: phoneInput, label: "Phone Number" },
          { el: locationInput, label: "Location" },
          { el: timelineInput, label: "Timeline" },
          { el: messageInput, label: "Project details" }
        ];

        for (const item of requiredFields) {
          if (!item.el || !item.el.value.trim()) {
            if (item.el) {
              item.el.setAttribute("aria-invalid", "true");
              item.el.focus();
            }
            if (statusEl) {
              statusEl.textContent = `Please enter your ${item.label}.`;
              statusEl.classList.add("is-error");
              statusEl.classList.remove("is-success");
            }
            return;
          }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.setAttribute("aria-invalid", "true");
          emailInput.focus();
          if (statusEl) {
            statusEl.textContent = "Please enter a valid email address.";
            statusEl.classList.add("is-error");
          }
          return;
        }

        // Loading state
        if (submitBtn) {
          submitBtn.setAttribute("aria-busy", "true");
          submitBtn.disabled = true;
        }
        if (submitText) submitText.textContent = "Sending...";
        if (statusEl) {
          statusEl.textContent = "Submitting your DFW remodeling brief...";
          statusEl.classList.remove("is-error", "is-success");
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.setAttribute("aria-busy", "false");
            submitBtn.disabled = false;
          }
          if (submitText) submitText.textContent = "Submitted";
          if (statusEl) {
            statusEl.textContent =
              "Thank you! Elite Home Creations DFW will contact you shortly for your free quote.";
            statusEl.classList.add("is-success");
          }
          form.reset();

          setTimeout(() => {
            if (submitText) submitText.textContent = "Submit";
          }, 4000);
        }, 650);
      });
    });
  }

  // =========================================================================
  // 17. MODAL CONTACT & MOBILE MENU CONTROLLERS (Exact BV5TILUP.js CR & HR)
  // =========================================================================
  let modalLenis = null;
  let isContactModalOpen = false;

  function openContactModal() {
    const modal = document.getElementById("contact-modal");
    const panel = document.getElementById("contact-modal-panel");
    const scrollWrapper = document.getElementById("contact-modal-scroll-wrapper");
    const scrollContent = document.getElementById("contact-modal-scroll-content");
    if (!modal || !panel) return;

    isContactModalOpen = true;
    if (lenis) lenis.stop();

    modal.classList.remove("hidden");
    modal.style.display = "block";
    modal.style.pointerEvents = "auto";
    modal.setAttribute("aria-hidden", "false");

    if (scrollWrapper) scrollWrapper.scrollTop = 0;

    if (window.Lenis && scrollWrapper && scrollContent) {
      if (modalLenis) modalLenis.destroy();
      modalLenis = new window.Lenis({
        wrapper: scrollWrapper,
        content: scrollContent,
        lerp: 0.05,
        duration: 0.6,
        smoothWheel: true,
        autoRaf: true
      });
      modalLenis.resize();
    }

    if (gsap) {
      gsap.killTweensOf([modal, panel]);
      gsap.set(panel, { y: "100%" });
      gsap.to(panel, {
        y: "0%",
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          if (modalLenis) modalLenis.resize();
        }
      });
      gsap.to(modal, {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }

  function closeContactModal() {
    const modal = document.getElementById("contact-modal");
    const panel = document.getElementById("contact-modal-panel");
    if (!modal || !panel || !isContactModalOpen) return;

    isContactModalOpen = false;
    modal.style.pointerEvents = "none";
    modal.setAttribute("aria-hidden", "true");

    if (modalLenis) {
      modalLenis.destroy();
      modalLenis = null;
    }
    if (lenis) lenis.start();

    if (gsap) {
      gsap.killTweensOf([modal, panel]);
      gsap.to(panel, {
        y: "150%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (!isContactModalOpen) {
            modal.style.display = "none";
          }
        }
      });
      gsap.to(modal, {
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 1.5,
        ease: "power2.out"
      });
    } else {
      modal.style.display = "none";
    }
  }

  function openMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;
    menu.setAttribute("aria-hidden", "false");
    if (gsap) {
      gsap.to(menu, {
        height: "100lvh",
        duration: 0.75,
        ease: "power2.out",
        onStart: () => {
          menu.style.pointerEvents = "auto";
        }
      });
    } else {
      menu.style.height = "100vh";
      menu.style.pointerEvents = "auto";
    }
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;
    menu.setAttribute("aria-hidden", "true");
    if (gsap) {
      gsap.to(menu, {
        height: "0",
        duration: 0.75,
        ease: "power2.out",
        onStart: () => {
          menu.style.pointerEvents = "none";
        }
      });
    } else {
      menu.style.height = "0";
      menu.style.pointerEvents = "none";
    }
  }

  function initGlobalDelegatedActions() {
    // Prevent clicks inside the paperclipped form sheet from closing the modal backdrop
    const modalSheet = document.getElementById("contact-modal-sheet");
    if (modalSheet) {
      modalSheet.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    document.addEventListener("click", (e) => {
      const actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-action");

      if (action === "open-contact-modal") {
        e.preventDefault();
        closeMobileMenu();
        openContactModal();
      } else if (action === "close-contact-modal") {
        e.preventDefault();
        closeContactModal();
      } else if (action === "open-mobile-menu") {
        e.preventDefault();
        openMobileMenu();
      } else if (action === "close-mobile-menu") {
        e.preventDefault();
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeContactModal();
        closeMobileMenu();
      }
    });
  }

  // =========================================================================
  // 18. ROUTER & STOREY PAGE TRANSITION OVERLAY (#transition-overlay)
  // =========================================================================
  function parseRoute(hash) {
    const clean = (hash || "#/").replace(/^#/, "") || "/";
    const parts = clean.split("/").filter(Boolean);

    if (parts.length === 0) {
      return { view: "home", key: "home" };
    }
    if (parts[0] === "projects" && parts[1]) {
      return {
        view: "project-detail",
        slug: parts[1],
        key: `project:${parts[1]}`
      };
    }
    if (parts[0] === "projects") {
      return { view: "projects", key: "projects" };
    }
    if (parts[0] === "studio" || parts[0] === "services" || parts[0] === "about") {
      return { view: "studio", key: "studio" };
    }
    if (parts[0] === "journal" && parts[1]) {
      return {
        view: "journal-post",
        slug: parts[1],
        key: `journal:${parts[1]}`
      };
    }
    if (parts[0] === "journal" || parts[0] === "blog") {
      return { view: "journal", key: "journal" };
    }
    if (parts[0] === "faq" || parts[0] === "faqs") {
      return { view: "faq", key: "faq" };
    }
    return { view: "home", key: "home" };
  }

  function mountRouteContent(route) {
    const appView = document.getElementById("app-view");
    if (!appView) return;

    runCleanup();

    let html = "";
    switch (route.view) {
      case "projects":
        html = T.renderProjectsView();
        document.title =
          "Remodeling Projects & Before/Afters | Elite Home Creations DFW";
        break;
      case "project-detail":
        html = T.renderProjectDetailView(route.slug);
        document.title = "Project Case Study | Elite Home Creations DFW";
        break;
      case "studio":
        html = T.renderStudioView();
        document.title =
          "Studio, Services & Client Reviews | Elite Home Creations DFW";
        break;
      case "journal":
        html = T.renderJournalView();
        document.title =
          "Remodeling Journal & Guides | Elite Home Creations DFW";
        break;
      case "journal-post":
        html = T.renderJournalPostView(route.slug);
        document.title = "Remodeling Article | Elite Home Creations DFW";
        break;
      case "faq":
        html = T.renderFaqView();
        document.title =
          "Frequently Asked Questions | Elite Home Creations DFW";
        break;
      case "home":
      default:
        html = T.renderHomeView();
        document.title =
          "Elite Home Creations | Custom Bathroom & Kitchen Remodeling in Dallas/Fort Worth";
        break;
    }

    appView.innerHTML = html;

    // Reset scroll position to top
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // Initialize shared interactive components
    initAnimatedButtons(appView);
    initDirectionalLinks(appView);
    initCoreHeaderScroll();
    initAppearText(appView);
    initStyleImages(appView);
    initHoveringActions(appView);
    initInteractiveNotes(appView);
    initBeforeAfterSliders(appView);
    initContactForms(appView);
    initCoreFooter(appView);

    // Initialize view-specific choreography
    if (route.view === "home") {
      initHomeViewAnimations(appView);
    } else if (route.view === "project-detail") {
      initProjectDetailAnimations(appView);
    } else if (route.view === "studio") {
      initStudioViewAnimations(appView);
    } else if (route.view === "journal-post") {
      initJournalPostAnimations(appView);
    }

    if (ScrollTrigger) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }

  function handleRouteChange(initial = false) {
    const route = parseRoute(window.location.hash);
    if (!initial && route.key === currentRouteKey) return;
    currentRouteKey = route.key;

    closeMobileMenu();
    closeContactModal();

    const overlay = document.getElementById("transition-overlay");

    if (initial || !gsap || !overlay) {
      mountRouteContent(route);
      if (overlay && gsap) {
        gsap.to(overlay, { opacity: 0, duration: 0.6, ease: "power3.out" });
      }
      return;
    }

    if (isTransitioning) return;
    isTransitioning = true;

    // Exact Storey page transition (`gsap.to(cover, { opacity: 1, duration: 0.75, ease: "power4.inOut" })`)
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.75,
      ease: "power4.inOut",
      onComplete: () => {
        mountRouteContent(route);
        gsap.to(overlay, {
          opacity: 0,
          delay: 0.15,
          duration: 0.75,
          ease: "power4.inOut",
          onComplete: () => {
            isTransitioning = false;
          }
        });
      }
    });
  }

  // =========================================================================
  // 19. BOOTSTRAP ON DOM CONTENT LOADED
  // =========================================================================
  function bootstrap() {
    // Inject Contact Modal Form & Header CTA button into persistent shell
    const modalFormMount = document.getElementById("contact-modal-form-mount");
    if (modalFormMount) {
      modalFormMount.innerHTML = T.displayContactForm("modal");
    }

    const headerCtaMount = document.getElementById("header-cta-mount");
    if (headerCtaMount) {
      headerCtaMount.innerHTML = T.buttonMainAnimated({
        text: "Free Quote",
        size: "small",
        color: "dark",
        action: "open-contact-modal"
      });
    }

    const headerLogoMount = document.querySelectorAll("[data-brand-logo-mount]");
    headerLogoMount.forEach((el) => {
      el.innerHTML = T.brandLogoSvg();
    });

    initLenis();
    initAnimatedButtons(document);
    initDirectionalLinks(document);
    initContactForms(document);
    initGlobalDelegatedActions();

    handleRouteChange(true);
    window.addEventListener("hashchange", () => handleRouteChange(false));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
