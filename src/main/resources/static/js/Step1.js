import CartProductsTable from './components/CartProductsTable.js';
import AddProducts from './components/AddProducts.js';
import CartSummary from "./components/CartSummary.js";
import CouponService from "./components/CouponService.js";


document.addEventListener("DOMContentLoaded", () => {

    const cardSummary = new CartSummary("cart-summary")

    const table = new CartProductsTable('products-table', cardSummary);
    table.init();

    const addProducts = new AddProducts(table);
    addProducts.init();

    const couponService = new CouponService('coupon-service', cardSummary);

    couponService.init();

});