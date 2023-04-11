/**
 *
 * Dashboard
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
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {
  state = {
    isFetchingLineChartData: true
  }
  render() {
    return (
      <div>
        <div className="contentHeader">
          <div className="row">
            <div className="col-8">

              <p><span>Dashboard</span></p>
            </div>

          </div>

        </div>

        <div className="contentContainer">
          <ul className="counterList">

            <li >
              <div className="counterCard landingCard">
                <div className="counterContent">
                  <p>Car</p>
                  <h4>2</h4>
                </div>
                <div className="counterProgress">
                  <i className="fa fa-car fa-3x"></i>

                </div>

              </div>
            </li>
            <li >
              <div className="counterCard landingCard">
                <div className="counterContent">
                  <p>Bicyle</p>
                  <h4>0</h4>
                </div>
                <div className="counterProgress">
                  <i className="fa fa-bicycle fa-3x"></i>

                </div>

              </div>
            </li>
            <li >
              <div className="counterCard landingCard">
                <div className="counterContent">
                  <p>Motorcyle</p>
                  <h4>0</h4>
                </div>
                <div className="counterProgress">
                  <i className="fa fa-motorcycle fa-3x"></i>
                </div>

              </div>
            </li>
          </ul>
          <div className="flex">
            <div className="flex-item fx-b33 pd-r-7">
              <div className="card panel cardPanel">
                <div className="card-header panelHeader"><h5>Activities</h5></div>
                <div className="card-body panelBody">
                  {this.state.isFetchingLineChartData ?
                    <div className="panelLoader">
                      <i className="fa  fa-spinner fa-spin"></i>
                    </div> :
                    this.state.lineChartData.length > 0 ?
                      <AmCharts.React options={this.getLineChartConfig(this.state.lineChartData)} className="panelChart" /> :
                      <div className="panelMessage">
                        <p><i className="far fa-exclamation-triangle"></i>No Activity yet !</p>
                      </div>
                  }
                </div>
              </div>

            </div>
            <div className="flex-item fx-b33 pd-r-7">
              <div className="card panel cardPanel">
                <div className="card-header panelHeader"><h5>Activities</h5></div>
                <div className="card-body panelBody">
                  {this.state.isFetchingLineChartData ?
                    <div className="panelLoader">
                      <i className="fa  fa-spinner fa-spin"></i>
                    </div> :
                    this.state.lineChartData.length > 0 ?
                      <AmCharts.React options={this.getLineChartConfig(this.state.lineChartData)} className="panelChart" /> :
                      <div className="panelMessage">
                        <p><i className="far fa-exclamation-triangle"></i>No Activity yet !</p>
                      </div>
                  }
                </div>
              </div>

            </div>
            <div className="flex-item fx-b33 pd-r-7">
              <div className="card panel cardPanel">
                <div className="card-header panelHeader"><h5>Activities</h5></div>
                <div className="card-body panelBody">
                  {this.state.isFetchingLineChartData ?
                    <div className="panelLoader">
                      <i className="fa  fa-spinner fa-spin"></i>
                    </div> :
                    this.state.lineChartData.length > 0 ?
                      <AmCharts.React options={this.getLineChartConfig(this.state.lineChartData)} className="panelChart" /> :
                      <div className="panelMessage">
                        <p><i className="far fa-exclamation-triangle"></i>No Activity yet !</p>
                      </div>
                  }
                </div>
              </div>

            </div>

          </div>

          <div className="flex pd-t-10">
            <div className="flex-item fx-b50 pd-r-7">
              <div className="card panel cardPanel">
                <div className="card-header panelHeader"><h5>Activities</h5></div>
                <div className="card-body panelBody">
                  {this.state.isFetchingLineChartData ?
                    <div className="panelLoader">
                      <i className="fa  fa-spinner fa-spin"></i>
                    </div> :
                    this.state.lineChartData.length > 0 ?
                      <AmCharts.React options={this.getLineChartConfig(this.state.lineChartData)} className="panelChart" /> :
                      <div className="panelMessage">
                        <p><i className="far fa-exclamation-triangle"></i>No Activity yet !</p>
                      </div>
                  }
                </div>
              </div>

            </div>
            <div className="flex-item fx-b50 pd-r-7">
              <div className="card panel cardPanel">
                <div className="card-header panelHeader"><h5>Activities</h5></div>
                <div className="card-body panelBody">
                  {this.state.isFetchingLineChartData ?
                    <div className="panelLoader">
                      <i className="fa  fa-spinner fa-spin"></i>
                    </div> :
                    this.state.lineChartData.length > 0 ?
                      <AmCharts.React options={this.getLineChartConfig(this.state.lineChartData)} className="panelChart" /> :
                      <div className="panelMessage">
                        <p><i className="far fa-exclamation-triangle"></i>No Activity yet !</p>
                      </div>
                  }
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
