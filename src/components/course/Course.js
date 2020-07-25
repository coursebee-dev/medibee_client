import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ComingSoon } from '../comingSoon/ComingSoon'
import { Helmet } from 'react-helmet';
import HeaderImg from "../layout/HeaderImg";
import Breadcrumbs from "../layout/Breadcrumbs";

export class Course extends Component {
    render() {
        const seo = {
            title: "Medibee : Course",
            description:
                "Courses from top-notch mentors are coming soon.",
<<<<<<< HEAD
            url: "https://medibee.com.bd/course/",
=======
            url: "https://medibee.com/course/",
>>>>>>> af024ce92ec14b6eb3913e58409cf77363fe7b19
            image: ""
        };
        return (
            <div>
                <Breadcrumbs title="Courses" description="Registered courses" />
                {/*<h4 style={{ margin: "50px" }}>Courses</h4>*/}
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
                <ComingSoon />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
