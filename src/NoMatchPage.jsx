import React, {Component} from "react";
import Login from "./Login";

import { useDispatch, useSelector } from "react-redux";


const NoMatchPage = () => {
    var dispatch = useDispatch()
    var user = useSelector(state => state.user)

const homePageHandler = (login) => {

    // this.props.history.push(login);

    dispatch({
        type: 'SET_AUTH',
        payload: 'token'
});

}


return(

<div className= "div-style">
    <h4>PAGE NOT FOUND!</h4>
    <div>
       Welcome back, {user?.fullName}
    <button onClick= {() => homePageHandler('/')}>
       Home<br />
    </button>
    </div>
</div>

)

}

export default NoMatchPage;