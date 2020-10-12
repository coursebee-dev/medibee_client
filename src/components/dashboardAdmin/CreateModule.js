import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import M from "materialize-css";
function ClassList({ topics }) {
  const [liveclasses, setLiveclasses] = useState();
  const getLiveClasses = async () => {
    try {
      const { data } = await axios.get("api/admin/liveclasses");
      setLiveclasses(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getLiveClasses();
    // eslint-disable-next-line
  }, []);
  return (
    <ul className="collection">
      {liveclasses &&
        liveclasses
          .filter((lc) => topics.includes(lc._id))
          .map((tp, id) => (
            <li key={id} className="collection-item">
              {id + 1}) {tp.topic}
            </li>
          ))}
    </ul>
  );
}

export default function CreateModule() {
  const [liveclasses, setLiveClasses] = useState([]);
  const [classquery, setClassquery] = useState("");
  const history = useHistory();
  const API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
  const getLiveClasses = async () => {
    try {
      const { data } = await axios.post("/api/admin/allliveclass/filter", {
        classquery: classquery,
      });
      setLiveClasses(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLiveClasses();
    // eslint-disable-next-line
  }, [classquery]);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <Formik
            initialValues={{
              title: "",
              description: "",
              moduleclasses: [],
              price: "",
              fakeprice: "",
              type: "liveclassmodule",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Title must be added!";
              }
              if (!values.description) {
                errors.description = "Description must be added!";
              }
              if (!values.price) {
                errors.price = "You must set a price!";
              }
              if (!values.fakeprice) {
                errors.fakeprice = "You must set fake price!";
              }
              if (
                values.moduleclasses === undefined ||
                values.moduleclasses.length === 0
              ) {
                errors.moduleclasses =
                  "You must include some moduleclasses in this module!";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                const { data } = await axios.post(
                  "/api/admin/createmodule",
                  values
                );
                M.toast({ html: data.message });
                history.push("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="row">
                <div className="input-field col s6">
                  <span className="required-field">Title</span>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Module title"
                  />
                  <ErrorMessage
                    name="title"
                    render={(msg) => <span className="red-text">{msg}</span>}
                  />
                </div>
                <div className="input-field col s12">
                  <span className="required-field">Description</span>
                  <Editor
                    apiKey={API_KEY}
                    init={{
                      height: 300,
                      menubar: "edit insert format table tools help",
                      plugins: [
                        " autolink media lists link charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime table paste code wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",
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
                <div className="input-field col s12">
                  <span>Search for liveclasses here</span>
                  <input
                    type="text"
                    onChange={(e) => setClassquery(e.target.value)}
                  />
                </div>
                <section>
                  <div
                    className="col s12 m6"
                    style={{
                      maxHeight: "300px",
                      marginTop: "20px",
                      overflow: "auto",
                      position: "relative",
                    }}
                  >
                    <h6>Select live classes</h6>
                    {liveclasses?.map((lc, id) => (
                      <p key={id}>
                        <label>
                          <Field
                            type="checkbox"
                            name="moduleclasses"
                            value={lc._id}
                          />
                          <span>{lc.topic}</span>
                        </label>
                      </p>
                    ))}
                  </div>
                </section>
                <section>
                  <div
                    className="col s12 m6"
                    style={{
                      height: "300px",
                      marginTop: "20px",
                      overflow: "auto",
                      position: "relative",
                    }}
                  >
                    <h6>Bundle live classes</h6>
                    <ClassList topics={values.moduleclasses} />
                  </div>
                </section>
                <div className="input-field col s6">
                  <span className="required-field">Price</span>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price of module"
                    min="0"
                  />
                  <ErrorMessage
                    name="price"
                    render={(msg) => <span className="red-text">{msg}</span>}
                  />
                </div>
                <div className="input-field col s6">
                  <span className="required-field">Fake Price</span>
                  <Field
                    type="number"
                    id="fakeprice"
                    name="fakeprice"
                    placeholder="Fake Price of module"
                    min="0"
                  />
                  <ErrorMessage
                    name="fakeprice"
                    render={(msg) => <span className="red-text">{msg}</span>}
                  />
                </div>

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
