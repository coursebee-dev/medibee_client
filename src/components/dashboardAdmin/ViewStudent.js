import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
const ViewStudent = () => {
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState();
  const [name, setName] = useState("");
  const getStudents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/allStudents", {
        name: name,
      });
      setAllStudents(data);
    } catch (error) {
      M.toast({ html: error.message });
    }
    setLoading(false);
  };
  const searchStudents = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, [name]);

  return (
    <div
      className="container"
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Link
        to="/admin/dashboard"
        className="btn-flat waves-effect red darken-1"
        style={{ width: "150px" }}
      >
        <i className="material-icons left">keyboard_backspace</i>Go Back
      </Link>
      <h4 style={{ margin: "50px" }} className="center-align">
        Students of Medibee
      </h4>
      <form onSubmit={getStudents} style={{ maxWidth: "500px" }}>
        <div className="input-field">
          <input
            id="search"
            type="search"
            placeholder="search for students"
            onChange={searchStudents}
            required
          />
          <label className="label-icon" htmlFor="search"></label>
          <i className="material-icons">close</i>
        </div>
      </form>

      {loading ? (
        <div className="progress">
          <div className="indeterminate red"></div>
        </div>
      ) : null}

      <div className="collection">
        {allStudents?.map((student) => (
          <React.Fragment key={student._id}>
            <div className="collection-item">
              <h6>Name : {student.name}</h6>
              <p>Email: {student.email}</p>
              <p>Institution : {student.institution}</p>
              <p>Subject : {student.subject}</p>
            </div>
            <form>
              <label>Browser Select</label>
              <select className="browser-default">
                <option defaultValue="">Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </form>
          </React.Fragment>
        ))}
      </div>

      <Link
        to="/admin/dashboard"
        className="btn-flat waves-effect red darken-1"
        style={{ width: "150px" }}
      >
        <i className="material-icons left">keyboard_backspace</i>Go Back
      </Link>
    </div>
  );
};

export default ViewStudent;
