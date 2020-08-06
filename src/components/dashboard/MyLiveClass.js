import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Helmet } from 'react-helmet'
import M from "materialize-css"
class MyLiveClass extends Component {
    constructor() {
        super();
        this.state = {
            myLiveClasses: [],
            loading: false,
            notify: ""
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/myliveclass/' + this.props.studentId)
            .then(res => {
                this.setState({ myLiveClasses: res.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.getLiveClasses()
    }
    onJoinClick = e => {
        let liveclassid = e.target.value
        console.log(this.props.studentId)
        axios.get(`/api/joinliveclass/${this.props.studentId}/${liveclassid}`)
            .then(res => {
                this.setState({ notify: res.data.message })
                if (res.data.success) {
                    this.props.history.push('/dashboard/liveclassroom/' + liveclassid)
                }
                else {
                    M.toast({ html: this.state.notify })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        const seo = {
            title: "Medibee : Live Classrom",
            description:
                "Interactive live classes are coming soon.",
            url: "https://medibee.com.bd/liveClassroom/",
            image: ""
        };
        const myLiveClasses = this.state.myLiveClasses.map(liveClass => (
            <div className="col s12 m12 card_shadow" key={liveClass._id}>
                <p className="secondary-content">
                    <button value={liveClass._id} onClick={this.onJoinClick} className="btn btn-small waves-effect waves-light hoverable red darken-1 white-text">Join Class</button>
                </p>
                <h4 className="center-align">{liveClass.topic}</h4>
                <div className="center-align" dangerouslySetInnerHTML={{ __html: liveClass.description }} />
                <div className="row">
                    <div className="col m4 s4">
                      <p>Start Time: {new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()} </p>
                    </div>
                    <div className="col m4 s4"><p>Duration : {liveClass.duration}</p></div>
                    <div className="col m4 s4"><p>Type: {liveClass.class_type}</p></div>

                </div>
                
            </div>
        ));
        return (
            <div>
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
                <h4 style={{ margin: "50px" }}>Registered Classes</h4>
                <div style={{ textAlign: "left" }} className="row">{myLiveClasses.reverse()}</div>
            </div>
        )
    }
}

MyLiveClass.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(MyLiveClass);
