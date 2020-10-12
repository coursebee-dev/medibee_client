import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import M from "materialize-css";
export default function StudentRoles() {
  const [addRoles, setAddRoles] = useState(false);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const addroles = async (roleobject) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/addroles", roleobject);
      M.toast({ html: data.message });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  const getRoles = async () => {
    try {
      const { data } = await axios.get("/api/admin/roles");
      setRole(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getRoles();
  });
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "60px" }}>
        <button
          className="btn btn-small red"
          onClick={() => setAddRoles((role) => !role)}
        >
          {addRoles ? "Cancel" : "Add a role"}
        </button>
        {addRoles ? (
          <div className="col s12">
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Role name is required.";
                }
                if (!values.description) {
                  errors.description = "Role description is required.";
                }
                return errors;
              }}
              onSubmit={(values) => {
                addroles(values);
                setAddRoles(false);
                getRoles();
              }}
            >
              {() => (
                <Form className="row">
                  <div className="input-field col s12 m6">
                    <span className="required-field">Role name</span>
                    <Field type="text" name="name" placeholder="Role name" />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <span className="required-field">Role description</span>
                    <Field
                      type="text"
                      name="description"
                      placeholder="Role description"
                    />
                    <ErrorMessage
                      name="description"
                      render={(msg) => <span className="red-text">{msg}</span>}
                    />
                  </div>
                  <button
                    disabled={loading}
                    className="btn btn-small"
                    type="submit"
                  >
                    Add Roles
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <>
            {role.map((r, id) => (
              <React.Fragment key={id}>
                <div>{r.name}</div>
                <div>{r.description}</div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
