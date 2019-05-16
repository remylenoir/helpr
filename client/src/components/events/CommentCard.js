import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile_ACTION } from '../../actions/profile'


const CommentCard = ({profile, event, getCurrentProfile_ACTION}) => {
  
  const commentElement = event && event.comments.map(comment => {
    return (<Fragment>
      <p>{profile && profile.username}</p>
      <img src={profile && profile.profilePicture} alt="profile-pic"/>
      <p>{comment.text}</p>
    </Fragment>)
  })

  return (
    <div>
      {commentElement}
    </div>
  )
}

CommentCard.propTypes = {

}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  event: state.events.event
})

export default connect(mapStateToProps, {getCurrentProfile_ACTION})(CommentCard) 
