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
    public void testCalculateInsurcanceQuoteScenario1() {

        // setup driver
        String firstName = "Conor";
        String lastName = "Hawkins";
        Long id = 1L;
        String prefix = "Mr";
        String telNumber = "12345678910";
        String address1 = "123";
        String address2 = "Something Road";
        String city = "Belfast";
        String postCode = "BT12 7AG";
        String carType = "Hatchback";
        String engineSize = "1600";
        String additionalDrivers = "2";
        String commercialPurposes = "Yes";
        String outsideState = "Yes";
        String vehicleValue = "5000";
        String dateRegistered = "10-02-2021";
        CustomerDetails customer = new CustomerDetails(id, prefix, firstName, lastName, telNumber, address1,
                address2, city, postCode, carType, engineSize, additionalDrivers,
                commercialPurposes, outsideState, vehicleValue, dateRegistered);

        assertEquals(371.71, Double.valueOf(QuoteCalculator.calculateInsuranceQuote(customer)), 0.1);
    }

    @Test
    public void testCalculateInsurcanceQuoteScenario2() {

        // setup driver
        String firstName = "Conor";
        String lastName = "Hawkins";
        Long id = 1L;
        String prefix = "Mr";
        String telNumber = "12345678910";
        String address1 = "123";
        String address2 = "Something Road";
        String city = "Belfast";
        String postCode = "BT12 7AG";
        String carType = "Cabriolet";
        String engineSize = "3000";
        String additionalDrivers = "0";
        String commercialPurposes = "No";
        String outsideState = "No";
        String vehicleValue = "15000";
        String dateRegistered = "10-02-2021";
        CustomerDetails customer = new CustomerDetails(id, prefix, firstName, lastName, telNumber, address1,
                address2, city, postCode, carType, engineSize, additionalDrivers,
                commercialPurposes, outsideState, vehicleValue, dateRegistered);

        assertEquals(514.80, Double.valueOf(QuoteCalculator.calculateInsuranceQuote(customer)), 0.1);
    }
}
