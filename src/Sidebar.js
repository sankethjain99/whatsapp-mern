import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
            <Avatar src='https://avatars3.githubusercontent.com/u/45506004?s=400&u=cb792d5bd04eaeecc7de39f6c8376e56fc1750fc&v=4'/>
            <div className="sidebar__headerRight">

                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton><IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or create a new Group" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat/>          
            </div>
        </div>
    );
}

export default Sidebar
