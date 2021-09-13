import React from "react" 
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const ConferenceCards = () => (
    <>
      <Route
        render={() => { //every route has a custom rendering function that you can specify if you need to
          if (localStorage.getItem("honey_customer")) {  // matches up with code in register.js.   if the customer has logged in, then the honey_customer key is present. return navbar and application views.
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;  //Redirect component has been imported from the react-router-dom.  if the honey_customer key isn't in local storage, then no one has signed in. The redirect will change the url to include /login at the end, which will match the  <Route path ="/login"> below, which will invoke the <Login /> component and render the login page.
          }
        }}
      />
  
      <Route path="/login"> 
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );