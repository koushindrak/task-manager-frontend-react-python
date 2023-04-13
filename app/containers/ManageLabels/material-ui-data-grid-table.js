/**
 *
 * ManageLabels
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
import makeSelectManageLabels from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ManageLabels extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageLabels</title>
          <meta name="description" content="Description of ManageLabels" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageLabels.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managelabels: makeSelectManageLabels(),
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

const withReducer = injectReducer({ key: 'manageLabels', reducer });
const withSaga = injectSaga({ key: 'manageLabels', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageLabels);
