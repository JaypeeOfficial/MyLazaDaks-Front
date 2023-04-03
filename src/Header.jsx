import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Shoe1 from "../src/image/shoes/shoes1.png"
import Shoe2 from "../src/image/shoes/shoes2.png"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Header(){

    var items = [
        {
            name: "WELCOME",
            // description: "Probably the most random thing you have ever seen!",
       
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )

}

function Item(props)
{
    return (
   
        <Paper>
                  {/* <h2>{props.item.name}</h2> */}
        </Paper>
    
    )
    
}




export default Header;
