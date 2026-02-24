export default class CartSummary {
    constructor(cartSummaryId) {
        this.cartSummary = document.getElementById(cartSummaryId);
        this.grossTotal = this.cartSummary.querySelector("#gross-total");
        this.discountAmount = this.cartSummary.querySelector("#discount-amount");
        this.totalToPay = this.cartSummary.querySelector("#total-to-pay");
        this.hiddenContainer = document.getElementById("hidden-inputs-container");
    }

    // Función auxiliar para obtener el valor numérico limpio del HTML (ej: "10.00 €" -> 10.00)
    #getNumericValue(element) {
        const text = element.innerText.replace('€', '').trim();
        return parseFloat(text) || 0;
    }

    #updateHiddenInputs() {
        if (!this.hiddenContainer) return;

        const data = {
            grossTotal: this.#getNumericValue(this.grossTotal),
            discountTotal: this.#getNumericValue(this.discountAmount),
            finalTotal: this.#getNumericValue(this.totalToPay)
        };

        for (const [key, value] of Object.entries(data)) {
            let input = this.hiddenContainer.querySelector(`input[name="${key}"]`);

            // Si el input no existe, lo creamos
            if (!input) {
                input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                this.hiddenContainer.appendChild(input);
            }

            // Actualizamos el valor
            input.value = value.toFixed(2);
        }
    }

    updateDiscount(discountValue, type = 'fixed') {
        const subTotal = this.#getNumericValue(this.grossTotal);
        let finalDiscount = 0;

        if (type === 'percentage') {
            finalDiscount = subTotal * (discountValue / 100);
        } else {
            finalDiscount = discountValue;
        }

        // Actualizamos el DOM del descuento
        this.discountAmount.innerText = finalDiscount.toFixed(2) + " €";

        // Recalculamos el total final
        this.#refreshTotal();
    }

    updateCart(subTotal) {
        // Actualizamos el bruto
        this.grossTotal.innerText = subTotal.toFixed(2) + " €";

        // Recalculamos el total final manteniendo el descuento que ya existía en el HTML
        this.#refreshTotal();
    }

    #refreshTotal() {
        const subTotal = this.#getNumericValue(this.grossTotal);
        const discount = this.#getNumericValue(this.discountAmount);
        const total = subTotal - discount;

        this.totalToPay.innerText = (total > 0 ? total : 0).toFixed(2) + " €";
        this.#updateHiddenInputs();
    }



}