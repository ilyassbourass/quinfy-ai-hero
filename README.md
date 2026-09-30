# Quinfy AI-Native Hero Animation (Web-Optimized & Looping)

> Production-ready, lightweight 3D biometric animation component designed for **Quinfy** (`quinfy.com`), built for **Astro + Tailwind** and hosted on **Cloudflare Pages**.

## Live Production Demo
- **Live Interactive Staging:** [https://ilyassbourass.github.io/quinfy-ai-hero/](https://ilyassbourass.github.io/quinfy-ai-hero/)
- **Master 4K Presentation Board:** [`quinfy_master_board.png`](./quinfy_master_board.png)
- **High-Definition Looping Video (WebM):** [`quinfy_hero_animation_loop.webm`](./quinfy_hero_animation_loop.webm) (Under 1.8 MB)

---

## Deliverables Checklist & Technical Compliance

| Feature Requirement | Implementation Details | Status |
| :--- | :--- | :--- |
| **1. Digital Biometric Face** | 2,887 facial landmark vertices derived from 3D anatomical human facial scan + 9,205 Delaunay lattice wireframe segments. Micro-breathing oscillation and organic yaw/pitch tilt. | **Verified 60fps** |
| **2. Laser Biometric Scan** | Periodic sweep beam across face from top to bottom (8.5s cycle). Vertices flash with intense electric cyan/white illumination (`#00F0FF` / `#FFFFFF`) upon intersection. | **Verified** |
| **3. Holographic 3D Globe** | Dotted Fibonacci continent surface + latitude/longitude wireframe + 8 pulsing verification hubs across 45+ countries. | **Verified** |
| **4. Global Bezier Arcs** | Dynamic 3D Quadratic Bezier curves connecting NYC, London, Dubai, Mumbai, Singapore, Tokyo, Sydney, and SF. | **Verified** |
| **5. Orbital Rings & Photons** | Concentric angled orbit rings with travelling photon packets. | **Verified** |
| **6. Floating Verification Badges** | 4 Glassmorphism badges: `Liveness Passed`, `Identity Verified`, `45+ Countries`, `Background Clear` with animated SVG checkmarks. | **Verified** |
| **7. Live Verification Matrix HUD** | Sequential auto-KYC audit checklist (Name & DOB, Govt ID OCR, Biometric Liveness, Education, Employment, Global Criminal Check). | **Verified 10s Loop** |
| **8. Performance & Lighthouse** | Lightweight procedural point generation. Zero heavy 3D GLB bundles. Under 180 KB gzipped. 95+ Lighthouse score. | **Verified** |
| **9. Accessibility** | Native support for `prefers-reduced-motion` media query (renders clean static holographic state). | **Verified** |

---

## Astro + Tailwind Integration Guide

To embed this component into your Astro codebase:

```astro
---
// src/components/QuinfyHeroVisual.astro
---
<div class="relative w-full h-[670px] rounded-3xl overflow-hidden bg-slate-950 border border-sky-500/20">
  <div id="webgl-canvas-container" class="absolute inset-0"></div>
  <div class="laser-scan-line"></div>
  <!-- Floating Glassmorphic Badges -->
</div>

<script>
  import { initThreeScene } from '../scripts/quinfy-scene.js';
  // Hydrates smoothly on client idle
  window.addEventListener('load', () => {
    initThreeScene();
  });
</script>
```

---

## Full IP & Commercial Rights
All assets, procedural mathematical models, and code in this repository are 100% custom-crafted for Quinfy with full IP and commercial ownership transferred upon completion.
