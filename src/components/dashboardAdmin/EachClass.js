import React, { useState } from "react";
import axios from "axios";
import M from "materialize-css";
import moment from "moment";

export default function EachClass({ classes, id, classid, duration }) {
  const [edit, setEdit] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const updateSchedule = async () => {
    //console.log(time, date);
    const changedDate = moment(date + " " + time).toISOString();
    try {
      const { data } = await axios.post(
        `/api/admin/liveclass/updateschedule/${classid}/${id}`,
        {
          changedDate: changedDate,
        }
      );
      M.toast({ html: data.message });
    } catch (error) {
      M.toast({ html: error.message });
      //console.log(error.message)
    }
  };
  return (
    <div
      style={{
        border: "4px solid #EE6E73",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h6>Class no. : {id + 1}</h6>
      {edit ? (
        <>
          <input
            type="date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            defaultValue={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </>
      ) : (
        <>
          <p>Start Time: {new Date(classes).toLocaleString()} </p>
          <p>Duration : {duration}</p>
        </>
      )}
      <button className="btn-small blue" onClick={() => setEdit(!edit)}>
        {edit ? <>Cancel</> : <>Edit</>}
      </button>
      {edit ? (
        <button
          style={{ margin: "10px" }}
          className="btn-small blue"
          onClick={updateSchedule}
        >
          Update
        </button>
      ) : null}
    </div>
  );
}
