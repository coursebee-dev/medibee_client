import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg";
import logo from "../../images/logo.png";

class Landing extends Component {
  componentDidMount() {
    window.scrollTo = (x, y) => {
      document.documentElement.scrollTop = y;
    }
    window.scrollTo(0, 0)
    // If logged in and user navigates to Landing page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.type === "student") {
        this.props.history.push("/dashboard");
      } else if (this.props.auth.user.type === "mentor") {
        this.props.history.push("mentor/dashboard");
      }
      else if (this.props.auth.user.type === "admin") {
        this.props.history.push("admin/dashboard");
      }
    }
  }
  render() {
    return (
      <div>
        <HeaderImg />
        <div>
          <div className="center-align container">
            <h3> <b className=" red-text text-darken-1" style={{ wordSpacing: "10px" }}>ABOUT <span className="medi">MEDI</span><span className="bee">BEE</span></b> </h3>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <div className="row">
                <div className="col s12 m6">
                  <div style={{ textAlign: "justify" }}>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে।
                    <br /><br />Medibee এমন একটি প্ল্যাটফর্ম যেখানে তারা প্রফেশনালদের কাছ থেকে পরামর্শ নিতে পারবে এবং তাদের অভিজ্ঞতা share করতে পারবে।
                    এখানে, গ্রুপের সদস্যরা তাদের ক্রিয়েটিভ চিন্তাভাবনা, প্রতিদিনের সমস্যাগুলি, ক্যারিয়ার পরামর্শ, নির্দেশিকা ইত্যাদি share করবে, যা অন্যান্য সদস্যদের সহায়তা করবে। বীজগণিত, ফ্লুইড মেকানিক্স,অ্যাকাউন্টিং, ফটোগ্রাফি, কোডিং, অর্থনীতি, সাহিত্য সহ সবকিছু এই প্ল্যাটফর্মের আওতায় আসবে।
                    এই গ্রুপে আমরা বিভিন্ন বিষয়ে লাইভ সেশন এবং ওয়েবিনারের ব্যবস্থা করব যেখানে শিক্ষার্থীরা পেশাদারদের এবং বিশেষজ্ঞদের সাথে লাইভ ইনটারেকশন করতে পারে। এই কমিউনিটির মাধ্যমে Medibee হবে বাংলাদেশের বৃহত্তম অনলাইন শিক্ষামূলক প্ল্যাটফর্মে।
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="valign-wrapper" style={{ height: "287px" }}>
                    <div className="center-align" style={{ width: "100%" }}>
                      <img style={{ height: "120px" }} src={logo} alt="MEDIBEE" />
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          {/*user registration*/}
          <div className="center-align" style={{ background: "#efefef", padding: "25px 0" }}>
            <div className="container">
              <h4> Dear Students, Greetings from<b> <span className="medi">MEDI</span><span className="bee">BEE</span></b> </h4>
              <p>Medibee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.</p>
              <p>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।</p>
              <p className="flow-text grey-text text-darken-1">
                We are just starting our journey to develop the best platform for you.<br />
                  To be one of the first students in Medibee
                </p>
              <h4>Register Now</h4>
              <div style={{ justifyContent: "space-evenly" }} className="row">
                <div className="col s6 m6">
                  <Link to="/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable orange darken-1  black-text">
                    Register
                    </Link>
                </div>
                <div className="col s6 m6">
                  <Link to="/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable teal darken-1">
                    Log In
                    </Link>
                </div>
              </div>
            </div>
          </div>
          {/*user registration end*/}
          {/*greetings*/}
          {/*<div className="container" style={{ padding: "25px 0" }}>*/}
          {/*  <h3 className="center-align" > <b className=" red-text text-darken-1" style={{ wordSpacing: "10px" }}>Greetings From Doctors</b> </h3>*/}

          {/*  <div className="row">*/}
          {/*    <div className="col s12 m7">*/}
          {/*      <div className="card">*/}
          {/*        <div className="card-image center-align">*/}
          {/*          <img src={logo} alt="MEDIBEE" style={{ width: "100px", height: "100px" }} />*/}
          {/*          /!*<span className="card-title">Card Title</span>*!/*/}
          {/*        </div>*/}
          {/*        <div className="card-content">*/}
          {/*          <p>I am a very simple card. I am good at containing small bits of information.*/}
          {/*            I am convenient because I require little markup to use effectively.</p>*/}
          {/*        </div>*/}
          {/*        <div className="card-action">*/}
          {/*          <a href="#">This is a link</a>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*greetings end*/}
          {/*signup mentors*/}
          <div className="container" style={{ padding: "25px 0" }}>
            <h2>Share your knowledge as a Mentor <Link to="/mentor/register" className="mentor_signup">Signup</Link></h2>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(Landing);