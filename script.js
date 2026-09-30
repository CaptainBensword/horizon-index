const pages = [
  ["Spawn Encyclopedia","spawn.html"],
  ["Locations","locations.html"],
  ["World History","history.html"],
  ["Aether","aether.html"],
  ["Relics","relics.html"],
  ["Timeline","timeline.html"],
  ["Books","books.html"]
];

function toggleMenu(){
  document.getElementById("nav")?.classList.toggle("open");
}

function searchSite(value){
  const box=document.getElementById("search-results");
  if(!box) return;
  const q=value.trim().toLowerCase();
  if(!q){box.innerHTML="";return;}
  const matches=pages.filter(p=>p[0].toLowerCase().includes(q));
  box.innerHTML=matches.length
    ? matches.map(p=>`<a class="result" href="${p[1]}">${p[0]} <small>SECTION</small></a>`).join("")
    : `<div class="result">No indexed sections match “${value}”.</div>`;
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if(!motionQuery.matches){
  // Small pointer glow makes the interface feel responsive without distracting from the content.
  document.addEventListener('pointermove', e=>{
    document.documentElement.style.setProperty('--pointer-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${e.clientY}px`);
  }, {passive:true});

  // Subtle card physics: a few degrees of tilt and a few pixels of movement.
  document.querySelectorAll('.card, .fact-card, .entry-row').forEach(el=>{
    el.addEventListener('pointermove', e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--mx', `${(x*5).toFixed(2)}px`);
      el.style.setProperty('--my', `${(y*4).toFixed(2)}px`);
      el.style.setProperty('--rx', `${(-y*2.1).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x*2.5).toFixed(2)}deg`);
    });
    el.addEventListener('pointerleave', ()=>{
      el.style.setProperty('--mx','0px');
      el.style.setProperty('--my','0px');
      el.style.setProperty('--rx','0deg');
      el.style.setProperty('--ry','0deg');
    });
  });
}

// Add lightweight visual layers without changing page content.
const glow=document.createElement('div');
glow.className='page-glow';
document.body.appendChild(glow);
const scan=document.createElement('div');
scan.className='scan-line';
document.body.appendChild(scan);
