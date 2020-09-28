import React,{Component} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Breadcrumbs from "../layout/Breadcrumbs";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

class Subjects extends Component {
    constructor() {
        super();
        this.state = {
            subjects : [],
            answeredQuestion : []
        }
    }

    componentDidMount() {
        this.fetchSubjects();
        this.fetchStudent()
    }

    fetchSubjects = async () => {
        await axios.get(`/api/admin/questionBank/category`)
            .then(res => {
                this.setState({
                    subjects: res.data
                })
            })
            .catch (error => {
                console.log(error)
            })
    }

    fetchStudent = async () => {
        await axios.get(`/api/questionBank/${this.props.auth.user.id}`)
            .then(res => {
                this.setState({
                    answeredQuestion: res.data
                })
            })
            .catch (error => {
                console.log(error)
            })
    }

    loadSubjects = () => {
        return this.state.subjects.map( (subject,key) => {
            return (
                <div key={key}>
                    <Link
                        to={`/questions/${subject._id}`}
                        style={{ width: "100%", fontWeight: "500" }}
                    >
                        <div className="row option black-text">
                            <div className="col s10">{subject.name}</div>
                            <div className="col s2"><span className="badge red white-text">{subject.questions.length}</span></div>
                        </div>
                    </Link>
                </div>
            )
        })
    }



    // loadSubjects = () => {
    //     return this.state.subjects.map( (subject,key) => {
    //         if (this.state.answeredQuestion.length > 0){
    //             return this.state.answeredQuestion.map( (ques,i) => {
    //                 console.log(subject._id , ques.subject_id)
    //                 if (subject._id == ques.subject_id){
    //                     return (
    //                         <div key={key}>
    //                             <Link
    //                                 to={`/questions/${subject._id}`}
    //                                 style={{ width: "100%", fontWeight: "500" }}
    //                             >
    //                                 <div className="row option black-text">
    //                                     <div className="col s10">{subject.name}</div>
    //                                     <div className="col s2"><span className="badge red white-text">{ques.questions.length} / {subject.questions.length}</span></div>
    //                                 </div>
    //                             </Link>
    //                         </div>
    //                     )
    //                 }
    //             } )
    //         }else{
    //             return (
    //                 <div key={key}>
    //                     <Link
    //                         to={`/questions/${subject._id}`}
    //                         style={{ width: "100%", fontWeight: "500" }}
    //                     >
    //                         <div className="row option black-text">
    //                             <div className="col s10">{subject.name}</div>
    //                             <div className="col s2"><span className="badge red white-text">0 / {subject.questions.length}</span></div>
    //                         </div>
    //                     </Link>
    //                 </div>
    //             )
    //         }
    //     })
    // }

    // loadSubjects = () => {
    //     const {subjects} = this.state;
    //     const {answeredQuestion} = this.state;
    //
    //     console.log(subjects)
    //     console.log(answeredQuestion)
    //
    //     return subjects.some(subject => {
    //         console.log("a")
    //     })
    //
    //
    //     if (subjects.length > 0){
    //         for (let subject of subjects) {
    //             if(answeredQuestion.length > 0){
    //                 for (let ansQues of answeredQuestion){
    //                     if (subject._id == ansQues.subject_id) {
    //                         return(
    //                             <Link
    //                                 to={`/questions/${subject._id}`}
    //                                 style={{ width: "100%", fontWeight: "500" }}
    //                             >
    //                                 <div className="row option black-text">
    //                                     <div className="col s10">{subject.name}</div>
    //                                     <div className="col s2"><span className="badge red white-text">{ansQues.questions.length} / {subject.questions.length}</span></div>
    //                                 </div>
    //                             </Link>
    //                         )
    //                         break;
    //                     }
    //                     else{
    //                         return(
    //                             <Link
    //                                 to={`/questions/${subject._id}`}
    //                                 style={{ width: "100%", fontWeight: "500" }}
    //                             >
    //                                 <div className="row option black-text">
    //                                     <div className="col s10">{subject.name}</div>
    //                                     <div className="col s2"><span className="badge red white-text">0 / {subjects.questions.length}</span></div>
    //                                 </div>
    //                             </Link>
    //                         )
    //                         break;
    //                     }
    //                 }
    //             }
    //             else{
    //                 return(
    //                     <Link
    //                         to={`/questions/${subject._id}`}
    //                         style={{ width: "100%", fontWeight: "500" }}
    //                     >
    //                         <div className="row option black-text">
    //                             <div className="col s10">{subject.name}</div>
    //                             <div className="col s2"><span className="badge red white-text">0 / {subject.questions.length}</span></div>
    //                         </div>
    //                     </Link>
    //                 )
    //             }
    //
    //         }
    //     }


        // for (let i=0; i<subjects.length; i++){
        //     for(let j=0; j<answeredQuestion; j++){
        //         if (subjects[i]._id == answeredQuestion[j].subject_id){
        //             return(
        //                 <Link
        //                     to={`/questions/${subject._id}`}
        //                     style={{ width: "100%", fontWeight: "500" }}
        //                 >
        //                     <div className="row option black-text">
        //                         <div className="col s10">{subject.name}</div>
        //                         <div className="col s2"><span className="badge red white-text">0 / {subject.questions.length}</span></div>
        //                     </div>
        //                 </Link>
        //             )
        //             break;
        //         }else{
        //
        //         }
        //     }
        // }
    // }

    render() {
        console.log("user payload",this.props.auth.user)
        const seo = {
            title: "Medibee : Question Bank",
            description:
                "Question Bank.",
            url: "https://medibee.com.bd/questionbank/",
            image: ""
        };
        return (
            <>
                <Helmet
                    title={seo.title}
                    meta={[
                        {
                            name: "description",
                            property: "og:description",
                            content: seo.description
                        },
                        { property: "og:title", content: seo.title },
                        { property: "og:url", content: seo.url },
                    ]}
                />
                <Breadcrumbs title="Question Bank" description="Develop your knowledge by solving question bank" />
                <div className="container" style={{marginTop: "20px"}}>
                    <div className="row">
                        <div className="col s12 m6 ">
                            { this.loadSubjects() }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Subjects);