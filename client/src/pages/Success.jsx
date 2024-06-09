import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
//import Jumbotron from '../components/Success';
import { COMPLETE_CHECKOUT } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import './success.css';

function Success() {
  const [completeCheckout] = useMutation(COMPLETE_CHECKOUT);

  useEffect(() => {
    async function saveOrder() {
      // const cart = await idbPromise('cart', 'get');
      // const products = cart.map((item) => item._id);
      const sessionId = new URLSearchParams (location.search).get("session_id")

      if (sessionId) {
        const { data } = await completeCheckout({ variables: { sessionId } });
        const productData = data.completeCheckout.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [completeCheckout]);

  return (
    <div className='container'>
        <h1 id='success1'>Success!</h1>
        <h2 class='success2'>Thank you for your purchase!</h2>
        <h2 class='success2'>You will now be redirected to the home page.</h2>
    </div>
  );
}

export default Success;
