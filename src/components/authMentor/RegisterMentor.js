import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMentor } from "../../actions/authActionMentor";
import classnames from "classnames";
import ReCAPTCHA from 'react-google-recaptcha';
import "../../App.css";
import axios from "axios";
import Step1 from "./Steps/Step1";

class Register extends Component {
    constructor() {
        super();
        this.verifyCaptcha = this.verifyCaptcha.bind(this)
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            mobileNo: "",
            medicalcollege: "",
            session: "",
            mentortype: null,
            position: "",
            interest: "",
            subjects: [],
            subjectcategories: [],
            subjectBySelectedCatagories: [],
            selectedsubjectcategories: [],
            interests: [],
            captcha: false,
            propic: null,
            idfont: null,
            idback: null,
            idurl: null,
            idfront: null,
            idback: null,
            idurl: null,
            mentornidfront: null,
            mentornidback: null,
            mentornidurl: null,
            mbbsfront: null,
            mbbsback: null,
            mbbsurl: null,
            bmdcfront: null,
            bmdcback: null,
            bmdcurl: null,
            imagedata: {},
            errors: {}
        };
        this.handleStepOne = this.handleStepOne.bind(this)
        this.handleStepTwo = this.handleStepTwo.bind(this)
        this.onInterstChange = this.onInterstChange.bind(this)
        this.addInterest = this.addInterest.bind(this)
        this.deleteInterest = this.deleteInterest.bind(this)
        this.getSubjectCategories = this.getSubjectCategories.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.getSelectedSubjects = this.getSelectedSubjects.bind(this)
        this.handleSubjectCheckChange = this.handleSubjectCheckChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.setImageUrls = this.setImageUrls.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    async getSubjectCategories() {
        const { data } = await axios.get("/api/admin/category")
        this.setState({ subjectcategories: data })
    }

    async getSelectedSubjects() {

        const { data } = await axios.post('/api/admin/eachsubject', {
            name: this.state.selectedsubjectcategories
        })

        this.setState({ subjectBySelectedCatagories: data })
    }

    handleCheckChange(e) {
        let subcat = this.state.selectedsubjectcategories;
        if (subcat.includes(e.target.value)) {
            subcat = subcat.filter(arr => { return arr !== e.target.value })
        } else {
            subcat.push(e.target.value)
        }
        this.setState({ selectedsubjectcategories: subcat }, () => this.getSelectedSubjects())
    }

    handleSubjectCheckChange(e) {
        let newArray = this.state.subjects;
        let obj = { subject: e.target.id, category: e.target.name, subcategory: e.target.value }
        if (newArray.some(tempobj => tempobj.subcategory === e.target.value)) {
            newArray = newArray.filter(arrobj => { return arrobj.subcategory !== e.target.value })
        } else {
            newArray.push(obj)
        }
        this.setState({ subjects: newArray }, () => console.log(this.state.subjects))


    }

