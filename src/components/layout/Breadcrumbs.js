import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import hexagon from '../../images/hexagon2.jpg'
import logo from "../../images/logo.png";

class Breadcrumbs extends Component {

    render() {
        return (
            <div className="banner">
                <img style={{ width: "100vw",height:"250px" }} src={hexagon} alt="header img" />
                <div className="banner_overlay">
                    <div className="banner_text">
                        <h2 className="hide-on-small-only" style={{fontFamily: "cursive"}}>{this.props.title}</h2>
                        <h5>{this.props.description}</h5>
                    </div>
                </div>
            </div>

        );
    }
}
Breadcrumbs.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Breadcrumbs);