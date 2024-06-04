import { fetchAllShoes } from "../API/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdminProductList = () => {
    const [shoes, setShoes] = useState([]);
    const [searchParams, setSearchParams] = useState("");
  
    useEffect(() => {
      async function getAllShoes() {
        try {
          const APIresponse = await fetchAllShoes();
          if (APIresponse.success) {
            setShoes(APIresponse.data.shoes);
          } else {
            throw new Error(APIresponse.error.message);
          }
        } catch (error) {
          console.error("Error fetching shoes:", error);
        }
      }
      getAllShoes();
    }, []);
  
    const shoesToDisplay = searchParams
      ? shoes.filter((shoe) =>
          shoe.name.toLowerCase().includes(searchParams.toLowerCase())
        )
      : shoes;
  
    const navigate = useNavigate();
  
    return (
      <>
        <h1>The Display</h1>
        <div>
          Search:{" "}
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <ul>
          {shoesToDisplay.map((shoe) => (
            <li key={shoe.id}>
              <p>{shoe.name}</p>
              <button
                className="detailButton"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/shoes/${shoe.id}`)}
              >
                See {shoe.name}'s details
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };
  
  export default AdminProductList;