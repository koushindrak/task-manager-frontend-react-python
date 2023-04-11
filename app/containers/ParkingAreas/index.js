/**
 *
 * ParkingAreas
 *
 */
/**
 *
 * ManageParkingAreas
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as SELECTORS from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions';
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import 'react-table/react-table.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import NotificationModal from '../../components/NotificationModal/Loadable'
import * as commonUtils from '../../common-files/commonUtils'
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons/faTicketAlt";

const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)
let payload = {
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  },
  slotsDetails: [],
  name: '',
  lat: 0.0,
  lng: 0.0,
}
export class ParkingAreas extends React.Component {
  state = {
    parkingAreas: [],
    slots: [],
    payload: payload,
    selectedParkingAreaId: '',
    selectedParkingAreaData: {},
    isEditParkingArea: false,
    isAddParkingArea: false,
    openNotificationModal: false,
    type: '',
    message: '',
    modal: false,
    showBookingSlot: false,
    selectedSlot: {
      status: "BOOKED"
    },
    isFetchingParkingArea: false,
    bookingPayload: {
      slotId: "",
      vehicleType: "",
      vehicleNo: "",
      status: ""
    },
    getAllCounters: [{ "available": 0, "occupied": 0, "vehicle": "CAR" }, { "available": 0, "occupied": 0, "vehicle": "BIKE" }, { "available": 0, "occupied": 0, "vehicle": "BICYCLE" }]
  }
  componentDidMount() {
    this.props.getParkingAreas();
  }

  columns = [
    {
      Header: 'Name',
      accessor: 'name',
      filterable: true,
      style: { textAlign: "center" }
    },
    {
      Header: 'GPS Coordinates',
      Cell: row => (<span>{row.original.lat + "," + row.original.lng}</span>),
      filterable: true,
      style: { textAlign: "center" },
    },
    {
      Header: 'Address',
      Cell: row => (<span>{commonUtils.getCommaSepratedValuesFromObject(row.original.address)}</span>),
      filterable: true,
      style: { textAlign: "center" },
    },
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
            <button data-tip data-for={"edit" + row.original.id} onClick={() => {
              this.setState({ selectedParkingAreaId: row.original.id, addOrEditIsFetching: true, isEditParkingArea: true });
              this.props.getParkingAreaById(row.original.id);

            }}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <ReactTooltip id={"edit" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Edit</p></div>
            </ReactTooltip>

            <button data-tip data-for={"delete" + row.original.id} onClick={() => {
              this.setState({ selectedParkingAreaId: row.original.id });
              this.props.deleteParkingArea(row.original.id)
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ReactTooltip id={"delete" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Delete</p></div>
            </ReactTooltip>
            <button data-tip data-for={"view" + row.original.id} onClick={() => this.getParkingAreaDetails(row.original)}>
              <FontAwesomeIcon icon={faTicketAlt} />
            </button>
            <ReactTooltip id={"view" + row.original.id} place="bottom" type="dark">
              <div className="tooltipText"><p>Book Slots</p></div>
            </ReactTooltip>
          </div>
        )
      }
    }
  ];


  componentWillReceiveProps(nextProps, nextContext) {
    this.getParkingAreasListener(nextProps);
    this.getParkingAreasByIdListener(nextProps);
    this.deleteParkingAreaListener(nextProps);
    this.getSlotsListener(nextProps);
    this.getBookingListener(nextProps);
    this.getReleaseListener(nextProps);
    this.getParkingAreaStats(nextProps);
  }

  getParkingAreasListener(nextProps) {
    if (commonUtils.compare(nextProps.getParkingAreasSuccess, this.props.getParkingAreasSuccess)) {
      this.setState({ parkingAreas: nextProps.getParkingAreasSuccess.data })
    }
    if (commonUtils.compare(nextProps.getParkingAreasFailure, this.props.getParkingAreasFailure)) {
      this.manageNotificationModal(true, nextProps.getParkingAreasFailure.error, "danger")
    }
  }

  getParkingAreaStats(nextProps) {
    if (commonUtils.compare(nextProps.parkingAreaStatsSuccess, this.props.parkingAreaStatsSuccess)) {
      this.setState({ getAllCounters: nextProps.parkingAreaStatsSuccess.data })
    }
    if (commonUtils.compare(nextProps.parkingAreaStatsError, this.props.parkingAreaStatsError)) {
      this.manageNotificationModal(true, nextProps.parkingAreaStatsError.error, "danger")
    }
  }

  getBookingListener(nextProps) {
    if (commonUtils.compare(nextProps.bookingSlotSuccess, this.props.bookingSlotSuccess)) {
      this.props.getSlotsDetails(this.state.id)
      this.manageNotificationModal(true, nextProps.bookingSlotSuccess.displayMessage, "success")
    }
    if (commonUtils.compare(nextProps.bookingSlotError, this.props.bookingSlotError)) {
      this.manageNotificationModal(true, nextProps.bookingSlotError.error, "danger")
    }
  }

  getReleaseListener(nextProps) {
    if (commonUtils.compare(nextProps.releaseSlotSuccess, this.props.releaseSlotSuccess)) {
      this.props.getSlotsDetails(this.state.id)
      this.manageNotificationModal(true, nextProps.releaseSlotSuccess, "success")
    }
    if (commonUtils.compare(nextProps.releaseSlotError, this.props.releaseSlotError)) {
      this.manageNotificationModal(true, nextProps.releaseSlotError.error, "danger")
    }
  }

  getParkingAreasByIdListener(nextProps) {
    if (commonUtils.compare(nextProps.getParkingAreasByIdSuccess, this.props.getParkingAreasByIdSuccess)) {
      this.setState({ selectedParkingAreaData: nextProps.getParkingAreasByIdSuccess.data }, () => {
        if (this.state.isEditParkingArea) {
          this.props.history.push({
            pathname: "/addOrEditParkingArea/" + this.state.selectedParkingAreaId,
            payload: nextProps.getParkingAreasByIdSuccess.data,
            isEditParkingArea: true
          })
        }
      })
    }
    if (commonUtils.compare(nextProps.getParkingAreasByIdFailure, this.props.getParkingAreasByIdFailure)) {
      this.manageNotificationModal(true, nextProps.getParkingAreasByIdFailure.error, "danger")
    }
  }

  deleteParkingAreaListener(nextProps) {
    if (commonUtils.compare(nextProps.deleteParkingAreaSuccess, this.props.deleteParkingAreaSuccess)) {
      this.props.getParkingAreas()
      this.manageNotificationModal(true, nextProps.deleteParkingAreaSuccess.displayMessage, "success")
    }
    if (commonUtils.compare(nextProps.deleteParkingAreaFailure, this.props.deleteParkingAreaFailure)) {
      this.manageNotificationModal(true, nextProps.deleteParkingAreaFailure.error, "danger")
    }
  }

  getSlotsListener(nextProps) {
    if (commonUtils.compare(nextProps.getSlotsSuccess, this.props.getSlotsSuccess)) {
      this.setState({ slots: nextProps.getSlotsSuccess.data, isFetchingParkingArea: false }, () => {
      })
    }
    if (commonUtils.compare(nextProps.getSlotsFailure, this.props.getSlotsFailure)) {
      this.manageNotificationModal(true, nextProps.getSlotsFailure.error, "danger")
    }
  }

  manageNotificationModal(isOpen, message, type) {
    this.setState({ openNotificationModal: isOpen, message: message, type: type, isFetchingParkingArea: type !== "danger" })
  }

  addOnClickHandler = event => {
    this.props.history.push("/addOrEditParkingArea")
  }

  onCloseHandler = (index) => {
    this.setState({
      openNotificationModal: false,
      message: ''
    })
  }

  getParkingAreaDetails = ({ name, id }) => {
    this.props.getParkingAreaStats(id)
    this.setState({
      showBookingSlot: true,
      isFetchingParkingArea: true,
      name,
      id
    }, () => this.props.getSlotsDetails(id))
  }

  openManageSlotModal = (slots) => {

    this.setState({
      bookingPayload: {
        slots,
        status: slots.status,
        vehicleType: slots.vehicleType,
        vehicleNo: slots.vehicleNo ? slots.vehicleNo : ""
      }
    }, () => {
      $('#exampleModal').modal("show")
    })

  }

  onChangeProjectNumber = (event) => {
    let bookingPayload = { ...this.state.bookingPayload }
    bookingPayload.vehicleNo = event.target.value;
    this.setState({
      bookingPayload
    })
  }




  onSubmitBookingHandler = (event) => {
    event.preventDefault();
    $('#exampleModal').modal("hide")
    if (this.state.bookingPayload.status === "AVAILABLE")
      this.props.bookingSlot(this.state.bookingPayload);
    else
      this.props.releaseSlot(this.state.bookingPayload.slots.id)
    this.setState({
      isFetchingParkingArea: true
    })
  }

  render() {
    return (
      <React.Fragment >
        <div className="contentHeader">
          <div className="row">
            <div className="col-8">

              <p><span onClick={() => this.setState({ showBookingSlot: false })}>Manage Parking Areas</span> {this.state.showBookingSlot && <span><i className="fa fa-angle-double-right" /> {"Book Parking Slot at " + this.state.name}</span>}</p>
            </div>
            <div className="col-4">
              {!this.state.showBookingSlot && <button className="addButton"
                onClick={this.addOnClickHandler}> <span>&#43;</span>
              </button>
              }
            </div>
          </div>

        </div>
        <div className="contentContainer">
          {this.state.showBookingSlot ?
            this.state.isFetchingParkingArea ?
              <div className="loader1">
                <div className="loaderBox">
                  <div className="loading">
                    <span>Loading</span>
                  </div>
                </div>
              </div>
              :
              this.state.slots.length > 0 ?
                <React.Fragment>
                  <ul className="counterList">
                    {this.state.getAllCounters.map(temp => (
                      <li key={temp.vehicle}>
                        <div className="counterCard landingCard">
                          <div className="counterContent">
                            <p>{temp.vehicle}</p>
                            <h4>{temp.available}<span>Out of</span>{temp.available + temp.occupied}</h4>
                          </div>
                          <div className="counterProgress">
                            <i className={temp.vehicle === "BICYCLE" ? "fa fa-bicycle fa-3x" : temp.vehicle === "CAR" ? "fa fa-car fa-3x" : "fa fa-motorcycle fa-3x"} ></i>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul className="pageList">

                    {this.state.slots.map(temp => (
                      <li key={temp.id} className={temp.status === "AVAILABLE" ? "bookingSlot " : "bookingSlot booked "} onClick={() => this.openManageSlotModal(temp)}>
                        <div className="pageListBox">
                          <div className="slotIcon">
                            <div><i className={temp.vehicleType === "BICYCLE" ? "fa fa-bicycle fa-5x" : temp.vehicleType === "CAR" ? "fa fa-car fa-5x" : "fa fa-motorcycle fa-5x"} ></i></div>
                            <p>Status : <span className={temp.status === "AVAILABLE" ? "available" : "booked"}>{temp.status}</span></p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
                :
                <div className="noDataFound">
                  <h6>No Data Found!</h6>
                  <button> Add Parking Slots</button>
                </div>
            :
            <ReactTable
              data={this.state.parkingAreas}
              columns={this.columns}
              defaultPageSize={10}
              noDataText={"No Data Found"}
              className="customReactTable"
              PreviousComponent={defaultButton}
              NextComponent={defaultButton}
            />
          }
        </div>
        <div className="modal" tabIndex="-1" id="exampleModal" role="dialog">
          <div className="modalContainer">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={this.onSubmitBookingHandler}>
                  <div className="modal-header">
                    <h5 className="modal-title">{this.state.bookingPayload.status === "OCCUPIED" ? "Release Slot" : "Book Slot"}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="name">Project Number :</label>
                      <input type="text" id="name" autoComplete="off" disabled={this.state.bookingPayload.status === "OCCUPIED"} value={this.state.bookingPayload.vehicleNo} onChange={this.onChangeProjectNumber} className="form-control" placeholder="Project Number "
                        required />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" >{this.state.bookingPayload.status === "OCCUPIED" ? "Release Slot" : "Book Slot"}</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </form>
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
      </React.Fragment>
    );
  }
}

ParkingAreas.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({

  getParkingAreasSuccess: SELECTORS.getParkingAreaSuccess(),
  getParkingAreasFailure: SELECTORS.getParkingAreaFailure(),

  getParkingAreasByIdSuccess: SELECTORS.getParkingAreaByIdSuccess(),
  getParkingAreasByIdFailure: SELECTORS.getParkingAreaByIdFailure(),

  deleteParkingAreaSuccess: SELECTORS.deleteParkingAreaSuccess(),
  deleteParkingAreaFailure: SELECTORS.deleteParkingAreaFailure(),

  getSlotsSuccess: SELECTORS.getSlotsSuccess(),
  getSlotsFailure: SELECTORS.getSlotsFailure(),

  releaseSlotSuccess: SELECTORS.releaseSlotSuccess(),
  releaseSlotError: SELECTORS.releaseSlotError(),

  bookingSlotSuccess: SELECTORS.bookingSlotSuccess(),
  bookingSlotError: SELECTORS.bookingSlotError(),
  parkingAreaStatsSuccess: SELECTORS.parkingAreaStatsSuccess(),
  parkingAreaStatsError: SELECTORS.parkingAreaStatsError(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getParkingAreas: () => dispatch(ACTIONS.getParkingAreas()),
    getParkingAreaById: id => dispatch(ACTIONS.getParkingAreaById(id)),
    deleteParkingArea: id => dispatch(ACTIONS.deleteParkingArea(id)),
    getSlotsDetails: id => dispatch(ACTIONS.getSlotsDetails(id)),
    bookingSlot: payload => dispatch(ACTIONS.bookingSlot(payload)),
    releaseSlot: id => dispatch(ACTIONS.releaseSlot(id)),
    getParkingAreaStats: id => dispatch(ACTIONS.getParkingAreaStats(id))
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'parkingAreas', reducer });
const withSaga = injectSaga({ key: 'parkingAreas', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ParkingAreas);
