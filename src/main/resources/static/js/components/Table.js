export default class Table {

    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector("tbody");
    }

    init() {
        this.tbody.addEventListener("click", (e) => this.handleClick(e));
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
    }

    handleClick(e) {
        const button = e.target;
        const row = button.closest("tr");
        if (!row) return;

        if (button.classList.contains("delete-btn")) {
            row.remove();
        }

        if (button.classList.contains("increase-btn")) {
            this.updateQuantity(row, 1);
        }

        if (button.classList.contains("decrease-btn")) {
            this.updateQuantity(row, -1);
        }
    }

    updateQuantity(row, change) {
        const qtyCell = row.querySelector(".quantity");
        const priceCell = row.querySelector(".unit-price");
        const subtotalCell = row.querySelector(".subtotal");

        let qty = parseInt(qtyCell.textContent);
        const price = parseFloat(priceCell.textContent);

        qty += change;
        if (qty < 1) return;

        qtyCell.textContent = qty;
        subtotalCell.textContent = (qty * price).toFixed(2) + " €";
    }

}