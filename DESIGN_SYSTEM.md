# Storey Architecture × Elite Home Creations DFW — Implementation-Ready UI & Design System Guidance

## 1. Context and Goals

### Design Intent
This design system must deliver a minimal, utility-first, accessibility-prioritized architectural web application and dashboard interface modeled on **Storey Architecture** (`storeyarchitecture.co.uk`) and tailored for **Elite Home Creations DFW** (`elitehomecreationsdfw.com`), ensuring strict token consistency, WCAG 2.2 AA compliance, and deterministic state behavior across all interactive surfaces.

### Brand & Surface Verification
- **Product / Brand Architecture:** Storey Architecture aesthetic system applied to **Elite Home Creations DFW** (Luxury Kitchen, Bathroom & Whole-Home Remodeling in Dallas–Fort Worth, TX).
- **Reference URL:** `https://www.storeyarchitecture.co.uk/`
- **Client Surface URL:** `https://elitehomecreationsdfw.com/`
- **Target Audience:** Authenticated users, project operators, Dallas–Fort Worth homeowners, real estate investors, first-time home buyers, and empty nesters.
- **Product Surface:** Responsive web application, client intake dashboard, portfolio explorer, and editorial journal.
- **Known Page Component Density Baseline:**
  - **Links:** `45` (navigation links, 8-card 3D spinner project links, service cards, project preview cards, journal cards, footer site index, legal links, `mailto:` and `tel:` contact triggers).
  - **Inputs:** `20` (modal contact intake form + embedded spatial/project brief intake form: Name, Email, Phone, 4 Project Type checkboxes, Location, Timeline, Message textarea, Honeypot/Marketing checkboxes).
  - **Buttons:** `4` primary action triggers per primary viewport/form surface (Header CTA trigger, Hero CTA action, Modal/Inline Brief Submit, Mobile Menu toggle).
  - **Lists:** `3` structured footer navigation lists (Site Index, Legal / Services, Get in Touch).

---

## 2. Design Tokens and Foundations

All implementations must reference semantic tokens via CSS Custom Properties (`var(--token-name)`) rather than raw hex values or arbitrary pixel overrides.

### 2.1 Typography Tokens

| Token Name | Value | CSS Variable | Usage Rule |
| :--- | :--- | :--- | :--- |
| `font.family.primary` | `New Grotesk` | `--font-family-primary` | Must be used for all primary UI copy, headings, navigation, and body text (`letter-spacing: -0.03em`). |
| `font.family.stack` | `New Grotesk, system-ui, sans-serif` | `--font-family-stack` | Must be applied to `:root, html, body` as the default font stack. |
| `font.family.mono` | `New Grotesk Mono, ui-monospace, monospace` | `--font-family-mono` | Must be used for numerical indices (`01`, `02`), intake form inputs, metadata tags, and technical labels (`letter-spacing: -0.10em`). |
| `font.family.accent` | `Biro, ui-monospace, monospace` | `--font-family-accent` | Should be reserved exclusively for interactive paperclipped studio notes. |
| `font.size.base` | `13.508px` (`1.1vw` desktop) | `--font-size-base` | Base utility and metadata text size. |
| `font.weight.base` | `400` | `--font-weight-base` | Default weight for body copy, labels, and navigation. |
| `font.weight.medium` | `500` | `--font-weight-medium` | Must be used for display headings (`largeText`, `extraLargeText`) and emphasized titles. |
| `font.lineHeight.base` | `13.508px` (`1.0`) | `--font-line-height-base` | Tight architectural line-height for utility labels, buttons, and display headers. |
| `font.lineHeight.body` | `1.2` – `1.25` | `--font-line-height-body` | Must be used for multi-line paragraphs (`smallText`) to preserve readability. |
| `font.size.xs` | `13.51px` (`1.1vw` / `4.3vw` mobile) | `--font-size-xs` | `.extraSmallText` — Navigation items, buttons, form labels, metadata. |
| `font.size.sm` | `16px` (`1.6vw` / `4.3vw` mobile) | `--font-size-sm` | `.smallText` — Primary editorial paragraphs, project descriptions, testimonial copy. |
| `font.size.md` | `19.65px` (`2.2vw` / `8vw` mobile) | `--font-size-md` | `.mediumText` — Brand wordmark, service titles, section sub-headers, footer headings. |
| `font.size.lg` | `27.02px` (`7vw` / `12vw` mobile) | `--font-size-lg` | `.largeText` — Section headlines (`Our areas of expertise`, `Spaces Shaped Through Intention`). |
| `font.size.xl` | `8vw` (`15vw` mobile) | `--font-size-xl` | `.extraLargeText` — Full-viewport parallax statement headlines. |

