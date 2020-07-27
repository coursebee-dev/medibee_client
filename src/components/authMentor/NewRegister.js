import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMentor } from "../../actions/authActionMentor";
import classnames from "classnames";
import ReCAPTCHA from 'react-google-recaptcha';
import "../../App.css";
import axios from "axios";

export class NewRegister extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.verifyCaptcha = this.verifyCaptcha.bind(this)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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

    render() {
        return (
            <div>

            </div>
        )
    }
}



NewRegister.propTypes = {
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
)(withRouter(NewRegister));