import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body 
            createdAt 
            user { id username }
            likeCount
            likes{
                user { id username }
            }
            commentCount
            comments{
                id 
                user { id username } 
                createdAt 
                body
            }
        }
    }`;