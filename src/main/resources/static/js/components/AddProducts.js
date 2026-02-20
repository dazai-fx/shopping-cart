export default class AddProducts {

    constructor(tableInstance) {
        this.table = tableInstance;

        this.nameInput = document.getElementById("product-name");
        this.priceInput = document.getElementById("product-price");
        this.qtyInput = document.getElementById("product-qty");
        this.addButton = document.getElementById("add-product-btn");
    }

    init() {
        this.addButton.addEventListener("click", () => this.handleAdd());
    }

    handleAdd() {
        const name = this.nameInput.value.trim();
        const price = parseFloat(this.priceInput.value);
        const qty = parseInt(this.qtyInput.value);

        if (!name || isNaN(price) || isNaN(qty)) return;

        this.table.addProduct({ name, price, qty });

        this.nameInput.value = "";
        this.priceInput.value = "";
        this.qtyInput.value = "";
    }
}