import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {SignInBtn} from '../../componnts/'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    craetePostContainer: {
       display: 'flex',
       flexFlow: 'column',
       alignItems: 'center',
       justifyContent: 'center'
    },
  }));

export default function CreatePost() {
    const classes = useStyles()
    return (
        <Grid className={classes.craetePostContainer} item xs={24} sm={12}>
            <SignInBtn />
            <Paper  >
                <Typography variant='h3' container='h4'>
                To post and Comment
                </Typography>
            </Paper>
        </Grid>
    )
}
