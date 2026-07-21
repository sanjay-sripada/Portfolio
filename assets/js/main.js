(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const year = document.querySelector("#year");
  const navLinks = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);

    if (!sections.length) return;
    const marker = window.scrollY + header.offsetHeight + 48;
    let current = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= marker) current = section;
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current.id}`
      );
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionQuery.matches && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".timeline-item, .work-row, .featured-item, .skills-columns > div, .about-grid > p, .impact-list, .contact-lead, .contact-actions, .edu-block"
    );

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.transition = `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.04}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.04}s`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }
})();
