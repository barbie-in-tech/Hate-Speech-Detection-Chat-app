import React from 'react'

import './Sidebar.css'
import db from './firebase';
import firebase from 'firebase';
import { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeSharpIcon from '@mui/icons-material/DonutLargeSharp';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';

export default function Sidebar() {
    const db = firebase.firestore();

const [rooms, setRooms] = useState([]);
const [{user},dispatch] = useStateValue();
useEffect(() => {
    
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
        setRooms(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data()
            }
        )

        ))
    ));

    return () => {
        unsubscribe();
    }
}, [])

console.log(user.photoURL);
    return (

        <div className='sidebar'>

            <div className="sidebar_header">

                <Avatar src = {user.photoURL} />

                <div className="sidebar_headerRight">
                    <IconButton size="small">
                        <DonutLargeSharpIcon size="small" style={{color: "#7286D3"}} />

                    </IconButton >
                    <IconButton size="small">
                        <ChatSharpIcon size="small" style={{color: "#7286D3"}}/>

                    </IconButton>
                    <IconButton size="small">
                        <MoreVertSharpIcon size="small" style={{color: "#7286D3"}}/>
                    </IconButton>
                </div>



            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlinedIcon style={{color: "#7286D3"}}/>
                <input className="sidebar_searchContainerInput" placeholder="Search or start a new chat" type="text" ></input>
                </div>
        
            </div>

            <div className="sidebar_chats">
            <SidebarChat addNewChat/>
            
            {rooms.map(room => (
                <SidebarChat key = {room.id} id = {room.id} name = {room.data.name} />
            ))}
            </div>

        </div>
    )
}

//export default Sidebar
