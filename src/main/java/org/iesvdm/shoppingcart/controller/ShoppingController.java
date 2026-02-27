package org.iesvdm.shoppingcart.controller;

import org.iesvdm.shoppingcart.model.CustomerOrder;
import org.iesvdm.shoppingcart.model.CustomerOrderDTO;
import org.iesvdm.shoppingcart.validation.Step1Validation;
import org.iesvdm.shoppingcart.validation.Step2Validation;
import org.iesvdm.shoppingcart.validation.Step3Validation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;


/**
 * Controller responsible for managing the multi-step shopping cart checkout process.
 *
 * Flow:
 * Step 1 -> Cart validation
 * Step 2 -> Billing & Shipping information
 * Step 3 -> Payment method selection
 * Final -> Order confirmation
 *
 * The CustomerOrderDTO is stored in session using @SessionAttributes
 * to preserve data across steps.
 */
@SessionAttributes("customerOrderDTO")
@Controller
public class ShoppingController {

    @ModelAttribute("customerOrderDTO")
    public CustomerOrderDTO getCustomerOrderDTO() {
        return new CustomerOrderDTO();
    }

    @GetMapping({"/", "/index", "/step1"})
    public String index(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO ) {
        return "form1";
    }

    @PostMapping("/step2")
    public String step2(@Validated(Step1Validation.class)
                            @ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO,
                        BindingResult result) {
        if(result.hasErrors()) {
            return "form1";
        }
        return "form2";
    }

    @GetMapping("/step2")
    public String getStep2(@ModelAttribute("customerOrderDTO")
                               CustomerOrderDTO customerOrderDTO) {
        return "form2";
    }

    @PostMapping("/step3")
    public String step3(@Validated(Step2Validation.class)
                            @ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO,
                            BindingResult result) {
        if(result.hasErrors()) {
            return "form2";
        }
        return "form3";
    }

    @GetMapping("/step3")
    public String getStep3(@ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO) {
        return "form3";
    }

    @PostMapping("/final")
    public String finalPage(@Validated(Step3Validation.class)
                                @ModelAttribute("customerOrderDTO") CustomerOrderDTO customerOrderDTO,
                                BindingResult result,
                                SessionStatus sessionStatus) {
        /**
         * Handles the final confirmation step.
         * Validates payment information and generates the order number.
         * Clears the session after successful submission.
         */
        customerOrderDTO.generateOrderNumber();
        if(result.hasErrors()) {
            return "form3";
        }
        sessionStatus.setComplete();
        return "final-page";
    }

}
