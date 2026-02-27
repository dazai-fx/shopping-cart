import CartStorage from './CartStorage.js';
/**
 * Manages the cart products table:
 * - Renders products from storage
 * - Handles quantity updates and deletion
 * - Synchronizes cart summary
 * - Generates hidden inputs for form submission
 */
export default class CartProductsTable {
    /**
     * @param {string} tableId - ID of the table element.
     * @param {Object} cartSummaryInstance - Instance responsible for updating
     * the cart summary (totals, etc.).
     */

    constructor(tableId, cartSummaryInstance) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector("tbody");
        this.cartSummary = cartSummaryInstance;
        this.hiddenContainer = document.getElementById("hidden-inputs-container");
    }
    /**
     * Initializes the table:
     * - Attaches event delegation for button actions
     * - Loads products from storage and renders them
     */
    init() {
        this.tbody.addEventListener("click", (e) => this.handleClick(e));
        this.loadFromStorage();
    }
    /**
     * Adds a new product to storage and refreshes the table.
     * @param {Object} product - Product object (name, price, qty)
     */
    addProduct(product) {
        CartStorage.addProduct(product);
        this.loadFromStorage();
    }
    /**
     * Handles all button actions using event delegation:
     * - Delete product
     * - Increase quantity
     * - Decrease quantity (minimum 1)
     */
    handleClick(e) {
        const button = e.target;
        const row = button.closest("tr");
        if (!row) return;

        e.preventDefault();

        const name = row.querySelector(".product-name").innerText;
        const qtyCell = row.querySelector(".quantity");
        let qty = parseInt(qtyCell.innerText);

        if (button.classList.contains("delete-btn")) {
            CartStorage.removeProduct(name);

        } else if (button.classList.contains("increase-btn")) {
            CartStorage.updateQuantity(name, qty + 1);

        } else if (button.classList.contains("decrease-btn")) {
            if (qty > 1) {
                CartStorage.updateQuantity(name, qty - 1);
            }
        }
        this.loadFromStorage();
    }


    /**
     * Synchronizes all dependent components:
     * - Updates cart summary
     * - Regenerates hidden inputs for backend submission
     */
    syncAll() {
        this.cartSummary.updateCart();
        this.#updateHiddenInputs();
    }
    /**
     * Loads cart data from storage, clears the table,
     * re-renders all rows, and synchronizes related components.
     */
    loadFromStorage() {
        this.tbody.innerHTML = "";

        const cart = CartStorage.getCart();

        cart.forEach(product => {
            this.#renderRow(product);
        });

        this.syncAll();
    }
    /**
     * Renders a single product row in the table.
     * @param {Object} param0 - Destructured product object
     * @param {string} param0.name
     * @param {number} param0.price
     * @param {number} param0.qty
     */
    #renderRow({ name, price, qty }) {
        const subtotal = price * qty;
        const row = document.createElement("tr");

        row.innerHTML = `
        <td class="product-name">${name}</td>
        <td class="text-end unit-price">${price.toFixed(2)} €</td>
        <td class="text-center quantity">${qty}</td>
        <td class="text-end fw-semibold subtotal">${subtotal.toFixed(2)} €</td>
        <td class="text-center">
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-info decrease-btn">-</button>
                <button class="btn btn-outline-success increase-btn">+</button>
                <button class="btn btn-danger delete-btn">Remove</button>
            </div>
        </td>
    `;

        this.tbody.appendChild(row);
    }
    /**
     * Generates hidden input fields representing the cart data.
     * This allows the cart to be submitted as part of a traditional form
     */
    #updateHiddenInputs() {

        if (!this.hiddenContainer) return;

        const productInputs = this.hiddenContainer.querySelectorAll("[name^='productsList']");
        productInputs.forEach(i => i.remove());

        const rows = this.tbody.querySelectorAll("tr");

        rows.forEach((row, index) => {
            const name = row.cells[0].innerText;
            const price = parseFloat(row.querySelector(".unit-price").innerText.replace('€', ''));
            const qty = parseInt(row.querySelector(".quantity").innerText);
            const subtotal = parseFloat(row.querySelector(".subtotal").innerText.replace('€', ''));

            const html = `
            <input type="hidden" name="productsList[${index}].productName" value="${name}">
            <input type="hidden" name="productsList[${index}].unitPrice" value="${price}">
            <input type="hidden" name="productsList[${index}].quantity" value="${qty}">
            <input type="hidden" name="productsList[${index}].lineTotal" value="${subtotal}">
        `;
            this.hiddenContainer.insertAdjacentHTML('beforeend', html);
        });

    }
}