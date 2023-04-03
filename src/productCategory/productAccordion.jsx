import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { CheckBox, FilePresent } from "@mui/icons-material";

export default function ProductAccordion() {
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
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            marginTop: "-25px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Men's Apparel"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Mobile & Gadgets"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Health & Personal Care"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Home Appliances"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Home & Living"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Gaming"
            />
          </FormGroup>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>

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
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            marginTop: "-25px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Nike"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Addidas"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "pink",
                    "&.Mui-checked": {
                      color: "pink",
                    },
                  }}
                />
              }
              label="Samsung"
            />
          </FormGroup>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
