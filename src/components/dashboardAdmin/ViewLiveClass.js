import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EachLiveCLass from "./EachLiveCLass";
import M from "materialize-css";
export default class ViewLiveClass extends Component {
  constructor() {
    super();
    this.state = {
      liveClasses: [],
      price: "",
      fakeprice: "",
      view: false,
    };
    this.onChange = this.onChange.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.viewClasses = this.viewClasses.bind(this);
  }

  onChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  async setPrice(e) {
    e.preventDefault();
    try {
      let id = e.target.value;
      const { data } = await axios.post(`/api/admin/setprice/${id}`, {
        price: this.state.price,
        fake_price: this.state.fakeprice,
      });
      M.toast({ html: data.message });
    } catch (error) {
      console.log(error);
    }
  }

  viewClasses(e) {
    e.preventDefault();
    this.setState((previousState) => ({
      view: !previousState.view,
    }));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/api/admin/allliveclass")
      .then((res) => {
        this.setState({ liveClasses: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onApproveClick = (liveId) => async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/admin/approvelive/${liveId}`);
      if (data.message === "success") {
        this.setState((state) => {
          state.liveClasses.find((live) => live._id === liveId).approved = true;
          return state;
        });
      } else {
        throw Error({ message: "failed" });
      }
    } catch (error) {
      throw Error({ message: "failed" });
    }
  };
  render() {
    const liveClasses = this.state.liveClasses.map((liveClass) => (
      <EachLiveCLass
        liveClass={liveClass}
        setPrice={(e) => this.setPrice(e)}
        onChange={(e) => this.onChange(e)}
        onApproveClick={(lid) => this.onApproveClick(lid)}
        key={liveClass._id}
      />
    ));
    return (
      <div style={{ width: "100%", margin: "50px" }}>
        <Link
          to="/admin/dashboard"
          className="btn-flat waves-effect red "
          style={{ margin: "10px" }}
        >
          <i className="material-icons left">keyboard_backspace</i>Go Back
        </Link>
        <Link
          to="/admin/createmodule"
          className="btn-flat waves-effect red "
          style={{ margin: "10px" }}
        >
          Create a module
        </Link>

        <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
        <ul
          style={{ textAlign: "left", margin: "30px" }}
          className="collection"
        >
          {liveClasses.reverse()}
        </ul>
        <Link to="/admin/dashboard" className="btn-flat waves-effect red">
          <i className="material-icons left">keyboard_backspace</i>Go Back
        </Link>
      </div>
    );
  }
}
