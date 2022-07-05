/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import BaseCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CustomerInfoProps } from "../../pages";
import { Customer } from "../../services/api/addCustomer";

export const Card = ({
  name,
  mobile,
  address,
  _id,
  countryCode,
  countryName,
}: CustomerInfoProps) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/customers/${_id}`);
  };
  const handleDeleteClick = () => {
    Customer.deleteCustomer(_id!)
      .then(() => {
        console.log(`${name} has been deleted successfuly`);
        window.location.reload();
      })
      .catch(() => console.log("failed to delete"));
  };
  return (
    <BaseCard sx={{ minWidth: 270, mr: 10 }}>
      <CardContent>
        <img
          alt="monster"
          src={`https://robohash.org/${_id}?set=set2&size=180x180`}
        />
        <Typography variant="h6" component="div">
          {`Name: ${name}`}
        </Typography>
        <Typography variant="body1">{`Address: ${address}`}</Typography>
        <Typography variant="body1">{`Mobile Number: ${mobile}`}</Typography>
        <Typography variant="body1">{`country Code: ${countryCode}`}</Typography>
        <Typography variant="body1">{`country Name: ${countryName}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEditClick}>
          Edit
        </Button>
        <Button size="small" onClick={handleDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </BaseCard>
  );
};
