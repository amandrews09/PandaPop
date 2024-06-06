export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error');
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}



// Featured Products on Home page

export function getRandomFeaturedProducts(products) {
  const featuredProducts = [];
  const productCount = products.length;

  while (featuredProducts.length < 3) {
    const randomIndex = Math.floor(Math.random() * productCount);
    const product = products[randomIndex];
    if (!featuredProducts.includes(product)) {
      featuredProducts.push(product);
    }
  }

  return featuredProducts;
}

export function saveFeaturedProducts(products) {
  const now = new Date();
  // 24 hours from now
  // const expiryTime = now.getTime() + 24 * 60 * 60 * 1000; 
  // 2 minutes from now
  const expiryTime = now.getTime() + 2 * 60 * 1000;
  const featuredProductsData = {
    products,
    expiryTime,
  };

  localStorage.setItem('featuredProducts', JSON.stringify(featuredProductsData));
}

export function getFeaturedProducts() {
  const savedData = JSON.parse(localStorage.getItem('featuredProducts'));
  if (!savedData) {
    return null;
  }

  const now = new Date().getTime();
  if (now > savedData.expiryTime) {
    localStorage.removeItem('featuredProducts');
    return null;
  }

  return savedData.products;
}