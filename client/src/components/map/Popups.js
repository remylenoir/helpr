/* eslint-disable react-hooks/exhaustive-deps */
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

  const [popupState, setPopupState] = useState(null);

  //render popups
  const renderPopup = () => {
    return (
      popupState && (
        <div id='my-map'>
          <Popup
            tipSize={5}
            latitude={popupState.location.coordinates[0]}
            longitude={popupState.location.coordinates[1]}
            closeOnClick={false}
            onClose={() => setPopupState(null)}
            sortByDepth={true}
          >
            <div className='popup-inner'>
              <Link to={`/alert/${popupState._id}`}>{popupState.type}</Link>
            </div>
          </Popup>
        </div>
      )
    );
  };

  return (
    <Fragment>
      {alerts &&
        alerts.map((alert, i) => {
          return (
            <Marker
              key={i}
              latitude={alert.location.coordinates[0]}
              longitude={alert.location.coordinates[1]}
            >
              <Pin size={25} onClick={() => setPopupState(alert)} />
            </Marker>
          );
        })}
      {alerts && renderPopup()}
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
