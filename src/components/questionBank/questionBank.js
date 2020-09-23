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
            questions: [],
            currentQuestion: 0
        }
    }

    componentDidMount() {
        this.fetchQuestions()
    }

    fetchQuestions = async () => {
        try {
            const { data } = await axios.get(`/api/admin/questionBank/question/${this.props.match.params.id}`)
            this.setState({
                questions: data
            });
        } catch (error) {
            console.log(error)
        }
    };

    NextQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
    }

    loadQuestions = () => {
        return (
            // <div>{this.state.questions.question}</div>
            <>
                {this.state.questions.length > 0 ? <Question question={this.state.questions[this.state.currentQuestion]} onNextQuestionClick = {this.NextQuestion} questionLenth={this.state.questions.length} currentQuestion={this.state.currentQuestion} /> : <h2>Loading</h2>}
            </>

        )
    };

    render() {
        console.log("currentQuestion",this.state.currentQuestion)
        console.log("Question",this.state.questions.length)
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