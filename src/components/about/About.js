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
                          <p>মেডিবি দেশের অন্যতম সেরা অনলাইনভিত্তিক মেডিক্যাল শিক্ষামূলক প্ল্যাটফর্ম যা আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের জন্য দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                          <p>ডাক্তারদের নিয়ে একাডেমিক ও সহ - পাঠক্রম সংক্রান্ত কার্যক্রম সম্পাদনায় নিরিলসভাবে কাজ করে যাচ্ছে।</p>
                          <p>আমাদের মূল উদ্দেশ্য হল দেশ বিদেশের খ্যাতিমান মেডিক্যাল বিশ্ববিদ্যালয় ও কলেজের খ্যাতিমান শিক্ষক,  সরকারী এবং বেসরকারী সংস্থায় কর্মরত সফল ডাক্তারদের সাথে মেডিক্যাল কলেজ পড়ুয়া শিক্ষার্থীদের সাথে একটি নিরবিচ্ছিন্ন সম্পর্ক প্রতিষ্ঠা করা।</p>
                          <p>আমাদের দেশের মেডিক্যাল শিক্ষার্থীদের বিষয়গুলো মাথায় রেখে একাডেমিক লেকচার, ভিডিও লেকচার, টিউটোরিয়াল এমনভাবে প্রস্তুত করা যাতে করে দেশের প্রতিটি মেডিক্যাল শিক্ষার্থী দেশের প্রতিটি কোণ থেকে সহজেই এই কোর্সগুলোর আওতাভুক্ত হতে পারে।</p>
                          <p>এছাড়াও আমরা অনলাইন ক্লিনিক্যাল ওয়ার্শপ, দক্ষতামূলক প্রশিক্ষণ, স্বাস্থ্য সচেতনতা ক্যাম্প, ক্যারিয়ার সেমিনারের মত নানা শিক্ষার্থী সহায়ক প্রোগ্রাম করে থাকি।</p>
                          <p>পৃথিবীর নানা সমসাময়িক মেডিক্যাল সাইন্স ভিত্তিক আলোচনা অনলাইন সেশনের মাধ্যমে প্রচার করে থাকি যাতে করে মেডিক্যাল শিক্ষার্থীগন আরোও উন্নতভাবে তাদের সেবা কার্যক্রম বজায় রাখতে পারে। মেডিক্যাল কেন্দ্রীয় সকল জ্ঞানচর্চা দেশের প্রতিটি শিক্ষার্থীদের মাঝে পৌছে দিতে আমরা বদ্ধপরিকর।</p>
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
