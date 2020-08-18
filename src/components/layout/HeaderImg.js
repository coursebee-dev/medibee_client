import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class HeaderImg extends Component {
    render() {
        return (
            <div className="banner">
                <div id="moving-banner" style={{ width: "100%", minHeight: "300px" }} ></div>
                <div className="banner_overlay">
                    <div className="banner_text">
                        <img style={{ height: "120px" }} src="https://res.cloudinary.com/coursebee/image/upload/v1596025434/assets/medibee_di8b3n.png" alt="MEDIBEE" />
                        <h5 className="hide-on-small-only" style={{ fontFamily: "cursive" }}>Build your career with professional online courses. <br />And share your knowledge through live classroom ,training and video based courses.</h5>
                    </div>
                </div>
            </div>

        );
    }
}
HeaderImg.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(HeaderImg);