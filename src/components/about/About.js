import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from 'react-helmet'
import Breadcrumbs from "../layout/Breadcrumbs";

class About extends Component {
    render() {
        const seo = {
            title: "Medibee : About",
            description:
                "About Coursebee.",
            url: "https://medibee.com.bd/about/",
            image: ""
        };
        return (
            <div>
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
                <Breadcrumbs title="About" description="Who we are " />

                <div className="container">
                    <div className="section">
                        <h4 className="center-align">
                            About<b> Medibee</b>
                        </h4>
                        <blockquote>
                            Join "Medibee" Team
                            <p>

                                Medibee is medical education related Organization has been working relentlessly to improve the academic & co- curricular skills of medical students & doctors across the country and abroad.</p>

                            <p>The core concept of the group is to connect the medical students to renowned teachers and professionals working in different medical colleges, hospitals, government and private organizations in Bangladesh and abroad. We try to develop academic lectures, video lectures, tutorials for all & easily accessible from every corner of the country. We also arrange clinical workshops, skill development programs health awareness campaign, career seminar & so on to help medical students & doctors to improve their skills & serve their patients in a better way. We also arrange live session on various contemporary issues. Medical knowledge dissemination in remote areas is a very essential task for us as a leading medical education organization.</p>
                            <b>Slogan:</b>
                            <b>Vision:</b>
                            <p>To create and foster a medical learning community to provide learners with knowledge, skills and attitudes to successfully overcome current and future challenges in health care.</p>
                            <b>Mission:</b>
                            <p>The mission of MediBee is to educate medical students, physicians and other health professionals from demographically diverse backgrounds to meet future primary and specialty health care needs; foster medical research that leads to improvement of clinical and public health; and provide a broad range of patient services.</p>
                            <b>Projects & programmes:</b>
                                Online and offline class lectures
                                Contemporary knowledge sharing sessions
                                Webinar and seminars organize
                                Higher education abroad: Opportunism and challenges sharing.
                                Professional and career discussion
                                Medical research and publications workshop

                                <b>Our Core values:</b>
                            <p>Medical excellence, Quality, Innovation, Research and Development, Accuracy, teambuilding.</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(About);