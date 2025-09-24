import { renderListWithTemplate, getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";

export default class ShoppingCart {

    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    async init() {
        this.renderCart();
    }

    renderCart() {
        this.cartItems = getLocalStorage(this.key) || [];

        if (!this.cartItems || this.cartItems.length === 0) {
            this.parentElement.innerHTML = "<h2> Your cart is Empty! </h2>";
            // document.querySelector(".cart-total").classList.add("hide");            
            document.querySelector(".cart-total").classList.add("hide");
        } else {
            renderListWithTemplate( cartItemTemplate, this.parentElement, this.cartItems, true);
            this.addListeners();
            this.showTotal();
        }        
    }

    showTotal() {
        const cartFooter = document.querySelector(".cart-footer");
        const cartTotal = document.querySelector(".cart-total");

        cartFooter.classList.remove("hide");
        const total = this.cartItems.reduce( (sum, item) => sum + item.FinalPrice * item.quantity, 0);
        cartTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
    }

    // addRemoveListeners() {
    //     this.parentElement.querySelectorAll(".cart-card__remove").forEach( a => {
    //         a.addEventListener( "click", (e) => {
    //             e.preventDefault();
    //             const id = a.getAttribute("data-id");
    //             this.removeProduct(id);
    //         });
    //     });
    // }

    addListeners() {
        const removeButtons = this.parentElement.querySelectorAll(".cart-card__remove");

        removeButtons.forEach(button => {
            const id = button.getAttribute("data-id");

            setClick(`.cart-card__remove[data-id="${id}"]`, () => {
                this.removeProduct(id);
                const isMinus = button.classList.contains("btnMinus");
                const change = isMinus ? -1 : 1;
                
                setClick(`.btnQty[data-id="${id}"].${isMinus ? 'btnMinus' : 'btnPlus'}`, () => {
                    this.updateQuantity(id, change);
                });
            });
        });

        const qttyBtns = this.parentElement.querySelectorAll(".btnQty");

        qttyBtns.forEach( button => {
            const id = button.getAttribute("data-id");
            const isMinus = button.classList.contains("btnMinus");
            const change = isMinus ? -1 : 1;
            
            setClick(`.btnQty[data-id="${id}"].${isMinus ? 'btnMinus' : 'btnPlus'}`, () => {
                this.updateQuantity(id, change);
            });
        });
    }

    removeProduct(id) {
        let updateCart = getLocalStorage(this.key);
        updateCart = updateCart.filter( item => item.Id !== id);
        setLocalStorage(this.key, updateCart);
        this.renderCart();
    }

    updateQuantity(id, change) {
        let cartItems = getLocalStorage(this.key);
        const itemIndex = cartItems.findIndex(item => item.Id === id);

        if (itemIndex > -1) {
            cartItems[itemIndex].quantity += change;

            if (cartItems[itemIndex].quantity <= 0) {
                this.removeProduct(id);
                return;
            }
        }
        
        setLocalStorage(this.key, cartItems);
        this.renderCart(); 
    }
}

function cartItemTemplate(item) {
    // const newItem = `
    //     <li class="cart-card divider">
    //         <a href="" data-id="${item.Id}" class="cart-card__remove"> x </a>
    //         <a href="#" class="cart-card__image">
    //             <img src="${item.Image}" alt="${item.Name}" />
    //         </a>
    //         <a href="#">
    //             <h2 class="card__name">${item.Name}</h2>
    //         </a>
    //         <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    //         <p class="cart-card__quantity">qty: 1</p>
    //         <p class="cart-card__price">$${item.FinalPrice}</p>
    //     </li>
    // `;

    // return newItem;
    const template = document.getElementById("cart-item-template");
    if (!template) {
        console.error("Template not found");
        return;
    }
    const clone = template.content.cloneNode(true);

    clone.querySelector("img").src = `${item.Images.PrimaryMedium}`;
    clone.querySelector("img").alt = `Image of ${item.Name}`;
    clone.querySelector(".cart-card__image").href = `/product_pages/?product=${item.Id}`;
    clone.querySelector(".cart-card__name").href = `/product_pages/?product=${item.Id}`;
    clone.querySelector(".card__name").textContent = `${item.Name}`;
    clone.querySelector(".cart-card__color").textContent = `${item.Colors[0].ColorName}`;
    clone.querySelector(".card__quantity").textContent = ` ${item.quantity} `;
    clone.querySelector(".cart-card__price").textContent = `$ ${item.FinalPrice * item.quantity}`;
    clone.querySelector(".cart-card__remove").setAttribute("data-id", item.Id);
    clone.querySelector(".btnMinus").setAttribute("data-id", item.Id);
    clone.querySelector(".btnPlus").setAttribute("data-id", item.Id);

    return clone;
}

/* 
    async init() {
        // const cartItems = await this.dataSource.getCartItems();
        const cartItems = getLocalStorage(this.key) || []; 
        if (cartItems.length === 0) {
            const totalH3 = document.querySelector("#carTotal");
            totalH3.classList.add("hide");
            this.parentElement.innerHTML = "<h2>Cart is empty!</h2>";
        } else {
            this.renderList(cartItems);
        }
    }

    renderList(list) {
        renderListWithTemplate(cartItemTemplate, this.parentElement, list);
    }

    getCartItems() {
        const items = [];
        const cartItems = getLocalStorage(this.key) || [];
        cartItems.forEach(item => {
            items.push(item);
        });
        return items;
    }   

    getCartTotal() {
        const cartItems = getLocalStorage(this.key) || [];
        let total = cartItems.reduce((sum, item) => sum + item.Price, 0);
        return total;
    }

    getCartItemCount() {
        const cartItems = getLocalStorage(this.key) || [];
        return cartItems.length;
    }

    removeItem(itemId) {
        // implement remove item logic here
        console.log(`Removing item with id ${itemId}`);
        this.listElement.querySelector(`[data-id="${itemId}"]`).closest("li").remove();
        // Update the cart items in the data source if needed
        this.dataSource.updateCartItems(this.getCartItems());
        // Recalculate total if needed
        if (this.listElement.children.length === 0) {
            const totalH3 = document.querySelector("#carTotal");
            totalH3.classList.add("hide");
            this.listElement.innerHTML = "<h2>Cart is empty!</h2>";
        }
        else {
            const totalH3 = document.querySelector("#carTotal");
            totalH3.classList.remove("hide");
            totalH3.textContent = `Total: ${this.getCartTotal()}`;
        }
    }
}
*/