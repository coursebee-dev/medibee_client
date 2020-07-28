import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const dropzoneStyle = {
    borderWidth: 1.5,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: 5,
    height: "100px",
    backgroundColor: "#a5d0e444",
}

function Step3Student({ handleStepThree, getBack, email }) {

    const upload = async (body) => {
        try {
            const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
            return data.url;
        } catch (error) {
            return error
        }
    }
    const getUrls = async (files) => {
        let newArray = []
        files.map(async file => {
            const body = new FormData()
            body.append('upload_preset', "enxcncgu")
            body.append("file", file)
            body.append("folder", "mentors/najishm828282@gmail.com/nid")
            const imagedata = await upload(body);
            newArray.push(imagedata)
        })
        return newArray;
    }
    return (
        <div>
            <Formik
                initialValues={{ idfiles: [], nidfiles: [], idurls: [], nidurls: [] }}
                validate={values => {
                    const errors = {};
                    if (values.idfiles.length > 2) {
                        errors.idfiles = "Only two photos can be selected. Clear ID card files and upload again.";
                    } else if (values.idfiles === undefined || values.idfiles.length === 0) {
                        errors.idfiles = "You must upload your id card photo!";
                    }
                    if (values.nidfiles.length > 2) {
                        errors.nidfiles = "Only two photos can be selected. Clear ID card files and upload again.";
                    }
                    return errors;
                }}
                onSubmit={async values => {
                    values.idurls = await getUrls(values.idfiles)
                    if (!values.idfiles === undefined || !values.idfiles.length === 0) {
                        values.nidurls = await getUrls(values.nidfiles)
                    }
                    handleStepThree(values.idurls, values.nidurls, [])
                }}
            >
                {({ handleSubmit, setFieldValue, values, }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className="row">
                            <span className="col s12">Your Student ID Card (drag images in the box below)</span>
                            <div className="col s12">
                                <Dropzone onDrop={acceptedFiles => {
                                    setFieldValue("idfiles", values.idfiles.concat(acceptedFiles))
                                }}>
                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                        <>
                                            {
                                                isDragActive ?
                                                    <p>Drop the files below ...</p> :
                                                    <p>Drag 'n' drop some below here, or click to select files</p>
                                            }
                                            <div style={dropzoneStyle} {...getRootProps()}>
                                                <div {...getInputProps()} multiple>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Dropzone>
                                {values.idfiles.map((files, id) => (
                                    <li key={id}>{files.name}</li>
                                ))}
                                <button type="reset" onClick={() => setFieldValue("idfiles", [])} className="btn btn-small blue" style={{ marginTop: "10px" }} >Clear ID card files</button>
                                <ErrorMessage name="idfiles" />
                            </div>
                            <span style={{ marginTop: "20px" }} className="col s12">Your NID/passport (optional)</span>
                            <div className="col s12">
                                <Dropzone onDrop={acceptedFiles => {
                                    setFieldValue("nidfiles", values.nidfiles.concat(acceptedFiles))
                                }}>
                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                        <>
                                            {
                                                isDragActive ?
                                                    <p>Drop the files below ...</p> :
                                                    <p>Drag 'n' drop some below here, or click to select files</p>
                                            }
                                            <div style={dropzoneStyle} {...getRootProps()}>
                                                <div {...getInputProps()} multiple>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Dropzone>
                                {values.nidfiles.map((files, id) => (
                                    <li key={id}>{files.name}</li>
                                ))}
                                <button type="reset" onClick={() => setFieldValue("nidfiles", [])} className="btn btn-small blue" style={{ marginTop: "10px" }} >Clear NID/Passport files</button>
                                <ErrorMessage name="nidfiles" />
                            </div>
                            <span style={{ marginTop: "20px" }} className="col s12">N.B.: (You can upload the front and back of your requred documents together on photo or in seperate photos.)</span>
                            <div style={{ marginTop: "20px" }} className="col s12">
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

export default Step3Student;