package com.example.solobackend.controller;

import com.example.solobackend.model.CustomerDetails;
import com.example.solobackend.service.CustomerDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerDetailsController {

    private final CustomerDetailsService service;
    public static final String ID_NOT_FOUND_ERROR_MSG = "Driver Not Found for ID: ";

    public CustomerDetailsController(CustomerDetailsService service) {
        this.service = service;
    }

    @GetMapping("/customerDetailsAll")
    List <CustomerDetails> getAllCustomers(){
        return service.getAll();
    }

    @GetMapping("/customerDetails")
    Optional<CustomerDetails> getCustomerById(@RequestParam("id") Long id) {
        Optional<CustomerDetails> customerToGet = service.getCustomer(id);
        if(customerToGet.isPresent()){
            return customerToGet;
        }else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ID_NOT_FOUND_ERROR_MSG + id);
        }
    }

    @PostMapping("/customerDetails")
    CustomerDetails save(@RequestBody CustomerDetails customerDetails) {
        return service.postCustomer(customerDetails);
    }

    @DeleteMapping("customerDetails")
    void delete(@RequestParam("id") Long id) {
        Optional<CustomerDetails> customerToDelete = service.getCustomer(id);
        if(customerToDelete.isPresent()){
            service.deleteCustomer(id);
            return;
        }else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ID_NOT_FOUND_ERROR_MSG + id);
        }
    }

    @PutMapping("customerDetails")
    void update(@RequestParam("id") Long id, @RequestParam("newTelephoneNumber") String newTelephoneNumber) {
        Optional<CustomerDetails> customerToUpdate = service.getCustomer(id);
        if(customerToUpdate.isPresent()){
            service.updateCustomer(id, newTelephoneNumber);
            return;
        }else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ID_NOT_FOUND_ERROR_MSG + id);
        }
    }
}
