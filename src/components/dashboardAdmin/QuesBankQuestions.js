import React,{Component} from 'react';
import M from "materialize-css";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";
import {Link} from "react-router-dom";


class QuesBankQuestions extends Component{

    constructor() {
        super();
        this.state = {
            category: "",
            question: "",
            showOption: false,
            option: "",
            correct: false,
            course: undefined,
            subject: undefined,
            description: "",
            courses: [],
            answers: [],
            questions: [],
            selectedCourse: "",
            selectedSubject : ""
        };

        this.GetCourses = this.GetCourses.bind(this);
        this.AddQuestion = this.AddQuestion.bind(this);
    }

    componentDidMount() {
        M.Modal.init(this.Modal2);
        M.FormSelect.init(this.Select);
        this.GetCourses();
        this.fetchQuestions()
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    fetchQuestions = async (subjectId) => {
        try {
            const { data } = await axios.get(`/api/admin/questionBank/question/${subjectId}`);
            this.setState({ questions: data,selectedSubject: subjectId })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleRadioButtons = e => {
        if (e.target.value === "true"){
            this.setState({
                correct: true
            })
        }else{
            this.setState({
                correct: false
            })
        }
    }

    async GetCourses() {
        try {
            const { data } = await axios.get("/api/admin/questionBank/course");
            console.log("data",data);
            this.setState({ courses: data })
        } catch (error) {
            console.log(error)
        }
    }

    AddQuestion = async e => {
        e.preventDefault();
        const { question,description,answers,subject,course } = this.state;

        var elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);
        elems[0].M_Modal.close();

        const formData = {
            question: question,
            explanation : description,
            answers : answers,
            questionCategory : subject,
            course: course
        }
        try {
            e.target.reset();
            this.setState({
                answers: [], question: "", course: undefined, description: ""
            });

            const { data } = await axios.post("/api/admin/questionBank/question/add", formData);
            M.toast({ html: data.message });

            // console.log("reset",e.target.reset())
            this.fetchQuestions()

        } catch (error) {
            console.log(error)
        }
    };

    AddOption = async () => {
        const newAnswer = {option: this.state.option, correct: this.state.correct};
        this.setState({answers: [...this.state.answers,newAnswer],showOption: false})
        console.log("add option",this.state.answers)
    }

    handleEditorChange = async (e) => {
        this.setState({
            description:e.target.getContent()
        })
    }

    renderSubjects = () => {
        return this.state.courses.filter(course => course._id === this.state.course).map((course,key) => {
            return course.subjects.map((subject,key) => {
                return <option value={subject._id} key={key}>{subject.name}</option>
            })
        })
    }

    deleteAnswer = (itemNumber) => {
        console.log("delete element")
        this.state.answers.splice(itemNumber, 1);
        this.forceUpdate();
        console.log("after delete item",this.state.answers)
    }

    deleteQues = (questionId) => {
        const data = axios.post(`/api/admin/questionBank/question/delete/${questionId}`);
        M.toast({ html: data.message });
        this.fetchQuestions()
    }


    render() {
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;

        return (
            <>
                <div className="section">
                    <div style={{ minWidth: "300px" }} className="card">
                        <div className="card-content">
                            <div className="row">
                                <span className="col card-title">Questions</span>
                                <a className="btn secondary-content btn-small red modal-trigger" href="#questionModal">Add</a>
                                <div ref={Modal2 => {
                                    this.Modal2 = Modal2;
                                }} id="questionModal" className="modal">
                                    <button className="secondary-content white btn-floating"><i className="secondary-content material-icons red-text modal-close">close</i></button>
                                    <div className="modal-content">
                                        <h4>Add a Question</h4>
                                        <div className="section">

                                                <div className="row">
                                                    <form className="col s12" onSubmit={this.AddQuestion}>

                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <span>Question Title</span>

                                                                <Editor
                                                                    apiKey={API_KEY}
                                                                    init={{
                                                                        height: 250,
                                                                        menubar: "edit insert format table tools help",
                                                                        plugins: [
                                                                            "image autolink lists link charmap print preview anchor",
                                                                            "searchreplace visualblocks code fullscreen",
                                                                            "insertdatetime table paste code wordcount",
                                                                        ],
                                                                        toolbar:
                                                                            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",
                                                                        automatic_uploads: true,
                                                                        images_upload_url: "https://api.cloudinary.com/v1_1/coursebee/upload",
                                                                        images_upload_handler: async (blobinfo, success, failure) => {
                                                                            let headers = new Headers()
                                                                            headers.append('Accept', 'Application/JSON')

                                                                            let formdata = new FormData()

                                                                            formdata.append("name", blobinfo.filename())
                                                                            formdata.append("image", blobinfo.base64())

                                                                            let req = new Request("https://api.imgbb.com/1/upload?expiration=600&key=b9eed6cb0484ae308da889596a484e50", {
                                                                                method: 'POST',
                                                                                headers,
                                                                                mode: 'cors',
                                                                                body: formdata
                                                                            })



                                                                            fetch(req)
                                                                                .then(res => res.json())
                                                                                .then(data => success(data.data.url))
                                                                                .catch(err => failure(err.message))

                                                                        }
                                                                    }}

                                                                    initialValue={this.state.question}
                                                                    onChange={(e) => { this.setState({question: e.target.getContent() }) }}
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

                                                                <select id="course" name="course" value={this.state.course ? this.state.course : ''} style={{display: "block"}} onChange={this.handleChange}>
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

                                                                <select id="subject" name="subject" style={{display: "block"}} onChange={this.handleChange}>

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
                                                                    menubar: "edit insert format table tools help",
                                                                    plugins: [
                                                                        "image autolink lists link charmap print preview anchor",
                                                                        "searchreplace visualblocks code fullscreen",
                                                                        "insertdatetime table paste code wordcount",
                                                                    ],
                                                                    toolbar:
                                                                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",
                                                                    automatic_uploads: true,
                                                                    images_upload_url: "https://api.cloudinary.com/v1_1/coursebee/upload",
                                                                    images_upload_handler: async (blobinfo, success, failure) => {
                                                                        let headers = new Headers()
                                                                        headers.append('Accept', 'Application/JSON')

                                                                        let formdata = new FormData()

                                                                        formdata.append("name", blobinfo.filename())
                                                                        formdata.append("image", blobinfo.base64())

                                                                        let req = new Request("https://api.imgbb.com/1/upload?expiration=600&key=b9eed6cb0484ae308da889596a484e50", {
                                                                            method: 'POST',
                                                                            headers,
                                                                            mode: 'cors',
                                                                            body: formdata
                                                                        })



                                                                        fetch(req)
                                                                            .then(res => res.json())
                                                                            .then(data => success(data.data.url))
                                                                            .catch(err => failure(err.message))

                                                                    }
                                                                }}

                                                                initialValue={this.state.description}
                                                                onChange={(e) => { this.setState({ description:e.target.getContent()}) }}
                                                            />
                                                        </div>

                                                        <div className="row">
                                                            {/*<div className="input-field col s12">*/}
                                                            {/*    <input id="category_name" onChange={e => this.setState({ category: e.target.value })} type="text" className="validate" />*/}
                                                            {/*    <label className="active" htmlFor="category_name">Category Name</label>*/}
                                                            {/*</div>*/}
                                                            <div className="input-field col s12">
                                                                <button className="btn" type="submit" >Add Question</button>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <h3 className="center-align"> Questions </h3>
                            <div className="row">
                                {
                                    this.state.courses.map( (course,key) => (
                                        <div className="col">
                                            <button value={course.name} onClick={e =>this.setState({selectedCourse: e.target.value})} className={this.state.selectedCourse === `${course.name}` ? "btn btn-large waves-effect waves-light hoverable red" : "center-align btn btn-large waves-effect waves-light hoverable black"}>{course.name}</button>
                                        </div>
                                    ) )
                                }
                            </div>
                            <div className="row">
                                <h5>Subjects</h5>
                                {
                                    this.state.selectedCourse.length !== 0 ?
                                        this.state.courses.filter(course => course.name === this.state.selectedCourse ).map(selectedCourse => (
                                            selectedCourse.subjects.map((subject,key)=>(
                                                <div className="col">
                                                    <button value={subject._id} onClick={ () => this.fetchQuestions(subject._id) }  className={this.state.selectedSubject === `${subject._id}` ? "btn btn-large waves-effect waves-light hoverable red" : "center-align btn btn-large waves-effect waves-light hoverable green"}>{subject.name}</button>
                                                </div>
                                            ) )
                                        ))
                                    : ''
                                }
                            </div>
                            <div className="row">
                                {
                                    this.state.questions.length > 0 ?
                                        this.state.questions.map((question,key) => (
                                            <div className="row" key={key}>
                                                <div className="col s9" >
                                                    <span>{key+1} . </span><div dangerouslySetInnerHTML={{ __html: question.question }} />
                                                </div>
                                                <div className="col s3">
                                                    <Link to={`/admin/dashboard/questionBank/edit/${question._id}`}>
                                                        <span className="btn secondary-content btn-small red">Edit</span>
                                                    </Link>
                                                    <span style={{ cursor: "pointer" }} onClick={() => this.deleteQues(question._id)} className="secondary-content material-icons red-text">close</span>
                                                </div>
                                            </div>

                                        ))
                                        : ''
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default QuesBankQuestions;