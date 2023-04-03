import apiClient from "../apiClient";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Fab,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserDrawer from "./userDrawer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useGlobalFetchUser } from "../global/global-fetch";

const columns = [
  {
    id: "id",
    label: "Id",
    minWidth: 20,
  },
  {
    id: "name",
    label: "Full Name",
    minWidth: 170,
    align: "center",
  },
  {
    id: "dateofbirth",
    label: "Date of Birth",
    minWidth: 170,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "password",
    label: "Password",
    minWidth: 170,
    align: "center",
  },
  {
    id: "addedby",
    label: "Added By",
    minWidth: 100,
    align: "center",
  },
  {
    id: "dateadded",
    label: "Date Added",
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  var user = useSelector((state) => state.user);

  // const [regform, setForm] = useState([]);

  const { data: userForm, isError, refetch } = useGlobalFetchUser();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const fetchUserApi = async () => {
  //   const res = await apiClient.get("User/GetAllUsers");
  //   return res.data;
  // };

  // const fetchUser = () => {
  //   fetchUserApi().then((res) => {
  //     setForm(res);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   fetchUser();

  //   return () => {
  //     setForm([]);
  //   };
  // }, []);

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //const [loading, setLoading] = useState(true);
  const skeletonArray = Array(5).fill("");

  const handleDrawerOpen = () => {
    reset();
    setOpen(!open);
  };

  const schema = yup.object().shape({
    formData: yup.object().shape({
      id: yup.string(),
      fullName: yup.string().required("Full Name is required"),
      dateofBirth: yup.string().required("Date of Birth is requried"),
      email: yup.string().email().required(),
      password: yup.string().required("Password is required"),
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
        fullName: "",
        dateofBirth: "",
        email: "",
        password: "",
        addedBy: user?.fullName,
      },
    },
  });

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
        var response = apiClient.delete(`User/DeleteUser/${id}`);

        Swal.fire("Deleted!", "User file has been deleted.", "success");
        refetch();
      }
    });
  };

  const editHandler = (data) => {
    setValue(
      "formData",
      {
        id: data.id,
        fullName: data.fullName,
        dateofBirth: data.dateofBirth,
        email: data.email,
        password: data.password,
      },
      { shouldValidate: true }
    );

    handleDrawerOpen();
    setOpen(!open);
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
        User List
      </Typography>

      <Fab
        aria-label="add"
        sx={{
          marginLeft: "200px",
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
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}

            <TableBody>
              {userForm?.map((data) => (
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
                      textAlign: "center",
                    }}
                  >
                    {data.fullName}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
                    }}
                  >
                    {moment(data.dateofBirth).format("MM/DD/yyyy")}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
                    }}
                  >
                    {data.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
                    }}
                  >
                    {data.password}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
                    }}
                  >
                    {data.addedBy}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
                    }}
                  >
                    {data.dateAdded}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px dashed pink",
                      color: "#761137",
                      textAlign: "center",
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
          <UserDrawer
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

export default Users;
