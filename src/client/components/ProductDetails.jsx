import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shoes/${id}`);
        const data = await response.json();
        console.log('Fetched shoe data:', data);
        setShoe(data);
      } catch (error) {
        console.error('Error fetching shoe data:', error);
        setMessage("Failed to load shoe details.");
      }
    };
    fetchShoe();
  }, [id]);

  const handleAddToCart = () => {
    // Logic to add the item to the cart
    console.log(`Added ${quantity} of ${shoe.brand} to the cart`);
  };

  if (!shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card">
      <h1>{shoe.brand}</h1>
      <img src={shoe.shoe_picture} alt={shoe.brand} />
      <p>Color: {shoe.color}</p>
      <p>Size: {shoe.size}</p>
      <p>Price: ${shoe.price}</p>
      {message && <p>{message}</p>}
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
