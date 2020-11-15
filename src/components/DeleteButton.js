import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopUp from '../utils/MyPopUp';


function DeleteButton({postId, commentId, callback}){

    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostorMutation] = useMutation(mutation, {
        update(proxy, ){
            setConfirmOpen(false);
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                let newPosts = data.getPosts.filter(post => post.id !== postId);
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY, 
                    data: { 
                        getPosts: [...newPosts] 
                    }
                }); 
            }
            if(callback) callback(); 
        },
        variables: {
            postId,
            commentId
        }
    })
    return(
        <>
            <MyPopUp float="right" content={commentId ? "Delete Comment" : "Delete Post"}>
                <Button as='div' color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash'/>
                </Button>
            </MyPopUp>
            <Confirm open={confirmOpen}
                onCancel= {() => setConfirmOpen(false)}
                onConfirm= {deletePostorMutation}
            />
        </>
    );
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
           id
           comments{
               id user{id username} createdAt body
           } 
           commentCount
        }
    }
`

export default DeleteButton;