
const records = [
 ["Spawn","spawn.html","Species and documented Spawn records."],
 ["Aether","aether.html","Aether Shards, Essence, and Cores."],
 ["Relics","relics.html","Confirmed Relic records."],
 ["Locations","locations.html","Places and regions on record."],
 ["History","history.html","Historical records and events."],
 ["Timeline","timeline.html","Chronological world history."],
 ["Books","books.html","The Horizon book archive."]
];
function toggleMenu(){document.getElementById("nav")?.classList.toggle("open")}
function searchSite(q){
 const box=document.getElementById("search-results"); if(!box)return;
 q=q.trim().toLowerCase(); if(!q){box.innerHTML="";return}
 const hits=records.filter(r=>(r[0]+" "+r[2]).toLowerCase().includes(q));
 box.innerHTML=hits.length?hits.map(r=>`<a href="${r[1]}"><strong>${r[0]}</strong><br><span style="color:#8f98a5">${r[2]}</span></a>`).join(""):`<div class="notice">No matching records found.</div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
 const page=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll("nav a").forEach(a=>{if(a.getAttribute("href")===page)a.classList.add("active")});
 document.querySelectorAll(".tilt").forEach(el=>{
  el.addEventListener("pointermove",e=>{
   if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   el.style.transform=`perspective(700px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-3px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
 });
});
