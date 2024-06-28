import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/shoes")
      .then((response) => setShoes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const shoesArray = Array.isArray(shoes) ? shoes : [];

  return (
    <div className="home-page">
      <h1>All Products</h1>
      <div className="product-list">
        {shoesArray.map((shoe) => (
          <Link to={`/shoes/${shoe.id}`} key={shoe.id} className="product-link">
            <div className="homepage-card">
              <div className="homepage-info">
                <img src={shoe.shoe_picture} alt={shoe.brand} className="homepage-img" />
                <h2>{shoe.brand}</h2>
                <p>Size: {shoe.size}</p>
                <p>Color: {shoe.color}</p>
                <p>Price: ${shoe.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
