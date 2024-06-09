import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { CHECKOUT, UPDATE_PRODUCT_QUANTITIES } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './cart.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [checkout, { data }] = useMutation(CHECKOUT);
  const [updateProductQuantities] = useMutation(UPDATE_PRODUCT_QUANTITIES);

  useEffect(() => {
    if (data) {
      stripePromise.then(res => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.product.price * item.quantity;
    });
    return sum.toFixed(2);
  }

  async function submitCheckout() {
    try {
      const updates = state.cart.map(item => ({
        _id: item.product._id,
        quantity: item.product.quantity - item.quantity,
      }));

      // Log updates to ensure they are correct
      console.log('Updates:', updates);

      // Validate updates
      const isValid = updates.every(update => update._id && typeof update.quantity === 'number');
      if (!isValid) {
        console.error('Invalid updates:', updates);
        return;
      }

      // await updateProductQuantities({ variables: { updates } });
      console.log (state.cart)
      checkout({
        variables: {
          products: state.cart.map(({ product, quantity }) => ({
            productId: product._id,
            quantity,
          })),
        },
      });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart z-3">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>SHOPPING CART</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item.product._id} item={item.product} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? <button onClick={submitCheckout}>CHECKOUT</button> : <span>(log in to check out)</span>}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
