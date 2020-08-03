import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";


function Step4({ handleStepFour, getBack }) {
    const [categories, setSubjectCategories] = useState([])
    const [subjects, setSubjects] = useState([])
    const [isRecaptcha, setIsRecaptcha] = useState(false)
    const getSubjectCategories = async () => {
        const { data } = await axios.get("/api/admin/category")
        setSubjectCategories(data)
    }

    async function getSubject() {
        const { data } = await axios.get('/api/admin/subject')
        setSubjects(data)
    }

    const captcha_secret = process.env.REACT_APP_NOT_CAPTCHA_SECRET;

    useEffect(() => {
        getSubjectCategories()
        getSubject()
    }, [])
    return (
        <div>
            <Formik
                initialValues={{ category: [], subject: [], subcategory: [], recaptcha: false }}
                validate={values => {
                    const errors = {};

                    return errors;
                }}

                handleChange={values => {
                    console.log(values)
                }}

                onSubmit={values => {
                    console.log(values.category)
                    //console.log(values.subject)
                    //console.log(values.subcategory)
                    handleStepFour(values.category, values.subject, values.subcategory)
                }}
            >
                {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="col s12">
                                <p className="col s12 flow-text">Select your Teaching Level</p>
                                {categories?.map(cat => (
                                    <p key={cat._id}>
                                        <label>
                                            <Field name="category" type="checkbox" value={cat.name} />
                                            <span>{cat.name}</span>
                                        </label>
                                    </p>
                                ))}
                                {values && values.category.length === 0 ? null : (
                                    <>
                                        <p className="col s12 flow-text">Select your prefered Subject Type</p>
                                        <div>
                                            <blockquote>
                                                {subjects
                                                    .filter(sub => values.category.includes(sub.category))
                                                    .map((sub, id) => (
                                                        <p key={id}>
                                                            <label>
                                                                <Field name="subject" type="checkbox" value={sub._id} />
                                                                <span>{sub.name} ({sub.category})</span>
                                                            </label>
                                                        </p>
                                                    ))
                                                }
                                                {values && values.subject.length === 0 ? null : (
                                                    <>
                                                        <p className="col s12 flow-text">Select your Subjects</p>
                                                        <blockquote>
                                                            {subjects && subjects
                                                                .filter(sub => values.subject.includes(sub._id))
                                                                .map(((sub, id) => (
                                                                    <div key={id}>
                                                                        <h5>Subject Category: {sub.name}</h5>
                                                                        <h6>Subject Level: {sub.category}</h6>
                                                                        {sub.subcategory.map((subcat, id) => (
                                                                            <p key={id}>
                                                                                <label>
                                                                                    <Field name="subcategory" type="checkbox" value={subcat.name} />
                                                                                    <span>{subcat.name}</span>
                                                                                </label>
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                )))
                                                            }
                                                        </blockquote>
                                                    </>
                                                )}
                                            </blockquote>
                                        </div>
                                    </>
                                )
                                }
                            </div>
                            <div className="col s12">
                                <ReCAPTCHA
                                    sitekey={`${captcha_secret}`}
                                    onChange={value => {
                                        setFieldValue("recaptcha", value)
                                        setIsRecaptcha(value)
                                    }}
                                />
                            </div>
                            <div className="col s12">
                                <button className="btn red" onClick={getBack}>Previous</button>
                                <button className="btn red" type="submit" disabled={isSubmitting || !isRecaptcha}>Register</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div >
    )
}

export default Step4;