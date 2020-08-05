import React, { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Jitsi from 'react-jitsi';

const Loader = () => { return <p>Loading</p> }
const LiveClassRoomMentor = ({ match, auth }) => {
    const [api, setApi] = useState({})
    let roomName = match.params.classid;
    let displayName = auth.user.name;
    //let password = 'The Password';
    const domain = 'meet.coursebee.com';
    let config = {
        disableInviteFunctions: true,
        disableDeepLinking: false,
        disableAudioLevels: true
    }
    let interfaceConfig = {
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
            'fullscreen',
            'fodeviceselection', 'profile',
            'etherpad', 'settings', 'raisehand',
            'videoquality', 'filmstrip',
            'tileview', 'videobackgroundblur', 'help', 'security'
        ]
    }
    const handleAPI = (JitsiMeetAPI) => {
        JitsiMeetAPI.addEventListener("participantRoleChanged", function (event) {
            if (event.role === "moderator") {
                JitsiMeetAPI.executeCommand('password', 'The Password');
            }
        })
        JitsiMeetAPI.on('passwordRequired', () => {
            JitsiMeetAPI.executeCommand('password', 'The Password')
        })
        setApi(JitsiMeetAPI)
    }

    const mute = () => {
        api.executeCommand('toggleAudio')
    }

    const toggleVideo = () => {
        api.executeCommand('toggleVideo')
    }

    const toggleChat = () => {
        api.executeCommand('toggleChat');
    }

    const hangup = () => {
        api.executeCommand('hangup');
    }

    const muteEveryone = () => {
        api.executeCommand('muteEveryone');
    }

    const shareScreen = () => {
        api.executeCommand('toggleShareScreen');
    }

    const record = () => {
        api.executeCommand('startRecording', {
            mode: "stream",
            youtubeStreamKey: "a40w-xfud-4td3-2tmx-7xq0",
            shouldShare: false
        })
    }
    // const options = {
    //     roomName: match.params.classid,
    //     width: '100%',
    //     height: '600px',
    //     userInfo: {
    //         email: auth.user.email,
    //         displayName: auth.user.name
    //     },
    //     configOverwrite: {
    //         disableInviteFunctions: true,
    //         disableDeepLinking: false,
    //         disableAudioLevels: true
    //     },
    //     interfaceConfigOverwrite: {
    //         HIDE_INVITE_MORE_HEADER: true,
    //         DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    //         DISABLE_RINGING: true,
    //         DISABLE_TRANSCRIPTION_SUBTITLES: true,
    //         DISABLE_VIDEO_BACKGROUND: true,
    //         MOBILE_APP_PROMO: false,
    //         SHOW_JITSI_WATERMARK: false,
    //         SHOW_POWERED_BY: false,
    //         SHOW_PROMOTIONAL_CLOSE_PAGE: false,
    //         VIDEO_LAYOUT_FIT: 'both',
    //         TOOLBAR_BUTTONS: [
    //             'microphone', 'camera', 'desktop', 'fullscreen',
    //             'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
    //             'etherpad', 'settings', 'raisehand',
    //             'videoquality', 'filmstrip',
    //             'tileview', 'videobackgroundblur', 'help', 'mute-everyone', 'security'
    //         ]
    //     },
    //     parentNode: document.querySelector('#meet')
    // };


    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <Jitsi
                        displayName={displayName}
                        config={config}
                        interfaceConfig={interfaceConfig}
                        domain={domain}
                        onAPILoad={handleAPI}
                        loadingComponent={Loader}
                        roomName={roomName}
                        displayName={displayName} />
                    <div className="col s12">
                        <button className="btn btn-small blue" onClick={mute}>Mute/Unmute</button>
                        <button className="btn btn-small blue" onClick={toggleVideo}>Turn off/on video</button>
                        <button className="btn btn-small blue" onClick={shareScreen}>Share Screen</button>
                        {/* <button className="btn btn-small blue" onClick={record}>Record</button> */}
                    </div>
                    <div className="col s12" style={{ display: "flex", justifyContent: "space-betwee" }}>
                        <button className="btn btn-small blue" onClick={toggleChat}>Chat</button>
                        <button className="btn btn-small blue" onClick={muteEveryone}>Mute Everyone</button>
                        <button className="btn btn-small red" onClick={hangup}>End Call</button>
                    </div>
                </div>
            </div>
        </div>
    )
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
