import React,{ useState, useEffect } from 'react'
import DesignComponents from './DesignComponents'
import io from "socket.io-client";
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import WriterMsgComponets from './WriterMsgComponets';
import AnoClientComponents from './AnoClientComponents';

const socket = io("http://localhost:3001/");

const styles = theme => ({
    button: {
      margin: theme.spacing(1),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        backgroundColor: '#cfe8fc'
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
  });   
  
class ChatComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid : 'been',
            visitor : 'visitor',
            chatInfo : [
               //{'writer' : 'aaa', 'message' : 'asdaasqq'}
            ],
        };
    }


    //lifecycle
    // componentWillMount() {
    //     socket.emit("roomjoin", this.state.userid);
    // }
    componentDidMount() {
        const name = prompt('name?');
        //const name = 'temp';
        this.setState({userid : name, visitor : name}, () => {      // this.setState는 비동기 -> callback
            socket.emit("roomjoin", this.state.userid);    
        });

        socket.on("enterClient", (data) => {
            console.log(data);
            this.setState({visitor : data}, () => {
            });
            
        });

        socket.on("receiveMesg", (data) => {
            this.state.chatInfo.push({'writer' : data.writer, 'message' : data.message});
            this.setState((chatInfo) => {
                return {
                    writer : data.writer,
                    message : data.message,
                };
            });
        });
    }
    
    sendMessage = (e) => {
        var data = {
            "room" : "roomjoin",
            "message" : document.querySelector('#message').value,
            "writer" : this.state.userid,
        };
        socket.emit("sendMesg", data);
        document.querySelector('#message').value = '';
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.sendMessage();
        }
    }

    sendMessageView = (e) => {
        return <WriterMsgComponets message={this.state.test} writer={this.state.test}/>;
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="sm">
                 <main className={classes.layout}>
                    <Typography component="div" style={{height: '2vh' }} align="center" />
                    <Typography component="div" style={{height: '80vh', overflow: 'auto' }} align="center" itemID="mbox">
                        {
                            this.state.visitor
                        }
                        {
                            this.state.chatInfo.map((chat, i) => {
                            return ( this.state.userid === chat.writer ?
                            <WriterMsgComponets message={chat.message} writer={chat.writer}/>
                            : <AnoClientComponents message={chat.message} writer={chat.writer}/>
                            )}) 
                        }
                    </Typography>
                    <Typography component="div" style={{height: '2vh' }} align="center" />
                </main>
                <Typography component="div" align="center" >
                        <TextField id="message" label="메세지" style = {{width: "25rem"}} onKeyPress={this.handleKeyPress} />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={this.sendMessage}>
                            보내기
                        </Button>
                </Typography>
                </Container>
            </div>
        )
    }
}

ChatComponents.propTypes = {
    classes: PropTypes.object.isRequired,
};

  export default withStyles(styles)(ChatComponents);