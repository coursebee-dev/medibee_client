import React,{Component} from 'react';
import M from "materialize-css";
import axios from "axios";


class QuesBankQuestions extends Component{

    constructor() {
        super();
        this.state = {
            subject: "",
            category: "",
            categories: [],
            question: "",
            showOption: false,
            option: "",
            correct: "",
            answers: []
        };

        this.GetCategories = this.GetCategories.bind(this);
        this.AddQuestion = this.AddQuestion.bind(this);
    }

    componentDidMount() {
        M.Modal.init(this.Modal2);
        M.FormSelect.init(this.Select)
        // this.GetCategories()
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async GetCategories() {
        try {
            const { data } = await axios.get("/api/admin/questionBank/category");
            console.log("data",data);
            this.setState({ categories: data })
        } catch (error) {
            console.log(error)
        }
    }

    AddQuestion = async e => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admin/questionBank/question/add", {
                name: this.state.category
            });
            M.toast({ html: data.message });
            this.GetCategories()
        } catch (error) {
            console.log(error)
        }
    };

    AddOption = async () => {
        const newAnswer = {option: this.state.option, correct: this.state.correct};
        this.setState({answers: [...this.state.answers,newAnswer],showOption: false})
        console.log("add option",this.state.answers)
    }

    render() {
        console.log(this.state.correct,this.state.option, this.state.answers)
        return (
            <>
                <div className="section">
                    <div style={{ minWidth: "300px" }} className="card">
                        <div className="card-content">
                            <div className="row">
                                <span className="col card-title">Questions</span>
                                <a className="btn secondary-content btn-small red modal-trigger" href="#categorymodal">Add</a>
                                <div ref={Modal2 => {
                                    this.Modal2 = Modal2;
                                }} id="categorymodal" className="modal">
                                    <button className="secondary-content white btn-floating"><i className="secondary-content material-icons red-text modal-close">close</i></button>
                                    <div className="modal-content">
                                        <h4>Add a Question</h4>
                                        <div className="section">

                                                <div className="row">
                                                    <form className="col s12">

                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <input id="question" type="text" className="validate"/>
                                                                <label htmlFor="question">Question</label>
                                                            </div>
                                                        </div>

                                                        <ul className="collection">
                                                            {this.state.answers.map((answer,key) =>
                                                                (
                                                                    <li key={key} className="collection-item">
                                                                        <div className="row">
                                                                            <div className="col s10"><span>{answer.option}</span></div>
                                                                            <div className="col s2">
                                                                                <span className={answer.correct === 'true' ? 'green white-text' : 'red white-text'}>{answer.correct}</span>
                                                                                <span style={{ cursor: "pointer" }} className="secondary-content material-icons red-text">close</span>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>


                                                        <div className="row">
                                                            <div className="col m12">
                                                                <span className="btn" onClick={()=>{this.setState({showOption: true})}}>Add Option</span>
                                                            </div>
                                                        </div>
                                                        {this.state.showOption ?
                                                            <div className="row collection">
                                                                <div className="input-field col s12">
                                                                    <input id="option" type="text" className="validate" name="option" onChange={this.handleChange}/>
                                                                    <label htmlFor="option">Option</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <span>
                                                                        <label>
                                                                            <input name="correct" type="radio" value="true" onChange={this.handleChange} />
                                                                            <span>True</span>
                                                                        </label>
                                                                    </span>
                                                                    <span>
                                                                        <label>
                                                                            <input name="correct" type="radio" value="false" onChange={this.handleChange} />
                                                                            <span>False</span>
                                                                        </label>
                                                                    </span>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <span className="btn" onClick={this.AddOption}>submit</span>
                                                                </div>
                                                            </div>
                                                            : ''
                                                        }

                                                        <div className="row">
                                                            <div className="input-field col s6">
                                                                <input id="question_type" type="text" className="validate"/>
                                                                    <label htmlFor="question_type">Question Type (text/photo)</label>
                                                            </div>
                                                            <div className="input-field col s6">
                                                                <input id="ansSelectionType" type="text" className="validate"/>
                                                                <label htmlFor="ansSelectionType">Answer Selection Type (single/multiple)</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <input id="answer" type="text" className="validate"/>
                                                                    <label htmlFor="answer">Answer</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <input id="correctAnswer" type="text"  className="validate"/>
                                                                    <label htmlFor="correctAnswer">Correct Answer</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <input id="explanation" type="text" className="validate"/>
                                                                    <label htmlFor="explanation">Explanation</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            {/*<div className="input-field col s12">*/}
                                                            {/*    <input id="category_name" onChange={e => this.setState({ category: e.target.value })} type="text" className="validate" />*/}
                                                            {/*    <label className="active" htmlFor="category_name">Category Name</label>*/}
                                                            {/*</div>*/}
                                                            <div className="input-field col s12">
                                                                <button className="btn" onClick={this.AddQuestion} >Add Question</button>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="collection">
                                {this.state.categories.map(categories => (
                                    <li key={categories._id} className="collection-item">{categories.name}<span style={{ cursor: "pointer" }} className="secondary-content material-icons red-text">close</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default QuesBankQuestions;