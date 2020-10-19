import React,{Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import Breadcrumbs from "../layout/Breadcrumbs";
import {Editor} from "@tinymce/tinymce-react";
import M from "materialize-css";

class QuestionBankEditQues extends Component{
    constructor() {
        super();
        this.state = {
            editedQues: undefined,
            question: "",
            course: undefined,
            subject: undefined,
            showOption: false,
            description: "",
            option: "",
            courses: [],
            answers: [],
        }
    }

    componentDidMount() {
        this.fetchQuestion();
        this.GetCourses()
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    AddOption = async () => {
        const newAnswer = {option: this.state.option, correct: this.state.correct};
        this.setState({answers: [...this.state.answers,newAnswer],showOption: false})
        console.log("add option",this.state.answers)
    }

    deleteAnswer = (itemNumber) => {
        console.log("delete element")
        this.state.answers.splice(itemNumber, 1);
        this.forceUpdate();
        console.log("after delete item",this.state.answers)
    }

    GetCourses = async() => {
        try {
            const { data } = await axios.get("/api/admin/questionBank/course");
            console.log("data",data);
            this.setState({ courses: data })
        } catch (error) {
            console.log(error)
        }
    }

    renderSubjects = () => {
        return this.state.courses.filter(course => course._id === this.state.course).map((course,key) => {
            return course.subjects.map((subject,key) => {
                return <option value={subject._id} key={key}>{subject.name}</option>
            })
        })
    }

    fetchQuestion = async () => {
        try {
            const { data } = await axios.get(`/api/admin/questionBank/question/edit/${this.props.match.params.questionId}`)
            this.setState({
                editedQues : data,
                question : data.question,
                answers : data.answers,
                course: data.course,
                description: data.explanation,
                subject: data.questionCategory._id
            })
        } catch (error) {
            console.log(error)
        }
    }

    UpdateQuestion = async (e) => {
        e.preventDefault();
        const { question,description,answers,subject,course } = this.state;
        try{
            const formData = {
                question: question,
                explanation : description,
                answers : answers,
                questionCategory : subject,
                course: course
            }
            const {data} = await  axios.post(`/api/admin/questionBank/question/update/${this.props.match.params.questionId}`,formData)
            M.toast({ html: data.message });
            this.props.history.push("/admin/dashboard/questionBank/dashboard");
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
        const {editedQues,question,description} = this.state;
        console.log("question title",this.state.description )
        return (
            <>
                <Breadcrumbs title="Question Bank" description="Edit question" />
                <div className="container">
                    {
                        editedQues ?
                            <div className="row">
                                <form className="col s12" onSubmit={this.UpdateQuestion}>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            {/*<input type="text" name="question" value={question} onChange={this.handleChange} placeholder="Question" />*/}
                                            <Editor
                                                apiKey={API_KEY}
                                                init={{

                                                    height: 250,
                                                    menubar: 'edit insert format table tools help',
                                                    plugins: [
                                                        ' autolink media lists link charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime table paste code wordcount'
                                                    ],
                                                    toolbar:
                                                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat  '
                                                }}
                                                initialValue={editedQues.question}
                                                onChange={(e) => { this.setState({question: e.target.getContent() }) }}
                                                // onEditorChange={desc => setFieldValue("description", desc)}
                                            />
                                        </div>
                                    </div>

                                    <ul className="collection">
                                        {this.state.answers.map((answer,key) =>
                                            (
                                                <li key={key} className="collection-item">
                                                    <div className="row">
                                                        <div className="col s10"><span>{answer.option}</span></div>
                                                        <div className="col s2">
                                                            {
                                                                answer.correct === true ?
                                                                    <span className='green white-text'>True</span>
                                                                    :
                                                                    <span className='red white-text'>False</span>
                                                            }
                                                            <span style={{ cursor: "pointer" }} onClick={() => this.deleteAnswer(key)} className="secondary-content material-icons red-text">close</span>
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
                                                        <input name="correct" type="radio" value="true" onChange={this.handleRadioButtons} />
                                                        <span>True</span>
                                                    </label>
                                                </span>
                                                <span>
                                                    <label>
                                                        <input name="correct" type="radio" value="false" onChange={this.handleRadioButtons} />
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
                                        <div className="col s6">
                                            <label htmlFor="course">Choose a Course:</label>

                                            <select id="course" name="course" value={this.state.course ? this.state.course : ''} style={{display: "block"}} onChange={this.handleChange} disabled>

                                                {
                                                    this.state.courses.map( (course,key) => (
                                                            course._id === editedQues.course ?
                                                                <option value={course._id} key={key}>{course.name}</option>
                                                            : ''
                                                        )
                                                    )
                                                }
                                                <option value="">Choose a Course</option>
                                                {
                                                    this.state.courses.map((course,key) =>
                                                        <option value={course._id} key={key}>{course.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="col s6">
                                            <label htmlFor="subject">Choose a Subject:</label>

                                            <select id="subject" name="subject" value={this.state.subject ? this.state.subject : ''} style={{display: "block"}} onChange={this.handleChange} disabled>

                                                {
                                                    this.state.courses.filter(course => course._id === this.state.course).map((course,key) => (
                                                        course.subjects.map((subject,key) => (
                                                            subject._id === editedQues.questionCategory._id ?
                                                                <option value={subject._id} key={key}>{subject.name}</option>
                                                                : ''
                                                        ) )
                                                    ))
                                                }
                                                <option value="">Choose a Subject</option>

                                                {this.renderSubjects()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <span>Description</span>
                                        <Editor
                                            apiKey={API_KEY}
                                            init={{

                                                height: 500,
                                                menubar: 'edit insert format table tools help',
                                                plugins: [
                                                    ' autolink media lists link charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime table paste code wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat  '
                                            }}
                                            initialValue={editedQues.explanation}
                                            onChange={(e) => { this.setState({ description:e.target.getContent()}) }}
                                            // onEditorChange={desc => setFieldValue("description", desc)}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <button className="btn" type="submit" >Edit Question</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        : ""
                    }

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
)(QuestionBankEditQues);