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
            <b>Join "Medibee" Team</b>
            <p>Medibee is medical education related Organization has been working relentlessly to improve the academic & co- curricular skills of medical students & doctors across the country and abroad.</p>

            <p>The core concept of the group is to connect the medical students to renowned teachers and professionals working in different medical colleges, hospitals, government and private organizations in Bangladesh and abroad. We try to develop academic lectures, video lectures, tutorials for all & easily accessible from every corner of the country. We also arrange clinical workshops, skill development programs health awareness campaign, career seminar & so on to help medical students & doctors to improve their skills & serve their patients in a better way. We also arrange live session on various contemporary issues. Medical knowledge dissemination in remote areas is a very essential task for us as a leading medical education organization.</p>
            <h4>Register Now</h4>
            <br />
            <div style={{ maxWidth: "600px", display: "flex", justifyContent: "space-evenly" }} className="container">
              <div>
                <Link to="/mentor/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable red darken-1  black-text">
                  Register
              </Link>
              </div>
              <div>
                <Link to="/mentor/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable blue darken-1">
                  Log In
              </Link>
              </div>
            </div>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <br />
              <h4>
                About Us
              </h4>
              <div>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে।
                <br /><br />Medibee এমন একটি প্ল্যাটফর্ম যেখানে তারা প্রফেশনালদের কাছ থেকে পরামর্শ নিতে পারবে এবং তাদের অভিজ্ঞতা share করতে পারবে।
              এখানে, গ্রুপের সদস্যরা তাদের ক্রিয়েটিভ চিন্তাভাবনা, প্রতিদিনের সমস্যাগুলি, ক্যারিয়ার পরামর্শ, নির্দেশিকা ইত্যাদি share করবে, যা অন্যান্য সদস্যদের সহায়তা করবে। বীজগণিত, ফ্লুইড মেকানিক্স,অ্যাকাউন্টিং, ফটোগ্রাফি, কোডিং, অর্থনীতি, সাহিত্য সহ সবকিছু এই প্ল্যাটফর্মের আওতায় আসবে।
              এই গ্রুপে আমরা বিভিন্ন বিষয়ে লাইভ সেশন এবং ওয়েবিনারের ব্যবস্থা করব যেখানে শিক্ষার্থীরা পেশাদারদের এবং বিশেষজ্ঞদের সাথে লাইভ ইনটারেকশন করতে পারে। এই কমিউনিটির মাধ্যমে Medibee হবে বাংলাদেশের বৃহত্তম অনলাইন শিক্ষামূলক প্ল্যাটফর্মে।
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