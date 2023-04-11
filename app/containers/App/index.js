/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from "react-router";

import HomePage from '../HomePage/Loadable';
import ManageUsers from '../ManageUsers/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import ManageSession from "../ManageSession/Loadable";
import jwt_decode from "jwt-decode";


const offlineDiv = (
  <div id="noNetworkDiv" className="noConnectionBox">
    <div className="noConnectionContent">
      {/* <div className="noConnectionImage">
              <img src={require('../../assets/images/noInternet.png')} alt="No Internet" />
          </div> */}
      <h1>No internet</h1>
      <h5>There is no internet connection!</h5>
      <h6>Check your connection or try again</h6>
    </div>
  </div>
);

export default function App() {
  const token = localStorage.token;
  let expTime;
  if (token) {
    expTime = parseInt(jwt_decode(token).exp + "000");
  }
  if (typeof token !== "undefined" && token !== "") {
    return (
      <Switch>
        <Route
          path="/"
          render={props =>
            navigator.onLine ? <HomePage {...props} /> : offlineDiv
          }
        />
        <Route component={() => <div>Page Not Found</div>} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={navigator.onLine ? ManageSession : offlineDiv} />
        <Redirect to="/" />
      </Switch>
    );
  }
}
