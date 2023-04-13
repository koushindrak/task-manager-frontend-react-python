/**
 *
 * Projects
 *
 */
/**
 *
 * ManageProjects
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
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import NotificationModal from '../../components/NotificationModal/Loadable'
import * as commonUtils from '../../common-files/commonUtils'
import {DataGrid, GridColDef, GridToolbar, GridValueGetterParams} from '@mui/x-data-grid';
// import {columns1} from "./column_constants";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import centeredHeader from '../../assets/css/MyDataGrid.css'

const tableStyles = {
  root: {
    '& .MuiDataGrid-cell--header': {
      justifyContent: 'right',
    },
  },
};



const darkTheme = createTheme({
  palette: {
    mode: 'light', // Set the palette mode to dark
    background: {
      default: '#303030', // Set the background color
      paper: '#efe0e0', // Set the background color for the paper component
    },
  },
  overrides: {
    // Override the styles for the DataGrid component
    MuiDataGrid: {
      root: {
        '& .MuiDataGrid-cell': {
          color: 'white', // Set the font color to white
        },
        '& .MuiDataGrid-row': {
          '&:hover': {
            backgroundColor: '#ffffff', // Set the hover background color
          },
        },
      },
    },
  },
});
const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)
let payload = {

}
export class ManageProjects extends React.Component {
  state = {
    projects: [],
    payload: payload,
    selectedProjectId: '',
    selectedProjectData: {},
    isEditProject: false,
    isAddProject: false,
    openNotificationModal: false,
    type: '',
    message: '',
    modal: false
  }
  componentDidMount() {
    console.log("this.props--",this.props)
    this.props.getProjects();
  }

  columns1: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 200,
      align:"center",
      headerAlign: "center",
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      align:"center",
      headerAlign: "center",
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300 ,
      align:"center",
      headerAlign: "center",
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      filterable: true,
      align:"center",
      headerAlign: "center",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.start_date).toLocaleString('en-US')}`
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      filterable: true,
      width: 200,
      align:"center",
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.end_date).toLocaleString('en-US')}`
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align:"center",
      headerAlign: "center",
      renderCell: (params) => {
        const row = params.row;
        return (
          <div>
            <button
              data-tip
              data-for={"edit" + row.id}
              onClick={()=>{
                console.log("row----",row)
                this.setState({ selectedProjectId: row.id, addOrEditIsFetching: true, isEditProject:true });
                this.props.getProjectsById(row.id)
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <ReactTooltip id={"edit" + row.id} place="bottom" type="dark">
              <div className="tooltipText">
                <p>Edit</p>
              </div>
            </ReactTooltip>

            <button
              data-tip
              data-for={"delete" + row.id}
              onClick={() => {
                // Handle delete action
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ReactTooltip id={"delete" + row.id} place="bottom" type="dark">
              <div className="tooltipText">
                <p>Delete</p>
              </div>
            </ReactTooltip>
          </div>
        );
      },
    }
  ];


  componentWillReceiveProps(nextProps, nextContext) {
    this.createProjectListener(nextProps);
    this.getProjectsListener(nextProps);
    this.getProjectsByIdListener(nextProps);
    this.updateProjectListener(nextProps);
    this.deleteProjectListener(nextProps);
  }

  createProjectListener(nextProps) {
    if(commonUtils.compare(nextProps.createProjectSuccess,this.props.createProjectSuccess)){
      this.props.getProjects()
      this.manageNotificationModal(true, nextProps.createProjectSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.createProjectFailure,this.props.createProjectFailure)){
      this.manageNotificationModal(
        true, nextProps.createProjectFailure.error, "danger")
    }
  }

  getProjectsListener(nextProps) {
    if(commonUtils.compare(nextProps.getProjectsSuccess,this.props.getProjectsSuccess)){
      this.setState({projects: nextProps.getProjectsSuccess})
    }
    if(commonUtils.compare(nextProps.getProjectsFailure,this.props.getProjectsFailure)){
      this.manageNotificationModal(true, nextProps.getProjectsFailure.error, "danger")
    }
  }


  getProjectsByIdListener(nextProps){
    console.log("getProjectsByIdListener-nextProps--",nextProps)
    if(commonUtils.compare(nextProps.getProjectsByIdSuccess,this.props.getProjectsByIdSuccess)){
      this.setState({selectedProjectData: nextProps.getProjectsByIdSuccess},()=>{
        if(this.state.isEditProject){
          this.setState({payload:nextProps.getProjectsByIdSuccess},()=>{
            $('#myModal').css({ display: "block" })
          })
        }
      })
    }
    if(commonUtils.compare(nextProps.getProjectsByIdFailure,this.props.getProjectsByIdFailure)){
      this.manageNotificationModal(true, nextProps.getProjectsByIdFailure.error, "danger")
    }
  }

  updateProjectListener(nextProps) {
    if(commonUtils.compare(nextProps.updateProjectSuccess,this.props.updateProjectSuccess)){
      this.props.getProjects()
      this.manageNotificationModal(true, nextProps.updateProjectSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.updateProjectFailure,this.props.updateProjectFailure)){
      this.manageNotificationModal(true, nextProps.updateProjectFailure.error, "danger")
    }
  }

  deleteProjectListener(nextProps) {
    if(commonUtils.compare(nextProps.deleteProjectSuccess,this.props.deleteProjectSuccess)){
      this.props.getProjects()
      this.manageNotificationModal(true, nextProps.deleteProjectSuccess.displayMessage, "success")
    }
    if(commonUtils.compare(nextProps.deleteProjectFailure,this.props.deleteProjectFailure)){
      this.manageNotificationModal(true, nextProps.deleteProjectFailure.error, "danger")
    }
  }

  manageNotificationModal(isOpen,message,type) {
    this.setState({openNotificationModal: isOpen, message:message, type: type})
  }

  addOnClickHandler = event => {
    this.props.getProjects();
    $('#myModal').css({ display: "block" })
    this.setState({ modal: true, payload })
  }

  addOrEditSubmitHandler = event => {
    event.preventDefault();
    let payload = this.state.payload;
    payload.start_date = Date.parse(payload.start_date)
    payload.end_date = Date.parse(payload.end_date)
    if(this.state.isEditProject){
      payload.id=this.state.selectedProjectId;
      this.props.updateProject(payload);
    }else {
      this.props.createProject(payload);
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

  convertStartDateToDateTimeLocal = event => {
    const milliseconds =this.state.payload.start_date; // Example milliseconds value
    if (milliseconds !== undefined) { // Add this check
      return this.getDateTimeLocal(milliseconds);
    }
    return '';
  }

  convertEndDateToDateTimeLocal = event => {
    const milliseconds =this.state.payload.end_date; // Example milliseconds value
    return this.getDateTimeLocal(milliseconds);
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

                <p><span>Manage Projects</span></p>
              </div>
              <div className="col-4">
                <button className="addButton"
                        onClick={this.addOnClickHandler}> <span>&#43;</span>
                </button>
              </div>
            </div>

          </div>
          <ThemeProvider theme={darkTheme}>

          <div style={{ height: '88vh', width: '100%', paddingTop: '60px' }}>

            <DataGrid
              rows={this.state.projects}
              columns={this.columns1}
              pageSize={10}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              components={{
                Toolbar: GridToolbar, // Use the GridToolbar component for the toolbar
              }}
            />
          </div>
          </ThemeProvider>

          <div id="myModal" className="customModal">
            <form onSubmit={this.addOrEditSubmitHandler}>
              <div className="customModal-content">
                <div className="customModal-header">
                  <span className="close mr-r-10" onClick={() => $('#myModal').css({ display: "none" })}>&times;</span>
                  <button className="close">&#10003;</button>
                  {this.state.isEditProject ? <p>Edit Project</p> : <p> Add Project</p>}
                </div>
                <div className="customModal-body">

                  <div className="form-group">
                    <label htmlFor="name">Project Name :</label>
                    <input type="text" id="name" autoComplete="off" value={this.state.payload.name} className="form-control" placeholder="Project Name"
                           required onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-group">
                    <label form="description"> Project Description : </label>
                    <input type="text" id="description" autoComplete="off" value={this.state.payload.description} className="form-control" placeholder="Project Description"
                           required onChange={this.onChangeHandler}/>
                    {/*<select name="description" id="description" value={this.state.payload.description} required onChange={this.onChangeHandler}>*/}
                    {/*  <option key="CAR" value="CAR">Car</option>)*/}
                    {/*  <option key="BIKE" value="BIKE">Bike</option>)*/}
                    {/*  <option key="BICYCLE" value="BICYCLE">Bicycle</option>)*/}
                    {/*</select>*/}
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">Project Start Date :</label>
                    <input type="datetime-local" id="startDate" autoComplete="off"
                           value={this.convertStartDateToDateTimeLocal(this.state.payload.start_date)}
                           className="form-control" placeholder="Project Start Date"
                           required onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">Project End Date :</label>
                    <input type="datetime-local" id="endDate" autoComplete="off"
                           value={this.convertEndDateToDateTimeLocal(this.state.payload.end_date)}
                           className="form-control" placeholder="Project End Date"
                           required onChange={this.onChangeHandler}/>
                  </div>
                  <div className="form-group">
                    <label form="status"> Project Status : </label>
                    <select name="status" id="status" value={this.state.payload.status} required onChange={this.onChangeHandler}>
                      <option key="ACTIVE" value="ACTIVE">ACTIVE</option>)
                      <option key="INACTIVE" value="INACTIVE">INACTIVE</option>)
                    </select>
                  </div>
                  {/*<div className="form-group">*/}
                  {/*  <label> Parking Areas : </label>*/}
                  {/*  <select className="form-control" value={this.state.payload.parkingAreaId} name="parkingAreaId" id="parkingAreaId" required onChange={this.onChangeHandler}>*/}
                  {/*    <option value=""> select</option>*/}
                  {/*    {this.state.parkingAreas.map((type, index) => {*/}
                  {/*      return (<option key={index} value={type.id}>{type.id}</option>)*/}
                  {/*    })*/}
                  {/*    }*/}
                  {/*  </select>*/}
                  {/*</div>*/}
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

