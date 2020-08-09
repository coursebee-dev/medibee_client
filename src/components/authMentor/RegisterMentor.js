import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMentor } from "../../actions/authActionMentor";
import "../../App.css";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3Student from "./Steps/Step3Student";
import Step3Professional from "./Steps/Step3Professional"
import Step4 from "./Steps/Step4";

const FormLayout = ({ Component }) => {
    return (
        <div className="container">
            <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
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
                    {Component}

                </div>
            </div>
        </div >
    )
}

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
            mentortype: "",
            position: "",
            propicurl: "",
            idurl: [],
            nidurl: [],
            bmdcurl: [],
            mbbsurl: [],
            subject: [],
            category: [],
            subcategory: [],
            step: 1,
            errors: {}
        };
        this.getBack = this.getBack.bind(this)
        this.handleStepOne = this.handleStepOne.bind(this)
        this.handleStepTwo = this.handleStepTwo.bind(this)
        this.handleStepThree = this.handleStepThree.bind(this)
        this.handleStepFour = this.handleStepFour.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
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

    onSubmit = () => {
        this.setState({ loading: true })
        let newUser;
        if (this.state.mentortype === "Student") {
            newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2,
                mobileNo: this.state.mobileNo,
                medicalcollege: this.state.medicalcollege,
                session: this.state.session,
                position: this.state.position,
                propicurl: this.state.propicurl,
                idurl: this.state.idurl,
                nidurl: this.state.nidurl,
                mentortype: this.state.mentortype,
                subject: this.state.subject,
                category: this.state.category,
                subcategory: this.state.subcategory,
                type: "mentor"
            };
        } else if (this.state.mentortype === "Professional") {
            newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2,
                mobileNo: this.state.mobileNo,
                medicalcollege: this.state.medicalcollege,
                session: this.state.session,
                position: this.state.position,
                propicurl: this.state.propicurl,
                mbbsurl: this.state.mbbs,
                bmdcurl: this.state.bmdcurl,
                nidurl: this.state.nidurl,
                mentortype: this.state.mentortype,
                subject: this.state.subject,
                category: this.state.category,
                subcategory: this.state.subcategory,
                type: "mentor"
            };
        }
        this.props.registerMentor(newUser, this.props.history);
        this.setState({ loading: false })
    };
    handleStepOne(a, b, c, d, e, f) {
        this.setState({
            name: a,
            email: b,
            password: c,
            password2: d,
            mobileNo: e,
            propicurl: f,
            step: 2
        }, () => {
            console.log(this.state)
        })
    }
    handleStepTwo(g, h, i, j) {
        this.setState({
            medicalcollege: g,
            position: h,
            session: i,
            mentortype: j,
            step: 3
        }, () => {
            console.log(this.state)
        })
    }

    handleStepThree(k, l, m) {
        if (this.state.mentortype === "Student") {
            this.setState({
                idurl: k,
                nidurl: l,
                step: 4
            }, () => {
                console.log(this.state)
            })
        } else {
            this.setState({
                nidurl: k,
                mbbsurl: l,
                bmdcurl: m,
                step: 4
            }, () => {
                console.log(this.state)
            })
        }

    }

    handleStepFour(n, o, p) {
        this.setState({
            subject: o,
            category: n,
            subcategory: p,
        }, () => {
            this.onSubmit()
        })
    }

    getBack(e) {
        e.preventDefault()
        const { step } = this.state
        if (this.state.step > 1) {
            this.setState({ step: step - 1 })
        }
        console.log("gooo")
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    verifyCaptcha(response) {
        if (response) {
            this.setState({ captcha: true })
        }
    }

    render() {
        //const { errors } = this.state;
        switch (this.state.step) {
            case 1:
                return (
                    <FormLayout Component={
                        <Step1 handleStepOne={(a, b, c, d, e, f) => this.handleStepOne(a, b, c, d, e, f)} getBack={() => this.getBack()} />
                    } />
                )
            case 2:
                return (
                    <FormLayout Component={
                        <Step2 handleStepTwo={(g, h, i, j) => this.handleStepTwo(g, h, i, j)} getBack={(e) => this.getBack(e)} />
                    } />
                )
            case 3:
                return (
                    <>
                        {this.state.mentortype === "Student" ? (
                            <FormLayout Component={
                                <Step3Student handleStepThree={(k, l, m) => this.handleStepThree(k, l, m)} getBack={(e) => this.getBack(e)} email={this.state.email} />
                            } />
                        ) : (
                                <FormLayout Component={
                                    <Step3Professional handleStepThree={(k, l, m) => this.handleStepThree(k, l, m)} getBack={(e) => this.getBack(e)} email={this.state.email} />
                                } />
                            )}
                    </>
                )
            case 4:
                return (
                    <FormLayout Component={
                        <Step4 handleStepFour={(g, h, i, j) => this.handleStepFour(g, h, i, j)} getBack={(e) => this.getBack(e)} />
                    } />
                )
            default:
                return (
                    <FormLayout Component={
                        <Step1 handleStepOne={(a, b, c, d, e, f) => this.handleStepOne(a, b, c, d, e, f)} getBack={() => this.getBack()} />
                    } />
                )
        }
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