/**
 *
 * AddOrEditParkingArea
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddOrEditParkingArea from './selectors';
import reducer from './reducer';
import saga from './saga';
import parkingAreasReducer from '../ParkingAreas/reducer'
import parkingAreasSaga from '../ParkingAreas/saga'
import messages from './messages';
import Map from "./Map";
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import * as commonUtils from "../../common-files/commonUtils"
import Geocode from "react-geocode";
import { ParkingAreas } from "../ParkingAreas";
import * as PA_ACTIONS from '../ParkingAreas/actions';
import * as PA_SELECTORS from '../ParkingAreas/selectors';
import NotificationModal from "../../components/NotificationModal/Loadable";


Geocode.setApiKey(commonUtils.GoogleMapsAPIKey);
Geocode.enableDebug();
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
export class AddOrEditParkingArea extends React.Component {
  state = {
    payload: payload,

    mapPosition: {
      lat: 18.5204,
      lng: 73.8567
    },
    markerPosition: {
      lat: 18.5204,
      lng: 73.8567
    },
    parkingAreas: [],
    slots: [],
    selectedParkingAreaId: '',
    selectedParkingAreaData: {},
    isEditParkingArea: false,
    isAddParkingArea: false,
    openNotificationModal: false,
    type: '',
    message: '',
    modal: false,
  }

  componentDidMount() {
     ("componentDidMount--",this.props.location.payload)
    if(this.props.location && this.props.location.isEditParkingArea){
      this.setState({
        payload:this.props.location.payload,
        isEditParkingArea: true,
        selectedParkingAreaId: this.props.location.payload.id
      })
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.createParkingAreaListener(nextProps);
    this.getParkingAreasByIdListener(nextProps);
    this.updateParkingAreaListener(nextProps);
  }

  createParkingAreaListener(nextProps) {
    if (commonUtils.compare(nextProps.createParkingAreaSuccess, this.props.createParkingAreaSuccess)) {
      this.manageNotificationModal(true, nextProps.createParkingAreaSuccess.displayMessage, "success")
      $('#myModal').css({ display: "none" })
      this.props.history.push("/parkingAreas")
    }
    if (commonUtils.compare(nextProps.createParkingAreaFailure, this.props.createParkingAreaFailure)) {
      this.manageNotificationModal(true, nextProps.createParkingAreaFailure.error, "danger")
    }
  }

  getParkingAreasByIdListener(nextProps) {
    if (commonUtils.compare(nextProps.getParkingAreasByIdSuccess, this.props.getParkingAreasByIdSuccess)) {
      this.setState({ selectedParkingAreaData: nextProps.getParkingAreasByIdSuccess.data }, () => {
        if (this.state.isEditParkingArea) {

          this.setState({ payload: nextProps.getParkingAreasByIdSuccess.data }, () => {
            $('#myModal').css({ display: "block" })
          })
        }
      })
    }
    if (commonUtils.compare(nextProps.getParkingAreasByIdFailure, this.props.getParkingAreasByIdFailure)) {
      this.manageNotificationModal(true, nextProps.getParkingAreasByIdFailure.error, "danger")
    }
  }

  updateParkingAreaListener(nextProps) {
    if (commonUtils.compare(nextProps.updateParkingAreaSuccess, this.props.updateParkingAreaSuccess)) {
      this.manageNotificationModal(true, nextProps.updateParkingAreaSuccess.displayMessage, "success")
      this.props.history.push("/parkingAreas")
    }
    if (commonUtils.compare(nextProps.updateParkingAreaFailure, this.props.updateParkingAreaFailure)) {
      this.manageNotificationModal(true, nextProps.updateParkingAreaFailure.error, "danger")
    }
  }
  onCloseHandler = (index) => {
    this.setState({
      openNotificationModal: false,
      message: ''
    })
  }
  manageNotificationModal(isOpen, message, type) {
    this.setState({ openNotificationModal: isOpen, message: message, type: type })
  }
  getCompleteAddressResultFromLatLng(lat, lng) {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        // this.setMapsInfo(address,city,state,this.state.mapPosition.lat,this.state.mapPosition.lng)
        let splittedAddress = response.results[0].formatted_address.split(",");
         ("addressArray[addressArray.length -1].long_name---",addressArray[addressArray.length -1].long_name)
        payload.address.country = addressArray[addressArray.length -1].long_name;
        payload.address.pincode = splittedAddress[splittedAddress.length - 2].split(" ")[2]
      },
      error => {
        console.error(error);
      }
    );
  }

  /*shouldComponentUpdate( nextProps, nextState ){
      if (
        this.state.markerPosition.lat !== 18.5204 ||
        this.state.address !== nextState.address ||
        this.state.city !== nextState.city ||
        this.state.area !== nextState.area ||
        this.state.state !== nextState.state
      ) {
        return true
      } else if ( 18.5204 === nextProps.center.lat ){
        return false
      }
    }*/
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };


  onInfoWindowClose = (event) => {

  };


  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setMapsInfo(address, city, state, newLat, newLng)
        this.setState({
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      },
      error => {
        console.error(error);
      }
    );
  };


  onPlaceSelected = (place) => {

    const address = place.formatted_address
    const addressArray = place.address_components
    const city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.getCompleteAddressResultFromLatLng(latValue, lngValue)
    // Set these values in the state.
    this.setMapsInfo(address, city, state, latValue, lngValue);
    this.setState({

      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };

  setMapsInfo(address, city, state, latValue, lngValue) {
    payload.address.addressLine1 = address
    payload.address.city = city
    payload.address.state = state
    payload.lat = latValue
    payload.lng = lngValue
    this.setState(payload)
  }

  onChangeHandler = event => {
    let payload = { ...this.state.payload }
    if (event.currentTarget.id.includes("address")) {
      payload[event.currentTarget.id.split('.')[0]][event.currentTarget.id.split('.')[1]] = event.currentTarget.value
    } else if (event.currentTarget.id.includes("slotsDetails")) {
      let obj = {};
      obj[event.currentTarget.id.split('.')[1]] = event.currentTarget.id.split('.')[2];
      obj.count = parseInt(event.currentTarget.value);
      let updatedSlots = payload.slotsDetails.filter(elem => elem.vehicleType !== event.currentTarget.id.split('.')[2])
      updatedSlots.push(obj)
      payload.slotsDetails = updatedSlots
    } else {
      payload[event.currentTarget.id] = event.currentTarget.value;
    }
    this.setState({ payload }, () => {
    })
  }

  addOrEditSubmitHandler = event => {
    event.preventDefault();
    console.warn("event--",event.target)
    let payload = this.state.payload;
    if (this.state.isEditParkingArea) {
      payload.id = this.state.selectedParkingAreaId;
      this.props.updateParkingArea(payload);
    } else {
      this.props.createParkingArea(payload);
    }
  }

  render() {

    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={15}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.payload.addressLine1}</span>
              </div>
            </InfoWindow>
            {/*Marker*/}
            <Marker google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '500px'
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={['(regions)']}
            />
          </GoogleMap>
        )
      )
    );
    let map;
    if (this.state.markerPosition.lat !== undefined) {
      map =
        <div>
          <div className="contentHeader">
            <div className="row">
              <div className="col-8">
                <p><span> {this.state.isEditParkingArea ? "Edit ": "Add "} Parking Area</span></p>
              </div>
            </div>

          </div>
          <div className="contentContainer">
            <form onSubmit={this.addOrEditSubmitHandler}>
                <div className="form-group">
                  <input type="text" id="name" autoComplete="off" value={this.state.payload.name} className="form-control" placeholder="Enter parking area name"
                    onChange={this.onChangeHandler} />
                </div>

                <AsyncMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${commonUtils.GoogleMapsAPIKey}&libraries=places`}
                  loadingElement={
                    <div style={{ height: `100%` }} />
                  }
                  containerElement={
                    <div style={{ height: '300px' }} />
                  }
                  mapElement={
                    <div style={{ height: `100%` }} />
                  }
                />
                <br />
                <div className="form-group">
                  <input type="text" id="address.city" autoComplete="off" value={this.state.payload.address.city} className="form-control" placeholder="Enter City name"
                    onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <input type="text" id="address.state" autoComplete="off" value={this.state.payload.address.state} className="form-control" placeholder="Enter State name"
                    onChange={this.onChangeHandler} />          </div>
                <div className="form-group">
                  <input type="text" id="address.pincode" autoComplete="off" value={this.state.payload.address.pincode} className="form-control" placeholder="Enter pincode"
                    onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <input type="text" id="address.addressLine1" autoComplete="off" value={this.state.payload.address.addressLine1} className="form-control" placeholder="Enter Address  Line 1"
                    onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <input type="text" id="lat" autoComplete="off" value={this.state.payload.lat} className="form-control" placeholder="Enter Lat" onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <input type="text" id="lng" autoComplete="off" value={this.state.payload.lng} className="form-control" placeholder="Enter Lng" onChange={this.onChangeHandler} />
                </div>
                {!this.state.isEditParkingArea &&
                  <div className="form-group">
                    <label form="vehicleType"> Slot Details : </label><br />
                    <label htmlFor="car">Car :</label>
                    <input type="number" id="slotsDetails.vehicleType.CAR" autoComplete="off" className="form-control" placeholder="Enter Car Slots" onChange={this.onChangeHandler} />

                    <label htmlFor="bike">Bike :</label>
                    <input type="number" id="slotsDetails.vehicleType.BIKE" autoComplete="off" className="form-control" placeholder="Enter Bike Slots" onChange={this.onChangeHandler} />

                    <label htmlFor="bicycle">Bicycle :</label>
                    <input type="number" id="slotsDetails.vehicleType.BICYCLE" autoComplete="off" className="form-control" placeholder="Enter Bicycle Slots" onChange={this.onChangeHandler} />
                  </div>
                }
                <div className="form-group contentInCenter">
                  <button type="submit" className="btn btn-primary" >Save</button>
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
        </div>
    } else {
      map = <div style={{ height: '300px' }} />
    }

    return (map)
  }

}

/*AddOrEditParkingArea.propTypes = {
  dispatch: PropTypes.func.isRequired,
};*/
ParkingAreas.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  createParkingAreaSuccess: PA_SELECTORS.createParkingAreaSuccess(),
  createParkingAreaFailure: PA_SELECTORS.createParkingAreaFailure(),

  getParkingAreasByIdSuccess: PA_SELECTORS.getParkingAreaByIdSuccess(),
  getParkingAreasByIdFailure: PA_SELECTORS.getParkingAreaByIdFailure(),

  updateParkingAreaSuccess: PA_SELECTORS.updateParkingAreaSuccess(),
  updateParkingAreaFailure: PA_SELECTORS.updateParkingAreaFailure(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createParkingArea: payload => dispatch(PA_ACTIONS.createParkingArea(payload)),
    getParkingAreasById: id => dispatch(PA_ACTIONS.getParkingAreaById(id)),
    updateParkingArea: (payload) => dispatch(PA_ACTIONS.updateParkingArea(payload)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addOrEditParkingArea', reducer });
const withSaga = injectSaga({ key: 'addOrEditParkingArea', saga });
const withPAReducer = injectReducer({ key: 'parkingAreas', reducer: parkingAreasReducer });
const withPASaga = injectSaga({ key: 'parkingAreas', saga:  parkingAreasSaga });

export default compose(
  withReducer,
  withSaga,
  withPAReducer,
  withPASaga,
  withConnect,
)(AddOrEditParkingArea);
