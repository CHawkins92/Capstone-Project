import React, { useState } from "react";
import "./Admin.css";
import CustomerDataTable from "../../components/CustomerDataTable/CustomerDataTable.js"
import {
  Button,
  Form,
  Divider,
  Segment,
  Icon,
  Header,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import logo from "../../assets/images/allstate_logo.jpg";
import * as FieldValidator from "./FormFieldsValidator";
import SERVER_URL from "../../utils/constants.js";

function Admin() {
  const [idToGet, setIdToGet] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  /*
  ==============================
   API functions
  ==============================
  */
  function callAPIWithAxiosGET(idToGet) {
    //const endpointURL = "http://localhost:8080/customerDetails?id=" + idToGet;
    const endpointURL = `${SERVER_URL}/customerDetails?id=${idToGet}`;

    if(!idToGet){
      setCustomerData(null)
      return
    }

    axios
      .get(endpointURL)
      .then((response) => {
        // If no data returned, assume no matching driver
        if (!response.data) {
          setCustomerData(null);
          alert("Customer with ID: " + idToGet + " does not exist.")
          return
       }
       setCustomerData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callAPIWithAxiosDELETE() {
    //const endpointURL = "http://localhost:8080/customerDetails?id=" + idToDelete;
    const endpointURL = `${SERVER_URL}/customerDetails?id=${idToDelete}`;

    if(!idToDelete){
      return
    }

    axios
      .delete(endpointURL)
      .then((response) => {
        if (response.status === 200 && idToGet === idToDelete) {
          alert("Customer has been deleted successfully");
          setCustomerData(null);
        }
      })
      .catch((err) => {
        alert("Customer with ID: " + idToDelete + " does not exist.");
      });
  }

  function callAPIWithAxiosPUT() {
    const formData = {
      telephoneNumber,
    };

    //const endpointURL = "http://localhost:8080/customerDetails?id=" + idToUpdate +
    //                    "&newTelephoneNumber=" + telephoneNumber;
    const endpointURL = `${SERVER_URL}/customerDetails?id=${idToUpdate}&newTelephoneNumber=${telephoneNumber}`;

    if(!idToUpdate){
      return
    }

    // check new telephone number valid
    if (!FieldValidator.validateTelephoneNumber(formData.telephoneNumber))  {
      alert("Telephone number is invalid");
      return
    }  

    axios
    .put(endpointURL, formData)
    .then((response) => {
      if (response.status === 200 && idToGet === idToUpdate) {
        callAPIWithAxiosGET(idToGet);
      }
    })
    .catch((err) => {
      alert("Customer with ID: " + idToUpdate + " does not exist.")
    });
  }

  return (
    <div>
      <Form>
      <Segment color="blue">
        <Image className="allstate-img-admin" src={logo} />
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="address book" color="blue" />
            View Driver Details
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              type="number"
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToGet(e.target.value)}
            />
          </Form.Field>
          <Button
            basic
            color="green"
            type="submit"
            onClick={() => callAPIWithAxiosGET(idToGet)}
          >
            View
          </Button>
        </Form.Group>
        <CustomerDataTable customerData={customerData}/>
        <div class="ui hidden section divider"></div>
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="user delete" color="blue" />
            Delete a Driver
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              type="number"
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToDelete(e.target.value)}
            />
          </Form.Field>
          <Button
            basic
            color="red"
            type="submit"
            onClick={callAPIWithAxiosDELETE}
          >
            Delete
          </Button>
        </Form.Group>
        <div class="ui hidden section divider"></div>
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="phone square" color="blue" />
            Update Telephone Number
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              type="number"
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToUpdate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Enter telephone number"
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </Form.Field>
          <Button
            basic
            color="yellow"
            type="submit"
            onClick={callAPIWithAxiosPUT}
          >
            Update
          </Button>
        </Form.Group>
        </Segment>
      </Form>
    </div>
  );
}

export default Admin;
