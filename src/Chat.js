import React, { useState, useEffect } from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { height } from '@mui/system';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/app';

function Chat() {

    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();
 //   const [lastTimestamp,setlastTimestamp] = useStateValue(null);

//console.log(lastTimestamp);

//console.log("Hellow" + messages[messages.length - 1].timestamp.toDate());


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });


            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });
    
}
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        })

        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={user.photoURL} />

                <div className="chat_headerInfo">
                    <h4>{roomName}</h4>
                    <p>Last seen {" "}
                        {}</p>
                </div>
                <div className="chat_headerRight">

                    <IconButton>
                        <SearchOutlinedIcon></SearchOutlinedIcon>
                    </IconButton>

                    <IconButton>
                        <AttachFileOutlinedIcon>

                        </AttachFileOutlinedIcon>
                    </IconButton>

                    <IconButton>
                        <MoreVertSharpIcon>

                        </MoreVertSharpIcon>
                    </IconButton>
                </div>


            </div>

            <div className="chat_body">
{messages.map(message => (
    <p className={`chat_bodyMessage ${ message.name == user.displayName && 'chat_bodyReceiver'}`}>
        <span className="chat_name">{message.name}</span>
        {message.message}
        <span className="chat_timestamp">{new Date(message.timestamp.toDate()).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
    </p>
))}

            </div>

            <div className="chat_footer">
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}>
                    </input>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicOutlinedIcon />

            </div>


        </div>
    )
}

export default Chat
