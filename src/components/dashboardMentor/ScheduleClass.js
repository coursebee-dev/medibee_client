import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropbox } from "dropbox";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import "../../App.css";
import moment from "moment";
import isofetch from 'isomorphic-fetch';


var dbx = new Dropbox({
  accessToken:
    "sl.AjZZTe_5c5HIm68HF4Omz3GMxpRijxvIqj_eMQzCaDXIS5nHx1vrEU-Nf0bursBjZa5qNLtuHb_RhzEAvmFtje0EIx3iGS9XOvgzx1pYfLVxMor4iPf-vLdyccxVWS-H9dOZmUQi"
  ,
  fetch: isofetch
});

class ScheduleClass extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      selectedliveclasslevel: [],
      selectedsubject: [],
      selectedsubcategories: [],
      categories: [],
      subjects: [],
      desurl: "",
      errors: {},
    };
    this.getSubjects = this.getSubjects.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.uploadfiles = this.uploadfiles.bind(this)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  async getSubjects() {
    try {
      const { data } = await axios.get("/api/admin/subject");
      this.setState({ subjects: data });
      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  async getCategories() {
    try {
      const { data } = await axios.get("/api/admin/category");
      this.setState({ categories: data });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.auth.user.adminVerify === false) {
      this.props.history.push("mentor/dashboard");
    }
    this.getCategories();
    this.getSubjects();
    //console.log(this.state)
  }
  handleUploadChange = async e => {
    let { files } = e.target;
    const body = new FormData()
    body.append('upload_preset', "enxcncgu")
    body.append("file", files[0])
    body.append("folder", "mentors/najishm828282@gmail.com/medibee/liveclass/description")

    try {
      const { data } = await axios.post("https://api.cloudinary.com/v1_1/coursebee/upload", body)
      let a = data.url;
      a = a.replace("http://", "https://")
      this.setState({ desurl: a })
    } catch (err) {
      console.log(err)
    }
  }

  uploadfiles = async () => {
  }


  handleEditorChange = (content) => {
    console.log("Content was updated:", content);
    this.setState({ description: content });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    // eslint-disable-next-line
    const { errors } = this.state;
    let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
    return (
      <div className="container">
        <div
          style={{ marginTop: "8rem", marginBottom: "8rem" }}
          className="row"
        >
          <div className="col s12">
            <Formik
              initialValues={{
                topic: "",
                class_type: "",
                schedule_type: true,
                start_date: "",
                end_date: "",
                week_day: "",
                classtime: "",
                classtimes: [],
                duration: 0,
                academicExcellence: "",
                description: "",
                liveclasslevel: [],
                liveclassSubject: [],
              }}
              validate={(values) => {
                const errors = {};
                if (!values.topic) {
                  errors.topic = "Class topic name is required!";
                }

                if (!values.description) {
                  errors.description = "Class description is required!";
                }

                if (!values.class_type) {
                  errors.class_type = "Select class type!";
                }

                if (values.schedule_type && !values.start_date) {
                  errors.start_date = "You must select class start date";
                }

                if (values.schedule_type && !values.end_date) {
                  errors.end_date = "You must select class end date";
                }

                if (values.schedule_type && !values.week_day) {
                  errors.week_day = "You must select week days";
                }

                if (values.schedule_type && !values.classtime) {
                  errors.classtime = "You must select class time";
                }

                if (values.schedule_type && !values.duration) {
                  errors.duration = "You must select class duration";
                }

                if (
                  values.classtimes === undefined ||
                  values.classtimes.length === 0
                ) {
                  errors.classtimes =
                    "You must click generate class after setting class time information";
                }

                if (
                  values.liveclasslevel === undefined ||
                  values.liveclasslevel.length === 0
                ) {
                  errors.liveclasslevel =
                    "You must select at least 1 liveclass academic level";
                }

                if (
                  values.liveclassSubject === undefined ||
                  values.liveclassSubject.length === 0
                ) {
                  errors.liveclassSubject =
                    "You must select at least 1 liveclass subject";
                }

                return errors;
              }}
              onSubmit={(values) => {
                const formData = {
                  mentorId: this.props.auth.user.id,
                  topic: values.topic,
                  class_type: values.class_type,
                  description: values.description,
                  price: 0,
                  academicExcellence: values.academicExcellence,
                  selectedliveclasslevel: values.liveclasslevel,
                  selectedsubject: values.liveclassSubject,
                  classtimes: values.classtimes,
                  start_date: values.start_date,
                  end_date: values.end_date,
                  week_day: values.week_day,
                  classtime: values.classtime,
                  duration: values.duration,
                };
                // console.log(formData);
                this.props.scheduleLiveClass(
                  formData,
                  this.props.auth.user.id,
                  this.props.history
                );
              }}
            >
              {({ handleSubmit, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="input-field col s12">
                    <span className="required-field">Topic</span>
                    <Field
                      type="text"
                      id="topic"
                      name="topic"
                      placeholder="Class topic name"
                    />
                    <ErrorMessage
                      name="topic"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div class="file-field col s12 input-field">
                    <div class="btn">
                      <span>Add an image in description</span>
                      <input type="file" onChange={this.handleUploadChange} />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                    <code>{this.state.desurl}</code>
                  </div>
                  <div className="input-field col s12">
                    <span className="required-field">Description</span>
                    <Editor
                      apiKey={API_KEY}
                      init={{
                        height: 500,
                        menubar: "edit insert format table tools help",


                        plugins: [
                          "image autolink lists link charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime table paste code wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",
                        images_upload_handler: (a, s, f) => {
                          alert("Upload is not vailable. Use the upload option before the description field below and paste the link here. ")
                          f()
                        }
                      }}

                      onEditorChange={(desc) =>
                        setFieldValue("description", desc)
                      }
                    />


                    <ErrorMessage
                      name="description"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="col s12">
                    <span className="required-field">Class type </span>
                    <Field
                      id="class_type"
                      name="class_type"
                      className="browser-default"
                      as="select"
                    >
                      <option defaultValue="">Select Type</option>
                      {/*<option value="Open" disabled>Open For All</option>*/}
                      <option value="Free">Free Registration</option>
                      <option value="Paid">Paid Live Class</option>
                    </Field>
                    <ErrorMessage
                      name="class_type"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  {/* <div className="input-field col s12">
                                        <label htmlFor="topic">Topic</label>
                                        <Field type="radio" id="topic" name="topic" placeholder="Class topic name" />
                                        <ErrorMessage name="topic" render={msg => <span className="red-text">{msg}</span>} />
                                    </div> */}
                  <section>
                    <div className="col s12 m6" style={{ marginTop: "20px" }}>
                      <span className="required-field">
                        Select Liveclass Academic Level
                      </span>
                      {this.state.categories?.map((cat) => (
                        <p key={cat._id}>
                          <label>
                            <Field
                              type="checkbox"
                              name="liveclasslevel"
                              value={cat.name}
                            />
                            <span>{cat.name}</span>
                          </label>
                        </p>
                      ))}
                    </div>
                    <br />
                    {values && values.liveclasslevel.length === 0 ? null : (
                      <div
                        className="col s12 m6"
                        style={{
                          maxHeight: "500px",
                          marginTop: "20px",
                          overflow: "scroll",
                          position: "relative",
                        }}
                      >
                        <span className="required-field">
                          Select Liveclass Subjects
                        </span>
                        {this.state.subjects &&
                          this.state.subjects
                            .filter((sub) =>
                              values.liveclasslevel.some((s) =>
                                sub.category.includes(s)
                              )
                            )
                            .map((sub, id) => (
                              <div key={id}>
                                <h5>Subject Category: {sub.name}</h5>
                                <h6>Subject Level: {sub.category}</h6>
                                {sub.subcategory.map((subcat, id) => (
                                  <p key={id}>
                                    <label>
                                      <Field
                                        name="liveclassSubject"
                                        type="checkbox"
                                        value={subcat.name}
                                      />
                                      <span>{subcat.name}</span>
                                    </label>
                                  </p>
                                ))}
                              </div>
                            ))}
                      </div>
                    )}
                  </section>
                  <div className="input-field col s12">
                    <span>Academic Excellence</span>
                    <Field
                      type="text"
                      id="academicExcellence"
                      name="academicExcellence"
                      placeholder="Academic excellence"
                    />
                  </div>
                  <div className="input-field col s12">
                    <p>
                      <label>
                        <Field type="checkbox" name="schedule_type" />
                        <span>Regular class</span>
                      </label>
                    </p>
                  </div>
                  {values.schedule_type ? (
                    <div className="col s12">
                      <div
                        className="section"
                        style={{ padding: "10px", marginBottom: "10px" }}
                      >
                        <span className="required-field">Start Date</span>
                        <Field type="date" id="start_date" name="start_date" />
                        <ErrorMessage
                          name="start_date"
                          render={(msg) => (
                            <span className="red-text">{msg}</span>
                          )}
                        />
                      </div>
                      {values.start_date ? (
                        <div
                          className="section"
                          style={{ padding: "10px", marginBottom: "10px" }}
                        >
                          <span className="required-field">End Date</span>
                          <Field type="date" id="end_date" name="end_date" />
                          <ErrorMessage
                            name="end_date"
                            render={(msg) => (
                              <span className="red-text">{msg}</span>
                            )}
                          />
                        </div>
                      ) : null}
                      {values.end_date ? (
                        <div
                          className="section"
                          style={{ padding: "10px", marginBottom: "10px" }}
                        >
                          <span className="required-field">
                            Select Week Day{" "}
                          </span>
                          <Field
                            id="week_day"
                            name="week_day"
                            className="browser-default"
                            as="select"
                          >
                            <option defaultValue="">
                              Select day of the week
                            </option>
                            {/*<option value="Open" disabled>Open For All</option>*/}
                            <option value={0}>Sunday</option>
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
                          </Field>
                          <ErrorMessage
                            name="week_day"
                            render={(msg) => (
                              <span className="red-text">{msg}</span>
                            )}
                          />
                        </div>
                      ) : null}
                      {values.week_day ? (
                        <div
                          className="section"
                          style={{ padding: "10px", marginBottom: "10px" }}
                        >
                          <span className="required-field">Time</span>
                          <Field type="time" id="classtime" name="classtime" />
                          <ErrorMessage
                            name="classtime"
                            render={(msg) => (
                              <span className="red-text">{msg}</span>
                            )}
                          />
                        </div>
                      ) : null}
                      {values.classtime ? (
                        <div
                          className="section"
                          style={{ padding: "10px", marginBottom: "10px" }}
                        >
                          <span className="required-field">Class duration</span>
                          <Field
                            type="number"
                            id="duration"
                            name="duration"
                            min="0"
                          />
                          <ErrorMessage
                            name="duration"
                            render={(msg) => (
                              <span className="red-text">{msg}</span>
                            )}
                          />
                        </div>
                      ) : null}
                      {values.duration ? (
                        <React.Fragment>
                          <button
                            className="btn orange btn-small"
                            onClick={(e) => {
                              e.preventDefault();
                              let dateArray = [];
                              let startd = values.start_date.toString();
                              let time = values.classtime.toString();
                              let endd = values.end_date.toString();
                              let start = moment(startd + " " + time);
                              let end = moment(endd + " " + time);

                              dateArray.push({
                                classtimestring: start.toISOString(),
                              });
                              let nextday = start.add(1, "d");
                              while (
                                moment(startd).isBefore(endd) &&
                                nextday.isBefore(endd)
                              ) {
                                if (nextday.day() === Number(values.week_day)) {
                                  dateArray.push({
                                    classtimestring: nextday.toISOString(),
                                  });
                                }
                                nextday = start.add(1, "d");
                              }

                              dateArray.push({
                                classtimestring: end.toISOString(),
                              });
                              setFieldValue("classtimes", dateArray);
                            }}
                          >
                            Generate Date
                          </button>
                          <ErrorMessage
                            name="classtimes"
                            render={(msg) => (
                              <span className="red-text">{msg}</span>
                            )}
                          />
                        </React.Fragment>
                      ) : null}
                      <div className="section">
                        {values.classtimes?.map((ct, id) => (
                          <div key={id} style={{ padding: "5px" }}>
                            <p>Class no. {id + 1} : </p>
                            <b>
                              {moment(ct.classtimestring.toString()).format(
                                "LLLL"
                              )}
                            </b>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                      <div className="col s12">
                        <FieldArray
                          name="classtimes"
                          render={({ remove, push }) => (
                            <>
                              {values.classtimes.map((classtimes, index) => (
                                <div
                                  className="section"
                                  style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                    border: "1px solid black",
                                  }}
                                  key={index}
                                >
                                  <span>Start Date</span>
                                  <Field
                                    type="date"
                                    id={`classtimes[${index}.date]`}
                                    name={`classtimes[${index}.date]`}
                                  />
                                  <span>Start Time</span>
                                  <Field
                                    type="time"
                                    id={`classtimes[${index}.time]`}
                                    name={`classtimes[${index}.time]`}
                                  />
                                  <span>Class Duration</span>
                                  <Field
                                    type="number"
                                    id={`classtimes[${index}.duration]`}
                                    name={`classtimes[${index}.duration]`}
                                    min="0"
                                  />
                                  <button
                                    className="btn btn-small red"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                </button>
                                </div>
                              ))}
                              <button
                                className="btn btn-small blue"
                                type="button"
                                onClick={() =>
                                  push({ date: "", time: "", duration: "" })
                                }
                              >
                                Add class date
                            </button>
                            </>
                          )}
                        />
                      </div>
                    )}
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue darken-1"
                    >
                      Schedule
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
ScheduleClass.propTypes = {
  scheduleLiveClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
const mapDispatchToProps = {
  scheduleLiveClass,
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleClass);
