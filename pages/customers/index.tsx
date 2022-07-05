import { Container } from "@mui/material";
import React from "react";
import { CustomerInfoProps } from "..";
import { CardList } from "../../components/card-list/card-list";
import { Customer } from "../../services/api/addCustomer";

function Customers() {
  const [customerArray, setCustomerArray] = React.useState<CustomerInfoProps[]>(
    []
  );

  React.useEffect(() => {
    Customer.getAllCustomers()
      .then((res) => {
        console.log(res!);
        setCustomerArray(res!);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <div
        style={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardList list={customerArray} />
      </div>
    </Container>
  );
}

export default Customers;
