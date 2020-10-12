import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import M from "materialize-css";
export default function Coupons() {
  const [addCoupon, setAddCoupon] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [studentquery, setStudentquery] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const getRoles = async () => {
    try {
      const { data } = await axios.get("/api/admin/roles");
      setRoles(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCoupons = async () => {
    try {
      const { data } = await axios.get("/api/admin/coupons");
      setCoupons(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStudents = async (name) => {
    try {
      const { data } = await axios.post("/api/admin/allStudents", {
        name: name,
      });
      setAllStudents(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const makeCoupon = async (formdata) => {
    try {
      const { data } = await axios.post("/api/admin/createcoupon", {
        formdata,
      });
      M.toast({ html: data.message });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getRoles();
    getCoupons();
  }, []);

  useEffect(() => {
    getStudents(studentquery);
  }, [studentquery]);

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "60px" }}>
        <button
          className="btn red"
          onClick={() => setAddCoupon((toggle) => !toggle)}
        >
          {addCoupon ? <>Cancel</> : <>Add a coupon</>}
        </button>
        <div className="col s12">
          {addCoupon ? (
            <Formik
              initialValues={{
                name: "",
                code: "",
                discounttype: "",
                discount: "",
                distribution: "",
                roles: [],
                students: [],
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "You must give a coupon name";
                }
                if (!values.code) {
                  errors.code = "You must set a coupon code";
                }
                if (!values.discounttype) {
                  errors.discounttype = "You must set a discount type";
                }
                if (!values.discount) {
                  errors.discount = "You must set a discount";
                }
                if (!values.distribution) {
                  errors.distribution = "You must select who are applicable";
                }
                if (
                  values.distribution !== "everyone" &&
                  (values.distribution === "role" ||
                    values.distribution === "both") &&
                  (values.roles === undefined || values.roles.length === 0)
                ) {
                  errors.roles = "You must select some roles";
                }

                if (
                  values.distribution !== "everyone" &&
                  (values.distribution === "certain" ||
                    values.distribution === "both") &&
                  (values.students === undefined ||
                    values.students.length === 0)
                ) {
                  errors.students = "You must select some students";
                }

                return errors;
              }}
              onSubmit={(values) => {
                //console.log(values);
                setLoading(true);
                makeCoupon(values);
                setAddCoupon((toggle) => !toggle);
                getCoupons();
                setLoading(false);
              }}
            >
              {({ values }) => (
                <Form className="row">
                  <div className="input-field col s12 m6">
                    <span className="required-field">Coupon Name</span>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="give a coupon name"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <span className="required-field">Coupon code</span>
                    <Field
                      type="text"
                      id="code"
                      name="code"
                      placeholder="enter coupon code"
                    />
                    <ErrorMessage
                      name="code"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <span className="required-field">Discount type</span>
                    <p>
                      <label>
                        <Field
                          name="discounttype"
                          type="radio"
                          value="percentage"
                        />
                        <span>Percentage</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <Field name="discounttype" type="radio" value="fixed" />
                        <span>Fixed amount</span>
                      </label>
                    </p>
                    <ErrorMessage
                      name="discounttype"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <span className="required-field">Applicable to</span>
                    <p>
                      <label>
                        <Field name="distribution" type="radio" value="role" />
                        <span>Studets with specific roles</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <Field
                          name="distribution"
                          type="radio"
                          value="certain"
                        />
                        <span>Certain students</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <Field name="distribution" type="radio" value="both" />
                        <span>Both</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <Field
                          name="distribution"
                          type="radio"
                          value="everyone"
                        />
                        <span>Everyone</span>
                      </label>
                    </p>
                    <ErrorMessage
                      name="distribution"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <span className="required-field">Discount amount</span>
                    <Field
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder={
                        values.discounttype === "percentage"
                          ? "Discount amount in percentage"
                          : "Fixed discount amout"
                      }
                      min="0"
                    />
                    <ErrorMessage
                      name="discount"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  {values.distribution === "role" ||
                  values.distribution === "both" ? (
                    <div className="input-field col s12 m6">
                      <span>Select roles applicable for this coupon</span>
                      {roles.map((role, id) => (
                        <p key={id}>
                          <label>
                            <Field
                              type="checkbox"
                              name="roles"
                              value={role._id}
                            />
                            <span>{role.name}</span>
                          </label>
                        </p>
                      ))}
                      <ErrorMessage
                        name="roles"
                        render={(msg) => (
                          <span className="red-text">{msg}</span>
                        )}
                      />
                    </div>
                  ) : null}
                  {values.distribution === "certain" ||
                  values.distribution === "both" ? (
                    <div className="input-field col s12 m6">
                      <span>Select students applicable for this coupon</span>
                      <input
                        type="text"
                        id="students"
                        placeholder="Coupon Code"
                        onChange={(e) => setStudentquery(e.target.value)}
                      />
                      <div
                        style={{
                          maxHeight: "200px",
                          marginTop: "20px",
                          overflow: "scroll",
                          position: "relative",
                        }}
                      >
                        {allStudents.map((student, id) => (
                          <p key={id}>
                            <label>
                              <Field
                                type="checkbox"
                                name="students"
                                value={student._id}
                              />
                              <span>{student.name}</span>
                            </label>
                          </p>
                        ))}
                      </div>
                      <ErrorMessage
                        name="students"
                        render={(msg) => (
                          <span className="red-text">{msg}</span>
                        )}
                      />
                    </div>
                  ) : null}
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      disabled={loading}
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue darken-1"
                    >
                      ADD coupon
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div>
              {coupons?.map((coupon, id) => (
                <div key={id}>{coupon.name}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
