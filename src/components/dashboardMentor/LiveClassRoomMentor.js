import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
class LiveClassRoomMentor extends Component {
    componentDidMount() {
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
                disableInviteFunctions: true,
                disableAudioLevels: true
            },
            interfaceConfigOverwrite: {
                HIDE_INVITE_MORE_HEADER: true,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                DISABLE_RINGING: true,
                DISABLE_TRANSCRIPTION_SUBTITLES: true,
                DISABLE_VIDEO_BACKGROUND: true,
                MOBILE_APP_PROMO: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_POWERED_BY: false,
                SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                VIDEO_LAYOUT_FIT: 'both',
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'etherpad', 'settings', 'raisehand',
                    'videoquality', 'filmstrip',
                    'tileview', 'videobackgroundblur', 'help', 'mute-everyone', 'security'
                ]
            },
            parentNode: document.querySelector('#meet')
        };
        const jitsiapi = new window.JitsiMeetExternalAPI(domain, options);
        jitsiapi.addEventListener("participantRoleChanged", function (event) {
            if (event.role === "moderator") {
                jitsiapi.executeCommand('password', 'The Password');
            }
        })
        jitsiapi.on('passwordRequired', function () {
            jitsiapi.executeCommand('password', 'The Password');
        });

    }
    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12" id="meet">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LiveClassRoomMentor.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassRoomMentor);
