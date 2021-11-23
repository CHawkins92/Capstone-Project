import React, { useState, useEffect } from "react";
import "./Create.css";
import {
  Button,
  Form,
  Divider,
  Segment,
  Image,
  Icon,
  Header,
} from "semantic-ui-react";
import axios from "axios";
import * as ErrorMsgConstants from "./ErrorMessages.js";
import * as DropDownOptions from "./DropdownOptions";
import * as FieldValidator from "./FormFieldsValidator";
import logo from "../../assets/images/allstate_logo.jpg";

function Create() {
  // Properties mapping to form fields
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [addDrivers, setAddDrivers] = useState("");
  const [commercialUse, setCommercialUse] = useState("No");
  const [regStateUse, setRegStateUse] = useState("No");
  const [vehCurrentValue, setVehCurrentValue] = useState("");
  const [vehDateRegistered, setVehDateRegistered] = useState("");

  // Fields that require validation
  const [fieldsRequiringValidation, setFieldsRequiringValidation] = useState({
    prefix: "", 
    firstName: "",
    lastName: "",
    telephoneNumber: "",
    addressLine1: "",
    city: "",
    postcode: "",
    vehicleType: "",
    engineSize: "",
    addDrivers: "",
    vehCurrentValue: "",
    vehDateRegistered: "",
  });

  // Field error status, all initialized false. true indicates error is present in field
  const [fieldErrors, setFieldErrors] = useState({
    prefix: {
      missing: false,
    },
    firstName: {
      missing: false,
    },
    lastName: {
      missing: false,
    },
    telephoneNumber: {
      missing: false,
      invalid: false,
    },
    addressLine1: {
      missing: false,
    },
    city: {
      missing: false,
    },
    postcode: {
      missing: false,
      invalid: false,
    },
    vehicleType: {
      missing: false,
    },
    engineSize: {
      missing: false,
    },
    addDrivers: {
      missing: false,
      invalid: false,
    },
    vehCurrentValue: {
      missing: false,
      invalid: false,
    },
    vehDateRegistered: {
      missing: false,
      invalid: false,
    },
  });


  /*
  ==============================
   useEffects
  ==============================
  */
  useEffect(() => {
    fieldsRequiringValidation.prefix = prefix;
    fieldsRequiringValidation.firstName = firstName;
    fieldsRequiringValidation.lastName = lastName;
    fieldsRequiringValidation.telephoneNumber = telephoneNumber;
    fieldsRequiringValidation.addressLine1 = addressLine1;
    fieldsRequiringValidation.city = city;
    fieldsRequiringValidation.postcode = postcode;
    fieldsRequiringValidation.vehicleType = vehicleType;
    fieldsRequiringValidation.engineSize = engineSize;
    fieldsRequiringValidation.addDrivers = addDrivers;
    fieldsRequiringValidation.vehCurrentValue = vehCurrentValue;
    fieldsRequiringValidation.vehDateRegistered = vehDateRegistered;
    setFieldsRequiringValidation({ ...fieldsRequiringValidation });
  }, [
    prefix,
    firstName,
    lastName,
    telephoneNumber,
    addressLine1,
    city,
    postcode,
    vehicleType,
    engineSize,
    addDrivers,
    vehCurrentValue,
    vehDateRegistered,
  ]);


  /*
  ==============================
   API functions
  ==============================
  */
  const callAPIWithAxiosPOST = () => {
    const formData = {
      prefix,
      firstName,
      lastName,
      telephoneNumber,
      addressLine1,
      addressLine2,
      city,
      postcode,
      vehicleType,
      engineSize,
      addDrivers,
      commercialUse,
      regStateUse,
      vehCurrentValue,
      vehDateRegistered,
    };

    const endpointURL = "http://localhost:8080/customerDetails";

    axios
      .post(endpointURL, formData)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };


  /*
  ==============================
   Handler functions
  ==============================
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    setFieldErrors({
      ...FieldValidator.validateForm(fieldsRequiringValidation, fieldErrors),
    });

    console.log(fieldErrors)

    let errFlag = false;

    // Check if any fields contain errors
    for (let fieldName in fieldErrors) {
      for (let errorType in fieldErrors[fieldName]) {
        // errorType = missing, invalid
        if (fieldErrors[fieldName][errorType]) {
          // true = error with field
          errFlag = true;
          break;
        }
      }
    }

    if (errFlag) {
      console.log("Errors present");
    } else {
      console.log("no errors");
      callAPIWithAxiosPOST();
    }
  };

  const handleCommercialUseChange = (value) => {
    if (value) {
      setCommercialUse("Yes");
    } else {
      setCommercialUse("No");
    }
  };

  const handleRegStateUseChange = (value) => {
    if (value) {
      setRegStateUse("Yes");
    } else {
      setRegStateUse("No");
    }
  };



  return (
    <div>
      <Form>
        <Segment color="blue">
          <Image className="allstate-img-create" src={logo} />
          <Divider horizontal>
            <Header as="h4" color="blue">
              <Icon name="address book" color="blue" />
              Your Details
            </Header>
          </Divider>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Prefix</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.prefixOptions}
                onChange={(e, { value }) => setPrefix(value)}
                value={prefix}
                error={
                  fieldErrors.prefix.missing
                    ? ErrorMsgConstants.PREFIX_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                error={
                  fieldErrors.firstName.missing
                    ? ErrorMsgConstants.FIRST_NAME_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                error={
                  fieldErrors.lastName.missing
                    ? ErrorMsgConstants.LAST_NAME_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Telephone Number</label>
            <Form.Input
              placeholder="Telephone Number"
              onChange={(e) => setTelephoneNumber(e.target.value)}
              error={
                fieldErrors.telephoneNumber.missing
                  ? ErrorMsgConstants.TELEPHONE_NUMBER_REQUIRED
                  : fieldErrors.telephoneNumber.invalid
                  ? ErrorMsgConstants.TELEPHONE_NUMBER_INVALID
                  : false
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Address Line 1</label>
            <Form.Input
              placeholder="Address Line 1"
              onChange={(e) => setAddressLine1(e.target.value)}
              error={
                fieldErrors.addressLine1.missing
                  ? ErrorMsgConstants.ADDRESS_LINE_1_REQUIRED
                  : false
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Address Line 2</label>
            <input
              placeholder="Address Line 2"
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>City</label>
              <Form.Input
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                error={
                  fieldErrors.city.missing
                    ? ErrorMsgConstants.CITY_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Postcode</label>
              <Form.Input
                placeholder="E.g BT99 7AG"
                onChange={(e) => setPostcode(e.target.value)}
                error={
                  fieldErrors.postcode.missing
                    ? ErrorMsgConstants.POSTCODE_REQUIRED
                    : fieldErrors.postcode.invalid
                    ? ErrorMsgConstants.POSTCODE_INVALID
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment color="blue">
          <Divider horizontal>
            <Header as="h4" color="blue">
              <Icon name="car" color="blue" />
              Vehicle Details
            </Header>
          </Divider>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Vehicle type</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.vehTypeOptions}
                onChange={(e, { value }) => setVehicleType(value)}
                value={vehicleType}
                error={
                  fieldErrors.vehicleType.missing
                    ? ErrorMsgConstants.VEHICLE_TYPE_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Engine size</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.engSizeOptions}
                onChange={(e, { value }) => setEngineSize(value)}
                value={engineSize}
                error={
                  fieldErrors.engineSize.missing
                    ? ErrorMsgConstants.ENGINE_SIZE_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Additional Drivers</label>
            <Form.Input
              type="number"
              min="0"
              max="5"
              placeholder="Additional Drivers"
              onChange={(e) => setAddDrivers(e.target.value)}
              error={
                fieldErrors.addDrivers.missing
                    ? ErrorMsgConstants.ADDITIONAL_DRIVERS_REQUIRED
                    : fieldErrors.addDrivers.invalid
                    ? ErrorMsgConstants.ADDITIONAL_DRIVERS_INVALID
                    : false
              }
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Will this vehicle be used for commercial purposes?</label>
              <Form.Checkbox
                toggle
                label={"Selected value: " + commercialUse}
                onChange={(e, data) => handleCommercialUseChange(data.checked)}
              />
            </Form.Field>
            <Form.Field>
              <label>
                Will this vehicle be used outside the registered state?
              </label>
              <Form.Checkbox
                toggle
                label={"Selected value: " + regStateUse}
                onChange={(e, data) => handleRegStateUseChange(data.checked)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Current value of vehicle?</label>
              <Form.Input
                type="number"
                min="0"
                max="50000"
                placeholder="Current value"
                onChange={(e) => setVehCurrentValue(e.target.value)}
                error={
                  fieldErrors.vehCurrentValue.missing
                    ? ErrorMsgConstants.CURRENT_VALUE_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Date of first registration:</label>
              <Form.Input
                type="date"
                onChange={(e) => setVehDateRegistered(e.target.value)}
                error={
                  fieldErrors.vehDateRegistered.missing
                    ? ErrorMsgConstants.DATE_REGISTERED_REQUIRED
                    : fieldErrors.vehDateRegistered.invalid
                    ? ErrorMsgConstants.DATE_REGISTERED_INVALID
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment>
          <Button fluid basic color="blue" type="submit" onClick={handleSubmit}>
            <b>Get a Quote!</b>
          </Button>
        </Segment>
      </Form>
    </div>
  );
}

export default Create;
