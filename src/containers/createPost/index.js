import React, {useState, useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {SignInBtn} from '../../componnts/'
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../contexts/user';
import { storage, db } from '../../firebase/firebase'

import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
    createPostContainer: {
       display: 'flex',
       flexFlow: 'column',
       alignItems: 'center',
       justifyContent: 'center'
    },
    createPostBoxOuter: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
     },
    createPostBoxInner: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    textFieldContainer: {
        width: '80%',
        padding: '10px'
    },
    imgPreviewBox: {
        alignSelf: 'flex-start',
        justifySelf: 'flex-start',
    },
    imgPreview: {
        display: 'none',
        width: '150px',
        height: '100px',
        borderRadius: '5px',
        alignSelf: 'center',
        justifySelf: 'flex-start',
        padding: '10px'
    }
  }));


export default function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [upProgress, setUpProgress] = useState(0)
    const classes = useStyles()

    const randId = () => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        return timestamp;
    }


    const handlePhotoUploadPreview = (e) => {
        if(e.target.files[0]){
            setImageFile(e.target.files[0])
            let imgFileSrc = URL.createObjectURL(e.target.files[0])
            let imgPreview = document.getElementById('image_preview')
            imgPreview.style.display = 'block'
            imgPreview.src = imgFileSrc
        }
    }

    const handlePost = () => {
        
        if (imageFile) {
            let imageName = randId()
            let imageExt = imageFile.type.split('/')
            let imgPath = imageName+'.'+imageExt[imageExt.length-1]
            const uploadTask = storage.ref(`images/${imgPath}`).put(imageFile)
            
            uploadTask.on("state_change", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                setUpProgress(progress)

            }, error => {
                console.log(error);
            }, () => {
                storage.ref("images").child(imgPath).getDownloadURL()
                .then((imageUrl) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        img: imageUrl,
                        photourl: user.photoURL,
                        username: user.email.split('@')[0],
                        created:firebase.firestore.FieldValue.serverTimestamp()
                    });
                });
                setCaption("");
                setUpProgress(0);
                setImageFile(null);
                document.getElementById('image_preview').style.display = 'none'
            });

        }
        
    }


    return (
        <Grid className={classes.createPostContainer} xs={12} sm={12}>
            <Paper  className={classes.textFieldContainer} px={10}>
                { user ? (
                    <Box className={classes.createPostBoxOuter}>
                        <Box className={classes.createPostBoxInner}>
                            <TextField 
                                onChange={(e) => setCaption(e.target.value)}
                                value={caption}
                                label="Write your post here"
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Box>
                        <Box className={classes.imgPreviewBox} >
                            <img className={classes.imgPreview} id="image_preview" src="" alt="uploaded" />
                        </Box>
                            
                        <Box className={classes.createPostBoxInner}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                            <AddAPhotoIcon />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoUploadPreview}
                            />
                            </Button>
                            <LinearProgress variant="determinate" value={upProgress} />
                            
                            <Button
                                variant="contained"
                                component="label"
                                onClick={handlePost}
                            >
                            <PostAddIcon />Post
                            </Button>
                        </Box>
                    </Box>
                )
                : (
                    <Box >
                        <SignInBtn />
                        <Typography variant='h3' container='h4'>
                        To post and Comment
                        </Typography>
                    </Box> )
                }
            </Paper>
            
        </Grid>
    )
}
