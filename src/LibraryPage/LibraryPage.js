import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import '../style/Library.css'
import MyItem from './MyItem'
import { deleteLibrary } from '../redux/actions-library'
import Swal from 'sweetalert2'


class LibraryPage extends React.Component {
  state = {
    itemsOfLib: []
  }

  componentDidMount() {
    if (this.props.libObj) {
    fetch(`http://localhost:3001/libraries/${this.props.libObj.id}`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(resp => resp.json())
    .then(itemsArray => this.setState({itemsOfLib: itemsArray}))
    }
  }

  deleteLibrary = () =>{
    this.props.deleteLibrary(this.props.libObj.id)
    Swal.fire({
      icon: 'success',
      text: `${this.props.libObj.title} is successfully deleted!`,
    })
  }

  render() {
    return (
      <div className="LibraryPage">
        {this.props.libObj ? (
        <div>
          <p className="libTitle">{this.props.libObj.title}</p>
          <p className="libText">{this.props.libObj.description}</p>

          <Link to={`/profile`}>
            <div className="ui button" onClick={this.deleteLibrary}>Delete Library</div>
          </Link>
          
          <div className="MediaContainer">
            {this.state.itemsOfLib.map((item, i) => <MyItem key={i} item={item} libId={this.props.libObj.id}/>)}
          </div>
        </div>)
        : null}
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const libId = ownProps.match.params.id

  return {
    libObj: state.myLibraries.find(lib => lib.id.toString() === libId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLibrary: (libId) => dispatch(deleteLibrary(libId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LibraryPage))