document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch('path/to/your/json/data.json')
        .then(response => response.json())
        .then(data => {
            // Call function to display products
            displayProducts(data.products);
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to display products on the HTML page
function displayProducts(products) {
    const productListDiv = document.getElementById('product-list');

    // Loop through each product and create a card to display it
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Populate the card with product information
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <hr>
        `;

        // Append the product card to the product list
        productListDiv.appendChild(productCard);
    });
}
