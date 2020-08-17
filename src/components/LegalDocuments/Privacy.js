import React, { Component } from 'react'
import Breadcrumbs from "../layout/Breadcrumbs";

export default class Privacy extends Component {
    render() {
        return (
            <>
                <Breadcrumbs title="Cookies Policy" description="" />
                <div className="container">
                    <p>In common with most professional websites, this site uses cookies.
                        These are tiny files that are downloaded to your computer to improve your user experience.
                        This page describes what information is gathered, how we use it and why we sometimes need to store these cookies.
                        We also explain how you can prevent these cookies from being stored.
                        However, you should be aware that disabling these cookies may downgrade or 'break' certain elements of the site&rsquo;s functionality.
                        For more general information on cookies, see the Wikipedia article on HTTP Cookies.
                        <h2>How we use cookies </h2>
                        We use cookies to improve how our website works and to assess overall web trends.
                        <h2>Disabling cookies </h2>
                        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser &lsquo;Help&rsquo; function for details).
                        Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
                        Therefore, it is recommended that you do not disable cookies.
                        <h2>The cookies we set</h2>
                        Please be aware that, when you submit data to any site (e.g. through contact or comment forms), the cookies may be set to remember your user details for future correspondence.
                        <h2>Third-party cookies </h2>
                        In some special cases, we use cookies provided by trusted third parties.
                        This site uses Google Analytics, which is one of the most widely used and trusted analytics solutions available.
                        It helps us to understand how users access the Medibee site and ways that we can improve our users&rsquo; experiences.
                        These cookies may track how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                        For more information on these cookies, see the official Google Analytics page.
                        We also use social media buttons and/or plugins on this site to allow users to connect with their social networks in various ways.
                        For these to work, social media companies such as Facebook, Twitter and Google Plus will set cookies through our site.
                        These may be used to enhance users&rsquo; profiles on their site or contribute to the data they hold for various purposes.
                        Please check the respective privacy policies of these sites for details.
                        <h2>More information </h2>
                        If you would like any further information about our cookie policy, please contact us at: kernel.medibee@gmail.com </p>
                </div>
            </>
        )
    }
}
