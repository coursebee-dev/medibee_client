import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Axios from 'axios'

export const MentorsDetails = ({ match, auth }) => {
    const [details, setDetails] = useState({})
    const getMentorDetail = async () => {
        const { data } = await Axios.get(`/api/mentors/${match.params.id}`)
        setDetails(data)
    }

    useEffect(() => {
        getMentorDetail()
    }, [])
    useEffect(() => {
        console.log(details)
    }, [details])
    return (
        <>
            {auth.isAuthenticated ? (
                <div className="section">
                    <li>{details.name}</li>
                    <li>{details.email}</li>
                    <li>{details.medicalcollege}</li >
                    <li>{details.position}</li >
                    <li>{details.session}</li >
                    <li>{details.mobileNo}</li >
                    <div>
                        {details.preferred_topic?.map((ptopic, id) => (
                            <li key={id}>{ptopic}</li>
                        ))}
                    </div >
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
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)