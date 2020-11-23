import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST } from '../utils/graphql';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Icon} from 'semantic-ui-react';

function LikeButton({ user, post: { id, likes, likeCount } }){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes && likes.find(like => like.user.id === user.id)){
            setLiked(true);
        }else{
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='violet'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='violet' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='violet' basic>
                <Icon name='heart' />
            </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label as='a' basic color='violet' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

export default LikeButton;