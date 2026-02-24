package org.iesvdm.shoppingcart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


public class Product {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private boolean active;
}
