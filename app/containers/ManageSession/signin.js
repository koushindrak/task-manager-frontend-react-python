

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

class ManageSession extends React.Component {
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

  componentDidMount() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {

    if (nextProps.loginSuccess !== this.props.loginSuccess) {
      console.log("nextProps.loginSuccess",nextProps.loginSuccess)
      localStorage.token = nextProps.loginSuccess.access;
      this.props.history.push('/');
    }
    if(nextProps.loginFailure !== this.props.loginFailure){
      this.setState({openNotificationModal:true,type:"danger",message:nextProps.loginFailure.error,isFetching:false})
    }


    if (nextProps.signupSuccess && nextProps.signupSuccess !== this.props.signupSuccess) {
      console.log("nextProps.signupSuccess",nextProps.signupSuccess)
      // localStorage.token = nextProps.loginSuccess.access;
      this.setState({openNotificationModal:true,type:"success",message:"Registration is completed successfully",isFetching:false})
      // this.manageNotificationModal(true,"Registration is completed successfully", "success")
      document.getElementById('container').classList.remove("right-panel-active");
    }
    if(nextProps.signupFailure !== this.props.signupFailure){
      this.setState({openNotificationModal:true,type:"danger",message:nextProps.signupFailure.error,isFetching:false})
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

  signupHandler = event => {
    event.preventDefault();
    this.setState({
      isFetching:true
    })
    console.log("===SIGNUP PAYLOAD----",this.state.payload)
    this.props.signup(this.state.payload)
  }
  render() {
    return (
      <div  className="scoped-container">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={this.signupHandler}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="First Name" id="first_name"  value={this.state.payload.first_name} className="form-control" onChange={this.onChangeHandler}/>
              <input type="text" placeholder="Last Name" id="last_name" value={this.state.payload.last_name} className="form-control" onChange={this.onChangeHandler}/>
              <input type="text" placeholder="Username"  id="username" value={this.state.payload.username} className="form-control" onChange={this.onChangeHandler}/>
              <input type="email" placeholder="Email" id="email" value={this.state.payload.email} className="form-control" onChange={this.onChangeHandler}/>
              <input type="password" placeholder="Password" id="password" value={this.state.payload.password} className="form-control" onChange={this.onChangeHandler}/>
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={this.loginHandler}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>
              <input type="text" placeholder="Username" id="username" value={this.state.payload.username} className="form-control" onChange={this.onChangeHandler} />
              <input type="password" placeholder="Password" id="password" value={this.state.payload.password} className="form-control" onChange={this.onChangeHandler} />
              {/*<a href="#">Forgot your password?</a>*/}
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
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


  signupSuccess: SELECTORS.signupSuccess(),
  signupFailure: SELECTORS.signupFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: payload => dispatch(ACTIONS.login(payload)),
    signup: payload => dispatch(ACTIONS.signup(payload))
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
