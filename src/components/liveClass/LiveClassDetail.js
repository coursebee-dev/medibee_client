import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Helmet } from 'react-helmet'
import "../../App.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

class LiveClassDetail extends Component {
  constructor() {
    super();
    this.state = {
      liveClasses: {},
      mentor: {},
      show: true,
      loading: false,
    };
    this.getMentor = this.getMentor.bind(this);
    this.getLiveClass = this.getLiveClass.bind(this);
  }

  getMentor = async (mentorid) => {
    try {
      const { data } = await axios.get(`/api/mentor/mentorinfo/${mentorid}`);
      this.setState({ mentor: data });
    } catch (error) {
      M.toast({ html: error.message });
    }
  };

  getLiveClass = async () => {
    this.setState({ loading: true });
    try {
      const { data } = await axios.get(
        `/api/liveclassdetails/${this.props.match.params.id}`
      );
      this.setState({ liveClasses: data });
      this.getMentor(data.mentorId);
    } catch (error) {
      M.toast({ html: error.message });
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    if (
      this.state.liveClasses?.participants?.some(
        (lc) => lc.studentId === this.props.auth.user.id
      )
    ) {
      this.setState({ show: false });
    }
    this.getLiveClass();
  }

  render() {
    return (
      <>
        <Breadcrumbs
          title="Class Details"
          description="All live courses that are currently running "
        />
        <div className="container">
          <div className="section">
            <div className="row">
              {this.state.loading ? (
                <div className="progress">
                  <div className="indeterminate blue"></div>
                </div>
              ) : (
                <>
                  <div className="col m9">
                    <h1>{this.state.liveClasses.topic}</h1>
                    <blockquote>
                      {this.state.liveClasses.classtimes?.map((classes, id) => (
                        <div key={id}>
                          <h6>Class no. : {id + 1}</h6>
                          <p>
                            Start Time:{" "}
                            {new Date(classes.classtimestring).toLocaleString()}{" "}
                          </p>
                          <p>Duration : {this.state.liveClasses.duration}</p>
                        </div>
                      ))}
                    </blockquote>
                    <p>
                      <b>Type:</b> {this.state.liveClasses.class_type}
                    </p>
                    <p>
                      <b>Academic Excellence : </b>
                      {this.state.liveClasses.academicExcellence}
                    </p>
                    <div>
                      <b className="left">Level of participation: </b>
                      <br />
                      <div style={{ display: "flex" }}>
                        {this.state.liveClasses.selectedliveclasslevel?.map(
                          (slc, id) => (
                            <div style={{ padding: "10px" }} key={id}>
                              {slc}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <br />
                    <div>
                      <b className="left">Eligiblity for: </b>
                      <br />
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {this.state.liveClasses.selectedsubject?.map(
                          (ss, id) => (
                            <div style={{ padding: "10px" }} key={id}>
                              {ss}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <br />
                    <div>
                      <b className="left">This Live class falls under: </b>
                      <br />
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {this.state.liveClasses.selectedsubcategories?.map(
                          (ssc, id) => (
                            <div style={{ padding: "10px" }} key={id}>
                              {ssc}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <br />
                    <h4>
                      <b>Description:</b>
                    </h4>
                    <div
                      style={{ background: "#f1f1f1", padding: "20px" }}
                      dangerouslySetInnerHTML={{
                        __html: this.state.liveClasses.description,
                      }}
                    />
                  </div>
                  <div className="col m3" style={{ marginTop: "100px" }}>
                    <div className="card vertical">
                      <div className="card-image">
                        <img
                          className=" mentors"
                          alt="mentor"
                          src={this.state.mentor.propic}
                        />
                      </div>
                      <div className="card-content">
                        Mentor:
                        <span className="card-title">
                          {this.state.mentor.name}
                        </span>
                        <p>{this.state.mentor.medicalcollege}</p>
                        <p>{this.state.mentor.position}</p>
                      </div>
                    </div>
                    {this.state.show ? (
                      <Link
                        to={`/liveclass/confirm/${this.state.liveClasses._id}`}
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          fontWeight: "500",
                        }}
                        className="btn-flat  blue darken-4 white-text custom_btn"
                      >
                        {this.state.liveClasses.class_type === "Paid" ? (
                          <>
                            Register for ৳ {this.stateliveClasses?.price}{" "}
                            <del style={{ color: "black" }}>
                              {" "}
                              ৳{this.state.liveClasses.fake_price}
                            </del>
                          </>
                        ) : (
                          <>Register for free</>
                        )}
                      </Link>
                    ) : (
                      <p>Already Registered</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <Link
              style={{ margin: "40px" }}
              to="/liveClass"
              className="btn-flat waves-effect blue darken-1 white-text"
            >
              <i className="material-icons left">keyboard_backspace</i>Go Back
            </Link>
          </div>
        </div>
      </>
    );
  }
}
LiveClassDetail.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LiveClassDetail);
