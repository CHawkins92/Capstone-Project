package com.example.solobackend.service;

import com.example.solobackend.model.CustomerDetails;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class QuoteCalculatorTest {

    @Test
    public void testCalculateVehicleTypeFactor() {
        assertEquals(1.3, QuoteCalculator.calculateVehicleTypeFactor("Cabriolet"), 0.0);
        assertEquals(1.4, QuoteCalculator.calculateVehicleTypeFactor("Coupe"), 0.0);
        assertEquals(1.5, QuoteCalculator.calculateVehicleTypeFactor("Estate"), 0.0);
        assertEquals(1.6, QuoteCalculator.calculateVehicleTypeFactor("Hatchback"), 0.0);
        assertEquals(1.7, QuoteCalculator.calculateVehicleTypeFactor("Other"), 0.0);
    }

    @Test
    public void testCalculateEngineSizeFactor() {
        assertEquals(1.0, QuoteCalculator.calculateEngineSizeFactor("1000"), 0.0);
        assertEquals(1.6, QuoteCalculator.calculateEngineSizeFactor("1600"), 0.0);
        assertEquals(2.0, QuoteCalculator.calculateEngineSizeFactor("2000"), 0.0);
        assertEquals(2.5, QuoteCalculator.calculateEngineSizeFactor("2500"), 0.0);
        assertEquals(3.0, QuoteCalculator.calculateEngineSizeFactor("3000"), 0.0);
        assertEquals(3.5, QuoteCalculator.calculateEngineSizeFactor("Other"), 0.0);
    }

    @Test
    public void testCalculateVehicleValueFactor() {
        assertEquals(1.0, QuoteCalculator.calculateVehicleValueFactor("4000"), 0.0);
        assertEquals(1.2, QuoteCalculator.calculateVehicleValueFactor("6000"), 0.0);

        // Edge cases
        assertEquals(1.0, QuoteCalculator.calculateVehicleValueFactor("4999"), 0.0);
        assertEquals(1.0, QuoteCalculator.calculateVehicleValueFactor("5000"), 0.0);
        assertEquals(1.2, QuoteCalculator.calculateVehicleValueFactor("5001"), 0.0);
    }

    @Test
    public void testCalculateAdditionalDriversFactor() {
        assertEquals(1.1, QuoteCalculator.calculateAdditionalDriversFactor("1"), 0.0);
        assertEquals(1.2, QuoteCalculator.calculateAdditionalDriversFactor("2"), 0.0);
    }

    @Test
    public void testCalculateCommercialUseFactor() {
        assertEquals(1.1, QuoteCalculator.calculateCommercialUseFactor("Yes"), 0.0);
        assertEquals(1.0, QuoteCalculator.calculateCommercialUseFactor("No"), 0.0);
    }

    @Test
    public void testCalculateOutsideStateUseFactor() {
        assertEquals(1.1, QuoteCalculator.calculateOutsideStateUseFactor("Yes"), 0.0);
        assertEquals(1.0, QuoteCalculator.calculateOutsideStateUseFactor("No"), 0.0);
    }

    @Test
    public void testCalculateInsurcanceQuote() {

        // setup driver
        var firstName = "Conor";
        var lastName = "Hawkins";
        var id = 1L;
        var prefix = "Mr";
        var telNumber = "12345678910";
        var address1 = "123";
        var address2 = "Something Road";
        var city = "Belfast";
        var postCode = "BT12 7AG";
        var carType = "Hatchback";
        var engineSize = "2000";
        var additionalDrivers = "1";
        var commercialPurposes = "No";
        var outsideState = "Yes";
        var vehicleValue = "5000";
        var dateRegistered = "10-02-2021";
        CustomerDetails customer = new CustomerDetails(id, prefix, firstName, lastName, telNumber, address1,
                address2, city, postCode, carType, engineSize, additionalDrivers,
                commercialPurposes, outsideState, vehicleValue, dateRegistered);

        assertEquals(0.0, Double.valueOf(QuoteCalculator.calculateInsuranceQuote(customer)), 0.1);
    }
}
