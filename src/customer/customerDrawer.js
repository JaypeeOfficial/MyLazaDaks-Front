import { Drawer, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import apiClient from "../apiClient";
import Swal from "sweetalert2";

function CustomerDrawer({
  open,
  setOpen,
  errors,
  fetchCustomer,
  handleSubmit,
  register,
  reset,
  refetch,
}) {
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const onSaveClick = async (data) => {
    try {
      if (data.formData.id === "") {
        delete data.formData["id"];
        const res = apiClient
          .post("Customer/AddNewCustomer", data.formData)
          .then((res) => {
            handleClose();
            Swal.fire("Successfully added customer!", "", "success");
            refetch();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else {
        const res = apiClient
          .put(`Customer/UpdateCustomer`, data.formData)
          .then((res) => {
            Swal.fire("Successfully updated customer details!", "", "success");
            refetch();
            reset();
            handleClose();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    } catch (err) {}
    console.log(data);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          width: 300,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <FormLabel
          sx={{
            fontWeight: 600,
            fontSize: 25,
            color: "#761137",
          }}
        >
          Customer Form
        </FormLabel>
      </div>

      <Divider />

      <form onSubmit={handleSubmit(onSaveClick)}>
        <FormLabel
          sx={{
            marginLeft: "10px",
            marginBottom: "10px",
            marginTop: "10px",
            fontWeight: 600,
            color: "#761137",
          }}
        >
          Customer Name:
        </FormLabel>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextField
            id="customername"
            label="Customer Name"
            variant="outlined"
            placeholder="Customer Name"
            color="warning"
            align="center"
            sx={{
              marginBottom: "20px",
              boxShadow: 5,
              borderRadius: "5px",
              "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                borderColor: "#761137",
              },
            }}
            {...register("formData.customerName")}
          />
        </div>

        <FormLabel
          sx={{
            marginLeft: "10px",
            marginBottom: "10px",
            fontWeight: 600,
            color: "#761137",
          }}
        >
          City:
        </FormLabel>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextField
            id="city"
            label="City"
            variant="outlined"
            placeholder="City"
            color="warning"
            sx={{
              marginBottom: "20px",
              boxShadow: 5,
              borderRadius: "5px",
              "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                borderColor: "#761137",
              },
            }}
            {...register("formData.city")}
          />
        </div>

        <FormLabel
          sx={{
            marginLeft: "10px",
            marginBottom: "10px",
            fontWeight: 600,
            color: "#761137",
          }}
        >
          Phone:
        </FormLabel>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            placeholder="Phone"
            color="warning"
            sx={{
              marginBottom: "20px",
              boxShadow: 5,
              borderRadius: "5px",
              "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                borderColor: "#761137",
              },
            }}
            {...register("formData.phone")}
          />
        </div>

        <Divider />

        <div
          style={{
            marginLeft: "100px",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "pink",
              boxShadow: 10,
              color: "#761137",
              width: 90,
            }}
          >
            Cancel..
          </Button>

          <Button
            type="submit"
            sx={{
              bgcolor: "pink",
              boxShadow: 10,
              color: "#761137",
              width: 90,
              m: 1,
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

export default CustomerDrawer;
