const pages = [
  ["Spawn", "spawn.html", "SYSTEM / 01"],
  ["Aether", "aether.html", "SYSTEM / 02"],
  ["Relics", "relics.html", "SYSTEM / 03"],
  ["Locations", "locations.html", "SYSTEM / 04"],
  ["History", "history.html", "SYSTEM / 05"],
  ["Timeline", "timeline.html", "SYSTEM / 06"],
  ["Books", "books.html", "SYSTEM / 07"]
];

function toggleMenu(){
  document.getElementById("nav")?.classList.toggle("open");
}

function searchSite(value){
  const box = document.getElementById("search-results");
  if(!box) return;
  const q = value.trim().toLowerCase();
  if(!q){ box.innerHTML = ""; return; }
  const matches = pages.filter(p => p[0].toLowerCase().includes(q));
  box.innerHTML = matches.length
    ? matches.map(p => `<a class="result" href="${p[1]}"><span>${p[0]}</span><small>${p[2]}</small></a>`).join("")
    : `<div class="result"><span>No indexed systems match “${escapeHtml(value)}”.</span><small>NO RESULT</small></div>`;
}

function escapeHtml(value){
  return value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
