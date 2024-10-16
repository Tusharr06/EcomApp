import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }} />
      </h2>
    );
  }

  return (
    <div style={{ marginTop: "64px", padding: "20px" }}>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2 className="text-center">No Products Available</h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } = product;

            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
                key={id}
              >
                <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h5 className="card-title" style={{ margin: "0 0 10px 0", fontSize: "1.25rem" }}>
                        {name.toUpperCase()}
                      </h5>
                      <p className="card-brand" style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                        {"~ " + brand}
                      </p>
                    </div>
                    <hr style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5 className="card-text" style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: '5px' }}>
                        <i className="bi bi-currency-rupee"></i>
                        {price} {/* Display price directly in rupees */}
                      </h5>
                    </div>
                    {productAvailable && (
                      <button
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
