import AddressSync from "./components/AddressSync.js";

document.addEventListener("DOMContentLoaded", () => {

    const addressSync = new AddressSync("same-address-check");

    addressSync.init();

    const backButton = document.getElementById("back-button");

    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/step1";
    });

});