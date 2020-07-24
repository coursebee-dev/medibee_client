import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Axios from 'axios'

export const MentorsDetails = ({ match }) => {
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
        <div className="section">
            <li>{details.name}</li>
            <li>{details.email}</li>
            <li>{details.medicalcollege}</li >
            <li>{details.position}</li >
            <li>{details.session}</li >
            <li>{details.mobileNo}</li >
            <div>{details.preferred_topic?.map((ptopic, id) => (
                <li key={id}>{ptopic}</li>
            ))}</div >
            <div>{details.subject_level?.map((slevel, id) => (
                <li key={id}>{slevel}</li>
            ))}</div>
            <div>{details.subjects?.map((sub, id) => (
                <li key={id}>{sub}</li>
            ))}</div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps)(MentorsDetails)
