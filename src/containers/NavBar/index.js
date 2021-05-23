import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {SignInBtn} from '../../componnts';
import { UserContext } from '../../contexts/user';



const useStyles = makeStyles((theme) => ({
    appContainer: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        padding: '10px',
        justifyContent: 'space-between',
        height: '100%'
    },
    siteTitle: {
        width: '80%',
        fontFamily: 'Poppins, sans-serif'
    },
  }));


export default function NavBar() {
    const classes = useStyles();
    const [user, setUser] = useContext(UserContext).user;

    return (
        <AppBar className={classes.appContainer} position="static">
            <Typography className={classes.siteTitle} variant="h3" noWrap>
                MySocial-React
            </Typography>
            { user ? <Avatar alt={user.displayName} src={user.photoURL} /> : <SignInBtn /> }
            
        </AppBar>
    )
}
