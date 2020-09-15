import React,{Component} from 'react'
import axios from 'axios';

class Result extends Component{
    loadQuestion = () =>{
        const {question} = this.props;
        const ans = parseInt(this.props.answer);
        if (Object.keys(question).length === 0 ){
            return (
                <div>Loading Answer</div>
            )
        }else{
            return (
                <div className="quiz">
                    {question.answers[ans-1].correct ? <p className="option green white-text">{question.messageForCorrectAnswer}</p> : <p className="option red white-text">{question.messageForIncorrectAnswer}</p>}
                    <h4>{question.question}</h4>
                    <div>
                        {question.answers.map((answer,key) => {
                            if ( ( (key+1) === ans && answer.correct === true ) || answer.correct === true ){
                                return (
                                    <div key={key} className="option correct">
                                        <label className="white-text">
                                            <input type="radio" name="answer" disabled/>
                                            <span>{answer.option} correct</span>
                                        </label>
                                    </div>
                                )
                            }
                            else if ((key+1) === ans && answer.correct === false){
                                return (
                                    <div key={key} className="option dim">
                                        <label className="white-text">
                                            <input type="radio" name="answer" disabled/>
                                            <span>{answer.option} wrong</span>
                                        </label>
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div key={key} className="option">
                                        <label>
                                            <input type="radio" name="answer" disabled/>
                                            <span>{answer.option}</span>
                                        </label>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <h5>Description</h5>
                    <p className="explanation">{question.explanation}</p>
                </div>
            )
        }
    };

    render() {
        return (
            <div>
                <h1 className="center-align">Result</h1>
                <div className="row">
                    <div className="col m8">
                        {this.loadQuestion()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Result