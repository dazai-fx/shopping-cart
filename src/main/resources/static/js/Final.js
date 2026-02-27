// FinalPageCleanup.js
document.addEventListener("DOMContentLoaded", () => {

    //clear localSession
    sessionStorage.removeItem("shopping-cart");
    sessionStorage.removeItem("discount");

    // sessionStorage.clear(); // care: delete all

});