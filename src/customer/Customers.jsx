import {
  Fab,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiClient from "../apiClient";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import CustomerDrawer from "./customerDrawer";
import { Provider, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGlobalFetchCustomer } from "../global/global-fetch";

const columns = [
  {
    id: "id",
    label: "Id",
    minWidth: 20,
  },
  {
    id: "customername",
    label: "Customer Name",
    minWidth: 170,
  },
  {
    id: "city",
    label: "City",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "addedby",
    label: "Added By",
    minWidth: 170,
  },
  {
    id: "dateadded",
    label: "Date Added",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
  },
];

function Customers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const [customerForm, setCustomerForm] = useState([]);
  var user = useSelector((state) => state.user);

  //const [loading, setLoading] = useState(true);

  const { data: customerForm, isError, refetch } = useGlobalFetchCustomer();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const skeletonArray = Array(5).fill("");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [];

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // const fetchCustomerApi = async () => {
  //   const res = await apiClient.get("Customer/GetAllCustomers");
  //   return res.data;
  // };

  // const fetchCustomer = () => {
  //   fetchCustomerApi().then((res) => {
  //     setCustomerForm(res);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   fetchCustomer();

  //   return () => {
  //     setCustomerForm([]);
  //   };
  // }, []);

  const schema = yup.object().shape({
    formData: yup.object().shape({
      id: yup.string(),
      customerName: yup.string().required("Customer Name is required"),
      city: yup.string().required("City is requried"),
      phone: yup.string().required("Phone is required"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      formData: {
        id: "",
        customerName: "",
        city: "",
        phone: "",
        addedBy: user?.fullName,
      },
    },
  });

  const editHandler = (data) => {
    setValue(
      "formData",
      {
        id: data.id,
        customerName: data.customerName,
        city: data.city,
        phone: data.phone,
      },
      { shouldValidate: true }
    );

    handleDrawerOpen();
    setOpen(!open);
  };

  const onDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        var response = apiClient.delete(`Customer/DeleteCustomer/${id}`);

        Swal.fire("Deleted!", "Customer file has been deleted.", "success");
        refetch();
      }
    });
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: "50px",
          marginBottom: "-50px",
          fontFamily: "Raleway",
          color: "#761137",
        }}
      >
        Customer List
      </Typography>

      <Fab
        aria-label="add"
        sx={{
          marginLeft: "300px",
          marginTop: "-17px",
          backgroundColor: "pink",
          color: "#761137",
        }}
        onClick={handleDrawerOpen}
      >
        <AddIcon />
      </Fab>

      <Paper sx={{ width: "100%", marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(96, 96, 96)",
                    backgroundColor: "pink",
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      fontSize: 20,
                      color: "#761137",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {isError &&
              skeletonArray.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}

            <TableBody>
              {customerForm?.map((data) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.customerName}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.city}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.phone}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.addedBy}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    {data.dateAdded}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                    }}
                  >
                    <IconButton
                      sx={{
                        margin: "5px",
                      }}
                    >
                      <EditIcon
                        onClick={() => editHandler(data)}
                        sx={{
                          color: "pink",
                        }}
                      ></EditIcon>
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => {
                          onDeleteClick(data.id);
                        }}
                        sx={{
                          color: "pink",
                        }}
                      ></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {open && (
          <CustomerDrawer
            open={open}
            setOpen={setOpen}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            refetch={refetch}
            reset={reset}
          />
        )}
      </Paper>
    </>
  );
}

export default Customers;
