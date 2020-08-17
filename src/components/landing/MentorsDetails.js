import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios';
import Breadcrumbs from "../layout/Breadcrumbs";

export const MentorsDetails = ({ match, auth }) => {
    const [details, setDetails] = useState({})
    const [subject, setSubject] = useState([])
    const getSubject = async () => {
        try {
            const { data } = await axios.get("/api/admin/subject");
            setSubject(data)
        } catch (error) {
            console.log(error)
        }
    };

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
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        console.log(details)
    }, [details])
    return (
        <>
            <Breadcrumbs title="Mentor Details" description="Know more about our mentor" />
            <div className="container">
                {auth.isAuthenticated ? (
                    <>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col m6">
                                <div className="section">
                                    <h1 className="center-align">{details.name}</h1>
                                    <h4>{details.medicalcollege}</h4 >
                                    <h5>{details.position}</h5 >
                                    <h6><b>Session: </b>{details.session}</h6 >
                                    <h5><u>Contact</u></h5>
                                    <span><b>Email:</b> {details.email}</span>
                                    <br />
                                    <span><b>Phone no:</b> {details.mobileNo}</span>


                                </div>
                            </div>
                            <div className="col m6 center-align">
                                <img src={details.propicurl} className="" style={{ width: "300px", height: "300px" }} alt={details.name} />
                            </div>

                        </div>
                        <h4 className="center-align">Subjects</h4>
                        <div className="row">
                            {subject.filter(sub => {
                                return details.subject?.includes(sub._id)
                            }).map((s, id) => (
                                <div className="col m3 s6" key={id}>
                                    <div className="card z-depth-2">
                                        <div className="card-content">

                                            {s.subcategory.map(subcat => {
                                                return details.subcategory?.includes(subcat.name)
                                            }).map((sc, id) => (
                                                <React.Fragment key={id}>
                                                    <span>{sc.name}</span>
                                                </React.Fragment>
                                            ))}
                                            <br />
                                            <span><b>Academic level:</b> {s.name}</span>
                                            <br />
                                            <span><b>Subject level:</b> {s.category}</span>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {details.subcategory?.map((subcat, id) => (
                                <span className="alert" key={id}>{subcat}</span>
                            ))}
                        </div>
                    </>
                ) : (
                        <div className="container">
                            <div className="section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                                <h1>You must login to view this page.</h1>
                                <Link to={"/login"} className="btn btn-large waves-effect hoverable blue darken-1" style={{ maxWidth: "200px" }}>Login</Link>
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)
