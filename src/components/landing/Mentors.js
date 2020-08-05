import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import profile from "../../images/profile.png"
import Breadcrumbs from "../layout/Breadcrumbs";
import { intersection } from 'lodash';

function Mentors() {
    const [mentors, setMentors] = useState([])
    const [filteredMentors, setFilteredMentors] = useState([])
    const [subject, setSubject] = useState([])
    const [category, setCategory] = useState([])
    const [selSubject, setSelSubject] = useState(null)
    const [selCategory, setSelCategory] = useState(null)
    const [selSubCategory, setSelSubCategory] = useState(null)
    const [loading, setLoading] = useState(false)

    const getCategory = async () => {
        try {
            const { data } = await axios.get("/api/admin/category")
            setCategory(data)
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

    const getmentors = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/api/mentors');
            setMentors(data)
            setFilteredMentors(data)
            getCategory()
            getSubject()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onChange = (e) => {
        var { name, value } = e.target;
        switch (name) {
            case "catagory":
                if (value === "all") {
                    setSelCategory(null)
                } else {
                    setSelCategory(value)
                }
                break;
            case "subject":
                if (value === "all") {
                    setSelSubject(null)
                } else {
                    setSelSubject(value)
                }
                break;
            case "subcategory":
                if (value === "all") {
                    setSelSubCategory(null)
                } else {
                    setSelSubCategory(value)
                }
                break;
        }
        // if (name === "catagory") {
        //     if (value === "all") {
        //         setSelCategory(null)
        //     } else {
        //         setSelCategory(value)
        //     }
        // }
        // if (name === "subject") {
        //     if (value === "all") {
        //         setSelSubject(null)
        //     } else {
        //         setSelSubject(value)
        //     }
        // }
        // if (name = "subcategory") {
        //     if (value === "all") {
        //         setSelSubCategory(null)
        //     } else {
        //         setSelSubCategory(value)
        //     }
        // }
    }

    const getfilteredmentors = () => {
        let a = [], b = [], c = [], newMentors;
        if (selCategory) {
            a = mentors.filter(mentor => {
                return mentor.category.includes(selCategory)
            })
        } else {
            a = mentors;
        }
        if (selSubject) {
            b = mentors.filter(mentor => {
                return mentor.subject.includes(selSubject)
            })
        } else {
            b = mentors;
        }
        if (selSubCategory) {
            c = mentors.filter(mentor => {
                return mentor.subcategory.includes(selSubCategory)
            })
        } else {
            c = mentors;
        }

        newMentors = intersection(a, b, c)

        setFilteredMentors(newMentors)
    }


    useEffect(() => {
        getmentors()
    }, [])

    useEffect(() => {
        getfilteredmentors()
    }, [selCategory, selSubject, selSubCategory])

    return (
        <div>
            <Breadcrumbs title="Mentors" description="All dedicated mentors" />
            <div className="section">
                <div className="container" style={{ padding: "35px 0" }}>
                    <div className="row">
                        <div className="section">
                            <div className="card col s12 red">
                                <div className="row col">
                                    <label className="white-text">Academic position</label>
                                    <select onChange={onChange} name="category" className="browser-default">
                                        <option value="all" >All</option>
                                        {category.map((cat, id) => (
                                            <option key={id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row col">
                                    <label className="white-text">Academic level</label>
                                    <select onChange={onChange} name="subject" className="browser-default">
                                        <option value="all" >All</option>
                                        {subject.map((sub, id) => (
                                            <option key={id} value={sub._id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row col">
                                    <label className="white-text">Academic level</label>
                                    <select onChange={onChange} name="subcategory" className="browser-default">
                                        <option value="all" >All</option>
                                        {subject.map((sub, id) => (
                                            <React.Fragment key={id}>
                                                {sub.subcategory.map((subcat, id) => (
                                                    <option key={id} value={subcat.name}>{subcat.name}</option>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="section">
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
                        </div> */}
                        {loading ? (
                            <div className="progress">
                                <div className="indeterminate blue"></div>
                            </div>
                        ) : (
                                <div className="row">
                                    {filteredMentors.map((mentor, id) => (
                                        <div key={id} className="card no-padding col s12 m6 l4 center-align" style={{ marginTop: "60px" }}>
                                            <div className="card-image">
                                                <img src={mentor.propicurl} alt="profile" className="mentors" style={{ minHeight: "220px", minWidth: "220px" }} />
                                            </div>
                                            <div className="card-content">
                                                <h5>{mentor.name}</h5>
                                                <p>{mentor.medicalcollege}</p>
                                                <p>{mentor.position}</p>
                                            </div>
                                            <div className="card-content hoverable blue darken-1">
                                                <Link to={`/mentors/details/${mentor._id}`} className="white-text">Details</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Mentors;