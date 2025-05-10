// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1583348808517-9d5d4b4a3e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1616941068680-1a9cc7b7a8b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Digital Camera",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1602306779271-9b774b7d8f2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1611095564984-0f7d3bdfb7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 25.99,
        image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Cart array
let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to render products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });
}

// Function to update cart display
function updateCart() {
    // Update cart count
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalSpan.innerText = total.toFixed(2);
}

// Function to render cart items
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong><br/>
                Quantity: ${item.quantity} &times; $${item.price.toFixed(2)}
            </div>
            <button class="remove-item-btn" data-id="${item.id}">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItemDiv);
    });
}

// Add event listeners for Add to Cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }
    }
});

// View Cart button
viewCartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.classList.remove('hidden');
});

// Close Cart modal
document.getElementById('close-cart').addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Remove item from cart
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const id = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        updateCart();
        renderCart();
    }
});

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    renderCart();
    cartModal.classList.add('hidden');
});

// Initialize the page
renderProducts();
updateCart();