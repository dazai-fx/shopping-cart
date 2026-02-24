import AddressSync from "./components/AddressSync.js";

document.addEventListener("DOMContentLoaded", () => {

    const addressSync = new AddressSync("same-address-check");

    addressSync.init();

});