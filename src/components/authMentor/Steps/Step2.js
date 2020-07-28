import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Step2({ handleStepTwo, getBack }) {
    return (
        <div>
            <Formik
                initialValues={{ medicalcollege: "", position: '', session: '', mentortype: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.medicalcollege) {
                        errors.medicalcollege = 'Medical College name is required!';
                    }

                    if (!values.position) {
                        errors.position = "Position is required!";
                    }

                    if (!values.session) {
                        errors.session = "Session is required!"
                    }
                    if (!values.mentortype) {
                        errors.mentortype = "You must mention your current status!"
                    }
                    return errors;
                }}
                onSubmit={values => {
                    handleStepTwo(values.medicalcollege, values.position, values.session, values.mentortype)
                    console.log("true")
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="input-field col s12">
                                <span>Enter the name of your medical college</span>
                                <Field type="text" name="medicalcollege" placeholder="Medical College" />
                                <ErrorMessage name="medicalcollege" />
                            </div>
                            <div className="input-field col s12">
                                <span>Enter your position/designation</span>
                                <Field type="text" name="position" placeholder="Your position/designation" />
                                <ErrorMessage name="position" />
                            </div>
                            <div className="input-field col s12">
                                <span>Your session</span>
                                <Field type="text" name="session" placeholder="Your session" />
                                <ErrorMessage name="session" />
                            </div>
                            <div className="col s12">
                                <span>You are a</span>
                                <br />
                                <label>
                                    <Field type="radio" name="mentortype" value="Student" placeholder="Your session" />
                                    <span>Student</span>
                                </label>
                                <label>
                                    <Field type="radio" name="mentortype" value="Professional" placeholder="Your session" />
                                    <span>Professional</span>
                                </label>
                                <br />
                                <ErrorMessage name="mentortype" />
                            </div>
                            <div className="col s12">
                                <button className="btn red" onClick={getBack}>Previous</button>
                                <button className="btn red" type="submit">Next</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div >
    )
}

export default Step2;