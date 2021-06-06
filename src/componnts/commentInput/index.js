import React, {useState} from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { db } from '../../firebase/firebase'

export default function CommentInput({comments, user, postid}) {
    const [comment, setComment] = useState("")
    const [commentArray, setCommentArray] = useState(comments ? comments : [])
    
    const addComment = () => {
        console.log(commentArray)
        if(comment != ""){
            commentArray.push({
                comment: comment,
                username: user.email.split('@')[0]
            })
            
            // db.collection("posts")
            // .doc(postid)
            // .update(
            //     {
            //         comments: commentArray
            //     }
            // )
            // .then(()=>{
            //     setComment("")
            // })
            // .catch((err)=>{
            //     console.log(err)
            // })
        }
        
    }

    return (
        <Box >
            {
                user ? (
                <>
                <TextField 
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    label="Write your comment"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                />
                <Button variant="outlined" onClick={addComment} color="primary">Comment</Button>
                </>
                ) :
                (
                    <p>Please login to comment</p>
                )
            }
            
        </Box>
    )
}
