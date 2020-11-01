import React, { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import {SearchOutlined,AttachFile,MoreVert} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './Axios'

import './Chat.css'
function Chat({messages}) {
    const [input,setInput] = useState(''); 
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new',{
            message:input,
            name:"Sanketh",
            timestamp:"just Now",
            received: false,
        });

        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen At...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>    
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                </p>
                ))}
                
                
            </div>
             <dic className="chat__footer">
                 <InsertEmoticonIcon />
                 <form>
                     <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                     <button onClick={sendMessage} type="submit">Send a message</button>
                 </form>
                 <MicIcon/>
             </dic>
            
        </div>
    )
}

export default Chat
