package com.example.solobackend.service;

import com.example.solobackend.model.CustomerDetails;

import java.text.DecimalFormat;

public class QuoteCalculator {

    protected static String calculateInsuranceQuote(CustomerDetails customer) {
        double calculatedAmount = 100 * (
                calculateVehicleTypeFactor(customer.getVehicleType()) *
                        calculateEngineSizeFactor(customer.getEngineSize()) *
                        calculateAdditionalDriversFactor(customer.getAddDrivers()) *
                        calculateCommercialUseFactor(customer.getCommercialUse()) *
                        calculateOutsideStateUseFactor(customer.getRegStateUse()) *
                        calculateVehicleValueFactor(customer.getVehCurrentValue())
        );
        DecimalFormat df = new DecimalFormat("###.00");
        String calculatedAmountAsString = df.format(calculatedAmount);
        return calculatedAmountAsString;
    }

    protected static double calculateVehicleTypeFactor(String vehicleType) {
        double vehicleTypeFactor = 0.0;
        String vehicleTypeUpperCase = vehicleType.toUpperCase();

        switch (vehicleTypeUpperCase) {
            case "CABRIOLET":
                vehicleTypeFactor = 1.3;
                break;
            case "COUPE":
                vehicleTypeFactor = 1.4;
                break;
            case "ESTATE":
                vehicleTypeFactor = 1.5;
                break;
            case "HATCHBACK":
                vehicleTypeFactor = 1.6;
                break;
            case "OTHER":
                vehicleTypeFactor = 1.7;
                break;
        }
        return vehicleTypeFactor;
    }

    protected static double calculateEngineSizeFactor(String engineSize) {
        double engineSizeFactor = 0.0;
        String engineSizeUpperCase = engineSize.toUpperCase();

        switch (engineSizeUpperCase) {
            case "1000":
                engineSizeFactor = 1.0;
                break;
            case "1600":
                engineSizeFactor = 1.6;
                break;
            case "2000":
                engineSizeFactor = 2.0;
                break;
            case "2500":
                engineSizeFactor = 2.5;
                break;
            case "3000":
                engineSizeFactor = 3.0;
                break;
            case "OTHER":
                engineSizeFactor = 3.5;
                break;
        }
        return engineSizeFactor;
    }

    protected static double calculateVehicleValueFactor(String vehicleValue) {
        double vehicleValueFactor = 0.0;
        double VehicleValueAsDouble = Double.valueOf(vehicleValue);

        vehicleValueFactor = (VehicleValueAsDouble <= 5000 ? 1.0 : 1.2);

        return vehicleValueFactor;
    }

    protected static double calculateAdditionalDriversFactor(String additionalDrivers) {
        double additionalDriversFactor = 0.0;
        double additionalDriversAsDouble = Double.valueOf(additionalDrivers);

        additionalDriversFactor = (additionalDriversAsDouble < 2.0 ? 1.1 : 1.2);

        return additionalDriversFactor;
    }

    protected static double calculateCommercialUseFactor(String commercialUse) {
        double commercialUseFactor = 0.0;
        String commercialUseUpperCase = commercialUse.toUpperCase();

        commercialUseFactor = (commercialUseUpperCase.equals("YES") ? 1.1 : 1.0);

        return commercialUseFactor;
    }

    protected static double calculateOutsideStateUseFactor(String outsideStateUse) {
        double outsideStateUseFactor = 0.0;
        String outsideStateUseUpperCase = outsideStateUse.toUpperCase();

        outsideStateUseFactor = (outsideStateUseUpperCase.equals("YES") ? 1.1 : 1.0);

        return outsideStateUseFactor;
    }
}
