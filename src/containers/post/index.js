
import React, {useContext} from 'react'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {Comment} from '../../componnts'
import { db, storage } from '../../firebase/firebase'


const useStyles = makeStyles((theme) => ({
    postContainer: {
       width: '80%',
       padding: '10px',
       margin: '10px auto',
       backgroundColor: '#f1faee'
    },
    postImage: {
        height: '100%',
        width: '100%'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: 'rotate(0deg)',
    },
    postDel: {
        marginLeft: 'auto',
    },
    delAlert: {
        color: '#c40000',
        fontSize: '1.5rem',
        textAlign: 'center'
    }
  }));

export default function Post({username, caption, img, photourl, created, comments, id}) {
    // const [user, setUser] = useContext(UserContext).user
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const handleDeletePost = () => {
        
        // remove file from firebase storage
        let imgRef = storage.refFromURL(img);
        imgRef.delete().then(()=>{
            console.log('del from storage')
        }).catch((err)=>{
            console.log(err)
        })
        // del post
        db.collection('posts').doc(id).delete()
        .then(()=>{
            console.log('del successfull')
        }).catch((err)=>{
            console.log(err)
        })

        handleClose()
    }
    const classes = useStyles()
    

    return (
        <Card className={classes.postContainer}>
            <CardHeader
                avatar={
                    <Avatar alt={username} src={photourl} />
                }
                title={username} 
                subheader={created && created.toDate().toString()}
            />
                
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {caption}
                </Typography>
                <Paper>
                    <img className={classes.postImage} alt="" src={img} />
                    
                </Paper>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                className={[classes.expand, classes.expandOpen].join(' ')}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <CommentIcon />
                    <ExpandMoreIcon />
                </IconButton>
                <IconButton onClick={handleClickOpen} className={classes.postDel}>
                    <DeleteIcon color="secondary" />
                </IconButton>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                 >
                    <DialogContent>
                        <DialogContentText className={classes.delAlert} id="alert-dialog-description">
                        This will permanently remove this post and its content and comments!!!
                        Do You still want to continue?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleDeletePost} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                
                    { comments ? (
                        comments.map((comment) => {
                            return <Comment comment={comment.comment} user={comment.username} />
                        })
                        ):
                        (<>No Comments for this post</>)
                    }
                </CardContent>
            </Collapse>
           
            
        </Card>
    )
}
