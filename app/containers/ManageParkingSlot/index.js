/**
 *
 * ManageParkingSlot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageParkingSlot from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";


const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)
/* eslint-disable react/prefer-stateless-function */
export class ManageParkingSlot extends React.Component {
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
            <button data-tip data-for={"edit" + row.original.id} >
            </button>

            <button data-tip data-for={"delete" + row.original.id} >
            </button>
          </div>
        )
      }
    }
  ];

  render() {
    return (
      <React.Fragment >
        <div className="contentHeader">
          <div className="row">
            <div className="col-8">

              <p><span>Manage Parking Slots</span></p>
            </div>
            <div className="col-4">
              <div className="switcher">

                <div className="active ">
                  <FontAwesomeIcon icon={faList} />

                </div>
                <div className="">

                  <FontAwesomeIcon icon={faMap} />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="contentContainer">
          <ReactTable
            data={[]}
            columns={this.columns}
            defaultPageSize={10}
            noDataText={"No Data Found"}
            className="customReactTable"
            PreviousComponent={defaultButton}
            NextComponent={defaultButton}
          />
        </div>



      </React.Fragment>
    );
  }
}

ManageParkingSlot.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageparkingslot: makeSelectManageParkingSlot(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageParkingSlot', reducer });
const withSaga = injectSaga({ key: 'manageParkingSlot', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageParkingSlot);
