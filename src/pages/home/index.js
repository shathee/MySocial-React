import React from 'react'
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {CreatePost, NavBar, Feed, People} from '../../containers'


const useStyles = makeStyles((theme) => ({
    homeContainer: {
       minHeight: '20vh',
    },
    feedNpeople: {
        display: 'flex',
        flexFlow: 'row',
        padding:'15px'
    },
    navContainer: {
        margin: '0px',
        height: '15vh'
    }
  }));
  
export default function Home() {
    const classes = useStyles()
    return (
        <Grid className={classes.homeContainer} container>
            <Grid className={classes.navContainer} xs={12}>
                <NavBar />
            </Grid>
            <Grid className={classes.feedNpeople} xs={12} sm={12}>
                <Grid xs={8} sm={8}>
                    <CreatePost />
                    <Feed />
                </Grid>
                <Grid xs={4} sm={4}>
                    <People />
                </Grid>
            </Grid>
        </Grid>
    )
}
