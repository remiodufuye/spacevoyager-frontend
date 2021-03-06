import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLibrary } from '../redux/actions-library'
 

class LibraryCard extends React.Component {

  deleteLibrary = () => {
    this.props.deleteLibrary(this.props.lib.id)
  }

  render() {
    return (
      <div className="LibraryCard">
        <Link className="rocketIconCon" to={`/library/${this.props.lib.id}`}>
          <i id="libraryIcon" className="fas fa-rocket" onClick={()=>{localStorage.setItem("currentLibId", `${this.props.lib.id}`)}}></i>
        </Link>
        <p className="libCardTitle">{this.props.lib.title}</p>
        <i id="libraryDeleteButton" className="close icon" onClick={this.deleteLibrary}></i>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLibrary: (libId) => dispatch(deleteLibrary(libId))
  }
}

export default connect(null, mapDispatchToProps)(LibraryCard)