import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_POST, ADD_COMMENT } from '../utils/graphql';
import React,{ useContext, useRef, useState} from 'react';
import {Button, Card, Grid, Image} from 'semantic-ui-react';
import moment from 'moment';
import { Icon, Label, Form } from 'semantic-ui-react';

import {AuthContext} from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props){

    const { user } = useContext(AuthContext);

    const commentInputRef = useRef(null);

    const postId = props.match.params.postId;

    const { data: { getPost } = {} } = useQuery(FETCH_POST, {
        variables: { postId }
    });

    const [comment, setComment] = useState('');

    const [addComment] = useMutation(ADD_COMMENT, {
        update(){
           setComment('');
           commentInputRef.current.blur(); 
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback(){
        props.history.push('/');
    }

    let postMarkUp = '';

    if(!getPost){
        postMarkUp= "<p>Loading Post...</p>";
    }else{
        const { id, body, createdAt, user: {id: userId, username, file:{path}}, likeCount, comments, likes, commentCount } = getPost;
        console.log("Test:" + path);

        postMarkUp = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated='right' size='small' src={path && path.trim()!='' ? (
                                    "http://localhost:4000/" + path
                                ):(
                                "https://react.semantic-ui.com/images/avatar/large/molly.png"
                                )}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user= {user} post= {{id, likes, likeCount}}/>
                                <Button as="div" labelPosition="right">
                                    <Button basic color="violet">
                                        <Icon name="comments"/>
                                    </Button>
                                    <Label basic color="violet" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.id === userId && <DeleteButton postId={id} callback={deletePostCallback} /> }
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Comment on Post...</p>
                                    <Form onSubmit={addComment}>
                                        <div className="ui action input fluid">
                                            <input type="text" 
                                                placeholder="Comment..." 
                                                name="comment" 
                                                value={comment} 
                                                onChange={(event) => setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type="submit" 
                                            className="ui button violet"
                                            disabled={comment.trim() === ''}
                                            >Comment !</button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        { comments.map(comment =>(
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.id === comment.user.id &&<DeleteButton postId={id} commentId={comment.id}/>}
                                    <Card.Header>{comment.user.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkUp;
}

export default SinglePost;