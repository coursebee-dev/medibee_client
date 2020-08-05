import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
class LiveClassRoom extends Component {
    constructor() {
        super();
        this.state = {
            jitsi: {}
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.classid)
        const domain = 'meet.coursebee.com';
        const options = {
            roomName: this.props.match.params.classid,
            width: '100%',
            height: '600px',
            userInfo: {
                email: this.props.auth.user.email,
                displayName: this.props.auth.user.name
            },
            configOverwrite: {
                startWithAudioMuted: true,
                disableInviteFunctions: true,
                disableAudioLevels: true,
                remoteVideoMenu: {
                    //     // If set to true the 'Kick out' button will be disabled.
                    disableKick: true
                },
                disableRemoteMute: true
            },
            interfaceConfigOverwrite: {
                HIDE_INVITE_MORE_HEADER: true,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'fullscreen',
                    'fodeviceselection', 'hangup', 'chat', 'raisehand',
                    'videoquality', 'filmstrip', 'tileview'
                ]
            },
            parentNode: document.querySelector('#studentmeet')
        };
        const jitsiapi = new window.JitsiMeetExternalAPI(domain, options);
        this.setState({ jitsi: jitsiapi },
            console.log(this.state.jitsi))
    }
    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12" id="studentmeet">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LiveClassRoom.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassRoom);