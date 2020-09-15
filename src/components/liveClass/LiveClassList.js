import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import M from "materialize-css"
import Breadcrumbs from "../layout/Breadcrumbs";
import EachClass from './EachClass'

class LiveClassList extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            classid: "",
            classtype: "",
            loading: true,
        };
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data, loading: false }, console.log(res.data))
            })
            .catch(err => {
                M.toast({ html: err.message })
            });
    };

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
            <EachClass key={liveClass._id} liveClass={liveClass} />
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
