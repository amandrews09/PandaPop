import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

const Browse = () => {
  return (
    <div className="container">
      <ProductList showBrowseHeader={true} />
      {/* <Cart /> */}
      <Footer />
    </div>
  );
};

export default Browse;
