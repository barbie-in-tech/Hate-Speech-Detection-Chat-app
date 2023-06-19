import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from './firebase';
import { Avatar, IconButton } from "@material-ui/core";
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';


function SidebarChat({id,name,addNewChat}) {
  const [{user},dispatch] = useStateValue();

  const [messages, setMessages] = useState("");
    
  useEffect(() => {
      if(id){
          db.collection('rooms')
          .doc(id)
          .collection('messages')
          .orderBy('timestamp','desc')
          .onSnapshot(snapshot => {
              setMessages(snapshot.docs.map((doc) => doc.data()))
          })
      }
  }, [id]);

  const lastMsg = messages[0];

//console.log( "Last msg " + lastMsg.message);
const createChat = () => {
const roomName = prompt("Please enter name for chat")
if(roomName){
    db.collection('rooms').add({
        name: roomName,
    });
}
}
  return !addNewChat ? (
    <Link to={`/rooms/${id}`} key={id}>
    <div className="sidebarChat">
      <Avatar src = {user.photoURL} />
      <div className="sidebarChat_info">
          <h3>{name}</h3>
          <p>Last msg .../</p>
      </div>
    </div>
    </Link>
  ) : (
      <div onClick = {createChat} className="sidebarChat" >
<h3>Add New Chat</h3>
      </div>
  );
}

export default SidebarChat
