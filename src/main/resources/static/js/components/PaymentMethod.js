export default class PaymentMethod {
    constructor(PaymentMethodId) {
        this.container = document.querySelector(PaymentMethodId);
        this.radioButtons = this.container.querySelectorAll(
            'input[name="paymentMethod"]'
        );
        this.sections = this.container.querySelectorAll('.payment-section');
    }

    init() {
        this.radioButtons.forEach(radio => {
            radio.addEventListener("change", () => {
                this.updateState(radio.value);
            });
        });

        // Inicializar estado (por si uno viene marcado)
        const selected = this.container.querySelector(
            'input[name="paymentMethod"]:checked'
        );
        if (selected) {
            this.updateState(selected.value);
        } else {
            this.disableAll();
        }
    }

    updateState(selectedMethod) {
        this.sections.forEach(section => {
            const method = section.dataset.method;
            const inputs = section.querySelectorAll("input");

            inputs.forEach(input => {
                if (method === selectedMethod) {
                    input.disabled = false;
                } else {
                    input.disabled = true;
                    input.value = ""; // limpia valores
                }
            });
        });
    }

    disableAll() {
        this.sections.forEach(section => {
            section.querySelectorAll("input").forEach(input => {
                input.disabled = true;
            });
        });
    }
}