import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../styles/Home.module.css";
import { numVerify } from "../services/api/ValidateNumber";
import { Customer } from "../services/api/addCustomer";

import { Button, FormControl, TextField } from "@mui/material";
import { useRouter } from "next/router";
import LabelWithIcon from "../components/label-with-Icon/label-icon";

export type NumberProps = {
  carrier: string;
  country_code: string;
  country_name: string;
  country_prefix: string;
  international_format: string;
  line_type: string;
  local_format: string;
  location: string;
  number: string;
  valid: boolean;
};
export type CustomerInfoProps = {
  _id?: string;
  name?: string;
  address?: string;
  mobile?: string | null;
  password?: string;
  countryCode?: string;
  countryName?: string;
};
export type PasswordValidationProps = {
  isEightCharacters: boolean;
  isIncludeNumber: boolean;
  isIncludeSpecialCharacter: boolean;
  isIncludeUpperCase: boolean;
  isIncludeLowerCase: boolean;
};
const Home: NextPage = () => {
  const [number, setNumber] = React.useState<NumberProps>();
  const [message, setMessage] = React.useState<string>();

  const [passwordValidationConditions, setPasswordValidationConditions] =
    React.useState<PasswordValidationProps>({
      isEightCharacters: false,
      isIncludeNumber: false,
      isIncludeSpecialCharacter: false,
      isIncludeUpperCase: false,
      isIncludeLowerCase: false,
    });

  const initialValues: CustomerInfoProps = {
    name: "",
    address: "",
    mobile: "",
    password: "",
    countryCode: "",
    countryName: "",
  };
  const router = useRouter();

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
  const onSubmit = () => {
    numVerify
      .ValidateNumber(formik.values.mobile!)
      .then((res) => {
        if (res?.valid) {
          Customer.addCustomer({
            name: formik.values.name,
            address: formik.values.address,
            mobile: formik.values.mobile,
            countryCode: res?.country_prefix,
            countryName: res?.country_name,
          })

            .then((res) => {
              alert(`Customer added successfuly`);
              router.push("http://localhost:3001/customers");
            })
            .catch((res) => alert(`Customer asertion failed`));
        } else {
          alert(`Phone Number does not match country format `);
        }
      })
      .catch((error) => () => console.log(error));
  };

  const passowrdValidation = () => {
    if (formik.values.password?.match(/[a-z]/g)) {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeLowerCase: true,
        };
      });
    } else {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeLowerCase: false,
        };
      });
    }
    if (formik.values.password?.match(/[A-Z]/g)) {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeUpperCase: true,
        };
      });
    } else {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeUpperCase: false,
        };
      });
    }
    if (formik.values.password?.match(/[0-9]/g)) {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeNumber: true,
        };
      });
    } else {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeNumber: false,
        };
      });
    }
    if (formik.values.password?.length! >= 8) {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isEightCharacters: true,
        };
      });
    } else {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isEightCharacters: false,
        };
      });
    }
    if (formik.values.password?.match(/[^a-zA-Z0-9 ]+/)) {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeSpecialCharacter: true,
        };
      });
    } else {
      setPasswordValidationConditions((prevValidation) => {
        return {
          ...prevValidation,
          isIncludeSpecialCharacter: false,
        };
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
              <FormControl style={{ width: 750 }}>
                <TextField
                  label={"Name"}
                  type="text"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.mobile && formik.touched.mobile ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100%", color: "red" }}>
                    {formik.errors.name}
                  </div>
                ) : null}
              </FormControl>

              <br />
              <FormControl>
                <TextField
                  error={!!(formik.errors.address && formik.touched.address)}
                  label={"Address"}
                  type="text"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100%", color: "red" }} color="red">
                    {formik.errors.address}{" "}
                  </div>
                ) : null}
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  error={!!(formik.errors.mobile && formik.touched.mobile)}
                  label={"Phone Number"}
                  type="number"
                  name="mobile"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                />
                {formik.errors.mobile && formik.touched.mobile ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100", color: "red" }}>
                    {formik.errors.mobile}{" "}
                  </div>
                ) : null}
              </FormControl>
              <br />
              <FormControl>
                <TextField
                  error={!!(formik.errors.password && formik.touched.password)}
                  label={"Password"}
                  type="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onKeyUp={passowrdValidation}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  // eslint-disable-next-line react/jsx-indent
                  <div style={{ width: "100", color: "red" }}>
                    {formik.errors.password}{" "}
                  </div>
                ) : null}
              </FormControl>
              <br />
              <Button variant="contained" type="submit">
                Add Customer
              </Button>
            </div>
            <h2>{number?.country_name}</h2>
          </div>
          <div>
            <LabelWithIcon
              icon={passwordValidationConditions.isEightCharacters}
              label=" must include 8 character"
            />

            <LabelWithIcon
              icon={passwordValidationConditions.isIncludeNumber}
              label=" must include one number"
            />

            <LabelWithIcon
              icon={passwordValidationConditions.isIncludeSpecialCharacter}
              label=" must include one special character"
            />

            <LabelWithIcon
              icon={passwordValidationConditions.isIncludeUpperCase}
              label="must include one upperCase"
            />
            <LabelWithIcon
              icon={passwordValidationConditions.isIncludeLowerCase}
              label="must include one lowerCase"
            />
          </div>
        </form>
      </main>

      {/* <footer className={styles.footer}>
        <p>Powered by ali berro </p>
      </footer> */}
    </div>
  );
};

export default Home;
