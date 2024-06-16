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
        setShoe(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShoe();
  }, [id]);

  if (!shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card">
      <h1>{shoe.brand}</h1>
      <img src={shoe.shoe_picture} alt={shoe.brand} />
      <p>{shoe.color}</p>
      <p>Size: {shoe.size}</p>
      <p>Price: ${shoe.price}</p>
    </div>
  );
};

export default ProductDetails;
