import React,{Component} from 'react';
import M from "materialize-css";
import axios from "axios";


class QuesBankCategory extends Component{
    constructor() {
        super();
        this.state = {
            subject: "",
            category: "",
            course: "",
            categories: [],
            courses: [],
        };

        this.GetCategories = this.GetCategories.bind(this);
        this.AddCategory = this.AddCategory.bind(this);
        this.AddCourse = this.AddCourse.bind(this);
        this.GetCourses = this.GetCourses.bind(this);
    }

    componentDidMount() {
        M.Modal.init(this.Modal1);
        M.Modal.init(this.Modal2);
        M.FormSelect.init(this.Select)
        this.GetCategories();
        this.GetCourses()
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    async AddCategory(e)  {
        e.preventDefault();
        console.log("add", this.state.category);

        try {
            const { data } = await axios.post("/api/admin/questionBank/category/add", {
                name: this.state.category,
                course : e.target.value
            });
            this.GetCourses()
            M.toast({ html: data.message })
        } catch (error) {
            console.log(error)
        }
    };

    async GetCategories() {
        try {
            const { data } = await axios.get("/api/admin/questionBank/category");
            console.log("data",data);
            this.setState({ categories: data })
            console.log("state changed")
        } catch (error) {
            console.log(error)
        }
    }

    async AddCourse(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admin/questionBank/course/add", {
                name: this.state.course
            });
            M.toast({ html: data.message });
            this.GetCourses()
        } catch (error) {
            console.log(error)
        }
    }

    async GetCourses() {
        try {
            const { data } = await axios.get("/api/admin/questionBank/course");
            console.log("courses",data);
            this.setState({ courses: data })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <div className="section">
                    <div style={{ minWidth: "300px" }} className="card">
                        <div className="card-content">
                            <div className="row">
                                <span className="col card-title">Subject Categories</span>
                                <a className="btn secondary-content btn-small red modal-trigger" href="#courseModal">Add</a>


                                <div ref={Modal1 => {
                                    this.Modal1 = Modal1;
                                }} id="courseModal" className="modal">
                                    <button className="secondary-content white btn-floating"><i className="secondary-content material-icons red-text modal-close">close</i></button>
                                    <div className="modal-content">
                                        <h4>Add a Course</h4>
                                        <div className="section">
                                            <form>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input id="course_name" className="validate" type="text" onChange={e => this.setState({ course: e.target.value })} />
                                                        <label className="active" htmlFor="course_name">Course Name</label>
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <button className="btn" onClick={this.AddCourse} >Add Course</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>



                                <div ref={Modal2 => {
                                    this.Modal2 = Modal2;
                                }} id="categorymodal" className="modal">
                                    <button className="secondary-content white btn-floating"><i className="secondary-content material-icons red-text modal-close">close</i></button>
                                    <div className="modal-content">
                                        <h4>Add a subject category</h4>
                                        <div className="section">
                                            <form>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input id="category_name" className="validate" type="text" onChange={e => this.setState({ category: e.target.value })} />
                                                        <label className="active" htmlFor="category_name">Category Name</label>
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <button className="btn" onClick={this.AddCategory} >Add Category</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <ul className="collection">
                                {this.state.courses.map(course => (
                                    <li key={course._id} className="collection-item">{course.name}<span style={{ cursor: "pointer" }} className="secondary-content material-icons red-text">close</span></li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    <ul className="section">
                        {this.state.courses.map(course => (
                            <div key={course._id} className="card horizontal">

                                <div className="card-stacked">
                                    <div className="card-content">
                                        <span className="card-title">{course.name}</span>
                                    </div>
                                    <hr />
                                    <div className="card-content">
                                        {course.subjects?.map(subject => (
                                            <a className="chip blue" href="#!" key={subject._id}>
                                                {subject.name}
                                            </a>
                                        ))}
                                        <div className="row">
                                            <div className="input-field col">
                                                <input id="subcategory_name" onChange={e => this.setState({ category: e.target.value })} type="text" className="validate" />
                                                <label className="active" htmlFor="subcategory_name">Subject Name</label>
                                            </div>
                                            <div className="input-field col">
                                                <button value={course._id} onClick={this.AddCategory} className="btn btn-small red">Add Subject</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>


                </div>
            </div>
        );
    }

}

export default QuesBankCategory;