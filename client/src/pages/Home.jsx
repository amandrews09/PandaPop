import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import { getRandomFeaturedProducts, saveFeaturedProducts, getFeaturedProducts } from '../utils/helpers';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    const savedFeaturedProducts = getFeaturedProducts();
    if (savedFeaturedProducts) {
      setFeaturedProducts(savedFeaturedProducts);
    } else if (data) {
      const newFeaturedProducts = getRandomFeaturedProducts(data.products);
      setFeaturedProducts(newFeaturedProducts);
      saveFeaturedProducts(newFeaturedProducts);
    }
  }, [data]);


  return (
    <div>
      <div className="home">
        <div>
          <h2>FEATURED</h2>
          <ProductList productsToShow={featuredProducts} showBrowseHeader={false} />
        </div>
        <div>
          <h2>ABOUT</h2>
          <div className="d-flex">
            <img src="../public/images/panda-pic.jpg" height="10%" width="40%" alt="" />
            <div className="about">
              <p>
                Hi! I'm Manda the panda. My journey into the world of pop art began in early 2020, just before the onset
                of the COVID-19 pandemic. It all started as a fun, collaborative project with my daughter—we spent an
                afternoon painting Disney figurines together. She chose Minnie Mouse, while I opted for Mickey Mouse.
                That simple, joyful activity sparked a passion in me that I hadn’t anticipated. As the months went by, I
                found myself increasingly drawn to creating vibrant and whimsical pieces, especially focusing on fairy
                houses.
                <br />
                <br />
                Though I don't create the ceramic structures themselves, I meticulously select them from various
                sources, ensuring each piece has a unique charm and character. I then bring them to life using acrylic
                paints, infusing each fairy house with a burst of color and personality. This artistic journey has not
                only been a creative outlet during challenging times but also a way to add a touch of magic to everyday
                life. Through my pop art, I aim to transport viewers into a whimsical world where imagination knows no
                bounds.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
