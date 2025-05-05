const initialProducts = [
  ];
  
  export const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
  };
  

  export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  export default {
    loadProducts,
    saveProducts
  };