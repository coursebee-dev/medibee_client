import React, { Component } from 'react'
import Breadcrumbs from "../layout/Breadcrumbs";

export default class ReturnRefund extends Component {
    render() {
        return (
            <>
                <Breadcrumbs title="Return Refund Policy" description="" />
                <div className="container">
                    <h4>No Refunds</h4>
                    <p>    Thank you for being with Medibee.
                        Currently, we do not offer any refund and/or exchange for a purchased product. You may cancel your Medibee account at any time; however, there are no partial or pro-rata refunds for cancellation. In the event that you cancel your account or Medibee suspends or terminates your account under this Agreement for your breach of this Agreement, you understand and agree that you shall receive no refund or exchange for any Medibee Indicators, any unused time on a subscription, any license or subscription fees for any portion of the Service, any content or data associated with your account, or for anything else.
                    </p>
                </div>
            </>
        )
    }
}
