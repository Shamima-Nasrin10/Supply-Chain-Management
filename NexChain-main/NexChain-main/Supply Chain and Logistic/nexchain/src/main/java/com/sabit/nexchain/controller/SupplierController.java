package com.sabit.nexchain.controller;


import com.sabit.nexchain.model.Supplier;
import com.sabit.nexchain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;


    @GetMapping("/supplier-form")

    public String showSupplierForm(Model model) {
        model.addAttribute("supplier", new Supplier());
        return "supplier-form";
    }

    @PostMapping("/saveSupplier")
    public String saveSupplier(@Validated @ModelAttribute Supplier supplier, BindingResult result) {
        if (result.hasErrors()) {
            return "supplier-form";
        }
        supplierRepository.save(supplier);
        return "redirect:/supplier-form";
    }
}
