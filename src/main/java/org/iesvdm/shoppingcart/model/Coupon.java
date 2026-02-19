package org.iesvdm.shoppingcart.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Coupon {

    private Long id;
    private String code;
    private String description;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private boolean active;
    private LocalDate validFrom;
    private LocalDate validTo;

}
