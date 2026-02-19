package org.iesvdm.shoppingcart.model;

import java.math.BigDecimal;

public class OrderItem {

    private Long id;
    private CustomerOrder customerOrder;
    private String productName;
    private BigDecimal unitPrice;
    private int quantity; // no se si ocn un int me valdría
    private BigDecimal lineTotal;  // subtotal de la tabla

}
