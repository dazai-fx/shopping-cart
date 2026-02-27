/**
 * Handles cart persistence using sessionStorage.
 * All methods are static, so no instance is required.
 * The cart is stored as a JSON array under a single storage key.
 */
export default class CartStorage {
    /**
     * Storage key used to save and retrieve the cart data
     * from sessionStorage.
     */
    static KEY = "shopping-cart";
    /**
     * Retrieves the cart from sessionStorage.
     * @returns {Array} Array of product objects.
     * Returns an empty array if no cart exists.
     */
    static getCart() {
        const data = sessionStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }
    /**
     * Saves the entire cart array into sessionStorage.
     * @param {Array} cart - Array of product objects.
     */
    static saveCart(cart) {
        sessionStorage.setItem(this.KEY, JSON.stringify(cart));
    }
    /**
     * Adds a product to the cart.
     * - If a product with the same name already exists,
     *   its quantity is increased.
     * - Otherwise, the product is added as a new entry.
     *
     * @param {Object} product - Product object (name, price, qty).
     */
    static addProduct(product) {
        const cart = this.getCart();

        const existing = cart.find(p => p.name === product.name);

        if (existing) {
            existing.qty += product.qty;
        } else {
            cart.push(product);
        }

        this.saveCart(cart);
    }
    /**
     * Removes a product from the cart by its name.
     * @param {string} name - Name of the product to remove.
     */
    static removeProduct(name) {
        const cart = this.getCart().filter(p => p.name !== name);
        this.saveCart(cart);
    }
    /**
     * Updates the quantity of a specific product.
     * If the product exists, its quantity is overwritten.
     *
     * @param {string} name - Product name.
     * @param {number} qty - New quantity value.
     */
    static updateQuantity(name, qty) {
        const cart = this.getCart();
        const product = cart.find(p => p.name === name);
        if (product) product.qty = qty;
        this.saveCart(cart);
    }
}