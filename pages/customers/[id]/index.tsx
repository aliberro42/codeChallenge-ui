import { Button, Container, FormControl, TextField } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import * as Yup from "yup";
import { CustomerInfoProps } from "../..";
import { Customer } from "../../../services/api/addCustomer";
import { numVerify } from "../../../services/api/ValidateNumber";

function CustomerEdit() {
  const router = useRouter();
  const id: string = router.query.id!.toString();
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<CustomerInfoProps>();

  const initialValues: CustomerInfoProps = {
    name: "",
    address: "",
    mobile: "",
    countryCode: "",
    countryName: "",
  };

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
    });
  const onSubmit = () => {
    numVerify.ValidateNumber(formik.values.mobile!).then((res) => {
      if (res?.valid) {
        Customer.editCustomer({
          _id: selectedCustomer?._id,
          name: formik.values.name,
          address: formik.values.address,
          mobile: formik.values.mobile,
        })
          .then((res) => {
            alert(`Customer edited successfuly`);
            router.push("http://localhost:3001/customers");
          })
          .catch((res) => alert(`edit failed`));
      } else {
        alert(`Phone Number does not match country format `);
      }
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  React.useEffect(() => {
    Customer.getCustomerById(id)
      .then((res) => {
        setSelectedCustomer(res!);
        formik.setValues(res!);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FormControl>
                <TextField
                  label={"Name"}
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100%", color: "red" }}>
                    {formik.errors.name}{" "}
                  </div>
                ) : null}
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  label={"Address"}
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.address}
                />
                {formik.errors.address && formik.touched.address ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100%", color: "red" }}>
                    {formik.errors.address}{" "}
                  </div>
                ) : null}
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  label={"Phone Number"}
                  type="number"
                  name="mobile"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values?.mobile}
                />
                {formik.errors.mobile && formik.touched.mobile ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100%", color: "red" }}>
                    {formik.errors.mobile}{" "}
                  </div>
                ) : null}
              </FormControl>

              <br />
              <Button variant="contained" type="submit">
                Edit Customer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CustomerEdit;
