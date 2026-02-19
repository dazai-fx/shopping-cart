package org.iesvdm.shoppingcart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

//@SessionAttributes("ingreso")
@Controller
public class ShoppingController {

    @GetMapping("/") // nos lleva al form de Cart
    public String index(Model model) {
        return "index";
    }


}
