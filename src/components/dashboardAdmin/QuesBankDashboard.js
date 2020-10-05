import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
import QuesBankCategory from "./QuesBankCategory";
import QuesBankQuestions from "./QuesBankQuestions";
class QuesBankDashboard extends Component {
    constructor() {
        super();
        this.state = {
            option: "question"
        };
    }

    componentDidMount() {
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.history.push("/");
        this.props.logoutUser();
    };


    render() {
        console.log("option",this.state.option);
        const { user } = this.props.auth;
        return (
            <div>
                <HeaderImg />
                <div></div>
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h4 className="center-align">
                                <b>QUESTION BANK</b>
                            </h4>

                            <div className="row">
                                <div className="col s6 center-align ">
                                    <button value="category" onClick={e =>this.setState({option: e.target.value})} className={this.state.option === 'category' ? "btn btn-large waves-effect waves-light hoverable red" : "center-align btn btn-large waves-effect waves-light hoverable black"}>Add Category</button>
                                </div>
                                <div className="col s6 center-align ">
                                    <button value="question" onClick={e =>this.setState({option: e.target.value})} className={this.state.option === 'question' ? "btn btn-large waves-effect waves-light hoverable red" : "center-align btn btn-large waves-effect waves-light hoverable black"}>Add Question</button>
                                </div>
                            </div>
                            <hr/>
                            {
                                this.state.option === 'category' ? <QuesBankCategory/> : this.state.option === 'question' ? <QuesBankQuestions/> : <h1>Hello</h1>
                            }

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

QuesBankDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(QuesBankDashboard);