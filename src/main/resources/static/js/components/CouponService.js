/**
 * Handles coupon validation and discount application.
 * It validates predefined coupon codes, updates the cart summary,
 * and persists the discount in sessionStorage.
 */
export default class CouponService {
    /**
     * @param {string} couponServiceId - ID of the coupon container element.
     * @param {Object} cartSummaryInstance - Instance of CartSummary
     * responsible for recalculating totals.
     */
    constructor(couponServiceId, cartSummaryInstance) {

        this.couponService=document.getElementById(couponServiceId);
        // Coupon input and action button
        this.coupon = this.couponService.querySelector("#coupon");
        this.button = this.couponService.querySelector("#coupon-button");
        // Cart summary instance used to apply discounts
        this.cartSummaryInstance = cartSummaryInstance;
        // Element used to display validation feedback (if needed)
        this.feedback = this.couponService.querySelector("#coupon-feedback");

    }
    /**
     * Initializes event listeners:
     * - Click event to validate and apply coupon
     * - Input event to remove invalid styling when user edits the field
     */
    init() {
        this.button.addEventListener("click", () => this.checkCoupon());
        this.coupon.addEventListener("input", () => {
            this.coupon.classList.remove('is-invalid');
        });
    }
    /**
     * Validates the coupon code entered by the user.
     * If valid, applies the corresponding discount and stores it.
     * If invalid, displays an error state.
     */
    checkCoupon() {
        const value = this.coupon.value.trim();
        if (value === 'DISCOUNT10') {
            this.cartSummaryInstance.updateDiscount(10, 'percentage');
            sessionStorage.setItem("discount", JSON.stringify({
                value: 10,
                type: 'percentage'
            }));
        } else if (value === 'MINUS5') {
            this.cartSummaryInstance.updateDiscount(5, 'fixed');
            sessionStorage.setItem("discount", JSON.stringify({
                value: 5,
                type: 'fixed'
            }));
        } else{
            this.showError();
        }
    }
    /**
     * Applies invalid styling to the coupon input field
     * to visually indicate an incorrect coupon code.
     */
    showError(){
        this.coupon.classList.add('is-invalid');
    }

}