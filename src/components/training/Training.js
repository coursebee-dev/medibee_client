import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ComingSoon } from '../comingSoon/ComingSoon'
import { Helmet } from 'react-helmet';
import HeaderImg from "../layout/HeaderImg";

export class Training extends Component {
    render() {
        const seo = {
            title: "Medibee : Training",
            description:
                "Training programs are coming soon.",
            url: "https://medibee.com/training/",
            image: ""
        };
        return (
            <div>
                <HeaderImg />
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

                >
                    <meta name="keywords" content="training,medibee,training course" />
                </Helmet>
                <ComingSoon />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Training)
