package com.tushar.SpringEcom.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HelloControler {

    @GetMapping("/hello")
    public String gr(){

        return "welcome to turbocart";
    }

}
