function displayProducts() {
  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
        <div>${product.img};</div>
        <h3>${product.title}</h3>
        <p>${product.name}</p>
        <p>${product.price}</p>
      `;

    productList.appendChild(productElement);
  });
}

// Call the function to display products on page load
displayProducts();
