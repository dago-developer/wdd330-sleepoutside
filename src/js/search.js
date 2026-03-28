import { qs } from "./utils.mjs";

const categories = ["tents", "backpacks", "sleeping-bags"];

async function loadAllProducts() {
  const allProducts = [];
  for (const cat of categories) {
    const response = await fetch(`../public/json/${cat}.json`);
    const data = await response.json();
    const products = data.Result || data;
    allProducts.push(...products);
  }
  return allProducts;
}

function renderProductList(products) {
  const html = products.map(product => `
    <li class="product-card">
      <a href="product_pages/${getSlug(product.Id)}.html">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `).join("");
  qs(".product-list").innerHTML = html;
}

function getSlug(id) {
const slugs = {
    "344YJ": "cedar-ridge-rimrock-2",
    "880RR": "marmot-ajax-3",
    "985PR": "northface-alpine-3",
    "985RF": "northface-talus-4"
  };
  return slugs[id] || id;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function init() {
  const query = getQueryParam("query") || "";
  if (!query) {
  qs(".product-list").innerHTML = "<li>No search query</li>";
    return;
  }
  const allProducts = await loadAllProducts();
  const results = allProducts.filter(product => 
    product.Name.toLowerCase().includes(query.toLowerCase())
  );
  renderProductList(results);
  const h2 = document.querySelector("h2");
  if (h2) h2.textContent = `Search results for "${query}"`;
}

init();

