import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getAllEvents_ACTION } from '../../actions/events';
import Spinner from '../layout/Spinner';

const HorizontalScroll = ({
  headingTitle,
  btnText,
  type,
  getAllEvents_ACTION,
  events: { events, loading }
}) => {
  useEffect(() => {
    getAllEvents_ACTION();
  }, []);

  // check to see type is 'all' or 'category name', once we defined different categories,
  //this func needs to be updated.
  let filteredEvents = [];
  const filterCategories = type => {
    events &&
      events.forEach(event => {
        if (type === 'Food delivery') {
          if (event.categories.find(category => category.title === type)) {
            filteredEvents.push(event);
          }
        } else if (type === 'all') filteredEvents.push(event);
      });
  };
  filterCategories(type);

  const allEventElements =
    filteredEvents &&
    filteredEvents.map(event => {
      return (
        <Card style={{ width: '15rem' }}>
          <Card.Img variant='top' src={event.coverImage} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.shortDesc}</Card.Text>
          </Card.Body>
        </Card>
      );
    });

  return (
    <Fragment>
      <div className='horizontal-scroll'>
        <h3>{headingTitle}</h3>
        <div className='horizontal-scroll-wrapper'>
          {loading && events === null ? <Spinner /> : type && allEventElements}
        </div>
        <Button variant='outline-primary'>{btnText}</Button>
      </div>
    </Fragment>
  );
};

HorizontalScroll.propTypes = {
  title: PropTypes.string,
  btnText: PropTypes.string
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getAllEvents_ACTION }
)(HorizontalScroll);
