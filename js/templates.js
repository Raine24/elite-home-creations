/* ==========================================================================
   Storey Architecture x Elite Home Creations DFW — Exact DOM Template Engine
   Matches every class, grid column, SVG path, and 3D transform of Storey
   ========================================================================== */

window.ELITE_TEMPLATES = (function () {
  const D = window.ELITE_DATA;

  // Official Elite Home Creations DFW "E + House Roof" Geometric Brand Mark (#1F74FC)
  function brandLogoSvg() {
    return `<svg viewBox="0 0 88 76" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="elite-official-mark">
      <!-- Outer E / Bracket Frame in Official #1F74FC Brand Blue -->
      <path d="M4 4H49V20H38V15H15V61H38V49H49V72H4V4Z" fill="#1F74FC"></path>
      <!-- Pitched Architectural Roof & Right Wall in Official #1F74FC Brand Blue -->
      <path d="M10 43L44 24L84 46V72H73V52.5L44 36.5L15 52.5V43H10Z" fill="#1F74FC"></path>
    </svg>`;
  }

  // Exact Storey Hover Badge 17x17 8-Ray SVG
  function hoverBadgeSvg() {
    return `<svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7.43848" width="2.20921" height="1.68095" fill="currentColor"></rect>
      <rect x="7.43848" y="15.3193" width="2.20921" height="1.68095" fill="currentColor"></rect>
      <rect width="2.20969" height="1.68059" transform="matrix(0.695977 0.718064 -0.717774 0.696276 13.8682 1.68164)" fill="currentColor"></rect>
      <rect width="2.20968" height="1.6806" transform="matrix(0.706959 -0.707254 0.706959 0.707254 1.68066 3.21094)" fill="currentColor"></rect>
      <rect width="2.20967" height="1.6806" transform="matrix(-0.70979 0.704413 -0.704117 -0.710084 15.415 13.7402)" fill="currentColor"></rect>
      <rect width="2.20968" height="1.6806" transform="matrix(-0.706959 -0.707254 0.706959 -0.707254 3.24316 15.3271)" fill="currentColor"></rect>
      <rect width="2.21014" height="1.68025" transform="matrix(0.00383073 0.999993 -0.999993 0.00383392 16.9854 7.37891)" fill="currentColor"></rect>
      <rect width="2.21014" height="1.68025" transform="matrix(0.00383073 0.999993 -0.999993 0.00383392 1.68066 7.37891)" fill="currentColor"></rect>
    </svg>`;
  }

  // Exact Storey ButtonMainAnimated
  function buttonMainAnimated({
    text = "Contact",
    size = "small",
    color = "light",
    href = null,
    action = "",
    buttonType = "button",
    containerHover = false
  }) {
    const isLarge = size === "large";
    const gapClass = isLarge ? "gap-[12vw] sm:gap-[5vw]" : "gap-[3vw] sm:gap-[2.3vw]";
    const bgClass =
      color === "dark"
        ? "bg-secondary"
        : color === "form"
        ? "bg-formSecondary"
        : "bg-primary";
    const pxClass = isLarge
      ? "pl-[5vw] sm:pl-[1.2vw] pr-[5vw] sm:pr-[1.4vw]"
      : "pl-[2vw] pr-[3vw] sm:px-[0.9vw]";
    const pyClass = isLarge ? "py-[4vw] sm:py-[0.8vw]" : "py-[1vw] sm:py-[0.7vw]";
    const textColor =
      color === "dark" || color === "form" ? "text-primary" : "text-secondary";
    const spokeBg = color === "light" ? "bg-secondary" : "bg-primary";
    const iconBoxWidth = isLarge ? "w-[8vw] sm:w-[2vw]" : "w-[1.2vw]";

    let spokesHtml = "";
    for (let i = 1; i <= 8; i++) {
      spokesHtml += `<div class="h-fit absolute top-0 left-1/2 -translate-x-1/2 origin-bottom" data-btn-spoke style="transform:rotate(${i * 45}deg);">
        <div class="w-full ${spokeBg}" data-btn-spoke-bar></div>
      </div>`;
    }

    const inner = `
      <span class="${textColor}" data-btn-text>${text}</span>
      <div class="${textColor} ${iconBoxWidth} flex items-center justify-end" data-btn-icon-wrap>
        <div class="relative spoke-spinner-ring" data-btn-circle>
          ${spokesHtml}
        </div>
      </div>
    `;

    const commonAttrs = `class="inline-flex justify-between extraSmallText items-center ${gapClass} ${bgClass} ${pxClass} ${pyClass} btn-animated" data-btn-animated data-btn-size="${size}" data-btn-color="${color}" ${
      containerHover ? 'data-container-hover="true"' : ""
    } ${action ? `data-action="${action}"` : ""}`;

    if (href) {
      return `<a href="${href}" ${commonAttrs}>${inner}</a>`;
    }
    if (containerHover) {
      return `<div ${commonAttrs}>${inner}</div>`;
    }
    return `<button type="${buttonType}" ${commonAttrs}>${inner}</button>`;
  }

  // Exact Storey DisplayLogo (3D perspective 8-spoke architectural emblem with Elite Brand Blue accent spokes)
  function displayLogo({ scale = 1.2, color = "primary" } = {}) {
    const w = scale * 13 + "vw";
    const barH = scale * 1.15 + "vw";
    const barW = scale * 1.5 + "vw";
    const padB = scale * 5 + "vw";
    const persp = scale * 12 + "vw";
    const bgClass = color === "primary" ? "bg-primary" : "bg-secondary";

    let spokes = "";
    for (let i = 1; i <= 8; i++) {
      const isBrandAccent = i === 2 || i === 6;
      const barStyle = isBrandAccent
        ? `height:${barH};background-color:#1F74FC;`
        : `height:${barH};`;
      spokes += `<div class="h-fit absolute top-0 left-1/2 -translate-x-1/2 origin-bottom" style="width:${barW};padding-bottom:${padB};transform:rotate(${i * 45}deg);">
        <div class="w-full ${isBrandAccent ? "" : bgClass}" style="${barStyle}"></div>
      </div>`;
    }
    return `<div class="relative" style="width:${w};height:${w};transform:perspective(${persp}) rotate3d(0.29, -1.01, 1.32, 91deg);">${spokes}</div>`;
  }

  // Exact Storey StyleTextAppearCopy wrapper
  function appearText(text, { delay = 0, block = false, extraClass = "smallText" } = {}) {
    const displayCls = block ? "block w-full" : "inline-block max-w-full";
    return `<span class="relative overflow-y-hidden ${displayCls}" data-v-30d30ebe data-appear-text data-delay="${delay}">
      <span class="${displayCls}" data-v-30d30ebe data-appear-inner style="visibility:visible;">
        <span class="${extraClass}">${text}</span>
      </span>
    </span>`;
  }

  // Exact Storey StyleImage parallax & reveal wrapper
  function styleImage({ src, alt, extraImgClass = "saturate-150", scale = true } = {}) {
    return `<div class="w-full h-full relative overflow-hidden" data-style-image data-scale="${scale}">
      <div class="w-full h-full absolute top-0 left-0 bg-secondary z-10" data-image-overlay></div>
      <div class="w-full h-full object-cover ${scale ? "scale-[1.2] origin-bottom" : ""}" data-image-parallax>
        <img src="${src}" alt="${alt || ""}" loading="lazy" onerror="this.setAttribute('data-error', 1)" class="w-full h-full object-cover ${extraImgClass}" />
      </div>
    </div>`;
  }

  // Exact Storey StyleHoveringAction wrapper
  function hoveringAction({ text = "Explore Project", size = "small", color = "light", contentHtml = "" } = {}) {
    const svgColor = color === "dark" ? "text-primary" : "text-secondary";
    const svgWidth = size === "large" ? "w-[8vw] sm:w-[2vw]" : "w-[1.5vw]";
    return `<div class="w-full h-full relative overflow-hidden cursor-pointer bg-secondary" data-hover-action>
      <div class="absolute top-0 left-0 z-10 pointer-events-none" data-hover-object>
        <div class="opacity-0 bg-primary w-fit h-fit" data-hover-opacity>
          <div class="flex justify-between items-center gap-[2.5vw] py-[0.4vw] px-[0.5vw]">
            <span class="extraSmallText text-secondary">${text}</span>
            <div class="${svgColor} ${svgWidth} h-auto origin-center" data-hover-svg>
              ${hoverBadgeSvg()}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full" data-hover-image-container>
        ${contentHtml}
      </div>
    </div>`;
  }

  // Exact Storey DisplayCard (used in LandingBlogs, JournalTable, ProjectsTable)
  function displayCard({
    title,
    imageSrc,
    imageAlt,
    aspectRatio = "14/12",
    actionText = "Read",
    hoverActionText = "Read Post",
    footerGap = "8vw",
    href = "#/journal"
  }) {
    return `<a href="${href}" class="w-full h-full flex flex-col" data-display-card>
      <div class="w-full min-h-0" style="aspect-ratio:${aspectRatio};">
        ${hoveringAction({
          text: hoverActionText || actionText,
          contentHtml: styleImage({ src: imageSrc, alt: imageAlt })
        })}
      </div>
      <div class="w-full flex justify-between pt-[0.75vw] items-end shrink-0" style="gap:${footerGap};">
        <span class="smallText">${title}</span>
        ${buttonMainAnimated({
          text: actionText,
          size: "small",
          color: "dark",
          containerHover: true
        })}
      </div>
    </a>`;
  }

  // Exact Storey DisplayNote (Interactive Paperclipped Note that flies off on click)
  function displayNote() {
    return `<div class="w-full h-full relative cursor-pointer" data-interactive-note role="button" tabindex="0" aria-label="Interactive Note from Elite Home Creations — Click to cycle notes">
      <div class="w-fit h-fit absolute top-[-3.85vw] left-[1vw] z-10 origin-top" data-note-paperclip>
        <img src="images/misc/paperclip.png" alt="" aria-hidden="true" draggable="false" class="w-[5.5vw] h-auto object-cover" />
      </div>
      <div class="w-full h-full bg-primary px-[10%] pt-[10%] pb-[8%] text-[1vw] text-formSecondary relative flex flex-col justify-between" data-note-sheet>
        <div class="w-full h-full absolute top-0 left-0 mix-blend-multiply overflow-hidden pointer-events-none z-10">
          <img src="images/misc/paper.webp" alt="" aria-hidden="true" class="w-[200%] h-[200%] object-cover opacity-[0.45]" />
        </div>
        <div class="flex justify-between items-center mb-[10%]">
          <div class="w-[42%] font-mono">
            <span>A NOTE FROM ELITE</span>
          </div>
          <div>
            <div class="flex sm:gap-[0.5vw] gap-[2vw] items-center">
              <div class="w-[1.6vw] h-auto">${brandLogoSvg()}</div>
              <span class="text-[1vw] font-medium">${D.brand.name}</span>
            </div>
          </div>
        </div>
        <div class="w-full h-full" data-note-lines>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="0">Fixed price guarantee, zero</span></div>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="1">surprises</span></div>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="2"></span></div>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="3"></span></div>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="4"></span></div>
          <div class="w-full h-[14%] border-b border-formSecondary flex items-end whitespace-nowrap"><span class="font-biro text-[1.5vw] text-gray-700" data-note-line="5"></span></div>
        </div>
        <div class="w-full flex justify-between font-mono text-[0.8vw]">
          <div><span>${D.brand.codeTag}</span></div>
          <div><span>THANK YOU</span></div>
          <div><span>ELITE.DFW</span></div>
        </div>
      </div>
    </div>`;
  }

  // Exact Storey DisplayNoteNoPaperclip (for Footer image clip)
  function displayNoteNoPaperclip() {
    return `<div class="w-full h-full bg-primary px-[10%] pt-[10%] pb-[8%] text-[1vw] text-formSecondary relative flex flex-col justify-between">
      <div class="w-full h-full absolute top-0 left-0 mix-blend-multiply overflow-hidden pointer-events-none z-10">
        <img src="images/misc/paper.webp" alt="" aria-hidden="true" class="w-[200%] h-[200%] object-cover opacity-[0.45]" />
      </div>
      <div class="flex justify-between items-center mb-[10%]">
        <div class="w-[45%] font-mono"><span>A NOTE FROM ELITE</span></div>
        <div>
          <div class="flex sm:gap-[0.5vw] gap-[2vw] items-center">
            <span class="text-[1vw] font-medium">${D.brand.name}</span>
            <div class="w-[1.5vw] pt-[0.25vw] h-auto">${brandLogoSvg()}</div>
          </div>
        </div>
      </div>
      <div class="w-full h-full">
        <div class="w-full h-[14%] border-b border-formSecondary flex items-end"><span class="font-biro text-[1.2vw] text-gray-700">Dallas / Fort Worth</span></div>
        <div class="w-full h-[14%] border-b border-formSecondary flex items-end"><span class="font-biro text-[1.2vw] text-gray-700">(214) 298-0007</span></div>
        <div class="w-full h-[14%] border-b border-formSecondary"></div>
        <div class="w-full h-[14%] border-b border-formSecondary"></div>
        <div class="w-full h-[14%] border-b border-formSecondary"></div>
        <div class="w-full h-[14%] border-b border-formSecondary"></div>
      </div>
      <div class="w-full flex justify-between font-mono text-[0.8vw]">
        <div><span>${D.brand.codeTag}</span></div>
        <div><span>THANK YOU</span></div>
        <div><span>ELITE</span></div>
      </div>
    </div>`;
  }

  // Exact Storey 3D 8-Card Ring Spinner (DisplayLogoSpinner)
  function displayLogoSpinner({ id = "intro-logo-spinner", interactive = true } = {}) {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(D.projects[i % D.projects.length]);
    }
    const cardsHtml = items
      .map((proj, idx) => {
        const deg = idx * 45;
        if (!interactive) {
          return `<div class="pointer-events-none absolute inset-0" style="transform:rotate(${deg}deg);">
            <div class="pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-primary opacity-30" data-spinner-square="${idx}" style="width:13.2vw;height:11.12vw;bottom:calc(50% + 44vw);"></div>
          </div>`;
        }
        return `<a href="#/projects/${proj.slug}" class="pointer-events-none absolute inset-0" style="transform:rotate(${deg}deg);" aria-label="Explore ${proj.title}">
          <div class="pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-primary opacity-40" data-spinner-square="${idx}" data-project-slug="${proj.slug}" style="width:13.2vw;height:11.12vw;bottom:calc(50% + 44vw);">
            <div class="w-full h-full opacity-0 cursor-pointer z-10">
              <img src="${proj.thumbnailImage.url}" alt="${proj.thumbnailImage.alt}" class="w-full h-full object-cover" />
            </div>
          </div>
        </a>`;
      })
      .join("");

    return `<div class="relative" style="width:114.4vw;height:114.4vw;perspective:132vw;" ${
      interactive ? 'data-interactive-spinner="true"' : ""
    }>
      <div class="size-full [transform-style:preserve-3d]" style="transform:rotate3d(0.27, -1.005, 1.5, 85deg);">
        <div id="${id}" class="relative size-full [transform-style:preserve-3d]">
          ${cardsHtml}
        </div>
      </div>
    </div>`;
  }

  // Exact Storey DisplayContact (Paperclipped Brief / Free Quote Intake Form)
  // Remediates Conversion Bug #2: Full working handler, Phone field included, accessible validation
  function displayContactForm(formIdPrefix = "inline") {
    return `<form class="w-full h-full bg-primary pt-[12vw] sm:pt-[5vw] pb-[10vw] sm:pb-[2.5vw] px-[var(--margin)] sm:px-0 relative text-formSecondary" data-elite-contact-form="${formIdPrefix}" novalidate>
      <input type="checkbox" name="extension" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none" />
      <div class="w-fit h-fit absolute top-[-11.3vw] sm:top-[-3.85vw] left-[var(--margin)] sm:left-[7vw]">
        <img src="images/misc/paperclip.png" alt="" aria-hidden="true" draggable="false" class="w-[16vw] sm:w-[5.5vw] h-auto object-cover" />
      </div>
      <div class="w-full h-full absolute top-0 left-0 mix-blend-multiply overflow-hidden pointer-events-none z-10">
        <img src="images/misc/paper.webp" alt="" aria-hidden="true" width="800" height="800" class="w-full h-full object-cover opacity-[0.45]" />
      </div>
      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[15vw] sm:mb-[7vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">01</span>
        </div>
        <div class="col-span-5 sm:col-span-3 sm:col-start-3">
          <span class="font-mono mediumText">PROJECT BRIEF INTAKE</span>
        </div>
        <div class="col-span-6 sm:col-span-3 sm:col-start-8 mt-[6vw] sm:mt-0 hidden sm:block">
          <div class="flex sm:gap-[0.65vw] gap-[2vw] items-center sm:justify-start justify-end">
            <div class="w-[7vw] sm:w-[2.4vw] h-auto">${brandLogoSvg()}</div>
            <span class="mediumText">${D.brand.name}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[12vw] sm:mb-[6vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">01)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
            <label for="${formIdPrefix}-name" class="extraSmallText">Name</label>
            <input id="${formIdPrefix}-name" name="name" type="text" required autocomplete="name" class="w-full border-b border-formSecondary bg-transparent focus:outline-none font-mono extraSmallText" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[12vw] sm:mb-[6vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">02)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[8vw] sm:gap-[var(--gutter)]">
            <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
              <label for="${formIdPrefix}-email" class="extraSmallText">Email</label>
              <input id="${formIdPrefix}-email" name="email" type="email" required autocomplete="email" class="w-full border-b border-formSecondary bg-transparent focus:outline-none font-mono extraSmallText" />
            </div>
            <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
              <label for="${formIdPrefix}-phone" class="extraSmallText">Phone Number</label>
              <input id="${formIdPrefix}-phone" name="phone" type="tel" required autocomplete="tel" placeholder="(214) 000-0000" class="w-full border-b border-formSecondary bg-transparent focus:outline-none font-mono extraSmallText" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[12vw] sm:mb-[6vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">03)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]" role="group" aria-labelledby="${formIdPrefix}-projtype-label">
            <span id="${formIdPrefix}-projtype-label" class="extraSmallText mb-[4vw] sm:mb-[1vw]">Project type</span>
            <div class="w-full grid grid-cols-2 sm:grid-cols-6 gap-[var(--gutter)] extraSmallText">
              <label class="col-span-1 sm:col-span-3 flex items-center gap-[4vw] sm:gap-[2.5vw] cursor-pointer">
                <input type="checkbox" name="projectType" value="Bathroom Remodel" class="sr-only peer" />
                <div class="w-[3.5vw] h-[3.5vw] sm:w-[1vw] sm:h-[1vw] shrink-0 peer-checked:bg-formSecondary bg-formSecondary/50 peer-focus-box"></div>
                <span>Bathroom Remodel</span>
              </label>
              <label class="col-span-1 sm:col-span-3 flex items-center gap-[4vw] sm:gap-[2.5vw] cursor-pointer">
                <input type="checkbox" name="projectType" value="Kitchen Remodel" class="sr-only peer" />
                <div class="w-[3.5vw] h-[3.5vw] sm:w-[1vw] sm:h-[1vw] shrink-0 peer-checked:bg-formSecondary bg-formSecondary/50 peer-focus-box"></div>
                <span>Kitchen Remodel</span>
              </label>
              <label class="col-span-1 sm:col-span-3 flex items-center gap-[4vw] sm:gap-[2.5vw] cursor-pointer">
                <input type="checkbox" name="projectType" value="Living Spaces" class="sr-only peer" />
                <div class="w-[3.5vw] h-[3.5vw] sm:w-[1vw] sm:h-[1vw] shrink-0 peer-checked:bg-formSecondary bg-formSecondary/50 peer-focus-box"></div>
                <span>Living Spaces</span>
              </label>
              <label class="col-span-1 sm:col-span-3 flex items-center gap-[4vw] sm:gap-[2.5vw] cursor-pointer">
                <input type="checkbox" name="projectType" value="Whole-Home / Investor" class="sr-only peer" />
                <div class="w-[3.5vw] h-[3.5vw] sm:w-[1vw] sm:h-[1vw] shrink-0 peer-checked:bg-formSecondary bg-formSecondary/50 peer-focus-box"></div>
                <span>Whole-Home / Investor</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[12vw] sm:mb-[6vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">04)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
            <label for="${formIdPrefix}-location" class="extraSmallText">Location (Dallas / Fort Worth Area)</label>
            <input id="${formIdPrefix}-location" name="location" type="text" required class="w-full border-b border-formSecondary bg-transparent focus:outline-none font-mono extraSmallText" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[12vw] sm:mb-[6vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">05)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
            <label for="${formIdPrefix}-timeline" class="extraSmallText">Timeline</label>
            <input id="${formIdPrefix}-timeline" name="timeline" type="text" required class="w-full border-b border-formSecondary bg-transparent focus:outline-none font-mono extraSmallText" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[10vw] sm:mb-[4vw]">
        <div class="col-span-1 col-start-1 sm:col-start-2">
          <span class="font-mono extraSmallText">06)</span>
        </div>
        <div class="col-span-5 sm:col-span-6 sm:col-start-3">
          <div class="flex flex-col gap-[2vw] sm:gap-[0.5vw]">
            <label for="${formIdPrefix}-message" class="extraSmallText">Tell us more</label>
            <div class="w-full h-[24vw] sm:h-[7.5vw] relative">
              <textarea id="${formIdPrefix}-message" name="message" required class="w-full h-full border-none bg-transparent focus:outline-none font-mono resize-none leading-[8vw] sm:leading-[2.5vw] extraSmallText"></textarea>
              <div class="w-full h-fit absolute top-0 left-0 pointer-events-none">
                <div class="w-full h-[8vw] sm:h-[2.5vw] border-b border-formSecondary"></div>
                <div class="w-full h-[8vw] sm:h-[2.5vw] border-b border-formSecondary"></div>
                <div class="w-full h-[8vw] sm:h-[2.5vw] border-b border-formSecondary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[8vw] sm:mb-[2vw]">
        <div class="col-span-6 col-start-2 sm:col-span-6 sm:col-start-3">
          ${buttonMainAnimated({
            text: "Submit",
            size: "small",
            color: "form",
            buttonType: "submit"
          })}
          <span class="ml-[2vw] extraSmallText font-mono form-status-msg" data-form-status role="status" aria-live="polite"></span>
        </div>
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-9 gap-[var(--gutter)] mb-[4vw] sm:mb-[1vw] border-t border-formSecondary pt-[6vw] sm:pt-[2vw]">
        <div class="col-span-2 flex justify-center">
          <span class="extraSmallText font-mono">${D.brand.codeTag}</span>
        </div>
        <div class="col-span-2 sm:col-span-3 sm:col-start-4 flex justify-center">
          <span class="extraSmallText font-mono">FIXED PRICE GUARANTEE</span>
        </div>
        <div class="col-span-5 sm:col-span-3 sm:col-start-7 flex justify-start ml-[3vw] sm:ml-0 sm:justify-center">
          <span class="extraSmallText font-mono">${D.brand.websiteDisplay}</span>
        </div>
      </div>
    </form>`;
  }

  // Exact Storey CoreContact Section
  function coreContactSection(formIdPrefix = "page") {
    return `<div class="w-full h-fit bg-primary text-secondary mt-[20vw]" data-core-contact>
      <div class="layout-grid">
        <div class="col-span-7">
          <div>
            <span class="largeText font-medium">Start a conversation about your project, vision or future space.</span>
          </div>
          <div class="grid grid-cols-7 gap-[var(--gutter)]">
            <div class="col-span-3 mt-[10vw] sm:block hidden">
              ${appearText(
                "Whether you are planning a luxury bathroom remodel, custom chef’s kitchen, or whole-home renovation in Dallas–Fort Worth, schedule your free consultation today and let us bring your dream home to life."
              )}
            </div>
          </div>
        </div>
        <div class="col-span-9 sm:col-start-4 -mt-[40vw]" data-contact-form-parallax>
          ${displayContactForm(formIdPrefix)}
        </div>
      </div>
      <div class="w-full h-[20vw] bg-secondary sm:block hidden" data-nav-theme="light"></div>
    </div>`;
  }

  // Interactive Before & After Comparison Card
  function beforeAfterCard({ before, after, label, projectTitle, slug }) {
    return `<div class="col-span-6 space-y-[1vw]">
      <div class="w-full aspect-[16/12] ba-slider-container" data-ba-slider>
        <img src="${after}" alt="${projectTitle} After Remodel" class="w-full h-full object-cover saturate-150" />
        <div class="ba-slider-before" data-ba-before style="clip-path: inset(0 50% 0 0);">
          <img src="${before}" alt="${projectTitle} Before Remodel" class="w-full h-full object-cover" />
        </div>
        <input type="range" min="0" max="100" value="50" aria-label="Compare Before and After for ${projectTitle}" class="ba-range-input" data-ba-range />
        <div class="ba-slider-handle" data-ba-handle style="left: 50%;">
          <div class="ba-slider-knob">
            <span>BEFORE</span>
            <span>/</span>
            <span>AFTER</span>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-between pt-[0.5vw] items-end">
        <div>
          <span class="smallText block">${projectTitle}</span>
          <span class="extraSmallText font-mono opacity-60">${label}</span>
        </div>
        ${buttonMainAnimated({
          text: "Explore",
          size: "small",
          color: "dark",
          href: `#/projects/${slug}`
        })}
      </div>
    </div>`;
  }

  // Exact Storey CoreFooter
  function coreFooter() {
    const footerLink = (label, href, external = false) => `
      <li class="w-fit">
        <a href="${href}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <div class="group cursor-pointer">
            <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out">
              <span>${label}</span>
            </div>
            <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out origin-right group-hover:origin-left group-hover:scale-x-100 scale-x-0"></div>
          </div>
        </a>
      </li>`;

    return `<div class="w-full bg-secondary text-primary pt-[10vw] relative" data-core-footer data-nav-theme="light">
      <div class="layout-grid relative z-10 bg-secondary">
        <div class="col-span-6 mb-[10vw] sm:mb-0">
          <div class="sm:space-y-[4vw] space-y-[10vw]">
            <div class="grid grid-cols-6 gap-[10vw] sm:gap-[var(--gutter)]">
              <div class="col-span-6 sm:col-span-3">
                <div class="mb-[3vw] sm:mb-[1vw]">
                  <span class="mediumText">Site index</span>
                </div>
                <ul class="extraSmallText space-y-[1.5vw] sm:space-y-[0.5vw]">
                  ${footerLink("Home", "#/")}
                  ${footerLink("Projects", "#/projects")}
                  ${footerLink("Studio & Services", "#/studio")}
                  ${footerLink("Journal", "#/journal")}
                  ${footerLink("FAQ", "#/faq")}
                </ul>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="mb-[3vw] sm:mb-[1vw]">
                  <span class="mediumText">Specialties</span>
                </div>
                <ul class="extraSmallText space-y-[1.5vw] sm:space-y-[0.5vw]">
                  ${footerLink("Bathroom Remodeling", "#/projects/highland-park-spa-bathroom")}
                  ${footerLink("Kitchen Remodeling", "#/projects/preston-hollow-chef-kitchen")}
                  ${footerLink("Living Spaces Reimagined", "#/projects/uptown-dallas-open-living")}
                  ${footerLink("Investor Renovations", "#/projects/frisco-turnkey-investor-renovation")}
                </ul>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-[10vw] sm:gap-[var(--gutter)]">
              <div class="col-span-6 sm:col-span-3">
                <div class="mb-[3vw] sm:mb-[1vw]">
                  <span class="mediumText">Get in touch</span>
                </div>
                <ul class="extraSmallText space-y-[1.5vw] sm:space-y-[0.5vw]">
                  ${footerLink(D.brand.email, `mailto:${D.brand.email}`)}
                  ${footerLink(D.brand.phoneDisplay, D.brand.phoneHref)}
                  ${footerLink(D.brand.serviceArea, "https://www.google.com/maps/place/Dallas,+TX", true)}
                  ${footerLink("Instagram", D.brand.socials.instagram, true)}
                  ${footerLink("Facebook", D.brand.socials.facebook, true)}
                  ${footerLink("LinkedIn", D.brand.socials.linkedin, true)}
                </ul>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <a href="#/" class="flex sm:gap-[0.55vw] gap-[2vw] items-center cursor-pointer w-fit">
                  <div class="w-[7.5vw] sm:w-[2.1vw] h-auto">${brandLogoSvg()}</div>
                  <span class="mediumText">${D.brand.name}</span>
                </a>
                <p class="extraSmallText font-mono opacity-60 mt-[1.5vw]">© Elite Home Creations. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6 -ml-[var(--gutter)] sm:-ml-0 -mr-[var(--gutter)] relative">
          <div class="w-full aspect-[16/10] relative">
            <div class="w-fit h-fit absolute top-0 left-0 z-20">
              <div class="absolute top-0 left-0 w-fit h-fit z-20">
                <img src="images/misc/clip.png" alt="" aria-hidden="true" draggable="false" class="w-[5vw] h-auto object-cover translate-y-[-70%]" />
              </div>
              <div class="w-[18vw] h-[19vw] rotate-[4deg] origin-top-left">
                ${displayNoteNoPaperclip()}
              </div>
            </div>
            ${styleImage({
              src: "Transform_Your_Home_with_Luxury_Remodeling_Services_in_Dallas_TX.jpg",
              alt: "Elite Home Creations DFW Luxury Remodeling Footer"
            })}
          </div>
        </div>
      </div>

      <div class="w-full h-[20vw] sticky bottom-0 bg-primary z-0 overflow-y-clip">
        <div class="absolute bottom-0 right-0 pointer-events-auto z-10">
          <a href="#/studio" aria-label="Elite Home Creations DFW" class="text-secondary" data-v-513595c9 data-credit-widget>
            <div class="credit" data-v-513595c9 data-credit-container>
              <div class="credit__text" data-v-513595c9>
                <div class="credit__text-inner" data-v-513595c9 data-credit-text>
                  <span class="font-mono extraSmallText text-secondary whitespace-nowrap pr-[0.5vw]">ELITE HOME CREATIONS DFW</span>
                </div>
              </div>
              <div class="credit__glass" data-v-513595c9>
                <div class="credit__glass-inner" data-v-513595c9 data-credit-glass>
                  <svg viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-v-513595c9>
                    <path d="M13.5 11.1229L0 0H27L13.5 11.1229Z" fill="currentColor" data-v-513595c9></path>
                    <path d="M13.5 15.9632L20.2581 20H6.74186L13.5 15.9632Z" fill="currentColor" data-v-513595c9></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="relative w-full h-full translate-y-[100%]" data-lower-footer>
          <div class="w-full h-[25%] z-10 -translate-y-[15%] relative bg-gradient-to-b from-secondary/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 z-0">
            <div class="translate-y-1/3 -translate-x-1/4">
              ${displayLogo({ scale: 3, color: "secondary" })}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // =========================================================================
  // VIEW 1: LANDING / HOME VIEW (100% Storey Architecture Structure)
  // =========================================================================
  function renderHomeView() {
    const heroImagesHtml = D.heroSlides
      .map(
        (s, i) => `
      <div class="w-full h-full absolute top-0 left-0 ${
        i === 0 ? "" : "scale-[1.05] opacity-0"
      }" data-hero-slide-img="${i}">
        <img src="${s.image}" alt="${s.alt}" ${
          i === 0 ? 'fetchpriority="high" loading="eager"' : ""
        } class="w-full h-full object-cover opacity-[0.85] saturate-150" />
      </div>`
      )
      .join("");

    const heroBarsHtml = D.heroSlides
      .map(
        (s, i) => `
      <div class="${
        i === 0 ? "w-1/2" : "w-1/6"
      } py-[var(--gutter)] cursor-pointer" data-hero-bar-wrap="${i}" role="tab" tabindex="0" aria-label="Hero Slide ${
          i + 1
        }">
        <div class="w-full h-[3px] bg-primary/30 opacity-0 project-slider-progress-line">
          <div class="w-full scale-x-0 origin-left h-full bg-primary" data-hero-bar-fill="${i}"></div>
        </div>
      </div>`
      )
      .join("");

    const servicesCardsHtml = D.services
      .map(
        (srv, idx) => `
      <!-- Desktop Service Card -->
      <div class="hidden sm:block">
        <div class="w-full h-fit border-t border-[#BFBFBF] flex flex-col gap-[10vw] bg-primary relative" data-service-card-desktop>
          ${
            idx === 0
              ? `<div class="w-fit h-fit absolute right-0 top-0 text-secondary z-30 group">
              <div>
                <img src="images/misc/ruler.png" alt="" aria-hidden="true" draggable="false" class="w-[3.5vw] h-auto translate-x-[90%] translate-y-[-10%] group-hover:rotate-[-8deg] transition-transform duration-500 ease-in-out rotate-[-6deg] origin-bottom saturate-0" />
              </div>
              <div class="w-fit h-fit absolute top-0 left-0">
                <img src="images/misc/pencil.png" alt="" aria-hidden="true" draggable="false" class="w-[3.5vw] h-auto translate-x-[90%] group-hover:rotate-[-15deg] rotate-[-10deg] transition-transform duration-300 ease-in-out translate-y-[20%] origin-bottom" />
              </div>
            </div>`
              : ""
          }
          <div class="w-full h-full absolute top-0 left-0 bg-secondary z-20 opacity-0 pointer-events-none" data-service-card-cover></div>
          <div class="layout-grid w-full pt-[var(--gutter)]">
            <div class="col-span-3">
              <a href="#/projects/${srv.slug}" class="mediumText hover:underline">${srv.service}</a>
            </div>
            <div class="col-span-5 col-start-7">
              ${appearText(srv.description)}
            </div>
          </div>
          <div class="layout-grid w-full pt-[var(--gutter)] pb-[4vw]">
            <div class="col-span-3 self-end">
              <span class="text-[15vw] font-mono text-[#E6E6E6]">${srv.index}</span>
            </div>
            <div class="col-span-3 col-start-7">
              <a href="#/projects/${srv.slug}" class="block w-full aspect-[5/3]">
                ${hoveringAction({
                  text: "Explore Service",
                  contentHtml: styleImage({ src: srv.image, alt: srv.service })
                })}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile Service Card -->
      <div class="block sm:hidden">
        <div class="w-full h-fit border-t border-[#BFBFBF] flex flex-col gap-[10vw]">
          <div class="layout-grid mb-[10vw] mt-[var(--gutter)]">
            <div class="col-span-1 self-end">
              <span class="mediumText font-mono">${srv.index}</span>
            </div>
            <div class="col-span-5">
              <a href="#/projects/${srv.slug}" class="mediumText font-medium">${srv.service}</a>
            </div>
          </div>
          <div class="layout-grid">
            <div class="col-span-5 col-start-2">
              <span class="smallText">${srv.description}</span>
            </div>
          </div>
          <div class="layout-grid mb-[5vw]">
            <div class="col-span-5 col-start-2">
              <a href="#/projects/${srv.slug}" class="block w-full aspect-[2/1]">
                <img src="${srv.image}" alt="${srv.service}" class="w-full h-full object-cover" />
              </a>
            </div>
          </div>
        </div>
      </div>`
      )
      .join("");

    // Testimonials Section
    const testImagesHtml = D.testimonials
      .map(
        (t, i) => `
      <div class="w-full h-full absolute top-0 left-0 ${
        i === 0 ? "" : "scale-[1.05] opacity-0"
      }" data-test-img="${i}">
        <img src="${t.image}" alt="${t.imageAlt}" class="w-full h-full object-cover saturate-150" />
      </div>`
      )
      .join("");

    const testThumbsHtml = D.testimonials
      .map(
        (t, i) => `
      <div class="w-full h-full absolute top-0 left-0 ${
        i === 0 ? "" : "scale-[1.05] opacity-0"
      }" data-test-thumb="${i}">
        <img src="${t.thumb}" alt="${t.author}" class="w-full h-full object-cover grayscale" />
      </div>`
      )
      .join("");

    const testBarsHtml = D.testimonials
      .map(
        (t, i) => `
      <div class="cursor-pointer py-[var(--gutter)] ${
        i === 0 ? "w-1/2" : "w-1/6"
      }" data-test-bar-wrap="${i}" role="tab" tabindex="0" aria-label="Testimonial from ${t.author}">
        <div class="w-full h-[3px] bg-primary/30">
          <div class="w-full scale-x-0 origin-left h-full bg-primary" data-test-bar-fill="${i}"></div>
        </div>
      </div>`
      )
      .join("");

    const j0 = D.journals[0];
    const j1 = D.journals[1];
    const j2 = D.journals[2];
    const j3 = D.journals[3];

    return `
      <!-- 1. LANDING HERO -->
      <div class="w-full h-[110svh] relative bg-secondary opacity-0" data-landing-hero data-nav-theme="light">
        <div class="w-full h-full absolute top-0 left-0 bg-black" data-hero-parallax>
          <div class="w-full h-full scale-[1.1] opacity-0 will-change-transform will-change-opacity" data-hero-img-element>
            <div class="w-full h-full relative">
              ${heroImagesHtml}
            </div>
          </div>
        </div>
        <div class="layout-grid w-full h-[100svh] relative pt-[4.5vw] sm:py-[1.5vw] grid-rows-[auto_1fr] text-primary">
          <div class="col-span-5 sm:col-span-6 opacity-0" data-hero-top-item>
            <a href="#/" class="flex w-fit sm:gap-[0.55vw] gap-[2vw] items-center cursor-pointer">
              <div class="w-[7.5vw] sm:w-[2.1vw] h-auto">${brandLogoSvg()}</div>
              <span class="mediumText">${D.brand.name}</span>
            </a>
          </div>
          <div class="sm:hidden block col-span-1" data-action="open-mobile-menu">
            <div class="mediumText flex w-full justify-end cursor-pointer">Menu</div>
          </div>
          <div class="col-span-6 sm:flex justify-between items-center extraSmallText hidden opacity-0" data-hero-top-item>
            <div class="flex">
              <a href="#/projects" class="pr-[1vw] h-fit" data-directional-link>
                <div class="group cursor-pointer">
                  <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out"><span>Projects</span></div>
                  <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out" data-directional-bar style="transform-origin:right;transform:scaleX(0);"></div>
                </div>
              </a>
              <a href="#/studio" class="pr-[1vw] h-fit" data-directional-link>
                <div class="group cursor-pointer">
                  <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out"><span>Studio</span></div>
                  <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out" data-directional-bar style="transform-origin:right;transform:scaleX(0);"></div>
                </div>
              </a>
              <a href="#/journal" class="pr-[1vw] h-fit" data-directional-link>
                <div class="group cursor-pointer">
                  <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out"><span>Journal</span></div>
                  <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out" data-directional-bar style="transform-origin:right;transform:scaleX(0);"></div>
                </div>
              </a>
              <a href="#/faq" class="pr-[1vw] h-fit" data-directional-link>
                <div class="group cursor-pointer">
                  <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out"><span>FAQ</span></div>
                  <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out" data-directional-bar style="transform-origin:right;transform:scaleX(0);"></div>
                </div>
              </a>
              <a href="${D.brand.phoneHref}" class="pr-[1vw] h-fit font-mono" data-directional-link>
                <div class="group cursor-pointer">
                  <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out"><span>${D.brand.phoneDisplay}</span></div>
                  <div class="w-full h-[max(0.1vw,1px)] bg-current transition-transform duration-300 ease-in-out" data-directional-bar style="transform-origin:right;transform:scaleX(0);"></div>
                </div>
              </a>
            </div>
            ${buttonMainAnimated({
              text: "Free Quote",
              size: "small",
              color: "dark",
              action: "open-contact-modal"
            })}
          </div>

          <div class="col-span-6 row-start-2 self-end flex flex-col">
            <div class="flex w-full gap-[var(--gutter)]" role="tablist" aria-label="Hero Project Slides">
              ${heroBarsHtml}
            </div>
            <div class="grid grid-cols-6 gap-[var(--gutter)] items-end">
              <div class="col-span-6 sm:col-span-3">
                <span class="relative overflow-y-hidden inline-block max-w-full" data-v-30d30ebe>
                  <span class="inline-block max-w-full" data-v-30d30ebe data-hero-statement-wrap>
                    <span class="smallText" data-hero-statement>${D.heroSlides[0].statement}</span>
                  </span>
                </span>
              </div>
              <div class="col-span-6 sm:col-span-3 flex sm:justify-end opacity-0 pb-[var(--gutter)] sm:pb-0" id="project-slider-cta-button">
                ${buttonMainAnimated({
                  text: "View Projects",
                  size: "large",
                  color: "light",
                  href: "#/projects"
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. LANDING INTRO + 3D INTERACTIVE SPINNER -->
      <div class="w-full h-[110svh] sm:h-[120svh] overflow-y-clip bg-secondary text-primary relative flex flex-col" id="intro-section-container" data-nav-theme="light">
        <div class="bg-gradient-to-b from-transparent to-secondary w-full h-[40%] absolute bottom-0 left-0 z-10 pointer-events-none"></div>
        <div class="layout-grid sm:py-0 py-[10vw]">
          <div class="col-span-6 hidden sm:block">
            <div class="-ml-[var(--gutter)] -mt-[var(--gutter)]">
              ${displayLogo({ scale: 1.2, color: "primary" })}
            </div>
          </div>
          <div class="col-span-6">
            <div class="flex sm:flex-row flex-col gap-[10vw] sm:gap-[1.3889vw] mt-[2vw]">
              <div class="sm:w-1/2">
                ${appearText(D.introCopy.col1)}
              </div>
              <div class="sm:w-1/2">
                ${appearText(D.introCopy.col2, { delay: 0.1 })}
              </div>
            </div>
          </div>
        </div>
        <div class="w-fit h-fit absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-3/4">
          ${displayLogoSpinner({ id: "intro-logo-spinner", interactive: true })}
        </div>
        <div class="sticky inset-x-0 bottom-0 z-10 mt-auto pointer-events-none hidden sm:block">
          <div class="layout-grid">
            <div class="col-span-3 col-start-10 mb-[var(--gutter)]">
              <div class="w-full h-[20vw] bg-[#FEFEFE] flex flex-col mt-[var(--gutter)] relative translate-y-[120%]" data-spinner-explainer>
                <div class="w-full h-full absolute top-0 left-0 mix-blend-multiply overflow-hidden">
                  <img src="images/misc/paper.webp" alt="" aria-hidden="true" class="w-[300%] h-[300%] object-cover opacity-[0.5]" />
                </div>
                <div class="w-full h-full px-[0.8vw] pt-[0.8vw] pb-[1.2vw]">
                  <div class="w-full h-full bg-secondary">
                    <img src="gifs/explainer.gif" alt="Tutorial" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="w-full text-center mb-[2vw]">
                  <span class="font-mono text-secondary extraSmallText uppercase underline underline-offset-[0.5vw]">Hover + click to visit projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. OUR AREAS OF EXPERTISE (SERVICES) -->
      <div class="w-full h-fit min-h-[100svh] bg-primary text-secondary relative overflow-y-clip" data-services-section data-nav-theme="dark" data-activate-nav="true">
        <div class="w-full h-fit layout-grid sm:mt-[3vw] mt-[8vw] mb-[30vw] sm:mb-[20vw]">
          <div class="col-span-8">
            <span class="largeText font-medium">Our areas of expertise</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:mt-[2.5vw] mt-[8vw]">
            ${appearText(
              "Elite Home Creations works across custom bathroom remodeling, luxury chef’s kitchens, and whole-home living space transformations in Dallas–Fort Worth, creating spaces that feel considered from every angle."
            )}
          </div>
        </div>
        ${servicesCardsHtml}
        <div class="w-fit h-fit absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-[60%] hidden sm:block" data-services-bottom-logo>
          ${displayLogo({ scale: 3, color: "secondary" })}
        </div>
      </div>

      <!-- 4. LANDING PROJECTS PARALLAX CTA BANNER -->
      <div class="w-full h-[160svh] min-h-[100vw] bg-secondary relative text-primary overflow-y-clip" data-projects-cta data-nav-theme="light">
        <div class="w-full h-[110svh] min-h-[50vw] relative z-10 flex flex-col gap-[15vw] sm:gap-[7vw] items-center justify-center">
          <div class="w-[80vw] sm:w-[50vw] text-center pt-[15vw]">
            <span class="extraLargeText font-medium">We shape space into purpose</span>
          </div>
          <div>
            ${buttonMainAnimated({
              text: "Explore studio",
              size: "large",
              color: "light",
              href: "#/studio"
            })}
          </div>
        </div>
        <div class="w-full h-[50svh] min-h-[30vw] relative z-10 flex items-center justify-center">
          <div class="w-full layout-grid space-y-[10vw] sm:space-y-0">
            <div class="col-span-6 sm:col-span-3 sm:col-start-7 col-start-3">
              ${appearText(
                "Home remodeling should enhance the experience of everyday living while maximizing market value. We create Dallas homes that feel open, grounded, and tailored to your lifestyle."
              )}
            </div>
            <div class="col-span-6 sm:col-span-3 col-start-3">
              ${appearText(
                "Through personalized design, certified installers, and our Fixed Price Guarantee, each renovation balances simplicity, warmth, and lasting durability.",
                { delay: 0.1 }
              )}
            </div>
          </div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full overflow-y-clip scale-[1.2]" data-projects-cta-img>
          <img src="home_banner.jpg" alt="Elite Home Creations DFW Remodeling" class="w-full h-full object-cover opacity-90 saturate-[1.2]" />
        </div>
      </div>

      <!-- 5. LANDING PROJECT PREVIEW + INTERACTIVE PAPERCLIPPED NOTE -->
      <div class="w-full h-fit bg-primary py-[var(--margin)] relative z-10" data-nav-theme="dark">
        <div class="w-full h-fit layout-grid relative space-y-[var(--margin)] sm:space-y-0">
          <a href="#/projects/${D.projects[0].slug}" class="col-span-6 h-[100vw] sm:h-[70vw] bg-secondary">
            ${hoveringAction({
              text: "Explore Project",
              contentHtml: styleImage({
                src: D.projects[0].thumbnailImage.url,
                alt: D.projects[0].thumbnailImage.alt
              })
            })}
          </a>
          <a href="#/projects/${D.projects[1].slug}" class="col-span-6 h-[80vw] sm:h-[40vw] bg-secondary">
            ${hoveringAction({
              text: "Explore Project",
              contentHtml: styleImage({
                src: D.projects[1].thumbnailImage.url,
                alt: D.projects[1].thumbnailImage.alt
              })
            })}
          </a>
        </div>
        <div class="w-full layout-grid mt-[30vw]">
          <div class="col-span-6 h-fit hidden sm:block">
            <div class="h-[24vw] w-[22vw] ml-[3vw]">
              ${displayNote()}
            </div>
          </div>
          <div class="col-span-6 space-y-[var(--margin)]">
            <a href="#/projects/${D.projects[2].slug}" class="block w-full h-[70vw] sm:h-[40vw]">
              ${hoveringAction({
                text: "Explore Project",
                contentHtml: styleImage({
                  src: D.projects[2].thumbnailImage.url,
                  alt: D.projects[2].thumbnailImage.alt,
                  extraImgClass: "saturate-200"
                })
              })}
            </a>
          </div>
        </div>
      </div>

      <!-- 6. CLIENT TESTIMONIALS SLIDER + BACKGROUND SPINNER -->
      <div class="w-full h-fit bg-secondary text-primary py-[30%] relative overflow-y-clip will-change-transform -mt-[25%]" data-testimonials-section data-nav-theme="light">
        <div class="w-full layout-grid z-10 relative">
          <div class="col-span-6 sm:mb-0 mb-[50vw]">
            <div class="w-full aspect-[16/12] bg-secondary relative overflow-hidden" data-style-image data-scale="true">
              <div class="w-full h-full scale-[1.2] origin-bottom" data-image-parallax>
                ${testImagesHtml}
              </div>
              <div class="w-full h-full absolute top-0 left-0 bg-secondary z-10" data-image-overlay></div>
            </div>
            <div class="flex w-full gap-[var(--gutter)]" role="tablist" aria-label="Client Testimonials">
              ${testBarsHtml}
            </div>
            <div class="grid grid-cols-6 gap-[var(--gutter)] items-end">
              <div class="col-span-3 relative">
                <span class="smallText block" data-test-copy>${D.testimonials[0].copy}</span>
              </div>
              <div class="col-span-3 self-start">
                <div class="grid grid-cols-3 gap-[var(--gutter)]">
                  <div class="col-span-1 flex justify-end">
                    <div class="sm:w-2/3 w-full aspect-square overflow-hidden bg-secondary relative">
                      ${testThumbsHtml}
                    </div>
                  </div>
                  <div class="col-span-2 opacity-80 space-y-[0.25vw]">
                    <div>
                      <span class="text-[2.5vw] sm:text-[1.1vw] whitespace-nowrap" data-test-author>${D.testimonials[0].author}</span>
                    </div>
                    <div>
                      <span class="text-[2.5vw] sm:text-[1.1vw] font-mono pr-[2vw] block" data-test-company>${D.testimonials[0].company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-6 -mt-[5vw]">
            <div class="grid grid-cols-6 gap-[var(--gutter)]">
              <div class="sm:col-span-3 col-span-6">
                ${appearText(
                  "We collaborate closely with Dallas homeowners, real estate investors, first-time buyers, and empty nesters to ensure every bathroom, kitchen, and living space is resolved with precision from concept through completion."
                )}
              </div>
              <div class="sm:col-span-3 col-span-6">
                ${appearText(
                  "Our process prioritises transparent communication, a Fixed Price Guarantee, and certified installation—delivering timeless interiors that elevate daily routines and command top market value.",
                  { delay: 0.1 }
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="w-fit h-fit absolute bottom-0 sm:translate-y-[45%] left-1/2 -translate-x-3/4 z-0 opacity-25">
          ${displayLogoSpinner({ id: "background-logo-spinner", interactive: false })}
        </div>
      </div>

      <!-- 7. JOURNAL / REMODELING GUIDES (LANDING BLOGS) -->
      <div class="w-full h-fit bg-primary text-secondary relative overflow-y-clip py-[var(--gutter)]" data-nav-theme="dark">
        <div class="w-full layout-grid">
          <div class="col-span-7">
            <span class="largeText font-medium">Spaces Shaped Through Intention</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-9 space-y-[3vw] mt-[5vw] sm:mt-0">
            <div class="mt-[2vw]">
              ${appearText(
                "Remodeling guides, lighting & color studies, and residential renovation insights exploring how custom kitchens, spa bathrooms, and living spaces create calmer, higher-value homes in Dallas."
              )}
            </div>
            ${buttonMainAnimated({
              text: "View Posts",
              size: "small",
              color: "dark",
              href: "#/journal"
            })}
          </div>
        </div>

        <div class="layout-grid mt-[15vw] space-y-[30vw] sm:space-y-0">
          <div class="col-span-6 cursor-pointer h-fit">
            ${displayCard({
              title: j0.title,
              imageSrc: j0.coverImage.url,
              imageAlt: j0.coverImage.alt,
              aspectRatio: "1/1",
              href: `#/journal/${j0.slug}`
            })}
          </div>
          <div class="col-span-6 cursor-pointer h-fit">
            ${displayCard({
              title: j1.title,
              imageSrc: j1.coverImage.url,
              imageAlt: j1.coverImage.alt,
              aspectRatio: "16/12",
              href: `#/journal/${j1.slug}`
            })}
          </div>
        </div>

        <div class="w-full h-fit relative hidden sm:block">
          <div class="w-fit h-fit absolute left-0 top-0 text-secondary z-30 group">
            <div class="w-fit h-fit absolute top-0 left-0">
              <img src="images/misc/pencil.png" alt="" aria-hidden="true" draggable="false" class="w-[3.5vw] h-auto translate-x-[-110%] group-hover:rotate-[9deg] rotate-[7deg] transition-transform duration-500 ease-in-out translate-y-[10%] origin-bottom" />
            </div>
            <div>
              <img src="images/misc/rubber.png" alt="" aria-hidden="true" draggable="false" class="w-[7.5vw] h-auto translate-x-[-115%] translate-y-[600%] group-hover:rotate-[115deg] transition-transform duration-300 ease-in-out rotate-[105deg] origin-right" />
            </div>
          </div>
        </div>

        <div class="layout-grid mt-[30vw] sm:mt-[15vw] space-y-[30vw] sm:space-y-0">
          <div class="col-span-6 cursor-pointer h-fit">
            ${displayCard({
              title: j2.title,
              imageSrc: j2.coverImage.url,
              imageAlt: j2.coverImage.alt,
              aspectRatio: "16/12",
              href: `#/journal/${j2.slug}`
            })}
          </div>
          <div class="col-span-6 cursor-pointer h-fit">
            ${displayCard({
              title: j3.title,
              imageSrc: j3.coverImage.url,
              imageAlt: j3.coverImage.alt,
              aspectRatio: "12/14",
              href: `#/journal/${j3.slug}`
            })}
          </div>
        </div>
      </div>

      <!-- 8. CORE CONTACT INTAKE + 9. CORE FOOTER -->
      ${coreContactSection("home")}
      ${coreFooter()}
    `;
  }

  // =========================================================================
  // VIEW 2: PROJECTS INDEX VIEW (/projects) + BEFORE & AFTER TRANSFORMATIONS
  // =========================================================================
  function renderProjectsView() {
    const p = D.projects;
    const beforeAfterHtml = p
      .slice(0, 4)
      .map((proj) =>
        beforeAfterCard({
          before: proj.beforeAfter.before,
          after: proj.beforeAfter.after,
          label: proj.beforeAfter.label,
          projectTitle: proj.title,
          slug: proj.slug
        })
      )
      .join("");

    return `
      <div class="h-fit bg-primary" data-nav-theme="dark" data-activate-nav="true">
        <div class="w-full h-fit bg-primary layout-grid pt-[20vw]">
          <div class="col-span-6">
            <span class="largeText font-medium">Built around living</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-9 mt-[10vw] sm:mt-[2vw]">
            ${appearText(
              "A selection of custom bathroom, chef’s kitchen, and whole-home remodeling projects across the Dallas/Fort Worth area, shaped through superior materials, spatial clarity, and certified craftsmanship.",
              { delay: 0.3 }
            )}
          </div>
        </div>

        <!-- Storey Asymmetric Row 1 (col-6, col-3, col-3) -->
        <div class="w-full h-fit layout-grid mt-[20vw] space-y-[10vw] sm:space-y-0">
          <div class="col-span-6">
            ${displayCard({
              title: p[0].title,
              imageSrc: p[0].thumbnailImage.url,
              imageAlt: p[0].thumbnailImage.alt,
              aspectRatio: "12/14",
              actionText: "Explore",
              hoverActionText: "Explore Project",
              footerGap: "2vw",
              href: `#/projects/${p[0].slug}`
            })}
          </div>
          <div class="col-span-6 sm:col-span-3 h-fit">
            ${displayCard({
              title: p[1].title,
              imageSrc: p[1].thumbnailImage.url,
              imageAlt: p[1].thumbnailImage.alt,
              aspectRatio: "12/14",
              actionText: "Explore",
              hoverActionText: "Explore Project",
              footerGap: "2vw",
              href: `#/projects/${p[1].slug}`
            })}
          </div>
          <div class="col-span-6 sm:col-span-3 h-fit">
            ${displayCard({
              title: p[2].title,
              imageSrc: p[2].thumbnailImage.url,
              imageAlt: p[2].thumbnailImage.alt,
              aspectRatio: "12/14",
              actionText: "Explore",
              hoverActionText: "Explore Project",
              footerGap: "2vw",
              href: `#/projects/${p[2].slug}`
            })}
          </div>
        </div>

        <!-- Storey Row 2 (col-6 14/10, col-6 1/1) -->
        <div class="w-full h-fit layout-grid mt-[15vw] space-y-[10vw] sm:space-y-0">
          <div class="col-span-6 h-fit">
            ${displayCard({
              title: p[3].title,
              imageSrc: p[3].thumbnailImage.url,
              imageAlt: p[3].thumbnailImage.alt,
              aspectRatio: "14/10",
              actionText: "Explore",
              hoverActionText: "Explore Project",
              footerGap: "2vw",
              href: `#/projects/${p[3].slug}`
            })}
          </div>
          <div class="col-span-6 h-fit">
            ${displayCard({
              title: p[4].title,
              imageSrc: p[4].thumbnailImage.url,
              imageAlt: p[4].thumbnailImage.alt,
              aspectRatio: "1/1",
              actionText: "Explore",
              hoverActionText: "Explore Project",
              footerGap: "2vw",
              href: `#/projects/${p[4].slug}`
            })}
          </div>
        </div>

        <!-- Interactive Before & After Transformations Section -->
        <div class="w-full h-fit layout-grid mt-[20vw]">
          <div class="col-span-7">
            <span class="largeText font-medium">See the transformation for yourself</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-9 mt-[5vw] sm:mt-[2vw]">
            ${appearText(
              "Drag the comparison handle on any DFW remodeling project below to inspect the before and after transformation across our bathroom, kitchen, and whole-home renovations."
            )}
          </div>
        </div>
        <div class="w-full h-fit layout-grid mt-[10vw] gap-y-[10vw]">
          ${beforeAfterHtml}
        </div>

        ${coreContactSection("projects")}
        ${coreFooter()}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 3: PROJECT DETAIL VIEW (/projects/:slug — matches C9ab8ev8.js)
  // =========================================================================
  function renderProjectDetailView(slug) {
    const project = D.projects.find((p) => p.slug === slug) || D.projects[0];
    const related = D.projects.filter((p) => p.slug !== project.slug).slice(0, 2);
    const halfCols = [0, 1, 6, 7];

    const galleryHtml = project.imagesGallery
      .map((img, idx) => {
        const colClass = halfCols.includes(idx)
          ? "col-span-12 sm:col-span-6"
          : "col-span-12";
        return `<div class="${colClass} h-[110svh] mb-[var(--gutter)]">
          ${styleImage({ src: img.url, alt: img.alt })}
        </div>`;
      })
      .join("");

    return `
      <div class="h-fit bg-primary relative">
        <!-- ProjectsProjectHero (130svh Dark Hero) -->
        <div class="w-full h-[130svh] bg-secondary relative text-primary z-0 overflow-hidden" data-project-hero data-nav-theme="light" data-activate-nav="true">
          <div class="w-full h-fit layout-grid relative z-10 pt-[50svh] sm:pt-[20vw]">
            <div class="col-span-6">
              <div class="space-x-[1vw] mb-[2vw] extraSmallText font-mono">
                <span data-proj-meta>${project.location}</span>
                <span data-proj-meta>· ${project.projectType}</span>
                <span data-proj-meta>· ${project.year}</span>
              </div>
              <div>
                <span class="largeText font-medium" data-proj-meta>${project.title}</span>
              </div>
            </div>
            <div class="sm:col-span-4 sm:col-start-9 col-span-6 pt-[20vw] sm:pt-[2vw]">
              ${appearText(project.description, { delay: 0.4 })}
              <div class="mt-[3vw]">
                ${buttonMainAnimated({
                  text: "Request Free Quote",
                  size: "small",
                  color: "light",
                  action: "open-contact-modal"
                })}
              </div>
            </div>
          </div>
          <div class="absolute top-0 left-0 w-full h-full overflow-y-clip z-0" data-proj-hero-parallax>
            <div class="w-full h-full scale-[1.05]" data-proj-hero-img>
              <img src="${project.thumbnailImage.url}" alt="${project.thumbnailImage.alt}" class="w-full h-full object-cover saturate-150 opacity-80" />
            </div>
          </div>
        </div>

        <!-- Before & After Comparison Feature -->
        <div class="w-full h-fit bg-primary pt-[10vw] pb-[5vw]" data-nav-theme="dark">
          <div class="layout-grid mb-[5vw]">
            <div class="col-span-6">
              <span class="mediumText font-medium">Before & After Comparison</span>
            </div>
            <div class="col-span-6 sm:col-span-4 sm:col-start-9">
              <span class="extraSmallText font-mono">${project.beforeAfter.label} — Drag slider to compare</span>
            </div>
          </div>
          <div class="layout-grid">
            ${beforeAfterCard({
              before: project.beforeAfter.before,
              after: project.beforeAfter.after,
              label: project.beforeAfter.label,
              projectTitle: project.title,
              slug: project.slug
            })}
            <div class="col-span-6 flex flex-col justify-between p-[4vw] bg-secondary text-primary">
              <div class="space-y-[2vw]">
                <span class="font-mono extraSmallText opacity-60">SCOPE & GUARANTEES</span>
                <h2 class="mediumText font-medium">Engineered for Daily Living & Lasting Value</h2>
                <p class="smallText">${project.description}</p>
              </div>
              <div class="grid grid-cols-2 gap-[2vw] pt-[4vw] border-t border-[#2B2B2B] extraSmallText font-mono">
                <div><span>01 / CUSTOM DESIGN</span></div>
                <div><span>02 / FIXED PRICE GUARANTEE</span></div>
                <div><span>03 / CERTIFIED INSTALLERS</span></div>
                <div><span>04 / TIMELY DELIVERY</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ProjectsProjectTable Gallery -->
        <div class="w-full h-fit bg-primary py-[var(--gutter)]" data-nav-theme="dark">
          <div class="w-full layout-grid">
            ${galleryHtml}
          </div>
        </div>

        <!-- Related Projects (JournalProjects) -->
        <div class="layout-grid w-full mt-[20vw]" data-nav-theme="dark">
          <div class="col-span-6">
            <span class="largeText font-medium">Explore more projects like this</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-8 flex flex-col justify-between my-[5vw] sm:my-0">
            <div class="w-full mt-[2vw]">
              ${appearText(
                "Discover additional bathroom, kitchen, and whole-home renovations completed across the Dallas/Fort Worth Metroplex."
              )}
            </div>
            <div class="mt-[5vw] sm:mt-0">
              ${buttonMainAnimated({
                text: "View Projects",
                size: "small",
                color: "dark",
                href: "#/projects"
              })}
            </div>
          </div>
        </div>
        <div class="w-full h-fit layout-grid bg-primary mt-[10vw]">
          <a href="#/projects/${related[0].slug}" class="col-span-6">
            <div class="w-full aspect-[12/16]">
              ${hoveringAction({
                text: "Explore",
                contentHtml: styleImage({
                  src: related[0].thumbnailImage.url,
                  alt: related[0].thumbnailImage.alt
                })
              })}
            </div>
          </a>
          <a href="#/projects/${related[1].slug}" class="col-span-6">
            <div class="w-full aspect-[14/12]">
              ${hoveringAction({
                text: "Explore",
                contentHtml: styleImage({
                  src: related[1].thumbnailImage.url,
                  alt: related[1].thumbnailImage.alt
                })
              })}
            </div>
          </a>
        </div>

        ${coreContactSection("project-detail")}
        ${coreFooter()}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 4: STUDIO / ABOUT & SERVICES VIEW (/studio — matches DiPf60rn.js)
  // =========================================================================
  function renderStudioView() {
    const centralSpinnerCards = Array.from({ length: 8 }, (_, idx) => {
      const deg = idx * 45;
      return `<div class="absolute inset-0" style="transform:rotate(${deg}deg);">
        <div class="absolute left-1/2 -translate-x-1/2 bg-primary opacity-60 sm:opacity-100" style="width:10.692vw;height:9.0072vw;bottom:calc(50% + 35.64vw);"></div>
      </div>`;
    }).join("");

    const sideSpinnerCards = Array.from({ length: 8 }, (_, idx) => {
      const deg = idx * 45;
      return `<div class="absolute inset-0" style="transform:rotate(${deg}deg);">
        <div class="absolute left-1/2 -translate-x-1/2 bg-secondary opacity-10 sm:opacity-10" style="width:10.692vw;height:9.0072vw;bottom:calc(50% + 35.64vw);"></div>
      </div>`;
    }).join("");

    const studioAboutSlides = D.projects.slice(0, 4);
    const studioAboutImgs = studioAboutSlides
      .map(
        (p, i) => `
      <div class="w-full h-full absolute top-0 left-0 ${
        i === 0 ? "" : "scale-[1.05] opacity-0"
      }" data-studio-about-img="${i}">
        <img src="${p.thumbnailImage.url}" alt="${p.title}" class="w-full h-full object-cover saturate-150" />
      </div>`
      )
      .join("");

    const studioAboutBars = studioAboutSlides
      .map(
        (p, i) => `
      <div class="cursor-pointer py-[var(--gutter)] ${
        i === 0 ? "w-1/2" : "w-1/6"
      }" data-studio-about-bar-wrap="${i}" role="tab" tabindex="0" aria-label="Studio Slide ${i + 1}">
        <div class="w-full h-[3px] bg-secondary/30">
          <div class="w-full scale-x-0 origin-left h-full bg-secondary" data-studio-about-bar-fill="${i}"></div>
        </div>
      </div>`
      )
      .join("");

    const principlesHtml = D.studioPrinciples
      .map(
        (pr) => `
      <div class="hidden sm:block">
        <div class="w-full h-fit border-t border-[#2B2B2B] flex flex-col gap-[1vw] bg-secondary relative" data-service-card-desktop>
          <div class="w-full h-full absolute top-0 left-0 bg-secondary z-20 opacity-0 pointer-events-none" data-service-card-cover></div>
          <div class="layout-grid w-full pt-[var(--gutter)]">
            <div class="col-span-3"><span class="mediumText">${pr.principle}</span></div>
            <div class="col-span-5 col-start-7">${appearText(pr.description)}</div>
          </div>
          <div class="layout-grid w-full pt-[var(--gutter)] pb-[4vw]">
            <div class="col-span-3 self-end"><span class="text-[15vw] font-mono text-[#ffffff]">${pr.index}</span></div>
          </div>
        </div>
      </div>
      <div class="block sm:hidden">
        <div class="w-full h-fit border-t border-[#2B2B2B] flex flex-col gap-[10vw]">
          <div class="layout-grid mb-[10vw] mt-[var(--gutter)]">
            <div class="col-span-1 self-end"><span class="mediumText font-mono">${pr.index}</span></div>
            <div class="col-span-5"><span class="mediumText font-medium">${pr.principle}</span></div>
          </div>
          <div class="layout-grid">
            <div class="col-span-5 col-start-2 mb-[5vw]"><span class="smallText">${pr.description}</span></div>
          </div>
        </div>
      </div>`
      )
      .join("");

    // Practice Areas Tabs
    const practiceImgs = D.practiceAreas
      .map(
        (pa, i) => `
      <div class="w-full h-full absolute top-0 left-0 ${
        i === 0 ? "" : "scale-[1.05] opacity-0"
      }" data-practice-img="${i}">
        <img src="${pa.image}" alt="${pa.imageAlt}" class="w-full h-full object-cover saturate-150" />
      </div>`
      )
      .join("");

    const practiceBars = D.practiceAreas
      .map(
        (pa, i) => `
      <div class="cursor-pointer py-[var(--gutter)] ${
        i === 0 ? "w-1/2" : "w-1/6"
      }" data-practice-bar-wrap="${i}" role="tab" tabindex="0" aria-label="${pa.title}">
        <div class="w-full h-[3px] bg-primary/30">
          <div class="w-full scale-x-0 origin-left h-full bg-primary" data-practice-bar-fill="${i}"></div>
        </div>
      </div>`
      )
      .join("");

    // 9 Client Reviews Grid in StudioTeam Asymmetric 3-per-row Layout
    const reviewsRowsHtml = [0, 3, 6]
      .map((startIdx, rowIdx) => {
        const group = D.allReviews.slice(startIdx, startIdx + 3);
        const isEven = rowIdx % 2 === 0;
        const colsPattern = isEven ? [6, 3, 3] : [3, 3, 6];
        const aspectPattern = isEven
          ? ["aspect-[13/16]", "aspect-[13/16]", "aspect-[13/16]"]
          : ["aspect-[12/16]", "aspect-[12/16]", "aspect-[13/16]"];
        return `<div class="layout-grid mt-[10vw] ${rowIdx === 2 ? "mb-[10vw]" : ""}">
          ${group
            .map((rev, i) => {
              const colCls =
                colsPattern[i] === 6 ? "col-span-6" : "sm:col-span-3 col-span-6";
              return `<div class="${colCls} mt-[10vw] sm:mt-0">
                <div class="w-full bg-secondary ${aspectPattern[i]}">
                  ${styleImage({ src: rev.image, alt: rev.name })}
                </div>
                <div class="w-full flex justify-between items-center gap-[var(--gutter)] pt-[var(--gutter)]">
                  <div class="flex items-center gap-[0.75vw]">
                    <img src="${rev.avatar}" alt="${rev.name}" class="w-[6vw] sm:w-[2vw] aspect-square object-cover grayscale" />
                    <span class="smallText">${rev.name}</span>
                  </div>
                  <div class="text-right">
                    <span class="extraSmallText font-mono opacity-50">${rev.role}</span>
                  </div>
                </div>
                <p class="extraSmallText opacity-75 mt-[0.5vw]">"${rev.quote}"</p>
              </div>`;
            })
            .join("")}
        </div>`;
      })
      .join("");

    return `
      <div class="h-fit bg-primary">
        <!-- 1. STUDIO HERO (170svh with Central 3D Spinner) -->
        <div class="w-full h-[170svh] relative bg-secondary text-primary overflow-y-clip" data-studio-hero data-nav-theme="light" data-activate-nav="true">
          <div class="layout-grid pt-[30vw] sm:pt-[13vw] z-10 relative">
            <div class="col-span-6">
              <div><span class="largeText font-medium">Elite shapes houses into dream homes</span></div>
            </div>
            <div class="sm:col-span-4 sm:col-start-8 col-span-6 col-start-1 mt-[2.5vw]">
              <div>
                ${appearText(
                  "Elite Home Creations is a premier Dallas/Fort Worth remodeling contractor specializing in custom bathrooms, chef’s kitchens, and whole-home living space transformations built with precision.",
                  { delay: 0.45 }
                )}
              </div>
            </div>
          </div>
          <div class="absolute sm:bottom-[35svh] bottom-[10svh] -left-[5%] w-full h-[100svh]" data-studio-spinner-wrap>
            <div class="translate-y-[40%] opacity-0" data-studio-central-spinner>
              <div class="relative" style="width:92.664vw;height:92.664vw;perspective:110.92vw;">
                <div class="size-full [transform-style:preserve-3d]" style="transform:rotate3d(0.27, -1.005, 1.5, 85deg);">
                  <div id="central-logo-spinner-container" class="relative size-full [transform-style:preserve-3d]">
                    <div id="central-logo-spinner" class="relative size-full [transform-style:preserve-3d]">
                      ${centralSpinnerCards}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-[2svh] left-0 w-full h-[50svh] bg-gradient-to-t from-secondary to-transparent z-20"></div>
        </div>

        <!-- 2. STUDIO ABOUT + SLIDER -->
        <div class="w-full h-fit bg-primary relative" data-nav-theme="dark">
          <div class="layout-grid pt-[var(--gutter)]">
            <div class="col-span-6 sm:col-span-7">
              <span class="largeText font-medium">High Quality Home Remodeling in the Dallas/Fort Worth Area.</span>
            </div>
            <div class="col-span-6 sm:col-span-3 sm:col-start-10 mt-[10vw] sm:mt-[5vw]">
              ${appearText(
                "At Elite Home Creations, we specialize in transforming bathrooms, kitchens, and living spaces into stylish, functional, and comfortable spaces tailored to your needs."
              )}
            </div>
          </div>
          <div class="layout-grid mt-[30vw] sm:mt-[20vw] space-y-[30vw] sm:space-y-0">
            <div class="col-span-6 sm:col-span-3 order-2 sm:order-1">
              <div class="w-full aspect-[11/12] bg-black mb-[calc(var(--gutter)*2)]">
                ${styleImage({ src: "About_Us.jpg", alt: "About Elite Home Creations DFW" })}
              </div>
              <div class="mt-[var(--gutter)] flex flex-col gap-[var(--gutter)]">
                ${appearText(
                  "Our team is committed to excellence, ensuring every project reflects our dedication to superior materials, attention to detail, and customer satisfaction.",
                  { block: true }
                )}
                ${appearText(
                  "Whether you’re looking for a modern kitchen upgrade, a luxurious spa-like bathroom retreat, or a turnkey investor renovation, we bring your vision to life with precision and professionalism.",
                  { block: true }
                )}
              </div>
            </div>
            <div class="col-span-6 sm:col-span-6 sm:col-start-7 order-1 sm:order-2">
              <div class="w-full flex flex-col" data-studio-about-slider>
                <a href="#/projects" class="block">
                  ${hoveringAction({
                    text: "Explore",
                    contentHtml: `<div class="w-full aspect-[9/10] bg-black relative overflow-hidden" data-style-image data-scale="true">
                      <div class="w-full h-full scale-[1.2] origin-bottom" data-image-parallax>
                        ${studioAboutImgs}
                      </div>
                      <div class="w-full h-full absolute top-0 left-0 bg-secondary z-10" data-image-overlay></div>
                    </div>`
                  })}
                </a>
                <div class="flex w-full gap-[var(--gutter)]">
                  ${studioAboutBars}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. CORE PRINCIPLES (WHY CHOOSE US) -->
        <div class="w-full h-fit min-h-[100svh] bg-secondary text-primary relative overflow-y-clip" data-nav-theme="light">
          <div class="w-full h-fit layout-grid sm:mt-[5vw] pt-[5vw] mt-[8vw] mb-[30vw] sm:mb-[20vw]">
            <div class="col-span-8"><span class="largeText font-medium">Core Principles</span></div>
            <div class="col-span-6 sm:col-span-4 sm:mt-[2.5vw] mt-[8vw]">
              ${appearText(
                "Four non-negotiable guarantees guide every Dallas–Fort Worth renovation we undertake, protecting your design vision, schedule, and budget."
              )}
            </div>
          </div>
          ${principlesHtml}
        </div>

        <!-- 4. WHO WE SERVE IN DALLAS (STUDIO PROJECTS SHOWCASE) -->
        <div class="w-full h-fit bg-primary relative py-[var(--gutter)]" data-nav-theme="dark">
          <div class="layout-grid pt-[10vw] mb-[10vw]">
            <div class="col-span-6"><span class="largeText font-medium">We work for anyone in Dallas!</span></div>
            <div class="col-span-6 sm:col-span-4 sm:col-start-9 mt-[2vw]">
              ${appearText(
                "From upscale homeowner sanctuaries in Highland Park and Preston Hollow to high-ROI turnkey investor flips and first-time home buyer personalizations across DFW."
              )}
            </div>
          </div>
          <div class="layout-grid">
            <div class="col-span-6">
              <div class="w-full aspect-[14/16]">
                ${styleImage({ src: D.customerSegments[0].image, alt: D.customerSegments[0].title })}
              </div>
              <div class="pt-[1vw] space-y-[0.5vw]">
                <span class="mediumText font-medium block">${D.customerSegments[0].title}</span>
                <p class="smallText">${D.customerSegments[0].copy}</p>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3 sm:col-start-10 mt-[10vw] sm:mt-0">
              <div class="w-full aspect-[12/16]">
                <a href="#/projects/frisco-turnkey-investor-renovation">
                  ${hoveringAction({
                    text: "Explore",
                    contentHtml: styleImage({
                      src: D.customerSegments[1].image,
                      alt: D.customerSegments[1].title
                    })
                  })}
                </a>
              </div>
              <div class="pt-[1vw] space-y-[0.5vw]">
                <span class="mediumText font-medium block">${D.customerSegments[1].title}</span>
                <p class="smallText">${D.customerSegments[1].copy}</p>
              </div>
            </div>
          </div>
          <div class="layout-grid mt-[15vw]">
            <div class="col-span-6 sm:col-span-4">
              <div class="w-full aspect-[14/12]">
                ${styleImage({ src: D.customerSegments[2].image, alt: D.customerSegments[2].title })}
              </div>
              <div class="pt-[1vw] space-y-[0.5vw]">
                <span class="mediumText font-medium block">${D.customerSegments[2].title}</span>
                <p class="smallText">${D.customerSegments[2].copy}</p>
              </div>
            </div>
            <div class="col-span-6 sm:col-start-7 mt-[10vw] sm:mt-0">
              <div class="w-full aspect-[16/14]">
                ${styleImage({ src: D.customerSegments[3].image, alt: D.customerSegments[3].title })}
              </div>
              <div class="pt-[1vw] space-y-[0.5vw]">
                <span class="mediumText font-medium block">${D.customerSegments[3].title}</span>
                <p class="smallText">${D.customerSegments[3].copy}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. OUR PROCESS (STUDIO PROCESS WITH SIDE 3D SPINNER) -->
        <div class="w-full h-fit bg-primary py-[calc(var(--gutter)*4)] relative pb-[15vw] sm:pb-[25vw] z-10" data-studio-process data-nav-theme="dark">
          <div class="layout-grid">
            <div class="col-span-6"><span class="largeText font-medium">Our Process</span></div>
            <div class="col-span-6 sm:col-span-5 sm:col-start-8 mt-[10vw] sm:mt-[2vw]">
              ${appearText(
                "A structured five-stage renovation journey moves your project from free in-home consultation and 3D design to fixed-price permitting and certified installation."
              )}
            </div>
          </div>
          <div class="w-full h-fit absolute top-[20vw] -left-1/2 z-0 pointer-events-none hidden sm:block">
            <div class="relative" style="width:92.664vw;height:92.664vw;perspective:110.92vw;">
              <div class="size-full [transform-style:preserve-3d]" style="transform:rotate3d(0.27, -1.005, 1.5, 85deg);">
                <div id="side-logo-spinner-container" class="relative size-full [transform-style:preserve-3d]">
                  <div id="side-logo-spinner" class="relative size-full [transform-style:preserve-3d]">
                    ${sideSpinnerCards}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="layout-grid mt-[12vw] space-y-[8vw] sm:space-y-[5vw] relative z-10">
            ${D.studioProcess
              .map(
                (step, idx) => `
              <div class="col-span-6 sm:col-span-5 sm:col-start-8 border-t border-[#BFBFBF] pt-[2vw]">
                ${appearText(step, { delay: idx * 0.05 })}
              </div>`
              )
              .join("")}
          </div>
        </div>

        <!-- 6. WHAT OUR CLIENTS SAY (9 DFW CLIENT REVIEWS IN STOREY TEAM GRID) -->
        <div class="w-full h-fit bg-primary text-secondary relative overflow-y-clip z-10 py-[calc(var(--gutter)*4)]" data-nav-theme="dark">
          <div class="layout-grid">
            <div class="col-span-6"><h2 class="largeText font-medium">Client Voices</h2></div>
            <div class="col-span-6 sm:col-span-5 sm:col-start-8 mt-[10vw] sm:mt-[2vw]">
              ${appearText(
                "What Dallas/Fort Worth homeowners and real estate investors say about remodeling their bathrooms, kitchens, and living spaces with Elite Home Creations."
              )}
            </div>
          </div>
          ${reviewsRowsHtml}
        </div>

        <!-- 7. AREAS OF WORK (STUDIO PRACTICE 4-TAB SLIDER) -->
        <div class="w-full h-fit bg-secondary py-[20%] sm:py-[25%] relative text-primary will-change-transform" data-studio-practice data-nav-theme="light">
          <div class="layout-grid">
            <div class="col-span-6"><h2 class="largeText font-medium">Areas of Work</h2></div>
            <div class="col-span-6 sm:col-span-5 sm:col-start-8 mt-[10vw] sm:mt-[2vw]">
              ${appearText(
                "Full-service home remodeling solutions combining custom aesthetics, everyday functionality, and lasting structural durability across every room."
              )}
            </div>
          </div>

          <div class="hidden sm:block z-10 relative">
            <div class="layout-grid mt-[15vw]">
              <div class="col-span-6">
                <div class="relative mb-[10vw] min-h-[16vw]">
                  <div class="w-full mb-[3vw]">
                    <span class="mediumText" style="line-height:1.25;" data-practice-title>${D.practiceAreas[0].title}</span>
                  </div>
                  <div class="grid grid-cols-6 gap-[var(--gutter)]">
                    <div class="col-span-3">
                      <span class="smallText" data-practice-p0>${D.practiceAreas[0].paragraphs[0]}</span>
                    </div>
                    <div class="col-span-3">
                      <span class="smallText" data-practice-p1>${D.practiceAreas[0].paragraphs[1]}</span>
                    </div>
                  </div>
                </div>
                <div class="flex w-full gap-[var(--gutter)]" role="tablist" aria-label="Areas of Practice">
                  ${practiceBars}
                </div>
              </div>
              <div class="col-span-5 col-start-8 z-10">
                <div class="w-full aspect-[15/16] relative overflow-hidden bg-secondary" data-style-image data-scale="true">
                  <div class="w-full h-full scale-[1.2] origin-bottom" data-image-parallax>
                    ${practiceImgs}
                  </div>
                  <div class="w-full h-full absolute top-0 left-0 bg-secondary z-10" data-image-overlay></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Practice List -->
          <div class="block sm:hidden mt-[15vw] space-y-[15vw] z-10 relative">
            ${D.practiceAreas
              .map(
                (pa) => `
              <div class="border-t border-primary/30">
                <div class="layout-grid mt-[var(--gutter)] mb-[5vw]">
                  <div class="col-span-6"><span class="mediumText">${pa.title}</span></div>
                </div>
                <div class="layout-grid space-y-[var(--gutter)]">
                  <div class="col-span-6"><span class="smallText">${pa.paragraphs[0]}</span></div>
                  <div class="col-span-6"><span class="smallText">${pa.paragraphs[1]}</span></div>
                </div>
                <div class="layout-grid mt-[5vw] mb-[5vw]">
                  <div class="col-span-6">
                    <div class="w-full aspect-[15/16] overflow-hidden">
                      <img src="${pa.image}" alt="${pa.imageAlt}" class="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>

        ${coreContactSection("studio")}
        ${coreFooter()}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 5: JOURNAL INDEX VIEW (/journal — matches D_halmgX.js)
  // =========================================================================
  function renderJournalView() {
    const featured = D.journals[0];
    const aspects = [
      "14/12",
      "14/9",
      "14/10",
      "14/13",
      "14/14",
      "14/15",
      "14/16",
      "14/17",
      "14/18",
      "14/19"
    ];

    const pair1 = D.journals.slice(1, 3);
    const remainingRows = [];
    for (let i = 3; i < D.journals.length; i += 2) {
      remainingRows.push(D.journals.slice(i, i + 2));
    }

    return `
      <div class="h-fit bg-primary w-full" data-nav-theme="dark" data-activate-nav="true">
        <!-- JournalHeader -->
        <div class="w-full h-fit bg-primary layout-grid pt-[20vw]">
          <div class="col-span-7">
            <span class="largeText font-medium">Spaces, Materials & Perspective</span>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-9 mt-[10vw] sm:mt-[2vw]">
            ${appearText(
              "Remodeling guides, bathroom lighting & color studies, small-kitchen storage strategies, and high-ROI renovation insights from Elite Home Creations DFW.",
              { delay: 0.3 }
            )}
          </div>
        </div>

        <!-- JournalFeatured -->
        <div class="w-full h-fit layout-grid mt-[20vw]">
          <div class="col-span-6 mb-[5vw] sm:mb-0">
            <div class="w-full sm:aspect-[14/12] flex flex-col justify-between">
              <div class="mb-[5vw] sm:mb-0">
                <span class="mediumText font-medium">Featured read</span>
              </div>
              <a href="#/journal/${featured.slug}" class="w-full flex justify-between items-end cursor-pointer" data-display-card>
                <div class="w-[70%]">
                  <span class="smallText">${featured.title}</span>
                </div>
                <div>
                  ${buttonMainAnimated({
                    text: "Read",
                    size: "small",
                    color: "dark",
                    containerHover: true
                  })}
                </div>
              </a>
            </div>
          </div>
          <a href="#/journal/${featured.slug}" class="col-span-6 mb-[5vw] sm:mb-0">
            <div class="w-full aspect-[14/12]">
              ${hoveringAction({
                text: "Read",
                contentHtml: styleImage({
                  src: featured.coverImage.url,
                  alt: featured.coverImage.alt
                })
              })}
            </div>
          </a>
        </div>

        <!-- JournalTable Row 1 -->
        <div class="w-full h-fit layout-grid mt-[2vw] space-y-[10vw] sm:space-y-0">
          ${pair1
            .map(
              (j, idx) => `
            <div class="col-span-6 h-fit">
              ${displayCard({
                title: j.title,
                imageSrc: j.coverImage.url,
                imageAlt: j.coverImage.alt,
                aspectRatio: aspects[(idx + 1) % aspects.length],
                actionText: "Read",
                hoverActionText: "Read Post",
                footerGap: "2vw",
                href: `#/journal/${j.slug}`
              })}
            </div>`
            )
            .join("")}
        </div>

        <!-- Interactive Paperclipped Note in Journal Table -->
        <div class="w-fit h-fit hidden sm:block relative z-20 pointer-events-none">
          <div class="h-[24vw] w-[22vw] ml-[65vw] mb-[-5vw] relative pointer-events-auto">
            ${displayNote()}
          </div>
        </div>

        <!-- Remaining Journal Rows (All 10 Blog Articles) -->
        ${remainingRows
          .map(
            (row, rIdx) => `
          <div class="w-full h-fit layout-grid mt-[2vw] space-y-[10vw] sm:space-y-0 ${
            rIdx === 0 ? "" : "sm:mt-[10vw]"
          }">
            ${row
              .map(
                (j, cIdx) => `
              <div class="col-span-6 h-fit">
                ${displayCard({
                  title: j.title,
                  imageSrc: j.coverImage.url,
                  imageAlt: j.coverImage.alt,
                  aspectRatio: aspects[(rIdx * 2 + cIdx + 3) % aspects.length],
                  actionText: "Read",
                  hoverActionText: "Read Post",
                  footerGap: "2vw",
                  href: `#/journal/${j.slug}`
                })}
              </div>`
              )
              .join("")}
          </div>`
          )
          .join("")}

        ${coreContactSection("journal")}
        ${coreFooter()}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 6: JOURNAL POST DETAIL VIEW (/journal/:slug — matches dYN8OpZq.js)
  // =========================================================================
  function renderJournalPostView(slug) {
    const post = D.journals.find((j) => j.slug === slug) || D.journals[0];
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;

    // Parse bodyContent into paragraph and image blocks exactly like dYN8OpZq.js
    const blocks = [];
    let remaining = post.bodyContent || "";
    const pushParagraphs = (chunk) => {
      chunk
        .split(/\n{2,}/)
        .map((s) => s.replace(/\n+/g, " ").trim())
        .filter(Boolean)
        .forEach((p) => blocks.push({ type: "paragraph", text: p }));
    };
    while (remaining.length) {
      const m = remaining.match(imageRegex);
      if (m && m.index != null) {
        pushParagraphs(remaining.slice(0, m.index));
        blocks.push({ type: "image", alt: m[1], src: m[2] });
        remaining = remaining.slice(m.index + m[0].length);
      } else {
        pushParagraphs(remaining);
        break;
      }
    }

    const sidebarMinimapHtml = blocks
      .map((b) =>
        b.type === "image"
          ? `<div class="w-full aspect-[14/10]"><img src="${b.src}" alt="${b.alt}" class="w-full h-full object-cover" /></div>`
          : `<p class="text-[0.227vw]">${b.text}</p>`
      )
      .join("");

    const mainBlocksHtml = blocks
      .map((b) =>
        b.type === "image"
          ? `<div class="w-full aspect-[14/10]">${styleImage({ src: b.src, alt: b.alt })}</div>`
          : `<p class="smallText">${b.text}</p>`
      )
      .join("");

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "numeric"
    }).format(new Date(post.date));

    return `
      <div class="h-fit bg-primary w-full" data-nav-theme="dark" data-activate-nav="true">
        <!-- JournalPostHeader -->
        <div class="w-full h-fit pt-[15vw]">
          <div class="w-full layout-grid">
            <div class="col-span-12">
              <span class="largeText" style="line-height:1.2;">${post.title}</span>
            </div>
            <div class="col-span-6 mt-[5vw]">
              <div class="flex extraSmallText items-end gap-[4vw] sm:gap-[2vw] whitespace-nowrap">
                <div class="flex gap-[0.5vw]">
                  <div class="w-[8vw] sm:w-[3vw] aspect-square bg-secondary">
                    <img src="${post.authorPhoto}" alt="${post.author}" class="w-full h-full object-cover grayscale" />
                  </div>
                  <div class="flex flex-col justify-between">
                    <div><span class="font-mono opacity-50 uppercase">${post.authorRelation}</span></div>
                    <div class="whitespace-nowrap"><span style="line-height:1.2;">${post.author}</span></div>
                  </div>
                </div>
                <div><span style="line-height:1.2;">${formattedDate}</span></div>
                <div><span style="line-height:1.2;">${post.readTime}</span></div>
              </div>
            </div>
            <div class="col-span-12 mt-[var(--gutter)] h-[70svh] sm:h-[90svh]">
              ${styleImage({ src: post.coverImage.url, alt: post.coverImage.alt })}
            </div>
          </div>
        </div>

        <!-- JournalPostContent with Sticky Left Minimap Scroll Marker -->
        <div class="w-full h-fit mt-[10vw] mb-[30vw]" data-journal-post-content>
          <div class="w-full layout-grid relative">
            <div class="col-span-1 h-fit sticky top-[10svh] left-0 hidden sm:block" data-journal-minimap>
              <div class="w-[1vw] rounded-full aspect-square bg-black absolute top-0 -right-[var(--gutter)]" data-journal-marker></div>
              <div class="w-full origin-top-left space-y-[0.2vw]">
                ${sidebarMinimapHtml}
              </div>
            </div>
            <div class="col-span-6 sm:col-start-7 space-y-[var(--gutter)]" data-journal-body>
              ${mainBlocksHtml}
            </div>
          </div>
        </div>

        ${coreContactSection("journal-post")}
        ${coreFooter()}
      </div>
    `;
  }

  // =========================================================================
  // VIEW 7: FAQ & GUARANTEES VIEW (/faq — matches Storey Legal/Editorial layout)
  // =========================================================================
  function renderFaqView() {
    const faqCategoriesHtml = D.faqs
      .map(
        (cat, cIdx) => `
      <div class="space-y-[3vw] border-t border-[#BFBFBF] pt-[4vw]">
        <div class="flex justify-between items-baseline">
          <h2 class="mediumText font-medium">${cat.category}</h2>
          <span class="font-mono extraSmallText opacity-50">0${cIdx + 1}</span>
        </div>
        <div class="space-y-[2vw]">
          ${cat.items
            .map(
              (item) => `
            <details class="group border-b border-[#E5E7EB] pb-[1.5vw] cursor-pointer">
              <summary class="flex justify-between items-center smallText font-medium list-none py-[0.5vw]">
                <span>${item.q}</span>
                <span class="font-mono extraSmallText ml-[2vw] group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <p class="smallText opacity-80 pt-[1vw] leading-[1.4]">${item.a}</p>
            </details>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("");

    return `
      <div class="h-fit bg-primary text-secondary" data-nav-theme="dark" data-activate-nav="true">
        <div class="w-full h-fit layout-grid pt-[20vw]">
          <div class="col-span-6 sm:col-span-8">
            <h1 class="largeText font-medium" style="line-height:1.1;">Frequently Asked Questions</h1>
          </div>
          <div class="col-span-6 sm:col-span-4 sm:col-start-9 mt-[10vw] sm:mt-[2vw]">
            ${appearText(
              "Clear answers on timelines, permits, warranties, financing, and our Fixed Price Guarantee for bathroom, kitchen, and whole-home remodeling in Dallas–Fort Worth."
            )}
            <p class="extraSmallText font-mono opacity-60 mt-[4vw] sm:mt-[1vw]">DIRECT LINE: ${D.brand.phoneDisplay}</p>
          </div>
          <div class="col-span-6 sm:col-span-8 sm:col-start-3 mt-[15vw] sm:mt-[10vw] mb-[10vw] space-y-[8vw] sm:space-y-[5vw]">
            ${faqCategoriesHtml}
          </div>
        </div>
        ${coreContactSection("faq")}
        ${coreFooter()}
      </div>
    `;
  }

  return {
    brandLogoSvg,
    buttonMainAnimated,
    displayContactForm,
    renderHomeView,
    renderProjectsView,
    renderProjectDetailView,
    renderStudioView,
    renderJournalView,
    renderJournalPostView,
    renderFaqView
  };
})();
