/**
 * Manages payment method selection logic.
 *
 * - Enables input fields of the selected payment method.
 * - Disables and clears inputs of non-selected methods.
 */
export default class PaymentMethod {
    /**
     * @param {string} PaymentMethodId - CSS selector for the payment method container.
     */
    constructor(PaymentMethodId) {
        // Main container that wraps all payment options
        this.container = document.querySelector(PaymentMethodId);
        // Radio buttons used to select the payment method
        this.radioButtons = this.container.querySelectorAll(
            'input[name="paymentMethod"]'
        );
        // Sections that contain inputs for each payment method
        // Each section must define a data-method attribute
        this.sections = this.container.querySelectorAll('.payment-section');
    }
    /**
     * Initializes event listeners for radio buttons.
     * Also sets the initial state in case one option is pre-selected.
     */
    init() {
        this.radioButtons.forEach(radio => {
            radio.addEventListener("change", () => {
                this.updateState(radio.value);
            });
        });

        // Initialize state if one radio is already checked
        const selected = this.container.querySelector(
            'input[name="paymentMethod"]:checked'
        );
        if (selected) {
            this.updateState(selected.value);
        } else {
            // If no method is selected, disable all inputs
            this.disableAll();
        }
    }
    /**
     * Enables inputs belonging to the selected payment method
     * and disables (and clears) inputs from other methods.
     *
     * @param {string} selectedMethod - Value of the selected radio button.
     */
    updateState(selectedMethod) {
        this.sections.forEach(section => {
            const method = section.dataset.method;
            const inputs = section.querySelectorAll("input");

            inputs.forEach(input => {
                if (method === selectedMethod) {
                    input.disabled = false;
                } else {
                    input.disabled = true;
                    input.value = "";
                }
            });
        });
    }
    /**
     * Disables all payment method inputs.
     * Used when no payment method is selected.
     */
    disableAll() {
        this.sections.forEach(section => {
            section.querySelectorAll("input").forEach(input => {
                input.disabled = true;
            });
        });
    }
}