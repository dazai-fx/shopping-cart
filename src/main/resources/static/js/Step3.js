import PaymentMethod from "./components/PaymentMethod.js";

document.addEventListener("DOMContentLoaded", () => {

    const payment = new PaymentMethod("#payment-method-section")
    payment.init();

    const backButton = document.getElementById("back-button");

    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/step2";
    });

});