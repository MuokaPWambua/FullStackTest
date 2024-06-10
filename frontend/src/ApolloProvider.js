import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
  createHttpLink
} from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => (
  <ApolloHooksProvider client={client}>
    {children}
  </ApolloHooksProvider>
);

export default ApolloProvider;
