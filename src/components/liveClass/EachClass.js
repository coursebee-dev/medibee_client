import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import courseBanner from "../../images/bannermedi.png";
import { Link } from "react-router-dom";

const EachClass = ({ liveClass, auth }) => {
    const [show, setShow] = useState(true)
    useEffect(() => {
        if (liveClass?.participants.some(lc => lc.studentId === auth.user.id)) {
            setShow(false)
        }
    }, [auth.user.id, liveClass.participants])
    return (
        <div className="col m4 s12">
            <div className="card custom-card">
                <div className="card-image">
                    <img src={courseBanner} alt="course_banner" />
                </div>
                <div className="card-content">
                    <span className="card-title center-align">{liveClass?.topic}</span>
                    <div className="row">
                        <div className="col"><b>Class tarts from:</b><p> {new Date(liveClass?.classtimes[0].date + "T" + liveClass?.classtimes[0].time).toLocaleString()}</p></div>
                        {/* <div className="col s4 m4"><b>Duration</b></div>   <div className="col s8 m8"><p>: {Math.round(liveClass.duration / 60)} hour {liveClass.duration % 60} minutes</p></div> */}
                        <div className="col s12"><b>Type</b>: {liveClass?.class_type}</div>
                        <div className="col">Number of classes: {liveClass?.classtimes.length}</div>
                    </div>
                </div>
                <div className="card-action">
                    <div className="row">
                        <Link
                            to={`/liveclass/${liveClass?._id}`}
                            style={{ width: "100%", fontWeight: "500" }}
                            className="btn-flat blue-grey white-text darken-3 custom_btn">
                            <span >View Details</span>
                        </Link>
                        {show ? (
                            <Link to={`/liveclass/confirm/${liveClass?._id}`}
                                style={{ width: "100%", marginTop: "20px", fontWeight: "500" }}
                                className="btn-flat  blue darken-4 white-text custom_btn">
                                {liveClass?.class_type === "Paid" ? (<>Register for ৳ {liveClass?.price}  <del style={{ color: "black" }}>  ৳{liveClass?.fake_price}</del></>) : (<>Register for free</>)}
                            </Link>
                        ) : (
                                <p>Already Registered</p>
                            )}
                    </div>

                </div>
            </div>
        </div>
    )
}
EachClass.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(EachClass);

