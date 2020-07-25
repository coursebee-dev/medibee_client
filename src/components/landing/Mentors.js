import React, { useState, useEffect } from 'react';
import HeaderImg from "../layout/HeaderImg";
import { Link } from "react-router-dom";
import axios from 'axios';
import profile from "../../images/profile.png"
import Breadcrumbs from "../layout/Breadcrumbs";

function Mentors() {
    const [mentors, setMentors] = useState([])
    const getmentors = async () => {
        try {
            const { data } = await axios.get('/api/mentors');
            setMentors(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getmentors()
    }, [])
    return (
        <div>
            <Breadcrumbs title="Mentors" description="All dedicated mentors" />
            <div className="section">
                <div className="container"  style={{ padding: "35px 0" }}>
                    <div className="row">
                        {mentors.map((mentor, id) => (
                            <div key={id} className="card col s6 m4 center-align">
                                 <div className="card-image">
                                    <img src={profile} alt="profile" className="mentors"/>
                                </div>
                                <div className="card-content">
                                    <h5>{mentor.name}</h5>
                                    <p>{mentor.medicalcollege}</p>
                                    <p>{mentor.position}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={`/mentors/details/${mentor._id}`} className="btn btn-large waves-effect hoverable teal darken-1">Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Mentors;