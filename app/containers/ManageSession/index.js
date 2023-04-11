/**
 *
 * ManageSession
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageSession from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions';
import * as SELECTORS from './selectors'
import jwt_decode from "jwt-decode";
import NotificationModal from "../../components/NotificationModal";
/* eslint-disable react/prefer-stateless-function */
export class ManageSession extends React.Component {
  state = {
    payload: {
      username: '',
      password: '',
    },
    loginResponse: '',
    type:'',
    message:'',
    isFetching: false,
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.loginSuccess !== this.props.loginSuccess) {
      console.log("nextProps.loginSuccess",nextProps.loginSuccess)
      localStorage.token = nextProps.loginSuccess.token;
      this.props.history.push('/');
    }
    if(nextProps.loginFailure !== this.props.loginFailure){
      this.setState({openNotificationModal:true,type:"danger",message:nextProps.loginFailure.error,isFetching:false})
    }
  }

  onCloseHandler = (index) => {
    this.setState({
      openNotificationModal: false,
      message: ''
    })
  }

  onChangeHandler = event => {
    let payload = { ...this.state.payload }
    payload[event.currentTarget.id] = event.currentTarget.value;
    this.setState({ payload })
  }

  loginHandler = event => {
    event.preventDefault();
    this.setState({
      isFetching:true
    })
    this.props.login(this.state.payload)
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="loginBox">
          {/*<div className="loginHeader"><img src={require("../../assets/images/logo.jpg")} /></div>*/}
          {this.state.isFetching ?
            <div className="loaderBox">
              <div className="loading">
                <span>Loading</span>
              </div>
            </div>
            :
            <div className="loginForm">
              <form onSubmit={this.loginHandler}>
                <div className="form-group">
                  <input type="text" placeholder="Username" id="username" value={this.state.payload.username} className="form-control" onChange={this.onChangeHandler} />
                </div>

                <div className="form-group">
                  <input type="password" className="form-control" id="password" value={this.state.payload.password} placeholder="Password" onChange={this.onChangeHandler} />
                </div>
                <div className="form-group contentInCenter">
                  <button type="submit" className="btn btn-primary" >Login</button>
                </div>
                <a className="f-12 text-primary">Forget Password</a>
              </form>
            </div>
          }
        </div>
        {this.state.openNotificationModal &&
        <NotificationModal
          type={this.state.type}
          message={this.state.message}
          onCloseHandler={this.onCloseHandler}
        />
        }
      </div>
    );
  }
}

ManageSession.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginSuccess: SELECTORS.loginSuccess(),
  loginFailure: SELECTORS.loginFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: payload => dispatch(ACTIONS.login(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageSession', reducer });
const withSaga = injectSaga({ key: 'manageSession', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageSession);
