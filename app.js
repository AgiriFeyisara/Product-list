window.onload = function () {
  const productsContainer = document.querySelector(".products");
  const cartItems = []; // Array to hold items added to the cart
  const cartCountElement = document.querySelector(".personal h1");
  const cartImg = document.querySelector(".empty-cart");
  const cartText = document.querySelector(".personal p");
  const confirmOrderBtn = document.querySelector(".btn-confirm-order");
  const orderModal = document.getElementById("orderModal");
  const orderList = document.getElementById("orderList");
  const totalPriceElement = document.getElementById("totalPrice");

  // Loop through the products array from data.js
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <div class="img-btn">
        <img src="${product.imgSrc}" class="img1" />
        <div>
          <button class="btn add-to-cart" data-id="${product.id}">
            <span class="cart1">Add to cart</span>
          </button>
        </div>
      </div>
      <div class="text">
        <p class="p1">${product.description}</p>
        <h3 class="h1">${product.title}</h3>
        <p class="p2">${product.price}</p>
      </div>
    `;

    // Event listener for the "Add to Cart" button
    const addToCartButton = productDiv.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");

      // Add product to cart
      const existingProductIndex = cartItems.findIndex(
        (p) => p.id === productId
      );
      if (existingProductIndex === -1) {
        cartItems.push({ ...product, quantity: 1 }); // Add the product with quantity 1
      }

      // Update the cart UI
      updateCartUI();
    });

    productsContainer.appendChild(productDiv);
  });

  // Update cart UI
  function updateCartUI() {
    cartCountElement.innerText = `Your cart (${cartItems.length})`;
    let cartContent = "";
    let total = 0;

    cartItems.forEach((item) => {
      total += parseFloat(item.price.replace("$", "")) * item.quantity;
      cartContent += `
        <div class="cart-item">
          <span>${item.title} - $${item.price} x ${item.quantity}</span>
        </div>
      `;
    });

    // Update the cart container
    orderList.innerHTML = cartContent;
    totalPriceElement.innerText = total.toFixed(2);
  }

  // Handle Confirm Order
  confirmOrderBtn.addEventListener("click", () => {
    orderModal.style.display = "flex";
  });

  // Start new order
  document
    .querySelector(".btn-start-new-order")
    .addEventListener("click", () => {
      cartItems.length = 0; // Clear cart
      updateCartUI();
      orderModal.style.display = "none";
    });
};