ManageProjects.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createProjectSuccess: SELECTORS.createProjectSuccess(),
  createProjectFailure: SELECTORS.createProjectFailure(),

  getProjectsSuccess: SELECTORS.getProjectSuccess(),
  getProjectsFailure: SELECTORS.getProjectFailure(),

  getProjectsByIdSuccess: SELECTORS.getProjectByIdSuccess(),
  getProjectsByIdFailure: SELECTORS.getProjectByIdFailure(),

  updateProjectSuccess: SELECTORS.updateProjectSuccess(),
  updateProjectFailure: SELECTORS.updateProjectFailure(),

  deleteProjectSuccess: SELECTORS.deleteProjectSuccess(),
  deleteProjectFailure: SELECTORS.deleteProjectFailure()
});

function mapDispatchToProps(dispatch) {

  return {
    dispatch,
    createProject : payload => dispatch(ACTIONS.createProject(payload)),
    getProjects: () => dispatch(ACTIONS.getProjects()),
    getProjectsById: id => dispatch(ACTIONS.getProjectById(id)),
    updateProject: (payload) => dispatch(ACTIONS.updateProject(payload)),
    deleteProject: id => dispatch(ACTIONS.deleteProject(id))
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageProjects', reducer });
const withSaga = injectSaga({ key: 'manageProjects', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageProjects);
