package com.example.solobackend.controller;

import com.example.solobackend.model.CustomerDetails;
import com.example.solobackend.service.CustomerDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CustomerDetailsController {

    private final CustomerDetailsService service;

    public CustomerDetailsController(CustomerDetailsService service) {
        this.service = service;
    }

    @GetMapping("/customerDetails")
    @CrossOrigin(origins = "http://localhost:3000")
    Optional<CustomerDetails> getAll(@RequestParam("id") Long id) {
        return service.getCustomer(id);
    }

    @PostMapping("/customerDetails")
    @CrossOrigin(origins = "http://localhost:3000")
    CustomerDetails save(@RequestBody CustomerDetails customerDetails) {
        return service.postCustomer(customerDetails);
    }

}
