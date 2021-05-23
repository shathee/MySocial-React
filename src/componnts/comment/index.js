import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    cmntUser: {
       color: '#345995'
    },
    cmntBody: {
        color: '#5D2A42'
    },
    cmntContainer: {
        padding: '10px'
    }
    
  }));


export default function Comment({comment, user}) {
    const classes = useStyles()

    return (
        <Paper className={classes.cmntContainer}>
            <p>
                <span className={classes.cmntUser}>
                    {user}
                </span> : 
                <span className={classes.cmntBody}>
                {comment}
                </span>
            </p>
        </Paper>
    )
}
