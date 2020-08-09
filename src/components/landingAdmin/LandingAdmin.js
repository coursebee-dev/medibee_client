import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg"
class LandingAdmin extends Component {
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
              Admins, Greetings from<b> MEDIBEE</b>
            </h4>
            <b>Join "Medibee" Team</b>
            <p>Medibee is medical education related Organization has been working relentlessly to improve the academic & co- curricular skills of medical students & doctors across the country and abroad.</p>
            <p>The core concept of the group is to connect the medical students to renowned teachers and professionals working in different medical colleges, hospitals, government and private organizations in Bangladesh and abroad. We try to develop academic lectures, video lectures, tutorials for all & easily accessible from every corner of the country. We also arrange clinical workshops, skill development programs health awareness campaign, career seminar & so on to help medical students & doctors to improve their skills & serve their patients in a better way. We also arrange live session on various contemporary issues. Medical knowledge dissemination in remote areas is a very essential task for us as a leading medical education organization.</p>
            <h4>
              Admin Login
            </h4>
            <br />
            <div style={{ maxWidth: "600px", display: "flex", justifyContent: "space-evenly" }} className="container">
              <div>
                <Link to="/admin/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable red darken-1  black-text">
                  Register
              </Link>
              </div>
              <div>
                <Link to="/admin/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable blue darken-1">
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
                <p>মেডিবি দেশের অন্যতম সেরা অনলাইনভিত্তিক মেডিক্যাল শিক্ষামূলক প্ল্যাটফর্ম যা আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের জন্য দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                <p>ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                <p>আমাদের মূল উদ্দেশ্য হল দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান শিক্ষক,  সরকারী এবং বেসরকারী সংস্থায় কর্মরত সফল ডাক্তারদের সাথে মেডিক্যাল কলেজ পড়ুয়া শিক্ষার্থীদের সাথে একটি নিরবিচ্ছিন্ন সম্পর্ক প্রতিষ্ঠা করা।</p>
                <p>আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের বিষয়গুলো মাথায় রেখে একাডেমিক লেকচার, ভিডিও লেকচার, টিউটোরিয়াল এমনভাবে প্রস্তুত করা যাতে করে দেশের প্রতিটি মেডিক্যাল শিক্ষার্থী দেশের প্রতিটি কোণ থেকে সহজেই এই কোর্সগুলোর আওতাভুক্ত হতে পারে।</p>
                <p>এছাড়াও আমরা অনলাইন ক্লিনিক্যাল ওয়ার্শপ, দক্ষতামূলক প্রশিক্ষণ, স্বাস্থ্য সচেতনতা ক্যাম্প, ক্যারিয়ার সেমিনারের মত নানা শিক্ষার্থী সহায়ক প্রোগ্রাম করে থাকি।</p>
                <p>পৃথিবীর নানা সমসাময়িক মেডিক্যাল সাইন্স ভিত্তিক আলোচনা অনলাইন সেশনের মাধ্যমে প্রচার করে থাকি যাতে করে মেডিক্যাল শিক্ষার্থীগন আরোও উন্নতভাবে তাদের সেবা কার্যক্রম বজায় রাখতে পারে। মেডিক্যাল কেন্দ্রীয় সকল জ্ঞানচর্চা দেশের প্রতিটি শিক্ষার্থীদের মাঝে পৌছে দিতে আমরা বদ্ধপরিকর।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LandingAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(LandingAdmin);