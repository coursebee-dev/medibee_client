import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logoutUser from "../../actions/logoutAction";
import MyLiveClass from "./MyLiveClass";
import Breadcrumbs from "../layout/Breadcrumbs";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Breadcrumbs title={user.name.split(" ")[0]} description="Dashboard" />
        <div>
          <div className="row">
            <div className="col s12 center-align ">
              <h4>
                {/*<p className="flow-text grey-text text-darken-1">*/}
                {/*  Thank you for signing in to Medibee. We are continuously working to make this a better platform.*/}
                {/*  <br /><br />If you want to join our team send us a message in our{" "}*/}
                {/*  <a href="https://www.facebook.com//medibee.com.bd" target="_blank" rel="noopener noreferrer">facebook page</a>.*/}
                {/*</p>*/}
              </h4>
              <Link
                to="/liveclass"
                className="btn-flat waves-effect red darken-1 white-text"
              >
                View All Live Classes
                <i className="material-icons left">arrow_forward</i>
              </Link>
              <div className="container">
                <MyLiveClass
                  history={this.props.history}
                  studentId={this.props.auth.user.id}
                />
              </div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue darken-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
