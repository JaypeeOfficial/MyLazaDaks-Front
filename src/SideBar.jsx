import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


function Sidebar() {

    return (


    <div>
      <Accordion sx = {{
                        width : "200px"
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                <Button>Try Me!</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
       <Typography>Customers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Button>
                Try Me!
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    
    </div>



    );
   
    };

    export default Sidebar;


