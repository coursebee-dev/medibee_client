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
        {/*user registration*/}
        <div className="center-align" style={{ background: "#efefef", padding: "25px 0" }}>
          <div className="container">
            <h4> Dear Students, Greetings from<b> <span className="medi">MEDI</span><span className="bee">BEE</span></b> </h4>
            <p>Medibee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.</p>
            <p>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।</p>
            <p className="flow-text grey-text">
              We are just starting our journey to develop the best platform for you.<br />
                  To be one of the first students in Medibee
                </p>
            <h4>Register Now</h4>
            <div style={{ justifyContent: "space-evenly" }} className="row">
              <div className="col s6 m6">
                <Link to="/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable red darken-1  black-text">
                  Register
                    </Link>
              </div>
              <div className="col s6 m6">
                <Link to="/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable blue darken-1">
                  Log In
                    </Link>
              </div>
            </div>
          </div>
        </div>
        {/*user registration end*/}
        <div>
          <div className="center-align container">
            <h3> <b className=" red-text text-darken-1" style={{ wordSpacing: "10px" }}>ABOUT <span className="medi">MEDI</span><span className="bee">BEE</span></b> </h3>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <div className="row">
                <div className="col s12 m6">
                  <div style={{ textAlign: "justify" }}>
                  <blockquote>
                    <p>মেডিবি দেশের অন্যতম সেরা অনলাইনভিত্তিক মেডিক্যাল শিক্ষামূলক প্ল্যাটফর্ম যা আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের জন্য দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                    <p>ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                    <p>আমাদের মূল উদ্দেশ্য হল দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান শিক্ষক,  সরকারী এবং বেসরকারী সংস্থায় কর্মরত সফল ডাক্তারদের সাথে মেডিক্যাল কলেজ পড়ুয়া শিক্ষার্থীদের সাথে একটি নিরবিচ্ছিন্ন সম্পর্ক প্রতিষ্ঠা করা।</p>
                    <p>আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের বিষয়গুলো মাথায় রেখে একাডেমিক লেকচার, ভিডিও লেকচার, টিউটোরিয়াল এমনভাবে প্রস্তুত করা যাতে করে দেশের প্রতিটি মেডিক্যাল শিক্ষার্থী দেশের প্রতিটি কোণ থেকে সহজেই এই কোর্সগুলোর আওতাভুক্ত হতে পারে।</p>
                    <p>এছাড়াও আমরা অনলাইন ক্লিনিক্যাল ওয়ার্শপ, দক্ষতামূলক প্রশিক্ষণ, স্বাস্থ্য সচেতনতা ক্যাম্প, ক্যারিয়ার সেমিনারের মত নানা শিক্ষার্থী সহায়ক প্রোগ্রাম করে থাকি।</p>
                    <p>পৃথিবীর নানা সমসাময়িক মেডিক্যাল সাইন্স ভিত্তিক আলোচনা অনলাইন সেশনের মাধ্যমে প্রচার করে থাকি যাতে করে মেডিক্যাল শিক্ষার্থীগন আরোও উন্নতভাবে তাদের সেবা কার্যক্রম বজায় রাখতে পারে। মেডিক্যাল কেন্দ্রীয় সকল জ্ঞানচর্চা দেশের প্রতিটি শিক্ষার্থীদের মাঝে পৌছে দিতে আমরা বদ্ধপরিকর।</p>
                  </blockquote>
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
            <p className="grey-text text-darken-1">Already have an account? <Link className="red-text text-darken-1" to="/mentor/login">Log in</Link></p>
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
