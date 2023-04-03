import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ShoppingCart from "./ShoppingCart";
import Customers from "./customer/Customers";
import { Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";
import Sidebar from "./SideBar";
import ProductById from "./ProductById";
import UpdateCustomer from "./UpdateCustomer";
import Registration from "./Registration";
import Users from "./user/Users";
import UpdateUser from "./UpdateUser";
import { Card, Fab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "./Header";
import { width } from "@mui/system";
import MyHeaderImage from "../src/image/Header.png";
import { Avatar, TextField, FormLabel, Modal } from "@mui/material";
import { SideBarRight } from "./SideBarRight";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Chat from "./SignalR/Chat";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import store from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { SET_AUTH, SET_USER } from "./actions";
import { userReducer } from "./reducers/userReducer";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import ProductAccordion from "./productCategory/productAccordion";
import AddTesting from "./AddTesting";
import Product from "./mainlaylout/Product";
import SetupAccordion from "./accordions/setupAccordions";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("userToken"));

  return (
    <Routes>
      <Route path="/login" exact element={<Login setToken={setToken} />} />
      <Route
        path="/"
        exact
        element={
          token ? <MainLayOut token={token} /> : <Navigate to="/login" />
        }
      >
        <Route path="customer-service" exact element={<Chat />} />
        <Route
          path="registration"
          exact
          element={token ? <Registration /> : <Navigate to="/login" />}
        />
        <Route path="customers" exact element={<Customers />} />
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route
          path="products"
          exact
          element={token ? <Product /> : <Navigate to="/login" />}
        />
        <Route path="users" exact element={<Users />} />
        <Route path="carts" exact element={<ShoppingCart />} />
        <Route path="login" exact element={<Login />} />
        <Route path="*" exact element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}

export default App;

function MainLayOut({ token }) {
  const [open, setOpen] = React.useState(false);

  const [openCustomerS, setOpenCustomerS] = React.useState(false);

  var user = useSelector((state) => state.user);

  console.log(user);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpenCustomerService = () => {
    setOpenCustomerS(!openCustomerS);
  };

  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
      fullWidth
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "pink",
          color: "#761137",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton color="primary">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 1000 }}
          >
            News
          </Typography>

          <Button
            color="inherit"
            onClick={handleDrawerOpen}
            sx={{
              fontWeight: 1000,
              fontSize: 20,
              backgroundColor: "pink",
              "&:hover": {
                backgroundColor: "Pink",
              },
            }}
          >
            {`Welcome!   ${user?.fullName}`}
            <Avatar
              src="/broken-image.jpg"
              sx={{
                marginRight: "0px",
                marignLeft: "20px",
              }}
            />
          </Button>
          <SideBarRight open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          <Paper
            sx={{
              width: "250px",
              height: "500px",
              marginTop: "5px",
            }}
            elevation={3}
          >
            <ProductAccordion />
          </Paper>

          <Paper
            sx={{
              width: "250px",
              height: "400px",
              marginTop: "30px",
            }}
            elevation={3}
          >
            <SetupAccordion />
          </Paper>
        </Box>

        <Box
          sx={{
            width: "1500px",
            // display: "flex",
            // overflow: "scroll",
          }}
        >
          <Paper
            sx={{
              height: "150px",
              padding: "50px",
              marginTop: "5px",
              justifyContent: "center",
              marginLeft: "5px",
              flexDirection: "column",
              backgroundImage: `url(${MyHeaderImage})`,
            }}
            elevation={3}
          >
            <Header />
          </Paper>

          <Paper
            fullWidth
            sx={{
              height: "650px",
              padding: "50px",
              marginTop: "20px",
              justifyContent: "center",
              marginLeft: "5px",
              overflow: "scroll",
              //   minWidth: 20,
            }}
            elevation={3}
          >
            <Outlet />
          </Paper>
        </Box>
      </Box>

      <Drawer
        variant="persistent"
        anchor="bottom"
        open={openCustomerS}
        PaperProps={{
          sx: {
            width: 350,
            height: 450,
            left: "unset",
            overflow: "hidden",
          },
          elevation: 15,
        }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: "pink",
            justifyContent: "flex-end",
            position: "sticky",
            top: "0px",
            zIndex: 9999,
          }}
        >
          <IconButton onClick={handleDrawerOpenCustomerService}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <Chat />
      </Drawer>

      <Fab
        color="primary"
        aria-label="add"
        actions="hover"
        sx={{
          margin: 0,
          top: "auto",
          left: "auto",
          bottom: 60,
          right: 10,
          position: "fixed",
          backgroundColor: "pink",
        }}
        onClick={handleDrawerOpenCustomerService}
      >
        <MessageIcon color="primary" />
      </Fab>
    </Box>
  );
}
