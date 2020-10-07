import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import axios from "axios";

class Subjects extends Component {
  constructor() {
    super();
    this.state = {
      subject: "",
      selectedcategory: "",
      category: "",
      subcategory: "",
      subjects: [],
      categories: [],
    };
    this.GetSubjects = this.GetSubjects.bind(this);
    this.GetCategories = this.GetCategories.bind(this);
    this.AddCategory = this.AddCategory.bind(this);
    this.AddSubject = this.AddSubject.bind(this);
    this.AddSubCategory = this.AddSubCategory.bind(this);
  }

  async GetSubjects() {
    try {
      const { data } = await axios.get("/api/admin/subject");
      this.setState({ subjects: data });
    } catch (error) {
      console.log(error);
    }
  }

  async GetCategories() {
    try {
      const { data } = await axios.get("/api/admin/category");
      this.setState({ categories: data });
    } catch (error) {
      console.log(error);
    }
  }

  async AddSubject(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/subject/add", {
        name: this.state.subject,
        category: this.state.selectedcategory,
      });
      this.GetSubjects();
      M.toast({ html: data.message });
    } catch (error) {
      console.log(error);
    }
  }

  async AddCategory(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/category/add", {
        name: this.state.category,
      });
      M.toast({ html: data.message });
      this.GetCategories();
    } catch (error) {
      console.log(error);
    }
  }

  async AddSubCategory(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/admin/subject/addSubcategory/${e.target.value}`,
        {
          name: this.state.subcategory,
        }
      );
      M.toast({ html: data.message });
      this.GetSubjects();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    M.Modal.init(this.Modal);
    M.Modal.init(this.Modal2);
    M.Modal.init(this.Modal3);
    M.FormSelect.init(this.Select);
    this.GetSubjects();
    this.GetCategories();
    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div style={{ minWidth: "300px" }} className="card">
            <div className="card-content">
              <div className="row">
                <span className="col card-title">Subject Categories</span>
                <a
                  className="btn secondary-content btn-small red modal-trigger"
                  href="#categorymodal"
                >
                  Add
                </a>
                <div
                  ref={(Modal2) => {
                    this.Modal2 = Modal2;
                  }}
                  id="categorymodal"
                  className="modal"
                >
                  <button className="secondary-content white btn-floating">
                    <i className="secondary-content material-icons red-text modal-close">
                      close
                    </i>
                  </button>
                  <div className="modal-content">
                    <h4>Add a subject category</h4>
                    <div className="section">
                      <form>
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              id="category_name"
                              onChange={(e) =>
                                this.setState({ category: e.target.value })
                              }
                              type="text"
                              className="validate"
                            />
                            <label className="active" htmlFor="category_name">
                              Category Name
                            </label>
                          </div>
                          <div className="input-field col s12">
                            <button className="btn" onClick={this.AddCategory}>
                              Add Category
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="collection">
                {this.state.categories.map((categories) => (
                  <li key={categories._id} className="collection-item">
                    {categories.name}
                    <span
                      style={{ cursor: "pointer" }}
                      className="secondary-content material-icons red-text"
                    >
                      close
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="section">
          <div style={{ minWidth: "300px" }} className="card">
            <div className="card-content">
              <div className="row">
                <span className="col card-title">Subjects</span>
                <a
                  className="btn secondary-content btn-small red modal-trigger"
                  href="#subjectmodal"
                >
                  Add
                </a>
                <div
                  ref={(Modal) => {
                    this.Modal = Modal;
                  }}
                  id="subjectmodal"
                  className="modal"
                >
                  <button className="secondary-content white btn-floating">
                    <i className="secondary-content material-icons red-text modal-close">
                      close
                    </i>
                  </button>
                  <div className="modal-content">
                    <h4>Add a subject</h4>
                    <div className="section">
                      <form>
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              id="subject_name"
                              type="text"
                              className="validate"
                              onChange={(e) =>
                                this.setState({ subject: e.target.value })
                              }
                            />
                            <label className="active" htmlFor="subject_name">
                              Subject Name
                            </label>
                          </div>
                          <div className="col s12">
                            <select
                              className="browser-default"
                              ref={(Select) => {
                                this.Select = Select;
                              }}
                              onChange={(e) =>
                                this.setState({
                                  selectedcategory: e.target.value,
                                })
                              }
                            >
                              <option value="0" disabled selected>
                                Choose your option
                              </option>
                              {this.state.categories.map((categories, id) => (
                                <option
                                  key={categories._id}
                                  value={categories.name}
                                >
                                  {categories.name}
                                </option>
                              ))}
                            </select>
                            <label>Select category</label>
                          </div>
                          <div className="input-field col s12">
                            <button
                              className="btn modal-close"
                              onClick={this.AddSubject}
                            >
                              Add Subject
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="section">
                {this.state.subjects.map((subjects) => (
                  <div key={subjects._id} className="card horizontal">
                    <div className="card-stacked">
                      <div className="card-content">
                        <span className="card-title">
                          {subjects.name}{" "}
                          <span className="blue black-text badge">
                            {subjects.category}
                          </span>
                        </span>
                      </div>
                      <hr />
                      <div className="card-content">
                        {subjects.subcategory?.map((subcategories) => (
                          <a
                            className="chip blue"
                            href="#!"
                            key={subcategories._id}
                          >
                            {subcategories.name}
                          </a>
                        ))}
                        <div className="row">
                          <div className="input-field col">
                            <input
                              ref={(subcat) => (this.subcat = subcat)}
                              id="subcategory_name"
                              onChange={(e) =>
                                this.setState({ subcategory: e.target.value })
                              }
                              type="text"
                              className="validate"
                            />
                            <label
                              className="active"
                              htmlFor="subcategory_name"
                            >
                              Subcategory Name
                            </label>
                          </div>
                          <div className="input-field col">
                            <button
                              value={subjects._id}
                              onClick={this.AddSubCategory}
                              className="btn btn-small red"
                            >
                              Add subcategory
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Subjects.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Subjects);
