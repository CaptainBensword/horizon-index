const pages = [
  ["Characters","characters.html"],["Spawn Encyclopedia","spawn.html"],
  ["Locations","locations.html"],["World History","history.html"],
  ["Aether","aether.html"],["Relics","relics.html"],
  ["Timeline","timeline.html"],["Books","books.html"]
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
