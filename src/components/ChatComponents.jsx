import React from 'react'
import DesignComponents from './DesignComponents'
import io from "socket.io-client";
import { Button } from '@material-ui/core';

const socket = io("http://localhost:3001/");

export default class ChatComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid : 'been',
        };
    }

    //lifecycle
    componentWillMount() {
        socket.emit("roomjoin", this.state.userid);
    }

    sendMessage = (e) => {
        var str = {
            "room" : "roomjoin",
            "message" : document.querySelector('#message').value,
        };
        socket.emit("alert", str);
        console.log('소켓통신중');
    }
      
    render() {
        
        return (
            <div>
                <DesignComponents />
                <Button onClick={this.sendMessage}></Button>
            </div>
        )
    }
}
