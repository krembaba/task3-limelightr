(() => {
  const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#') ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  const setActiveLink = () => {
    const scrollMarker = window.scrollY + 120;
    let currentSection = sections[0] || null;

    for (const section of sections) {
      if (section.offsetTop <= scrollMarker) {
        currentSection = section;
      }
    }

    if (!currentSection) {
      return;
    }

    for (const link of navLinks) {
      const isActive = link.getAttribute('href') === `#${currentSection.id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);
})();
