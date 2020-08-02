import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

const LinkStyled = styled(Link)`
	color: black;
	:hover {
		color: #ef6c00;
	}
`

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer white z-depth-1">
                <div className="container" style={{ width: "40%", justifyContent: "center" }}>
                    <ul className="row">
                        <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/about">About</LinkStyled></li>
                        <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/contactus" title="Contact">Contact</LinkStyled></li>
                        <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/disclaimer">Disclaimer</LinkStyled></li>
                        <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/privacy">Privacy</LinkStyled></li>
                        <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/terms">Terms</LinkStyled></li>
                        {this.props.auth.isAuthenticated ? null : <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="/admin">Admin</LinkStyled></li>}
                        {this.props.auth.isAuthenticated ? <li className="col s12 m6 l2"><LinkStyled className="btn-flat" to="#">Settings</LinkStyled></li> : null}
                    </ul>
                </div>
                <div className="footer-copyright">
                    <div style={{ width: "100%" }} className="container">
                        <LinkStyled to="/" ><img style={{ height: "60px" }} src="https://res.cloudinary.com/coursebee/image/upload/v1596025434/assets/medibee_di8b3n.png" alt="Medibee" /></LinkStyled>
                        <div style={{ lineHeight: "60px" }} className="right black-text">© Kernel Foundation</div>
                    </div>
                </div>
            </footer>
        );
    }
}
Footer.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Footer);