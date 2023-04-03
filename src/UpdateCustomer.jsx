import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import apiClient from './apiClient';

class UpdateCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {name: "", city: "", phone:""}
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-lg-6 mx-auto font-testing">
                    <form>
                    <h4>
                        Edit Customer
                    </h4>       

                    <div className="form-group form-row">
                        <label className="col-lg-4">Customer Name</label>
                        <div className="col-lg-8">
                            <input type = "text" className="form-control"
                             value={this.state.name}
                             onChange = {(event)=> {
                                        this.setState({name : event.target.value});
                             }}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label className="col-lg-4">City</label>
                        <div className="col-lg-8">
                            <input type = "text" className="form-control"
                             value={this.state.city}
                             onChange = {(event)=> {
                                        this.setState({city : event.target.value});
                             }}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label className="col-lg-4">Phone</label>
                        <div className="col-lg-8">
                            <input type = "text" className="form-control"
                             value={this.state.phone}
                             onChange = {(event)=> {
                                        this.setState({phone : event.target.value});
                             }}
                            >
                            </input>
                        </div>
                    </div>           

                    <div className="p-1">
                        <button className="btn btn-success"
                         onClick={this.onSaveClick}        
                        >Save</button>

                        <Link to= "/customers" className="btn btn-secondary m-2"                 
                        >Back...
                        </Link>
         
  
                    </div> 
  
                    </form>                    

                </div>
              
            </div>
        );
    }


    componentDidMount = async () => {
        
        var id = this.props.match.params.id;

        var response = await apiClient.get(`Customer/GetCustomersById?id=${id}`);

       this.setState({
            name: response.data.customerName,
            city: response.data.city, 
            phone: response.data.phone
       });
    
    }

    onSaveClick = async (event) => {
        event.preventDefault();

        let id = this.props.match.params.id;
        
        var customer = {id, CustomerName: this.state.name, City: this.state.city, Phone: this.state.phone};

        var response = await apiClient.put(`Customer/UpdateCustomer`, customer);

        if(response){ 
            this.props.history.replace("/customers");
        }

    };

}

export default UpdateCustomer;