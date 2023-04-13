/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Switch, Route, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

let allContainers = ["ManageUsers", "ManageTasks", "ParkingAreas", "ManageProjects", "AddOrEditParkingArea", "Dashboard"]

allContainers.map(container => {
  window[container] = require(`../${container}/Loadable`).default;
})


class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error: error,
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div className="codeErrorBox">
          <div className="codeInnerBox">
            <p>OOPS!</p>
            <span>Something Went wrong</span>
          </div>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  state = {
    routes: [
      { "path": "/users", "component": ManageUsers },
      { "path": "/", "component": ManageTasks },
      { "path": "/tasks", "component": ManageTasks },
      { "path": "/projects/tasks/:id?", "component": ManageTasks },
      { "path": "/projects", "component": ManageProjects },

      // { "path": "/addOrEditParkingArea/:id?", "component": AddOrEditParkingArea },
    ],
    activeTabName: '',
  }

  toggleSideNav = (isSideNavCollapsed) => {
    if (isSideNavCollapsed) {
      $('#sideNav').css({ width: "90px" })
      $('#sideNavOpenIcon').css({ "display": "block" })
      $('#sideNavCloseIcon').css({ "display": "none" })
      $('#menuNavigationSlideWrapper').css({ "display": "none" })
    } else {
      $('#sideNav').css({ width: "30%" })
      $('#sideNavOpenIcon').css({ "display": "none" })
      $('#sideNavCloseIcon').css({ "display": "block" })
      $('#menuNavigationSlideWrapper').css({ "display": "block" })

    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="headerContent">
            <div className="info">
              <p><i className="fa fa-user" aria-hidden="true"></i>  {jwt_decode(localStorage["token"]).name}</p>
            </div>

            <div className="logoutButton" onClick={() => {
              delete localStorage.token
              this.props.history.push("/")
            }}>
              <p><i className="fa fa-sign-out" aria-hidden="true"></i>logout</p>
            </div>

          </div>

        </div>
        /* SIDE NAVE */
        <div className="sideNav" id="sideNav">
          <div className="menuNavigationSlideWrapper" id="menuNavigationSlideWrapper">
            <div className="vpsLogo">
              {/*<div className="loginHeader"><img src={require("../../assets/images/logo.jpg")} /></div>*/}

              <img src={require("../../images/to-do-list.png")} />
            </div>
            <div className="menuList">
              <ul id="sideNav" >
                <li data-value className={window.location.pathname === "/users" ? "active" : ""}>
                  <Link to='/users' >
                    <a >
                      Manage Users
                  </a>
                  </Link>
                </li>

                <li data-value className={window.location.pathname === "/tasks" ? "active" : ""}>
                  <Link to='/' >
                    <a >
                      Manage Tasks
                  </a>
                  </Link>
                </li>


                <li data-value className={window.location.pathname === "/projects" ? "active" : ""}>
                  <Link to='/projects' >
                    <a >
                      Manage Projects
                  </a>
                  </Link>
                </li>
                <li data-value className={window.location.pathname === "/labels" ? "active" : ""}>
                  <Link to='/labels' >
                    <a >
                      Manage Labels
                    </a>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
        /* SIDE NAVE */

        <div className="contentBox">
          <Switch>
            {this.state.routes.map((route, routeIndex) => {
              let Comp = route.component;
              return (
                <Route
                  key={routeIndex}
                  exact
                  path={route.path}
                  render={(props) => <Comp {...props} />}
                />
              );
            })}
            <Route component={() => <div>Page Not Found!</div>} />
          </Switch>
        </div>
        <div className="footer">
          <ul className="listStyleNone text-right">
            <li><p>© 2023 Task Manager, All rights reserved. Version - <b class="text-dark">v2024-05.140</b></p></li>
            <li><a class="text-primary" href="#" target="_blank">About Us</a></li>
            <li><a class="text-primary" href="#" target="_blank">Contact</a></li>
            <li><a class="text-primary cursor-pointer">Help</a></li></ul></div>
      </ div>
    );
  }
}
