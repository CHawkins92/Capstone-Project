package com.example.solobackend.controller;

import com.example.solobackend.model.CustomerDetails;
import com.example.solobackend.service.CustomerDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerDetailsController {

    private final CustomerDetailsService service;

    public CustomerDetailsController(CustomerDetailsService service) {
        this.service = service;
    }

    @GetMapping("/customerDetailsAll")
    List <CustomerDetails> getAllCustomers(){
        return service.getAll();
    }

    @GetMapping("/customerDetails")
    Optional<CustomerDetails> getCustomerById(@RequestParam("id") Long id) {
        return service.getCustomer(id);
    }

    @PostMapping("/customerDetails")
    CustomerDetails save(@RequestBody CustomerDetails customerDetails) {
        return service.postCustomer(customerDetails);
    }

    @DeleteMapping("customerDetails")
    void delete(@RequestParam("id") Long id) {
        service.deleteCustomer(id);
    }

    @PutMapping("customerDetails")
    void update(@RequestParam("id") Long id, @RequestParam("newTelephoneNumber") String newTelephoneNumber) {
        service.updateCustomer(id, newTelephoneNumber);
    }
}
