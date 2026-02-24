export default class CartProductsTable {
    constructor(tableId, cartSummaryInstance) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector("tbody");
        this.cartSummary = cartSummaryInstance;
        this.hiddenContainer = document.getElementById("hidden-inputs-container");
    }

    init() {
        this.tbody.addEventListener("click", (e) => this.handleClick(e));
        this.syncAll();
    }

    addProduct({ name, price, qty }) {
        const subtotal = price * qty;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
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
        this.syncAll();
    }

    handleClick(e) {
        const button = e.target;
        const row = button.closest("tr");
        if (!row) return;

        e.preventDefault();

        if (button.classList.contains("delete-btn")) {
            row.remove();
        } else if (button.classList.contains("increase-btn")) {
            this.updateQuantity(row, 1);
        } else if (button.classList.contains("decrease-btn")) {
            this.updateQuantity(row, -1);
        }
        this.syncAll();
    }

    updateQuantity(row, change) {
        const qtyCell = row.querySelector(".quantity");
        const priceCell = row.querySelector(".unit-price");
        const subtotalCell = row.querySelector(".subtotal");

        let qty = parseInt(qtyCell.textContent) + change;
        if (qty < 1) return;

        const price = parseFloat(priceCell.textContent.replace('€', ''));
        qtyCell.textContent = qty;
        subtotalCell.textContent = (qty * price).toFixed(2) + " €";
    }

    syncAll() {
        const total = this.getTotal();
        this.cartSummary.updateCart(total);
        this.#updateHiddenInputs();
    }

    #updateHiddenInputs() {
        if (!this.hiddenContainer) return;

        this.hiddenContainer.innerHTML = "";
        const rows = this.tbody.querySelectorAll("tr");

        rows.forEach((row, index) => {
            // Extraemos los datos de las celdas de la fila
            const name = row.cells[0].innerText;
            const price = parseFloat(row.querySelector(".unit-price").innerText.replace('€', ''));
            const qty = parseInt(row.querySelector(".quantity").innerText);
            const subtotal = parseFloat(row.querySelector(".subtotal").innerText.replace('€', ''));

            // Los names deben coincidir con: productsList[indice].nombreAtributoDTO
            const html = `
            <input type="hidden" name="productsList[${index}].productName" value="${name}">
            <input type="hidden" name="productsList[${index}].unitPrice" value="${price}">
            <input type="hidden" name="productsList[${index}].quantity" value="${qty}">
            <input type="hidden" name="productsList[${index}].lineTotal" value="${subtotal}">
        `;
            this.hiddenContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    getTotal() {
        let total = 0;
        this.tbody.querySelectorAll(".subtotal").forEach(cell => {
            const val = parseFloat(cell.textContent.replace('€', ''));
            if (!isNaN(val)) total += val;
        });
        return total;
    }
}