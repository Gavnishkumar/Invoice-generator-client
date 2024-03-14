import React, { useState } from 'react';

interface ProductProps {
  tableEntry: {
    name: string;
    quantity: number;
    price: number;
  }[];

  setTableEntry: React.Dispatch<React.SetStateAction<{
    name: string;
    quantity: number;
    price: number;
  }[]>>;

  setIsAddProduct:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<ProductProps> = (props) => {
  interface ProductInterface {
    name: string;
    quantity: number;
    price: number;
  }

  const { tableEntry, setTableEntry, setIsAddProduct} = props;
  const [productName, setProductName] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [isValidQuantity,setIsValidQuantity]=useState<boolean>(true)
  const [isValidPrice,setIsValidPrice]=useState<boolean>(true)
  const handleAddProduct = () => {
    if (productName && isValidQuantity && isValidPrice) {
      const newProduct: ProductInterface = {
        name: productName,
        quantity: productQuantity,
        price: productPrice
      };
      setTableEntry([...tableEntry, newProduct]);
      setIsAddProduct(false)
    }
  };
  const handleOnCancel=()=>{
    setIsAddProduct(false)
  }
  const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(Number(e.target.value)<=0){
      setIsValidQuantity(false)
    }
    else{
      setIsValidQuantity(true)
      setProductQuantity(parseInt(e.target.value));
    }
    
  };

  const handleProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(Number(e.target.value)<0){
      setIsValidPrice(false);
    }
    else{
      setIsValidPrice(true)
      setProductPrice(Number(e.target.value));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '72vh' }}>
      <div className="signup-container">
        <h1>Add New Product</h1>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              id="product"
              name="product"
              // value={productName}
              onChange={handleProductName}
              placeholder="Product"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              // value={productQuantity}
              onChange={handleProductQuantity}
              placeholder="Quantity"
              required
            />
            {!isValidQuantity && <p style={{ color: 'red' }}>Invalid quantity(must be greater than 0)</p>}
            
          </div>
          <div className="form-group">
            <label htmlFor="price">Price of Product</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleProductPrice}
              placeholder="Price of product"
              required
            />
            {!isValidPrice && <p style={{ color: 'red' }}>Invalid price</p>}
          </div>
          <div className='AddProduct-form-btn'>
            <div className='inner-button'>
              <button type="button" className='add-product-btn cancel-btn' onClick={handleOnCancel}>Cancel</button>
              <button type="button" className='add-product-btn' onClick={handleAddProduct}>Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
