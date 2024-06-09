// src/loggerLink.js
import { ApolloLink } from '@apollo/client';

const loggerLink = new ApolloLink((operation, forward) => {
  console.log(`Starting request for ${operation.operationName}`);
  return forward(operation).map((data) => {
    console.log(`Ending request for ${operation.operationName}`);
    return data;
  });
});

export default loggerLink;
