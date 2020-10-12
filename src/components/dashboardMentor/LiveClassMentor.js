import React, { Component } from "react";
import axios from "axios";
export default class LiveClassMentor extends Component {
  constructor() {
    super();
    this.state = {
      liveClasses: [],
    };
  }
  componentDidMount() {
    axios
      .get("/api/mentor/liveclass/" + this.props.mentorId)
      .then((res) => {
        this.setState({ liveClasses: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const liveClasses = this.state.liveClasses.map((liveClass) => (
      <div
        className="collection-item card_shadow"
        key={liveClass._id}
        style={{ padding: "30px", margin: "10px" }}
      >
        <p className="secondary-content">
          Approval Status :
          {liveClass.approved ? (
            <span> Approved</span>
          ) : (
            <span className="red-text"> Waiting Approval</span>
          )}
        </p>
        <h3 className="center-align">{liveClass.topic}</h3>
        {/* <div dangerouslySetInnerHTML={{ __html: liveClass.description }} /> */}
        <p>
          <b>Start Time:</b>{" "}
          {new Date(liveClass.classtimes[0].classtimestring).toLocaleString()}
        </p>
        {/* <p><b>Duration :</b> {liveClass.duration}</p> */}
        <p>
          <b>Type:</b> {liveClass.class_type}
        </p>
        {liveClass.approved ? (
          <button
            onClick={() => window.open(liveClass.zoomJoinLink, "_blank")}
            className="btn btn-small waves-effect waves-light hoverable red darken-1 black-text"
          >
            Start Class
          </button>
        ) : null}
      </div>
    ));
    return (
      <div className="container">
        <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
        <div className="row">{liveClasses.reverse()}</div>
      </div>
    );
  }
}
