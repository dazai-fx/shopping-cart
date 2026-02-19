package org.iesvdm.shoppingcart.model;

import java.math.BigDecimal;

public class OrderItem {

    private Long id;
    private Long orderId; // tengo dudas con esta propiedad, OrderItem ya tiene id no entiendo de donde sale esto
    private String productName;
    private BigDecimal unitPrice;
    private Long quantity; // no se si ocn un int me valdría
    private Long lineTotal; // lo mismo que quantity

}
