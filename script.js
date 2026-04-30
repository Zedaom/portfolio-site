const PROJECTS = [
  {
    title: "Demo Reel Clean Up",
    category: "Clean Up",
    thumb: "CleanUpReelCapa.jpg",
    recorte: "",
    page: "project-demo-reel-clean.html",
    isReel: true,
    desc: "A compilation of clean up work across multiple projects."
  },
  {
    title: "Impossible Journey",
    category: "Clean Up",
    thumb: "ImpossibleJourneyCapa.jpeg",
    recorte: "Impossible_Journey_Recorte",
    page: "project-impossible-journey.html"
  },
  {
    title: "The Lost Glitches",
    category: "Clean Up",
    thumb: "TheLostGlitchesCapa.jpg",
    recorte: "The_Lost_Glitches_Recorte",
    page: "project-the-lost-glitches.html"
  },
  {
    title: "Convergence",
    category: "Clean Up",
    thumb: "ConvergenceCapa.jpg",
    recorte: "Convergence_Recorte",
    page: "project-convergence.html"
  },
  {
    title: "Active Rings",
    category: "Clean Up",
    thumb: "ActiveRingsCapa.jpg",
    recorte: "Active_Rings_Recorte",
    page: "project-active-rings.html"
  },
  {
    title: "Havaianas",
    category: "Clean Up",
    thumb: "HavaianasCapa.jpg",
    recorte: "Havaianas_Recorte",
    page: "project-havaianas.html"
  },
  {
    title: "The Ring",
    category: "Clean Up",
    thumb: "TheRingCapa.jpg",
    recorte: "The_Ring_Recorte",
    page: "project-the-ring.html"
  },
  {
    title: "Tiger Beer",
    category: "Clean Up",
    thumb: "TigerBeerCapa.jpg",
    recorte: "Tiger_Beer_Recorte",
    page: "project-tiger-beer.html"
  },
  {
    title: "Just a Cube",
    category: "Motion Design",
    thumb: "JustACube_Capa.jpg",
    recorte: "Just_A_Cube_Recorte",
    page: "project-just-a-cube.html"
  },
  {
    title: "Open your eyes",
    category: "Motion Design",
    thumb: "OpenYourEyes_Capa.jpg",
    recorte: "Open_Your_Eyes_Recorte",
    page: "project-open-your-eyes.html"
  }
];

function toggleMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const btn = document.getElementById("menuToggleBtn");
  const logo = document.querySelector(".mobile-menu-logo");
  if (!nav) return;
  const isOpen = nav.classList.toggle("open");
  if (btn) btn.textContent = isOpen ? "\u2715" : "\u2630";
  if (logo) logo.style.display = isOpen ? "block" : "none";
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMenu() {
  const nav = document.querySelector(".nav-links");
  const btn = document.getElementById("menuToggleBtn");
  const logo = document.querySelector(".mobile-menu-logo");
  if (!nav) return;
  nav.classList.remove("open");
  if (btn) btn.textContent = "\u2630";
  if (logo) logo.style.display = "none";
  document.body.style.overflow = "";
}

function handleMenuLink(e, href) {
  if (window.innerWidth > 768) return;
  e.preventDefault();
  const link = e.currentTarget;
  link.classList.add("nav-tapped");
  setTimeout(() => {
    closeMenu();
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  }, 250);
}

function setupReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function setupSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  setTimeout(() => {
    splash.classList.add("slide-up");
    splash.addEventListener("transitionend", () => splash.remove(), { once: true });
  }, 2000);
}

function setupPortfolio() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => {
    if (p.isReel) {
      return `
      <a class="project-card reel-card reveal" href="${p.page}">
        <div class="project-media">
          <img class="project-image" src="${p.thumb}" alt="${p.title}">
        </div>
        <div class="project-info">
          <span class="reel-badge">Demo Reel</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="reel-desc">${p.desc}</p>
        </div>
      </a>
      `;
    }

    return `
      <a class="project-card reveal" href="${p.page}">
        <div class="project-media">
          <img class="project-image" src="${p.thumb}" alt="${p.title}">
          <video class="project-video" loop muted playsinline preload="metadata" poster="${p.thumb}">
            <source src="${p.recorte}.webm" type="video/webm">
            <source src="${p.recorte}.mp4" type="video/mp4">
          </video>
        </div>
        <div class="project-info">
          <span class="project-category">${p.category}</span>
          <h3 class="project-title">${p.title}</h3>
        </div>
      </a>
    `;
  }).join("");

  const mediaObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector(".project-video");
        if (!video) return;
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise) playPromise.catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll(".project-card:not(.reel-card)").forEach(card => mediaObserver.observe(card));
  document.querySelectorAll(".project-video").forEach(video => {
    video.addEventListener("canplay", () => video.classList.add("ready"), { once: true });
    video.addEventListener("error", () => video.style.display = "none", { once: true });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupSplash();
  setupPortfolio();
  setupReveal();
});
