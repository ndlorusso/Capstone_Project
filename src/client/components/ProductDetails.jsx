import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  console.log(useParams());
  const { id } = useParams();
  console.log(id);
  const [shoe, setShoe] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shoes/${id}`);
        const data = await response.json();
        console.log(data[0]);
        setShoe(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShoe();
  }, [id]);

  if (!shoe) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
    // CALL BACKEND TO ADD TO CART
    // POST
    // await fetch localhost:3000/api/cart
      setSuccessMessage("shoe checked out successfully!");
    } catch (error) {
      set(error.message);
    }
  };
  return (
    <div className="product-card">
      <div className="product-info">
        <h1>{shoe.brand}</h1>
        <img src={shoe.shoe_picture} alt={shoe.brand} />
        <p>{shoe.color}</p>
        <p>Size: {shoe.size}</p>
        <p>Price: ${shoe.price}</p>
        <button onClick={handleClick}>Call post "cart/users/:id" pass in quantity, price, and shoeId</button>
      </div>
    </div>
  );
};
export default ProductDetails;
