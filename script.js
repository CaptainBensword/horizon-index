const pages = [
  ["Spawn Encyclopedia","spawn.html","Browse confirmed Spawn records."],
  ["Locations","locations.html","Places and regions documented in the series."],
  ["World History","history.html","Confirmed historical information from Horizon."],
  ["Aether","aether.html","The dedicated archive for confirmed Aether information."],
  ["Relics","relics.html","Confirmed Relic information."],
  ["Timeline","timeline.html","A chronological archive for documented events."],
  ["Books","books.html","The official Horizon book archive."]
];

const spawnRecords = [
  ["Bonebacks","spawn-bonebacks.html","Large armored Spawn with overlapping organic bone plates, a heavy build, horned heads, chunky insect-like legs, and a compact body."],
  ["Tideclaws","spawn-tideclaws.html","Aquatic Spawn with broad bodies and powerful clawed limbs, commonly found around rocky coastlines and shallow waters."],
  ["Mirewalkers","spawn-mirewalkers.html","Long-legged swamp Spawn whose bodies remain above the water while their feet barely disturb the mud."],
  ["Metalmaws","spawn-metalmaws.html","Heavy cat-like predators with dark, rough skin and massive claws coated in metal or other minerals."],
  ["Sky Rays","spawn-sky-rays.html","Huge manta-like flying Spawn that live high above the clouds, glide on air currents, and are known to be harmless and helpful to people."],
  ["Bramblebacks","spawn-bramblebacks.html","Low, heavily built Spawn with thick natural growths along their backs, associated with dense forests and vegetation."],
  ["Glasswings","spawn-glasswings.html","Lightweight flying Spawn with broad translucent wings, active around bright open areas."],
  ["Burrowers","spawn-burrowers.html","Stocky underground Spawn with reinforced heads and powerful digging limbs that create tunnels."],
  ["Frosthorns","spawn-frosthorns.html","Large cold-weather Spawn with thick hides and prominent horns, adapted to freezing environments and snow."],
  ["Dusk Stalkers","spawn-dusk-stalkers.html","Quiet nocturnal Spawn that rely heavily on their senses and are rarely seen during daylight."],
  ["Deepmaw","spawn-deepmaw.html","An enormous deep-ocean Spawn with black skin and a massive Venus flytrap-like body. It can swallow entire ships and produces a deep, eerie sound that can be heard through the ocean."]
];

const relicRecords = [
  ["Blaise's First Relic", "relics.html#blaise-first-relic", "A Relic that boosts Blaise's speed and perception, with a drawback after about four minutes."],
  ["Thunder", "relics.html#thunder", "A very strong Legend Relic bonded to Rowan, with a full mind inside Rowan's head."],
  ["Leyl", "relics.html#leyl", "An extremely powerful Relic that always has a master and usually kills its masters."],
  ["Lirium", "relics.html#leyl", "The red version created when Blaise later purifies Leyl."],
  ["Havoc", "relics.html#havoc", "King Dread's mace Relic."],
  ["Loyal Glaive", "relics.html#loyal-glaive", "Elaira's Relic, capable of suppressing most Relics."],
  ["Hunter's Bow", "relics.html#hunters-bow", "Elliot's spider-themed bow that can generate many different types of arrow tips."]
];

function toggleMenu(){
  document.getElementById("nav")?.classList.toggle("open");
}

function searchSite(value){
  const box=document.getElementById("search-results");
  if(!box) return;
  const q=value.trim().toLowerCase();
  if(!q){box.innerHTML="";return;}

  const sectionMatches=pages.filter(p=>`${p[0]} ${p[2]}`.toLowerCase().includes(q));
  const spawnMatches=spawnRecords.filter(p=>`${p[0]} ${p[2]}`.toLowerCase().includes(q));
  const relicMatches=relicRecords.filter(p=>`${p[0]} ${p[2]}`.toLowerCase().includes(q));
  const results=[
    ...sectionMatches.map(p=>({name:p[0],url:p[1],kind:"SECTION",desc:p[2]})),
    ...spawnMatches.map(p=>({name:p[0],url:p[1],kind:"SPAWN",desc:p[2]})),
    ...relicMatches.map(p=>({name:p[0],url:p[1],kind:"RELIC",desc:p[2]}))
  ];

  if(!results.length){
    box.innerHTML=`<div class="result result-empty">No confirmed Horizon records match “${escapeHtml(value)}”.</div>`;
    return;
  }

  box.innerHTML=results.slice(0,12).map(r=>
    `<a class="result result-rich" href="${r.url}"><span><strong>${escapeHtml(r.name)}</strong><small>${r.kind}</small></span><em>${escapeHtml(r.desc)}</em></a>`
  ).join("");
}

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g, char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if(!motionQuery.matches){
  document.addEventListener('pointermove', e=>{
    document.documentElement.style.setProperty('--pointer-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${e.clientY}px`);
  }, {passive:true});

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

const glow=document.createElement('div');
glow.className='page-glow';
document.body.appendChild(glow);
const scan=document.createElement('div');
scan.className='scan-line';
document.body.appendChild(scan);

// Interactive timeline: uses confirmed Horizon world-history information only.
const timeline = document.querySelector('[data-interactive-timeline]');
if(timeline){
  const markers=[...timeline.querySelectorAll('.timeline-marker')];
  const title=timeline.querySelector('[data-timeline-title]');
  const body=timeline.querySelector('[data-timeline-body]');
  const position=timeline.querySelector('[data-timeline-position]');
  const track=timeline.querySelector('.timeline-track');

  function selectMarker(index){
    const marker=markers[index];
    if(!marker) return;
    markers.forEach((item,i)=>item.classList.toggle('selected',i===index));
    title.textContent=marker.dataset.title;
    body.textContent=marker.dataset.body;
    position.textContent=marker.dataset.position;
    timeline.style.setProperty('--timeline-progress', `${index/(markers.length-1)*100}%`);
  }

  markers.forEach((marker,index)=>marker.addEventListener('click',()=>selectMarker(index)));

  if(track){
    track.addEventListener('pointerdown', event=>{
      if(event.target.closest('.timeline-marker')) return;
      const update=e=>{
        const rect=track.getBoundingClientRect();
        const ratio=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
        selectMarker(Math.round(ratio*(markers.length-1)));
      };
      update(event);
      const move=e=>update(e);
      const stop=()=>{
        window.removeEventListener('pointermove',move);
        window.removeEventListener('pointerup',stop);
      };
      window.addEventListener('pointermove',move);
      window.addEventListener('pointerup',stop,{once:true});
    });
  }

  selectMarker(0);
}
