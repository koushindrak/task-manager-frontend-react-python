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
import {faAd, faPen, faPlus, faPlusCircle, faTasks, faTrash} from "@fortawesome/free-solid-svg-icons";
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
      Header: 'Actions',
      Cell: row => {
        return (
          <div>

            <button data-tip data-for={"edit" + row.original.id} onClick={()=>{
              this.setState({ selectedLabelId: row.original.id, addOrEditIsFetching: true, isEditLabel:true });
              this.props.getLabelsById(row.original.id)
            }}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <ReactTooltip id={"edit" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Edit Label</p></div>
            </ReactTooltip>

            <button data-tip data-for={"delete" + row.original.id} onClick={() => {
              this.setState({ selectedLabelId: row.original.id });
              this.props.deleteLabel(row.original.id)
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ReactTooltip id={"delete" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Delete Label</p></div>
            </ReactTooltip>

            <button data-tip data-for={"addTask" + row.original.id} onClick={() => {
              this.setState({ selectedLabelId: row.original.id });
              this.props.history.push('labels/tasks/'+row.original.id);
            }}>
              <FontAwesomeIcon icon={faTasks}  />
            </button>
            <ReactTooltip id={"addTask" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Add Task</p></div>
            </ReactTooltip>
          </div>
        )
      }
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
      // this.manageNotificationModal(true, nextProps.createLabelSuccess.displayMessage, "success")
      $('#myModal').css({display: "none"})

    }
    if(commonUtils.compare(nextProps.createLabelFailure,this.props.createLabelFailure)){
      this.manageNotificationModal(
        true, nextProps.createLabelFailure.error, "danger")
    }
  }

  getLabelsListener(nextProps) {
    console.log("getLabelsListener-nextProps.getLabelsSuccess--",nextProps.getLabelsSuccess)

    if(commonUtils.compare(nextProps.getLabelsSuccess,this.props.getLabelsSuccess)){
      this.setState({labels: nextProps.getLabelsSuccess})
    }
    if(commonUtils.compare(nextProps.getLabelsFailure,this.props.getLabelsFailure)){
      this.manageNotificationModal(true, nextProps.getLabelsFailure.error, "danger")
    }
  }


  getLabelsByIdListener(nextProps){
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
    payload.created_at = Date.parse(payload.created_at)
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

                <p><span>Manage Labels</span></p>
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
              data={this.state.labels}
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
                  {this.state.isEditLabel ? <p>Edit Label</p> : <p> Add Label</p>}
                </div>
                <div className="customModal-body">

                  <div className="form-group">
                    <label htmlFor="name">Label Name :</label>
                    <input type="text" id="name" autoComplete="off" value={this.state.payload.name} className="form-control" placeholder="Label Name"
                           required onChange={this.onChangeHandler}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Label Description :</label>
                    <input type="text" id="description" autoComplete="off" value={this.state.payload.description} className="form-control" placeholder="Label Description"
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
