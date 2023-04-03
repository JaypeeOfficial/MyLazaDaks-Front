import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel, FormGroup, Button } from "@mui/material";
import { CheckBox, FilePresent } from "@mui/icons-material";
import { Box, TextField, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import apiClient from "../apiClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};

export const AddCategoryModal = ({ open, setOpen }) => {
  var [categoryName, setCategory] = useState("");

  const handleClose = () => setOpen(false);

  const onSaveClick = async (event) => {
    var categories = { categoryName };

    await apiClient.post("ItemCategory/AddNewItemCategory", categories);

    handleClose();

    Swal.fire("Successfully added item category!", "", "success");
  };

  return (
    <form onSubmit={onSaveClick}>
      {" "}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: "30px",
              letterSpacing: 3,
              fontFamily: "Monospace",
            }}
          >
            Add Product Category
          </Typography>

          <div>
            <TextField
              id="category"
              label="Item Category"
              variant="outlined"
              placeholder="Category Name"
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
                setCategory(event.target.value);
              }}
              fullWidth
            />
          </div>

          <Button
            type="submit"
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
    </form>
  );
};
