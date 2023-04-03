import React, {Component} from "react";


export default class Dashboard extends Component{

render(){

return(

<div>

    <h4>DashBoard</h4>

</div>

)

}

componentDidMount = async () => {

document.title = "Dashboard - LazaDaks"

}


}