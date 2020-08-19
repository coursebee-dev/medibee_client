import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Helmet } from 'react-helmet'
import '../../App.css'
import M from "materialize-css"
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

class LiveClassDetail extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: {},
            mentor: {},
            loading: false,
        }
        this.getMentor = this.getMentor.bind(this)
        this.getLiveClass = this.getLiveClass.bind(this)
        this.onRegisterClick = this.onRegisterClick.bind(this)
    }

    getMentor = async (mentorid) => {
        try {
            const { data } = await axios.get(`/api/mentor/mentorinfo/${mentorid}`)
            this.setState({ mentor: data },
                console.log(data))
        } catch (error) {
            console.log(error)
        }
    }

    getLiveClass = async () => {
        this.setState({ loading: true })
        try {
            const { data } = await axios.get(`/api/liveclassdetails/${this.props.match.params.id}`)
            this.setState({ liveClasses: data },
                console.log(data))
            this.getMentor(data.mentorId)
        } catch (error) {
            console.log(error)
        }
        this.setState({ loading: false })
    }

    onRegisterClick = async e => {
        const { name, value } = e.target;

        if (!this.props.auth.isAuthenticated || this.props.auth.user.type !== "student") {
            M.toast({ html: "Please login as a student" })
            return;
        }
        if (name === "Free") {
            try {
                const { data } = await axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${value}`)
                M.toast({ html: data.message })
            } catch (error) {
                M.toast({ html: "Server Error" })
                console.log(error)
            }
        } else if (name === "Paid") {
            try {
                const { data } = await axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${value}`)
                if (data.status === 'success') {
                    window.open(data.data);
                } else {
                    M.toast({ html: "Server Error" })
                    console.log(data.message)
                }
            } catch (error) {
                M.toast({ html: "Server Error" })
                console.log(error)
            }

        }
    }

    componentDidMount() {
        this.getLiveClass()
    }

    render() {
        return (
            <>
                <Breadcrumbs title="Class Details" description="All live courses that are currently running " />
                <div className="container">
                    <div className="section">
                        <div className="row">
                            {this.state.loading ? (
                                <div className="progress">
                                    <div className="indeterminate blue"></div>
                                </div>
                            ) : (
                                    <>
                                        <div className="col m9">
                                            <h1>{this.state.liveClasses.topic}</h1>
                                            <blockquote>
                                                {this.state.liveClasses.classtimes?.map((classes, id) => (
                                                    <div key={id}>
                                                        <h6>Class no. : {id + 1}</h6>
                                                        <p>Start Time: {new Date(classes.date + "T" + classes.time).toLocaleString()} </p>
                                                        <p>Duration : {classes.duration}</p>
                                                    </div>
                                                ))}
                                            </blockquote>
                                            <p><b>Type:</b> {this.state.liveClasses.class_type}</p>
                                            <p><b>Academic Excellence : </b>{this.state.liveClasses.academicExcellence}</p>
                                            <div><b className="left">Level of participation: </b>
                                                <br />
                                                <div style={{ display: "flex" }}>
                                                    {this.state.liveClasses.selectedliveclasslevel?.map((slc, id) => (
                                                        <div style={{ padding: "10px" }} key={id}>{slc}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <br />
                                            <div><b className="left">Eligiblity for: </b>
                                                <br />
                                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                    {this.state.liveClasses.selectedsubject?.map((ss, id) => (
                                                        <div style={{ padding: "10px" }} key={id}>{ss}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <br />
                                            <div><b className="left">This Live class falls under: </b>
                                                <br />
                                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                    {this.state.liveClasses.selectedsubcategories?.map((ssc, id) => (
                                                        <div style={{ padding: "10px" }} key={id}>{ssc}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <br />
                                            <h4><b>Description:</b></h4>
                                            <div style={{ background: "#f1f1f1", padding: "20px" }} dangerouslySetInnerHTML={{ __html: this.state.liveClasses.description }} />
                                        </div>
                                        <div className="col m3" style={{ marginTop: "100px" }}>
                                            <div className="card vertical">
                                                <div className="card-image">
                                                    <img className=" mentors" alt="mentor" src={this.state.mentor.propic} />
                                                </div>
                                                <div className="card-content">
                                                    Mentor:
                                                <span className="card-title">{this.state.mentor.name}</span>
                                                    <p>{this.state.mentor.medicalcollege}</p>
                                                    <p>{this.state.mentor.position}</p>
                                                </div>
                                            </div>
                                            {this.state.liveClasses.class_type === "Paid" ?
                                                <button
                                                    value={this.state.liveClasses._id}
                                                    name={this.state.liveClasses.class_type}
                                                    onClick={this.onRegisterClick}
                                                    className="btn-flat  cyan darken-2 white-text custom_btn">
                                                    Register for ৳ {this.state.liveClasses.price} <s>{this.state.liveClasses.fake_price}</s>
                                                </button>
                                                : <button
                                                    value={this.state.liveClasses._id}
                                                    name={this.state.liveClasses.class_type}
                                                    onClick={this.onRegisterClick}
                                                    className="btn-flat  cyan darken-2 white-text custom_btn">
                                                    Register for free
                                                </button>
                                            }
                                        </div>
                                    </>
                                )}
                        </div>
                        <Link style={{ margin: "40px" }} to="/liveClass" className="btn-flat waves-effect blue darken-1 white-text">
                            <i className="material-icons left">keyboard_backspace</i>Go Back
                    </Link>
                    </div>
                </div>
            </>
        )
    }
}
LiveClassDetail.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassDetail);
