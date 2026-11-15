"use strict";
const CATEGORIES=[{id:"all",name:"Todas"},{id:"maquillaje",name:"Maquillaje"},{id:"unas",name:"Uñas"},{id:"vestidos-de-bano",name:"Vestidos de baño"},{id:"ropa-basica",name:"Ropa básica"},{id:"regalos",name:"Regalos personalizados"}];
const $=s=>document.querySelector(s);
const escapeHTML=value=>String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const catalog=window.ILUMINATE_CATALOG||{products:[],combos:[]};
let activeCategory="all";
const filters=$("#category-filters"),results=$("#catalog-results"),search=$("#catalog-search");
function renderFilters(){filters.innerHTML=CATEGORIES.map(c=>'<button class="filter-btn" type="button" data-filter="'+c.id+'" aria-pressed="'+String(activeCategory===c.id)+'">'+c.name+'</button>').join("");}
function renderCatalog(){
  const term=search.value.toLocaleLowerCase("es-CO").trim();
  const items=(Array.isArray(catalog.products)?catalog.products:[]).filter(p=>p&&p.available===true&&typeof p.name==="string"&&typeof p.category==="string"&&CATEGORIES.some(c=>c.id===p.category)&&Number.isFinite(p.priceCOP)&&p.priceCOP>=0).filter(p=>(activeCategory==="all"||p.category===activeCategory)&&(!term||(p.name+" "+(p.description||"")).toLocaleLowerCase("es-CO").includes(term)));
  if(!items.length){results.innerHTML='<div class="empty-state"><span class="star" aria-hidden="true">✳</span><h3>'+ (term?"Aún no encontramos coincidencias.":"Algo bonito está por llegar.") +'</h3><p>'+ (term?"Prueba con otra búsqueda o categoría. El catálogo se irá actualizando con información confirmada.":"Estamos preparando el catálogo de esta línea. Publicaremos artículos y precios únicamente cuando estén confirmados.") +'</p></div>';return;}
  const money=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});
  results.style.display="grid";results.style.gridTemplateColumns="repeat(auto-fit,minmax(min(100%,220px),1fr))";results.style.gap="17px";
  results.innerHTML=items.map(p=>{const safeImage=typeof p.image==="string"&&/^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(p.image)?p.image:null;return '<article class="product-card"><div class="product-art">'+(safeImage?'<img src="'+escapeHTML(safeImage)+'" alt="'+escapeHTML(p.name)+'" loading="lazy">':'<span>ILUMINATE ✳</span>')+'</div><div class="product-info"><span class="product-category">'+escapeHTML(CATEGORIES.find(c=>c.id===p.category).name)+'</span><h3>'+escapeHTML(p.name)+'</h3><p>'+escapeHTML(p.description||"")+'</p><div class="product-price">'+money.format(p.priceCOP)+'</div></div></article>';}).join("");
}
filters.addEventListener("click",e=>{const button=e.target.closest("[data-filter]");if(!button)return;activeCategory=button.dataset.filter;renderFilters();renderCatalog();});
search.addEventListener("input",renderCatalog);
document.querySelectorAll("[data-category-link]").forEach(a=>a.addEventListener("click",()=>{activeCategory=a.dataset.categoryLink;search.value="";renderFilters();renderCatalog();}));
renderFilters();renderCatalog();
const menu=$("#menu-toggle"),nav=$("#primary-nav");
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");nav.classList.toggle("open",open);});
nav.addEventListener("click",e=>{if(e.target.closest("a")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Abrir menú");}});
const kitOptions=$("#kit-options");
kitOptions.innerHTML=CATEGORIES.filter(c=>c.id!=="all").map(c=>'<label class="kit-option"><input type="checkbox" value="'+c.id+'" name="kit-category"> <span>'+c.name+'</span></label>').join("");
const kitForm=$("#kit-form"),kitOutput=$("#kit-output"),kitSummary=$("#kit-summary"),copyStatus=$("#copy-status");
const consultKit=document.querySelector("#consult-kit");
kitForm.addEventListener("submit",e=>{e.preventDefault();const selected=[...kitOptions.querySelectorAll("input:checked")].map(i=>CATEGORIES.find(c=>c.id===i.value).name);const occasion=$("#kit-occasion").value.trim();const message=$("#kit-message").value.trim();if(!selected.length){kitOptions.querySelector("input").focus();kitOptions.setCustomValidity?.("");alert("Selecciona por lo menos una línea para crear la idea de tu kit.");return;}const summary=["ILUMINATE — Idea de kit personalizado","Líneas de interés: "+selected.join(", "),"Ocasión: "+(occasion||"Sin especificar"),"Detalles: "+(message||"Sin especificar"),"","Esta es una idea, no un pedido ni una cotización. Disponibilidad y precios pendientes de confirmación."].join("\n");kitSummary.textContent=summary;consultKit.href="https://wa.me/573132722075?text="+encodeURIComponent("Hola, ILUMINATE. Quiero consultar sobre esta idea de kit:\n\n"+summary);kitOutput.hidden=false;copyStatus.textContent="";kitOutput.focus();});
$("#copy-kit").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(kitSummary.textContent);copyStatus.textContent="Copiado."; }catch{copyStatus.textContent="Selecciona el texto y cópialo manualmente."; }});
$("#year").textContent=String(new Date().getFullYear());
