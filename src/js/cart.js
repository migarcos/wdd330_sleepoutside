import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const totalH3 = document.querySelector("#carTotal");
  if (!cartItems || cartItems.length === 0) {
    totalH3.classList.add("hide");
    document.querySelector(".product-list").innerHTML = "<h2>Cart is empty!</h2>";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    totalH3.classList.remove("hide");
    let total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    totalH3.textContent = `Total: ${total}  `;
  }
}

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;

  return newItem;
}

renderCartContents();
