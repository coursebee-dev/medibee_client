import React, { Component } from 'react'
import Breadcrumbs from "../layout/Breadcrumbs";

export default class Disclaimer extends Component {
    render() {
        return (
            <>
                <Breadcrumbs title="Disclaimer" description="" />
                <div className="container">
                    <p style={{textAlign : "justify"}}>The Medibee web site, the Course Content and material relating to Government information, products and services (or to third party information, products and services), is provided 'as is',
                        without any representation or endorsement made and without warranty of any kind whether express or implied, including but not limited to the implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.</p>
                    <p style={{textAlign : "justify"}}>We do not warrant that the functions contained in these sites or the Course Content will be uninterrupted or error free, that defects will be corrected, or that this site or the server that makes it available are free of viruses or represent the full functionality, accuracy, reliability of the materials.</p>
                    <p style={{textAlign : "justify"}}>In no event will we be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damages whatsoever arising from use or loss of use of, data or profits arising out of or in connection with the use of the website.</p>
                    <p style={{textAlign : "justify"}}>Although we may from time to time monitor or review discussions, chat, postings, transmissions, bulletin boards and other communications media on website.
                        We are under no obligation to do so and assume no responsibility or liability arising from the content of any such locations nor for any error, omission, infringement, defamation, obscenity, or inaccuracy contained in any information within such locations on website.</p>
                    <p style={{textAlign : "justify"}}>Medibee retains the right to withdraw the Course Content, or cancel your access to it, at any time in the period covered by your End User Licence.
                        If the removal of access is a result of a demonstration or reasonable suspicion of breach by you of any of the conditions of the Licence, Medibee will not consider any claims by you for compensation and reserves the right to take legal action against you to recover losses to it resulting from your breach of conditions.
                        If the withdrawal is for reasons unconnected to you, Medibee may provide you with compensation not exceeding the price paid by you, or on your behalf, to purchase this Licence.
                        You accept the right of Medibee to withdraw access within the licensed period subject to these provisions for compensation.</p>

                    <h2>Governing Law and Jurisdiction</h2>
                    <p style={{textAlign : "justify"}}>These terms and conditions shall be governed by and construed in accordance with the laws of Peoples Republic of Bangladesh.
                        Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Peoples Republic of Bangladesh.
                        You understand that the commercial terms governing this License, which include the timing and duration of access to the Course Content, are those offered by Medibee and accepted by you and that those commercial terms are wholly without prejudice to any part of these License conditions.
                        In the event of any actual or perceived conflicts, these conditions, which cannot be varied, have primacy over any other offers or communications you may have had from Medibee.
                        If you are unable to understand, or you do not wish to accept, any of the conditions set out above, do not access the Course Content and any payments received by Medibee from you or on your behalf will not be refunded.
                        If you access the Course Content, this will be deemed as acceptance by you of all of the conditions set out above.</p>

                    <h2>Links to external web sites</h2>
                    <p style={{textAlign : "justify"}}>    Links contained in Medibee or any of the Course Content will lead to other web sites which are not under our control.
                        We are not responsible for the content of any linked site.
                        Listing and linking should not be taken as an endorsement of any kind and we accept no liability in respect of the content.
                        We cannot guarantee that these links will work all of the time and have no control over the availability of the linked pages.</p>

                    <h2> Email Disclaimer </h2>
                    <p style={{textAlign : "justify"}}>  The purpose of this policy is to ensure that people who communicate with Medibee and understand the way in which electronic mail (email) should be used.
                        Its aim is to ensure that email is used effectively for its intended purpose without infringing legal requirements or creating unnecessary business risk. The statement below applies to all incoming and outgoing email messages to or from Medibee and Medibee: &quot;This email and any files transmitted with it are confidential.
                        If you are not the intended recipient, any reading, printing, storage, disclosure, copying or any other action taken in respect of this email is prohibited and may be unlawful.
                        If you are not the intended recipient, please notify the sender immediately by using the reply function and then permanently delete what you have received.
                        Internet email is not a secure medium.
                        Emails sent via the Internet could be intercepted and read by someone else. Please bear that in mind when deciding whether to send material to Medibee.
                        You have a responsibility to ensure laws are not broken when composing or forwarding emails and their contents.
                        Attachments to email messages may contain viruses that may damage your system.
                        Whilst Medibee has taken every reasonable precaution to minimize this risk, we cannot accept any liability for any damage which you sustain as a result of these factors.
                        You are advised to carry out your own virus checks before opening any attachment. </p>
                </div>
            </>
        )
    }
}
