import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
const totalH3 = document.querySelector("#carTotal");

function renderCartContents() {  
  const productList = document.querySelector(".product-list");

  if (!cartItems || cartItems.length === 0) {
    totalH3.classList.add("hide");
    productList.innerHTML = "<h2>Cart is empty!</h2>";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
    
    cartTotal();
  }
}

function removeProduct(product) {
  const updateCart = cartItems.filter(item => item.Id !== product);
  localStorage.setItem("so-cart", JSON.stringify(updateCart)); // JSON.strigify(updateCart)
}

function cartTotal() {
  totalH3.classList.remove("hide");
  let total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  totalH3.textContent = `Total: ${total}  `;
}

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
      <a href="" data-id="${item.Id}" class="cart-card__remove"> x </a>
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
    `;

  return newItem;
}

renderCartContents();
loadHeaderFooter();

document.querySelectorAll(".cart-card__remove").forEach( a => {
    a.addEventListener("click", function() {
      const id = this.getAttribute("data-id");
      removeProduct(id);
    });
  });

// TO TEST so-cart
/* 
[
{"Id":"989CG","NameWithoutBrand":"Talus Tent - 3-Person, 3-Season","Name":"The North Face Talus Tent - 3-Person, 3-Season","Image":"../images/tents/the-north-face-talus-tent-3-person-3-season-in-golden-oak-saffron-yellow~p~989cg_01~320.jpg","SizesAvailable":{},"Colors":[{"ColorCode":"01","ColorName":"Golden Oak/Saffron Yellow"}],"DescriptionHtmlSimple":"<strong>Closeout</strong>. Enjoy a fun night under stars with your favorite people in The North Face&#39;s Talus three-person tent, featuring durable construction with a roomy interior, an advanced DAC <a class=\"glossaryTermLink\" href=\"/featherlite~g~1835\" title=\"Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.\">Featherlite</a> NSL pole system and an easy to pitch design.","SuggestedRetailPrice":270,"Brand":{"Id":"1440","Name":"The North Face"},"ListPrice":179.99,"FinalPrice":179.99},
{"Id":"344YJ","NameWithoutBrand":"Rimrock Tent - 2-Person, 3-Season","Name":"Cedar Ridge Rimrock Tent - 2-Person, 3-Season","IsFamousBrand":false,"Image":"../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg","SizesAvailable":{},"Colors":[{"ColorCode":"01","ColorName":"Rust/Clay"}],"DescriptionHtmlSimple":"<strong><a class=\"glossaryTermLink\" href=\"/closeouts~g~2312\" title=\"Closeouts: - Closeouts are items that may be last year's model or color. While closeout items are often offered at discounted prices, the products themselves are always high quality. Closeout items can include anything from shoes, underwear and apparel, to rugs, tents and outdoor equipment. Closeouts are often a high percentage off the retail price.\">Closeouts</a></strong>. Lightweight and ready for adventure, this Cedar Ridge Rimrock tent boasts a weather-ready design that includes a tub-style floor and factory-sealed <a class=\"glossaryTermLink\" href=\"/rain-fly~g~2021\" title=\"Rain Fly: - Rain fly is an additional piece of fabric (attached or unattached) that is placed over the top of the tent to provide weatherproofness. The rain fly is usually made of polyester or nylon and is sometimes coated for additional water repellency.\">rain fly</a>.","SuggestedRetailPrice":89.99,"Brand":{"Id":"35027","Name":"Cedar Ridge"},"ListPrice":69.99,"FinalPrice":69.99},
{"Id":"985PR","NameWithoutBrand":"Alpine Guide Tent - 3-Person, 4-Season","Name":"The North Face Alpine Guide Tent - 3-Person, 4-Season","Image":"../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg","SizesAvailable":{},"Colors":[{"ColorCode":"01","ColorName":"Canary Yellow/High Rise Grey"}],"DescriptionHtmlSimple":"<strong>Closeout</strong>. Be ready for any outdoor adventure in low elevations and high-alpine environments alike with the hybrid design of The North Face&#39;s Alpine Guide four-season tent. It is made from durable, waterproof <a class=\"glossaryTermLink\" href=\"/nylon~g~1957\" title=\"Nylon: - First developed by DuPont®, nylon is a synthetic fiber with exceptional strength, abrasion resistance, stain repellency and flexibility. Used in applications from outdoor clothing and apparel to household items, nylon is frequently blended with other synthetic and natural fibers to increase durability.\">nylon</a> ripstop with an advanced DAC&#174; <a class=\"glossaryTermLink\" href=\"/featherlite~g~1835\" title=\"Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.\">Featherlite</a> NSL pole system and an easy to pitch design.","SuggestedRetailPrice":489,"Brand":{"Id":"1440","Name":"The North Face"},"ListPrice":349.99,"FinalPrice":349.99}
] 
*/
