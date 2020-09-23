import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import Result from "./result";

class Question extends Component{
    state = {
        answer : null,
        submit : false,
        category : []
    };

    componentDidMount = async () => {
        await axios.get(`/api/admin/questionBank/category`)
            .then(res => {
                this.setState({
                    category: res.data
                })
            })
    }

    changeSubmit = () => {
        this.setState({
            submit: false,
            answer : null,
        })
    }

    handleAnswer = (e) => {
        this.setState({
            answer : e.target.value
        });
    };

    onSubmit = () => {
        this.setState({
            submit : true
        })
    };

    loadQuestion = () =>{
        const {question} = this.props;
        if (Object.keys(question).length === 0 ){
            return (
                <div>Loading Question</div>
            )
        }else{
            return (
                <div>
                    <h4>{question.question}</h4>
                    {question.answers.map((answer,key) => {
                        return (
                            <div key={key} className="option">
                                    <label>
                                        <input type="radio" name="answer" value={key+1} onChange={this.handleAnswer}/>
                                        <span>{answer.option}</span>
                                    </label>
                            </div>
                        )
                    })}
                    {this.state.answer === null ?
                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit} disabled>Submit
                            <i className="material-icons right">send</i>
                        </button>
                        :
                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit} >Submit
                            <i className="material-icons right">send</i>
                        </button>
                    }

                </div>

            )
        }

    };

    render() {
        console.log(this.state.answer);
        if (this.state.submit === false) {
            return (
                <div>
                    <h1 className="center-align">Questions</h1>
                    {this.loadQuestion()}
                </div>
            )
        }else {
            return <Result question={this.props.question} changeSubmit={this.changeSubmit} answer={this.state.answer} {...this.props}/>
        }



    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(Question);
