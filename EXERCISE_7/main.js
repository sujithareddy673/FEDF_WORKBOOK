// Import the functions we need from our cart module
import { addToCart, removeFromCart, getCartItems, calculateTotal } from './cart.js';

// Get references to DOM elements
const bookList = document.getElementById('book-list');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

// --- RENDER FUNCTIONS ---
// Renders all the books to the page
function renderBooks(books) {
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        // The only change is adding the <img> tag here
        bookCard.innerHTML = `
            <img src="${book.imageUrl}" alt="Cover of ${book.title}" class="book-cover">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>Price: $${book.price.toFixed(2)}</p>
            <button data-book-id="${book.id}" ${!book.inStock ? 'disabled' : ''}>
                ${book.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        `;
        bookList.appendChild(bookCard);
    });
}

// Renders the items in the shopping cart
function renderCart() {
    const items = getCartItems();
    cartItemsEl.innerHTML = ''; // Clear current cart view

    if (items.length === 0) {
        cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button data-book-id="${item.id}">Remove</button>
            `;
            cartItemsEl.appendChild(cartItem);
        });
    }
    cartTotalEl.textContent = calculateTotal();
}


// --- EVENT LISTENERS ---
bookList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const bookId = parseInt(event.target.dataset.bookId);
        // We need to find the full book object from our fetched data
        fetch('books.json')
            .then(res => res.json())
            .then(books => {
                const bookToAdd = books.find(book => book.id === bookId);
                if (bookToAdd) {
                    addToCart(bookToAdd);
                    renderCart(); // Update the cart display
                }
            });
    }
});

cartItemsEl.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const bookId = parseInt(event.target.dataset.bookId);
        removeFromCart(bookId);
        renderCart(); // Update the cart display
    }
});


// --- INITIALIZATION ---
// Fetch book data and render the initial page
async function initialize() {
    try {
        const response = await fetch('books.json');
        if (!response.ok) throw new Error('Could not fetch book data.');
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error(error);
        bookList.innerHTML = '<p>Could not load books. Please try again later.</p>';
    }
}

initialize();