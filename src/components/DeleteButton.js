import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopUp from '../utils/MyPopUp';
import { DELETE_POST, DELETE_COMMENT } from '../utils/graphql';


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



export default DeleteButton;