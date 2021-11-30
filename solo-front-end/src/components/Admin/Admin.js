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
  Modal
} from "semantic-ui-react";
import axios from "axios";
import logo from "../../assets/images/allstate_logo.jpg";
import * as FieldValidator from "./FormFieldsValidator";
import SERVER_URL from "../../utils/constants.js";
import {toast} from "react-toastify";

function Admin() {
  const [idToGet, setIdToGet] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [customerDataForDeletion, setCustomerDataForDeletion] = useState(null);
  const [customerDataForUpdate, setCustomerDataForUpdate] = useState(null);

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false) // controls modal state
  const [openConfirmUpdateModal, setOpenConfirmUpdateModal] = useState(false)

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
          if (response.data) {
            setCustomerData(response.data)
          }
        })
        .catch((err) => {
          setCustomerData(null);
          toast.info(`Customer with ID: ${idToGet} does not exist.`)
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
            toast.success(`Customer with ID: ${idToDelete} deleted successfully.`)
            setCustomerData(null);
          }
        })
        .catch((err) => {
          toast.info(`Customer with ID: ${idToDelete} does not exist.`)
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

    axios
        .put(endpointURL, formData)
        .then((response) => {
          if (response.status === 200 && idToGet === idToUpdate) {
            callAPIWithAxiosGET(idToGet);
          }
          toast.success(`Telephone number has been updated`)
        })
        .catch((err) => {
          toast.info(`Customer with ID: ${idToUpdate} does not exist.`)
        });
  }

  async function handleOpenDeleteModal(){

    if(!idToDelete){
      return
    }

    // get the user details to be deleted
    const endpoint = `${SERVER_URL}/customerDetails?id=${idToDelete}`;
    const response = await axios.get(endpoint)
        .then(response => {
          if(response.data){
            setCustomerDataForDeletion(response.data)
            setOpenConfirmDeleteModal(true)
          }
        })
        .catch((err) => {
          setCustomerDataForDeletion(null);
          toast.info(`Customer with ID: ${idToDelete} does not exist.`)
        });
  }

  function handleCloseDeleteModal(deleteConfirmation){
    if(!deleteConfirmation){
      setOpenConfirmDeleteModal(false)
      return
    }

    callAPIWithAxiosDELETE()
    setOpenConfirmDeleteModal(false)
  }

  async function handleOpenUpdateModal(){

    if(!idToUpdate || !telephoneNumber){
      return
    }

    // check new telephone number valid
    if (!FieldValidator.validateTelephoneNumber(telephoneNumber))  {
      toast.warning(`Telephone number is invalid. Must be 11 digits`)
      return
    }

    // get the user details to be updated
    const endpoint = `${SERVER_URL}/customerDetails?id=${idToUpdate}`;
    const response = await axios.get(endpoint)
        .then(response => {
          if(response.data){
            setCustomerDataForUpdate(response.data)
            setOpenConfirmUpdateModal(true)
          }
        })
        .catch((err) => {
          setCustomerDataForUpdate(null);
          toast.info(`Customer with ID: ${idToUpdate} does not exist.`)
        });
  }

  function handleCloseUpdateModal(updateConfirmation){
    if(!updateConfirmation){
      setOpenConfirmUpdateModal(false)
      return
    }

    callAPIWithAxiosPUT()
    setOpenConfirmUpdateModal(false)
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
            onClick={() => handleOpenDeleteModal()}
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
            onClick={() => handleOpenUpdateModal()}
          >
            Update
          </Button>
        </Form.Group>
        </Segment>
      </Form>

      {/* Modals */}
      {/* DELETE */}
      <Modal
          onOpen={() => handleOpenDeleteModal()}
          open={openConfirmDeleteModal}
      >
        <Modal.Content>
          <Header>Are you sure you want to delete this user? This action can not be undone.</Header>
          {customerDataForDeletion &&
          <CustomerDataTable customerData={customerDataForDeletion}/> }
        </Modal.Content>
        <Modal.Actions>
          <Button
              content="No"
              labelPosition='right'
              icon='close'
              onClick={() => handleCloseDeleteModal(false)}
              negative
          />
          <Button
              content="Yes"
              labelPosition='right'
              icon='checkmark'
              onClick={() => handleCloseDeleteModal(true)}
              positive
          />
        </Modal.Actions>
      </Modal>

      {/* UPDATE */}
      <Modal
          onOpen={() => handleOpenUpdateModal()}
          open={openConfirmUpdateModal}
      >
        <Modal.Content>
          <Header>Update telephone number</Header>
          {customerDataForUpdate && telephoneNumber &&
          <p>Update telephone number from {customerDataForUpdate.telephoneNumber} to {telephoneNumber}?</p> }
        </Modal.Content>
        <Modal.Actions>
          <Button
              content="cancel"
              labelPosition='right'
              icon='close'
              onClick={() => handleCloseUpdateModal(false)}
              negative
          />
          <Button
              content="Update"
              labelPosition='right'
              icon='checkmark'
              onClick={() => handleCloseUpdateModal(true)}
              positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Admin;
