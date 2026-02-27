import CartStorage from './CartStorage.js';
/**
 * Manages cart summary calculations:
 * - Gross total (subtotal of all products)
 * - Discount calculation (fixed or percentage)
 * - Final total to pay
 * - Hidden inputs synchronization for backend submission
 */
export default class CartSummary {
    /**
     * @param {string} cartSummaryId - ID of the summary container element.
     */
    constructor(cartSummaryId) {
        // Summary display elements
        this.cartSummary = document.getElementById(cartSummaryId);
        this.grossTotal = this.cartSummary.querySelector("#gross-total");
        this.discountAmount = this.cartSummary.querySelector("#discount-amount");
        this.totalToPay = this.cartSummary.querySelector("#total-to-pay");
        this.hiddenContainer = document.getElementById("hidden-inputs-container");

        // Container used to generate hidden inputs for form submission
        const discountData = JSON.parse(sessionStorage.getItem("discount"));

        // If a discount is stored in sessionStorage, apply it on initialization
        if (discountData) {
            this.updateDiscount(discountData.value, discountData.type);
        }

    }
    /**
     * Extracts a numeric value from a DOM element containing currency text.
     * Example: "123.45 €" -> 123.45
     *
     * @param {HTMLElement} element
     * @returns {number}
     */
    #getNumericValue(element) {
        const text = element.innerText.replace('€', '').trim();
        return parseFloat(text) || 0;
    }
    /**
     * Updates or creates hidden inputs representing the summary totals.
     * This allows the summary values to be submitted in a traditional form.
     */
    #updateHiddenInputs() {

        if (!this.hiddenContainer) return;

        const data = {
            grossTotal: this.#getNumericValue(this.grossTotal),
            discountTotal: this.#getNumericValue(this.discountAmount),
            finalTotal: this.#getNumericValue(this.totalToPay)
        };

        for (const [key, value] of Object.entries(data)) {
            let input = this.hiddenContainer.querySelector(`input[name="${key}"]`);
            if (!input) {
                input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                this.hiddenContainer.appendChild(input);
            }
            input.value = value.toFixed(2);
        }

    }
    /**
     * Applies a discount to the cart.
     *
     * @param {number} discountValue - Discount amount or percentage.
     * @param {string} type - 'fixed' or 'percentage'.
     */
    updateDiscount(discountValue, type = 'fixed') {
        const subTotal = this.#getNumericValue(this.grossTotal);
        let finalDiscount = 0;

        if (type === 'percentage') {
            finalDiscount = subTotal * (discountValue / 100);
        } else {
            finalDiscount = discountValue;
        }


        this.discountAmount.innerText = finalDiscount.toFixed(2) + " €";


        this.#refreshTotal();
    }
    /**
     * Recalculates the gross total based on the cart contents
     * and re-applies any stored discount.
     */
    updateCart() {
        const cart = CartStorage.getCart();
        let subTotal = 0;

        cart.forEach(p => {
            subTotal += p.price * p.qty;
        });

        this.grossTotal.innerText = subTotal.toFixed(2) + " €";

        const discountData = JSON.parse(sessionStorage.getItem("discount"));
        if (discountData) {
            this.updateDiscount(discountData.value, discountData.type);
        } else {
            this.#refreshTotal(); // sin descuento
        }
    }
    /**
     * Calculates the final total:
     * finalTotal = grossTotal - discount
     * Ensures the result never goes below zero.
     */
    #refreshTotal() {
        const subTotal = this.#getNumericValue(this.grossTotal);
        const discount = this.#getNumericValue(this.discountAmount);
        const total = subTotal - discount;

        this.totalToPay.innerText = (total > 0 ? total : 0).toFixed(2) + " €";
        this.#updateHiddenInputs();
    }



}