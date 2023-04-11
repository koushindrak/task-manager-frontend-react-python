/**
 *
 * ManageUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as SELECTORS from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions'
import ReactTable from "react-table";

import ReactTooltip from 'react-tooltip';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import NotificationModal from '../../components/NotificationModal/Loadable'


const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)
let payload = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  roleId: '',
}


export class ManageUsers extends React.Component {
  state = {
    usersData: [],
    rolesData: [],
    modal: false,
    payload: payload,
    selectedUserId: '',
    selectedUserData: '',
    isAddOrEditUser:false,
    openNotificationModal: false,
    isEditUser:false,
    message: '',
    type: '',
    isFetching: true,
  }
  columns = [
    {
      Header: 'Name',
      Cell: row => (<span>{row.original.firstName + " " + row.original.lastName}</span>),
      filterable: true,
      style: { textAlign: "center" }
    },
    {
      Header: 'Email',
      accessor: 'email',
      filterable: true,
      style: { textAlign: "center" }
    },
    {
      Header: 'Phone No',
      accessor: 'phoneNumbers',
      filterable: false,
      style: { textAlign: "center" },
    },
   /* {
      Header: 'Address',
      accessor: 'userAddresses',
      filterable: false,
      style: { textAlign: "center" },
    },*/
    {
      Header: 'Created At',
      Cell: row => (<span>{new Date(row.original.createdAt).toLocaleString('en-US')}</span>),
      filterable: false,
      style: { textAlign: "center" },
    },
    {
      Header: 'Actions',
      Cell: row => {
        return (
          <div>
            <button data-tip data-for={"edit" + row.original.id} onClick={()=>{
              this.setState({ selectedUserId: row.original.id, addOrEditIsFetching: true, isAddOrEditUser: true, isEditUser:true });
              this.props.getAllRoles()
              this.props.getUserById(row.original.id)
            }}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <ReactTooltip id={"edit" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Edit</p></div>
            </ReactTooltip>

            <button data-tip data-for={"delete" + row.original.id} onClick={() => {
              this.setState({ selectedUserId: row.original.id });
              this.props.deleteUserById(row.original.id)
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ReactTooltip id={"delete" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Delete</p></div>
            </ReactTooltip>
          </div>
        )
      }
    }
  ];

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.getUsersListener(nextProps);
    this.getRolesListener(nextProps);
    this.createUserListener(nextProps);
    this.getUserByIdListener(nextProps);
    this.deleteUserListener(nextProps);
    this.updateUserListener(nextProps);
  }

 /*getDerivedStateFromProps*/
/*  static getDerivedStateFromProps(props,state){
    console.warn("props , state === ",props,state)
    ManageUsers.getUsers(props,state)
  }

  static getUsers(props,state){
    if(props.getUsersSuccess && props.getUsersSuccess !== state.usersData){
      state.usersData = props.getUsersSuccess.data
    }
  }*/
  updateUserListener(nextProps){
    if(nextProps.updateUserByIdSuccess && this.props.updateUserByIdSuccess !== nextProps.updateUserByIdSuccess){
      this.manageNotificationModal(true,nextProps.updateUserByIdSuccess.displayMessage,"success")
      $('#myModal').css({ display: "none" })
    }
    else if(nextProps.updateUserByIdFailure && this.props.updateUserByIdFailure !== nextProps.updateUserByIdFailure){
      this.manageNotificationModal(true,nextProps.updateUserByIdFailure.error,"danger")
    }
  }
  getUserByIdListener(nextProps) {
    if (nextProps.getUserByIdSuccess && nextProps.getUserByIdSuccess !== this.props.getUserByIdSuccess) {
      this.setState({
        selectedUserData: nextProps.getUserByIdSuccess.data,
        payload:nextProps.getUserByIdSuccess.data
      },()=>{
        if(this.state.isAddOrEditUser){
          $('#myModal').css({ display: "block" })
        }
      })
    }
    if(nextProps.getUserByIdFailure && nextProps.getUserByIdFailure !== this.props.getUserByIdFailure){
      this.manageNotificationModal(true,nextProps.getUserByIdFailure.error, "danger")
    }
  }

  createUserListener(nextProps) {
    if (nextProps.createUserSuccess && nextProps.createUserSuccess !== this.props.createUserSuccess) {
      this.props.getAllUsers();
      this.manageNotificationModal(true,nextProps.createUserSuccess.displayMessage,"success")
      $('#myModal').css({display: "none"})
    }
    if(nextProps.createUserFailure && nextProps.createUserFailure !== this.props.createUserFailure){
      this.manageNotificationModal(true,nextProps.createUserFailure.error,"danger")
    }
  }

  getRolesListener(nextProps) {
    if (nextProps.getRolesSuccess && this.props.getRolesSuccess !== nextProps.getRolesSuccess) {
      this.setState({rolesData: nextProps.getRolesSuccess.data})
    }
    else if(nextProps.getRolesFailure && this.props.getRolesFailure !== nextProps.getRolesFailure){
      this.manageNotificationModal(true,nextProps.getRolesFailure.error,"danger")
    }
  }

  getUsersListener(nextProps) {
    if (nextProps.getUsersSuccess && this.props.getUsersSuccess !== nextProps.getUsersSuccess) {
      this.setState({usersData: nextProps.getUsersSuccess.data,isFetching:false})
    }
    else if(nextProps.getUsersFailure &&  this.props.getUsersFailure !== nextProps.getUsersFailure){
      this.manageNotificationModal(true,nextProps.getUsersFailure.error, "danger")
    }
  }

  deleteUserListener(nextProps) {
    if (nextProps.deleteUserByIdSuccess && nextProps.deleteUserByIdSuccess !== this.props.deleteUserByIdSuccess) {
      this.manageNotificationModal(true,nextProps.deleteUserByIdSuccess.displayMessage,"success")
    }
    if (nextProps.deleteUserByIdFailure && nextProps.deleteUserByIdFailure !== this.props.deleteUserByIdFailure) {
      this.manageNotificationModal(true,nextProps.deleteUserByIdFailure.error,"danger");
    }
  }

  manageNotificationModal(isOpen,message,type) {
    this.setState({openNotificationModal: isOpen, message:message, type: type})
  }

  onChangeHandler = event => {
    let payload = { ...this.state.payload }
    payload[event.currentTarget.id] = event.currentTarget.value;
    this.setState({ payload })
  }

  addOrEditUserClickHandler = event => {
    this.props.getAllRoles();
    $('#myModal').css({ display: "block" })
    this.setState({ modal: true, payload })
  }

  addOrEditUserSubmitHandler = event => {
    event.preventDefault();
    let payload = this.state.payload;
    if(this.state.isEditUser){
      payload.id=this.state.selectedUserData.id;
      this.props.updateUser(payload);
    }else {
      this.props.saveUser(payload);
    }
  }
  onCloseHandler = (index) => {
    this.setState({
      openNotificationModal: false,
      message: ''
    })
  }
  render() {

    return (
      <React.Fragment >
        <div className="contentHeader">
          <div className="row">
            <div className="col-8">

              <p><span>Manage Users</span></p>
            </div>
            <div className="col-4">
              <button className="addButton"
                onClick={this.addOrEditUserClickHandler}> <span>&#43;</span>
              </button>
            </div>
          </div>

        </div>
        <div className="contentContainer">
          <ReactTable
            noDataText={this.state.isFetching ? 'Loading...' : 'There is no data to display.'}
            columns={this.columns}
            data={this.state.usersData}
            defaultPageSize={10}
            loading={this.state.isFetching}
            className="customReactTable"
            PreviousComponent={defaultButton}
            NextComponent={defaultButton}
          />
        </div>

        <div id="myModal" className="customModal">
          <form onSubmit={this.addOrEditUserSubmitHandler}>
            <div className="customModal-content">
              <div className="customModal-header">
                <span className="close mr-r-10" onClick={() => $('#myModal').css({ display: "none" })}>&times;</span>
                <button className="close">&#10003;</button>
                {this.state.isEditUser ? <p>Edit User</p> : <p> Add User</p>}
              </div>
              <div className="customModal-body">
                <div className="form-group">
                  <label htmlFor="firstName">First Name :</label>
                  <input type="text" id="firstName" autoComplete="off" value={this.state.payload.firstName} className="form-control" placeholder="First Name" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name :</label>
                  <input type="text" id="lastName" autoComplete="off" value={this.state.payload.lastName} className="form-control" placeholder="First Name" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <input type="email" id="email" autoComplete="off" value={this.state.payload.email} className="form-control" placeholder="Email" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password :</label>
                  <input type="password" id="password" autoComplete="off" value={this.state.payload.password} className="form-control" placeholder="Password" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumbers">Phone Numbers:</label>
                  <input type="text" id="phoneNumber" autoComplete="off" value={this.state.payload.phoneNumber} className="form-control" placeholder="Phone Numbers" required onChange={this.onChangeHandler} />
                </div>
               {/* <div className="form-group">
                  <label htmlFor="addresses">Address :</label>
                  <textarea type="text" id="addresses" value={this.state.payload.address} autoComplete="off" className="form-control" placeholder="Address" required onChange={this.onChangeHandler} />
                </div>*/}
                <div className="form-group">
                  <label> Roles : </label>
                  <select className="form-control" value={this.state.payload.roleId} name="roles" id="roleId" required onChange={this.onChangeHandler}>
                    <option value=""> select</option>
                    {this.state.rolesData.map((type, index) => {
                      return (<option key={index} value={type.id}>{type.name}</option>)
                    })
                    }
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
          {this.state.openNotificationModal &&
            <NotificationModal
              type={this.state.type}
              message={this.state.message}
              onCloseHandler={this.onCloseHandler}
            />
          }
      </React.Fragment>
    );
  }
}

ManageUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getUsersSuccess: SELECTORS.getUsersSuccess(),
  getUsersFailure: SELECTORS.getUsersFailure(),

  getRolesSuccess: SELECTORS.getRolesSuccess(),
  getRolesFailure: SELECTORS.getRolesFailure(),

  createUserSuccess: SELECTORS.createUserSuccess(),
  createUserFailure:SELECTORS.createUserFailure(),

  getUserByIdSuccess: SELECTORS.getUserByIdSuccess(),
  getUserByIdFailure: SELECTORS.getUserByIdFailure(),

  updateUserByIdSuccess: SELECTORS.updateUserByIdSuccess(),
  updateUserByIdFailure: SELECTORS.updateUserByIdFailure(),

  deleteUserByIdSuccess: SELECTORS.deleteUserByIdSuccess(),
  deleteUserByIdFailure: SELECTORS.deleteUserByIdFailure(),

  isFetching: SELECTORS.getIsFetching(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllRoles: () => dispatch(ACTIONS.getAllRoles()),
    getAllUsers: () => dispatch(ACTIONS.getAllUsers()),
    saveUser: payload => dispatch(ACTIONS.createUser(payload)),
    updateUser: payload => dispatch(ACTIONS.updateUserById(payload)),
    getUserById: id => dispatch(ACTIONS.getUserById(id)),
    deleteUserById: id => dispatch(ACTIONS.deleteUserById(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageUsers', reducer });
const withSaga = injectSaga({ key: 'manageUsers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUsers);
