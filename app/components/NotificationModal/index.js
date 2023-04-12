/* ***********************************************************************
* 83incs CONFIDENTIAL
* ***********************************************************************
*
*  [2017] - [2022] 83incs Ltd.
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of 83incs Ltd, IoT83 Ltd, its suppliers (if any), its subsidiaries (if any) and
* Source Code Licenses (if any).  The intellectual and technical concepts contained
* herein are proprietary to 83incs Ltd, IoT83 Ltd, its subsidiaries (if any) and
* Source Code Licenses (if any) and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from 83incs Ltd or IoT83 Ltd.
****************************************************************************
*/

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

let timeOutClose;
/* eslint-disable react/prefer-stateless-function */
class NotificationModal extends React.Component {
  state = {
    notificationId: ''
  }
  componentDidMount() {
    console.log("Notification Modal-----",this.props.message)
    let timeOutTime = 10000;
    store.addNotification({
      title: "",
      message: this.props.type === "success" ? "Request Completed SuccessFull" : this.props.message,
      type: this.props.type === "success" ? "success" : "danger",
      insert: "top",
      container: this.props.type === "success" ? "top-right" : "top-right",
      showIcon: true,
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "fadeOut"],

    })

    // Array.isArray(this.props.message) ?
    //   this.props.message.map((msg, index) => {
    //     store.addNotification({
    //       title: "",
    //       message: typeof(msg) == "object" ? msg.message : msg,
    //       type: this.props.type === "success" ? "success" : "danger",
    //       insert: "top",
    //       container: "top-right",
    //       animationIn: ["animated", "fadeIn"],
    //       animationOut: ["animated", "fadeOut"],
    //     })
    //   })
    //   :
    //   store.addNotification({
    //     title: "",
    //     message: this.props.message,
    //     type: this.props.isPubnub ? "default" : this.props.type === "success" ? "success" : "danger",
    //     insert: "top",
    //     container: this.props.isPubnub ? "bottom-left" : "top-right",
    //     showIcon: true,
    //     animationIn: ["animated", "bounceIn"],
    //     animationOut: ["animated", "fadeOut"],
    //
    //   })

    timeOutTime = 3000;
    timeOutClose = setTimeout(() => this.props.onCloseHandler(), timeOutTime);
  }
  componentWillUnmount() {
    clearTimeout(timeOutClose)
  }
  render() {
    return (
      <React.Fragment>
        <ReactNotification className="newNotificationModal" />
      </React.Fragment>
    );
  }
}

NotificationModal.propTypes = {};


export default NotificationModal;
