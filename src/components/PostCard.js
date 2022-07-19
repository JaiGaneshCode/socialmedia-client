import React,{useContext} from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton.js';
import DeleteButton from './DeleteButton.js';
import MyPopUp from '../utils/MyPopUp';

function PostCard( { post: {body, createdAt, id, user: userDetails, likeCount, commentCount, likes } } ){

    const {user} = useContext(AuthContext);

    return(
        <Card>
            <Card.Content>
                <Image floated='right' size='mini' src={userDetails.file.path && userDetails.file.path.trim()!='' ? (
                                    "http://localhost:4000/" + userDetails.file.path
                                ):(
                                "https://react.semantic-ui.com/images/avatar/large/molly.png"
                                )}/>
                <Card.Header>{userDetails.username}</Card.Header>
                <Card.Meta as= {Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}}></LikeButton>
                <MyPopUp content="Comment on post !">
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopUp>
                {user && user.id === userDetails.id && <DeleteButton postId={id}/> }
            </Card.Content>
        </Card>
    )
}

export default PostCard;