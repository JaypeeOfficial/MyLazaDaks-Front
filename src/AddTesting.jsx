import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";

function AddTesting() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <Box>
      <TextField value={value1}></TextField>
      <TextField value={value2}></TextField>
      <Button>Submit</Button>
      <TextField></TextField>

      <TextField></TextField>
    </Box>
  );
}

export default AddTesting;
