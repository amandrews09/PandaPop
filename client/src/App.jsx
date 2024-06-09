import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import loggerLink from './loggerLink'; // Use your custom logger link

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

// HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Authorization link to add the token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Enhanced Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}, Operation: ${operation.operationName}`);
  }
  return forward(operation);
});

// Apollo Client setup with links
const client = new ApolloClient({
  link: ApolloLink.from([loggerLink, errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <div className="d-flex">
        <Nav />
        <Outlet />
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
