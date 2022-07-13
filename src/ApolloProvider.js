import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { split } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let httpLink = createUploadLink({
    uri: 'https://socialmedia-nodejs-server.herokuapp.com:5000'
});

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return({
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    })
})

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://socialmedia-nodejs-server.herokuapp.com:5000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      }
  }
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
