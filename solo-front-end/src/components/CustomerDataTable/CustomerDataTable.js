import {
    Table,
    Divider,
    Container,
    Segment,
    Icon,
    Header,
  } from "semantic-ui-react";

function CustomerDataTable(props){

    const getFormattedName = () => {
        return (
            props.customerData.prefix +
            " " +
            props.customerData.firstName +
            " " +
            props.customerData.lastName
        );
    };

    const getFormattedQuote = () => {
        return "£ " + props.customerData.quotedAmount;
    };


    if (props.customerData != null) {
        return (
          <Container textAlign="center">
            <Segment color="blue">
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="address book" color="blue" />
                  Customer Details
                </Header>
              </Divider>
              <p>{getFormattedName()}</p>
              <p>{props.customerData.telephoneNumber}</p>
              <p>{props.customerData.addressLine1}</p>
              <p>{props.customerData.addressLine2}</p>
              <p>{props.customerData.city}</p>
              <p>{props.customerData.postcode}</p>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="car" color="blue" />
                  Vehicle Details
                </Header>
              </Divider>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={4}>Vehicle Type</Table.Cell>
                    <Table.Cell>{props.customerData.vehicleType}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Engine Size</Table.Cell>
                    <Table.Cell>{props.customerData.engineSize}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Additional Drivers</Table.Cell>
                    <Table.Cell>{props.customerData.addDrivers}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Commercial Use</Table.Cell>
                    <Table.Cell>{props.customerData.commercialUse}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Registered State Use Only</Table.Cell>
                    <Table.Cell>{props.customerData.regStateUse}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Current Value</Table.Cell>
                    <Table.Cell>{props.customerData.vehCurrentValue}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Date Registered</Table.Cell>
                    <Table.Cell>{props.customerData.vehDateRegistered}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="pound sign" color="green" />
                  Quoted Amount
                </Header>
              </Divider>
              <b>{getFormattedQuote()}</b>
            </Segment>
          </Container>
        );
      }else{
          return null
      }
}

export default CustomerDataTable;