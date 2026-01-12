document.addEventListener('DOMContentLoaded', () => {
    const tabSections = ['salads','appetisers','main-dishes','burgers','drinks','breakfast'];
    const titles = { salads:'Salads', appetisers:'Appetisers', 'main-dishes':'Main Dishes', burgers:'Burgers', drinks:'Drinks', breakfast:'Breakfast' };
    const tabContainer = document.getElementById('menuTabs');

    tabSections.forEach(id => {
        const btn = document.createElement('button');
        btn.className = 'tab-button';
        btn.id = `tab-${id}`;
        btn.setAttribute('role','tab');
        btn.setAttribute('aria-controls', id);
        btn.setAttribute('aria-selected','false');
        btn.textContent = titles[id];
        tabContainer.appendChild(btn);
    });

    const panels = [...document.querySelectorAll('.menu-section')];
    const tabs = [...document.querySelectorAll('.tab-button')];

    function show(id) {
        panels.forEach(p => p.classList.toggle('active', p.id === id));
        panels.forEach(p => p.setAttribute('hidden', p.id !== id));
        tabs.forEach(t => {
        const active = t.id === `tab-${id}`;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
        });
        //document.getElementById(id).focus();
    }

    // Keyboard support
    tabContainer.addEventListener('keydown', (e) => {
        const i = tabs.findIndex(t => t.classList.contains('active'));
        if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) e.preventDefault();
        if (e.key === 'ArrowRight') tabs[(i+1) % tabs.length].click();
        if (e.key === 'ArrowLeft') tabs[(i-1+tabs.length) % tabs.length].click();
        if (e.key === 'Home') tabs[0].click();
        if (e.key === 'End') tabs[tabs.length-1].click();
    });

    tabContainer.addEventListener('click', (e) => {
        if (e.target.matches('.tab-button')) show(e.target.id.replace('tab-',''));
    });

    // Default
    show(tabSections[0]);

    let showOverlay = false;
    const overlay = document.getElementById('overlay');
    const overlaybtn = document.getElementById('view-menu-overlay-btn');

    if (!overlay || !overlaybtn) return;

    if(!showOverlay){
        overlay.style.display='none';
        return;
    };
    
    let time_remaining = 15;
    overlaybtn.disabled = true;
    overlaybtn.textContent = `View Menu ${time_remaining}s`;
    const timer = setInterval(()=>{  
        time_remaining -= 1;
        overlaybtn.textContent = `View Menu ${time_remaining}s`;
        if(time_remaining <= 0){
            clearInterval(timer);
            overlaybtn.textContent='View Menu';
            overlaybtn.disabled = false;
        }
    },1000);

    overlaybtn.addEventListener('click', ()=>{
        overlay.style.display='none';
        document.body.style.overflow = '';
    });

    document.body.style.overflow = 'hidden';

    });
