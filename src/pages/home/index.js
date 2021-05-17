import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {CreatePost, NavBar} from '../../containers'


const useStyles = makeStyles((theme) => ({
    homeContainer: {
       minHeight: '80vh'
    },
  }));
  
export default function Home() {
    const classes = useStyles()
    return (
        <Grid className={classes.homeContainer} container spacing={3}>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <CreatePost />
            <Grid item xs={8} sm={8}>
            <Paper >xs=12 sm=6</Paper>
            </Grid>
            <Grid item xs={4} sm={4}>
            <Paper >xs=12 sm=6</Paper>
            </Grid>
        </Grid>
    )
}
