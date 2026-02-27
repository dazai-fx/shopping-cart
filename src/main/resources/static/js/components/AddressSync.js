/**
 * Synchronizes billing address fields with shipping address fields
 * when a checkbox is checked.
 */
export default class AddressSync {
    /**
     * @param {string} checkboxId - The ID of the checkbox that enables
     * address synchronization (e.g., "Same as billing").
     */
    constructor(checkboxId) {
        // Checkbox element that controls the sync behavior
        this.checkbox = document.getElementById(checkboxId);
        /**
         * Maps billing field names to their corresponding shipping field names.
         * Key = billing input name
         * Value = shipping input name
         */
        this.fieldMap = {
            'billingName': 'shippingName',
            'billingStreet': 'shippingStreet',
            'billingCity': 'shippingCity',
            'billingPostalCode': 'shippingPostalCode',
            'billingCountry': 'shippingCountry'
        };
    }
    /**
     * Initializes the synchronization logic:
     * - Listens for checkbox state changes.
     * - Listens for changes in billing fields to update shipping fields in real time.
     */
    init() {
        // If the checkbox does not exist, stop execution safely
        if (!this.checkbox) return;
        // When the checkbox state changes
        this.checkbox.addEventListener('change', () => {
            if (this.checkbox.checked) {
                this.syncAddresses();
            }
        });

        // Listen for input changes in each billing field
        // to keep shipping fields updated while the checkbox is checked
        Object.keys(this.fieldMap).forEach(billingName => {
            const billingInput = document.querySelector(`[name="${billingName}"]`);
            billingInput.addEventListener('input', () => {
                if (this.checkbox.checked) this.syncAddresses();
            });
        });
    }
    /**
     * Copies values from billing fields to their corresponding
     * shipping fields based on the fieldMap configuration.
     */
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