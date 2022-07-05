import { Box } from "@mui/material";
import React from "react";
import { CustomerInfoProps } from "../../pages";

import { Card } from "../card/card";

export type CardListProps = {
  list: CustomerInfoProps[];
};
export const CardList = ({ list }: CardListProps) => (
  <Box display={"flex"}>
    {list.map((customer) => (
      <Card
        key={customer._id}
        name={customer.name}
        address={customer.address}
        mobile={customer.mobile}
        countryCode={customer.countryCode}
        countryName={customer.countryName}
        _id={customer._id}
      />
    ))}
  </Box>
);
