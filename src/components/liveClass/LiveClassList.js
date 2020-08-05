import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'
import M from "materialize-css"
import courseBanner from "../../images/bannermedi.png";
import Breadcrumbs from "../layout/Breadcrumbs";

class LiveClassList extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            classid: "",
            classtype: "",
            loading: false,
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
        this.onRegisterClick = this.onRegisterClick.bind(this)
    }

    getLiveClasses = () => {
        this.setState({ loading: true })
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
            })
            .catch(err => {
                console.log(err)
            });
        this.setState({ loading: false })
    }

    onRegisterClick = async (e) => {
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
        this.getLiveClasses();
    }
    render() {
        const seo = {
            title: "Medibee : Live Classroom",
            description:
                "Interactive live classes are coming soon.",
            url: "https://medibee.com.bd/liveClassroom/",
            image: ""
        };
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <div className="col m4 s12" key={liveClass._id}>
                <div className="card custom-card">
                    <div className="card-image">
                        <img src={courseBanner} alt="course_banner" />
                    </div>
                    <div className="card-content">
                        <span className="card-title center-align">{liveClass.topic}</span>
                        <div className="row">
                            <div className="col m4 s4"><b>Start Time</b></div>  <div className="col s8 m8"><p>: {new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()}</p></div>
                            <div className="col s4 m4"><b>Duration</b></div>   <div className="col s8 m8"><p>: {Math.round(liveClass.duration / 60)} hour {liveClass.duration % 60} minutes</p></div>
                            <div className="col s4 m4"><b>Type</b></div>  <div className="col s8 m8">: {liveClass.class_type}</div>
                        </div>
                    </div>
                    <div className="card-action">
                        <div className="row">
                            <Link
                                to={`/liveclass/${liveClass._id}`}
                                style={{ width: "100%", fontWeight: "500" }}
                                className="btn-flat blue-grey white-text darken-3 custom_btn">
                                <span >View Details</span>
                            </Link>
                            {liveClass.class_type === "Paid" ?
                                <button
                                    value={liveClass._id}
                                    name={liveClass.class_type}
                                    onClick={this.onRegisterClick}
                                    style={{ width: "100%", marginTop: "20px", fontWeight: "500" }}
                                    className="btn-flat  cyan darken-2 white-text custom_btn">
                                    Register for ৳ {liveClass.price}  <del style={{ color: "black" }}>  ৳{liveClass.fake_price}</del>
                                </button>
                                : <button
                                    value={liveClass._id}
                                    name={liveClass.class_type}
                                    style={{ width: "100%", marginTop: "20px", fontWeight: "500" }}
                                    onClick={this.onRegisterClick}
                                    className="btn-flat  blue darken-4 white-text custom_btn">
                                    Register for free
                                </button>
                            }
                        </div>

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
                    {this.state.loading ? (
                        <div className="progress">
                            <div className="indeterminate blue"></div>
                        </div>
                    ) : (
                            <div className="row ">{liveClasses.reverse()}</div>
                        )}
                    <Link style={{ margin: "40px" }} to="/" className="btn-flat waves-effect blue darken-1 white-text">
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
