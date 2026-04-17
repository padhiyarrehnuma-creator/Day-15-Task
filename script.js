let imgs=[
"slider1.jpeg",
"slider2.jpeg",
"slider3.jpeg"
];
let i=0;
function show(){sliderImg.src=imgs[i];}
function nextSlide(){i=(i+1)%imgs.length;show();}
function prevSlide(){i=(i-1+imgs.length)%imgs.length;show();}
setInterval(nextSlide,3000);show();

/* DATA */
let data={
"Clothing":[
{name:"T-Shirt",price:499,img:"casual T-shirt.jpeg",discount:"10% OFF"},
{name:"Shirt",price:799,img:"Shirts.png",discount:"15% OFF"},
{name:"Hoodie",price:1299,img:"hoodies.png",discount:"20% OFF"},
{name:"Jacket",price:1599,img:"jacket.png",discount:"25% OFF"}
],

"Traditional":[
{name:"Saree",price:999,img:"saree.png",discount:"30% OFF"},
{name:"Kurti",price:699,img:"kurti.png",discount:"18% OFF"},
{name:"Lehenga",price:2499,img:"lehenga.png",discount:"22% OFF"},
{name:"Suit",price:899,img:"kurti set.png",discount:"12% OFF"}
],

"Party":[
{name:"Gown",price:1999,img:"gown.png",discount:"35% OFF"},
{name:"Blazer",price:1799,img:"blazer.png",discount:"28% OFF"},
{name:"Jumpsuit",price:999,img:"jumpsuit.png",discount:"14% OFF"},
{name:"ethnic suits",price:799,img:"ethnic suits.png",discount:"16% OFF"}
],

"Short Dress":[
{name:"Mini",price:699,img:"mini dress.png",discount:"20% OFF"},
{name:"Floral",price:799,img:"floral.png",discount:"25% OFF"},
{name:"Bodycon",price:899,img:"bodycon.png",discount:"18% OFF"},
{name:"Skater",price:999,img:"skater.png",discount:"22% OFF"}
],

"Jeans":[
{name:"Skinny jeans",price:999,img:"skinny jeans.png",discount:"15% OFF"},
{name:"Mom jeans",price:1199,img:"mom jeans.png",discount:"20% OFF"},
{name:"Crop Top",price:599,img:"crop top.png",discount:"10% OFF"},
{name:"Tank Top",price:499,img:"tank top.png",discount:"12% OFF"}
],

"Jewellery":[
{name:"Necklace",price:499,img:"necklace.png",discount:"30% OFF"},
{name:"Ring",price:299,img:"ring.png",discount:"15% OFF"},
{name:"Bracelet",price:399,img:"bracelet.png",discount:"18% OFF"},
{name:"Earrings",price:199,img:"earring.png",discount:"12% OFF"}
],

"Makeup":[
{name:"Lipstick",price:299,img:"lipstick.png",discount:"20% OFF"},
{name:"Blush",price:399,img:"blush.png",discount:"18% OFF"},
{name:"Mascara",price:499,img:"mascara.png",discount:"25% OFF"},
{name:"Foundation",price:599,img:"foundation.png",discount:"22% OFF"}
],

"Footwear":[
{name:"Sneakers",price:1299,img:"sneaker.png",discount:"20% OFF"},
{name:"Boots",price:1599,img:"boots.png",discount:"25% OFF"},
{name:"Sandals",price:699,img:"sandals.png",discount:"10% OFF"},
{name:"Heels",price:399,img:"heels.png",discount:"8% OFF"}
]
};

let cart=[],wishlist=[],search="",currentCat="all";

/* LOAD */
function load(){
let html="";
for(let c in data){
if(currentCat!=="all" && currentCat!==c) continue;

let arr=data[c].filter(p=>!search||p.name.toLowerCase().includes(search));
if(!arr.length) continue;

html+=`<h2>${c}</h2><div class="grid">`;

arr.forEach(p=>{
html+=`
<div class="card">
<div class="badge">${p.discount}</div>
<div class="wishlist" onclick="toggleWish(this,'${p.name}')">❤</div>

<img src="${p.img}" onclick="openProduct('${p.name}')">

<h3>${p.name}</h3>
<div class="price">₹${p.price}</div>

<div class="rating">
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
</div>

<div class="qty">
<button onclick="changeQty(this,-1)">-</button>
<span>1</span>
<button onclick="changeQty(this,1)">+</button>
</div>

<div class="btn-group">
<button class="add" onclick="addCart('${p.name}')">Add</button>
<button class="buy" onclick="buyNow()">Buy</button>
</div>
</div>`;
});

html+="</div>";
}
products.innerHTML=html;
}
load();

/* SEARCH + FILTER */
function searchProduct(v){search=v.toLowerCase();currentCat="all";load();}
function filterCat(c){currentCat=c;search="";load();}
function toggleSearch(){searchBox.style.display=searchBox.style.display==="block"?"none":"block";}

/* CART */
function addCart(p){cart.push(p);cartCount.innerText=cart.length;}
function openCart(){
cartList.innerHTML=cart.map((i,idx)=>`<div class="list-item">${i}<button class="remove-btn" onclick="removeCart(${idx})">X</button></div>`).join("")||"Empty";
cartModal.style.display="flex";
}
function removeCart(i){cart.splice(i,1);cartCount.innerText=cart.length;openCart();}
function closeCart(){cartModal.style.display="none";}

/* WISHLIST */
function toggleWish(el,p){
el.classList.toggle("active");
wishlist.includes(p)?wishlist=wishlist.filter(i=>i!==p):wishlist.push(p);
wishCount.innerText=wishlist.length;
}
function openWishlist(){
wishList.innerHTML=wishlist.map((i,idx)=>`<div class="list-item">${i}<button class="remove-btn" onclick="removeWish(${idx})">X</button></div>`).join("")||"Empty";
wishModal.style.display="flex";
}
function removeWish(i){wishlist.splice(i,1);wishCount.innerText=wishlist.length;openWishlist();}
function closeWish(){wishModal.style.display="none";}

/* PRODUCT POPUP */
function openProduct(p){
productModal.style.display="flex";
pTitle.innerText=p;
pDesc.innerText="High quality "+p;
}
function closeProduct(){productModal.style.display="none";}
function saveComment(){savedComment.innerText=commentBox.value;}

/* BUY */
function buyNow(){buyModal.style.display="flex";}
function closeBuy(){buyModal.style.display="none";}

/* QTY */
function changeQty(el,val){
let s=el.parentElement.querySelector("span");
let n=parseInt(s.innerText)+val;
if(n<1)n=1;
s.innerText=n;
}

/* RATING */
function rate(el){
let stars=el.parentElement.children;
for(let i=0;i<stars.length;i++) stars[i].classList.remove("active");
for(let i=0;i<=Array.from(stars).indexOf(el);i++) stars[i].classList.add("active");
}