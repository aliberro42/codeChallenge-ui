import axios, { AxiosResponse } from "axios";
import { CustomerInfoProps, NumberProps } from "../../pages";

export const Customer = {
  addCustomer: async (
    customerInfo?: CustomerInfoProps
  ): Promise<boolean | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.post(
        `http://localhost:3000/api/addCustomer`,
        customerInfo
      );
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAllCustomers: async (): Promise<CustomerInfoProps[] | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.get(`http://localhost:3000/api/getAll`);
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getCustomerById: async (id: string): Promise<CustomerInfoProps | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.get(`http://localhost:3000/api/getCustomer/${id}`);
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  editCustomer: async (
    customerInfo: CustomerInfoProps
  ): Promise<CustomerInfoProps | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.patch(
        `http://localhost:3000/api/update/${customerInfo._id}`,
        customerInfo
      );
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteCustomer: async (id: string): Promise<boolean | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
