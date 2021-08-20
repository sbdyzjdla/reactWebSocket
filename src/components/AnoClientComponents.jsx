import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  var message = 'asadasdsa';

export default function AnoClientComponents({message, writer}) {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper} style={{margin : '30px' }}>
                <Grid container wrap="nowrap" spacing={2}>
                
                    
                    <Grid item>
                        <Avatar>{writer}</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>{message}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
