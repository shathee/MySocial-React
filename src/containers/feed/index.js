import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {Post} from '..'
import { db } from '../../firebase/firebase'

const useStyles = makeStyles((theme) => ({
    feedContainer: {
       display: 'flex',
       flexFlow: 'column',
       alignItems: 'center',
       justifyContent: 'flex-start',
    }
  }));


export default function Feed() {
    const [posts, setPosts] = useState([]);
    const classes = useStyles()


    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc)=>(
                    {
                        id:doc.id,
                        post:doc.data()
                    }
                ))
            );
        })
    }, [])

    return (
        <Grid item xs={12} sm={12} className={classes.feedContainer} >

            {
                posts.map(({id, post}) => {
                    return <Post 
                    key={id}
                    id={id}
                    photourl={post.photourl}
                    username={post.username}
                    img={post.img}
                    caption={post.caption}
                    created={post.created} 
                    comments={post.comments} />
                })
            }
        </Grid>
    )
}
