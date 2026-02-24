import PaymentMethod from "./components/PaymentMethod.js";

document.addEventListener("DOMContentLoaded", () => {

    const payment = new PaymentMethod("#payment-method-section")
    payment.init();

});