
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
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
// import { UserContext } from '../../contexts/user';
import { makeStyles } from '@material-ui/core/styles';
import {Comment} from '../../componnts'


const useStyles = makeStyles((theme) => ({
    postContainer: {
       width: '80%',
       padding: '10px',
       margin: '10px auto'
    },
    postImage: {
        height: '250px'
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
    }
  }));

export default function Post({username, caption, img, photourl, created, comments, id}) {
    // const [user, setUser] = useContext(UserContext).user
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                <IconButton className={classes.postDel}>
                    <DeleteIcon color="secondary" />
                </IconButton>
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
