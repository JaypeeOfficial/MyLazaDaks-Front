import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import apiClient from './apiClient';

export default class UpdateUser extends Component {

        constructor(props) {
            super(props);
        
            var curr = new Date();
            curr.setDate(curr.getDate());
            var date = curr.toISOString().substring(0,10);

        this.state = {fullname: "", 
                      dateofbirth: date,
                      email: "",
                      password: ""
                    } 
        }

     
    render() {
        return (
          <div className= "col-lg-6 mx-auto">
            <h1>
            Update User
            </h1>
    
            <div className="form-group form-row font-testing">
                <label className="col-lg-4">Fullname</label>
            <div>
                <input type= "text"
                       id = "fullname"
                       className="form-control"
                       value={this.state.fullname}
                       onChange = {(event) => {
                               this.setState({fullname: event.target.value});
                    
                            }}>              
                </input>
            </div>
            </div>
    
            <div className="form-group form-row font-testing">
                <label className="col-lg-4">Date of Birth</label>
            <div>
                <input type= "date" 
                       className="form-control"
                       value={this.state.dateofbirth}
                       onChange = {(event) => {
                              this.setState({dateofbirth: event.target.value})               
                    }}>                         
                </input>
            </div>
            </div>
    
           <div className="form-group form-row font-testing">
                <label className="col-lg-4">Email</label>
            <div>
                <input type= "text" 
                       id="email"
                       className="form-control" 
                       value = {this.state.email}
                       onChange = {(event) => {
                                this.setState({email: event.target.value});
                        
               }}>
                 </input>
            </div>
            </div>
    
            <div className="form-group form-row font-testing">
                <label className="col-lg-4">Password</label>
            <div>
                <input type= "password" 
                        id = "password"
                       className="form-control" 
                       value={this.state.password}
                       onChange = {(event) => {
                              this.setState({password: event.target.value})
                       }}> 
                           
                </input>
            </div>  
            </div>
    
            <div className="p-1">
                            <button className="btn btn-success"
                             onClick={this.onSaveClick}        
                            >Save</button>
    
                            <Link to= "/dashboard" className="btn btn-secondary m-2"                 
                            >Back...
                            </Link>
                            {/* <ul className="text-danger">
                                 {Object.keys(this.state.errors).map((control) => {
                                    return this.state.errors[control].map((err) => {
                                    return <li key ={err}>{err}</li>
                                    });
                                 })}
                            </ul> */}
            </div> 
          </div>
    
        );
      }
    
      componentDidMount = async () => {

        var id = this.props.match.params.id;

        var response = await apiClient.get(`User/GetUserById?id=${id}`);

       this.setState({
              fullname: response.data.fullName,
              dateOfBirth: response.data.dateofbirth, 
              email : response.data.email,
              password : response.data.password
       });


    }

      onSaveClick = async (event) => {
        event.preventDefault();
    
        let id = this.props.match.params.id;

       var users = {id,
                    fullName: this.state.fullname, 
                    dateOfBirth: this.state.dateofbirth,
                    email: this.state.email,
                    password: this.state.password
                };
    
        var response = await apiClient.put(`User/UpdateUser`, users)

       if(response){ 
           this.props.history.replace("/users");
       }
    
    };
    
   

    
        validate = () => {
            const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        
            let errors = {};
    
            this.state.controls.forEach((control) => {
                errors[control] = [];
    
                switch(control){
                case "email":
    
                if(!this.state[control])
                {
                    errors[control].push("Email is required!");
                }
    
                if(this.state.email)
                {
                    if(!validEmailRegex.test(this.state[control])){
                        errors[control].push("Proper email address is required");
                    }
                }
              
                break;
                default:
                    break;
    
    
                }
            });
          
            this.setState({errors});    
    
        };
}
