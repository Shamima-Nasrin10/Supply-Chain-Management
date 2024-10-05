package com.sabit.nexchain.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {



//    @GetMapping("/")
//    public String index(){
//        return  "index";
//
//        }

    @GetMapping("/")
    public String demo(){
        return  "home/demo";

    }
}
