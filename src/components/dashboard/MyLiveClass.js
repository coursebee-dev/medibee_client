import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";
import M from "materialize-css";
class MyLiveClass extends Component {
  constructor() {
    super();
    this.state = {
      myLiveClasses: [],
      loading: false,
      notify: "",
    };
    this.getLiveClasses = this.getLiveClasses.bind(this);
  }

  getLiveClasses = () => {
    axios
      .get("/api/myliveclass/" + this.props.studentId)
      .then((res) => {
        this.setState({ myLiveClasses: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getLiveClasses();
  }
  onJoinClick = async (e) => {
    let liveclassid = e.target.value;
    try {
      const { data } = await axios.get(
        `/api/joinliveclass/${this.props.studentId}/${liveclassid}`
      );
      this.setState({ notify: data.message });
      if (data.success) {
        M.toast({ html: this.state.notify });
        window.open(data.joinurl, "_blank");
      } else {
        M.toast({ html: this.state.notify });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const seo = {
      title: "Medibee : Live Classrom",
      description: "Interactive live classes are coming soon.",
      url: "https://medibee.com.bd/liveClassroom/",
      image: "",
    };
    const myLiveClasses = this.state.myLiveClasses.map((liveClass) => (
      <div
        className="col s12 m12 z-depth-2"
        style={{ margin: "10px" }}
        key={liveClass._id}
      >
        <p className="secondary-content">
          <button
            value={liveClass._id}
            onClick={this.onJoinClick}
            className="btn btn-small waves-effect waves-light hoverable red darken-1 white-text"
          >
            Join Class
          </button>
        </p>
        <h4 className="center-align">{liveClass.topic}</h4>
        {/* <div className="center-align" dangerouslySetInnerHTML={{ __html: liveClass.description }} /> */}
        <div className="row center-align">
          <div className="col m4 s4">
            <p>
              <b>Start Time:</b>{" "}
              {new Date(liveClass.start_date).toLocaleString()}{" "}
            </p>
          </div>
          {/* <div className="col m4 s4"><p><b>Duration :</b> {liveClass.duration} min</p></div> */}
          <div className="col m4 s4">
            <p>
              <b>Type:</b> {liveClass.class_type}
            </p>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <Helmet
          title={seo.title}
          meta={[
            {
              name: "description",
              property: "og:description",
              content: seo.description,
            },
            { property: "og:title", content: seo.title },
            { property: "og:url", content: seo.url },
          ]}
        />
        <h4 style={{ margin: "50px" }}>Registered Classes</h4>
        <div style={{ textAlign: "left" }} className="row">
          {myLiveClasses.reverse()}
        </div>
      </div>
    );
  }
}

MyLiveClass.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyLiveClass);
