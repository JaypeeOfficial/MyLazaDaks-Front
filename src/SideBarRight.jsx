import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Feed } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const SideBarRight = ({ open, setOpen }) => {
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
    console.log(open);
  };

  const navigate = useNavigate();

  const getIndex = (data) => {
    if (data === 0) {
      navigate("/carts");
    } else if (data === 1) {
      navigate("/products");
    } else if (data == 2) {
      navigate("/customers");
    } else if (data === 3) {
      navigate("/users");
    }
  };

  const onLogoutClick = () => {
    Swal.fire({
      title: "Are you sure do you want to log out?",
      text: "There is no turning back this time!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Please!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("userToken");

        navigate("/login");

        window.location.reload(false);
      }
    });
  };

  return (
    <Box>
      {/* <CssBaseline /> */}

      <Drawer variant="persistent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Shopping Cart", "Products", "Customer", "Users", "Feedback"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => getIndex(index)}>
                  <ListItemIcon>
                    {text === "Shopping Cart" && <ShoppingCartIcon />}
                    {text === "Products" && <ProductionQuantityLimitsIcon />}
                    {text === "Customer" && <GroupAddIcon />}
                    {text === "Users" && <PersonAddIcon />}
                    {text === "Feedback" && <FeedbackIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Log Out"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={onLogoutClick}>
                <ListItemIcon>
                  {text === "Log Out" && <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
