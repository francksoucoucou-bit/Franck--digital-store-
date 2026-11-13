const products = [
 {id:1,name:"Maîtriser les bases de l'ordinateur",category:"Informatique",description:"Un guide pratique pour débuter et apprendre les manipulations essentielles.",price:5000,icon:"💻",tag:"GUIDE INFORMATIQUE"},
 {id:2,name:"Excel : du débutant à l'expert",category:"Ebooks",description:"Apprenez Excel avec des explications, astuces et exercices pratiques.",price:7500,icon:"📊",tag:"EBOOK EXCEL"},
 {id:3,name:"155 prompts pour vos photos IA",category:"Prompts IA",description:"Des idées de prompts pour créer et améliorer vos photos avec l'IA.",price:3500,icon:"✨",tag:"PACK DE PROMPTS"},
 {id:4,name:"Pack de prompts professionnels",category:"Prompts IA",description:"Des prompts pour la création, la communication et vos projets.",price:5000,icon:"🤖",tag:"INTELLIGENCE ARTIFICIELLE"},
 {id:5,name:"Créer ses documents professionnels",category:"Formations",description:"Une ressource pour mieux présenter vos documents et vos projets.",price:6000,icon:"📚",tag:"FORMATION NUMÉRIQUE"},
 {id:6,name:"Guide pratique des outils numériques",category:"Ebooks",description:"Découvrez des méthodes simples pour gagner du temps au quotidien.",price:4000,icon:"📖",tag:"GUIDE PRATIQUE"}
];
let cart = [];
let activeCategory = "Tous";
const money = n => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
const grid = document.getElementById("productGrid");
function renderProducts(){
 const q = document.getElementById("searchInput").value.toLowerCase().trim();
 const shown = products.filter(p => (activeCategory==="Tous" || p.category===activeCategory) && (p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)));
 grid.innerHTML = shown.length ? shown.map(p=>`<article class="product-card"><div class="product-visual"><span class="visual-icon">${p.icon}</span><small>${p.tag}</small></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">Ajouter au panier +</button></div></div></article>`).join("") : '<p class="no-results">Aucun produit ne correspond à votre recherche.</p>';
 grid.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();openCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=money(total);
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map(x=>{const p=products.find(z=>z.id===x.id);return `<div class="cart-row"><span>${p.name}<br><small>${x.qty} × ${money(p.price)}</small></span><b>${money(p.price*x.qty)}</b><button data-remove="${p.id}">Retirer</button></div>`}).join(""):'<p class="empty">Votre panier est vide pour le moment.</p>';
 box.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(x=>x.id!==Number(b.dataset.remove));renderCart()}));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()}));
document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!cart.length){alert("Votre panier est vide.");return;}closeCart();document.getElementById("noticeModal").classList.add("show");document.getElementById("overlay").classList.add("show")});
document.getElementById("closeNotice").addEventListener("click",()=>{document.getElementById("noticeModal").classList.remove("show");document.getElementById("overlay").classList.remove("show")});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
