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

// Subtle pointer physics: cards follow the cursor by a few pixels, then settle back smoothly.
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if(!motionQuery.matches){
  document.querySelectorAll('.spawn-entry, .card, .fact-card').forEach(el=>{
    el.addEventListener('pointermove', e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--mx', `${(x*5).toFixed(2)}px`);
      el.style.setProperty('--my', `${(y*4).toFixed(2)}px`);
    });
    el.addEventListener('pointerleave', ()=>{
      el.style.setProperty('--mx','0px');
      el.style.setProperty('--my','0px');
    });
  });
}
