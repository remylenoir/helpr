import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PreviewCard = ({
  type,
  profile: { createdAlerts, createdEvents, favAlerts, favEvents, joinedEvents }
}) => {
  return type === 'createdAlerts' ? (
    <div>
      {createdAlerts.map(alert => (
        <Fragment key={alert._id}>
          <h3>{alert.title}</h3>
          <img src={alert.imageURL} alt='alert pic' />
          <p>{alert.description}</p>
          <a href='#!'>More details</a>
        </Fragment>
      ))}
    </div>
  ) : type === 'createdEvents' ? (
    <div>
      {createdEvents.map(event => (
        <Fragment key={event._id}>
          <h3>{event.title}</h3>
          <img src={event.imageURL} alt='event pic' />
          <p>{event.description}</p>
          <a href='#!'>More details</a>
        </Fragment>
      ))}
    </div>
  ) : type === 'favAlerts' ? (
    <div>
      {/* {createdEvents.map(event => (
        <Fragment key={event._id}>
          <h3>{event.title}</h3>
          <img src={event.imageURL} alt='event pic' />
          <p>{event.description}</p>
          <a href='#!'>More details</a>
        </Fragment>
      ))} */}
      {favAlerts}
    </div>
  ) : null
};

PreviewCard.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(mapStateToProps)(PreviewCard);
