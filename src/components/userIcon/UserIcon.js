import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import M from "materialize-css";

export class UserIcon extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    componentDidMount() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {
            coverTrigger: false,
        });
    }
    render() {
        return (
            <>
                <Link to="/" data-target="nav-dropdown" className="btn-floating dropdown-trigger btn-large waves-effect waves-light red darken-1">
                    <b style={{ textAlign: "center", fontSize: "150%", textJustify: "center" }}>
                        {this.props.auth.user.name.charAt(0).toUpperCase()}
                    </b>
                </Link>
                <ul id='nav-dropdown' className='dropdown-content'>
                    <li><button className="btn-flat" onClick={this.onLogoutClick}>Logout</button></li>
                </ul>
            </>
        )
    }
}

UserIcon.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(UserIcon);
