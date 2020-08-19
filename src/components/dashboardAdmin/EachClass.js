import React, { useState, useEffect } from 'react'
import axios from 'axios';
import M from "materialize-css"

export default function EachClass({ classes, id, classid }) {
    const [edit, setEdit] = useState(false)
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [duration, setDuration] = useState("")

    const updateSchedule = async () => {
        try {
            const { data } = await axios.post(`/api/admin/liveclass/updateschedule/${classid}/${id}`, {
                date: date,
                time: time,
                duration: duration
            })
            M.toast({ html: data.message })
        } catch (error) {
            M.toast({ html: error.message })
            //console.log(error.message)
        }
    }
    useEffect(() => {
        setTime(classes.time)
        setDate(classes.date)
        setDuration(classes.duration)
    }, [classes])
    return (
        <div style={{ border: "4px solid #EE6E73", padding: "10px", marginBottom: "10px" }}>
            <h6>Class no. : {id + 1}</h6>
            {edit ? (
                <>
                    <input type="date" defaultValue={date} onChange={e => setTime(e.target.value)} />
                    <input type="time" defaultValue={time} onChange={e => setDate(e.target.value)} />
                    <input type="number" defaultValue={duration} onChange={e => setDuration(e.target.value)} />
                </>
            ) : (
                    <>
                        <p>Start Time: {new Date(classes.date + "T" + classes.time).toLocaleString()} </p>
                        <p>Duration : {classes.duration}</p>
                    </>
                )}
            <button className="btn-small blue" onClick={() => setEdit(!edit)}>{edit ? (<>Cancel</>) : (<>Edit</>)}</button>
            {edit ? (<button style={{ margin: "10px" }} className="btn-small blue" onClick={updateSchedule}>Update</button>) : null}
        </div>
    )
}
