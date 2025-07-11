import "./style.css";
import { useState, useRef, useEffect } from "react";
// import io from "socket.io-client";
//
// const socket = io("http://localhost:5000"); // change to your backend address

const ChatBoard = () => {
    const [start, setStart] = useState(false);
    const [partnerId, setPartnerId] = useState(null);
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const peerConnection = useRef(null);
    const localStream = useRef(null);

    useEffect(() => {
        if (!start) return;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideo.current.srcObject = stream;
                localStream.current = stream;

                peerConnection.current = new RTCPeerConnection();

                stream.getTracks().forEach(track => {
                    peerConnection.current.addTrack(track, stream);
                });

                peerConnection.current.ontrack = event => {
                    remoteVideo.current.srcObject = event.streams[0];
                };

                peerConnection.current.onicecandidate = event => {
                    if (event.candidate && partnerId) {
                        console.log(event.candidate, partnerId)
                        // socket.emit('signal', {
                        //     to: partnerId,
                        //     data: { candidate: event.candidate }
                        // });
                    }
                };
            });

        // socket.on('matched', async (partnerId) => {
        //     setPartnerId(partnerId);
        //     const offer = await peerConnection.current.createOffer();
        //     await peerConnection.current.setLocalDescription(offer);
        //     socket.emit('signal', { to: partnerId, data: { sdp: offer } });
        // });
        //
        // socket.on('signal', async ({ from, data }) => {
        //     if (data.sdp) {
        //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
        //         if (data.sdp.type === 'offer') {
        //             const answer = await peerConnection.current.createAnswer();
        //             await peerConnection.current.setLocalDescription(answer);
        //             socket.emit('signal', { to: from, data: { sdp: answer } });
        //         }
        //     } else if (data.candidate) {
        //         await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        //     }
        // });
        //
        // socket.on('partner-disconnected', () => {
        //     alert("Stranger disconnected");
        //     endCall();
        // });

        return () => {
            // socket.disconnect();
        };
    }, [start]);

    const endCall = () => {
        peerConnection.current?.close();
        peerConnection.current = null;
        setPartnerId(null);
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
        }
        localVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
    };

    const toggleMute = () => {
        const audioTrack = localStream.current?.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
    };

    const toggleVideo = () => {
        const videoTrack = localStream.current?.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
    };

    return (
        <>
            <div className="container">
                <header className="header">
                    <div className="logo">ChatConnect</div>
                    <div className="status-indicator">
                        <div className="status-dot" />
                        <span>Online</span>
                    </div>
                </header>
                <div className="main-content">
                    <div className="video-section">
                        <div className="video-container">
                            <video ref={remoteVideo} className="video-placeholder" autoPlay playsInline />
                            <div className="video-overlay">
                                <video ref={localVideo} className="local-video" autoPlay muted playsInline />
                            </div>
                        </div>
                        <div className="video-controls">
                            <button className="control-btn call" onClick={() => setStart(true)}>📞</button>
                            <button className="control-btn mute" onClick={toggleMute}>🎤</button>
                            <button className="control-btn mute" onClick={toggleVideo}>📹</button>
                            <button className="control-btn end" onClick={endCall}>📞</button>
                        </div>
                    </div>
                    <div className="chat-section">
                        <div className="chat-header">
                            <div className="chat-title">Chat with Stranger</div>
                            <button className="new-chat-btn" onClick={() => window.location.reload()}>🔄</button>
                        </div>
                        <div className="chat-messages" id="chatMessages">
                            <div className="message system">
                                {partnerId ? "Connected to a stranger. Say hello!" : "Waiting for connection..."}
                            </div>
                        </div>
                        <div className="typing-indicator" id="typingIndicator">
                            Stranger is typing...
                        </div>
                        <div className="chat-input">
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="message-input"
                                    placeholder="Type your message..."
                                    id="messageInput"
                                />
                                <button className="send-btn">
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                !start && <div className="connection-panel" id="connectionPanel">
                    <h2>Welcome to ChatConnect</h2>
                    <p>Connect with strangers from around the world</p>
                    <button className="start-btn" onClick={() => setStart(true)}>
                        Start Chatting
                    </button>
                </div>
            }
        </>
    );
};

export default ChatBoard;
