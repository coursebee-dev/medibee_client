import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from "axios"
import M from 'materialize-css'

export const ConfirmLiveRegistration = ({ auth, match }) => {
    const [liveClass, setLiveClass] = useState()
    const [loading, setLoading] = useState(false)
    const [agree, setAgree] = useState(false)

    const onRegisterClick = async () => {

        if (!auth.isAuthenticated || auth.user.type !== "student") {
            M.toast({ html: "Please login as a student" })
            return;
        }
        if (liveClass.class_type === "Free") {
            try {
                const { data } = await axios.post(`/api/registerliveclass/${auth.user.id}/${liveClass._id}`)
                M.toast({ html: data.message })
            } catch (error) {
                M.toast({ html: "Server Error" })
                console.log(error)
            }
        } else if (liveClass.class_type === "Paid") {
            try {
                const { data } = await axios.post(`/api/registerliveclass/${auth.user.id}/${liveClass._id}`)
                if (data.status === 'success') {
                    window.open(data.data);
                } else {
                    M.toast({ html: "Server Error" })
                    console.log(data.message)
                }
            } catch (error) {
                M.toast({ html: "Server Error" })
                console.log(error)
            }
        }
    }

    const getLiveClass = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/liveclassdetails/${match.params.id}`)
            setLiveClass(data)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        getLiveClass()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            {loading ? (<div className="section">loading</div>) : (
                <div className="section">
                    <p> Liveclass Topic : {liveClass?.topic}</p>
                    <p>
                        <label>
                            <input type="checkbox" onChange={() => setAgree(!agree)} />
                            <span>I agree with the <a className="red-text" href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>, <a className="red-text" href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a className="red-text" href="/returnRefund" target="_blank" rel="noopener noreferrer">Return Refund Policy</a>.</span>
                        </label>
                    </p>
                    {agree ? (
                        <button
                            className="btn-large blue"
                            onClick={onRegisterClick}
                        >
                            {liveClass?.class_type === "paid" ? (
                                <>Confirm payment {liveClass?.price} <del>{liveClass?.fake_price}</del></>
                            ) : (
                                    <>Confirm Registration</>
                                )}
                        </button>
                    ) : (
                            <p>You must agree with the Terms and Conditions, Privacy Policy and Return Refund Policy </p>
                        )}

                </div>
            )}
        </div>
    )
}

ConfirmLiveRegistration.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ConfirmLiveRegistration)
