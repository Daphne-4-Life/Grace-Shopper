import React from 'react'
import {connect} from 'react-redux'
//Need order reducer to pull previous orders based on current user's userId and display in previous orders div

const Profile = props => {
  const {user, firstName, lastName, email, address, imageUrl} = props

  //NEED TO MAKE A PREVIOUS ORDERS COMPONENT TO PUTINTO PREVIOUS ORDERS
  return (
    <div className="profile-container">
      <h2>Account Info</h2>
      <div className="profile-image">
        <img className="profile-image" src={imageUrl} alt="User image" />
      </div>
      <div className="profile-body">
        <h3>
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </h3>
        <h4>Email</h4>
        <p>{email}</p>
        <h4>Address</h4>
        <p>{address}</p>
      </div>
      <div className="previous-orders">
        <h1>PLACEHOLDER FOR PREVIOUS ORDERS MAP</h1>
      </div>
    </div>
  )
}

//NEED TO ALSO PULL ALL THE ORDERS TO PROPS ONCE WE KNOW WHAT THE ORDER REDUCER LOOKS LIKE
const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    address: state.user.address,
    imageUrl: state.user.imageUrl,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}

export default connect(mapState)(Profile)
