import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
import liveClass from '../../images/liveClass.jpg'
import onlineCourse from '../../images/onlineCourse.jpg'
import LiveClassMentor from './LiveClassMentor';
import Breadcrumbs from "../layout/Breadcrumbs";

class DashboardMentor extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };

  componentDidMount() {
    // const options = {
    //     inDuration: 250,
    //     outDuration: 250,
    //     opacity: 0.5,
    //     dismissible: false,
    //     startingTop: "4%",
    //     endingTop: "10%"
    // };
  }

  render() {
    const { user } = this.props.auth; return (
      <div>
        <div>
          <Breadcrumbs title={user.name.split(" ")[0]} description="Your Dashboard" />
          <div className="row" style={{marginTop:"10px"}}>
            <div className="col s12">
              <div className="row center-align">
                <button onClick={() => window.location.replace('/mentor/account')} className="btn modal-trigger center-align">View your Account Information</button>
              </div>

              {this.props.auth.user.adminVerify === false ?
                <h5 className="red-text">Your information is under review. We will active your account within short time.
                <br />To schedule live classes or submit online courses please send us an email</h5>
                :
                  <>
                    <div className="row center-align">
                      <div className="col m6 s12">
                        <Link to="/mentor/dashboard/scheduleclass" style={{ margin: "5%", padding: '0', width: "400px", height: "auto" }} className="btn btn-large waves-effect waves-light hoverable white black-text">
                          <div style={{ height: "80%" }}><img style={{ width: "100%",height: "300px" }} src={liveClass} alt="live class" /></div>
                          <div className="purple accent-1 white-text">Schedule A Live Class Now</div>
                        </Link>
                      </div>

                      <div className="col s12 m6">
                        <Link to="#" style={{ margin: "5%", padding: '0', width: "400px", height: "auto" }} className="btn btn-large waves-effect waves-light hoverable white black-text">
                          <div style={{ height: "80%" }}><img style={{ width: "100%",height: "300px" }} src={onlineCourse} alt="online course" /></div>
                          <div className="purple accent-1 white-text">Drop An Online Course Now</div>
                        </Link>
                      </div>
                    </div>
                  </>

              }
              <LiveClassMentor mentorId={this.props.auth.user.id} />
              <div className="row center-align">
                <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
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
      </div>
    );
  }
}

DashboardMentor.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardMentor);