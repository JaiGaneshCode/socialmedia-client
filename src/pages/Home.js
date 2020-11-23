import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY, NEW_POST_SUB } from '../utils/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    subscribeToMore,
    loading,
    data: {getPosts: posts} = {}
  } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() =>{
    subscribeToNewPost();
  });

  function subscribeToNewPost() { 
    subscribeToMore({
      document: NEW_POST_SUB,
      updateQuery: (cache, { subscriptionData: {data: {newPost}} } ) => {
        if(!newPost) 
          return cache;
        const newPostAdded = newPost
        return Object.assign({}, cache, {
          getPosts: [newPostAdded, ...cache.getPosts]
        });
      }
    })
  }
  
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
            <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))
            }
            </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;