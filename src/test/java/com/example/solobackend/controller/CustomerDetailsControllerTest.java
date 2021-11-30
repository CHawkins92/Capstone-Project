package com.example.solobackend.controller;

import com.example.solobackend.model.CustomerDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static com.example.solobackend.controller.CustomerDetailsController.ID_NOT_FOUND_ERROR_MSG;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CustomerDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void givenDBInitilizedWith4Records_whenGETCustomers_shouldReturn4Items() throws Exception {
        final MvcResult mvcResult = mockMvc
                .perform(get("/customerDetailsAll"))
                .andDo(print())
                .andReturn();

        final String contentAsString = mvcResult.getResponse().getContentAsString();

        CustomerDetails[] customers = objectMapper.readValue(contentAsString, CustomerDetails[].class);

        assertEquals(4, customers.length);
    }

    @Test
    void givenDBInitilizedWith4Records_whenGETCustomersWithExistingId_thenStatusShouldReturn200() throws Exception {
        int existingId = 1;
        mockMvc.perform(get("/customerDetails?id=" + existingId))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void givenDBInitialisedWith4Records_whenGETCustomerWithNonExistingId_thenShouldReturn404() throws Exception {
        int nonExistingId = 999;
        final MvcResult mvcResult = mockMvc
                .perform(get("/customerDetails?id=" + nonExistingId)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();

        String expectedErrorMessage = ID_NOT_FOUND_ERROR_MSG + nonExistingId;

        assertEquals(expectedErrorMessage, mvcResult.getResponse().getErrorMessage());

    }

    @Test
    @DirtiesContext
    void givenDBInitilizedWith4Records_whenPOSTPeople_shouldSaveAndReturn() throws Exception {
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
        String engineSize = "2000";
        String additionalDrivers = "1";
        String commercialPurposes = "No";
        String outsideState = "Yes";
        String vehicleValue = "5000";
        String dateRegistered = "10-02-2021";
        CustomerDetails customer = new CustomerDetails(id, prefix, firstName, lastName, telNumber, address1,
                address2, city, postCode, carType, engineSize, additionalDrivers,
                commercialPurposes, outsideState, vehicleValue, dateRegistered);

        final String customerAsJSON = objectMapper.writeValueAsString(customer);

        final MvcResult mvcResult = mockMvc
                .perform(post("/customerDetails")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerAsJSON)
                )
                .andDo(print())
                .andReturn();

        final String contentAsString = mvcResult.getResponse().getContentAsString();

        CustomerDetails savedCustomer = objectMapper.readValue(contentAsString, CustomerDetails.class);

        assertAll(
                () -> assertNotNull(savedCustomer.getId()),
                () -> assertEquals(firstName, savedCustomer.getFirstName()),
                () -> assertEquals(lastName, savedCustomer.getLastName())
        );
    }

    @Test
    @DirtiesContext
    void givenDBInitilizedWith4Records_whenDELCustomerWithExistingId_thenStatusShouldReturn200() throws Exception {
        int existingId = 1;
        mockMvc.perform(delete("/customerDetails?id=" + existingId)
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void givenDBInitilizedWith4Records_whenDELCustomerWithNonExistingId_thenShouldReturn404() throws Exception {
        int nonExistingId = 999;
        final MvcResult mvcResult = mockMvc
                .perform(delete("/customerDetails?id=" + nonExistingId)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();

        String expectedErrorMessage = ID_NOT_FOUND_ERROR_MSG + nonExistingId;

        assertEquals(expectedErrorMessage, mvcResult.getResponse().getErrorMessage());
    }

    @Test
    @DirtiesContext
    void givenDBInitilizedWith4Records_whenPUTCustomerTelephoneNumberWithExistingId_thenStatusShouldReturn200AndNewTelephoneNumberChanged() throws Exception {
        Long existingId = 1L;
        String telephoneNumber = "12345678912";

        // get the existing customer telephone Number
        final MvcResult mvcResult = mockMvc.perform(get("/customerDetails?id=" + existingId))
                .andReturn();
        final String existingCustomerAsString = mvcResult.getResponse().getContentAsString();
        CustomerDetails existingCustomer = objectMapper.readValue(existingCustomerAsString, CustomerDetails.class);
        String previousTelephoneNumber = existingCustomer.getTelephoneNumber();

        // Change telephone number and update
        existingCustomer.setTelephoneNumber(telephoneNumber);
        final String driverJSON = objectMapper.writeValueAsString(existingCustomer);
        mockMvc.perform(put("/customerDetails?id=" + existingId + "&newTelephoneNumber=" + telephoneNumber)
                .contentType(MediaType.APPLICATION_JSON)
                .content(driverJSON)
        )
                .andDo(print())
                .andExpect(status().isOk());


        // get the updated customer telephone Number
        final MvcResult mvcResultAfterUpdate = mockMvc.perform(get("/customerDetails?id=" + existingId))
                .andReturn();
        final String updatedCustomerAsString = mvcResultAfterUpdate.getResponse().getContentAsString();
        CustomerDetails updatedCustomer = objectMapper.readValue(updatedCustomerAsString, CustomerDetails.class);
        String updatedTelephoneNumber = updatedCustomer.getTelephoneNumber();

        // compare previous and updated telephone number
        assertNotEquals(previousTelephoneNumber, updatedTelephoneNumber);
        assertEquals(telephoneNumber, updatedTelephoneNumber);

    }

    @Test
    @DirtiesContext
    void givenDBInitilizedWith4Records_whenPUTCustomerTelephoneNumberWithNonExistingId_thenShouldReturn404() throws Exception {
        Long nonExistingId = 999L;
        String telephoneNumber = "12345678912";
        // setup driver
        String firstName = "Conor";
        String lastName = "Hawkins";
        Long id = nonExistingId;
        String prefix = "Mr";
        String telNumber = telephoneNumber;
        String address1 = "123";
        String address2 = "Something Road";
        String city = "Belfast";
        String postCode = "BT12 7AG";
        String carType = "Hatchback";
        String engineSize = "2000";
        String additionalDrivers = "1";
        String commercialPurposes = "No";
        String outsideState = "Yes";
        String vehicleValue = "5000";
        String dateRegistered = "10-02-2021";
        CustomerDetails customer = new CustomerDetails(id, prefix, firstName, lastName, telNumber, address1,
                address2, city, postCode, carType, engineSize, additionalDrivers,
                commercialPurposes, outsideState, vehicleValue, dateRegistered);

        final String driverJSON = objectMapper.writeValueAsString(customer);

        final MvcResult mvcResult = mockMvc
                .perform(put("/customerDetails?id=" + nonExistingId + "&newTelephoneNumber=" + telNumber)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(driverJSON)
                )
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();

        String expectedErrorMessage = ID_NOT_FOUND_ERROR_MSG + nonExistingId;

        assertEquals(expectedErrorMessage, mvcResult.getResponse().getErrorMessage());
    }
}
