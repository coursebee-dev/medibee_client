import React, { useState } from "react";
import { Link } from "react-router-dom";
import EachClass from "./EachClass";

export default function EachLiveCLass({
  setPrice,
  onChange,
  liveClass,
  onApproveClick,
}) {
  const [view, setView] = useState(false);

  const viewClasses = () => {
    setView((v) => !v);
  };

  return (
    <li className="collection-item">
      <div className="row secondary-content">
        <p className="col">
          Approval Status :<br />
          {liveClass?.approved ? (
            <span> Approved</span>
          ) : (
            <span className="red-text">
              {" "}
              Waiting Approval
              <br />
              <br />
              <button
                onClick={onApproveClick(liveClass?._id)}
                className="btn btn-small waves-effect waves-light hoverable black"
              >
                Approve
              </button>
            </span>
          )}
        </p>
        <Link
          to={`/liveclass/${liveClass?._id}`}
          className=" btn btn-small blue col"
        >
          View Details
        </Link>
      </div>
      <h6>Topic : </h6>
      {liveClass?.topic}
      {/* <div dangerouslySetInnerHTML={{ __html: liveClass.description }} /> */}
      {/* <p>Start Time: {new Date(liveClass.start_date).toLocaleTimeString()} </p>
                <p>Duration : {liveClass.duration}</p> */}
      <p>Type: {liveClass?.class_type}</p>
      {liveClass?.approved ? (
        <button
          className="btn btn-small waves-effect waves-light hoverable red darken-1 black-text"
          onClick={() => window.open(liveClass.zoomStartLink, "_blank")}
        >
          Start Class
        </button>
      ) : null}
      <button className="btn btn-small blue" onClick={viewClasses}>
        View Class Times
      </button>
      {view ? (
        <>
          <h6>Class Times:</h6>
          {liveClass?.classtimes.map((classes, id) => (
            <EachClass
              classes={classes.classtimestring}
              id={classes._id}
              classid={liveClass?._id}
              duration={liveClass?.duration}
              key={id}
            />
          ))}
        </>
      ) : null}
      {liveClass?.class_type === "Free" ? null : (
        <>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="input-field col s6">
              <input
                name="price"
                onChange={onChange}
                id="price"
                type="number"
                min="0"
                className="validate"
              />
              <label htmlFor="price">Price</label>
            </div>
            <div className="input-field col s6">
              <input
                name="fakeprice"
                onChange={onChange}
                id="fakeprice"
                type="number"
                min="0"
                className="validate"
              />
              <label htmlFor="fakeprice">Discount price</label>
            </div>
          </div>
          <button
            value={liveClass?._id}
            onClick={setPrice}
            className="blue btn btn-small"
          >
            Set Price
          </button>
        </>
      )}
    </li>
  );
}
