import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Axios from 'axios'
import Breadcrumbs from "../layout/Breadcrumbs";

export const MentorsDetails = ({ match, auth }) => {
    const [details, setDetails] = useState({})

    useEffect( () => {
        const getMentorDetail = async () => {
            const { data } = await Axios.get(`/api/mentors/${match.params.id}`);
            setDetails(data)
        };
        getMentorDetail()
    }, []);

    useEffect(() => {
        console.log(details)
    }, [details]);
    return (
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
        </>
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)