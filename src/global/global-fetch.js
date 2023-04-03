import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGlobalFetchCustomer = () => {
  return useQuery(["Customer"], async () => {
    try {
      const res = await apiClient.get("Customer/GetAllCustomers");

      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
};

export const useGlobalFetchUser = () => {
  return useQuery(["Users"], async () => {
    try {
      const res = await apiClient.get("User/GetAllUsers");

      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
};
