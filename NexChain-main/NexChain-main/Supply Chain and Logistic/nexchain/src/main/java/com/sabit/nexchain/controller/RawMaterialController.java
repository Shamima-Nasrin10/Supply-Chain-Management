package com.sabit.nexchain.controller;


import com.sabit.nexchain.model.RawMaterial;
import com.sabit.nexchain.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RawMaterialController {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @GetMapping("/rawmaterial-form")
    public String showRawMaterialForm(Model model) {
        model.addAttribute("rawMaterial", new RawMaterial());
        return "rawmaterial-form";

    }
    @PostMapping("/saveRawMaterial")
    public String saveRawMaterial(@ModelAttribute RawMaterial rawMaterial){
        rawMaterialRepository.save(rawMaterial);
        return "redirect:/rawmaterial-form";

    }


    }
