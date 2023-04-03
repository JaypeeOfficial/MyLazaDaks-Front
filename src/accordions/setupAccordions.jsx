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
import { AddCategoryModal } from "../modals/AddCategoryModal";
import { AddProductModal } from "../modals/AddProductModal";

function SetupAccordion() {
  const [open, setOpen] = React.useState(false);

  const [openProduct, setOpenProduct] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpenProduct = () => setOpenProduct(true);

  return (
    <div>
      <Accordion
        style={{
          width: "250px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Set up Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <Button
              onClick={handleOpen}
              sx={{
                color: "black",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "Pink",
                },
              }}
            >
              Item Category
            </Button>
          </FormGroup>
          <FormGroup>
            <Button
              onClick={handleOpenProduct}
              sx={{
                color: "black",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "Pink",
                },
              }}
            >
              Product
            </Button>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {open && <AddCategoryModal open={open} setOpen={setOpen} />}

      {openProduct && (
        <AddProductModal
          openProduct={openProduct}
          setOpenProduct={setOpenProduct}
        />
      )}
    </div>
  );
}

export default SetupAccordion;
