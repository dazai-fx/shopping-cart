package org.iesvdm.shoppingcart.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.iesvdm.shoppingcart.validation.Step1Validation;
import org.iesvdm.shoppingcart.validation.Step2Validation;
import org.iesvdm.shoppingcart.validation.Step3Validation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
/**
 * Data Transfer Object representing a customer order during
 * the multi-step checkout process.
 *
 * It stores:
 * - Cart summary data
 * - Billing and shipping information
 * - Payment details
 * - Generated order number
 *
 * Validation is separated by step using validation groups.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOrderDTO {
    //step1
    List<OrderItem> productsList = new ArrayList<>(); // need instance or NullPointerException
    //private Long id;
    private BigDecimal grossTotal;
    private BigDecimal discountTotal;
    @NotNull(message = "The cart cannot be empty", groups = Step1Validation.class)
    @DecimalMin(value = "0.01", message = "The cart no cannot be empty", groups = Step1Validation.class)
    private BigDecimal finalTotal;
    //step2
    // Bilding address fields
    @NotBlank(message = "The billing name cannot be empty", groups = Step2Validation.class)
    private String billingName;
    @NotBlank(message = "The billing tax ID cannot be empty" , groups = Step2Validation.class)
    private String billingTaxId;
    @NotBlank(message = "The billing Street cannot be empty" , groups = Step2Validation.class)
    private String billingStreet;
    @NotBlank(message = "The billing city cannot be empty" , groups = Step2Validation.class)
    private String billingCity;
    @NotNull(message = "The billing postal code cannot be empty" , groups = Step2Validation.class)
    private Integer billingPostalCode;
    @NotBlank(message = "The billing country cannot be empty" , groups = Step2Validation.class)
    private String billingCountry;
    // Shipping address fields
    @NotBlank(message = "The shipping name cannot be empty" , groups = Step2Validation.class)
    private String shippingName;
    @NotBlank(message = "The shipping street cannot be empty" , groups = Step2Validation.class)
    private String shippingStreet;
    @NotBlank(message = "The shipping city cannot be empty" , groups = Step2Validation.class)
    private String shippingCity;
    @NotNull(message = "The shipping postal code cannot be empty" , groups = Step2Validation.class)
    private Integer shippingPostalCode;
    @NotBlank(message = "The shipping name cannot be empty" , groups = Step2Validation.class)
    private String shippingCountry;
    // Step3
    @NotNull(message = "The payment Method cannot be empty", groups = Step3Validation.class)
    private PaymentMethod paymentMethod;
    private String cardNumber;
    private Integer cardMonth;
    private Integer cardYear;
    private String cardCvv;
    private String paypalEmail;
    private String bankIBAN;
    // final
    private String orderNumber;
    /**
     * Generates a random order number in the format:
     * ORD-XXXX-XXXXXX
     */
    public void generateOrderNumber(){

        int part1 = (int) (Math.random() * 9000) + 1000;   // 1000–9999 4 random numbers
        int part2 = (int) (Math.random() * 900000) + 100000; // 100000–999999 6 random numbers

        this.orderNumber = "ORD-" + part1 + "-" + part2;

    }
    /**
     * Returns a masked version of the selected payment detail
     * (card number, PayPal email, or IBAN).
     * Only the last 4 characters remain visible.
     */
    public String getMaskedPaymentDetail() {

        if (paymentMethod == null) return null;

        return switch (paymentMethod) {

            case CARD -> maskValue(cardNumber);

            case PAYPAL -> maskValue(paypalEmail);

            case BANK_TRANSFER -> maskValue(bankIBAN);

            default -> null;
        };
    }
    /**
     * Masks a value leaving only the last 4 characters visible.
     */
    private String maskValue(String value) {

        if (value == null || value.length() <= 4) {
            return value;
        }

        int visibleDigits = 4;
        int maskedLength = value.length() - visibleDigits;

        return "*".repeat(maskedLength) + value.substring(maskedLength);
    }



}
