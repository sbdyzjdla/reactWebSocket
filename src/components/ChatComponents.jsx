import React from 'react'
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
  const message = `Truncation should be conditionally applicable on this long line of text
  as this is a much longer line than what the container can support. `;

class ChatComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid : 'been',
            test : 'test',
        };
    }

    //lifecycle
    // componentWillMount() {
    //     socket.emit("roomjoin", this.state.userid);
    // }
    componentDidMount() {
        //const name = prompt('name?');
        const name = 'temp';
        this.setState({userid : name}, () => {      // this.setState는 비동기 -> callback
            socket.emit("roomjoin", this.state.userid);    
        });

        socket.on("clientReceive", (data) => {
            console.log(data);
        });
    }

    sendMessage = (e) => {
        var str = {
            "room" : "roomjoin",
            "message" : document.querySelector('#message').value,
        };
        socket.emit("alert", str);
        document.querySelector('#message').value = '';
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.sendMessage();
        }
    }

    sendMessageView = (e) => {
        console.log('paper');
        //return this.state.userid;
        return <WriterMsgComponets message={this.state.test}/>;
    }

    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="sm">
                 <main className={classes.layout}>
                    <Typography component="div" style={{height: '2vh' }} align="center" />
                    <Typography component="div" style={{height: '80vh' }} align="center" itemID="mbox">
                        <Paper className={classes.paper} style={{margin : '30px' }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar>W</Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography>{message}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper} style={{margin : '30px' }}>
                            <Grid container wrap="nowrap" spacing={2}>
                            
                                <Grid item xs>
                                    <Typography>{message}</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar>S</Avatar>
                                </Grid>
                            </Grid>
                        </Paper>
                        {
                            this.sendMessageView()
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
                <Button onClick={this.sendMessageView}>버튼</Button>
                </Container>
            </div>
        )
    }
}

ChatComponents.propTypes = {
    classes: PropTypes.object.isRequired,
};

  export default withStyles(styles)(ChatComponents);