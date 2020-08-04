import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'
import M from "materialize-css"
import { Link } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumbs";

export default class LiveClassDetail extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: {},
            mentor: {},
            loading: false,
        };
        this.getMentor = this.getMentor.bind(this)
        this.getLiveClass = this.getLiveClass.bind(this)
    }

    getMentor = async (mentorid) => {
        try {
            const { data } = await axios.get(`/api/mentor/mentorinfo/${mentorid}`)
            this.setState({ mentor: data })
        } catch (error) {
            console.log(error)
        }
    };

    getLiveClass = async () => {
        try {
            const { data } = await axios.get(`/api/liveclassdetails/${this.props.match.params.id}`)
            this.setState({ liveClasses: data })
            this.getMentor(data.mentorId)
        } catch (error) {
            console.log(error)
        }
    }

    onRegisterClick = (liveclasstype) => e => {
        const liveclassid = e.target.value;
        //const liveclasstype = e.target.liveclasstype
        //console.log(liveclassid)
        if (!this.props.auth.isAuthenticated || this.props.auth.user.type !== "student") {
            M.toast({ html: "Please login as a student" });
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
        this.getLiveClass()
    }

    render() {
        return (
            <>
                <Breadcrumbs title="Class Details" description="All live courses that are currently running " />
                <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col m9">
                            <h1>{this.state.liveClasses.topic}</h1>
                            <p><b>Start Time:</b> {new Date(this.state.liveClasses.start_time).toLocaleDateString() + " " + new Date(this.state.liveClasses.start_time).toLocaleTimeString()} </p>
                            <p><b>Duration :</b> {Math.round(this.state.liveClasses.duration / 60)} hour {this.state.liveClasses.duration % 60} minutes </p>
                            <p><b>Type:</b> {this.state.liveClasses.class_type}</p>
                            <h4><b>Description:</b></h4>
                            <div style={{background: "#f1f1f1", padding: "20px"}} dangerouslySetInnerHTML={{ __html: this.state.liveClasses.description }} />
                        </div>
                        <div className="col m3" style={{marginTop:"100px"}}>
                            <div className="card vertical">
                                <div className="card-image">
                                    <img className="responsive-img mentors" alt="mentor" src="https://lorempixel.com/400/400/nature/6" />
                                </div>
                                <div className="card-content">
                                    Mentor:
                                    <span className="card-title">{this.state.mentor.name}</span>
                                    <p>{this.state.mentor.organization}</p>
                                    <p>{this.state.mentor.position}</p>
                                </div>
                            </div>
                            {this.state.liveClasses.class_type === "Paid" ?
                                <button
                                    value={this.state.liveClasses._id}
                                    onClick={this.onRegisterClick(this.state.liveClasses.class_type)}
                                    className="btn-flat  cyan darken-2 white-text custom_btn">
                                    <span>Register for ৳ {this.state.liveClasses.price}</span>
                                </button>
                                : <button
                                    value={this.state.liveClasses._id}
                                    onClick={this.onRegisterClick(this.state.liveClasses.class_type)}
                                    className="btn-flat  cyan darken-2 white-text custom_btn">
                                    <span>Register for free</span>
                                </button>
                            }
                        </div>
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
