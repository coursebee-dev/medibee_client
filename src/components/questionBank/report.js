import React,{Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Breadcrumbs from "../layout/Breadcrumbs";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Report extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }


    componentDidMount() {
        this.fetchCourse();
    }

    fetchCourse = async () => {
        try{
            const {data} = await axios.get(`/api/admin/questionBank/course`)
            this.setState({
                courses: data
            })
        }
        catch (error) {
            console.log(error)
        }
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
                <div className="container">
                    <div className="row">
                        Report added for All question
                        {
                            this.state.courses.map((course,key) => (
                                    <div key={key}>
                                        <Link
                                            to={`/questions/subjects/${course._id}`}
                                            style={{ width: "100%", fontWeight: "500" }}
                                        >
                                            <div className="row option black-text">
                                                <div className="col s10">{course.name}</div>
                                                <div className="col s2"><span className="badge red white-text">{course.subjects.length}</span></div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
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