### 2.2 Color Palette & Semantic Surface Tokens

| Semantic Token | Extracted / Defined Value | CSS Variable | Contrast & Role |
| :--- | :--- | :--- | :--- |
| `color.text.primary` | `#ffffff` (`rgb(255 255 255)`) | `--color-text-primary` | High-contrast primary text on dark (`color.surface.base`) surfaces (`21:1` contrast ratio). |
| `color.text.inverse` | `#000000` (`rgb(0 0 0)`) | `--color-text-inverse` | High-contrast primary text on light (`color.surface.elevated`) surfaces (`21:1` contrast ratio). |
| `color.text.secondary` | `#3d3d3d` (`rgb(61 61 61)`) | `--color-text-secondary` | Secondary/form text on light paper surfaces (`10.9:1` contrast ratio against light surface; must never be used on `#000000` background). |
| `color.text.mutedOnDark` | `#b3b3b3` (`rgb(255 255 255 / 0.7)`) | `--color-text-muted-on-dark` | Muted metadata and secondary captions on dark surfaces (`>= 9.5:1` contrast ratio). |
| `color.surface.base` | `#000000` (`rgb(0 0 0)`) | `--color-surface-base` | Primary dark architectural canvas (Hero, Intro, CTA banner, Testimonials, Footer). |
| `color.surface.elevated` | `#ffffff` (`rgb(255 255 255)`) | `--color-surface-elevated` | Primary light architectural canvas (Services, Project Preview, Journal, Intake Form). |
| `color.surface.paper` | `#fefefe` (`rgb(254 254 254)`) | `--color-surface-paper` | Tactile intake brief and note card surface with multiply paper texture overlay. |
| `color.border.default` | `#e5e7eb` | `--color-border-default` | Default structural divider token. |
| `color.border.subtle` | `#bfbfbf` | `--color-border-subtle` | Service row top dividers on light surfaces. |
| `color.border.darkSubtle` | `#2b2b2b` | `--color-border-dark-subtle` | Principle row top dividers on dark surfaces. |
| `color.focus.ring` | `#06a3da` | `--color-focus-ring` | High-visibility keyboard focus indicator (`2px solid`, `2px` offset). |
| `color.status.error` | `#dc2626` | `--color-status-error` | Form validation and error state messaging (`>= 4.5:1` on light surface). |
| `color.status.success` | `#15803d` | `--color-status-success` | Form submission confirmation messaging (`>= 4.5:1` on light surface). |

### 2.3 Spacing & Layout Grid Tokens

