import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg";
import M from "materialize-css"
import logo from "../../images/logo.png";

class Landing extends Component {
  componentDidMount() {
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
            <h3> <b className=" red-text text-darken-1" style={{wordSpacing:"10px"}}>ABOUT <span style={{color:"black",textShadow: "2px 2px 3px #84101c"}}>MEDI</span><span style={{color:"#E71E24",textShadow: "2px 2px 3px #171717"}}>BEE</span></b> </h3>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <div className="row">
                <div className="col s12 m6">
                  <div style={{textAlign:"justify"}}>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে।
                    <br /><br />Medibee এমন একটি প্ল্যাটফর্ম যেখানে তারা প্রফেশনালদের কাছ থেকে পরামর্শ নিতে পারবে এবং তাদের অভিজ্ঞতা share করতে পারবে।
                    এখানে, গ্রুপের সদস্যরা তাদের ক্রিয়েটিভ চিন্তাভাবনা, প্রতিদিনের সমস্যাগুলি, ক্যারিয়ার পরামর্শ, নির্দেশিকা ইত্যাদি share করবে, যা অন্যান্য সদস্যদের সহায়তা করবে। বীজগণিত, ফ্লুইড মেকানিক্স,অ্যাকাউন্টিং, ফটোগ্রাফি, কোডিং, অর্থনীতি, সাহিত্য সহ সবকিছু এই প্ল্যাটফর্মের আওতায় আসবে।
                    এই গ্রুপে আমরা বিভিন্ন বিষয়ে লাইভ সেশন এবং ওয়েবিনারের ব্যবস্থা করব যেখানে শিক্ষার্থীরা পেশাদারদের এবং বিশেষজ্ঞদের সাথে লাইভ ইনটারেকশন করতে পারে। এই কমিউনিটির মাধ্যমে Medibee হবে বাংলাদেশের বৃহত্তম অনলাইন শিক্ষামূলক প্ল্যাটফর্মে।
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="valign-wrapper" style={{height:"287px"}}>
                    <div className="center-align" style={{width:"100%"}}>
                      <img style={{ width: "300px", height: "120px" }} src={logo} alt="MEDIBEE" />
                    </div>
                  </div>

                </div>

              </div>

            </div>
            <div>
              <h4>
                Dear Students, Greetings from<b> Medibee</b>
              </h4>
              <p>Medibee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.</p>

              <p>Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।</p>
              <p className="flow-text grey-text text-darken-1">
                We are just starting our journey to develop the best platform for you.<br />
                To be one of the first students in Medibee
              </p>
              <h4>Register Now</h4>
            </div>
            <div style={{ maxWidth: "600px", display: "flex", justifyContent: "space-evenly" }} className="container">
              <div>
                <Link to="/register" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable orange darken-1  black-text">
                  Register
              </Link>
              </div>
              <div>
                <Link to="/login" style={{ margin: "10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable teal darken-1">
                  Log In
              </Link>
              </div>
            </div>

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