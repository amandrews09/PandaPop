import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = gql`
  mutation ($sessionId: String!) {
    completeCheckout(sessionId: $sessionId) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
export const UPDATE_PRODUCT_QUANTITIES = gql`
  mutation updateProductQuantities($updates: [ProductQuantityUpdate!]!) {
    updateProductQuantities(updates: $updates) {
      _id
      quantity
    }
  }
`;
export const CHECKOUT = gql`
  mutation checkout($products: [CartItem!]!) {
    checkout(products: $products) {
      session
    }
  }
`;
