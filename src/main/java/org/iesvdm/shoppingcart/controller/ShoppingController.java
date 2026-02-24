package org.iesvdm.shoppingcart.controller;

import org.iesvdm.shoppingcart.model.CustomerOrder;
import org.iesvdm.shoppingcart.model.CustomerOrderDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

@SessionAttributes("customerOrderDTO")
@Controller
public class ShoppingController {

    @ModelAttribute("customerOrderDTO")
    public CustomerOrderDTO getCustomerOrderDTO() {
        return new CustomerOrderDTO();
    }

    @GetMapping({"/", "/index", "/step1"}) // nos lleva al form de Cart
    public String index(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO ) {
        return "form1";
    }

    @PostMapping("/step2")
    public String step2(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO) {
        return "form2";
    }

    @PostMapping("/step3")
    public String step3(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO) {
        return "form3";
    }

    @PostMapping("/final")
    public String finalPage(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO) {
        customerOrderDTO.generateOrderNumber();

        return "final-page";
    }


}