| Token Name | Value | CSS Variable | Application |
| :--- | :--- | :--- | :--- |
| `space.1` | `6.14px` | `--space-1` | Micro badge vertical padding (`0.4vw`), inline icon gaps. |
| `space.2` | `8.6px` | `--space-2` | Compact button vertical padding (`0.7vw`), list item vertical rhythm. |
| `space.3` | `9.82px` | `--space-3` | Card footer top padding (`0.75vw`), compact inline gaps. |
| `space.4` | `11.05px` | `--space-4` | Small button horizontal padding (`0.9vw`). |
| `space.5` | `12.28px` | `--space-5` | Standard nav link right spacing (`1.0vw`). |
| `space.6` | `14.74px` | `--space-6` | Large button horizontal padding (`1.2vw`). |
| `space.7` | `17.19px` | `--space-7` | Grid margin and column gutter (`--margin: 1.3889vw`, `--gutter: 1.3889vw` desktop; `4vw` mobile). |
| `space.8` | `36.84px` | `--space-8` | Section internal rhythm and form group spacing (`3vw`). |
| `layout.columns.desktop` | `12` | `--layout-cols-desktop` | Desktop `.layout-grid` (`> 640px`): `repeat(12, minmax(0, 1fr))`. |
| `layout.columns.mobile` | `6` | `--layout-cols-mobile` | Mobile `.layout-grid` (`<= 640px`): `repeat(6, minmax(0, 1fr))`. |

### 2.4 Manual Shape, Elevation & Motion Tokens

| Token Category | Token Name | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Radius** | `radius.none` | `0px` | Default architectural sharp-edge geometry for buttons, cards, inputs, and modals. |
| **Radius** | `radius.full` | `9999px` | Scroll progress minimap indicator dot. |
| **Shadow** | `shadow.none` | `none` | Flat architectural surface hierarchy achieved via contrast rather than drop shadows. |
| **Shadow** | `shadow.modal` | `0 24px 48px rgba(0, 0, 0, 0.35)` | Elevated modal sheet separation over backdrop. |
| **Motion** | `motion.ease.outExpo` | `cubic-bezier(0.16, 1, 0.3, 1)` (`power4.out`) | Hero image transitions, spinner reveals, text line reveals. |
| **Motion** | `motion.ease.inOutExpo` | `cubic-bezier(0.87, 0, 0.13, 1)` (`power4.inOut`) | Fullscreen `#transition-overlay` page transitions (`0.75s`). |
| **Motion** | `motion.ease.outQuad` | `cubic-bezier(0.25, 1, 0.5, 1)` (`power2.out`) | 8-spoke starburst button hover (`0.4s` enter / `0.25s` exit), cursor follower (`0.2s`). |
| **Motion** | `motion.duration.fast` | `200ms` | Nav link vertical hover lift (`-0.25vw`). |
| **Motion** | `motion.duration.normal` | `400ms` | Button starburst rotation (`90deg`) and spoke contraction. |
| **Motion** | `motion.duration.slow` | `750ms` | Page transition cover fade, line reveal, paperclip note toss. |
| **Motion** | `motion.duration.slider` | `10000ms` | Linear progress bar fill (`scaleX: 0 -> 1`) for hero and testimonial sliders. |

---

## 3. Component-Level Rules

