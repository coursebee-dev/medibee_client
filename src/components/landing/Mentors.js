import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
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
            default:
                break;
        }
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
        // eslint-disable-next-line
    }, [mentors])

    useEffect(() => {
        getfilteredmentors()
        // eslint-disable-next-line
    }, [selCategory, selSubject, selSubCategory])

    return (
        <div>
            <Breadcrumbs title="Mentors" description="All dedicated mentors" />
            <div className="section">
                <div className="container" style={{ padding: "35px 0" }}>
                    <div className="row">
                        <div className="col m12 s12 ">
                            <div className="row">
                                <div className="col m3 s12"></div>
                                <div className="col m2 s12 center-align">
                                    <label className="">Academic position</label>
                                    <select onChange={onChange} name="category" className="browser-default" style={{ background: "#ff3535" }}>
                                        <option value="all" >All</option>
                                        {category.map((cat, id) => (
                                            <option key={id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col m2 s12 center-align">
                                    <label className="">Academic level</label>
                                    <select onChange={onChange} name="subject" className="browser-default" style={{ background: "#ff3535" }}>
                                        <option value="all" >All</option>
                                        {subject.map((sub, id) => (
                                            <option key={id} value={sub._id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col m2 s12 center-align">
                                    <label className="">Academic level</label>
                                    <select onChange={onChange} name="subcategory" className="browser-default" style={{ background: "#ff3535" }}>
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
                                <div className="col m3 s12"></div>
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
                                    <div className="col s12 m6 l3">
                                        <div key={id} className="card no-padding center-align card_shadow" style={{ marginTop: "60px" }}>
                                            <div className="card-image">
                                                <img src={mentor.propicurl} alt="profile" className="mentors" />
                                            </div>
                                            <div className="card-content">
                                                <h5>{mentor.name}</h5>
                                                <p>{mentor.medicalcollege}</p>
                                                <p>{mentor.position}</p>
                                            </div>
                                            <div className="card-action" style={{ padding: "5px" }}>
                                                <Link to={`/mentors/details/${mentor._id}`} className="btn hoverable red darken-1 white-text">Details</Link>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        )}


                </div>
            </div>
        </div >
    )
}

export default Mentors;
