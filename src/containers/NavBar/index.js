import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {SignInBtn} from '../../componnts';


const useStyles = makeStyles((theme) => ({
    appContainer: {
        display: 'flex',
        flexFlow: 'row',
        alignItem: 'center',
        padding: '10px',
        justifyContent: 'space-between'
    },
    siteTitle: {
        width: '80%',
        fontFamily: 'Poppins, sans-serif'
    },
  }));


export default function NavBar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.appContainer} position="static">
            <Typography className={classes.siteTitle} variant="h3" noWrap>
                MySocial-React
            </Typography>
            <SignInBtn />
        </AppBar>
    )
}