Every component must implement all 7 required states (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`), use semantic tokens, and support keyboard, pointer, and touch input.

### 3.1 Animated Starburst Button (`ButtonMainAnimated`)
- **Anatomy:** Root `<button>` or `<a>` container (`radius.none`) + left label `<span class="extraSmallText">` + right 8-spoke radial ring container (`8` child spoke divs rotated at `45deg` intervals around a central origin).
- **Variants:**
  - `size="small"`: Padding `space.2` (`0.7vw`) vertical, `space.4` (`0.9vw`) horizontal; gap `2.3vw` desktop / `3vw` mobile.
  - `size="large"`: Padding `0.8vw` vertical, `space.6` (`1.2vw`) horizontal; gap `5vw` desktop / `12vw` mobile.
  - `color="light"`: Background `color.surface.elevated`, text & spokes `color.text.inverse`.
  - `color="dark"`: Background `color.surface.base`, text & spokes `color.text.primary`.
  - `color="form"`: Background `color.text.secondary`, text & spokes `color.text.primary`.
- **States:**
  - `default`: Spoke `paddingBottom` at `basePadding`; circle rotation `0deg`; label `translateX(0)`.
  - `hover`: Spoke `paddingBottom` contracts to `paddingHover`; circle rotates `90deg` over `motion.duration.normal`; label shifts `translateX(0.5vw)`.
  - `focus-visible`: Must display `2px solid var(--color-focus-ring)` with `2px` outline-offset and trigger the hover spoke contraction for visual parity.
  - `active`: Scale `0.98` with immediate `100ms` feedback.
  - `disabled`: Opacity `0.45`, `cursor: not-allowed`, `aria-disabled="true"`, pointer events suppressed, spoke animation disabled.
  - `loading`: Label updates to action progress text (e.g., `"Submitting..."`), `aria-busy="true"`, 8-spoke ring rotates continuously (`360deg` infinite linear loop), duplicate clicks blocked.
  - `error`: Accompanied by adjacent `role="alert"` status text in `color.status.error`; button remains interactive for retry.
- **Interaction & Responsive Behavior:**
  - **Keyboard:** Activates via `Enter` or `Space`.
  - **Pointer:** Triggers GSAP spoke contraction on `mouseenter` and resets on `mouseleave`.
  - **Touch:** Minimum tap target `44px × 44px` enforced on mobile (`<= 640px`); triggers navigation or modal action on `touchend`/`click` without sticky hover traps.
  - **Long Content / Overflow:** Label must use `white-space: nowrap` for concise CTAs (max 3 words); if dynamic text exceeds container width, truncate with `text-overflow: ellipsis`.

### 3.2 Directional Navigation Link (`StyleTextButtonHover`)
- **Anatomy:** Focusable `<a>` or `<button>` wrapper + text wrapper (`extraSmallText` or `mediumText`) + bottom underline bar (`height: max(0.1vw, 1px)`, `background: currentColor`).
- **Variants:**
  - `directional="true"` (Header Nav): Calculates cursor entry X-coordinate relative to link width (`clientX - left < width / 1.2 ? 'left' : 'right'`) to set `transform-origin` dynamically.
  - `directional="false"` (Footer Index): Uses CSS `origin-right group-hover:origin-left group-hover:scale-x-100 scale-x-0`.
- **States:**
  - `default`: Text `translateY(0)`, underline `scaleX(0)`.
  - `hover`: Text lifts `translateY(-0.25vw)` (`motion.duration.fast`), underline expands `scaleX(1)` (`300ms`).
  - `focus-visible`: Outline `2px solid var(--color-focus-ring)`, underline `scaleX(1)`.
  - `active`: `aria-current="page"` indicator when matching active route.
  - `disabled`: Opacity `0.4`, `pointer-events: none`, `tabindex="-1"`.
  - `loading`: During route transition (`#transition-overlay` active), navigation clicks are debounced.
  - `error`: Invalid route targets must fall back to the error recovery view with a working `"Home"` CTA.

### 3.3 Project & Journal Media Card (`DisplayCard` + `StyleHoveringAction`)
- **Anatomy:** Outer `<a>` flex column + aspect-ratio media container (`1/1`, `16/12`, `12/14`, `14/12`) with overflow hidden + parallax image (`scale-[1.2] origin-bottom`) + cursor-tracking floating badge (`Explore Project` / `Read Post` + velocity-rotating 8-ray SVG) + bottom metadata row (Title `smallText` + `ButtonMainAnimated` `Read`/`Explore`).
- **States:**
  - `default`: Image container `scale(1)`, floating badge `opacity: 0`, bottom button in default state.
  - `hover`: Image container scales to `0.9` (`650ms power2.out`), floating badge fades to `opacity: 1` and tracks cursor via `gsap.quickTo` while its 8-ray icon rotates along cursor velocity vector `Math.atan2(dy, dx)`; bottom `ButtonMainAnimated` simultaneously enters hover state (`hover-activated="true"`).
  - `focus-visible`: Card displays `2px solid var(--color-focus-ring)` outline and activates the bottom button hover state.
  - `active`: Initiates `#transition-overlay` cover transition (`750ms`) to the target project or journal detail route.
  - `disabled`: Grayscale filter `100%`, opacity `0.5`, non-clickable.
  - `loading`: Dark secondary overlay (`bg-secondary z-10`) covers image until image decode completes and ScrollTrigger reveals (`opacity: 1 -> 0`).
  - `error`: Fallback architectural placeholder surface rendered if `img.onerror` fires (`data-error="1"`).
- **Responsive & Edge-Case Behavior:**
  - On touch devices (`<= 640px`), floating cursor follower is suppressed; tap directly activates the card link, and the bottom action button remains permanently visible.
  - Long titles wrap cleanly across multiple lines while `shrink-0` preserves the right-aligned action button.

### 3.4 Spatial / Project Brief Intake Form (`DisplayContact` & `ModalContact`)
- **Anatomy:** Paper-textured `<form>` (`color.surface.paper`, `color.text.secondary`) + top-left decorative `paperclip.png` + numbered monospace grid rows (`01)` through `06)`) + underlined text/email/tel inputs (`font.family.mono`, `extraSmallText`) + 4 custom checkbox tiles (`Bathroom Remodel`, `Kitchen Remodel`, `Living Spaces`, `Whole-Home / Investor`) + 3-line ruled `<textarea>` + `ButtonMainAnimated` submit trigger + live status region (`role="status"` / `aria-live="polite"`) + 3-column monospace specification footer.
- **States:**
  - `default`: Bottom border `1px solid var(--color-text-secondary)`; checkbox square at `50%` opacity (`bg-formSecondary/50`).
  - `hover`: Checkbox label and input rows highlight subtle border contrast.
  - `focus-visible`: Input bottom border thickens to `2px` with `var(--color-focus-ring)` outline; screen-reader-only `<input type="checkbox" class="sr-only peer">` exposes `peer-focus-visible:ring-2` on the visual checkbox square.
  - `active` / `checked`: Selected project type square fills to `100%` `color.text.secondary` (`peer-checked:bg-formSecondary`).
  - `disabled`: All inputs set `disabled` with `opacity: 0.5` while form is submitting.
  - `loading`: Submit button enters `loading` state; status message displays `"Submitting form..."`.
  - `error`: Missing or invalid required fields set `aria-invalid="true"`, highlight the offending field border in `color.status.error`, and announce specific remediation copy (e.g., `"Please fill in all fields including Name, Email, Phone, and Project Type"`).
- **Keyboard, Pointer & Touch:**
  - Full `Tab` / `Shift+Tab` traversal in numerical order (`01` to `06` to `Submit`).
  - Checkboxes toggle with `Space`.
  - When opened inside `ModalContact`, `Escape` key or backdrop click closes the modal and returns focus to the triggering `Contact` / `Free Quote` button.

### 3.5 Auto-Advancing Progress Slider (`LandingHeroProjectSlider`, `LandingTestimonialsSlider`, `StudioPractice`)
- **Anatomy:** 4-segment horizontal progress track (`flex w-full gap-[var(--gutter)]`) where active segment is `w-1/2` (`50%`) and inactive segments are `w-1/6` (`16.6667%`) + `3px` track background (`bg-primary/30`) + animated fill bar (`bg-primary origin-left`) + synchronized image stack + masked text reveal container.
- **States:**
  - `default` / `active`: Active bar fills linearly over `10s` (`motion.duration.slider`) then advances to `(index + 1) % 4`.
  - `hover`: `cursor: pointer` on all 4 progress tracks with generous vertical hit padding (`py-[var(--gutter)]`).
  - `focus-visible`: Progress track buttons must be keyboard-focusable (`role="tab"`, `tabindex="0"`) with visible focus ring.
  - `disabled` / `reduced-motion`: When `prefers-reduced-motion: reduce` is enabled, auto-advance and scale animations should pause or switch instantaneously without vestibular motion.
  - `empty-state`: If slide array is empty, render fallback static hero statement and primary CTA.

---

## 4. Accessibility Requirements and Testable Acceptance Criteria

Target compliance is **WCAG 2.2 Level AA**. Every rule below must be verifiable via automated axe-core audits and manual keyboard inspection.

| ID | Requirement | Testable Acceptance Criterion (Pass / Fail) |
| :--- | :--- | :--- |
| **A11Y-01** | **Color Contrast (WCAG 1.4.3 & 1.4.11)** | **PASS:** Primary white text (`#ffffff`) on black (`#000000`) achieves `21:1`. Form text (`#3d3d3d`) on paper (`#fefefe`) achieves `10.9:1`. Muted text on dark surfaces must use `>= 0.7` white opacity (`>= 9.5:1`), never raw `#3d3d3d` on `#000000`. **FAIL:** Any text node with contrast `< 4.5:1` (`< 3.0:1` for large text `>= 24px`). |
| **A11Y-02** | **Keyboard-First Navigation (WCAG 2.1.1)** | **PASS:** All 45 links, 20 form inputs, 4 buttons, 3D spinner cards, paperclipped note, and slider tabs are reachable via `Tab` / `Shift+Tab` and operable via `Enter` or `Space`. **FAIL:** Any mouse-only `div` click handler without `role="button"`/`tabindex="0"` and keyboard listener. |
| **A11Y-03** | **Focus-Visible Indicator (WCAG 2.4.7 & 2.4.11)** | **PASS:** Navigating via keyboard displays a high-contrast `2px solid var(--color-focus-ring)` outline with `2px` offset on every interactive element, including custom `.sr-only.peer` checkboxes (`peer-focus-visible`). **FAIL:** `outline: none` without a visible replacement focus indicator. |
| **A11Y-04** | **Modal Focus Management (WCAG 2.1.2 & 2.4.3)** | **PASS:** Opening `ModalContact` or `CoreMobileMenu` moves focus into the dialog, traps `Tab` within the open layer, closes on `Escape`, and restores focus to the trigger button on close. **FAIL:** Background page scrolls or receives tab focus while modal is open. |
| **A11Y-05** | **Form Labels & Error Identification (WCAG 3.3.1 & 3.3.2)** | **PASS:** Every `<input>` and `<textarea>` has a programmatic `<label for="...">` or `aria-label`; invalid submissions set `aria-invalid="true"` and announce errors in an `aria-live="polite"` region. **FAIL:** Unlabeled inputs or silent form submission failures. |
| **A11Y-06** | **Reduced Motion Respect (WCAG 2.3.3)** | **PASS:** When `prefers-reduced-motion: reduce` matches, `StyleTextAppearCopy` bypasses line-mask translation and renders text immediately visible; parallax scrubs and 3D rotation intensities are reduced or disabled. **FAIL:** Unstoppable vestibular motion when reduced motion is requested. |
| **A11Y-07** | **Target Size (WCAG 2.5.8)** | **PASS:** All interactive controls (including progress bar triggers via vertical padding `py-[var(--gutter)]` and mobile menu buttons) provide at least `24px × 24px` (`44px × 44px` recommended on mobile) hit area. **FAIL:** Unpadded `3px` progress lines that cannot be tapped accurately. |

---

## 5. Content and Tone Standards

Writing across all surfaces must be **concise, confident, and implementation-focused**, pairing Storey Architecture's calm editorial restraint with Elite Home Creations DFW's concrete remodeling guarantees.

### 5.1 Do / Don't Copy Examples

| Surface | Do (Concise, Confident, Specific) | Don't (Ambiguous, Verbose, Broken) |
| :--- | :--- | :--- |
| **Primary CTA Button** | `Explore Projects`, `Request Brief`, `View Posts`, `Submit Brief` | `Click Here`, `Read More` (unlinked), `Free Quote` (`href="#"`) |
| **Hero Value Proposition** | `"Elite Home Creations designs and builds luxury kitchen, bathroom, and whole-home transformations across Dallas–Fort Worth, combining custom design expertise with a fixed price guarantee."` | `"Welcome to our website! We do lots of different remodeling jobs in the area if you need help."` |
| **Form Validation Message** | `"Please complete all required fields: Name, Email, Phone, Project Type, Location, Timeline, and Project Details."` | `"Error!"` or silently refreshing the page without submitting. |
| **Contact Links** | `<a href="tel:+12142980007">(214) 298-0007</a>` and `<a href="mailto:admin@elitehomecreationsdfw.com">admin@elitehomecreationsdfw.com</a>` | Unlinked plain text `(214)298- 0007` with a typo space. |

---

## 6. Anti-Patterns, Migration Notes, and Edge-Case Handling

### 6.1 Prohibited Anti-Patterns
1. **Must not** ship dead anchor links (`<a href="#">` or `<a href="">`) on Hero CTAs or Service cards (remediating Legacy Conversion Bugs #1 and #3).
2. **Must not** ship `<form>` elements without submit handlers, `name` attributes, phone capture, and state feedback (remediating Legacy Conversion Bug #2).
3. **Must not** render unlinked telephone numbers or expose internal pitch routes (`/elite-sales-pitch/`) in customer-facing navigation (remediating Legacy Conversion Bugs #4 and #5).
4. **Must not** apply `color.text.secondary` (`#3d3d3d`) directly on `color.surface.base` (`#000000`) as it fails WCAG AA (`1.9:1` contrast). Use `color.text.primary` (`#ffffff`) or `color.text.mutedOnDark` (`rgba(255,255,255,0.7)`).
5. **Must not** introduce one-off pixel font sizes or arbitrary spacing outside the fluid viewport/token scale (`--font-size-*`, `--space-*`, `--margin`, `--gutter`).

### 6.2 Edge-Case Handling
- **Long User Content / Dynamic Copy:** Testimonial Slider and Studio Practice areas must pre-measure all slide heights in a hidden measurement container and bind `minHeight` to the tallest slide so surrounding page layout never jumps during slide transitions.
- **Image Load Failure:** Every `<img>` must attach an `onerror` handler that sets `data-error="1"` and reveals a clean dark architectural fallback surface rather than a broken browser icon.
- **Viewport Resize:** Window resize listeners (debounced) must recalculate testimonial container `minHeight` and call `ScrollTrigger.refresh()` + `lenis.resize()`.

---

## 7. QA Checklist

- [ ] **Token Compliance:** All colors, typography scales, and grid gutters use semantic tokens (`--color-*`, `--font-*`, `--space-*`, `--margin`, `--gutter`) with zero raw hex values in component rules.
- [ ] **Component State Coverage:** Every interactive component (`ButtonMainAnimated`, `StyleTextButtonHover`, `DisplayCard`, `DisplayContact`, `LandingHeroProjectSlider`, `ModalContact`, `CoreMobileMenu`) implements `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, and `error` states.
- [ ] **Storey Motion Fidelity:** Lenis smooth scroll, GSAP `#transition-overlay` page transitions (`0.75s power4.inOut`), 8-spoke starburst button rotation, cursor-following velocity-rotated project badges, 3D 8-card ring spinner (`#intro-logo-spinner`), and flying paperclipped notes (`DisplayNote`) operate smoothly at 60fps.
- [ ] **Elite Home Creations DFW Content & Assets:** All 50 local client images, 3 core services (Bathroom, Kitchen, Living Spaces), 4 customer segments, 9 client reviews with avatars, 10 blog articles, 4 before/after transformations, and 25+ FAQs are integrated.
- [ ] **Legacy Conversion Bugs Fixed:** Hero CTAs open the intake modal or navigate to projects; intake forms validate and capture Name, Email, Phone, Project Type, Location, Timeline, and Message; Service cards link to full views; `(214) 298-0007` is linked via `tel:+12142980007`; no internal sales pitch link appears in the navbar.
- [ ] **Accessibility Gate (WCAG 2.2 AA):** Full keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`), visible focus rings (`--color-focus-ring`), `>= 4.5:1` text contrast across all dark and light sections, and `prefers-reduced-motion` support verified.
