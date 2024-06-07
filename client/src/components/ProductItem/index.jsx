import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find(cartItem => cartItem._id === _id);
    if (itemInCart) {
      if (itemInCart.purchaseQuantity < quantity) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: _id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        alert('Cannot add more of this item, stock limit reached.');
      }
    } else {
      if (quantity > 0) {
        dispatch({
          type: ADD_TO_CART,
          product: { ...item, purchaseQuantity: 1 },
        });
        idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
      } else {
        alert('Cannot add this item, stock limit reached.');
      }
    }
  };

  return (
    <div>
      <Link className="title" to={`/products/${_id}`}>
        <div className="img-container">
          <img alt={name} src={`/images/${image}`} className="productImage" />
        </div>
        <p>{name}</p>
      </Link>
      <div className='d-flex flex-column align-items-center'>
        {quantity} {pluralize('item', quantity)} in stock
        <span>${price}</span>
        <button onClick={addToCart}>ADD TO CART</button>
      </div>
    </div>
  );
}

export default ProductItem;
