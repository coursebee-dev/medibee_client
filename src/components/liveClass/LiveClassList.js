import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'
import M from "materialize-css"
import HeaderImg from "../layout/HeaderImg";
import courseBanner from "../../images/bannermedi.png";
import Breadcrumbs from "../layout/Breadcrumbs";

class LiveClassList extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            loading: false,
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    seeDetails(e) {
        window.location.replace(`/liveclass/${e.target.value}`)
    }

    onRegisterClick = (liveclasstype) => e => {
        const liveclassid = e.target.value
        //const liveclasstype = e.target.liveclasstype
        //console.log(liveclassid)
        if (!this.props.auth.isAuthenticated || this.props.auth.user.type !== "student") {
            M.toast({ html: "Please login as a student" })
            return
        }

        if (liveclasstype === "Free") {
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
                .then(res => {
                    M.toast({ html: res.data.message })
                })
                .catch(err => {
                    M.toast({ html: "Server Error" })
                    console.log(err)
                });
        } else if (liveclasstype === "Paid") {
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
                .then(res => {
                    if (res.data.status === 'success') {
                        window.open(res.data.data);
                    } else {
                        M.toast({ html: "Server Error" })
                        console.log(res.data.message)
                    }

                })
                .catch(err => {
                    M.toast({ html: "Server Error" })
                    console.log(err)
                });
        }
    }
    componentDidMount() {
        this.getLiveClasses();
    }
    render() {
        const seo = {
            title: "Medibee : Live Classrom",
            description:
                "Interactive live classes are coming soon.",
            url: "https://medibee.com/liveClassroom/",
            image: ""
        };
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <div className="col m4 s6" key={liveClass._id}>
                <div className="card ">
                    <div className="card-image">
                        <img src={courseBanner} alt="course_banner"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title center-align">{liveClass.topic}</span>
                        <p><b>Start Time:</b> {new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()} </p>
                        <p><b>Duration :</b> {Math.round(liveClass.duration / 60)} hour {liveClass.duration % 60} minutes</p>
                        <p><b>Type:</b> {liveClass.class_type}</p>
                    </div>
                    <div className="card-action blue-grey darken-1">
                        <button
                            value={liveClass._id}
                            onClick={this.seeDetails}
                            className="btn-flat waves-effect red darken-4 white-text">
                            <i className="material-icons right">visibility</i>View Details
                        </button>
                        <span className="secondary-content">
                            {liveClass.class_type === "Paid" ?
                                <button
                                    value={liveClass._id}
                                    onClick={this.onRegisterClick(liveClass.class_type)}
                                    className="btn-flat waves-effect red darken-4 white-text">
                                    Register for ৳ {liveClass.price}
                                </button>
                                : <button
                                    value={liveClass._id}
                                    onClick={this.onRegisterClick(liveClass.class_type)}
                                    className="btn-flat waves-effect red darken-4 white-text">
                                    Register for free
                                </button>
                            }
                        </span>
                    </div>
                </div>

            </div>
        ));
        return (
            <>
                <Breadcrumbs title="Live Classroom" description="All live courses that are currently running " />
                <div className="container" >
                <Helmet
                    title={seo.title}
                    meta={[
                        {
                            name: "description",
                            property: "og:description",
                            content: seo.description
                        },
                        { property: "og:title", content: seo.title },
                        { property: "og:url", content: seo.url },
                    ]}
                />
                <h4 className="center-align" style={{ margin: "50px" }}>Scheduled Classes</h4>
                <div className="row ">{liveClasses.reverse()}</div>
                <Link style={{ margin: "40px" }} to="/" className="btn-flat waves-effect teal darken-1 white-text">
                    <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
            </>
        )
    }
}

LiveClassList.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassList);
