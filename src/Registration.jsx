import { event } from 'jquery';
import {Link} from 'react-router-dom'
import apiClient from './apiClient';
import {Card} from "@mui/material";
import React, {useState} from 'react';


function Registration(){

    const [regform, setForm] = useState({
                             email : '',
                             password : '',
                             fullName : '', 
                             dateOfBirth : ''                        
            });
  
    return (

        <Card sx = {{
            width : "300px",
            padding : "50px",
            boxShadow: 10,
            display: "flex"
            
          }}


          >
        </Card>
 




    );
  }

//   onSaveClick = async (event) => {
//     event.preventDefault();

//    var users = {fullName: this.state.fullName, 
//                 dateOfBirth: this.state.dateOfBirth,
//                 email: this.state.email,
//                 password: this.state.password
//             };

//             await apiClient.post("User/AddNewUser", users)


//    if(users){ 
//        this.props.history.replace("/dashboard");
//    }

// };


    // validate = () => {
    //     const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
    //     let errors = {};

    //     this.state.controls.forEach((control) => {
    //         errors[control] = [];

    //         switch(control){
    //         case "email":

    //         if(!this.state[control])
    //         {
    //             errors[control].push("Email is required!");
    //         }

    //         if(this.state.email)
    //         {
    //             if(!validEmailRegex.test(this.state[control])){
    //                 errors[control].push("Proper email address is required");
    //             }
    //         }
          
    //         break;
    //         default:
    //             break;


    //         }
    //     });
      
    //     this.setState({errors});    

    // };

    export default Registration;