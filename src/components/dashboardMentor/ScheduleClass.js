import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../App.css';

class ScheduleClass extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            selectedliveclasslevel: [],
            selectedsubject: [],
            selectedsubcategories: [],
            categories: [],
            subjects: [],
            errors: {}
        };
        this.getSubjects = this.getSubjects.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.selectCategories = this.selectCategories.bind(this)
        this.selectSubject = this.selectSubject.bind(this)
        this.selectSubCategories = this.selectSubCategories.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    async getSubjects() {
        try {
            const { data } = await axios.post("/api/admin/eachsubject", {
                name: this.state.selectedliveclasslevel
            })
            this.setState({ subjects: data })
            //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    async getCategories() {
        try {
            const { data } = await axios.get("/api/admin/category")
            this.setState({ categories: data })
        } catch (error) {
            console.log(error)
        }
    }
    selectCategories(e) {
        let newArray = this.state.selectedliveclasslevel;
        if (newArray.includes(e.target.value)) {
            newArray = newArray.filter(cat => { return cat !== e.target.value })
        } else {
            newArray.push(e.target.value)
        }
        this.setState({ selectedliveclasslevel: newArray })
        this.getSubjects()
    }

    selectSubCategories(e) {
        let newArray = this.state.selectedsubcategories;
        if (newArray.includes(e.target.value)) {
            newArray = newArray.filter(cat => { return cat !== e.target.value })
        } else {
            newArray.push(e.target.value)
        }
        this.setState({ selectedsubcategories: newArray })
    }

    async selectSubject(e) {
        let newArray = this.state.selectedsubject;
        if (newArray.includes(e.target.value)) {
            newArray = newArray.filter(cat => { return cat !== e.target.value })
        } else {
            newArray.push(e.target.value)
        }
        this.setState({ selectedsubject: newArray },
            //console.log(this.state.selectedsubject)
        )
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
        this.getCategories()
        //console.log(this.state)
    }
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        this.setState({ description: content })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    createClass = () => {

    }

    render() {
        const { errors } = this.state;
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
        return (
            <div>
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Formik
                            initialValues={{
                                topic: "",
                                class_type: "",
                                start_time: "",
                                start_date: "",
                                duration: 0,
                                academicExcellence: "",
                                description: ""
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.topic) {
                                    errors.topic = "Class topic name is required!";
                                }

                                if (!values.description) {
                                    errors.description = "CLass description is required!";
                                }

                                if (!values.duration || !values.duration === 0) {
                                    errors.duration = "Please set class duration!";
                                }

                                if (!values.description) {
                                    errors.description = "Class description is required!";
                                }

                                if (!values.start_time) {
                                    errors.start_time = "Class start time is required!";
                                }

                                if (!values.start_date) {
                                    errors.start_date = "Class start date is required!"
                                }

                                // if (!values.academicExcellence){
                                //     errors.academicExcellence="Please mention academic excellence!"
                                // }

                                return errors;
                            }}
                            onSubmit={values => {
                                const startTime = new Date(`${values.start_date}T${values.start_time}:00Z`)
                                startTime.setHours(startTime.getHours() - 6)// timezone:Asia/Dhaka
                                const tempTime = new Date()
                                console.log(startTime)
                                tempTime.setHours(tempTime.getHours() - 2)
                                if (tempTime >= startTime) {
                                    alert("Schedule at least two hours before")
                                    return
                                }
                                const formData = {
                                    mentorId: this.props.auth.user.id,
                                    topic: values.topic,
                                    class_type: values.class_type,
                                    description: values.description,
                                    price: 0,
                                    academicExcellence: values.academicExcellence,
                                    selectedliveclasslevel: this.state.selectedliveclasslevel,
                                    selectedsubject: this.state.selectedsubject,
                                    selectedsubcategories: this.state.selectedsubcategories,
                                    start_time: startTime.toISOString(),//start time in iso format UTC
                                    duration: values.duration,
                                }
                                console.log(formData)
                                this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)
                            }}>
                            {({ handleSubmit, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="input-field col s12">
                                        <label htmlFor="topic">Topic</label>
                                        <Field type="text" id="topic" name="topic" placeholder="Class topic name" />
                                        <ErrorMessage name="topic" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="input-field col s12">
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
                                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat '
                                            }}
                                            onEditorChange={desc => setFieldValue("description", desc)}
                                        />
                                        <ErrorMessage name="description" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="col s12">
                                        <label htmlFor="class_type">Class type  </label>
                                        <Field
                                            id="class_type"
                                            name="class_type"
                                            className="browser-default"
                                            as="select"
                                        >
                                            <option defaultValue="">Select Type</option>
                                            {/*<option value="Open" disabled>Open For All</option>*/}
                                            <option value="Free">Free Registration</option>
                                            <option value="Paid">Paid Live Class</option>
                                        </Field>
                                        <ErrorMessage name="class_type" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    {/* <div className="input-field col s12">
                                        <label htmlFor="topic">Topic</label>
                                        <Field type="radio" id="topic" name="topic" placeholder="Class topic name" />
                                        <ErrorMessage name="topic" render={msg => <span className="red-text">{msg}</span>} />
                                    </div> */}
                                    <div className="col s12">
                                        <label>Select Liveclass Level</label>
                                        {this.state.categories?.map(cat => (
                                            <p key={cat._id}>
                                                <label>
                                                    <input value={cat.name} type="checkbox" onChange={this.selectCategories} />
                                                    <span>{cat.name}</span>
                                                </label>
                                            </p>
                                        ))}
                                    </div>
                                    <div className="col s12">
                                        <label>Select Liveclass Subjects</label>
                                        {this.state.subjects.map(sub => (
                                            <div key={sub._id}>
                                                <label>
                                                    <input value={sub.name} type="checkbox" onChange={this.selectSubject} />
                                                    <span>{sub.name}</span>
                                                    <label style={{ marginLeft: "40px" }}><br />Select Subcategory</label>
                                                    {sub.subcategory.map((subcat, id) => (
                                                        <p style={{ marginLeft: "40px" }} key={id}>
                                                            <label>
                                                                <input value={subcat.name} type="checkbox" onChange={this.selectSubCategories} />
                                                                <span>{subcat.name}</span>
                                                            </label>
                                                        </p>
                                                    ))}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor="academicExcellence">Academic Excellence</label>
                                        <Field type="text" id="academicExcellence" name="academicExcellence" placeholder="Academic excellence" />
                                    </div>
                                    <div className=" col s12">
                                        <label htmlFor="start_date">Start Date  </label>
                                        <Field type="date" id="start_date" name="start_date" placeholder="Class date" />
                                        <ErrorMessage name="start_date" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>

                                    <div className="col s12">
                                        <label htmlFor="start_time">Start Time  </label>
                                        <Field type="time" id="start_time" name="start_time" placeholder="Class time" />
                                        <ErrorMessage name="start_time" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor="duration">duration in minutes</label>
                                        <Field type="number" id="duration" name="duration" placeholder="Class duration" />
                                        <ErrorMessage name="duration" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <button
                                            style={{
                                                width: "150px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem"
                                            }}
                                            type="submit"
                                            className="btn btn-large waves-effect waves-light hoverable blue darken-1"
                                        >Schedule</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        );
    }
}
ScheduleClass.propTypes = {
    scheduleLiveClass: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
const mapDispatchToProps = {
    scheduleLiveClass
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleClass);