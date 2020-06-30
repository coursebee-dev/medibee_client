import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg"
import { Helmet } from 'react-helmet'

class About extends Component {
    render() {
        const seo = {
            title: "Medibee : About",
            description:
                "About Medibee.",
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
                <HeaderImg />

                <div className="container">
                    <div className="section">
                        <h4 className="center-align">
                            About<b> MEDIBEE</b>
                        </h4>
                        <blockquote>
                            <p>
                                MediBee (A medical concern of Coursebee.com) is education platform where we disseminate contemporary medical knowledge through live classroom , training and video based courses.
                <br /><br />
                Medibee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে।
                <br />
                মেডিক্যালের সব বিষয়ের উপর  বাংলায় সহজবোধ্য করে  লেকচার তৈরি হবে। লেকচারগুলো হবে সাবজেক্ট ভিত্তিক, টপিক ভিত্তিক এবং প্রফ ভিত্তিক। এছাড়াও ক্লিনিক্যাল ও এক্সাম প্রস্তুতিভিত্তিক লেকচার তো তৈরি হবেই।
                                আমরা বিরক্ত নিয়ে নয়, আনন্দের সাথে শিখবো আমাদের মতো করে।
                                <br /> <br />
                                আমাদের ক্লাস নিবেন শ্রদ্ধেয় সব সেরা সেরা স্যার। ক্লাস নিবেন ভালোবাসার বড় ভাইয়ারা। বিভিন্ন টপিকের উপর সুন্দর সহজবোধ্য ও গোছানো লেকচার সিরিজ থাকবে। আমাদের MediBee কোর্স লিংক থেকে সার্চ দিয়ে নিজের পছন্দমতো লেকচারে Enroll করা যাবে খুব সহজেই।
                                এরকম একটা স্বপ্ন নিয়ে যাত্রা শুরু করেছে MediBee. আপনিও যোগ দিতে পারেন আমাদের সাথে- টিম মেম্বার, ইন্সট্রাক্টর  কিংবা এম্বাসেডর হিসেবে। আপনার প্রতিভার আলো ছড়িয়ে দিন সবার মাঝে। আমরা এখানে সবাই একসাথে পড়বো-পড়াবো, শিখবো-শেখাবো। এভাবেই একদিন MediBee হয়ে উঠবে দেশের সবচেয়ে সেরা মেডিক্যাল ক্লাসরুম।
                            </p>
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