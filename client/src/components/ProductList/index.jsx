import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { Row, Col } from 'react-bootstrap';
import spinner from '../../assets/spinner.gif';
import Nav from '../Nav';

function ProductList({ showTitle = true, limit }) {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then(products => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function filterProducts() {
    let filteredProducts = state.products;
    if (currentCategory) {
      filteredProducts = filteredProducts.filter(product => product.category._id === currentCategory);
    }
    if (limit) {
      return shuffleArray(filteredProducts).slice(0, limit);
    }
    return filteredProducts;
  }

  return (
    <div>
      {showTitle && <h2>BROWSE PRODUCTS</h2>}
      <Row>
        {state.products.length ? (
          <>
            {filterProducts().map(product => (
              <Col key={product._id} lg={4} className="mb-3" id="cards">
                <ProductItem
                  key={product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
              </Col>
            ))}
          </>
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </Row>
    </div>
  );
}

export default ProductList;
