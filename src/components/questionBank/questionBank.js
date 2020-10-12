import React,{Component} from 'react';
import axios from 'axios';
import Quiz from "react-quiz-component/lib/Quiz";
import Question from "./question";
import {Helmet} from "react-helmet";
import Breadcrumbs from "../layout/Breadcrumbs";
import {connect} from "react-redux";

class QuestionBank extends Component{
    constructor() {
        super();
        this.state = {
            questions: {}
        }
    }

    componentDidMount() {
        this.fetchQuestions()
    }

    fetchQuestions = async () => {
        try {
            const { data } = await axios.get(`/api/admin/questionBank/question`)
            this.setState({
                questions: data
            });
        } catch (error) {
            console.log(error)
        }
    };

    loadQuestions = () => {
        return (
            // <div>{this.state.questions.question}</div>
            <Question question={this.state.questions}/>
        )
    };

    render() {
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

                <div className="container">
                    { this.loadQuestions() }
                </div>

            </>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(QuestionBank);