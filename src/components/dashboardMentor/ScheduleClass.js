
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import '../../App.css';

class ScheduleClass extends Component {
    constructor() {
        super();
        this.state = {
            topic: "",
            class_type: "",
            start_date: "",
            start_time: "",
            price: "",
            duration: "",
            description: "",
            academicExcellence: "",
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
            console.log(data)
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
        this.setState({ selectedsubject: newArray }, console.log(this.state.selectedsubject))
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
        this.getCategories()
        console.log(this.state)
    }
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        this.setState({ description: content })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        if (this.state.topic === "") {
            this.setState({ errors: { topic: "Topic field is required" } })
            return
        }
        if (this.state.class_type === "") {
            this.setState({ errors: { class_type: "Class type field is required" } })
            return
        }
        if (this.state.start_date === "") {
            this.setState({ errors: { start_date: "Date field is required" } })
            return
        }
        if (this.state.start_time === "") {
            this.setState({ errors: { start_time: "Time field is required" } })
            return
        }
        if (this.state.duration === "") {
            this.setState({ errors: { duration: "Duration field is required" } })
            return
        }
        const startTime = new Date(`${this.state.start_date}T${this.state.start_time}:00Z`)
        startTime.setHours(startTime.getHours() - 6)// timezone:Asia/Dhaka
        const tempTime = new Date()
        tempTime.setHours(tempTime.getHours() - 2)
        if (tempTime >= startTime) {
            this.setState({ errors: { start_date: "Schedule at least two hours before", start_time: "Schedule at least two hours before" } })
            return
        }
        const formData = {
            mentorId: this.props.auth.user.id,
            topic: this.state.topic,
            class_type: this.state.class_type,
            description: this.state.description,
            price: this.state.price,
            academicExcellence: this.state.academicExcellence,
            selectedliveclasslevel: this.state.selectedliveclasslevel,
            selectedsubject: this.state.selectedsubject,
            selectedsubcategories: this.state.selectedsubcategories,
            start_time: startTime.toISOString(),//start time in iso format UTC
            duration: this.state.duration,
        }
        console.log(formData)
        this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)
    }

    render() {
        const { errors } = this.state;
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
        return (
            <div>
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.topic}
                                    error={errors.topic}
                                    id="topic"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.topic || errors.topicnotfound
                                    })}
                                />
                                <label htmlFor="topic">topic</label>
                                <span className="red-text">
                                    {errors.topic}
                                    {errors.topicnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <Editor
                                    apiKey={API_KEY}
                                    initialValue="<p>Add a description</p>"
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
                                    onEditorChange={this.handleEditorChange}
                                />
                                <span className="red-text">
                                    {errors.description}
                                    {errors.descriptionnotfound}
                                </span>
                            </div>
                            <div className="col s12">
                                <label htmlFor="class_type">Class type  </label>
                                <select
                                    onChange={this.onChange}
                                    value={this.state.class_type}
                                    id="class_type"
                                    error={errors.class_type}
                                    className={classnames("browser-default", {
                                        invalid: errors.class_type || errors.class_typenotfound
                                    })}
                                >
                                    <option disabled value="">Select Type</option>
                                    {/*<option value="Open" disabled>Open For All</option>*/}
                                    <option value="Free">Free Registration</option>
                                    <option value="Paid">Paid Live Class</option>
                                </select>
                                <span className="red-text">
                                    {errors.class_type}
                                    {errors.class_typenotfound}
                                </span>
                            </div>
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
                                <input
                                    onChange={this.onChange}
                                    value={this.state.academicExcellence}
                                    error={errors.topic}
                                    id="academicExcellence"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.academicExcellence || errors.academicExcellencenotfound
                                    })}
                                />
                                <label htmlFor="academicExcellence">Academic Excellence</label>
                                <span className="red-text">
                                    {errors.academicExcellence}
                                    {errors.academicExcellencenotfound}
                                </span>
                            </div>
                            <div className=" col s12">
                                <label htmlFor="start_date">Start Date  </label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.start_date}
                                    error={errors.start_date}
                                    id="start_date"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.start_date || errors.start_datenotfound
                                    })}
                                />
                                <span className="red-text">
                                    {errors.start_date}
                                    {errors.start_datenotfound}
                                </span>
                            </div>

                            <div className="col s12">
                                <label htmlFor="start_time">Start Time  </label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.start_time}
                                    error={errors.start_time}
                                    id="start_time"
                                    type="time"
                                    className={classnames("", {
                                        invalid: errors.start_time || errors.start_timenotfound
                                    })}
                                />
                                <span className="red-text">
                                    {errors.start_time}
                                    {errors.start_timenotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="duration">duration in minutes</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.duration}
                                    error={errors.duration}
                                    id="duration"
                                    type="number"
                                    min="0"
                                    className={classnames("materialize-textarea", {
                                        invalid: errors.duration || errors.durationnotfound
                                    })}
                                />
                                <span className="red-text">
                                    {errors.duration}
                                    {errors.durationnotfound}
                                </span>
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
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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