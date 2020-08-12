import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {deleteUserThunk, updateUserThunk} from '../store'

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      allUsers: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    const allUsersRes = await axios.get('/api/users')
    this.setState({allUsers: allUsersRes.data})
  }

  async handleDelete(userId) {
    await this.props.deleteUser(userId)
    this.setState({
      allUsers: this.state.allUsers.filter(user => {
        if (user.id !== userId) {
          return user
        }
      })
    })
  }

  render() {
    const body =
      this.state.allUsers && this.props.userIsAdmin ? (
        this.state.allUsers.map(user => (
          <div key={user.id} className="account-info">
            <img
              className="profile-image"
              src={user.imageUrl}
              alt="User image"
            />
            <div className="profile-body">
              <h3 className="account-name">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </h3>
              <div className="account-email">
                <h4>Email: </h4>
                <p>{user.email}</p>
              </div>
              <div className="account-address">
                <h4>Address: </h4>
                <p>{user.address}</p>
              </div>
              <div className="delete-button">
                <button
                  onClick={() => this.handleDelete(+user.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Users Loaded / You Are Not An Admin!</p>
      )

    return (
      <div className="all-users-page">
        <h1>All Users: </h1>
        <div className="all-users">{body}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userIsAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
