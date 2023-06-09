/**
 *
 * Labels
 *
 */
/**
 *
 * ManageLabels
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
export class ManageLabels extends React.Component {
  state = {
    labels: [],
    payload: payload,
    selectedLabelId: '',
    selectedLabelData: {},
    isEditLabel: false,
    isAddLabel: false,
    openNotificationModal: false,
    type: '',
    message: '',
    modal: false
  }
  componentDidMount() {
    console.log("this.props--",this.props)
    this.props.getLabels();
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
                this.setState({ selectedLabelId: row.id, addOrEditIsFetching: true, isEditLabel:true });
                this.props.getLabelsById(row.id)
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
    this.createLabelListener(nextProps);
    this.getLabelsListener(nextProps);
    this.getLabelsByIdListener(nextProps);
    this.updateLabelListener(nextProps);
    this.deleteLabelListener(nextProps);
  }

  createLabelListener(nextProps) {
    if(commonUtils.compare(nextProps.createLabelSuccess,this.props.createLabelSuccess)){
      this.props.getLabels()
      this.manageNotificationModal(true, nextProps.createLabelSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.createLabelFailure,this.props.createLabelFailure)){
      this.manageNotificationModal(
        true, nextProps.createLabelFailure.error, "danger")
    }
  }

  getLabelsListener(nextProps) {
    if(commonUtils.compare(nextProps.getLabelsSuccess,this.props.getLabelsSuccess)){
      this.setState({labels: nextProps.getLabelsSuccess})
    }
    if(commonUtils.compare(nextProps.getLabelsFailure,this.props.getLabelsFailure)){
      this.manageNotificationModal(true, nextProps.getLabelsFailure.error, "danger")
    }
  }


  getLabelsByIdListener(nextProps){
    console.log("getLabelsByIdListener-nextProps--",nextProps)
    if(commonUtils.compare(nextProps.getLabelsByIdSuccess,this.props.getLabelsByIdSuccess)){
      this.setState({selectedLabelData: nextProps.getLabelsByIdSuccess},()=>{
        if(this.state.isEditLabel){
          this.setState({payload:nextProps.getLabelsByIdSuccess},()=>{
            $('#myModal').css({ display: "block" })
          })
        }
      })
    }
    if(commonUtils.compare(nextProps.getLabelsByIdFailure,this.props.getLabelsByIdFailure)){
      this.manageNotificationModal(true, nextProps.getLabelsByIdFailure.error, "danger")
    }
  }

  updateLabelListener(nextProps) {
    if(commonUtils.compare(nextProps.updateLabelSuccess,this.props.updateLabelSuccess)){
      this.props.getLabels()
      this.manageNotificationModal(true, nextProps.updateLabelSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.updateLabelFailure,this.props.updateLabelFailure)){
      this.manageNotificationModal(true, nextProps.updateLabelFailure.error, "danger")
    }
  }

  deleteLabelListener(nextProps) {
    if(commonUtils.compare(nextProps.deleteLabelSuccess,this.props.deleteLabelSuccess)){
      this.props.getLabels()
      this.manageNotificationModal(true, nextProps.deleteLabelSuccess.displayMessage, "success")
    }
    if(commonUtils.compare(nextProps.deleteLabelFailure,this.props.deleteLabelFailure)){
      this.manageNotificationModal(true, nextProps.deleteLabelFailure.error, "danger")
    }
  }

  manageNotificationModal(isOpen,message,type) {
    this.setState({openNotificationModal: isOpen, message:message, type: type})
  }

  addOnClickHandler = event => {
    this.props.getLabels();
    $('#myModal').css({ display: "block" })
    this.setState({ modal: true, payload })
  }

  addOrEditSubmitHandler = event => {
    event.preventDefault();
    let payload = this.state.payload;
    payload.start_date = Date.parse(payload.start_date)
    payload.end_date = Date.parse(payload.end_date)
    if(this.state.isEditLabel){
      payload.id=this.state.selectedLabelId;
      this.props.updateLabel(payload);
    }else {
      this.props.createLabel(payload);
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

                <p><span>Manage Labels</span></p>
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
              rows={this.state.labels}
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
                  {this.state.isEditLabel ? <p>Edit Label</p> : <p> Add Label</p>}
                </div>
                <div className="customModal-body">

                  <div className="form-group">
                    <label htmlFor="name">Label Name :</label>
                    <input type="text" id="name" autoComplete="off" value={this.state.payload.name} className="form-control" placeholder="Label Name"
                           required onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-group">
                    <label form="description"> Label Description : </label>
                    <input type="text" id="description" autoComplete="off" value={this.state.payload.description} className="form-control" placeholder="Label Description"
                           required onChange={this.onChangeHandler}/>
                    {/*<select name="description" id="description" value={this.state.payload.description} required onChange={this.onChangeHandler}>*/}
                    {/*  <option key="CAR" value="CAR">Car</option>)*/}
                    {/*  <option key="BIKE" value="BIKE">Bike</option>)*/}
                    {/*  <option key="BICYCLE" value="BICYCLE">Bicycle</option>)*/}
                    {/*</select>*/}
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">Label Start Date :</label>
                    <input type="datetime-local" id="startDate" autoComplete="off"
                           value={this.convertStartDateToDateTimeLocal(this.state.payload.start_date)}
                           className="form-control" placeholder="Label Start Date"
                           required onChange={this.onChangeHandler}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">Label End Date :</label>
                    <input type="datetime-local" id="endDate" autoComplete="off"
                           value={this.convertEndDateToDateTimeLocal(this.state.payload.end_date)}
                           className="form-control" placeholder="Label End Date"
                           required onChange={this.onChangeHandler}/>
                  </div>
                  <div className="form-group">
                    <label form="status"> Label Status : </label>
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

ManageLabels.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createLabelSuccess: SELECTORS.createLabelSuccess(),
  createLabelFailure: SELECTORS.createLabelFailure(),

  getLabelsSuccess: SELECTORS.getLabelSuccess(),
  getLabelsFailure: SELECTORS.getLabelFailure(),

  getLabelsByIdSuccess: SELECTORS.getLabelByIdSuccess(),
  getLabelsByIdFailure: SELECTORS.getLabelByIdFailure(),

  updateLabelSuccess: SELECTORS.updateLabelSuccess(),
  updateLabelFailure: SELECTORS.updateLabelFailure(),

  deleteLabelSuccess: SELECTORS.deleteLabelSuccess(),
  deleteLabelFailure: SELECTORS.deleteLabelFailure()
});

function mapDispatchToProps(dispatch) {

  return {
    dispatch,
    createLabel : payload => dispatch(ACTIONS.createLabel(payload)),
    getLabels: () => dispatch(ACTIONS.getLabels()),
    getLabelsById: id => dispatch(ACTIONS.getLabelById(id)),
    updateLabel: (payload) => dispatch(ACTIONS.updateLabel(payload)),
    deleteLabel: id => dispatch(ACTIONS.deleteLabel(id))
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageLabels', reducer });
const withSaga = injectSaga({ key: 'manageLabels', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageLabels);
