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

        };

        this.GetCategories = this.GetCategories.bind(this);
        this.AddCategory = this.AddCategory.bind(this);
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

    render() {
        return (
            <>
                <div className="section">
                    <div style={{ minWidth: "300px" }} className="card">
                        <div className="card-content">
                            <div className="row">
                                <span className="col card-title">Subject Categories</span>
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