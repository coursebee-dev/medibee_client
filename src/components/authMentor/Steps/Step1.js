import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Step1({ handleStepOne }) {
    return (
        <div>
            <Formik
                initialValues={{ name: "", email: '', password: '', password2: '', mobileNo: '', propic: [] }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required!';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address!';
                    }

                    if (!values.name) {
                        errors.name = "Name is required!";
                    }

                    if (!values.mobileNo) {
                        errors.mobileNo = "Phone no. is required!"
                    }
                    if (!values.password) {
                        errors.password = "Password is required!"
                    } else if (values.password2 !== values.password) {
                        errors.password2 = "Password didn't match!"
                    }
                    return errors;
                }
                }
                onSubmit={values => {
                    handleStepOne(values.name, values.email, values.password, values.password2, values.mobileNo, values.propic)
                }
                }
            >
                {({ errors, touched, onSubmit, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="input-field col s12">
                                <span>Enter Your Name</span>
                                <Field type="text" name="name" placeholder="Full Name" />
                                <ErrorMessage name="name" />
                            </div>
                            <div className="input-field col s12">
                                <span>Enter Your Email</span>
                                <Field type="email" name="email" placeholder="Your Email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div className="input-field col s12">
                                <span>Set a password for your account</span>
                                <Field type="password" name="password" placeholder="Set a password" />
                                <ErrorMessage name="password" />
                            </div>
                            <div className="input-field col s12">
                                <span>Confirm password</span>
                                <Field type="password" name="password2" placeholder="Confirm password" />
                                <ErrorMessage name="password2" />
                            </div>
                            <div className="input-field col s12">
                                <span>Enter your mobile no.</span>
                                <Field type="text" name="mobileNo" placeholder="Phone Number" />
                                <ErrorMessage name="mobileNo" className="red-text" />
                            </div>
                            <span className="col s12">Select a profile picture</span>
                            <div className="file-field input-field col s12">
                                <div className="btn btn-small blue">
                                    <span>File</span>
                                    <Field type="file" name="propic" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <div className="col s12">
                                <button className="btn red" type="submit">Next</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div >
    )
}

export default Step1

