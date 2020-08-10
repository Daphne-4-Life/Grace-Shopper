import React from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store'

export class EditAccountInfoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      address: props.address || '',
      email: props.email || '',
      imageUrl: props.imageUrl || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateUser(this.props.userId, this.state)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {firstName, lastName, address, email, imageUrl} = this.state
    return (
      <div className="edit-account-info-page">
        <div className="account-info">
          <img className="profile-image" src={imageUrl} alt="User image" />
          <div className="profile-body">
            <h3 className="account-name">
              {firstName.toUpperCase()} {lastName.toUpperCase()}
            </h3>
            <div className="account-email">
              <h4>Email: </h4>
              <p>{email}</p>
            </div>
            <div className="account-address">
              <h4>Address: </h4>
              <p>{address}</p>
            </div>
          </div>
        </div>
        <div className="space">
          <p> </p>
        </div>
        <form id="edit-account-info-form" onSubmit={this.handleSubmit}>
          <h2>Update Profile Information:</h2>
          <div className="edit-name">
            <label htmlFor="firstName">
              <small>First Name:</small>
            </label>
            <input
              value={this.state.firstName}
              name="firstName"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">
              <small>Last Name:</small>
            </label>
            <input
              value={this.state.lastName}
              name="lastName"
              type="text"
              onChange={this.handleChange}
            />
          </div>

          <div className="edit-address-email">
            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input
              value={this.state.email}
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="address">
              <small>Address:</small>
            </label>
            <input
              value={this.state.address}
              name="address"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="imageUrl">
              <small>Image Url:</small>
            </label>
            <input
              value={this.state.imageUrl}
              name="imageUrl"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    address: state.user.address,
    imageUrl: state.user.imageUrl,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updateData) =>
      dispatch(updateUserThunk(userId, updateData))
  }
}

export default connect(mapState, mapDispatch)(EditAccountInfoForm)
