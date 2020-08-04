import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
<<<<<<< HEAD
import Axios from 'axios'
import Breadcrumbs from "../layout/Breadcrumbs";
=======
import axios from 'axios';
>>>>>>> dc009916006d12f2b2d067c29d5aa6b63e8248f4

export const MentorsDetails = ({ match, auth }) => {
    const [details, setDetails] = useState({})
    const [subject, setSubject] = useState([])
    const getSubject = async () => {
        try {
            const { data } = await axios.get("/api/admin/subject")
            setSubject(data)
        } catch (error) {
            console.log(error)
        }

<<<<<<< HEAD
    useEffect( () => {
        const getMentorDetail = async () => {
            const { data } = await Axios.get(`/api/mentors/${match.params.id}`);
            setDetails(data)
        };
=======
    }

    const getMentorDetail = async () => {
        try {
            const { data } = await axios.get(`/api/mentors/${match.params.id}`)
            setDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSubject()
>>>>>>> dc009916006d12f2b2d067c29d5aa6b63e8248f4
        getMentorDetail()
    }, []);

    useEffect(() => {
        console.log(details)
    }, [details]);
    return (
<<<<<<< HEAD
        <>
            <Breadcrumbs title="Mentors Details" description="Mentor Details" />
            <div className="container">
                {auth.isAuthenticated ? (
                    <div className="section">
                        <h2 className="center-align">{details.name}</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <h5><b>Email : </b>{details.email}</h5>
                                <h5><b>Medical College : </b>{details.medicalcollege}</h5>
                                <h5><b>Position : </b>{details.position}</h5>
                                <h5><b>Session : </b>{details.session}</h5>
                                <h5><b>Mobile No : </b>{details.mobileNo}</h5>
                            </div>
                        </div>

                        <div>
                            {details.preferred_topic?.map((ptopic, id) => (
                                <li key={id}>{ptopic}</li>
                            ))}
                        </div>
                        <div>
                            {details.subject_level?.map((slevel, id) => (
                                <li key={id}>{slevel}</li>
                            ))}
                        </div>
                        <div>
                            {details.subjects?.map((sub, id) => (
                                <li key={id}>{sub.subject}</li>
                            ))}
                        </div>
                        <div>
                            {details.subjects?.map((sub, id) => (
                                <li key={id}>{sub.subcategory}</li>
                            ))}
                        </div>

=======
        <div className="container">
            {auth.isAuthenticated ? (
                <div className="section">
                    <img src={details.propicurl} style={{ height: "300px" }} alt={details.name} />
                    <h1>{details.name}</h1>
                    <h4><b>Institution: </b>{details.medicalcollege}</h4 >
                    <h5><b>Position/Designation: </b>{details.position}</h5 >
                    <h6><b>Session: </b>{details.session}</h6 >
                    <b>Contact:</b>
                    <br />
                    <span>Email: {details.email}</span>
                    <br />
                    <span>Phone no.: {details.mobileNo}</span>

                    <h5>Subjects:</h5>
                    {subject.filter(sub => {
                        return details.subject?.includes(sub._id)
                    }).map((s, id) => (
                        <React.Fragment key={id}>
                            <h6>{id + 1}</h6>
                            {s.subcategory.map(subcat => {
                                return details.subcategory?.includes(subcat.name)
                            }).map((sc, id) => (
                                <React.Fragment key={id}>
                                    <span>{sc.name}</span>
                                </React.Fragment>
                            ))}
                            <br />
                            <span>Academic level: {s.name}</span>
                            <br />
                            <span>Subject level: {s.category}</span>
                        </React.Fragment>
                    ))}

                    <div>
                        {details.subcategory?.map((subcat, id) => (
                            <span key={id}>{subcat}</span>
                        ))}
>>>>>>> dc009916006d12f2b2d067c29d5aa6b63e8248f4
                    </div>
                ) : (
                    <div className="container">
                        <div className="section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                            <h1>You must login to view this page.</h1>
                            <Link to={"/login"} className="btn btn-large waves-effect hoverable blue darken-1" style={{ maxWidth: "200px" }}>Login</Link>
                        </div>
                    </div>
                )}
<<<<<<< HEAD
            </div>
        </>
=======
        </div>
>>>>>>> dc009916006d12f2b2d067c29d5aa6b63e8248f4
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)