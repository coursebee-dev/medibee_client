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

function Step3Professional({ handleStepThree, getBack }) {
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
                initialValues={{ nidfiles: [], mbbsfiles: [], bmdcfiles: [], nidurls: [], mbbsurls: [], bmdcurls: [] }}
                validate={values => {
                    const errors = {};
                    // if (values.nidfiles.length > 2) {
                    //     errors.nidfiles = "Only two photos can be selected. Clear NID card/ passport files and upload again.";
                    // } else if (values.nidfiles === undefined || values.idfiles.length === 0) {
                    //     errors.nidfiles = "You must upload your id card photo!";
                    // }
                    // if (values.mbbsfiles.length > 2) {
                    //     errors.mbbsfiles = "Only two photos can be selected. Clear MBBS files and upload again.";
                    // } else if (values.mbbsfiles === undefined || values.mbbsfiles.length === 0) {
                    //     errors.mbbsfiles = "You must upload your MBBS certificate photo!";
                    // }
                    // if (values.bmdcfiles.length > 2) {
                    //     errors.bmdcfiles = "Only two photos can be selected. Clear BMDC files and upload again.";
                    // } else if (values.bmdcfiles === undefined || values.bmdcfiles.length === 0) {
                    //     errors.bmdcfiles = "You must upload your BMDC certificate photo!";
                    // }
                    return errors;
                }}
                onSubmit={async values => {
                    console.log(values)
                    values.nidurls = await getUrls(values.nidfiles)
                    values.mbbsurls = await getUrls(values.mbbsfiles)
                    values.bmdcurls = await getUrls(values.bmdcfiles)
                    handleStepThree(values.nidurls, values.mbbsurls, values.bmdcurls)
                }}
            >
                {({ handleSubmit, setFieldValue, values, }) => (
                    <Form onSubmit={handleSubmit} >
                        <div className="row">
                            <span className="col s12">Your NID Card/passport (drag images in the box below)</span>
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
                                                <input {...getInputProps()} multiple />
                                            </div>
                                        </>
                                    )}
                                </Dropzone>
                                {values.nidfiles.map((files, id) => (
                                    <li key={id}>{files.name}</li>
                                ))}
                                <button type="reset" onClick={() => setFieldValue("nidfiles", [])} className="btn btn-small blue" style={{ marginTop: "10px" }} >Clear NID card/passport files</button>
                                <ErrorMessage name="nidfiles" />
                            </div>
                            <span style={{ marginTop: "20px" }} className="col s12">Your MBBS certificate (drag images in the box below)</span>
                            <div className="col s12">
                                <Dropzone onDrop={acceptedFiles => {
                                    setFieldValue("mbbsfiles", values.mbbsfiles.concat(acceptedFiles))
                                }}>
                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                        <>
                                            {
                                                isDragActive ?
                                                    <p>Drop the files below ...</p> :
                                                    <p>Drag 'n' drop some below here, or click to select files</p>
                                            }
                                            <div style={dropzoneStyle} {...getRootProps()}>
                                                <input {...getInputProps()} multiple />
                                            </div>
                                        </>
                                    )}
                                </Dropzone>
                                {values.mbbsfiles.map((files, id) => (
                                    <li key={id}>{files.name}</li>
                                ))}
                                <button type="reset" onClick={() => setFieldValue("mbbsfiles", [])} className="btn btn-small blue" style={{ marginTop: "10px" }} >Clear MBBS files</button>
                                <ErrorMessage name="mbbsfiles" />
                            </div>
                            <span style={{ marginTop: "20px" }} className="col s12">Your BMDC certificate (drag images in the box below)</span>
                            <div className="col s12">
                                <Dropzone onDrop={acceptedFiles => {
                                    setFieldValue("bmdcfiles", values.bmdcfiles.concat(acceptedFiles))
                                }}>
                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                        <>
                                            {
                                                isDragActive ?
                                                    <p>Drop the files below ...</p> :
                                                    <p>Drag 'n' drop some below here, or click to select files</p>
                                            }
                                            <div style={dropzoneStyle} {...getRootProps()}>
                                                <input {...getInputProps()} multiple />
                                            </div>
                                        </>
                                    )}
                                </Dropzone>
                                {values.bmdcfiles.map((files, id) => (
                                    <li key={id}>{files.name}</li>
                                ))}
                                <button type="reset" onClick={() => setFieldValue("bmdcfiles", [])} className="btn btn-small blue" style={{ marginTop: "10px" }} >Clear BMDC files</button>
                                <ErrorMessage name="bmdcfiles" />
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

export default Step3Professional;