// This array will hold the items in our cart
let cartItems = [];

// Function to add a book to the cart
export function addToCart(book) {
    cartItems.push(book);
}

// Function to remove an item by its ID
export function removeFromCart(bookId) {
    cartItems = cartItems.filter(item => item.id !== bookId);
}

// Function to get all items currently in the cart
export function getCartItems() {
    return cartItems;
}

// Function to calculate the total price
export function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
}