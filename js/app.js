// Fetch data from JSON file
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        //List
        // Handle the data and create a list
        const productListContainer = document.getElementById('productList');

        // Create a container for cards
        const container = document.createElement('div');
        container.classList.add('card-container', 'row', 'justify-content-start'); // Bootstrap classes for row and justify-content-start

        data.forEach(product => {
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('col-md-4', 'mb-4', 'mt-4'); // Bootstrap classes for columns

            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <style>
                    .card {
                        background-color: #ecffed;
                        box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.25);
                        transition: transform 0.3s ease;
                    }
                    
                    .card:hover {
                        background-color: #f7fff7;
                        box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.25);
                        transform: scale(1.05);
                    }
                </style>
                <div class="card mx-auto">
                    <img src="${product.product_thumbnail1}" class="card-img-top" style="width: 50%;" alt="...">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${product.product_name1}</h5>
                            <p class="card-text">${product.product_description1}</p>
                            <h5 class="card-text" style="color: red;">₱${product.product_price}</h5><br>
                        </div>
                        <div class="d-flex justify-content-between align-items-end">
                            <button class="btn btn-primary flex-fill me-2" type="button" id="details_button" data-bs-toggle="modal" data-bs-target="#details">
                                Details
                            </button>
                            <button class="btn btn-danger flex-fill" type="button" id="addtocart_button" onclick="addToCart(${product.product_id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                <!-- MODAL -->
                <div class="modal fade" id="details" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h3 class="modal-title" id="staticBackdropLabel">Variations</h3>
                                <button type="button" id="X" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                            </div>

                            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                
                                    <div class="carousel-item active">
                                        <img src=${product.product_thumbnail1} class="d-block mx-auto img-thumbnail" style="max-width: 400px;" alt="...">
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>${product.product_name1}</h5>
                                            <p>${product.product_description1}</p>
                                        </div>
                                    </div>

                                    <div class="carousel-item">
                                        <img src=${product.product_thumbnail2} class="d-block mx-auto img-thumbnail" style="max-width: 400px;" alt="...">
                                        <div class="carousel-caption d-none d-md-block">
                                        <h5>${product.product_name2}</h5>
                                        <p>${product.product_description2}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="carousel-item">
                                        <img src=${product.product_thumbnail3} class="d-block mx-auto img-thumbnail" style="max-width: 400px;" alt="...">
                                        <div class="carousel-caption d-none d-md-block">
                                        <h5>${product.product_name3}</h5>
                                        <p>${product.product_description3}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Previous Button -->
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" style="filter: invert(100%);">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>

                                <!-- Next Button -->
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" style="filter: invert(100%);">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                                
                            </div>

                            <div class="modal-footer" style="height: 70px;">
                                <button type="button" class="btn btn-danger float-center" style="width: 35%; margin-right: 150px;">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END MODAL -->
            `;

            cardWrapper.appendChild(listItem);
            container.appendChild(cardWrapper);
        });

        productListContainer.appendChild(container);

        // Call updateCartIcon to ensure the cart icon is always displayed
        updateCartIcon();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

let clickCounter = {}; // Object to store click counts for each product
let totalItemsInCart = 0; // Variable to store the total number of items in the cart

function addToCart(productId) {
    // Increment click count for the corresponding product
    clickCounter[productId] = (clickCounter[productId] || 0) + 1;

    // Increment total items in cart
    totalItemsInCart++;

    // Update cart icon and count
    updateCartIcon();

    // Display the click count (you can update this part based on your UI requirements)
    // alert(`Product ${productId} added to cart. Click count: ${clickCounter[productId]}`);
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.innerHTML = `
        <div style="position: relative;">
            <i class="fas fa-shopping-cart" style="position: absolute; margin-top: -80px; margin-left: 840px; color: red; font-size: 0.75in;"></i>
            <span style="position: absolute; top: -69px; right: 48px; color: white; font-size: 28px; width: 30px; height: 30px; background-color: red; border-radius: 50%; display: flex; justify-content: center; align-items: center;">${totalItemsInCart}</span>
        </div>
    `;
}

