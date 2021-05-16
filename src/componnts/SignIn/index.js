import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    signInBtnDiv: {
        alignSelf: 'center'
    },
    signInBtn: {
        backgroundColor: '#de5246'
    }
  }));

export default function SignInBtn() {

    const classes = useStyles();
    return (

        <div className={classes.signInBtnDiv}>
            <Button className={classes.signInBtn} variant="contained" color="secondary">
                Sign In with Google
            </Button>
        </div>
    )
}
