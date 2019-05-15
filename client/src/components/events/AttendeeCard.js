import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const AttendeeCard = ({event: {attendees}}) => {
  const attendeeElement = attendees && attendees.map(attendee => (<div>
    {attendee}
  </div>))
  return (
    <Fragment>
      {attendeeElement}
    </Fragment>
  )
}

AttendeeCard.propTypes = {

}

const mapStateToProps = state => ({
  event: state.events.event
})

export default connect(mapStateToProps)(AttendeeCard) 
