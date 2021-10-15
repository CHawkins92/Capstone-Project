package com.example.solobackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String prefix;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String postcode;
    private String vehicleType;
    private String engineSize;
    private String addDrivers;
    private String commercialUse;
    private String regStateUse;
    private String vehCurrentValue;
    private String vehDateRegistered;

    // Constructors
    public CustomerDetails() {
    }

    public CustomerDetails(Long id, String prefix, String firstName, String lastName, String telephoneNumber,
                           String addressLine1, String addressLine2, String city, String postcode, String vehicleType,
                           String engineSize, String addDrivers, String commercialUse, String regStateUse,
                           String vehCurrentValue, String vehDateRegistered) {
        this.id = id;
        this.prefix = prefix;
        this.firstName = firstName;
        this.lastName = lastName;
        this.telephoneNumber = telephoneNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.postcode = postcode;
        this.vehicleType = vehicleType;
        this.engineSize = engineSize;
        this.addDrivers = addDrivers;
        this.commercialUse = commercialUse;
        this.regStateUse = regStateUse;
        this.vehCurrentValue = vehCurrentValue;
        this.vehDateRegistered = vehDateRegistered;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getEngineSize() {
        return engineSize;
    }

    public void setEngineSize(String engineSize) {
        this.engineSize = engineSize;
    }

    public String getAddDrivers() {
        return addDrivers;
    }

    public void setAddDrivers(String addDrivers) {
        this.addDrivers = addDrivers;
    }

    public String getCommercialUse() {
        return commercialUse;
    }

    public void setCommercialUse(String commercialUse) {
        this.commercialUse = commercialUse;
    }

    public String getRegStateUse() {
        return regStateUse;
    }

    public void setRegStateUse(String regStateUse) {
        this.regStateUse = regStateUse;
    }

    public String getVehCurrentValue() {
        return vehCurrentValue;
    }

    public void setVehCurrentValue(String vehCurrentValue) {
        this.vehCurrentValue = vehCurrentValue;
    }

    public String getVehDateRegistered() {
        return vehDateRegistered;
    }

    public void setVehDateRegistered(String vehDateRegistered) {
        this.vehDateRegistered = vehDateRegistered;
    }
}
