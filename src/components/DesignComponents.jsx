import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChatComponents from './ChatComponents';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
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
  }));
  const message = `Truncation should be conditionally applicable on this long line of text
  as this is a much longer line than what the container can support. `;

export default function DesignComponents() {
    const classes = useStyles();
    return (
        <div>
            
                <main className={classes.layout}>
                    <Typography component="div" style={{height: '2vh' }} align="center" />
                    <Typography component="div" style={{height: '80vh' }} align="center">
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
                    </Typography>
                    <Typography component="div" style={{height: '2vh' }} align="center" />
                </main>
                <Typography component="div" align="center" >
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="message" label="메세지" style = {{width: "25rem"}}/>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={ChatComponents.sendMessage}>
                            보내기
                        </Button>
                    </form>
                </Typography>
            
        </div>
    )
}
