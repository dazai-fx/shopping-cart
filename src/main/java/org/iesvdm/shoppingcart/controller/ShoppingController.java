package org.iesvdm.shoppingcart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

//@SessionAttributes("ingreso")
@Controller
public class ShoppingController {

    @GetMapping({"/", "/index", "/step1"}) // nos lleva al form de Cart
    public String index(Model model) {
        return "form1";
    }

    @GetMapping("/step2")
    public String step2(Model model) {
        return "form2";
    }

    @GetMapping("/step3")
    public String step3(Model model) {
        return "form3";
    }

    @GetMapping("/final")
    public String finalPage(Model model) {
        return "final-page";
    }


}
