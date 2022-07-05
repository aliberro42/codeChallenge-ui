import axios, { AxiosResponse } from "axios";
import { NumberProps } from "../../pages";
const Token1 = "Yu1aGPap21e7cxzxHRpNs1K4fbv76Tyn";
const token2 = "OWoNWnhACzU2YPLyOojhKRGH1KYjok34";
const token3 = "JExvOYXOK8lWiavV6XI9xyUqSEIthSxR";

const requestOptions = {
  apiKey: token3,
};

export const numVerify = {
  ValidateNumber: async (number?: string): Promise<NumberProps | null> => {
    let results: AxiosResponse | null;
    try {
      results = await axios.get(
        `https://api.apilayer.com/number_verification/validate?number=${number}`,
        {
          headers: requestOptions,
        }
      );
      if (results?.status === 200) {
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
