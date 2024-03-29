import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import sendEmail from "../../actions/sendEmail";

class VerifyEmail extends Component {
    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push('/')
        } else {
            const userData = {
                sync_code: `${process.env.REACT_APP_SYNC_CODE}`,
                email: this.props.location.state.email,
                type: this.props.location.state.type
            }
            this.props.sendEmail(userData, this.props.history);
        }
    }
    onResendClick = e => {
        e.preventDefault();
        const userData = {
            sync_code: `${process.env.REACT_APP_SYNC_CODE}`,
            email: this.props.location.state.email,
            type: this.props.location.state.type
        }
        this.props.sendEmail(userData, this.props.history);
    };
    render() {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ minHeight: "60vh" }}>
                    <div style={{ margin: "5%" }}>
                        <h6>
                            One last step
                        </h6>
                        <h4>
                            Please verify your Email
                        </h4>
                        <div>
                            We have sent an email to you<br />
                            please open the email and click on the given link
                        </div>
                    </div>
                    <div style={{ margin: "5%" }}>

                        <button onClick={this.onResendClick} className="btn btn-small waves-effect waves-light hoverable blue darken-1">
                            Resend Email
                    </button>
                    </div>
                    <div style={{ margin: "5%" }}>
                        <Link
                            className="btn btn-large waves-effect waves-light hoverable red darken-1 black-text"
                            to={this.props.location.state.type === "student" ?
                                "/login" : this.props.location.state.type === "mentor" ?
                                    "mentor/login" : "/admin/login"}>
                            Proceed to login
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
VerifyEmail.propTypes = {
    sendEmail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    sendEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
