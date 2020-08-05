import React, { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Jitsi from 'react-jitsi';

const Loader = () => { return <p>Loading</p> }

const LiveClassRoom = ({ match, auth }) => {
    const [api, setApi] = useState({})
    let roomName = match.params.classid;
    let displayName = auth.user.name;
    //let password = 'The Password';
    const domain = 'meet.coursebee.com';
    let config = {
        startWithAudioMuted: true,
        disableInviteFunctions: true,
        disableAudioLevels: true,
        remoteVideoMenu: {
            disableKick: true
        },
        disableRemoteMute: true
    }
    let interfaceConfig = {
        HIDE_INVITE_MORE_HEADER: true,
        TOOLBAR_BUTTONS: [
            'closedcaptions', 'fullscreen',
            'fodeviceselection', 'raisehand',
            'videoquality', 'tileview'
        ]
    }

    const handleAPI = (JitsiMeetAPI) => {
        JitsiMeetAPI.executeCommand('toggleAudio')
        JitsiMeetAPI.executeCommand('toggleVideo')
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

    // const options = {
    //     width: '100%',
    //     height: '600px',
    //     userInfo: {
    //         email: auth.user.email,
    //         displayName: auth.user.name
    //     },
    //     configOverwrite: {
    //         startWithAudioMuted: true,
    //         disableInviteFunctions: true,
    //         disableAudioLevels: true,
    //         remoteVideoMenu: {
    //             //     // If set to true the 'Kick out' button will be disabled.
    //             disableKick: true
    //         },
    //         disableRemoteMute: true
    //     },
    //     interfaceConfigOverwrite: {
    //         HIDE_INVITE_MORE_HEADER: true,
    //         TOOLBAR_BUTTONS: [
    //             'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
    //             'fodeviceselection', 'hangup', 'chat', 'raisehand',
    //             'videoquality', 'filmstrip',
    //             'tileview'
    //         ]
    //     },
    //     parentNode: document.querySelector('#studentmeet')
    // };
    // const jitsiapi = new window.JitsiMeetExternalAPI(domain, options);
    // jitsiapi.on('passwordRequired', function () {
    //     jitsiapi.executeCommand('password', 'The Password');
    // });
    // this.setState({ jitsi: jitsiapi },
    //     console.log(this.state.jitsi))

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
                    <button className="btn btn-small blue" onClick={mute}>Mute/Unmute</button>
                    <button className="btn btn-small blue" onClick={toggleVideo}>Turn off/on video</button>
                    <button className="btn btn-small blue" onClick={toggleChat}>Chat</button>
                    <button className="btn btn-small red" onClick={hangup}>End Call</button>
                </div>
            </div>
        </div>
    )

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
