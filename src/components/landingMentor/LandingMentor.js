import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg"
class LandingMentor extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    // If logged in and user navigates to Register page, should redirect them to dashboard
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
            <h4>
              Mentors, Greetings from<b> Medibee</b>
            </h4>
            <div>Medibee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.</div>
            <br />
            <div>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।</div>
            <p className="flow-text grey-text text-darken-1">
              We are just starting our journey to develop the best platform for you.<br />
              To be one of the first mentors in MEDIBEE<br />
            </p>
            <h4>Register Now</h4>
            <br />
            <div style={{ maxWidth: "600px", display: "flex", justifyContent: "space-evenly" }} className="container">
              <div>
                <Link to="/mentor/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable blue darken-1  black-text">
                  Register
              </Link>
              </div>
              <div>
                <Link to="/mentor/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable red darken-1">
                  Log In
              </Link>
              </div>
            </div>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <br />
              <h4>
                About Us
              </h4>
              <div>
                MediBee (A medical concern of Coursebee.com) is education platform where we disseminate contemporary medical knowledge through live classroom , training and video based courses.
                <br /><br />
                Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে।
                <br />
                মেডিক্যালের সব বিষয়ের উপর  বাংলায় সহজবোধ্য করে  লেকচার তৈরি হবে। লেকচারগুলো হবে সাবজেক্ট ভিত্তিক, টপিক ভিত্তিক এবং প্রফ ভিত্তিক। এছাড়াও ক্লিনিক্যাল ও এক্সাম প্রস্তুতিভিত্তিক লেকচার তো তৈরি হবেই।
                                আমরা বিরক্ত নিয়ে নয়, আনন্দের সাথে শিখবো আমাদের মতো করে।
                                <br /> <br />
                                আমাদের ক্লাস নিবেন শ্রদ্ধেয় সব সেরা সেরা স্যার। ক্লাস নিবেন ভালোবাসার বড় ভাইয়ারা। বিভিন্ন টপিকের উপর সুন্দর সহজবোধ্য ও গোছানো লেকচার সিরিজ থাকবে। আমাদের MediBee কোর্স লিংক থেকে সার্চ দিয়ে নিজের পছন্দমতো লেকচারে Enroll করা যাবে খুব সহজেই।
                                এরকম একটা স্বপ্ন নিয়ে যাত্রা শুরু করেছে MediBee. আপনিও যোগ দিতে পারেন আমাদের সাথে- টিম মেম্বার, ইন্সট্রাক্টর  কিংবা এম্বাসেডর হিসেবে। আপনার প্রতিভার আলো ছড়িয়ে দিন সবার মাঝে। আমরা এখানে সবাই একসাথে পড়বো-পড়াবো, শিখবো-শেখাবো। এভাবেই একদিন MediBee হয়ে উঠবে দেশের সবচেয়ে সেরা মেডিক্যাল ক্লাসরুম।
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LandingMentor.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(LandingMentor);