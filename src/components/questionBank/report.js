import React,{Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Breadcrumbs from "../layout/Breadcrumbs";
import {connect} from "react-redux";

class Report extends Component {
    constructor() {
        super();
    }

    render() {
        const seo = {
            title: "Medibee : Question Bank Result",
            description:
                "Question Bank.",
            url: "https://medibee.com.bd/questionbank/result",
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
                <Breadcrumbs title="Question Bank Result" description="Develop your knowledge by solving question bank" />
                <div>Report added for All question</div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Report);