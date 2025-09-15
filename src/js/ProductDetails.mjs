import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    // a few things that need to happen before the class can be used
    async init() {
        // use the datasource to get the details for the current product. 
        // findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. 
        // Review the readings from this week on 'this' to understand why.
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this) );

        // the other way using .then
        // this.dataSource.findProductById(this.productId)
        //     .then(product => {
        //         this.product = product;
        //         this.renderProductDetails();
        //         document
        //          .getElementById('addToCart')
        //          .addEventListener('click', this.addProductToCart.bind(this));
        //     });
    }
    // Move this function from product.js. Make any changes necessary to make it work. 
    // This method will be called from within the init() method.
    addProductToCart(){
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(this.product); 
        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails(){
        productDetailsTemplate(this.product)
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}