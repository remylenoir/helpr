import React, { Fragment, useEffect, useState } from 'react';
import { Popup, Marker } from 'react-map-gl';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pin from './Pin';

const Popups = ({ getAllAlerts_ACTION, alerts: { alerts } }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
  }, []);

  // const [popupState, setPopupState] = useState({
  //   popup: false
  // });

  const popupStyle = {
    fontSize: '0.8em'
  };

  const popupElements =
    alerts &&
    alerts.map((alert, i) => {
      return (
        <Popup
          key={i}
          latitude={alert.location.coordinates[0]}
          longitude={alert.location.coordinates[1]}
          closeButton={false}
          closeOnClick={true}
          anchor='top'
        >
          <div style={popupStyle}>
            <Link to={`/alert/${alert._id}`}>{alert.type}</Link>
          </div>
        </Popup>
      );
    });

  return (
    <Fragment>
      {/* Comment out for later iterations */}
      {/* {alerts &&
        alerts.map((alert, i) => {
          return (
            <Marker
              key={i}
              latitude={alert.location.coordinates[0]}
              longitude={alert.location.coordinates[1]}
              onClick={() => setPopupState()}
            >
              <Pin size={25} />
            </Marker>
          )  
        })} */}

      {popupElements}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { getAllAlerts_ACTION }
)(Popups);
