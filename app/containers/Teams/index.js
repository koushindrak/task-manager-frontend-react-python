/**
 *
 * Teams
 *
 */
/**
 *
 * ManageTeams
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
import * as ACTIONS from './actions';
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import 'react-table/react-table.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAd, faPen, faPlus, faPlusCircle, faTasks, faTrash, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import NotificationModal from '../../components/NotificationModal/Loadable'
import * as commonUtils from '../../common-files/commonUtils'

const addButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 10,
  justifyContent: 'center',
  backgroundColor: '#051628',
  color: '#fff',
  borderRadius: '10%',
  width: '24px',
  height: '16px',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  cursor: 'pointer',
};

const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)
let payload = {

}
export class ManageTeams extends React.Component {
  state = {
    teams: [],
    payload: payload,
    selectedTeamId: '',
    selectedTeamData: {},
    isEditTeam: false,
    isAddTeam: false,
    openNotificationModal: false,
    type: '',
    message: '',
    modal: false
  }
  componentDidMount() {
    console.log("this.props--",this.props)
    this.props.getTeams();
  }

  columns = [
    {
      Header: 'Name',
      accessor:'name',
      filterable: true,
      style: { textAlign: "center" }
    },
    {
      Header: 'Description',
      accessor: 'description',
      filterable: true,
      style: { textAlign: "center" }
    },
    {
      Header: 'Creation Time',
      Cell: row => (<span>{new Date(row.original.created_at).toLocaleString('en-US')}</span>),
      accessor: 'created_at',
      filterable: true,
      style: { textAlign: "center" },
    },
    {
      Header: 'Admin',
      accessor: 'created_by',
      filterable: true,
      style: { textAlign: "center" },
    },
    {
      Header: 'Actions',
      Cell: row => {
        return (
          <div>

            <button data-tip data-for={"edit" + row.original.id} onClick={()=>{
              this.setState({ selectedTeamId: row.original.id, addOrEditIsFetching: true, isEditTeam:true });
              this.props.getTeamsById(row.original.id)
            }}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <ReactTooltip id={"edit" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Edit Team</p></div>
            </ReactTooltip>

            <button data-tip data-for={"delete" + row.original.id} onClick={() => {
              this.setState({ selectedTeamId: row.original.id });
              this.props.deleteTeam(row.original.id)
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ReactTooltip id={"delete" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Delete Team</p></div>
            </ReactTooltip>

            <button data-tip data-for={"addTask" + row.original.id} onClick={() => {
              this.setState({ selectedTeamId: row.original.id });
              this.props.history.push('teams/tasks/'+row.original.id);
            }}>
              <FontAwesomeIcon icon={faTasks}  />
            </button>
            <ReactTooltip id={"addTask" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>View Tasks</p></div>
            </ReactTooltip>

            <button data-tip data-for={"addUsers" + row.original.id} onClick={() => {
              this.setState({ selectedTeamId: row.original.id });
              this.props.history.push('teams/users/'+row.original.id);
            }}>
              <FontAwesomeIcon icon={faUserPlus}  />
            </button>
            <ReactTooltip id={"addUsers" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>View Users</p></div>
            </ReactTooltip>
          </div>
        )
      }
    }
  ];


  componentWillReceiveProps(nextProps, nextContext) {
    this.createTeamListener(nextProps);
    this.getTeamsListener(nextProps);
    this.getTeamsByIdListener(nextProps);
    this.updateTeamListener(nextProps);
    this.deleteTeamListener(nextProps);
  }

  createTeamListener(nextProps) {
    if(commonUtils.compare(nextProps.createTeamSuccess,this.props.createTeamSuccess)){
      this.props.getTeams()
      // this.manageNotificationModal(true, nextProps.createTeamSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.createTeamFailure,this.props.createTeamFailure)){
      this.manageNotificationModal(
        true, nextProps.createTeamFailure.error, "danger")
    }
  }

  getTeamsListener(nextProps) {
    console.log("getTeamsListener-nextProps.getTeamsSuccess--",nextProps.getTeamsSuccess)

    if(commonUtils.compare(nextProps.getTeamsSuccess,this.props.getTeamsSuccess)){
      this.setState({teams: nextProps.getTeamsSuccess})
    }
    if(commonUtils.compare(nextProps.getTeamsFailure,this.props.getTeamsFailure)){
      this.manageNotificationModal(true, nextProps.getTeamsFailure.error, "danger")
    }
  }


  getTeamsByIdListener(nextProps){
    if(commonUtils.compare(nextProps.getTeamsByIdSuccess,this.props.getTeamsByIdSuccess)){
      this.setState({selectedTeamData: nextProps.getTeamsByIdSuccess},()=>{
        if(this.state.isEditTeam){

          this.setState({payload:nextProps.getTeamsByIdSuccess},()=>{
            $('#myModal').css({ display: "block" })
          })
        }
      })
    }
    if(commonUtils.compare(nextProps.getTeamsByIdFailure,this.props.getTeamsByIdFailure)){
      this.manageNotificationModal(true, nextProps.getTeamsByIdFailure.error, "danger")
    }
  }

  updateTeamListener(nextProps) {
    if(commonUtils.compare(nextProps.updateTeamSuccess,this.props.updateTeamSuccess)){
      this.props.getTeams()
      this.manageNotificationModal(true, nextProps.updateTeamSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.updateTeamFailure,this.props.updateTeamFailure)){
      this.manageNotificationModal(true, nextProps.updateTeamFailure.error, "danger")
    }
  }

  deleteTeamListener(nextProps) {
    if(commonUtils.compare(nextProps.deleteTeamSuccess,this.props.deleteTeamSuccess)){
      this.props.getTeams()
      this.manageNotificationModal(true, nextProps.deleteTeamSuccess.displayMessage, "success")
    }
    if(commonUtils.compare(nextProps.deleteTeamFailure,this.props.deleteTeamFailure)){
      this.manageNotificationModal(true, nextProps.deleteTeamFailure.error, "danger")
    }
  }

  manageNotificationModal(isOpen,message,type) {
    this.setState({openNotificationModal: isOpen, message:message, type: type})
  }

  addOnClickHandler = event => {
    this.props.getTeams();
    $('#myModal').css({ display: "block" })
    this.setState({ modal: true, payload })
  }

  addOrEditSubmitHandler = event => {
    event.preventDefault();
    let payload = this.state.payload;
    payload.created_at = Date.parse(payload.created_at)
    payload.created_by = null;
    payload.updated_by = null;
    payload.created_at = null;
    payload.updated_at = null;

    payload.end_date = Date.parse(payload.end_date)
    if(this.state.isEditTeam){
      payload.id=this.state.selectedTeamId;
      this.props.updateTeam(payload);
    }else {
      this.props.createTeam(payload);
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

  convertcreatedAtToDateTimeLocal = event => {
    const milliseconds =this.state.payload.created_at; // Example milliseconds value
    if (milliseconds !== undefined) { // Add this check
      return this.getDateTimeLocal(milliseconds);
    }
    return '';
  }


  getDateTimeLocal(milliseconds) {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    return datetimeLocal
  }

  render() {
    return (
      <div>
        <React.Fragment >
          <div className="contentHeader">
            <div className="row">
              <div className="col-8">

                <p><span>Manage Groups</span></p>
              </div>
              <div className="col-4">
                <button className="addButton"
                        onClick={this.addOnClickHandler}> <span>&#43;</span>
                </button>
              </div>
            </div>

          </div>
          <div className="contentContainer">
            <ReactTable
              data={this.state.teams}
              columns={this.columns}
              defaultPageSize={10}
              noDataText={"No Data Found"}
              className="customReactTable"
              PreviousComponent={defaultButton}
              NextComponent={defaultButton}
            />
          </div>

          <div id="myModal" className="customModal">
            <form onSubmit={this.addOrEditSubmitHandler}>
              <div className="customModal-content">
                <div className="customModal-header">
                  <span className="close mr-r-10" onClick={() => $('#myModal').css({ display: "none" })}>&times;</span>
                  <button className="close">&#10003;</button>
                  {this.state.isEditTeam ? <p>Edit Team</p> : <p> Add Team</p>}
                </div>
                <div className="customModal-body">

                  <div className="form-group">
                    <team htmlFor="name">Team Name :</team>
                    <input type="text" id="name" autoComplete="off" value={this.state.payload.name} className="form-control" placeholder="Team Name"
                           required onChange={this.onChangeHandler}/>
                  </div>
                  <div className="form-group">
                    <team htmlFor="description">Team Description :</team>
                    <input type="text" id="description" autoComplete="off" value={this.state.payload.description} className="form-control" placeholder="Team Description"
                           required onChange={this.onChangeHandler}/>
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

      </div>
    );
  }
}

ManageTeams.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createTeamSuccess: SELECTORS.createTeamSuccess(),
  createTeamFailure: SELECTORS.createTeamFailure(),

  getTeamsSuccess: SELECTORS.getTeamSuccess(),
  getTeamsFailure: SELECTORS.getTeamFailure(),

  getTeamsByIdSuccess: SELECTORS.getTeamByIdSuccess(),
  getTeamsByIdFailure: SELECTORS.getTeamByIdFailure(),

  updateTeamSuccess: SELECTORS.updateTeamSuccess(),
  updateTeamFailure: SELECTORS.updateTeamFailure(),

  deleteTeamSuccess: SELECTORS.deleteTeamSuccess(),
  deleteTeamFailure: SELECTORS.deleteTeamFailure()
});

function mapDispatchToProps(dispatch) {

  return {
    dispatch,
    createTeam : payload => dispatch(ACTIONS.createTeam(payload)),
    getTeams: () => dispatch(ACTIONS.getTeams()),
    getTeamsById: id => dispatch(ACTIONS.getTeamById(id)),
    updateTeam: (payload) => dispatch(ACTIONS.updateTeam(payload)),
    deleteTeam: id => dispatch(ACTIONS.deleteTeam(id))
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teamss', reducer });
const withSaga = injectSaga({ key: 'teamss', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTeams);
