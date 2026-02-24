package org.iesvdm.shoppingcart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerOrderDTO {

    List<OrderItem> productsList = new ArrayList<>();
    private Long id;
    private String orderNumber;
    private LocalDate createAt;
    private Status status;
    private BigDecimal grossTotal;
    private BigDecimal discountTotal;
    private BigDecimal finalTotal;
    // Bilding address fields
    private String billingName;
    private Long billingTaxId;
    private String billingStreet;
    private String billingCity;
    private Integer billingPostalCode;
    private String billingCountry;
    // Shipping address fields
    private String shippingName;
    private String shippingStreet;
    private String shippingCity;
    private Integer shippingPostalCode;
    private String shippingCountry;
    // Payment
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private String cardNumber;
    private Integer cardMonth;
    private Integer cardYear;
    private String cardCvv;
    private String paypalEmail;
    private String bankIBAN;

    public void generateOrderNumber(){

        int part1 = (int) (Math.random() * 9000) + 1000;   // 1000–9999 4 random numbers
        int part2 = (int) (Math.random() * 900000) + 100000; // 100000–999999 6 random numbers

        this.orderNumber = "ORD-" + part1 + "-" + part2;

    }

    public String getMaskedPaymentDetail() {

        if (paymentMethod == null) return null;

        return switch (paymentMethod) {

            case CARD -> maskValue(cardNumber);

            case PAYPAL -> maskValue(paypalEmail);

            case BANK_TRANSFER -> maskValue(bankIBAN);

            default -> null;
        };
    }

    private String maskValue(String value) {

        if (value == null || value.length() <= 4) {
            return value;
        }

        int visibleDigits = 4;
        int maskedLength = value.length() - visibleDigits;

        return "*".repeat(maskedLength) + value.substring(maskedLength);
    }



}
