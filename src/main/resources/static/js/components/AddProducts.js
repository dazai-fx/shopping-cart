/**
 * Handles the logic for adding new products to the table.
 * It reads user input, validates it, and sends the data
 * to the provided table instance.
 */
export default class AddProducts {
    /**
     * @param {Object} tableInstance - Instance that manages the product table.
     * It must implement an addProduct(product) method.
     */
    constructor(tableInstance) {
        // Reference to the table logic where products will be stored/rendered
        this.table = tableInstance;
        // Input elements and button from the DOM
        this.nameInput = document.getElementById("product-name");
        this.priceInput = document.getElementById("product-price");
        this.qtyInput = document.getElementById("product-qty");
        this.addButton = document.getElementById("add-product-btn");
    }
    /**
     * Initializes the component by attaching the click event listener
     * to the "Add Product" button.
     */
    init() {
        this.addButton.addEventListener("click", () => this.handleAdd());
    }
    /**
     * Reads input values, validates them, and if valid,
     * sends the new product to the table instance.
     * After adding, it clears the input fields.
     */
    handleAdd() {
        const name = this.nameInput.value.trim();
        const price = parseFloat(this.priceInput.value);
        const qty = parseInt(this.qtyInput.value);

        if (!name || isNaN(price) || isNaN(qty)) return;

        this.table.addProduct({
            name,
            price,
            qty
        });

        this.nameInput.value = "";
        this.priceInput.value = "";
        this.qtyInput.value = "";
    }
}