    componentDidMount() {
        this.getSubjectCategories()
        this.getSelectedSubjects()
        window.scrollTo(0, 0)
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.type === "student") {
                this.props.history.push("/dashboard");
            } else if (this.props.auth.user.type === "mentor") {
                this.props.history.push("mentor/dashboard");
            } else if (this.props.auth.user.type === "admin") {
                this.props.history.push("admin/dashboard");
            }
        }
    }
    async getUploadData(filedata) {
        const body = new FormData()
        body.append('upload_preset', "enxcncgu")
        body.append("file", filedata)
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/medibee/upload", body)
        return data.url;
    }

    async setImageUrls() {
        if (this.state.mentortype === "Student") {
            let id = []
            let data = await this.getUploadData(this.state.idfont)
            id.push(data)
            data = await this.getUploadData(this.state.idback)
            id.push(data)
            this.setState({ idurl: id })

            let nid = []
            data = await this.getUploadData(this.state.nidfont)
            nid.push(data)
            data = await this.getUploadData(this.state.nidback)
            nid.push(data)
            this.setState({ nidurl: nid })
        } else if (this.state.mentortype === "Professional") {
            let bmdc = []
            let data = await this.getUploadData(this.state.bmdcfront)
            bmdc.push(data)
            data = await this.getUploadData(this.state.bmdcback)
            bmdc.push(data)
            this.setState({ bmdcurl: bmdc })

            let mentornid = []
            data = await this.getUploadData(this.state.mentornidfront)
            mentornid.push(data)
            data = await this.getUploadData(this.state.mentornidback)
            mentornid.push(data)
            this.setState({ mentornidurl: mentornid })

            let mbbs = []
            data = await this.getUploadData(this.state.mbbsfront)
            mbbs.push(data)
            data = await this.getUploadData(this.state.mbbsback)
            mbbs.push(data)
            this.setState({ mbbsurl: mbbs })
        }
    }

    handleUpload(e) {
        if (e.target.value === "idfront") {
            this.setState({ idfont: e.target.files[0] })
        } else if (e.target.value === "idfront") {
            this.setState({ idfont: e.target.files[0] })
        } else if (e.target.value === "idback") {
            this.setState({ idback: e.target.files[0] })
        } else if (e.target.value === "nidfront") {
            this.setState({ nidfront: e.target.files[0] })
        } else if (e.target.value === "nidback") {
            this.setState({ nidback: e.target.files[0] })
        } else if (e.target.value === "bmdcfront") {
            this.setState({ bmdcfront: e.target.files[0] })
        } else if (e.target.value === "bmdcback") {
            this.setState({ bmdcback: e.target.files[0] })
        } else if (e.target.value === "mbbsfront") {
            this.setState({ mbbsfront: e.target.files[0] })
        } else if (e.target.value === "mbbsback") {
            this.setState({ mbbsback: e.target.files[0] })
        } else if (e.target.value === "mentornidfront") {
            this.setState({ mentornidfront: e.target.files[0] })
        } else if (e.target.value === "mentornidfront") {
            this.setState({ mentornidback: e.target.files[0] })
        }
    }

    handleStepOne(a, b, c, d, e, f) {
        this.setState({
            name: a,
            email: b,
            password: c,
            password2: d,
            mobileNo: e,
            propic: f,
        }, () => {
            console.log(this.state)
        })
    }
    handleStepTwo(name, email, password, password2, mobileNo, propic) {
        this.setState({
            name: name,
            email: email,
            password: password,
            password2: password2,
            mobileNo: mobileNo,
            propic: propic,
        })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true })
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            mobileNo: this.state.mobileNo,
            medicalcollege: this.state.medicalcollege,
            session: this.state.session,
            position: this.state.position,
            preferred_topic: this.state.preferred_topic,
            mentortype: this.state.mentortype,
            subject_level: this.state.selectedsubjectcategories,
            subjects: this.state.subjects,
            imagedata: this.state.imagedata,
            type: "mentor"
        };
        if (this.state.captcha) {
            this.props.registerMentor(newUser, this.props.history);
            console.log(newUser)
        } else {
            alert('Please verify captcha!')
        }
        this.setState({ loading: false })
    };

    onInterstChange(e) {
        this.setState({ interest: e.target.value })
    }
    addInterest(e) {
        e.preventDefault()
        this.setState(state => {
            const interests = [...state.interests, state.interest]
            return {
                interests,
                interest: '',
            };
        });
    }

    verifyCaptcha(response) {
        if (response) {
            this.setState({ captcha: true })
        }
    }

    deleteInterest(e) {
        e.preventDefault()
        this.setState({
            interests: []
        });
    }

    uploadtest(e) {
        e.preventDefault()
        this.setImageUrls()
        console.log(this.state)
    }

    render() {
        const { errors } = this.state;
        let captcha_secret = process.env.REACT_APP_NOT_CAPTCHA_SECRET
        return (
            <div className="container">
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/mentor" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link className="red-text text-darken-1" to="/mentor/login">Log in</Link>
                            </p>
                        </div>
                        <Step1 handleStepOne={(a, b, c, d, e, f) => this.handleStepOne(a, b, c, d, e, f)} />
                        <form noValidate onSubmit={this.onSubmit}>
                            {/*                             
                            <>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.name
                                        })}
                                    />
                                    <label htmlFor="name">Name</label>
                                    <span className="red-text">{errors.name}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email
                                        })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className="red-text">{errors.email}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className="red-text">{errors.password}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password2
                                        })}
                                    />
                                    <label htmlFor="password2">Confirm Password</label>
                                    <span className="red-text">{errors.password}</span>
                                </div>
                                <div className="col s12">
                                    <span>Upload Your profile picture</span>
                                    <input onChange={this.handleUpload} name="propic" type="file" />
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.mobileNo}
                                        error={errors.mobileNo}
                                        id="mobileNo"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.mobileNo
                                        })}
                                    />
                                    <label htmlFor="mobileNo">Mobile No.</label>
                                    <span className="red-text">{errors.mobileNo}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.medicalcollege}
                                        error={errors.medicalcollege}
                                        id="medicalcollege"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.medicalcollege
                                        })}
                                    />
                                    <label htmlFor="medicalcollege">Medical College</label>
                                    <span className="red-text">{errors.medicalcollege}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.position}
                                        error={errors.position}
                                        id="position"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.position
                                        })}
                                    />
                                    <label htmlFor="position">Position/Designation</label>
                                    <span className="red-text">{errors.position}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.session}
                                        error={errors.session}
                                        id="session"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.session
                                        })}
                                    />
                                    <label htmlFor="session">Session</label>
                                    <span className="red-text">{errors.session}</span>
                                </div>
                                <div className="col s12">
                                    <label htmlFor="mentortype">Current Status</label>
                                    <select
                                        onChange={this.onChange}
                                        error={errors.mentortype}
                                        id="mentortype"
                                        type="text"
                                        className={classnames("browser-default ", {
                                            invalid: errors.mentortype
                                        })}>
                                        <option value="" defaultValue>Choose your option</option>
                                        <option value="Student">Student</option>
                                        <option value="Professional">Professional</option>
                                    </select>
                                </div>
                                <span className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>Upload Your Student ID Card</span>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>
                                    <span>(front)</span>
                                    <input type="file" name="idfront" onChange={this.handleUpload} />
                                </div>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>
                                    <span>(back)</span>
                                    <input type="file" name="idback" onChange={this.handleUpload} />
                                </div>
                                <span className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>Upload Your NID/Passport <label>(Not Mandatory)</label></span>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>
                                    <span>(front)</span>
                                    <input type="file" name="nidfront" onChange={this.handleUpload} />
                                </div>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Professional" ? "none" : null }}>
                                    <span>(back)</span>
                                    <input type="file" name="nidback" onChange={this.handleUpload} />
                                </div>
                                <span className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>Upload Your BMDC Certificate</span>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>
                                    <span>(front)</span>
                                    <input type="file" name="bmdcfront" onChange={this.handleUpload} />
                                </div>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>
                                    <span>(back)</span>
                                    <input type="file" name="bmdcback" onChange={this.handleUpload} />
                                </div>
                                <span className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>Upload Your NID/Passport</span>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>
                                    <span>(front)</span>
                                    <input type="file" name="mentornidfront" onChange={this.handleUpload} />
                                </div>
                                <div className={classnames("col s12", { hide: this.state.mentortype == null })} style={{ display: this.state.mentortype === "Student" ? "none" : null }}>
                                    <span>(back)</span>
                                    <input type="file" name="mentornidback" onChange={this.handleUpload} />
                                </div>

                                <div className="input-field col s12">
                                    <span>Select Desired Subject Category</span>
                                    {this.state.subjectcategories.map((subcat, id) => (
                                        <p key={id}>
                                            <label>
                                                <input value={subcat.name} onChange={this.handleCheckChange} type="checkbox" />
                                                <span>{subcat.name}</span>
                                            </label>
                                        </p>
                                    ))}
                                </div>

                                <span className="col s12">Select Sub-categories</span>
                                {this.state.subjectBySelectedCatagories.map(subject => (
                                    <div key={subject._id} className="col s12">
                                        <span>{subject.name}</span>
                                        {subject.subcategory.map((subcat, id) => (
                                            <p key={id}>
                                                <label>
                                                    <input value={subcat.name} name={subject.category} id="subject" onChange={this.handleSubjectCheckChange} type="checkbox" />
                                                    <span>{subcat.name}</span>
                                                </label>
                                            </p>
                                        ))}
                                    </div>
                                ))}
                                {this.state.interests.map((interest, id) => (
                                    <div className="chip" key={id}>
                                        {interest}
                                    </div>
                                ))}
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onInterstChange}
                                        value={this.state.interest}
                                        error={errors.interests}
                                        id="interests"
                                        type="text"
                                        maxLength="120"
                                        className={classnames("materialize-textarea", {
                                            invalid: errors.interests
                                        })}
                                    />
                                    <button className="btn btn-small" disabled={!this.state.interest} onClick={this.addInterest}>Add Interest</button>
                                    <button className="btn btn-small" disabled={!this.state.interests[0]} onClick={this.deleteInterest}>Clear Interest</button>
                                    <label htmlFor="interests">Preffered Topic of teaching (you may add multiple)</label>
                                    <span className="red-text">{errors.interests}</span>
                                </div>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <ReCAPTCHA
                                        sitekey={`${captcha_secret}`}
                                        onChange={this.verifyCaptcha}
                                    />
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
                                        className="btn btn-large waves-effect waves-light hoverable red"
                                    >
                                        Sign up
                                </button>
                                </div>
                            </>
                         */}
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}
Register.propTypes = {
    registerMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerMentor }
)(withRouter(Register));