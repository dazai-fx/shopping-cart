export default class CouponService {
    constructor(couponServiceId, cartSummaryInstance) {
        this.couponService=document.getElementById(couponServiceId);
        this.coupon = this.couponService.querySelector("#coupon");
        this.button = this.couponService.querySelector("#coupon-button");
        this.cartSummaryInstance = cartSummaryInstance;
        // Referencia al mensaje de error
        this.feedback = this.couponService.querySelector("#coupon-feedback");
        this.cartSummaryInstance = cartSummaryInstance;
    }

    init() {
        this.button.addEventListener("click", () => this.checkCoupon());
        this.coupon.addEventListener("input", () => {
            this.coupon.classList.remove('is-invalid');
        });
    }

    checkCoupon() {
        const value = this.coupon.value.trim();
        if (value === 'DISCOUNT10') {
            this.cartSummaryInstance.updateDiscount(10, 'percentage');
        } else if (value === 'MINUS5') {
            this.cartSummaryInstance.updateDiscount(5, 'fixed');
        } else{
            this.showError();
        }
    }
    showError(){
        this.coupon.classList.add('is-invalid');
    }

}