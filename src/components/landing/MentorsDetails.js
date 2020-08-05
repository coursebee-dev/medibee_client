import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios';

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
        getMentorDetail()
    }, [])
    useEffect(() => {
        console.log(details)
    }, [details])
    return (
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
                    </div>
                </div>
            ) : (
                    <div className="container">
                        <div className="section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                            <h1>You must login to view this page.</h1>
                            <Link to={"/login"} className="btn btn-large waves-effect hoverable blue darken-1" style={{ maxWidth: "200px" }}>Login</Link>
                        </div>
                    </div>
                )}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)
