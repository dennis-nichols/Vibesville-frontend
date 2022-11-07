import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;



//add this to Savedcity/BestCity component->

// import { useAuth0 } from "@auth0/auth0-react";  <------

// then wrap export default BestCity component with higher order component ->

// export default withAuth0(BestCity);   <---

//----------------------------------------------------------------

class BestCity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cities: []
    }
  }
  
  async componenentDidMount(){

    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims();

      const jwt = res.__raw;

      console.log('token: ', jwt);   

      const config = {
        header: ( "Authorization": `Bearer ${jwt}`),
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/cities'
      }
      let cityData = await axios(config);
      
      
      this.setState({
        city: cityData.data
      })
    }
  }
  
}
