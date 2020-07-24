import React, { useState, useEffect } from 'react';
import HeaderImg from "../layout/HeaderImg";
import { Link } from "react-router-dom";
import axios from 'axios';

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
            <HeaderImg />
            <div className="section">
                {mentors.map((mentor, id) => (
                    <div key={id} className="card">
                        {/* <div class="card-image">
                        <img src="images/sample-1.jpg" />
                        <span class="card-title">Card Title</span>
                    </div> */}
                        <div className="card-content">
                            <p>{mentor.name}</p>
                            <p>{mentor.position}</p>
                            <p>{mentor.position}</p>
                        </div>
                        <div className="card-action">
                            <Link to={`/mentors/details/${mentor._id}`} className="btn-flat blue waves-effect">Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Mentors;