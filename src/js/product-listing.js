import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");
const data = new ProductData();
const parentElement = document.querySelector(".product-list");
const list = new ProductList(category, data, parentElement);

list.init();
loadHeaderFooter();