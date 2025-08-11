class Cart {
  constructor(key) {
    //Key
    this.key = key;

    //Data
    try {
      this.data = JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      this.data = [];
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  getData() {
    return this.data;
  }

  addProduct(product) {
    let existingProduct = this.data.find((p) => product.id == p.id);

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      this.data.push({ ...product, qty: 1 });
    }
    this.save();
  }

  decreaseProduct(product) {
    let existingProduct = this.data.find((p) => p.id == product);

    if (existingProduct && existingProduct.qty > 1) {
      existingProduct.qty -= 1;
    }else{
      deleteProduct(product);
    }
    this.save();
  }

  deleteProduct(product) {
    this.data = this.data.filter((p) => p.id != product);
    this.save();
  }

  clearCart() {
    this.data = [];
    this.save();
  }
}

// General

let products = [];

// let products = [
//   {
//     id: 1,
//     name: "Wireless Headphone",
//     image: "headphone.jpg",
//     desc: "True wireless headphone with built in microphone",
//     price: 120,
//     qty: 1
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     image: "watch.jpg",
//     desc: "Track fitness and notifications",
//     price: 90,
//     qty: 1,
//   },
//   {
//     id: 3,
//     name: "Bluetooth Speaker",
//     image: "speaker.jpg",
//     desc: "Portable speaker with deep bass",
//     price: 75,
//     qty: 1,
//   },
// ];

// Rendering Products
function renderProduct() {
  let allProducts = document.querySelector(".products");
  let renderedProduct = "";

  // Fetch Data From API

  fetch("https://dummyjson.com/products")
    .then((res) => res.json())

    .then((data) => {
      products = data.products;
      products.forEach((product) => {
        renderedProduct += `<article class="product-card" tabindex="0">
          <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="product-img"
          />
          <div class="product-name">${product.title}</div>
          <div class="product-desc">
            ${product.description}
          </div>
          <div class="product-price">Price: $${product.price}</div>
          <div class="product-qty">Qty: ${product.stock}</div>
          <div class="product-buttons">
            <button class="btn-buy" aria-label="Buy Wireless Headphones Now">
              Buy Now
            </button>
            <button
              class="btn-add"
              aria-label="Add Wireless Headphones to Cart" onClick="addProduct(${product.id})"
            >
              Add to Cart
            </button>
          </div>
        </article>`;
      });
      allProducts.innerHTML = renderedProduct;
    });
}
renderProduct();

// Cart
let cart = new Cart("CartItem");
function renderCart() {
  let cartProducts = cart.getData();
  let total = 0;
  let subTotal = 0;
  let renderedCartProduct = "";
  cartProducts.forEach((product) => {
    total += product.price * product.qty;
    subTotal = (product.price * product.qty).toFixed(2);
    renderedCartProduct += `
            <tr>
                    <td class="cart-img-cell">
                        <img
                        src="${product.images[0]}"
                        alt="Wireless Headphones"
                        class="cart-img"
                        />
                    </td>
                    <td>${product.title}</td>
                    <td class="qty">${product.qty}</td>
                    <td>$${product.price}</td>
                    <td>$${subTotal}</td>
                    <td>
                        <div class="actions">
                        <button class="btn-plus" title="Increase Quantity" onClick="addProduct(${product.id})">+</button>
                        <button class="btn-minus" title="Decrease Quantity" onClick="decreaseProduct(${product.id})">−</button>
                        <button class="btn-delete" title="Remove Product" onClick="deleteProduct(${product.id})">🗑</button>
                        </div>
                    </td>
            </tr>
            `;
  });
  document.querySelector("tbody").innerHTML = renderedCartProduct;
  total = total.toFixed(2);
  document.querySelector(".cart-total").innerHTML = `$${total}`;
}

function addProduct(product) {
  let existingProduct = products.find((p) => p.id == product);

  if (existingProduct) {
    cart.addProduct(existingProduct);
    renderCart();
  }
}

function decreaseProduct(product) {
  cart.decreaseProduct(product);
  renderCart();
}
function deleteProduct(product) {
  cart.deleteProduct(product);
  renderCart();
}

renderCart();

// New Product Input ====== + Popup

let popup = document.querySelector(".popup");
let form = document.getElementById("newProductform");
let addNewProducts = document.getElementById("addNewProducts");
let closePopupBtn = document.getElementById("closePopup");

addNewProducts.addEventListener("click", () => {
  popup.style.display = "flex";
});
closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (!form.contains(e.target)) {
    popup.style.display = "none";
  }
});

// Adding a New Product on Form Submit

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newProduct = {
    id: Number(document.getElementById("id").value),
    name: document.getElementById("name").value,
    image: document.getElementById("image").value,
    desc: document.getElementById("desc").value,
    price: Number(document.getElementById("price").value),
    qty: Number(document.getElementById("qty").value),
  };

  products.push(newProduct);
  renderProduct();
  form.reset();
  popup.style.display = "none";
});
