import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';
import Breadcrumbs from "../layout/Breadcrumbs";

export class Course extends Component {

    render() {
        const seo = {
            title: "Medibee : Courses",
            description:
                "Courses from top-notch mentors are coming soon.",
            url: "https://medibee.com.bd/course/",
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
