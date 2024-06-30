import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ userId }) => {
  const { id } = useParams(); // This id represents the shoe ID from the URL
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shoes/${id}`);
        const data = await response.json();
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
      const token = window.localStorage.getItem("token");
      console.log("token", token);
      console.log("userId:", userId);
      console.log(`Bearer ${token})`);
      const response = await fetch(
        `http://localhost:3000/api/cart/users/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
            price: shoe.price * quantity,
            shoe_id: shoe.id,
            shoe_picture: shoe.shoe_picture,
          }),
        }
      );
      console.log("response:", response);
      if (response.ok) {
        setSuccessMessage("Shoe added to bag successfully!");
        navigate("/bag");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add to cart");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <h1>{shoe.brand}</h1>
        <img src={shoe.shoe_picture} alt={shoe.brand} />
        <p>{shoe.color}</p>
        <p>Size: {shoe.size}</p>
        <p>Price: ${shoe.price}</p>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </label>
        <button onClick={handleClick}>Add to Bag</button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProductDetails;
