import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserIcon from "../userIcon/UserIcon"
import logoutUser from "../../actions/logoutAction";
import styled from 'styled-components';
import M from "materialize-css"

const LinkStyled = styled(Link)`
    color: #ffffff;
    font-weight:bold;
    letter-spacing:2px;
	:hover {
        // background-color: #fb8c00;
		color: #00897b;
		font-weight:bold
	}
`

const ButtonStyled = styled.button`
    color: #111111;
    font-weight:bold;
    letter-spacing:2px;
	:hover {
        // background-color: #fb8c00;
		color: blue;
		font-weight:bold
	}
`

const LinkBrand = styled(Link)`
    height: 64px;
	// :hover {
    //     background-color: white;
	// }
`
class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }
    render() {
        console.log("navabr",this.props.auth.user.type)
        return (
            <header className="no-padding">
                <ul className="sidenav" id="mobile-demo">
                    <li><LinkBrand to="/" ><img style={{ height: "60px" }} src="https://res.cloudinary.com/coursebee/image/upload/v1596025434/assets/medibee_di8b3n.png" alt="MEDIBEE" /></LinkBrand></li>
                    <li><LinkStyled to="/about">About Us</LinkStyled></li>
                    <li><LinkStyled to="/liveclass">Live Classroom</LinkStyled></li>
                    <li><LinkStyled to="/course">Courses</LinkStyled></li>
                    <li><LinkStyled to="/questionbank">Question Bank</LinkStyled></li>
                    <li><LinkStyled to="/mentors">Mentors</LinkStyled></li>
                    {/* <li><LinkStyled to="/training">Training</LinkStyled></li> */}
                    {this.props.auth.isAuthenticated ?
                        <>
                            {this.props.auth.user.type === 'student' ? <li><LinkStyled className="blue" to="/questionbank">Question Bank</LinkStyled></li> : ''}

                            <li><LinkStyled className="blue" to="#">{this.props.auth.user.name}</LinkStyled></li>
                        </>
                        :
                        <li>
                            <LinkStyled to="/register">
                                Sign Up
                                </LinkStyled>
                        </li>
                    }
                    {this.props.auth.isAuthenticated ? <li><ButtonStyled onClick={this.onLogoutClick} className="btn-flat">Log out</ButtonStyled></li> :
                        (null)
                    }
                    <li><Link to="#!" className="sidenav-close"><i className="material-icons">close</i></Link></li>
                </ul>
                <div className="navbar-fixed">
                    <nav style={{ height: "64px" }} className="white z-depth-2">
                        <div className="nav-wrapper">
                            <ul className="left">
                                <li><LinkStyled to="#" style={{ height: "64px" }} data-target="mobile-demo" className="sidenav-trigger">

                                    <i style={{ lineHeight: "64px" }} className="material-icons">menu</i></LinkStyled>
                                </li>

                                <li><LinkBrand to="/" ><img style={{ height: "60px" }} src="https://res.cloudinary.com/coursebee/image/upload/v1596025434/assets/medibee_di8b3n.png" alt="Medibee" /></LinkBrand></li>
                            </ul>
                            <ul className="right hide-on-med-and-down">
                                <li><LinkStyled to="/about">About Us</LinkStyled></li>
                                <li><LinkStyled to="/liveClass">Live Classroom</LinkStyled></li>
                                <li><LinkStyled to="/course">Courses</LinkStyled></li>
                                <li><LinkStyled to="/mentors">Mentors</LinkStyled></li>
                                {/* <li><LinkStyled to="/training">Training</LinkStyled></li> */}
                                {this.props.auth.isAuthenticated ?
                                    <>
                                        {this.props.auth.user.type === 'student' ? <li><LinkStyled to="/questionbank">Question Bank</LinkStyled></li> : ''}
                                        <li><UserIcon /></li>
                                    </>
                                    :
                                    <li>
                                        <Link className="blue" to="/register">
                                            Sign Up
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    { logoutUser },
)(Navbar);