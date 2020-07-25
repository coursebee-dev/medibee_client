import React, { useState, useEffect } from 'react';
import HeaderImg from "../layout/HeaderImg";
import { Link } from "react-router-dom";
import axios from 'axios';
import profile from "../../images/profile.png"
import Breadcrumbs from "../layout/Breadcrumbs";

function Mentors() {
    const [mentors, setMentors] = useState([])
    const [subject, setSubject] = useState([])
    const [category, setCategory] = useState([])
    const getmentors = async () => {
        try {
            const { data } = await axios.get('/api/mentors');
            setMentors(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getfilteredmentors = async (e) => {
        try {
            const { data } = await axios.post('/api/mentor/filter', {
                target: e.target.id,
                value: e.target.value
            });
            setMentors(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSubject = async () => {
        try {
            const { data } = await axios.get("/api/admin/subject")
            setSubject(data)
        } catch (error) {
            console.log(error)
        }

    }

    const getCategory = async () => {
        try {
            const { data } = await axios.get("/api/admin/category")
            setCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getmentors()
        getSubject()
        getCategory()
    }, [])
    return (
        <div>
            <Breadcrumbs title="Mentors" description="All dedicated mentors" />
            <div className="section">
                <div className="container" style={{ padding: "35px 0" }}>
                    <div className="row">
                        <div className="section">
                            <button onClick={getmentors} className="btn btn-large red">All mentors</button>
                            {category.map(cat => (
                                <button key={cat._id} id="category" onClick={getfilteredmentors} value={cat.name} className="btn btn-large red">{cat.name}</button>
                            ))}
                        </div>
                        <div className="section">
                            {subject.map(sub => (
                                <button key={sub._id} id="subject" onClick={getfilteredmentors} value={sub.name} className="btn red">{sub.name}</button>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} className="section">
                            {subject.map(sub => (
                                <div style={{ display: "flex", flexDirection: "row", }} key={sub._id}>
                                    {sub.subcategory?.map((subcat, id) => (
                                        <button key={id} id="subcategory" onClick={getfilteredmentors} value={subcat.name} className="btn red">{subcat.name}</button>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {mentors.map((mentor, id) => (
                            <div key={id} className="card col s6 m4 center-align">
                                <div className="card-image">
                                    <img src={profile} alt="profile" className="mentors" />
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