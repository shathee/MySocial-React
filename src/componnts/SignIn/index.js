import React from 'react'
import {useContext} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { signInWithGoogle } from '../../services/auth'
import { UserContext } from '../../contexts/user';

const useStyles = makeStyles((theme) => ({
    signInBtnDiv: {
        alignSelf: 'center'
    },
    signInBtn: {
        backgroundColor: '#de5246'
    }
  }));

export default function SignInBtn() {
    
    const [user, setUser] = useContext(UserContext).user;
    
    const signInBtnClicked = async () => {
        let userData = await signInWithGoogle();
        if(userData) setUser(userData);
        
    }
    const classes = useStyles();
    return (

        <div className={classes.signInBtnDiv}>
            <Button onClick={signInBtnClicked} className={classes.signInBtn} variant="contained" color="secondary">
                Sign In with Google
            </Button>
        </div>
    )
}
