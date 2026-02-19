package org.iesvdm.shoppingcart.model;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private String PaymentDetails; // preguntar al profesor sobre esta propiedad que tipo de dato usar
    // Bilding address fields
    private String billingName;
    private Long billingTaxId;
    private String billingStreet;
    private String billingCity;
    private int billingPostalCode;
    private String billingCountry;
    // Shipping address fields
    private String shippingName;
    private String shippingstreet;
    private String shippingCity;
    private int shippingPostalCode;
    private String shippingCountry;


}
