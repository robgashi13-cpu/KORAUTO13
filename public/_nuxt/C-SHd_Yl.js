const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Bbi9SLFd.js","./DxBwLu-2.js","./entry.71P1jcYi.css","./useCatalogCardMediaState.C6dpt1aW.css"])))=>i.map(i=>d[i]);
import{_ as V}from"./DxBwLu-2.js";const E=n=>/\.(mp4|m4v|webm|ogg|ogv|mov)(\?|#|$)/i.test(n),X=n=>/\.(avif|bmp|gif|jpe?g|png|svg|webp)(\?|#|$)/i.test(n),P=n=>typeof n=="string"?n.trim():"",u=n=>Array.isArray(n)?Array.from(new Set(n.map(i=>P(i)).filter(Boolean))):[],j=n=>n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),h=n=>{const i=P(n);return!(!i||!/^https?:\/\//i.test(i)||X(i)||E(i))},S=(n,i)=>{const d=u(n).filter(m=>/^https?:\/\//i.test(m));if(d.length<2)return"";const g=j(i),v=JSON.stringify(d).replaceAll("<","\\u003c"),p="<\/script>",y=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${g}</title>
<style>
@import url("https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400..900&display=swap");
html,body{height:100%;margin:0;background:#020617;color:#fff;font-family:"Mona Sans",Arial,sans-serif;overflow:hidden}
.viewer{position:relative;height:100%;background:#020617;touch-action:none;user-select:none;cursor:grab}
.viewer.is-dragging{cursor:grabbing}
.stage{position:absolute;inset:0;display:grid;place-items:center}
img{max-width:100%;max-height:100%;object-fit:contain;display:block;pointer-events:none;-webkit-user-drag:none;user-select:none}
.controls{position:absolute;left:50%;bottom:22px;display:flex;align-items:center;gap:10px;transform:translateX(-50%);border:1px solid rgba(255,255,255,.14);border-radius:20px;background:rgba(8,15,28,.72);padding:9px;box-shadow:0 22px 60px rgba(0,0,0,.42);backdrop-filter:blur(18px)}
.control-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:rgba(255,255,255,.92);color:#0a2540;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.72),0 8px 20px rgba(0,0,0,.18);transition:background .16s ease,border-color .16s ease,box-shadow .16s ease,color .16s ease}
.control-button:hover{background:#fff;border-color:#fff;color:#007BFF;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 10px 24px rgba(0,0,0,.24)}
.control-button:focus-visible{outline:3px solid rgba(0,123,255,.38);outline-offset:2px}
.control-button svg{width:18px;height:18px}
.play{width:48px;background:#007BFF;color:#fff;border-color:#007BFF}
.play:hover{background:#006FE8;color:#fff;border-color:#007BFF}
.count{min-width:72px;border-left:1px solid rgba(255,255,255,.12);padding-left:12px;text-align:center;font-size:13px;font-weight:700;color:#e5edf8}
.hint{position:absolute;left:50%;bottom:88px;display:inline-flex;align-items:center;gap:7px;transform:translateX(-50%);border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(8,15,28,.66);padding:8px 12px;font-size:12px;font-weight:600;color:#e5edf8;box-shadow:0 12px 30px rgba(0,0,0,.22);backdrop-filter:blur(14px);pointer-events:none}
.hint svg{width:15px;height:15px;color:#8FC8FF}
.loader{position:absolute;inset:0;display:grid;place-items:center;background:#020617;color:#EAF4FF;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.is-ready .loader{display:none}
@media(max-width:640px){.controls{bottom:14px;gap:7px;padding:7px;border-radius:16px}.hint{bottom:76px}.control-button{width:36px;height:36px;border-radius:12px}.play{width:42px}.count{min-width:58px;padding-left:8px;font-size:12px}}
</style>
</head>
<body>
<div class="viewer" id="viewer">
<div class="stage"><img id="photo" alt="${g}" draggable="false"></div>
<div class="hint"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7.5 4.5 11 8 14.5M16 7.5l3.5 3.5L16 14.5M5 11h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Drag to rotate</div>
<div class="controls" id="controls">
<button id="prev" class="control-button" type="button" aria-label="Previous frame"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14.5 7-5 5 5 5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<button id="play" class="control-button play" type="button" aria-label="Play or pause rotation"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor"/></svg></button>
<button id="next" class="control-button" type="button" aria-label="Next frame"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9.5 7 5 5-5 5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<span class="count" id="count"></span>
</div>
<div class="loader" id="loader">Loading 360</div>
</div>
<script type="application/json" id="frames">${v}${p}
<script>
const frames = JSON.parse(document.getElementById('frames').textContent || '[]');
const viewer = document.getElementById('viewer');
const photo = document.getElementById('photo');
const count = document.getElementById('count');
const controls = document.getElementById('controls');
const playButton = document.getElementById('play');
const cache = [];
let index = 0;
let loaded = 0;
let startX = 0;
let startIndex = 0;
let dragging = false;
let playing = false;
let timer = 0;
const playDelay = 120;
const normalize = (next) => ((next % frames.length) + frames.length) % frames.length;
const show = (next) => {
  if (!frames.length) return;
  index = normalize(next);
  photo.src = frames[index];
  count.textContent = (index + 1) + ' / ' + frames.length;
};
const step = (amount) => show(index + amount);
const playIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor"/></svg>';
const pauseIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7h3v10H8V7Zm5 0h3v10h-3V7Z" fill="currentColor"/></svg>';
const setPlaying = (next) => {
  playing = next;
  playButton.innerHTML = playing ? pauseIcon : playIcon;
  clearInterval(timer);
  if (playing) timer = setInterval(() => step(1), playDelay);
};
const stopAutoplay = () => {
  if (playing) setPlaying(false);
};
const toggle = () => setPlaying(!playing);
controls.addEventListener('pointerdown', (event) => event.stopPropagation());
controls.addEventListener('click', (event) => event.stopPropagation());
document.getElementById('prev').addEventListener('click', () => step(-1));
document.getElementById('next').addEventListener('click', () => step(1));
playButton.addEventListener('click', toggle);
viewer.addEventListener('pointerdown', (event) => {
  stopAutoplay();
  dragging = true;
  startX = event.clientX;
  startIndex = index;
  viewer.classList.add('is-dragging');
  viewer.setPointerCapture(event.pointerId);
});
viewer.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  show(startIndex + Math.round((event.clientX - startX) / 8));
});
viewer.addEventListener('pointerup', (event) => {
  dragging = false;
  viewer.classList.remove('is-dragging');
  if (viewer.hasPointerCapture(event.pointerId)) viewer.releasePointerCapture(event.pointerId);
});
viewer.addEventListener('pointercancel', () => {
  dragging = false;
  viewer.classList.remove('is-dragging');
});
viewer.addEventListener('wheel', (event) => {
  event.preventDefault();
  stopAutoplay();
  step(event.deltaY > 0 ? 1 : -1);
}, { passive: false });
frames.forEach((src, frameIndex) => {
  const image = new Image();
  cache[frameIndex] = image;
  image.onload = () => {
    loaded += 1;
    if (loaded === 1) {
      viewer.classList.add('is-ready');
      setPlaying(true);
    }
  };
  image.onerror = () => {
    loaded += 1;
    if (loaded === frames.length && !viewer.classList.contains('is-ready')) document.getElementById('loader').textContent = '360 unavailable';
  };
  image.src = src;
});
show(0);
${p}
</body>
</html>`;return`data:text/html;charset=utf-8,${encodeURIComponent(y)}`},N=({catalogCarImages:n,activeImageIndex:i})=>{let d=null;const g=e=>!!(e.videoUrl||e.youtubeId),v=e=>`https://www.youtube.com/watch?v=${encodeURIComponent(e)}`,p=e=>e.youtubeId?v(e.youtubeId):e.videoUrl,y=e=>{const t=p(e);if(!(!t||e.youtubeId||E(t)))return"iframe"},m=e=>`catalog-${e.id}`,B=e=>n(e).map((t,o)=>({src:t,index:o})).filter(t=>t.index!==i(e)),A=e=>h(e.panoramaUrl)||h(e.interiorPanoramaUrl)?!0:u(e.exteriorPanoramaFrames).length>1||u(e.interiorPanoramaFrames).length>1,x=e=>{const o=[{key:"exterior-360",src:h(e.panoramaUrl)?e.panoramaUrl:S(u(e.exteriorPanoramaFrames),"360 Exterior")},{key:"interior-360",src:h(e.interiorPanoramaUrl)?e.interiorPanoramaUrl:S(u(e.interiorPanoramaFrames),"360 Interior")}].filter((r,s,c)=>r.src&&c.findIndex(l=>l.src===r.src)===s)[0];return o?[o]:[]},U=e=>x(e)[0]?.src||"",w=e=>{const t=e.toLowerCase();if(t){if(t.includes("youtube")||t.includes("video")||t.includes("mediaretriever"))return"video";if(t.includes("threesixty")||t.includes("360")||t.includes("panorama")||t.startsWith("data:text/html"))return"panorama"}},$=e=>e==="video"?16/9:4/3,I=(e,t)=>{if(e.classList.toggle("is-video-media",t==="video"),e.classList.toggle("is-panorama-media",t==="panorama"),t!=="video"&&t!=="panorama"){e.style.removeProperty("width"),e.style.removeProperty("height");return}if(typeof window>"u")return;const o=window.innerWidth,r=window.innerHeight,s=o<768,c=s?20:160,l=s?138:176,f=Math.max(320,o-c),H=Math.max(260,r-l),C=$(t),O=f/C,M=Math.min(H,O),R=Math.min(f,M*C);e.style.width=`${Math.round(R)}px`,e.style.height=`${Math.round(M)}px`},k=e=>{const t=e,o=t.el?.querySelector?.(".f-html");if(!(o instanceof HTMLElement))return;const r=t.el?.querySelector?.("iframe")?.getAttribute("src")||"",s=t.triggerEl?.getAttribute("href")||"",c=t.triggerEl?.dataset?.mediaKind||w(r||s);I(o,c)},b=()=>{typeof document>"u"||document.querySelectorAll(".catalog-fancybox .f-html").forEach(e=>{const t=e.querySelector("iframe")?.getAttribute("src")||"",o=e.querySelector("video source")?.getAttribute("src")||"",r=e.classList.contains("is-video-media")?"video":e.classList.contains("is-panorama-media")?"panorama":w(t||o);r&&I(e,r)})},a=()=>{typeof window>"u"||(requestAnimationFrame(b),window.setTimeout(b,80),window.setTimeout(b,220))},F=e=>{const t=e.target;!(t instanceof Element)||!t.closest(".catalog-fancybox")||a()},z=(e,t)=>{if(typeof document>"u")return;const o=t==="panorama"?x(e)[0]?.key:"";if(!o)return;const r=document.querySelector(`a[data-gallery-media="${o}"][data-fancybox="${m(e)}"]`);r&&(r.click(),a())},q=async(e,t=0)=>{if(typeof window>"u")return;const o=n(e);if(!o.length)return;const r=Math.min(Math.max(Number(t)||0,0),Math.max(o.length-1,0)),s=o.map(l=>({src:l,thumbSrc:l})),{Fancybox:c}=await V(async()=>{const{Fancybox:l}=await import("./Bbi9SLFd.js").then(f=>f.i);return{Fancybox:l}},__vite__mapDeps([0,1,2,3]),import.meta.url);c.show(s,{...L,startIndex:r}),a()},T=()=>{typeof window>"u"||typeof document>"u"||(window.addEventListener("resize",a),document.addEventListener("click",F,!0),d=new MutationObserver(a),d.observe(document.body,{childList:!0,subtree:!0}))},_=()=>{typeof window<"u"&&typeof document<"u"&&(window.removeEventListener("resize",a),document.removeEventListener("click",F,!0)),d?.disconnect(),d=null},L={mainClass:"catalog-fancybox",Hash:!1,idle:!1,dragToClose:!1,on:{ready:()=>{a()},reveal:(e,t)=>{k(t),requestAnimationFrame(()=>k(t)),a()},done:()=>{a()},"Carousel.change":()=>{a()},"Carousel.selectSlide":()=>{a()}},Carousel:{Thumbs:{type:"classic",showOnStart:!0},Toolbar:{display:{left:["counter"],middle:[],right:["zoomIn","zoomOut","close"]}}},Video:{autoplay:!0}};return{hasVideo:g,videoSource:p,videoFancyboxType:y,fancyboxGroup:m,hiddenGalleryImages:B,hasPanorama:A,panoramaGalleryItems:x,primaryPanoramaSource:U,openCatalogMedia:z,openCatalogImageGallery:q,catalogFancyboxOptions:L,scheduleCatalogFancyboxMediaRefresh:a,attachCatalogFancyboxMediaLifecycle:T,detachCatalogFancyboxMediaLifecycle:_}};export{N as u};
