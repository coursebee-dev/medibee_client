import React,{Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Breadcrumbs from "../layout/Breadcrumbs";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

class Courses extends Component{
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        console.log("user payload",this.props.auth.user)
        const seo = {
            title: "Medibee : Question Bank",
            description:
                "Question Bank.",
            url: "https://medibee.com.bd/questionbank/",
            image: ""
        };
        return (
            <>
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
                <Breadcrumbs title="Question Bank" description="Develop your knowledge by solving question bank" />

            </>
        )
    }

}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Courses);
