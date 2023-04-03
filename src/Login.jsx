import React, { useState, useEffect } from "react";
import apiClient from "./apiClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Avatar, TextField, FormLabel, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import BakaKasi from "../src/image/bading.png";
import { pink } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UnfoldLessDoubleOutlined } from "@mui/icons-material";
import { ActionTypes } from "@mui/base";
import { SET_AUTH, SET_USER } from "./actions";

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

const color = pink[300];

function Login({ setToken }) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [fullName, setFullName] = useState("");
  var [dateOfBirth, setDateOfBirth] = useState("");
  var [message, setMessage] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLoginClick = async (event) => {
    event.preventDefault();

    var login = { email, password, message };

    var response = await apiClient
      .post("Login/authenticate", login)
      .then((response) => {
        sessionStorage.setItem("userToken", response.data.token);

        sessionStorage.setItem("userData", JSON.stringify(response.data));

        dispatch({
          type: "SET_USER",
          payload: response.data,
        });

        dispatch({
          type: "SET_AUTH",
          payload: "token",
        });
        setToken(response.data);

        navigate("/products");

        Swal.fire("Successfully logged in!", "", "success");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  };

  const onSaveClick = async (event) => {
    event.preventDefault();

    var users = { fullName, dateOfBirth, email, password };

    await apiClient.post("User/AddNewUser", users);

    handleClose();

    Swal.fire("Successfully created account!", "", "success");

    if (users) {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "300px",
          padding: "50px",
          boxShadow: "10px 5px 15px #ccc",
          alignSelf: "center",
          margin: "auto",
        }}
        component="form"
        onSubmit={onLoginClick}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            sx={{
              bgcolor: "pink",
              width: {
                xs: 100,
                sm: 170,
              },
              height: {
                xs: 100,
                sm: 150,
              },
            }}
            src={BakaKasi}
          />
        </div>

        <div>
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: "30px",
              letterSpacing: 6,
              fontFamily: "Monospace",
            }}
          >
            Sign In
          </Typography>
        </div>

        <div>
          <TextField
            id="email"
            label="Email"
            //  variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="Email or Phone Number"
            sx={{
              marginBottom: "40px",
              boxShadow: 10,
              borderRadius: "5px",
              // "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
              //   borderColor: "PINK",
              // },
            }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="pwd"
            label="Password"
            //   variant="outlined"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            sx={{
              marginBottom: "50px",
              boxShadow: 10,
              borderRadius: "5px",
              // "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
              //   borderColor: "PINK",
              // },
            }}
            fullWidth
          />
        </div>

        <Button
          type="submit"
          // onClick={onLoginClick}
          fullWidth
          sx={{
            marginBottom: {
              sm: "0px",
            },
            //   bgcolor: "pink",
            boxShadow: 10,
            color: "white",
            borderRadius: "20px",
          }}

          //   variant = "contained"
        >
          Log in
        </Button>

        <Typography
          align="center"
          sx={{
            marginBottom: "90px",
          }}
        ></Typography>

        <Typography align="center">
          <FormLabel>
            Don't have an account?
            <Button
              sx={{
                bgcolor: "pink",
                boxShadow: 10,
                color: "white",
                marginLeft: "10px",
              }}
              onClick={handleOpen}
            >
              Sign Up{" "}
            </Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "pink",
                      width: 170,
                      height: 150,
                      marginBottom: "30px",
                    }}
                    src={BakaKasi}
                  />
                </div>

                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    marginBottom: "30px",
                    letterSpacing: 3,
                    fontFamily: "Monospace",
                  }}
                >
                  Create an Account
                </Typography>

                <div>
                  <TextField
                    id="name"
                    label="Full Name"
                    variant="outlined"
                    placeholder="Full Name or Nick Name"
                    color="warning"
                    sx={{
                      marginBottom: "40px",
                      boxShadow: 10,
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                        borderColor: "PINK",
                      },
                    }}
                    onChange={(event) => {
                      setFullName(event.target.value);
                    }}
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    placeholder="Email or Phone Number"
                    color="warning"
                    sx={{
                      marginBottom: "40px",
                      boxShadow: 10,
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                        borderColor: "PINK",
                      },
                    }}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="warning"
                    sx={{
                      marginBottom: "40px",
                      boxShadow: 10,
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                        borderColor: "PINK",
                      },
                    }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="dateofbirth"
                    variant="outlined"
                    type="date"
                    color="warning"
                    sx={{
                      marginBottom: "50px",
                      boxShadow: 10,
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                        borderColor: "PINK",
                      },
                    }}
                    onChange={(event) => {
                      setDateOfBirth(event.target.value);
                    }}
                    fullWidth
                  />
                </div>

                <Button
                  onClick={onSaveClick}
                  sx={{
                    bgcolor: "pink",
                    boxShadow: 10,
                    color: "white",
                    marginLeft: "30px",
                    width: 150,
                  }}
                >
                  Submit
                </Button>

                <Button
                  onClick={handleClose}
                  sx={{
                    bgcolor: "pink",
                    boxShadow: 10,
                    color: "white",
                    marginLeft: "30px",
                    width: 150,
                  }}
                >
                  Cancel..
                </Button>
              </Box>
            </Modal>
          </FormLabel>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;
