package org.iesvdm.shoppingcart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerOrder {

    private Long id;
    private String orderNumber;
    private LocalDate createAt;
    private Status status;
    private BigDecimal grossTotal;
    private BigDecimal discountTotal;
    private BigDecimal finalTotal;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private String PaymentDetails;
    // Bilding address fields
    private String billingName;
    private Long billingTaxId;
    private String billingStreet;
    private String billingCity;
    private int billingPostalCode;
    private String billingCountry;
    // Shipping address fields
    private String shippingName;
    private String shippingStreet;
    private String shippingCity;
    private int shippingPostalCode;
    private String shippingCountry;


}
