export default class AddressSync {
    constructor(checkboxId) {
        this.checkbox = document.getElementById(checkboxId);
        // Definimos el mapa de correspondencias (Billing -> Shipping)
        this.fieldMap = {
            'billingName': 'shippingName',
            'billingStreet': 'shippingStreet',
            'billingCity': 'shippingCity',
            'billingPostalCode': 'shippingPostalCode',
            'billingCountry': 'shippingCountry'
        };
    }

    init() {
        if (!this.checkbox) return;

        this.checkbox.addEventListener('change', () => {
            if (this.checkbox.checked) {
                this.syncAddresses();
            }
        });

        // Escuchar cambios en billing mientras el checkbox está activo
        // para que se actualicen en tiempo real
        Object.keys(this.fieldMap).forEach(billingName => {
            const billingInput = document.querySelector(`[name="${billingName}"]`);
            billingInput.addEventListener('input', () => {
                if (this.checkbox.checked) this.syncAddresses();
            });
        });
    }

    syncAddresses() {
        for (const [billingName, shippingName] of Object.entries(this.fieldMap)) {
            const source = document.querySelector(`[name="${billingName}"]`);
            const target = document.querySelector(`[name="${shippingName}"]`);

            if (source && target) {
                target.value = source.value;
            }
        }
    }
}