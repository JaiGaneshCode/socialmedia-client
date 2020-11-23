import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const MODIFY_USER = gql`
  mutation modifyUser(
    $id: ID!
    $username: String
    $email: String
    $password: String
    $confirmPassword: String
    $file: ID
  ) {
    modifyUser(
      modifyUserInput: {
        id: $id
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        file: $file
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      createdAt
      friends{
        user{
          id
        }
      }
      friendRequests{
        user{
          id
        }
      }
      token
      file{
        id
        path
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers($filter: String!) {
    getUsers(filter: $filter) {
      id
      username
      email
      createdAt
      friends{
        user{
          id
        }
      }
      friendRequests{
        user{
          id
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUsers($userId: ID!) {
    getUsers(userId: $userId) {
      id
      username
      email
      createdAt
      friends {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      friendRequests {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      blockedUsers {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      file{
        id
        path
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($userId: ID!) {
    sendFriendRequest(userId: $userId){
      id
      friends {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      friendRequests {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
    }
  }
`;

export const ACCEPT_FRIENDREQUEST = gql`
  mutation acceptFriendRequest($userId: ID!) {
    acceptFriendRequest(userId: $userId){
      id
      friends {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      friendRequests {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
    }
  }
`;

export const UNFRIEND_USER = gql`
  mutation unFriendUser($userId: ID!){
    unFriendUser(userId: $userId){
      id
      friends {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
      friendRequests {
        id
        user {
          id
          username
          email
        }
        createdAt
      }
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      user {
        id
        username
      }
      likeCount
      likes {
        user {
          id
          username
        }
      }
      commentCount
      comments {
        id
        user {
          id
          username
        }
        createdAt
        body
      }
    }
  }
`;

export const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      user {
        id
        username
      }
      createdAt
      likeCount
      likes {
        user {
          id
          username
        }
      }
      commentCount
      comments {
        id
        user {
          id
          username
        }
        createdAt
        body
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      user {
        id
        username
      }
      likes {
        id
        user {
          id
          username
        }
        createdAt
      }
      likeCount
      comments {
        id
        body
        user {
          id
          username
        }
        createdAt
      }
      commentCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        user {
          id
          username
        }
      }
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        user {
          id
          username
        }
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        user {
          id
          username
        }
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const NEW_POST_SUB = gql`
  subscription newPost{
    newPost{
      id
      body
      user {
        id
        username
      }
      createdAt
      likeCount
      likes {
        user {
          id
          username
        }
      }
      commentCount
      comments {
        id
        user {
          id
          username
        }
        createdAt
        body
      }
    }
  }
`;

export const FILE_UPLOAD = gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file){
      id
      filename
      mimetype
      path
    }
  }
`;