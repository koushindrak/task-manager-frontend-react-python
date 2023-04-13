/**
 *
 * Teams
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
import makeSelectTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Teams extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Teams</title>
          <meta name="description" content="Description of Teams" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Teams.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teams: makeSelectTeams(),
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

const withReducer = injectReducer({ key: 'teams', reducer });
const withSaga = injectSaga({ key: 'teams', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Teams);
