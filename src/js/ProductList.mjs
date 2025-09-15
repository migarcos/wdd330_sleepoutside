// to generate a list of product cards in HTML from an array.
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    // Add a method to your ProductList class to use this template called renderList, 
    // call the template function once for each product in the list, and insert it to the DOM.
    // The method should take the product list as an argument
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);

        // this.listElement.innerHTML = ""; 
        // list.forEach(product => {
        //     const productCard = productCardTemplate(product);
        //     this.listElement.appendChild(productCard);
        // });

        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}

function productCardTemplate(product) {
    // HTML Template: Use the <template> tag in HTML with some JavaScript to build your own solution.
    const template = document.getElementById("product-card-template");
    const clone = template.content.cloneNode(true);

    const link = clone.querySelector("a");
    const img = clone.querySelector("img");
    const brand = clone.querySelector(".card__brand");
    const name = clone.querySelector(".card__name");
    const price = clone.querySelector(".product-card__price");

    link.href = `product_pages/?product=${product.Id}`;
    img.src = product.Image;
    img.alt = `Image of ${product.Name}`;
    brand.textContent = product.Brand.Name;
    name.textContent = product.Name;
    price.textContent = `$ ${product.FinalPrice}`;

    return clone;

    // TEMPLATE LITERAL : Use *Template Literal Strings* to build the solution
    // return `
    //     <li class="product-card">
    //         <a href="product_pages/?product=${product.Id}">
    //           <img src="${product.Image}" alt="Image of ${product.Name}" />
    //           <h3 class="card__brand">${product.Brand.Name}</h3>
    //           <h2 class="card__name">${product.Name}</h2>
    //           <p class="product-card__price">$ ${product.FinalPrice}</p>
    //         </a>
    //     </li>
    // `
}