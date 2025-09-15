import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const data = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("tents", data, element);

list.init();