document.addEventListener('DOMContentLoaded', () => {

  // ── Detect language from <html lang> ──
  const lang = document.documentElement.lang || 'en';
  const isEl = lang === 'el';

  const tabSections = ['salads','appetisers','main-dishes','burgers','drinks','breakfast'];

  const titles = {
    en: {
      salads: 'Salads',
      appetisers: 'Appetisers',
      'main-dishes': 'Mains',
      burgers: 'Burgers',
      drinks: 'Drinks',
      breakfast: 'Breakfast'
    },
    el: {
      salads: 'Σαλάτες',
      appetisers: 'Ορεκτικά',
      'main-dishes': 'Κυρίως',
      burgers: 'Burgers',
      drinks: 'Ποτά',
      breakfast: 'Πρωινό'
    }
  };

  const labels = isEl ? titles.el : titles.en;

  const tabContainer = document.getElementById('menuTabs');
  if (!tabContainer) return;

  // Build tab buttons
  tabSections.forEach(id => {
    const btn = document.createElement('button');
    btn.className = 'tab-button';
    btn.id = `tab-${id}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('aria-selected', 'false');
    btn.textContent = labels[id];
    tabContainer.appendChild(btn);
  });

  const panels = [...document.querySelectorAll('.menu-section')];
  const tabs   = [...document.querySelectorAll('.tab-button')];

  function show(id) {
    panels.forEach(p => {
      const active = p.id === id;
      p.classList.toggle('active', active);
      p.hidden = !active;
    });
    tabs.forEach(t => {
      const active = t.id === `tab-${id}`;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
      t.setAttribute('tabindex', active ? '0' : '-1');
    });

    // Scroll active tab into view (for mobile)
    const activeTab = document.getElementById(`tab-${id}`);
    if (activeTab) {
      activeTab.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }

  // Keyboard navigation
  tabContainer.addEventListener('keydown', e => {
    const i = tabs.findIndex(t => t.classList.contains('active'));
    if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) e.preventDefault();
    if (e.key === 'ArrowRight') tabs[(i + 1) % tabs.length].click();
    if (e.key === 'ArrowLeft')  tabs[(i - 1 + tabs.length) % tabs.length].click();
    if (e.key === 'Home') tabs[0].click();
    if (e.key === 'End')  tabs[tabs.length - 1].click();
  });

  tabContainer.addEventListener('click', e => {
    if (e.target.matches('.tab-button')) {
      show(e.target.id.replace('tab-', ''));
    }
  });

  // Default: show first tab
  show(tabSections[0]);

  // ── Overlay logic ──
  const overlay    = document.getElementById('overlay');
  const overlaybtn = document.getElementById('view-menu-overlay-btn');
  const showOverlay = false; // Set true to enable trial overlay

  if (!overlay || !overlaybtn || !showOverlay) {
    if (overlay) overlay.style.display = 'none';
    return;
  }

  let timeRemaining = 15;
  overlaybtn.disabled = true;
  overlaybtn.textContent = `View Menu (${timeRemaining}s)`;

  const timer = setInterval(() => {
    timeRemaining -= 1;
    overlaybtn.textContent = timeRemaining > 0
      ? `View Menu (${timeRemaining}s)`
      : 'View Menu';
    if (timeRemaining <= 0) {
      clearInterval(timer);
      overlaybtn.disabled = false;
    }
  }, 1000);

  overlaybtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.body.style.overflow = 'hidden';
});
